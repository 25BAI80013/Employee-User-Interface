const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory employee data
let employees = [];

// Routes
app.get("/employees", (req, res) => {
  res.json(employees);
});

app.post("/employees", (req, res) => {
  const { id, name, position } = req.body;
  if (employees.some(emp => emp.id === id)) {
    return res.status(400).json({ message: "Employee ID already exists" });
  }
  employees.push({ id, name, position });
  res.json({ message: "Employee added" });
});

app.delete("/employees/:id", (req, res) => {
  employees = employees.filter(emp => emp.id !== req.params.id);
  res.json({ message: "Employee deleted" });
});

// Listen on dynamic port for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));