import mongoose from "mongoose";
import User from "./userSchema.js";
const chatStoreSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId,
         ref: 'User' },
    messages: [
        {
            role: { type: String },
            content: { type: String }
        }
    ]
}, { timestamps: true });

export default mongoose.model("ChatStore", chatStoreSchema);