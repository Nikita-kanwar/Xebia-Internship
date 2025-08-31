import User from "../models/userModel.js";

// @desc   Create user
// @route  POST /api/users
export const createUser = async (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });
  const createdUser = await user.save();
  res.status(201).json(createdUser);
};

// @desc   Get all users
// @route  GET /api/users
export const getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

// @desc   Get user by ID
// @route  GET /api/users/:id
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// @desc   Update user
// @route  PUT /api/users/:id
export const updateUser = async (req, res) => {
  const { name, email, age } = req.body;
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.email;
    user.age = age || user.age;

    const updatedUser = await user.save();
    res.json(updatedUser);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};

// @desc   Delete user
// @route  DELETE /api/users/:id
export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
};
