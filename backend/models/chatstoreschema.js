import mongoose from "mongoose";
const chatStoreSchema = new mongoose.Schema({
    messages: [
        {
            role: { type: String },
            content: { type: String}
        }
    ]
}, { timestamps: true });

export default mongoose.model("ChatStore", chatStoreSchema);