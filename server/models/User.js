import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "",
  },
});

// Method to validate password
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

const UserModel = mongoose.model("users", UserSchema);

//module.exports = UserModel; // Exporting the model so that we can use it in other files

export default UserModel;