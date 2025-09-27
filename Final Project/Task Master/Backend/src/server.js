const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const errorMiddleware = require("./middleware/errorMiddleware");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", 
  process.env.FRONTEND_URL 
].filter(Boolean); 

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(helmet());

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

async function createAdminIfNeeded() {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.log("Set ADMIN_EMAIL and ADMIN_PASSWORD in .env to enable admin creation");
      return;
    }

    const existing = await User.findOne({ email: adminEmail });
    if (!existing) {
      const hashed = await bcrypt.hash(adminPassword, 10);
      await User.create({
        name: "Administrator",
        email: adminEmail,
        password: hashed,
        role: "admin",
      });
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      console.log("ℹAdmin user already exists.");
    }
  } catch (err) {
    console.error("Failed to create admin:", err);
  }
}
createAdminIfNeeded();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/tasks", require("./routes/taskRoutes"));

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
