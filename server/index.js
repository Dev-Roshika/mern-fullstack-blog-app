import dotenv from "dotenv";
import express from "express";
import multer from "multer"; // for handling file uploads
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import UserModel from "./models/User.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/postsRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8081;

let refreshTokens = [];

// XsdsmXqL36QtSs4G
mongoose.connect(
  "mongodb+srv://roshikanayanadhara:XsdsmXqL36QtSs4G@cluster0.y6eekh5.mongodb.net/MERN-FullStack-Blog"
);

const app = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware to parse JSON body
app.use(express.json());
app.use(cookieParser());

app.use("/uploads/users", express.static("uploads/users"));
app.use("/uploads/posts", express.static("uploads/posts"));

app.use("/posts", postRoutes);

//Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users"); // specify the destination folder where images will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // generate a unique filename for the uploaded image
  },
});

const upload = multer({ storage: storage });

app.get("/", (req, res) => {
  res.json("Hello from Express");
});

////////////////////////////////////////UPLOAD POST START////////////////////////////////////////

// Multer storage configuration for posts
const postStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/posts");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const postUpload = multer({ storage: postStorage });

app.post("/upload", postUpload.single("file"), (req, res) => {
  console.log(req.file);
  const filename = req.file.filename;
  console.log("filename : ", filename);
  res.json(filename);
});

////////////////////////////////////////UPLOAD POST END////////////////////////////////////////

////////////////////////////////////////AUTH START////////////////////////////////////////

// Route for user registration
app.post("/auth/register", upload.single("img"), async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const img = req.file.filename; // get the filename of the uploaded image
    console.log(username, email, password, img);
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      img,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    //const { username, password } = req.body;
    const username = req.body.username;
    const user = await UserModel.findOne({ username });

    if (!user || !(await user.isValidPassword(req.body.password))) {
      return res.status(400).json({ error: "Invalid credentials" });
    } else {
      const token = jwt.sign({ _id: user._id }, "jwtkey");
      const { password, ...userWithoutPassword } = user.toObject();

      res
        .cookie("access_token", token, {
          httpOnly: true,
          //,
          // secure: true,
          // sameSite: "none",
        })
        .status(200)
        .json(userWithoutPassword);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/auth/logout", (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    })
    .json({ message: "user has been Logged out" });
});

////////////////////////////////////////AUTH END////////////////////////////////////////

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// npm install mongodb
