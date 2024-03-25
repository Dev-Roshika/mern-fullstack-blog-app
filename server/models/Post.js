import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  cat: {
    type: String,
    default: null,
  },
});

const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;
