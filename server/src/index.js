require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const resumeRoutes = require('./routes/resumeRoutes');

// Initialize app
const app = express();

// Connect to Database
connectDB();

// Middleware
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(cors({
  origin: clientUrl,
  credentials: true
}));

app.use(express.json());

// Basic health check route
app.get('/', (req, res) => {
  res.json({ message: 'ResumeCookAIX API is running' });
});

// Resume Routes
app.use('/api/resumes', resumeRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (err.message === 'Unauthenticated') {
    return res.status(401).json({ success: false, message: 'Unauthenticated' });
  }

  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong' 
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
