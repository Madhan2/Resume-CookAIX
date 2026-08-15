# ResumeCookAIX

> AI-powered resume generation platform that transforms user-provided information into professional, ATS-friendly resumes.

## 📌 Overview

ResumeCookAIX is a Generative AI-powered web application designed to help users create professional resumes quickly and efficiently.

Users provide information such as their personal details, education, work experience, projects, skills, certifications, and achievements. ResumeCookAIX uses the Groq AI API to improve and structure the information into a professional, concise, and ATS-friendly resume.

The application also allows authenticated users to securely store and manage their generated resumes.

---

## 🎯 Problem Statement

Creating a professional resume can be time-consuming, especially for students and job seekers who may struggle with:

- Writing professional descriptions
- Structuring their experience and achievements
- Creating ATS-friendly content
- Maintaining consistency throughout a resume
- Knowing how to effectively present their skills and projects

**ResumeCookAIX** addresses these challenges by using Generative AI to transform raw user information into professionally written resume content.

---

## 💡 Solution

ResumeCookAIX provides a simple workflow:

1. User signs in using Clerk authentication.
2. User enters their resume information.
3. The application sends the information to the backend.
4. The backend sends the data to Groq's Generative AI model.
5. The AI improves and structures the resume content.
6. The generated resume is stored securely in MongoDB.
7. The user can view and manage their saved resumes.

---

## ✨ Features

### 🔐 User Authentication
- Secure authentication using Clerk
- Protected resume-generation and management routes
- Each user's resumes are associated with their Clerk user ID

### 🤖 AI Resume Generation
- Uses Groq Generative AI
- Improves grammar and professional wording
- Creates concise and ATS-friendly content
- Generates structured resume sections
- Avoids fabricating qualifications or experience

### 📄 Resume Sections

Users can provide information for:

- Personal Information
- Professional Summary
- Education
- Work Experience
- Projects
- Skills
- Certifications
- Achievements
- Languages
- Interests

### 💾 Resume Storage

Generated resumes are stored in MongoDB Atlas and associated with the authenticated user.

### 🗂️ Resume Management

Users can:

- Generate resumes
- View saved resumes
- View individual resumes
- Update resumes
- Delete resumes

---

## 🏗️ Architecture

```text
                    ┌───────────────────┐
                    │      User         │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │  React Frontend   │
                    │      Vite         │
                    └─────────┬─────────┘
                              │
                              │ API Requests
                              ▼
                    ┌───────────────────┐
                    │ Express Backend   │
                    │      Node.js      │
                    └──────┬─────┬──────┘
                           │     │
                 ┌─────────┘     └─────────┐
                 ▼                         ▼
        ┌─────────────────┐       ┌─────────────────┐
        │  Clerk Auth     │       │   Groq AI API   │
        │ Authentication  │       │ Resume Content  │
        └─────────────────┘       └────────┬────────┘
                                           │
                                           ▼
                                  ┌─────────────────┐
                                  │ MongoDB Atlas   │
                                  │ Resume Storage  │
                                  └─────────────────┘
