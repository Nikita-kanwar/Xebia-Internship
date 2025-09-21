const User = require("../models/User");


exports.getUsers = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};


exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
};


exports.updateUser = async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (req.user.role !== "admin" && req.user._id.toString() !== req.params.id)
    return res.status(403).json({ message: "Not authorized" });

  Object.assign(user, { name, email, role });
  await user.save();
  res.json({ message: "User updated", user });
};

// Delete user
exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  await user.deleteOne();
  res.json({ message: "User deleted" });
};
