import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import { clerkMiddleware } from "@clerk/express";
const app = express();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());
app.use("/api/resumes", resumeRoutes);
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "ResumeCookAIX API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});