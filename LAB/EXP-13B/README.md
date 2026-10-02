# Experiment 13B: MongoDB User Registration and Todo App

This project extends the registration/login exercise into a protected Todo REST API. Each todo belongs to the authenticated user, so one user cannot read, update or delete another user's todos.

## Features

- User registration with bcrypt-hashed passwords.
- JWT login and Bearer-token authentication.
- MongoDB/Mongoose `User` and `Todo` models.
- Create, list, read, update and delete todo operations.
- Todo title, description, completion state, priority and due date.
- Ownership checks on every todo operation.

## Setup

```bash
npm install
copy .env.example .env
npm start
```

Ensure MongoDB is running, or set `MONGODB_URI` in `.env` to a MongoDB Atlas connection string.

## API workflow

1. Register or log in at `POST /api/auth/register` or `POST /api/auth/login`.
2. Copy the returned JWT.
3. Send it on Todo requests as `Authorization: Bearer YOUR_TOKEN`.

Create a todo:

```bash
curl -X POST http://localhost:3014/api/todos ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer YOUR_TOKEN" ^
  -d "{\"title\":\"Finish Experiment 13B\",\"priority\":\"high\"}"
```

List todos:

```bash
curl http://localhost:3014/api/todos -H "Authorization: Bearer YOUR_TOKEN"
```

Update and delete use `/api/todos/:id` with `PUT` and `DELETE` respectively. The ownership filter includes both the todo id and the authenticated user id.
