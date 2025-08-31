const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [];
let nextId = 1;


app.post("/todos", (req, res) => {
  const todo = { id: nextId++, task: req.body.task };
  todos.push(todo);
  res.json(todo);
});

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id == req.params.id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find((t) => t.id == req.params.id);
  if (todo) {
    todo.task = req.body.task;
    res.json(todo);
  } else {
    res.status(404).json({ error: "Todo not found" });
  }
});

app.delete("/todos/:id", (req, res) => {
  todos = todos.filter((t) => t.id != req.params.id);
  res.json({ message: "Todo deleted" });
});

app.listen(PORT, () => {
  console.log(`TODO API running on http://localhost:${PORT}`);
});
