const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const createHeaders = (token) => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
});

export const resumeApi = {
  // Generate a new resume with AI
  generateResume: async (token, resumeData) => {
    const response = await fetch(`${API_URL}/api/resumes/generate`, {
      method: 'POST',
      headers: createHeaders(token),
      body: JSON.stringify(resumeData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to generate resume');
    }
    
    return response.json();
  },

  // Get all resumes for the authenticated user
  getResumes: async (token) => {
    const response = await fetch(`${API_URL}/api/resumes`, {
      method: 'GET',
      headers: createHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch resumes');
    }
    
    return response.json();
  },

  // Get a specific resume by ID
  getResumeById: async (token, id) => {
    const response = await fetch(`${API_URL}/api/resumes/${id}`, {
      method: 'GET',
      headers: createHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch resume');
    }
    
    return response.json();
  },

  // Update a specific resume
  updateResume: async (token, id, resumeData) => {
    const response = await fetch(`${API_URL}/api/resumes/${id}`, {
      method: 'PUT',
      headers: createHeaders(token),
      body: JSON.stringify(resumeData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to update resume');
    }
    
    return response.json();
  },

  // Delete a specific resume
  deleteResume: async (token, id) => {
    const response = await fetch(`${API_URL}/api/resumes/${id}`, {
      method: 'DELETE',
      headers: createHeaders(token),
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete resume');
    }
    
    return response.json();
  }
};
