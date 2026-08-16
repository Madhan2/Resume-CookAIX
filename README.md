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


**📁 Resume Generation Workflow:**

1.The user signs in using Clerk.
2.The user enters their resume information.
3.The React frontend sends the information to the Express backend.
4.The backend verifies the authenticated user.
5.The backend sends the user's information to the Groq AI API.
6.Groq generates improved and structured resume content.
7.The backend processes the generated response.
8.The completed resume is stored in MongoDB Atlas.
9.The generated resume is returned to the frontend.
10.The user can view and manage the saved resume.


## Technology Stack

| Category | Technology |
|---|---|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| ODM | Mongoose |
| Authentication | Clerk |
| Generative AI | Groq API |
| AI Model | Llama 3.3 70B Versatile |
| Deployment | Vercel & Render (Backend Hosting) |




**AI Integration**

Groq API is used for Generative AI-based resume content generation.(not all detail though)

User-provided resume information is sent to the AI with instructions to improve grammar, wording, professionalism, and ATS-friendliness.

The AI is instructed not to invent qualifications, experience, skills, or other facts.

The response is returned as structured JSON, making it easy to process and store individual resume sections.


**Key Design Decisions**

React + Express separation: React handles the UI, while Express manages API requests, AI integration, authentication, and database operations.

Clerk authentication: Protects user-specific functionality and associates each resume with its authenticated user.

MongoDB Atlas: Stores generated resumes for persistent access and management.



## 🧱 Setup

git clone https://github.com/Madhan2/Resume-CookAIX.git 

cd Resume-CookAIX

**Frontend**

cd client
npm install

**Create client/.env:**

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key

VITE_API_URL=your_backend_url

**Run:**

npm run dev

**Backend**

In a new terminal:

cd server
npm install

**Create server/.env:**

PORT=5000

MONGODB_URI=your_mongodb_uri

GROQ_API_KEY=your_groq_api_key

GROQ_MODEL=llama-3.3-70b-versatile

CLERK_SECRET_KEY=your_clerk_secret_key


**Run:**

npm run dev
> Keep .env files private and never commit them to GitHub.

After that you can deploy the app to Vercel and Render.

Note : Using only Vercel will crash the app as due to the Express backend, so replace the api url in vercel with the render app url. Then deploy the Vercel App.

## 🈸️ Usage

1. Open the ResumeCookAIX web application.

2. Sign up or log in using Clerk.

3. Enter your personal, education, experience, project, skills, and other resume details.

4. Click Generate Resume.

5. Groq AI improves and structures the provided information.

6. Review the generated resume.

7. Your resume is saved to MongoDB and can be viewed, updated, or deleted.


                       **==== Thats it , what more can i put here? 🤔 ====**
