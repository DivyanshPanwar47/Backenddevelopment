# Experiment 12B: Sessions, Cookies and State Management

This self-contained Express application demonstrates:

- registration and login using a server-side session;
- a session-specific todo list;
- setting, reading and deleting a browser cookie;
- a cookie-based light/dark theme preference; and
- logout by destroying the session.

## Run

```bash
npm install
copy .env.example .env
npm start
```

Open <http://localhost:3012>. Create a user, log in, add todos, and change the theme. The default session store is in memory, so it is intended for learning and local development, not production.

## Routes

| Route | Purpose |
|---|---|
| `POST /register` | Create an in-memory user with a hashed password |
| `POST /login` | Start a server-side session |
| `GET /dashboard` | View the session user and session todo list |
| `POST /todos` | Add a todo to the current session |
| `POST /todos/:id/delete` | Delete a todo from the current session |
| `POST /theme` | Set the `theme` cookie |
| `GET /cookie/get` | Read the `theme` cookie |
| `GET /cookie/delete` | Clear the `theme` cookie |
| `GET /logout` | Destroy the session |
##Screenshots
C:\Users\divya\OneDrive\Documents\Backend\cms-lab\LAB\EXP-12B\ss\Screenshot 2026-10-03 130001.png
C:\Users\divya\OneDrive\Documents\Backend\cms-lab\LAB\EXP-12B\ss\Screenshot 2026-10-03 130019.png
C:\Users\divya\OneDrive\Documents\Backend\cms-lab\LAB\EXP-12B\ss\Screenshot 2026-10-03 130048.png
C:\Users\divya\OneDrive\Documents\Backend\cms-lab\LAB\EXP-12B\ss\Screenshot 2026-10-03 130111.png

