const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send(" Welcome to the TODO API ");
});

app.post("/todos", (req, res) => {
  if (!req.body.task) {
    return res.status(400).json({ success: false, error: "Task is required" });
  }
  const todo = { id: nextId++, task: req.body.task };
  todos.push(todo);
  res.status(201).json({ success: true, data: todo });
});

app.get("/todos", (req, res) => {
  res.status(200).json({ success: true, data: todos });
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id == req.params.id);
  if (todo) {
    res.status(200).json({ success: true, data: todo });
  } else {
    res.status(404).json({ success: false, error: "Todo not found" });
  }
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id == req.params.id);
  if (!todo) {
    return res.status(404).json({ success: false, error: "Todo not found" });
  }
  if (!req.body.task) {
    return res.status(400).json({ success: false, error: "Task is required" });
  }
  todo.task = req.body.task;
  res.status(200).json({ success: true, data: todo });
});

app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex((t) => t.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(200).json({ success: true, message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`TODO API running at http://localhost:${PORT}`);
});
