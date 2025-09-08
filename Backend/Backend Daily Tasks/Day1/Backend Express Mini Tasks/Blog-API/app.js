const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let users = [];
let posts = [];
let userId = 1;
let postId = 1;


app.post("/users", (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ success: false, error: "Name is required" });
  }
  const user = { id: userId++, name: req.body.name };
  users.push(user);
  res.status(201).json({ success: true, data: user });
});

app.get("/users", (req, res) => {
  res.status(200).json({ success: true, data: users });
});

app.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  res.status(200).json({ success: true, data: user });
});

app.put("/users/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  user.name = req.body.name || user.name;
  res.status(200).json({ success: true, data: user });
});

app.delete("/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  users.splice(index, 1);
  res.status(200).json({ success: true, message: "User deleted" });
});


app.post("/posts", (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content || !userId) {
    return res
      .status(400)
      .json({ success: false, error: "Title, content, and userId are required" });
  }
  const user = users.find((u) => u.id == userId);
  if (!user) {
    return res.status(404).json({ success: false, error: "User not found" });
  }
  const post = { id: postId++, title, content, userId };
  posts.push(post);
  res.status(201).json({ success: true, data: post });
});

app.get("/posts", (req, res) => {
  res.status(200).json({ success: true, data: posts });
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, error: "Post not found" });
  }
  res.status(200).json({ success: true, data: post });
});

app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id == req.params.id);
  if (!post) {
    return res.status(404).json({ success: false, error: "Post not found" });
  }
  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  res.status(200).json({ success: true, data: post });
});

app.delete("/posts/:id", (req, res) => {
  const index = posts.findIndex((p) => p.id == req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: "Post not found" });
  }
  posts.splice(index, 1);
  res.status(200).json({ success: true, message: "Post deleted" });
});

app.listen(PORT, () => {
  console.log(` Blog API running at http://localhost:${PORT}`);
});
