import mongoose from "mongoose";
import AutoIncrementFactory from "mongoose-sequence";

const AutoIncrement = AutoIncrementFactory(mongoose);

const PostSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
  },
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
    ref: "users",
    default: null,
  },
  cat: {
    type: String,
    default: null,
  },
});

PostSchema.plugin(AutoIncrement, { inc_field: "id" }); // 'id' is the field to auto-increment

const PostModel = mongoose.model("posts", PostSchema);

export default PostModel;
