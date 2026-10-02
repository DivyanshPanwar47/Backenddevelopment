require('dotenv').config();

const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');

const app = express();
const PORT = Number(process.env.PORT) || 3012;
const users = new Map();

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'development-only-session-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 1000,
    },
  }),
);

function escapeHtml(value = '') {
  return String(value).replace(
    /[&<>'"]/g,
    (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character],
  );
}

function page(title, body, theme = 'light') {
  const background = theme === 'dark' ? '#111827' : '#f8fafc';
  const foreground = theme === 'dark' ? '#f8fafc' : '#111827';
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>body{font-family:system-ui,sans-serif;max-width:760px;margin:2rem auto;padding:0 1rem;background:${background};color:${foreground}}a,button{font:inherit}form{margin:1rem 0;padding:1rem;border:1px solid #94a3b8;border-radius:.5rem}input{padding:.5rem;margin:.25rem 0;width:min(100%,24rem)}button{padding:.5rem .8rem;cursor:pointer}.todo{display:flex;justify-content:space-between;gap:1rem;align-items:center;padding:.5rem 0;border-bottom:1px solid #94a3b8}.error{color:#b91c1c}.success{color:#047857}</style>
</head><body>${body}</body></html>`;
}

function loginForm(message = '') {
  return page(
    'Session and Cookie Demo',
    `<h1>Session and Cookie Demo</h1>
     ${message ? `<p class="error">${escapeHtml(message)}</p>` : ''}
     <form method="post" action="/register"><h2>Register</h2>
       <input name="username" required minlength="3" placeholder="Username">
       <input name="password" required minlength="6" type="password" placeholder="Password">
       <button>Register</button>
     </form>
     <form method="post" action="/login"><h2>Login</h2>
       <input name="username" required placeholder="Username">
       <input name="password" required type="password" placeholder="Password">
       <button>Login</button>
     </form>
     <p>Sessions remember the logged-in user. Cookies store the selected theme.</p>`,
  );
}

function requireLogin(req, res, next) {
  if (req.session.user) return next();
  return res.redirect('/');
}

app.get('/', (req, res) => {
  if (req.session.user) return res.redirect('/dashboard');
  return res.send(loginForm());
});

app.post('/register', async (req, res) => {
  const username = String(req.body.username || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  if (username.length < 3 || password.length < 6) {
    return res.status(400).send(loginForm('Username must be at least 3 characters and password at least 6 characters.'));
  }
  if (users.has(username)) return res.status(409).send(loginForm('That username is already registered.'));
  users.set(username, { username, passwordHash: await bcrypt.hash(password, 10) });
  return res.send(loginForm('Registration successful. You can now log in.').replace('class="error"', 'class="success"'));
});

app.post('/login', async (req, res) => {
  const username = String(req.body.username || '').trim().toLowerCase();
  const password = String(req.body.password || '');
  const user = users.get(username);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(401).send(loginForm('Invalid username or password.'));
  }
  req.session.user = { username: user.username };
  if (!req.session.todos) req.session.todos = [];
  return res.redirect('/dashboard');
});

app.get('/dashboard', requireLogin, (req, res) => {
  const theme = req.cookies.theme === 'dark' ? 'dark' : 'light';
  const todos = req.session.todos || [];
  const todoMarkup = todos.length
    ? todos
        .map(
          (todo, index) => `<li class="todo"><span>${escapeHtml(todo)}</span><form method="post" action="/todos/${index}/delete"><button>Delete</button></form></li>`,
        )
        .join('')
    : '<li>No todos yet.</li>';

  return res.send(
    page(
      'Dashboard',
      `<h1>Welcome, ${escapeHtml(req.session.user.username)}!</h1>
       <p>This username is stored in the server-side session.</p>
       <form method="post" action="/todos"><h2>Session Todo List</h2>
         <input name="todo" required maxlength="120" placeholder="Add a todo">
         <button>Add todo</button>
       </form>
       <ul>${todoMarkup}</ul>
       <form method="post" action="/theme"><h2>Cookie Preference</h2>
         <select name="theme"><option value="light" ${theme === 'light' ? 'selected' : ''}>Light</option><option value="dark" ${theme === 'dark' ? 'selected' : ''}>Dark</option></select>
         <button>Save theme cookie</button>
       </form>
       <p><a href="/cookie/get">Read theme cookie</a> · <a href="/cookie/delete">Delete theme cookie</a> · <a href="/logout">Logout</a></p>`,
      theme,
    ),
  );
});

app.post('/todos', requireLogin, (req, res) => {
  const todo = String(req.body.todo || '').trim();
  if (todo) req.session.todos.push(todo);
  return res.redirect('/dashboard');
});

app.post('/todos/:id/delete', requireLogin, (req, res) => {
  const index = Number.parseInt(req.params.id, 10);
  if (Number.isInteger(index)) req.session.todos.splice(index, 1);
  return res.redirect('/dashboard');
});

app.post('/theme', requireLogin, (req, res) => {
  const theme = req.body.theme === 'dark' ? 'dark' : 'light';
  res.cookie('theme', theme, { maxAge: 15 * 60 * 1000, httpOnly: true, sameSite: 'lax' });
  return res.redirect('/dashboard');
});

app.get('/cookie/get', (req, res) => {
  res.send(`Theme cookie: ${escapeHtml(req.cookies.theme || 'not set')} — <a href="/dashboard">Back</a>`);
});

app.get('/cookie/delete', (req, res) => {
  res.clearCookie('theme');
  res.send('Theme cookie deleted. <a href="/dashboard">Back</a>');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

if (require.main === module) {
  app.listen(PORT, () => console.log(`Experiment 12B running at http://localhost:${PORT}`));
}

module.exports = { app, users };
