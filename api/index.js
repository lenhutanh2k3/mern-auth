import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router } from "./routes/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";

// ---------------------------------------------
const app = express();
dotenv.config(); // Chỉ cần load file .env

// Cấu hình CORS cho phép cookie
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Để đọc cookie trong backend

router(app);

// ---------------------------------------------
// Kết nối tới MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log("Database connection error:", err);
});

// ---------------------------------------------
// Khởi động server
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
