import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';

const SkillsForm = ({ skills, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (inputValue.trim() && !skills.includes(inputValue.trim())) {
      onChange([...skills, inputValue.trim()]);
      setInputValue('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill(e);
    }
  };

  return (
    <div>
      <h3 className="mb-4 text-gradient">Skills</h3>
      
      <div className="form-group mb-4">
        <label className="form-label">Add a skill</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            className="form-control" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g., React, Python, Project Management"
          />
          <button 
            type="button" 
            onClick={handleAddSkill} 
            className="btn btn-primary"
            disabled={!inputValue.trim()}
          >
            <Plus size={20} />
          </button>
        </div>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Press Enter or click the + button to add a skill.
        </p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="badge" 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem'
            }}
          >
            {skill}
            <button 
              type="button" 
              onClick={() => handleRemoveSkill(skill)}
              style={{ 
                background: 'transparent', 
                border: 'none', 
                color: 'var(--primary)', 
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2px'
              }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsForm;
