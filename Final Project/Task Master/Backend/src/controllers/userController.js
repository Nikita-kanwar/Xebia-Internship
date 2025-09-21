import User from "../models/User.js";


export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    next(error);
  }
};


export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    next(error);
  }
};


export const updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (req.user.role !== "admin" && req.user._id !== user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    if (role && req.user.role === "admin") user.role = role;

    await user.save();
    res.json({ message: "User updated successfully" });
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    await user.remove();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
