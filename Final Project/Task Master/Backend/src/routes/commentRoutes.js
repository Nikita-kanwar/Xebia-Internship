const express = require("express");
const { body } = require("express-validator");
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router({ mergeParams: true });

router.post(
  "/",
  authMiddleware,
  [body("text", "Text is required").notEmpty()],
  createComment
);
router.get("/", authMiddleware, getComments);
router.put("/:commentId", authMiddleware, [body("text", "Text is required").notEmpty()], updateComment);
router.delete("/:commentId", authMiddleware, deleteComment);

module.exports = router;
