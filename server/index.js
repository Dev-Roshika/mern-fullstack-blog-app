import dotenv from "dotenv";
import express from "express";
import multer from "multer"; // for handling file uploads
import cors from "cors";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import UserModel from "./models/Users.js";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 8081;

let refreshTokens = [];

// XsdsmXqL36QtSs4G
mongoose.connect(
  "mongodb+srv://roshikanayanadhara:XsdsmXqL36QtSs4G@cluster0.y6eekh5.mongodb.net/MERN-FullStack-Blog"
);

const app = express();

// Middleware to parse JSON body
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

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
          secure: true,
          sameSite: "none",
        })
        .status(200)
        .json(userWithoutPassword);
    }
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

app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401).json({ error: "Unauthorized" });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).json({ error: "Forbidden" });
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1800s",
  });
}

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// npm install mongodb
