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
  res.json({ message: "Add a post" });

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
  res.json({ message: "Update a post" });
};
