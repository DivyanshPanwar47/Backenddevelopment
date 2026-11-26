"""Container-ready Flask CMS used by the Unit 4 deployment PBL.

The default storage backend is an in-memory store so the app is easy to run
and test locally.  Docker Compose sets ``CMS_STORAGE=mongo`` and connects the
same routes to the MongoDB service.
"""

from __future__ import annotations

import logging
import os
import time
from datetime import datetime
from typing import Any

from flask import Flask, g, jsonify, redirect, render_template, request, url_for
from pymongo import MongoClient
from pymongo.collection import Collection
from bson.objectid import ObjectId


logging.basicConfig(
    level=os.getenv("LOG_LEVEL", "INFO").upper(),
    format="%(asctime)s %(levelname)s %(message)s",
)
logger = logging.getLogger("cms-lab")


class MemoryStore:
    """Small deterministic store used for local development and automation."""

    def __init__(self) -> None:
        self.posts: list[dict[str, Any]] = []
        self._next_id = 1

    def list_posts(self) -> list[dict[str, Any]]:
        return [
            {
                "_id": post["_id"],
                "title": post["title"],
                "author": post["author"],
                "createdAt": post["createdAt"],
            }
            for post in reversed(self.posts)
        ]

    def create_post(self, post: dict[str, Any]) -> str:
        post = {**post, "_id": str(self._next_id)}
        self._next_id += 1
        self.posts.append(post)
        return post["_id"]

    def get_post(self, post_id: str) -> dict[str, Any] | None:
        return next(
            (post for post in self.posts if str(post["_id"]) == str(post_id)),
            None,
        )

    def health(self) -> bool:
        return True

    def clear(self) -> None:
        self.posts.clear()
        self._next_id = 1


class MongoStore:
    """MongoDB-backed store used by the Compose deployment."""

    def __init__(self, uri: str, database_name: str) -> None:
        self.client = MongoClient(uri, serverSelectionTimeoutMS=3000)
        self.client.admin.command("ping")
        self.collection: Collection = self.client[database_name]["posts"]

    @staticmethod
    def _normalise(post: dict[str, Any] | None) -> dict[str, Any] | None:
        if post is None:
            return None
        return {**post, "_id": str(post["_id"])}

    def list_posts(self) -> list[dict[str, Any]]:
        documents = self.collection.find(
            {},
            {"title": 1, "author": 1, "createdAt": 1},
        ).sort("_id", -1)
        return [self._normalise(document) for document in documents]

    def create_post(self, post: dict[str, Any]) -> str:
        result = self.collection.insert_one(post)
        return str(result.inserted_id)

    def get_post(self, post_id: str) -> dict[str, Any] | None:
        document = None
        if ObjectId.is_valid(post_id):
            document = self.collection.find_one({"_id": ObjectId(post_id)})
        if document is None:
            document = self.collection.find_one({"_id": post_id})
        return self._normalise(document)

    def health(self) -> bool:
        try:
            self.client.admin.command("ping")
            return True
        except Exception:
            return False


def build_store() -> MemoryStore | MongoStore:
    mode = os.getenv("CMS_STORAGE", "memory").lower()
    if mode == "memory":
        return MemoryStore()
    if mode != "mongo":
        raise RuntimeError("CMS_STORAGE must be either 'memory' or 'mongo'")

    uri = os.getenv("MONGODB_URI", "mongodb://127.0.0.1:27017/cms_lab")
    database_name = os.getenv("MONGO_DB_NAME", "cms_lab")
    logger.info("Connecting to MongoDB database %s", database_name)
    return MongoStore(uri, database_name)


def create_app(store: MemoryStore | MongoStore | None = None) -> Flask:
    app = Flask(__name__)
    app.config["STORE"] = store or build_store()

    @app.before_request
    def start_request_timer() -> None:
        g.request_started = time.perf_counter()

    @app.after_request
    def log_request(response):
        started = getattr(g, "request_started", time.perf_counter())
        duration_ms = (time.perf_counter() - started) * 1000
        logger.info(
            "method=%s path=%s status=%s duration_ms=%.2f",
            request.method,
            request.path,
            response.status_code,
            duration_ms,
        )
        return response

    @app.get("/health")
    def health():
        store_is_healthy = app.config["STORE"].health()
        status_code = 200 if store_is_healthy else 503
        return jsonify({"status": "healthy" if store_is_healthy else "unhealthy"}), status_code

    @app.get("/")
    @app.get("/posts")
    def get_posts():
        posts = app.config["STORE"].list_posts()
        return render_template("posts.html", posts=posts)

    @app.get("/posts/new")
    def new_post():
        return render_template("new-post.html", form_data={}, error=None)

    @app.post("/posts")
    def create_post():
        form_data = {
            "title": (request.form.get("title") or "").strip(),
            "author": (request.form.get("author") or "").strip(),
            "content": (request.form.get("content") or "").strip(),
        }

        if not all(form_data.values()):
            return (
                render_template(
                    "new-post.html",
                    form_data=form_data,
                    error="Title, author and content are required.",
                ),
                400,
            )

        post = {
            **form_data,
            "createdAt": datetime.now().strftime("%d %B %Y"),
        }
        app.config["STORE"].create_post(post)
        return redirect(url_for("get_posts"))

    @app.get("/posts/<post_id>")
    def get_post(post_id: str):
        post = app.config["STORE"].get_post(post_id)
        status_code = 200 if post else 404
        return render_template("post.html", post=post), status_code

    return app


app = create_app()


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=False)
