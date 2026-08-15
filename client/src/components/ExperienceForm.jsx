import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ExperienceForm = ({ experience, onChange }) => {
  const addExperience = () => {
    onChange([
      ...experience,
      {
        company: '',
        jobTitle: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        responsibilities: '',
        achievements: ''
      }
    ]);
  };

  const removeExperience = (index) => {
    const newExp = [...experience];
    newExp.splice(index, 1);
    onChange(newExp);
  };

  const handleChange = (index, e) => {
    const { name, value, type, checked } = e.target;
    const newExp = [...experience];
    newExp[index] = {
      ...newExp[index],
      [name]: type === 'checkbox' ? checked : value
    };
    onChange(newExp);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gradient" style={{ margin: 0 }}>Work Experience</h3>
        <button onClick={addExperience} className="btn btn-outline btn-sm">
          <Plus size={16} /> Add Experience
        </button>
      </div>

      {experience.length === 0 && (
        <p className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
          No work experience added yet. Click "Add Experience" to start.
        </p>
      )}

      {experience.map((exp, index) => (
        <div key={index} className="mb-6 pb-6" style={{ borderBottom: index < experience.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h4 style={{ margin: 0 }}>Experience #{index + 1}</h4>
            <button onClick={() => removeExperience(index)} className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}>
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Job Title</label>
              <input 
                type="text" 
                name="jobTitle" 
                className="form-control" 
                value={exp.jobTitle} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="Software Engineer"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Company</label>
              <input 
                type="text" 
                name="company" 
                className="form-control" 
                value={exp.company} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="Tech Corp Inc."
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Location</label>
              <input 
                type="text" 
                name="location" 
                className="form-control" 
                value={exp.location} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="San Francisco, CA"
              />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input 
                  type="month" 
                  name="startDate" 
                  className="form-control" 
                  value={exp.startDate} 
                  onChange={(e) => handleChange(index, e)} 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input 
                  type="month" 
                  name="endDate" 
                  className="form-control" 
                  value={exp.endDate} 
                  onChange={(e) => handleChange(index, e)} 
                  disabled={exp.current}
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-4" style={{ flexDirection: 'row', alignItems: 'center', gap: '0.5rem' }}>
            <input 
              type="checkbox" 
              name="current" 
              id={`current-${index}`}
              checked={exp.current} 
              onChange={(e) => handleChange(index, e)} 
              style={{ width: '1.2rem', height: '1.2rem' }}
            />
            <label htmlFor={`current-${index}`} className="form-label" style={{ cursor: 'pointer', margin: 0 }}>
              I currently work here
            </label>
          </div>

          <div className="form-group">
            <label className="form-label">Responsibilities & Description</label>
            <textarea 
              name="responsibilities" 
              className="form-control" 
              value={exp.responsibilities} 
              onChange={(e) => handleChange(index, e)} 
              placeholder="Developed scalable microservices, mentored junior developers..."
              rows="3"
            ></textarea>
          </div>
          
          <div className="form-group">
            <label className="form-label">Key Achievements (Optional)</label>
            <textarea 
              name="achievements" 
              className="form-control" 
              value={exp.achievements} 
              onChange={(e) => handleChange(index, e)} 
              placeholder="Increased performance by 30%, led the successful migration to AWS..."
              rows="2"
            ></textarea>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExperienceForm;
