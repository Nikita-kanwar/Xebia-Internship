const express = require("express");
const {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  uploadAttachments,
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");
const commentRoutes = require("./commentRoutes");

const router = express.Router();

router.post("/", authMiddleware, upload.array("attachments"), createTask);

router.get("/", authMiddleware, getTasks);

router.get("/:id", authMiddleware, getTask);

router.put("/:id", authMiddleware, upload.array("attachments"), updateTask);

router.delete("/:id", authMiddleware, deleteTask);

router.post("/:id/attachments", authMiddleware, upload.array("attachments"), uploadAttachments);

router.use("/:taskId/comments", commentRoutes);

module.exports = router;
