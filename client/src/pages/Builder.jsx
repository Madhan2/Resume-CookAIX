import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Loader2 } from 'lucide-react';
import { resumeApi } from '../services/api';

import PersonalInfo from '../components/PersonalInfo';
import EducationForm from '../components/EducationForm';
import ExperienceForm from '../components/ExperienceForm';
import SkillsForm from '../components/SkillsForm';
import ProjectsForm from '../components/ProjectsForm';
import CertificationsForm from '../components/CertificationsForm';

const Builder = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedinUrl: '',
      githubUrl: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: [],
    projects: [],
    certifications: []
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleArrayChange = (field, newArray) => {
    setFormData(prev => ({
      ...prev,
      [field]: newArray
    }));
  };

  const validateForm = () => {
    if (!formData.personalInfo.fullName || !formData.personalInfo.email) {
      setError('Full Name and Email are required.');
      return false;
    }
    return true;
  };

  const handleGenerate = async () => {
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    try {
      setLoading(true);
      setError('');
      const token = await getToken();
      
      const result = await resumeApi.generateResume(token, formData);
      
      // Navigate to the newly created resume view
      navigate(`/resume/${result._id || result.id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to generate resume. Please try again.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex flex-col items-center mb-8 text-center">
        <h2>Resume Builder</h2>
        <p>Fill out the details below, and let ResumeCookAIX generate a professional resume for you.</p>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '0.5rem', margin: '0 auto 2rem auto', maxWidth: '800px' }}>
          {error}
        </div>
      )}

      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div className="glass-card mb-8">
          <PersonalInfo data={formData.personalInfo} onChange={handlePersonalInfoChange} />
        </div>

        <div className="glass-card mb-8">
          <ExperienceForm 
            experience={formData.experience} 
            onChange={(data) => handleArrayChange('experience', data)} 
          />
        </div>

        <div className="glass-card mb-8">
          <EducationForm 
            education={formData.education} 
            onChange={(data) => handleArrayChange('education', data)} 
          />
        </div>

        <div className="glass-card mb-8">
          <SkillsForm 
            skills={formData.skills} 
            onChange={(data) => handleArrayChange('skills', data)} 
          />
        </div>

        <div className="glass-card mb-8">
          <ProjectsForm 
            projects={formData.projects} 
            onChange={(data) => handleArrayChange('projects', data)} 
          />
        </div>

        <div className="glass-card mb-8">
          <CertificationsForm 
            certifications={formData.certifications} 
            onChange={(data) => handleArrayChange('certifications', data)} 
          />
        </div>

        <div className="flex justify-center mt-8 pb-16">
          <button 
            onClick={handleGenerate} 
            disabled={loading}
            className="btn btn-primary"
            style={{ fontSize: '1.25rem', padding: '1rem 2rem' }}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Generating with AI...
              </>
            ) : (
              <>
                <Sparkles /> Generate Resume with AI
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Builder;
