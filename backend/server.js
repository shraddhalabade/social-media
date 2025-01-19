const express = require("express");
const multer = require("multer"); // For handling file uploads
const path = require("path");
const cors = require("cors"); // To enable CORS
const mongoose = require("mongoose"); // For MongoDB

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS for all origins
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files

// MongoDB Connection
const MONGO_URI = "mongodb+srv://shraddhalabade7858:TwCLrXisOVNl7DZG@shraddhacluste.fapbj.mongodb.net/?retryWrites=true&w=majority&appName=shraddhaCluste"; // Replace with your actual MongoDB connection string

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Multer configuration for multiple file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

const upload = multer({ storage: storage });

// Schema and Model for User
const userSchema = new mongoose.Schema({
  name: String,
  handle: String,
  imagePaths: [String], // Array to store multiple image paths
});

const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// POST route for submitting user data and multiple images
app.post("/api/users", upload.array("images", 5), async (req, res) => {  // Maximum of 5 files can be uploaded
  const { name, handle } = req.body;
  const imagePaths = req.files ? req.files.map(file => `/uploads/${file.filename}`) : []; // Map uploaded images to their paths

  try {
    const newUser = new User({ name, handle, imagePaths });
    await newUser.save();
    console.log("Received Data:", { name, handle, imagePaths });
    console.log("Data saved to database");
    res.json({ message: "User submitted successfully!" });
  } catch (error) {
    console.error("Error saving data to database:", error);
    res.status(500).json({ message: "Failed to save user data" });
  }
});

// GET route for fetching all user submissions
app.get("/api/users", async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from the database
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
