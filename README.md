# Backend Development - Simple CMS Lab

**Student Name:** Divyansh Panwar  
**Course:** Backend Development  
**Project:** Blog Content Management System (Simple CMS)  
**Technology Stack:** Python (Flask), Jinja2 Templates, MongoDB (PyMongo)  
**Repository:** https://github.com/DivyanshPanwar47/Backenddevelopment  

---

## Repository Overview

This repository contains backend development coursework, laboratory experiments, and examinations.

To ensure clean project separation and avoid mixing current examination work with earlier coursework:
* **`cms-lab/`**: Dedicated directory containing the complete Simple CMS Blog project (Python, Flask, Jinja2, MongoDB, CSS, templates, and requirements).
* **`lab/`**: Earlier lab experiments and exercises.
* **`theory/`**: Course theory materials and notes.

---

## Project Overview

A complete Blog Content Management System (CMS) developed for the Backend Development Lab Examination according to the official examination specification (Option B).

The application allows users to create blog posts, display all posts in reverse chronological order with server-generated timestamps, and read full articles by clicking on their titles. Data is persistently stored in MongoDB.

---

## Application Screenshots

### 1. Posts List (Homepage)
Displays all published posts in reverse chronological order (newest first). Only metadata (title, author, date) is loaded; full content is omitted on this view as per specification.

![Posts List](cms-lab/screenshots/posts-list.png)

---

### 2. View Individual Post
Displays the full content of a selected post retrieved by its MongoDB unique identifier (`ObjectId`).

![Individual Post View](cms-lab/screenshots/view-post.png)

---

### 3. Create New Post
Form allowing authors to input the post title, author name, and content. The creation timestamp is automatically generated on the backend and cannot be tampered with.

![Create Post Form](cms-lab/screenshots/create-post.png)

---

### 4. MongoDB Database (MongoDB Compass)
Verification of persistent storage in the local MongoDB database (`cms_lab` database, `posts` collection) showing auto-assigned ObjectIds and timestamps.

![MongoDB Compass](cms-lab/screenshots/mongodb-compass.png)

---

## Features and Requirements Implemented

1. **Display All Posts (`GET /` and `GET /posts`)**
   * Retrieves all posts sorted in reverse chronological order (`.sort('_id', -1)`).
   * Displays post **Title**, **Author**, and **Creation Date** (formatted as `DD Month YYYY`).
   * Post titles are clickable links navigating to the full post view (`/posts/<id>`).
   * Optimized query: Full content is excluded from the listing query (`{'title': 1, 'author': 1, 'createdAt': 1}`).

2. **Create a Post (`GET /posts/new` and `POST /posts`)**
   * Dedicated creation form with inputs for Title, Author, and Content.
   * Input validation: Ensures all fields are non-empty after trimming whitespace.
   * Server-side timestamp: Creation date and time is automatically assigned on the server (`datetime.now()`) and never accepted from client form input.
   * Automatic redirect to the post list upon successful creation.

3. **View Individual Post (`GET /posts/<id>`)**
   * Retrieves and renders the complete post document from MongoDB using its unique `ObjectId`.
   * Handles invalid or non-existent IDs gracefully with a clean "Post Not Found" view.

4. **Database Persistence**
   * Persists blog posts into a local MongoDB instance (`cms_lab` database, `posts` collection).
   * Automatically falls back to in-memory storage if MongoDB is not running, ensuring uninterrupted functionality.

---

## Repository Structure

```text
Backenddevelopment/
│
├── README.md                           # Main repository documentation & overview
├── .gitignore                          # Git ignore rules for Python & environment
│
├── cms-lab/                            # Dedicated CMS Lab Exam project folder
│   ├── app.py                          # Flask application routes and database logic
│   ├── requirements.txt                # Python package dependencies
│   ├── README.md                       # Project-specific documentation
│   │
│   ├── static/
│   │   └── style.css                   # Custom responsive CSS styling
│   │
│   ├── templates/
│   │   ├── posts.html                  # All posts listing template
│   │   ├── post.html                   # Individual post detail template
│   │   └── new-post.html               # Create new post form template
│   │
│   └── screenshots/                    # Application and database screenshots
│       ├── posts-list.png              # Posts homepage view
│       ├── view-post.png               # Single post view
│       ├── create-post.png             # Create post form view
│       └── mongodb-compass.png         # MongoDB Compass database view
│
├── lab/                                # Earlier lab coursework (Exp 1)
│   └── exp1/
│       └── index.html
│
└── theory/                             # Earlier theory coursework
```

---

## Routes Implemented

| HTTP Method | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Redirects / displays all blog posts in reverse chronological order |
| `GET` | `/posts` | Displays all blog posts in reverse chronological order |
| `GET` | `/posts/new` | Renders the HTML form to create a new post |
| `POST` | `/posts` | Validates submitted form data, adds server timestamp, and saves to MongoDB |
| `GET` | `/posts/<id>` | Retrieves and displays the full post by its MongoDB ObjectId |

---

## How to Run the Application

### 1. Prerequisites
* Python 3.10 or higher
* MongoDB Community Server 7.x / 8.x

### 2. Navigate to Project Directory
```bash
cd cms-lab
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Start MongoDB Server
Ensure MongoDB is running locally on default port `27017`:
```bash
# Direct startup with custom data directory:
mongod --dbpath C:\Users\divya\mongodb_data
```

### 5. Start the Flask Server
```bash
python app.py
```

### 6. Access in Browser
Navigate to:
```
http://127.0.0.1:5000
```
