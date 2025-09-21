const express = require("express");
const { addComment, getComments, deleteComment } = require("../controllers/commentController");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router({ mergeParams: true });

router.use(authMiddleware);

router.post("/", addComment);
router.get("/", getComments);
router.delete("/:commentId", deleteComment);

module.exports = router;
