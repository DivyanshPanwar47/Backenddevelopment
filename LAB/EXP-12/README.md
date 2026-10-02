# Experiment 12 — Node.js, Express.js and EJS

**Course:** Backend Development Lab  
**Student:** Divyansh Panwar · **SAP ID:** 590018990 · B.Tech CSE (Core) · UPES Dehradun

## 1. Aim

To build an Express application with routes that return profile information in different formats, perform calculator operations, manage student records and render a timetable and registration form using EJS.

## 2. Objectives

- Create and start a Node.js server using Express.
- Define GET and POST routes.
- Read query parameters, route parameters and submitted form data.
- Return plain text, HTML and JSON responses.
- Validate form input and return suitable HTTP status codes.
- Configure EJS and render server-side views.
- Use middleware to parse URL-encoded and JSON request bodies.

## 3. Tools and Environment

| Tool | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| npm | Package manager |
| Express.js | Web framework |
| EJS | Template engine |
| Nodemon | Automatic restart during development |
| Visual Studio Code | Code editor |

## 4. Theory

Node.js runs JavaScript outside the browser. Express is a web framework for defining routes and middleware. An Express route connects an HTTP method and URL path to a handler. GET routes commonly retrieve information, while POST routes process submitted data.

Request values are available through `req.query` (query string), `req.params` (route parameters) and `req.body` (parsed request body). Middleware such as `express.urlencoded()` and `express.json()` parses incoming form and JSON data.

EJS is a templating engine that combines HTML with server-provided data. Express renders an EJS file with `res.render()`. Escaped output uses `<%=` and JavaScript logic uses `<%`.

## 5. Tasks Implemented

1. **Profile responses:** `/api/profile/text`, `/api/profile/html` and `/api/profile/json` return the same profile in three formats.
2. **Calculator API:** `/api/calculator` reads an operation and two numbers from query parameters. It supports addition, subtraction, multiplication, division, modulus and power, with input validation.
3. **Student management:** `GET /students` lists records, `GET /students/:id` retrieves one record and `POST /students/add` adds a record to an in-memory array.
4. **EJS timetable:** timetable data is passed from Express to an EJS template and displayed in a table.
5. **Student registration:** a POST form is validated on the server and the submitted values are rendered in the response.

The student list is stored in memory for this demonstration. New records are cleared when the Node.js process restarts.

## 6. Procedure

1. Create the project and initialise npm.
2. Install Express, EJS and Nodemon.
3. Configure EJS as the view engine.
4. Add middleware for URL-encoded and JSON request bodies.
5. Create the profile, calculator and student routes.
6. Add the EJS view for the task directory and practical pages.
7. Add the timetable and registration form.
8. Start the application and test the routes in a browser.

## 7. How to Run

Open a terminal in this folder:

```bash
npm install
npm start
```

Then visit `http://localhost:3000`.

For development with automatic restart:

```bash
npm run dev
```

## 8. Output and Observations

The application displays a task directory with five practical tasks. The profile routes return three response formats, the calculator returns a JSON result, student routes demonstrate retrieval and insertion, and the EJS page renders timetable and registration information.

## 9. Result

A Node.js application using Express and EJS was created with profile, calculator, student, timetable and registration tasks.

## 10. Conclusion

This practical demonstrates the request-response cycle in Express, the use of middleware, route and query parameters, JSON APIs, form handling and server-side rendering with EJS.

## 11. Viva Questions

1. What is Node.js?
2. What is Express.js?
3. What is middleware?
4. What is the difference between `req.params` and `req.query`?
5. What is the purpose of `express.json()`?
6. What is the difference between GET and POST?
7. What is EJS?
8. What is the difference between `<%=` and `<%-` in EJS?
9. What does HTTP status code 201 mean?
10. Why do in-memory records disappear after restarting the server?

## 12. References

- [Node.js documentation](https://nodejs.org/docs/latest/api/)
- [Express routing guide](https://expressjs.com/en/guide/routing.html)
- [Express template engines](https://expressjs.com/en/guide/using-template-engines.html)
- [EJS documentation](https://ejs.co/)
