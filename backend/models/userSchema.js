import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: { type: String, select: false }, // Optional for Google users

    googleId: { type: String, unique: true, sparse: true }, // New field for Google users
})

export default mongoose.model("User", userSchema);