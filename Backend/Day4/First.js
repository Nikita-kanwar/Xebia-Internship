const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
// const mongoSanitize = require("express-mongo-sanitize");

const app = express();
app.use(express.json());

app.use(helmet());
app.use(cors());
// app.use(mongoSanitize({ ignoreQuery: true }));

const MONGO_URI =
  "mongodb+srv://NikitaKanwar:12345@cluster0.gy1bh5r.mongodb.net/Signup&Login?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB database connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

const User = mongoose.model("User", userSchema);

const SECRET_KEY = "mysecretkey";

app.get("/", (req, res) => {
  res.send(
    "Server running"
  );
});

app.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  const existingUser = await User.findOne({ username });
  if (existingUser)
    return res.status(400).json({ error: "Username already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    role: role || "user",
  });
  await newUser.save();

  res.json({ message: "User registered successfully" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
  res.json({ message: "Login successful", token });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role)
      return res.status(403).json({ error: "Access denied" });
    next();
  };
}

app.get("/profile", authenticateToken, (req, res) => {
  res.json({
    message: `Welcome to your profile, ${req.user.username}`,
    role: req.user.role,
  });
});

app.delete(
  "/delete-user/:username",
  authenticateToken,
  authorizeRole("admin"),
  async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    await User.deleteOne({ username });
    res.json({ message: `User ${username} deleted successfully` });
  }
);

app.get("/all-users", async (req, res) => {
  const allUsers = await User.find({}, "- password");
  res.json(allUsers);
});

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
