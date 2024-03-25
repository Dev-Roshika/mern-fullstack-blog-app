import PostModel from "../models/Post.js";

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
    const post = await PostModel.findById(req.params.id);
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
  try {
    const newPost = new PostModel(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
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
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
