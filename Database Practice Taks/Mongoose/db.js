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
await User.create({
  name: "Nikita",
  age: 20,
  email: "nikitarathore2005@gmail.com",
});

console.log("User inserted successfully");

// Close connection
await mongoose.connection.close();
