const Resume = require('../models/Resume');
const { generateResumeContent } = require('../services/aiService');

// @desc    Generate a new resume using AI and save it
// @route   POST /api/resumes/generate
// @access  Private
const generateResume = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const resumeData = req.body;

    if (!resumeData || !resumeData.personalInfo || !resumeData.personalInfo.fullName) {
      return res.status(400).json({
        success: false,
        message: 'Missing required personal information.'
      });
    }

    // Call Groq AI Service to generate enhanced structured data
    const enhancedContent = await generateResumeContent(resumeData);

    // Merge generated content with the base data
    const newResume = new Resume({
      clerkUserId,
      title: `${resumeData.personalInfo.fullName}'s Resume - ${new Date().toLocaleDateString()}`,
      personalInfo: resumeData.personalInfo,
      summary: enhancedContent.summary || resumeData.personalInfo.summary,
      education: enhancedContent.education || resumeData.education,
      experience: enhancedContent.experience || resumeData.experience,
      skills: enhancedContent.skills || resumeData.skills,
      projects: enhancedContent.projects || resumeData.projects,
      certifications: enhancedContent.certifications || resumeData.certifications,
      achievements: enhancedContent.achievements || resumeData.achievements,
      languages: resumeData.languages || [],
      interests: resumeData.interests || [],
      generatedContent: enhancedContent // Store the raw generated structured JSON just in case
    });

    const savedResume = await newResume.save();

    res.status(201).json(savedResume);
  } catch (error) {
    console.error('Error generating resume:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to generate resume.'
    });
  }
};

// @desc    Get all resumes for the authenticated user
// @route   GET /api/resumes
// @access  Private
const getResumes = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const resumes = await Resume.find({ clerkUserId }).sort({ updatedAt: -1 });
    
    res.status(200).json(resumes);
  } catch (error) {
    console.error('Error fetching resumes:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching resumes.'
    });
  }
};

// @desc    Get a specific resume by ID
// @route   GET /api/resumes/:id
// @access  Private
const getResumeById = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }

    // Verify ownership
    if (resume.clerkUserId !== clerkUserId) {
      return res.status(403).json({ success: false, message: 'Not authorized to access this resume.' });
    }

    res.status(200).json(resume);
  } catch (error) {
    console.error('Error fetching resume:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }
    res.status(500).json({ success: false, message: 'Server error while fetching resume.' });
  }
};

// @desc    Update a specific resume
// @route   PUT /api/resumes/:id
// @access  Private
const updateResume = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }

    // Verify ownership
    if (resume.clerkUserId !== clerkUserId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this resume.' });
    }

    // Prevent changing clerkUserId
    const updateData = { ...req.body };
    delete updateData.clerkUserId;

    resume = await Resume.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    res.status(200).json(resume);
  } catch (error) {
    console.error('Error updating resume:', error);
    res.status(500).json({ success: false, message: 'Server error while updating resume.' });
  }
};

// @desc    Delete a specific resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = async (req, res) => {
  try {
    const clerkUserId = req.auth.userId;
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found.' });
    }

    // Verify ownership
    if (resume.clerkUserId !== clerkUserId) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this resume.' });
    }

    await resume.deleteOne();

    res.status(200).json({ success: true, message: 'Resume removed successfully.' });
  } catch (error) {
    console.error('Error deleting resume:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting resume.' });
  }
};

module.exports = {
  generateResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume
};
