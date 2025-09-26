const Task = require("../models/Task");

exports.createTask = async (req, res, next) => {
  try {
    const attachments = req.files ? req.files.map((f) => f.filename) : [];

    let assignedUser = req.user.id;
    if (req.user.role === "admin" && req.body.user) {
      assignedUser = req.body.user;
    }

    const deadline = req.body.deadline ? new Date(req.body.deadline) : undefined;

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      deadline,
      user: assignedUser,
      attachments,
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const { search, status, priority, page = 1, limit = 3, sort = "-createdAt" } = req.query;

    let query = req.user.role === "admin" ? {} : { user: req.user.id };

    if (status) query.status = status;
    if (priority) query.priority = priority;
    if (search) query.title = { $regex: search, $options: "i" };

    const tasks = await Task.find(query)
      .populate("user", "name email role")
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Task.countDocuments(query);
    res.json({ tasks, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.getTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id).populate("user", "name email role");
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user._id.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const attachments = req.files && req.files.length > 0
      ? req.files.map((f) => f.filename)
      : task.attachments;

    let updatedUser = task.user;
    if (req.user.role === "admin" && req.body.user) {
      updatedUser = req.body.user;
    }

    const deadline = req.body.deadline ? new Date(req.body.deadline) : task.deadline;

    task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority,
        status: req.body.status,
        deadline,
        user: updatedUser,
        attachments,
      },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    await task.deleteOne();
    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.uploadAttachments = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (task.user.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied" });
    }

    const fileNames = req.files.map((f) => f.filename);
    task.attachments.push(...fileNames);
    await task.save();

    res.json(task);
  } catch (err) {
    next(err);
  }
};
