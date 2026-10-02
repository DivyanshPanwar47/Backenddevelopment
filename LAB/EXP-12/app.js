const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const profile = {
  name: "Divyansh Panwar",
  rollNumber: "590018990",
  branch: "B.Tech CSE (Core)",
  university: "UPES Dehradun"
};

let students = [
  { id: 1, name: "Aarav Sharma", course: "B.Tech CSE", semester: 5 },
  { id: 2, name: "Meera Singh", course: "B.Tech CSE", semester: 5 },
  { id: 3, name: "Kabir Verma", course: "B.Tech IT", semester: 3 }
];

const timetable = [
  { day: "Monday", time: "09:00–10:00", subject: "Backend Development", faculty: "Faculty A" },
  { day: "Tuesday", time: "11:00–12:00", subject: "Database Systems", faculty: "Faculty B" },
  { day: "Wednesday", time: "14:00–15:00", subject: "Computer Networks", faculty: "Faculty C" },
  { day: "Thursday", time: "10:00–11:00", subject: "Programming Lab", faculty: "Faculty D" }
];

const tasks = [
  { id: 1, title: "Profile responses", description: "Return profile details as text, HTML and JSON." },
  { id: 2, title: "Calculator API", description: "Read query parameters, validate values and calculate a result." },
  { id: 3, title: "Student management", description: "List students, retrieve one student and add a record." },
  { id: 4, title: "EJS timetable", description: "Render timetable rows using an EJS loop." },
  { id: 5, title: "Student registration", description: "Validate a POST form and render the submitted information." }
];

function renderTask(res, taskId, extra = {}, status = 200) {
  const task = tasks.find(item => item.id === taskId);
  return res.status(status).render("index", {
    profile, students, timetable, tasks, task, taskId,
    result: null, error: "", registration: null, ...extra
  });
}

function calculate(query) {
  const operation = String(query.operation || "").toLowerCase();
  const a = Number(query.first);
  const b = Number(query.second);
  if (query.first === undefined || query.second === undefined || !Number.isFinite(a) || !Number.isFinite(b)) {
    return { error: "Enter two valid numbers." };
  }
  const operations = {
    add: () => a + b,
    subtract: () => a - b,
    multiply: () => a * b,
    divide: () => b === 0 ? null : a / b,
    modulus: () => b === 0 ? null : a % b,
    power: () => a ** b
  };
  if (!operations[operation]) return { error: "Choose a supported operation." };
  const value = operations[operation]();
  if (value === null) return { error: "Division or modulus by zero is not allowed." };
  if (!Number.isFinite(value)) return { error: "The result is outside the supported numeric range." };
  return { value };
}

app.get("/", (req, res) => res.render("index", {
  profile, students, timetable, tasks, task: null, taskId: 0,
  result: null, error: "", registration: null
}));

app.get("/task/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 1 || id > 5) return res.status(404).send("Task not found");
  return renderTask(res, id);
});

app.get("/api/profile/text", (req, res) => {
  res.type("text").send(`${profile.name} | SAP ID: ${profile.rollNumber} | ${profile.branch}`);
});
app.get("/api/profile/html", (req, res) => {
  res.type("html").send(`<!doctype html><html><body><h1>${profile.name}</h1><p>SAP ID: ${profile.rollNumber}</p><p>${profile.branch}</p></body></html>`);
});
app.get("/api/profile/json", (req, res) => res.json(profile));

app.get("/api/calculator", (req, res) => {
  const calculation = calculate(req.query);
  if (calculation.error) return res.status(400).json(calculation);
  return res.json({ operation: req.query.operation, first: Number(req.query.first), second: Number(req.query.second), result: calculation.value });
});

app.get("/students", (req, res) => res.json(students));
app.get("/students/:id", (req, res) => {
  const student = students.find(item => item.id === Number(req.params.id));
  if (!student) return res.status(404).json({ error: "Student not found" });
  return res.json(student);
});
app.post("/students/add", (req, res) => {
  const name = String(req.body.name || "").trim();
  const course = String(req.body.course || "").trim();
  const semester = Number(req.body.semester);
  if (!name || !course || !Number.isInteger(semester) || semester < 1 || semester > 12) {
    return res.status(400).json({ error: "Provide a name, course and valid semester (1–12)." });
  }
  const student = { id: Math.max(0, ...students.map(item => item.id)) + 1, name, course, semester };
  students.push(student);
  return res.status(201).json(student);
});

app.get("/timetable", (req, res) => renderTask(res, 4));
app.post("/student-registration", (req, res) => {
  const registration = {
    name: String(req.body.name || "").trim(),
    email: String(req.body.email || "").trim(),
    course: String(req.body.course || "").trim(),
    semester: String(req.body.semester || "").trim()
  };
  if (!registration.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registration.email) ||
      !registration.course || !registration.semester) {
    return renderTask(res, 5, { error: "Please complete every field with a valid email address.", registration }, 400);
  }
  return renderTask(res, 5, { registration });
});

app.listen(PORT, () => {
  console.log(`Backend Development Experiment 12 running at http://localhost:${PORT}`);
});
