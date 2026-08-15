import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import resumeRoutes from "./routes/resumeRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Custom middleware to handle Bearer tokens for authentication
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    // Create auth object from Bearer token
    req.auth = {
      userId: token || 'user-' + Date.now()
    };
    console.log('[Auth Middleware] Authenticated with Bearer token, userId:', req.auth.userId);
  }
  next();
});

app.use("/api/resumes", resumeRoutes);
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "ResumeCookAIX API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});