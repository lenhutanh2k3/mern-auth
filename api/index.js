import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import { router } from "./routes/index.js";
import cors from 'cors';
const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("db connected");
}).catch((err) => {
    console.log(err);
})
router(app);
app.listen(5000, () => {
    console.log("server is running");
});

