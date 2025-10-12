import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
import User from './models/userSchema.js';
dotenv.config();
const app =express();
const server = http.createServer(app);

app.use(cors({
    origin: 'http://localhost:5173', 
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
    
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})

app.get("/", (req, res)=>{
    res.send("Hello World");
})

app.post('/google-signin', async (req , res)=>{
const {username , email , googleId} = req.body;
try{
    const user = await User.findOne({email});
    if(user){
        res.status(200).json(user);
    }
    else{
        const newUser = new User({username: username, email, googleId});
        await newUser.save();
        res.status(201).json(newUser);
    }
}
catch(err){
    console.log(err);
    res.status(500).json({message: "Internal Server Error"});
}
})

server.listen(3000, (()=>{
    console.log("Server started on port 3000");
}))