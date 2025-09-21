const Task = require("../models/Task");

// Create task
exports.createTask = async (req, res) => {
  const { title, description, priority, status, deadline } = req.body;
  const attachments = req.files ? req.files.map(f => f.path) : [];
  const task = await Task.create({ user: req.user._id, title, description, priority, status, deadline, attachments });
  res.status(201).json(task);
};


exports.getTasks = async (req, res) => {
  const { search, status, priority, page = 1, limit = 10, sort = "createdAt" } = req.query;
  const query = { user: req.user._id };
  if (search) query.title = { $regex: search, $options: "i" };
  if (status) query.status = status;
  if (priority) query.priority = priority;

  const tasks = await Task.find(query)
    .sort({ [sort]: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Task.countDocuments(query);
  res.json({ tasks, total, page: parseInt(page), pages: Math.ceil(total / limit) });
};

// Get single task
exports.getTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

// Update task
exports.updateTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user._id.toString() && req.user.role !== "admin")
    return res.status(403).json({ message: "Not authorized" });

  const { title, description, priority, status, deadline } = req.body;
  Object.assign(task, { title, description, priority, status, deadline });

  if (req.files) task.attachments.push(...req.files.map(f => f.path));
  await task.save();
  res.json(task);
};

// Delete task
exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.user.toString() !== req.user._id.toString() && req.user.role !== "admin")
    return res.status(403).json({ message: "Not authorized" });

  await task.deleteOne();
  res.json({ message: "Task deleted" });
};
