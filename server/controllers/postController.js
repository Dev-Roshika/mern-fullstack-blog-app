import PostModel from "../models/Post.js";
import jwt from "jsonwebtoken";

// Get all posts or filter by category
export const getPosts = async (req, res) => {
  try {
    const { cat } = req.query;
    const query = cat ? { cat } : {};
    const posts = await PostModel.find(query);
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get a single post by ID
export const getPost = async (req, res) => {
  try {
    const post = await PostModel.findOne({
      id: req.params.id,
    }).populate("uid", "-password"); // Populate the 'uid' field to get user details

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new post
export const addPost = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({ error: "Token is not Valid!" });
  }

  jwt.verify(token, "jwtkey", async (err, userInfo) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }

    const { title, desc, img, cat, date } = req.body;
    const newPost = new PostModel({
      title,
      description: desc,
      img,
      cat,
      date,
      uid: userInfo._id,
    });
    await newPost.save();
    res.json(newPost).status(201);
  });
};

export const deletePost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ error: "Token is not Valid!" });
    }
    const postId = req.params.id;
    const deletedPost = await PostModel.deleteOne({ id: postId });
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update a post by ID
export const updatePost = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      return res.status(401).json({ error: "Token is not Valid!" });
    }

    jwt.verify(token, "jwtkey", async (err, userInfo) => {
      if (err) {
        return res.status(403).json({ error: "Invalid token" });
      }

      const postId = req.params.id;
      const { title, desc, img, cat, date } = req.body;
      const updatedPost = await PostModel.findOneAndUpdate(
        { id: postId },
        {
          title,
          description: desc,
          img,
          cat,
          date,
          uid: userInfo._id,
        },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ error: "Post not found" });
      }
      res.json(updatedPost);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
