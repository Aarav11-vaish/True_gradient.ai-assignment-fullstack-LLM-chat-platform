import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import jwt from 'jsonwebtoken';

import User from './models/userSchema.js';
import ChatStore from './models/chatstoreschema.js';
import OpenAI from 'openai';
import { error } from 'console';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    
}).catch((err) => {
    console.log("Error connecting to MongoDB", err);
})
// const openai = new OpenAI({
    //     apiKey: process.env.OPEN_AI_KEY,
    // })
    const protectroute = async (req, res, next) => {
    
        try {
            const token = req.cookies.jwt;
            if (!token) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded);
            //what will this decoded have?
            // The decoded variable will contain the payload of the JWT token, 
            // which typically includes the user's ID and any other information that was encoded when the token was created.
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            req.user = user;
            next();
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: "Internal server error" });
        }
    }
   
    
    const genAI = new GoogleGenerativeAI(
        process.env.GEMINI_API_KEY
);
app.post('/chat/messages', protectroute , async (req, res) => {
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
        let chat = await ChatStore.findOne({userId: req.user._id});
        //what will this chat have?
        // The chat variable will contain the chat document retrieved from the ChatStore collection in the database. 
        // If no chat document exists, it will be null or undefined.
        if (!chat) {
            chat = new ChatStore({
                userId: req.user._id,
                messages: []
            });
        }

        chat.messages.push({ role: 'user', content: message },
            { role: 'assistant', content: reply });
        await chat.save();
        res.json({ reply, messages : chat.messages });

    }
    catch (e) {
        console.error("Error generating chat response:", e);
        res.status(500).json({ error: 'Failed to generate chat response' });
    }
})

app.get('/chat/messages', protectroute , async (req, res) => {
    try {
        const chat = await ChatStore.findOne({ userId: req.user._id });
        if (!chat) {
            return res.json([]);
        }
        res.json(chat.messages);

        //   const chats = await ChatStore.find().sort({ createdAt: -1 });
        // res.json(chats);
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
        let user = await User.findOne({ email });

        if(!user){
            user = new User({
                username,
                email,
                googleId
            });
            await user.save();

        }
        const token = jwt.sign({
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'

        })
        res.status(200).json({user , token });

       
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

server.listen(3000, (() => {
    console.log("Server started on port 3000");
}))