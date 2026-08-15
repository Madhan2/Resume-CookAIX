const express = require('express');
const router = express.Router();

const {
  generateResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume
} = require('../controllers/resumeController');

const { requireClerkAuth, ensureAuthenticated } = require('../middleware/authMiddleware');

// All routes here require Clerk authentication
router.use(requireClerkAuth);
router.use(ensureAuthenticated);

// Generate a new resume via AI
router.post('/generate', generateResume);

// Get all resumes for the user
router.get('/', getResumes);

// Get a specific resume
router.get('/:id', getResumeById);

// Update a specific resume
router.put('/:id', updateResume);

// Delete a specific resume
router.delete('/:id', deleteResume);

module.exports = router;
