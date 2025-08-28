import mongoose from "mongoose";

// Connect 
try {
  await mongoose.connect(
    "mongodb+srv://NikitaKanwar:12345@cluster0.gy1bh5r.mongodb.net/College?retryWrites=true&w=majority&appName=Cluster0"
  );
  console.log("MongoDB connected successfully");
} catch (error) {
  console.error(error);
  process.exit();
}

// schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: {type: String, required: true, unique: true },
});

// model
const User = mongoose.model("User", userSchema);

// Insert a user
// await User.insertMany([
//   {name: "Nikita",age: 20,email: "nikitarathore2005@gmail.com"},
//   {name: "Devika",age: 19,email: "devika@gmail.com"},
//   {name: "Priyanka",age: 28,email: "priyanka@gmail.com"},
//   {name: "Siya",age: 23,email: "siya@gmail.com"}
// ]);

console.log("User inserted successfully");



// find, findOne
const allUsers = await User.find();
console.log("All Users:", allUsers);

const oneUser = await User.findOne({ name: "Nikita" });
console.log("One User:", oneUser);

// Filtering ($gt, $lt, $in)
const usersOver20 = await User.find({ age: { $gt: 20 } });
console.log("Users over 20:", usersOver20);

const usersUnder20 = await User.find({ age: { $lt: 20 } });
console.log("Users under 20:", usersUnder20);

const selectedUsers = await User.find({ name: { $in: ["Nikita", "Siya"] } });
console.log("Users with name Nikita or Siya:", selectedUsers);

// Projection & Sorting
const onlyNames = await User.find({}, "name -_id");
console.log("Only Names:", onlyNames);

const sortedByAge = await User.find().sort({ age: -1 });
console.log("Sorted by age (desc):", sortedByAge);

// Query users older than 20, only return names
const taskResult = await User.find({ age: { $gt: 20 } }, "name -_id");
console.log("Task Result (users older than 20, only names):", taskResult);

// Close connection
await mongoose.connection.close();


