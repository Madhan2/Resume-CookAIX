import React from 'react';

const PersonalInfo = ({ data, onChange }) => {
  return (
    <div>
      <h3 className="mb-4 text-gradient">Personal Information</h3>
      
      <div className="grid grid-cols-2">
        <div className="form-group">
          <label className="form-label">Full Name <span style={{ color: 'var(--danger)' }}>*</span></label>
          <input 
            type="text" 
            name="fullName" 
            className="form-control" 
            value={data.fullName} 
            onChange={onChange} 
            placeholder="John Doe"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Email <span style={{ color: 'var(--danger)' }}>*</span></label>
          <input 
            type="email" 
            name="email" 
            className="form-control" 
            value={data.email} 
            onChange={onChange} 
            placeholder="john@example.com"
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Phone Number</label>
          <input 
            type="tel" 
            name="phone" 
            className="form-control" 
            value={data.phone} 
            onChange={onChange} 
            placeholder="+1 234 567 890"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Location</label>
          <input 
            type="text" 
            name="location" 
            className="form-control" 
            value={data.location} 
            onChange={onChange} 
            placeholder="City, State, Country"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">LinkedIn URL</label>
          <input 
            type="url" 
            name="linkedinUrl" 
            className="form-control" 
            value={data.linkedinUrl} 
            onChange={onChange} 
            placeholder="https://linkedin.com/in/johndoe"
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">GitHub/Portfolio URL</label>
          <input 
            type="url" 
            name="githubUrl" 
            className="form-control" 
            value={data.githubUrl} 
            onChange={onChange} 
            placeholder="https://github.com/johndoe"
          />
        </div>
      </div>
      
      <div className="form-group mt-2">
        <label className="form-label">Professional Summary (Optional)</label>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Leave blank to let AI generate one for you based on your experience and skills.
        </p>
        <textarea 
          name="summary" 
          className="form-control" 
          value={data.summary} 
          onChange={onChange} 
          placeholder="Brief overview of your professional background and goals..."
          rows="4"
        ></textarea>
      </div>
    </div>
  );
};

export default PersonalInfo;
