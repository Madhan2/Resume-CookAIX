const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  company: { type: String },
  jobTitle: { type: String },
  location: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  current: { type: Boolean, default: false },
  responsibilities: { type: String },
  achievements: { type: String }
});

const EducationSchema = new mongoose.Schema({
  institution: { type: String },
  degree: { type: String },
  fieldOfStudy: { type: String },
  startDate: { type: String },
  endDate: { type: String },
  gpa: { type: String },
  description: { type: String }
});

const ProjectSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  technologies: { type: String },
  projectUrl: { type: String }
});

const CertificationSchema = new mongoose.Schema({
  name: { type: String },
  issuer: { type: String },
  date: { type: String },
  url: { type: String }
});

const PersonalInfoSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  linkedinUrl: { type: String },
  githubUrl: { type: String }
});

const ResumeSchema = new mongoose.Schema({
  clerkUserId: { 
    type: String, 
    required: true,
    index: true 
  },
  title: { 
    type: String 
  },
  personalInfo: PersonalInfoSchema,
  summary: { type: String },
  education: [EducationSchema],
  experience: [ExperienceSchema],
  skills: [String],
  projects: [ProjectSchema],
  certifications: [CertificationSchema],
  achievements: [String],
  languages: [String],
  interests: [String],
  generatedContent: { type: mongoose.Schema.Types.Mixed }
}, {
  timestamps: true
});

module.exports = mongoose.model('Resume', ResumeSchema);
