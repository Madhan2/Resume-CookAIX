import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth, SignInButton } from '@clerk/clerk-react';
import { Sparkles, FileCheck, Zap, Download } from 'lucide-react';

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center" style={{ height: '80vh' }}>
        <div className="skeleton" style={{ width: '50px', height: '50px', borderRadius: '50%' }}></div>
      </div>
    );
  }

  // If already logged in, primary action goes to builder
  return (
    <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section className="py-16 text-center animate-fade-in flex flex-col items-center justify-center" style={{ minHeight: '70vh' }}>
        <div className="badge mb-4">
          <Sparkles size={14} className="mr-2" /> 
          <span style={{ marginLeft: '4px' }}>AI-Powered Resume Builder</span>
        </div>
        
        <h1 style={{ maxWidth: '800px', margin: '0 auto 1.5rem auto' }}>
          Cook up your perfect resume with <span className="text-gradient">AI</span>.
        </h1>
        
        <p style={{ maxWidth: '600px', margin: '0 auto 2.5rem auto', fontSize: '1.125rem' }}>
          Stop struggling with formatting and writer's block. ResumeCookAIX intelligently generates, formats, and perfects your resume in seconds, so you can land your dream job faster.
        </p>

        <div className="flex gap-4 justify-center">
          {isSignedIn ? (
            <Link to="/builder" className="btn btn-primary">
              <Sparkles size={20} /> Create Resume Now
            </Link>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="btn btn-primary">
                  <Sparkles size={20} /> Get Started Free
                </button>
              </SignInButton>
              <SignInButton mode="modal">
                <button className="btn btn-outline">Log in</button>
              </SignInButton>
            </>
          )}
        </div>
      </section>

      <div className="divider"></div>

      {/* Features Section */}
      <section className="py-16 animate-fade-in delay-200">
        <h2 className="text-center mb-8">How ResumeCookAIX Works</h2>
        
        <div className="grid grid-cols-3">
          <div className="glass-card text-center flex flex-col items-center">
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', display: 'inline-block' }}>
              <FileCheck size={32} />
            </div>
            <h3>1. Enter your details</h3>
            <p>Provide your experience, education, and skills in our simple, easy-to-use form.</p>
          </div>
          
          <div className="glass-card text-center flex flex-col items-center">
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', display: 'inline-block' }}>
              <Zap size={32} />
            </div>
            <h3>2. Let AI generate</h3>
            <p>Our advanced Groq AI intelligently structures and writes professional summaries and bullet points.</p>
          </div>
          
          <div className="glass-card text-center flex flex-col items-center">
            <div style={{ background: 'var(--primary-light)', color: 'var(--primary)', padding: '1rem', borderRadius: '50%', marginBottom: '1rem', display: 'inline-block' }}>
              <Download size={32} />
            </div>
            <h3>3. Review & Save</h3>
            <p>Review your professionally formatted resume, make edits, and save it to your dashboard.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
