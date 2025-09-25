const express = require("express");
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });


router.post("/", authMiddleware, createComment);
router.get("/", authMiddleware, getComments);
router.put("/:commentId", authMiddleware, updateComment);
router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;
