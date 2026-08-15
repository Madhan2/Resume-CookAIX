import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { Printer, ArrowLeft, Download, Edit } from 'lucide-react';
import { resumeApi } from '../services/api';
import ResumePreview from '../components/ResumePreview';

const ResumeView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchResume();
  }, [id]);

  const fetchResume = async () => {
    try {
      setLoading(true);
      const token = await getToken();
      const data = await resumeApi.getResumeById(token, id);
      setResume(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load resume. It may have been deleted or you do not have permission to view it.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container py-8 flex flex-col items-center">
        <div className="skeleton mb-8" style={{ width: '200px', height: '40px' }}></div>
        <div className="skeleton" style={{ width: '100%', maxWidth: '850px', height: '1000px' }}></div>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="container py-16 text-center">
        <h2 style={{ color: 'var(--danger)' }}>Oops!</h2>
        <p className="mb-8">{error}</p>
        <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
          <ArrowLeft size={18} /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container py-8 animate-fade-in" style={{ paddingBottom: '4rem' }}>
      {/* Controls */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4 glass-card" style={{ padding: '1rem 2rem' }}>
        <button onClick={() => navigate('/dashboard')} className="btn btn-ghost btn-sm">
          <ArrowLeft size={18} /> Dashboard
        </button>
        
        <div className="flex gap-4">
          <button onClick={() => window.alert('Edit functionality coming soon!')} className="btn btn-outline">
            <Edit size={18} /> Edit
          </button>
          <button onClick={handlePrint} className="btn btn-primary">
            <Printer size={18} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* Print-specific styles to hide UI when printing */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .resume-document, .resume-document * {
              visibility: visible;
            }
            .resume-document {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              box-shadow: none !important;
              padding: 0 !important;
              margin: 0 !important;
            }
          }
        `}
      </style>

      {/* The Resume */}
      <div style={{ overflowX: 'auto', padding: '1rem 0' }}>
        <ResumePreview resume={resume} />
      </div>
    </div>
  );
};

export default ResumeView;
