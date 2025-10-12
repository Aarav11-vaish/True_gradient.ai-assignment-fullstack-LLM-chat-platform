import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: { type: String, select: false },
  googleId: { type: String, unique: true, sparse: true },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
