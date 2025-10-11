import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import http from 'http';
import dotenv from 'dotenv';
dotenv.config();
const app =express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("Connected to MongoDB");
    
}).catch((err)=>{
    console.log("Error connecting to MongoDB", err);
})

server.listen(3000, (()=>{
    console.log("Server started on port 3000");
}))