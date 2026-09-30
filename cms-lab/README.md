# Backend Development - Simple CMS Lab

**Student Name:** Divyansh Panwar  
**Course:** Backend Development Lab  
**Project:** Blog Content Management System (Simple CMS)  
**Technology Stack:** Python (Flask), Jinja2 Templates, MongoDB (PyMongo)

---

## Project Overview

This project is a Blog Content Management System (CMS) developed for the **Backend Development Lab Examination** according to the official examination guidelines.

The application allows users to create blog posts, view a list of all posts with auto-generated timestamps, and read full individual articles by clicking on their titles.

---

## Technology Stack (Option B)

* **Backend:** Python 3.x with Flask
* **Template Engine:** Jinja2 (Server-side rendering)
* **Database:** MongoDB (via `pymongo` driver) with in-memory persistence fallback
* **Frontend:** Clean, responsive semantic HTML5 and CSS3

---

## Features and Requirements Implemented

1. **Display All Posts (`GET /` and `GET /posts`)**
   - Retrieves all posts in reverse chronological order (newest first).
   - Displays post **Title**, **Author**, and **Creation Date** (e.g., `26 September 2026`).
   - The **title of each post is clickable** and opens the full post page.
   - *Requirement Met:* Full content is **not** loaded or sent on the list page (`{'title': 1, 'author': 1, 'createdAt': 1}`).

2. **Create a Post (`GET /posts/new` and `POST /posts`)**
   - Clean HTML form containing:
     - `Title` (validated, required)
     - `Author` (validated, required)
     - `Content` (validated, required)
     - Submit button
   - Creation date and time is **automatically generated on the backend** (`datetime.now()`) and never entered via the form.
   - Redirects back to the posts list upon submission.

3. **View Individual Post (`GET /posts/<id>`)**
   - Retrieves and displays the complete post from MongoDB using its unique `ObjectId`.
   - Displays title, author, formatted timestamp, and full article body.

4. **Persistence**
   - Blog posts are permanently stored in the local MongoDB database (`cms_lab` database, `posts` collection).
   - Posts persist across browser refreshes and server restarts.

---

## Folder Structure

```text
Backenddevelopment/
│
├── .gitignore
├── app.py                  # Main Flask application & routes
├── README.md               # Project documentation
│
├── static/
│   └── style.css           # Custom styling
│
└── templates/
    ├── posts.html          # List view (all posts)
    ├── new-post.html       # Post creation form
    └── post.html           # Full individual post view
```

---

## Routes Implemented

| Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/` or `/posts` | Display all blog posts |
| `GET` | `/posts/new` | Display the post creation form |
| `POST` | `/posts` | Validate inputs and insert new post into MongoDB |
| `GET` | `/posts/<id>` | Display complete content of an individual post |

---

## How to Run Locally

### 1. Prerequisites
Ensure you have **Python 3.10+** and **MongoDB** installed.

### 2. Install Dependencies
```bash
pip install flask pymongo
```

### 3. Start MongoDB
Ensure MongoDB service is running:
```bash
# On Windows
net start MongoDB
# or start mongod executable directly
mongod --dbpath <path-to-data-folder>
```

### 4. Run the Application
```bash
python app.py
```

Open your browser and navigate to:
```
http://127.0.0.1:5000
```
