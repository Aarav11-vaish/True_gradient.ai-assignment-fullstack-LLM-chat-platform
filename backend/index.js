import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

import User from './models/userSchema.js';
import ChatStore from './models/chatstoreschema.js';
import OpenAI from 'openai';
import chatsore from '../frontend/state_management/chatstore.js';
dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");

}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})
// const openai = new OpenAI({
//     apiKey: process.env.OPEN_AI_KEY,
// })


const genAI = new GoogleGenerativeAI(
    process.env.GEMINI_API_KEY
);
app.post('/chat/messages', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        // const response = await openai.chat.completions.create({
        //     model : 'gpt-4o-mini', 
        //     messages : [{role: 'user', content: message}]
        // })
        const result = await model.generateContent(message);
        console.log(result);
        const reply = result.response.text();
        console.log(result.response.text());
const docs = ChatStore.create({
            messages: [
                { role: 'user', content: message },
                { role: 'assistant', content: reply }
            ]
        }); 
        // ChatStore.save();
        // const reply = response.choices[0].message.content;
        res.json({ reply , chat : docs });
    }
    catch (e) {
        console.error("Error generating chat response:", e);
        res.status(500).json({ error: 'Failed to generate chat response' });
    }
})

app.get('/chat/messages', async (req, res) => {
  try {
    const chats = await ChatStore.find().sort({ createdAt: -1 });
    res.json(chats);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat messages" });
  }
});




app.get("/", (req, res) => {
    res.send("Hello World");
})

app.post('/google-signin', async (req, res) => {
    const { username, email, googleId } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            res.status(200).json(user);
        }
        else {
            const newUser = new User({ username: username, email, googleId });
            await newUser.save();
            res.status(201).json(newUser);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

server.listen(3000, (() => {
    console.log("Server started on port 3000");
}))