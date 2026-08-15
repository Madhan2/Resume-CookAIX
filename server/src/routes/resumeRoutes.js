import express from "express";
import { generateResume, getResumes, getResumeById, updateResume, deleteResume } from "../controllers/resumeController.js";
import { ensureAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply auth middleware to all resume routes
router.use(ensureAuthenticated);

router.post("/generate", generateResume);
router.get("/", getResumes);
router.get("/:id", getResumeById);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

export default router;