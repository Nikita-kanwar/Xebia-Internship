const express = require("express");
const { body } = require("express-validator");
const { signup, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name", "Name is required").notEmpty(),
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password must be 6+ chars").isLength({ min: 6 }),
  ],
  signup
);

router.post(
  "/login",
  [
    body("email", "Please include a valid email").isEmail(),
    body("password", "Password is required").exists(),
  ],
  login
);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({ msg: "Profile route", user: req.user });
});

module.exports = router;
