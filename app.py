import os
from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for
from pymongo import MongoClient
from bson.objectid import ObjectId

app = Flask(__name__)

# ---------------------------------------------------------
# Database Initialization & Fallback Configuration
# ---------------------------------------------------------
use_mongo = False
posts_collection = None

try:
    # Attempt to connect to local MongoDB with a 2-second timeout
    client = MongoClient('mongodb://127.0.0.1:27017/', serverSelectionTimeoutMS=2000)
    client.admin.command('ping')
    db = client['cms_lab']
    posts_collection = db['posts']
    use_mongo = True
    print("[CMS Lab] Successfully connected to local MongoDB ('cms_lab' database)!")
except Exception:
    print("[CMS Lab] Local MongoDB is not reachable. Operating with in-memory storage mode.")
    print("[CMS Lab] Tip: To enable MongoDB, start the service with: net start MongoDB")

# In-memory storage fallback if MongoDB is not running
memory_posts = []

# ---------------------------------------------------------
# Routes
# ---------------------------------------------------------

@app.route('/')
@app.route('/posts')
def get_posts():
    """Display all posts in reverse chronological order (newest first)."""
    if use_mongo and posts_collection is not None:
        posts = list(
            posts_collection.find({}, {'title': 1, 'author': 1, 'createdAt': 1})
            .sort('_id', -1)
        )
    else:
        # Return posts in reverse order for newest first
        posts = [
            {
                '_id': p['_id'],
                'title': p['title'],
                'author': p['author'],
                'createdAt': p['createdAt']
            }
            for p in reversed(memory_posts)
        ]

    return render_template('posts.html', posts=posts)


@app.route('/posts/new', methods=['GET'])
def new_post():
    """Render the form for creating a new post."""
    return render_template('new-post.html')


@app.route('/posts', methods=['POST'])
def create_post():
    """Process post creation form submission."""
    title = (request.form.get('title') or '').strip()
    author = (request.form.get('author') or '').strip()
    content = (request.form.get('content') or '').strip()

    if title and author and content:
        date_str = datetime.now().strftime('%d %B %Y')
        post_data = {
            'title': title,
            'author': author,
            'content': content,
            'createdAt': date_str
        }

        if use_mongo and posts_collection is not None:
            posts_collection.insert_one(post_data)
        else:
            post_data['_id'] = str(len(memory_posts) + 1)
            memory_posts.append(post_data)

    return redirect(url_for('get_posts'))


@app.route('/posts/<id>')
def get_post(id):
    """Retrieve and display an individual post by ID."""
    post = None

    if use_mongo and posts_collection is not None:
        if ObjectId.is_valid(id):
            post = posts_collection.find_one({'_id': ObjectId(id)})
        if not post:
            post = posts_collection.find_one({'_id': id})
    else:
        post = next((p for p in memory_posts if str(p['_id']) == str(id)), None)

    return render_template('post.html', post=post)


# ---------------------------------------------------------
# Application Entrypoint
# ---------------------------------------------------------
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='127.0.0.1', port=port, debug=True)
