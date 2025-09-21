const express = require("express");
const { createTask, getTasks, getTask, updateTask, deleteTask } = require("../controllers/taskController");
const { authMiddleware } = require("../middleware/authMiddleware");
const multer = require("multer");
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.use(authMiddleware);

router.post("/", upload.array("attachments"), createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", upload.array("attachments"), updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
