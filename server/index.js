const express = require("express");
const multer = require("multer"); // for handling file uploads
const cors = require("cors");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/Users");

// Middleware to parse JSON body
app.use(express.json());

app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["POST", "GET", "PUT", "DELETE"],
      credentials: true,
    })
  );

// XsdsmXqL36QtSs4G
mongoose.connect(
  "mongodb+srv://roshikanayanadhara:XsdsmXqL36QtSs4G@cluster0.y6eekh5.mongodb.net/MERN-FullStack-Blog"
);

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users"); // specify the destination folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // generate a unique filename for the uploaded image
  },
});

const upload = multer({ storage: storage });

// Route for user registration
app.post("/register", upload.single("img"), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const img = req.file.filename; // get the filename of the uploaded image

    const newUser = new UserModel({ username, email, password, img });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to get all users
app.get("/getUsers", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});

// npm install mongodb
