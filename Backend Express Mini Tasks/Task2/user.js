const express = require("express");
const router = express.Router();

let users = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 30 }
];

router.get("/", (req, res) => {
  const { age } = req.query;
  let result = users;
  if (age) result = users.filter(u => u.age == age);
  res.json(result);
});

router.get("/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

router.post("/", (req, res) => {
  const { name, age } = req.body;
  const newUser = { id: users.length + 1, name, age };
  users.push(newUser);
  res.status(201).json(newUser);
});

module.exports = router;
