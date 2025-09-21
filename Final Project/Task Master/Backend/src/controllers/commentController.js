const Comment = require("../models/Comment");
const Task = require("../models/Task");

// Add comment
exports.addComment = async (req, res) => {
  const task = await Task.findById(req.params.taskId);
  if (!task) return res.status(404).json({ message: "Task not found" });

  const comment = await Comment.create({
    task: task._id,
    user: req.user._id,
    content: req.body.content,
  });

  res.status(201).json(comment);
};

// Get comments
exports.getComments = async (req, res) => {
  const comments = await Comment.find({ task: req.params.taskId }).populate("user", "name");
  res.json(comments);
};

// Delete comment
exports.deleteComment = async (req, res) => {
  const comment = await Comment.findById(req.params.commentId);
  if (!comment) return res.status(404).json({ message: "Comment not found" });

  if (comment.user.toString() !== req.user._id.toString() && req.user.role !== "admin")
    return res.status(403).json({ message: "Not authorized" });

  await comment.deleteOne();
  res.json({ message: "Comment deleted" });
};
