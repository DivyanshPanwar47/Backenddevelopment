# Backend Development | UPES Dehradun

<div align="center">

## Backend Development Lab & Coursework

**B.Tech Computer Science and Engineering (Core) · Semester V**


</div>

---

## Student Information

| Detail | Information |
|---|---|
| **Name** | Divyansh Panwar |
| **SAP ID** | 590018990 |
| **Course** | Backend Development |
| **Program** | B.Tech CSE (Core) |
| **University** | UPES, Dehradun |
| **Repository** | [Backenddevelopment](https://github.com/DivyanshPanwar47/Backenddevelopment) |

---

## About This Repository

This repository contains my Backend Development coursework, laboratory experiments, reports and practical projects completed as part of the B.Tech CSE programme at UPES.

Each experiment is organised in its own folder under `LAB/`. Depending on the task, the folder contains source code, setup instructions, API examples, screenshots or a report describing the objective and implementation.

## Lab Experiments

| Exp. | Experiment | Main topics | Documentation | Source |
|---|---|---|---|---|
| 1 | Create a web page demonstrating HTML5 elements | Semantic HTML5 and page structure | [Report](./LAB/EXP-1/report.md) | [HTML page](./LAB/EXP-1/index.html) |
| 2 | Demonstrate CSS types, selectors and layouts | Inline, internal and external CSS | [Report](./LAB/EXP-2/report.md) | [HTML](./LAB/EXP-2/index.html) · [CSS](./LAB/EXP-2/style.css) |
| 3 | Design and build a responsive web page | HTML and responsive CSS | [README / report](./LAB/EXP-3/README.md) | [HTML](./LAB/EXP-3/index.html) · [CSS](./LAB/EXP-3/style.css) |
| 4 | Create responsive pages using Bootstrap and Tailwind CSS | Bootstrap and Tailwind | [README / report](./LAB/EXP-4/README.md) | [Overview](./LAB/EXP-4/index.html) · [Bootstrap](./LAB/EXP-4/bootstrap.html) · [Tailwind](./LAB/EXP-4/tailwind.html) |
| 5 | JavaScript arrays, objects and functions | Array/object operations, functions and library activity | [README](./LAB/EXP-5/README.md) | [HTML](./LAB/EXP-5/index.html) · [Script 1](./LAB/EXP-5/script.js) · [Script 2](./LAB/EXP-5/script2.js) |
| 12 | Build a Node.js and Express application with EJS views | Express routes and server-side templating | [README](./LAB/EXP-12/README.md) | [Application](./LAB/EXP-12/app.js) |
| 12B | Sessions, cookies and state management | Login sessions, session todos and theme cookies | [README](./LAB/EXP-12B/README.md) | [Server](./LAB/EXP-12B/server.js) |
| 13 | Install and connect MongoDB | MongoDB Community Server, mongosh, Compass, Atlas and Mongoose | [Setup guide](./LAB/EXP-13/README.md) | Documentation-based experiment |
| 13A | MongoDB user registration and login | Express, Mongoose, bcrypt and JWT authentication | [README](./LAB/EXP-13A/README.md) | [Server](./LAB/EXP-13A/server.js) |
| 13B | MongoDB registration and Todo application | Protected Todo REST API, CRUD and user ownership | [README](./LAB/EXP-13B/README.md) | [Server](./LAB/EXP-13B/server.js) |

## Repository Structure

```text
Backenddevelopment/
├── README.md
├── .gitignore
│
├── LAB/
│   ├── EXP-1/
│   │   ├── index.html
│   │   └── report.md
│   ├── EXP-2/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── report.md
│   ├── EXP-3/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── README.md
│   ├── EXP-4/
│   │   ├── index.html
│   │   ├── bootstrap.html
│   │   ├── tailwind.html
│   │   └── README.md
│   ├── EXP-5/
│   │   ├── index.html
│   │   ├── script.js
│   │   ├── script2.js
│   │   └── README.md
│   ├── EXP-12/
│   │   ├── app.js
│   │   ├── package.json
│   │   ├── public/
│   │   ├── views/
│   │   └── README.md
│   ├── EXP-12B/
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── .env.example
│   │   └── README.md
│   ├── EXP-13/
│   │   └── README.md
│   ├── EXP-13A/
│   │   ├── config/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── server.js
│   │   ├── package.json
│   │   ├── package-lock.json
│   │   ├── .env.example
│   │   └── README.md
│   └── EXP-13B/
│       ├── config/
│       ├── middleware/
│       ├── models/
│       ├── routes/
│       ├── server.js
│       ├── package.json
│       ├── package-lock.json
│       ├── .env.example
│       └── README.md
│
├── cms-lab/
│   ├── README.md
│   ├── app.py
│   ├── requirements.txt
│   ├── static/
│   ├── templates/
│   └── screenshots/
│
└── theory/
```

## Running the Experiments

- **Experiments 1–4:** Open the relevant HTML file in a browser. Experiment 4 loads Bootstrap and Tailwind resources from CDNs, so an internet connection is required.
- **Experiment 5:** Open `LAB/EXP-5/index.html` in a browser and use the developer console, or run the scripts with Node.js as described in its README.
- **Experiment 12:** Open a terminal in `LAB/EXP-12`, run `npm install` and `npm start`, then visit <http://localhost:3000>.
- **Experiment 12B:** Open a terminal in `LAB/EXP-12B`, run `npm install`, copy `.env.example` to `.env`, then run `npm start`. Visit <http://localhost:3012>.
- **Experiment 13:** Follow the MongoDB installation and connection steps in [its setup guide](./LAB/EXP-13/README.md).
- **Experiment 13A:** Configure `MONGODB_URI` and `JWT_SECRET` in a local `.env` file, then follow [the experiment README](./LAB/EXP-13A/README.md). The API uses port 3013.
- **Experiment 13B:** Configure the local `.env` file and MongoDB connection, then follow [the experiment README](./LAB/EXP-13B/README.md). The API uses port 3014.
- **CMS project:** Follow the instructions in [cms-lab/README.md](./cms-lab/README.md).

For experiments that use environment variables, keep real credentials in the local `.env` file. Do not commit database passwords, JWT secrets or other private credentials.

## Technologies Used

| Technology | Use |
|---|---|
| HTML5 | Page structure and semantic elements |
| CSS3 | Styling, layouts and responsive design |
| JavaScript | Browser and server-side programming |
| Bootstrap | Responsive UI framework |
| Tailwind CSS | Utility-first CSS framework |
| Node.js | JavaScript runtime |
| Express.js | Backend web framework and REST APIs |
| EJS | Server-side HTML templating |
| Express sessions and cookies | Session and browser state management |
| MongoDB | NoSQL database |
| Mongoose | MongoDB object modelling for Node.js |
| bcrypt | Password hashing |
| JSON Web Tokens (JWT) | Token-based API authentication |
| Python / Flask | CMS backend |
| PyMongo | MongoDB access from Python |
| Git and GitHub | Version control and repository hosting |

## Learning Outcomes

- Build structured web pages with semantic HTML5.
- Apply CSS through inline, internal and external stylesheets.
- Use CSS selectors and create responsive layouts.
- Build interfaces with Bootstrap and Tailwind CSS.
- Work with JavaScript arrays, objects, functions and common methods.
- Develop HTTP routes and dynamic pages using Node.js, Express and EJS.
- Manage user sessions, cookies and basic application state.
- Install, configure and connect to MongoDB.
- Build registration and login APIs with password hashing and JWT authentication.
- Develop protected CRUD endpoints and associate records with authenticated users.
- Organise practical work and document implementations using Git and GitHub.

---

<div align="center">

**Backend Development Coursework Repository**  
**Divyansh Panwar · B.Tech CSE (Core) · UPES Dehradun**

</div>
