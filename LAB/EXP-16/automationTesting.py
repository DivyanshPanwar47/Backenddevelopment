"""Automated route checks for the containerized CMS.

The tests use Flask's in-process client and an isolated memory store. This
keeps CI deterministic while still exercising every HTTP route and the same
request handlers that Gunicorn serves in the container.
"""

import os
import unittest


# Tests must not depend on a developer's local MongoDB or a Compose service.
os.environ["CMS_STORAGE"] = "memory"

from app import MemoryStore, create_app  # noqa: E402


class CMSRouteTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.store = MemoryStore()
        cls.app = create_app(cls.store)
        cls.app.config.update(TESTING=True)

    def setUp(self):
        self.store.clear()
        self.client = self.app.test_client()

    def test_health_route(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.get_json(), {"status": "healthy"})

    def test_list_routes_render_empty_state(self):
        for path in ("/", "/posts"):
            with self.subTest(path=path):
                response = self.client.get(path)
                self.assertEqual(response.status_code, 200)
                self.assertIn(b"No posts published yet", response.data)

    def test_new_post_form_route(self):
        response = self.client.get("/posts/new")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'name="title"', response.data)
        self.assertIn(b'name="author"', response.data)
        self.assertIn(b'name="content"', response.data)

    def test_create_and_read_post_routes(self):
        response = self.client.post(
            "/posts",
            data={
                "title": "Containerized CMS",
                "author": "Divyansh Panwar",
                "content": "This post proves the CMS route flow works.",
            },
        )
        self.assertEqual(response.status_code, 302)
        self.assertEqual(response.headers["Location"], "/posts")

        listing = self.client.get("/posts")
        self.assertEqual(listing.status_code, 200)
        self.assertIn(b"Containerized CMS", listing.data)
        self.assertIn(b"Divyansh Panwar", listing.data)
        self.assertNotIn(b"This post proves", listing.data)

        post_id = self.store.posts[0]["_id"]
        detail = self.client.get(f"/posts/{post_id}")
        self.assertEqual(detail.status_code, 200)
        self.assertIn(b"Containerized CMS", detail.data)
        self.assertIn(b"This post proves", detail.data)

    def test_invalid_post_is_rejected(self):
        response = self.client.post(
            "/posts",
            data={"title": "", "author": "Only an author", "content": ""},
        )
        self.assertEqual(response.status_code, 400)
        self.assertIn(b"Title, author and content are required", response.data)
        self.assertEqual(self.store.posts, [])

    def test_missing_post_returns_not_found(self):
        response = self.client.get("/posts/not-a-real-id")
        self.assertEqual(response.status_code, 404)
        self.assertIn(b"Post Not Found", response.data)


if __name__ == "__main__":
    unittest.main(verbosity=2)
