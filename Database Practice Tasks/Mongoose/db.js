import mongoose from "mongoose";

try {
  await mongoose.connect(
    "mongodb+srv://NikitaKanwar:12345@cluster0.gy1bh5r.mongodb.net/College?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error("Connection error:", error);
  process.exit();
}

  //  User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
});

const User = mongoose.model("User", userSchema);


  //  Post Schema & Model

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
  comments: [
    {
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const Post = mongoose.model("Post", postSchema);

// insert users
// await User.insertMany([
//   { name: "Nikita", age: 20, email: "nikitarathore2005@gmail.com" },
//   { name: "Devika", age: 19, email: "devika@gmail.com" },
//   { name: "Priyanka", age: 28, email: "priyanka@gmail.com" },
//   { name: "Siya", age: 23, email: "siya@gmail.com" },
// ]);
console.log("Users inserted");

// Insert Post
const user = await User.findOne({ name: "Nikita" });

await Post.create({
  title: "My First Post",
  content: "This is my very first post!",
  author: user._id,
  comments: [{ text: "Great post!" }, { text: "Keep it up!" }],
});
console.log("Post created with reference to User");


// Find all users
const allUsers = await User.find();
console.log("All Users:", allUsers);

// Find one user
const oneUser = await User.findOne({ name: "Nikita" });
console.log("One User:", oneUser);

// Filtering ($gt, $lt, $in)
const usersOver20 = await User.find({ age: { $gt: 20 } });
console.log("Users over 20:", usersOver20);

const usersUnder20 = await User.find({ age: { $lt: 20 } });
console.log("Users under 20:", usersUnder20);

const selectedUsers = await User.find({ name: { $in: ["Nikita", "Siya"] } });
console.log("Users Nikita or Siya:", selectedUsers);

// Projection & Sorting
const onlyNames = await User.find({}, "name -_id");
console.log("Only Names:", onlyNames);

const sortedByAge = await User.find().sort({ age: -1 });
console.log("Sorted by age (desc):", sortedByAge);

// Task: users older than 20, only names
const taskResult = await User.find({ age: { $gt: 20 } }, "name -_id");
console.log("Task Result:", taskResult);


// Update one
await User.updateOne({ name: "Nikita" }, { $set: { age: 22 } });
console.log("Updated Nikita's age to 22");

// Increase age 
await User.updateMany({ age: { $gte: 20 } }, { $inc: { age: 1 } });
console.log("Increased age of all users >= 20 by 1");


// Delete one
await User.deleteOne({ name: "Priyanka" });
console.log(" Deleted Priyanka");

// Delete all users under 18
await User.deleteMany({ age: { $lt: 18 } });
console.log("Deleted all users under 18");

// Relationshiip populate
const posts = await Post.find().populate("author", "name email -_id");
console.log("Posts with populated author:", posts);


// Close connection
await mongoose.connection.close();
console.log("MongoDB connection closed");
