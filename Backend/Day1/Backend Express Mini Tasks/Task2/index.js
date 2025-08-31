const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.json({ message: `You requested user with ID: ${userId}` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
