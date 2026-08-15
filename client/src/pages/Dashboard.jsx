import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { FilePlus2, FileText, Trash2, ExternalLink } from 'lucide-react';
import { resumeApi } from '../services/api';

const ResumeCard = ({ resume, onDelete }) => {
  return (
    <div className="glass-card flex flex-col justify-between" style={{ padding: '1.5rem', minHeight: '200px' }}>
      <div>
        <div className="flex justify-between items-center mb-2">
          <FileText size={24} className="text-primary" style={{ color: 'var(--primary)' }} />
          <div className="badge">{new Date(resume.createdAt).toLocaleDateString()}</div>
        </div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
          {resume.title || resume.personalInfo?.fullName || 'Untitled Resume'}
        </h3>
        <p style={{ fontSize: '0.875rem' }}>
          {resume.personalInfo?.jobTitle || 'No title specified'}
        </p>
      </div>
      
      <div className="card-actions justify-between items-center mt-4 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
        <Link to={`/resume/${resume._id}`} className="btn btn-outline btn-sm">
          <ExternalLink size={16} /> View
        </Link>
        <button 
          onClick={() => onDelete(resume._id)} 
          className="btn btn-ghost btn-sm"
          style={{ color: 'var(--danger)' }}
          title="Delete Resume"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { getToken } = useAuth();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const data = await resumeApi.getResumes(token);
      setResumes(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load resumes. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this resume?')) return;
    
    try {
      const token = await getToken();
      await resumeApi.deleteResume(token, id);
      setResumes(resumes.filter(r => r._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete resume');
    }
  };

  if (loading) {
    return (
      <div className="container py-8">
        <h2>My Resumes</h2>
        <div className="grid grid-cols-3 mt-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton" style={{ height: '200px', borderRadius: '1rem' }}></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2>My Resumes</h2>
        <Link to="/builder" className="btn btn-primary">
          <FilePlus2 size={20} /> Create New Resume
        </Link>
      </div>

      {error && (
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
          {error}
        </div>
      )}

      {resumes.length === 0 && !error ? (
        <div className="glass-card text-center py-16 flex flex-col items-center">
          <FileText size={48} className="text-muted mb-4" style={{ color: 'var(--text-muted)' }} />
          <h3>No resumes found</h3>
          <p className="mb-6">You haven't created any resumes yet.</p>
          <Link to="/builder" className="btn btn-primary">
            Start Building
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3">
          {resumes.map(resume => (
            <ResumeCard key={resume._id} resume={resume} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
