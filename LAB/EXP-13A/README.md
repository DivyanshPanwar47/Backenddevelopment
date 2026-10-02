# Experiment 13A: MongoDB, Mongoose and Express User Registration/Login

This project implements a beginner-friendly REST API with:

- MongoDB connection through Mongoose;
- a validated `User` schema;
- bcrypt password hashing before storage;
- registration and login endpoints;
- JWT authentication middleware; and
- a protected `/api/auth/me` endpoint.

## Setup

Make sure MongoDB is running locally, or use a MongoDB Atlas URI. Then:

```bash
npm install
copy .env.example .env
npm start
```

Edit `.env` before starting if your MongoDB URI or JWT secret differs from the example.

## API examples

Register:

```bash
curl -X POST http://localhost:3013/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"john\",\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

Login:

```bash
curl -X POST http://localhost:3013/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john@example.com\",\"password\":\"password123\"}"
```

Use the returned token to call the protected route:

```bash
curl http://localhost:3013/api/auth/me -H "Authorization: Bearer YOUR_TOKEN"
```

## Security notes

Passwords are never stored as plain text. The password field is excluded from normal Mongoose queries, and the JWT secret and MongoDB URI are loaded from `.env`, which is ignored by Git.
