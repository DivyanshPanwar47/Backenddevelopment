# Experiment 16: Containerized CMS with Docker and GitHub Actions

This is the Unit 4 PBL implementation. It takes the existing Flask/MongoDB
blog CMS and prepares it for deployment:

- Docker image built from a small Python base image;
- Docker Compose service for Flask plus MongoDB;
- structured request logging and a `/health` endpoint;
- `automationTesting.py` covering every application route; and
- a GitHub Actions workflow that tests first, then builds and pushes the image
  to Docker Hub on pushes to `main`.

## Project structure

```text
EXP-16/
├── app.py
├── automationTesting.py
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── .dockerignore
├── .env.example
├── templates/
└── static/
```

## Run the automated checks

The route tests use Flask's test client and an isolated in-memory store, so
they do not require MongoDB or Docker:

```powershell
python -m pip install -r requirements.txt
python automationTesting.py
```

The tests cover `/`, `/posts`, `/posts/new`, `POST /posts`,
`/posts/<id>`, `/health`, validation failures and missing posts.

## Run locally without Docker

```powershell
$env:CMS_STORAGE = "memory"
python app.py
```

Open <http://127.0.0.1:5000>. The application logs each request with its
method, path, status and duration. Local memory data is intentionally cleared
when the process stops.

## Run with Docker Compose

Docker Compose starts a MongoDB service and the CMS together. The app waits
for MongoDB's health check before starting:

```powershell
docker compose up --build
```

Open <http://127.0.0.1:5000>. Create a post, refresh the list and open the
post title to verify the full request flow. Stop the stack with:

```powershell
docker compose down
```

Use `docker compose down -v` only when you intentionally want to remove the
Compose-managed MongoDB volume and its data.

## Build and run the image manually

```powershell
docker build -t cms-lab:local .
docker run --rm -p 5000:5000 -e CMS_STORAGE=memory cms-lab:local
```

For the Compose deployment, use `docker compose` so the app can resolve the
MongoDB hostname `mongo` on the shared Compose network.

## GitHub Actions and Docker Hub

The workflow is at `.github/workflows/exp-16-cms-image.yml` in the repository
root. It runs `automationTesting.py` on pull requests and pushes. On a push to
`main`, the image job runs only after the tests pass and publishes:

```text
<DOCKERHUB_USERNAME>/cms-lab:latest
<DOCKERHUB_USERNAME>/cms-lab:sha-<commit>
```

Before using the publishing job, create these GitHub Actions secrets in the
repository settings:

| Secret | Value |
| --- | --- |
| `DOCKERHUB_USERNAME` | Docker Hub username |
| `DOCKERHUB_TOKEN` | Docker Hub access token, not the account password |

The workflow never stores a token in the repository. The Unit 4 handout
recommends using a fresh repository for testing Actions; this folder is ready
to be copied into that repository if the course submission requires it.

## Route summary

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/` | List posts |
| GET | `/posts` | List posts |
| GET | `/posts/new` | Render create form |
| POST | `/posts` | Validate and create a post |
| GET | `/posts/<id>` | Read one post |
| GET | `/health` | Liveness and storage health check |

## Result

The CMS is now packaged as a reproducible container, can run with a MongoDB
dependency through Compose, exposes observable health and request logs, and
has a test-before-publish CI/CD path.
