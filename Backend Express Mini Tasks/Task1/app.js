const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("This is the homepage");
});

app.get("/greet", (req, res) => {
  res.send("Hello from Express!");
});

app.post("/submit", (req, res) => {
  res.send("Data submitted successfully!");
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
