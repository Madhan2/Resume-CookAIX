import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const EducationForm = ({ education, onChange }) => {
  const addEducation = () => {
    onChange([
      ...education,
      {
        institution: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        gpa: '',
        description: ''
      }
    ]);
  };

  const removeEducation = (index) => {
    const newEdu = [...education];
    newEdu.splice(index, 1);
    onChange(newEdu);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newEdu = [...education];
    newEdu[index] = {
      ...newEdu[index],
      [name]: value
    };
    onChange(newEdu);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gradient" style={{ margin: 0 }}>Education</h3>
        <button onClick={addEducation} className="btn btn-outline btn-sm">
          <Plus size={16} /> Add Education
        </button>
      </div>

      {education.length === 0 && (
        <p className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
          No education added yet. Click "Add Education" to start.
        </p>
      )}

      {education.map((edu, index) => (
        <div key={index} className="mb-6 pb-6" style={{ borderBottom: index < education.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h4 style={{ margin: 0 }}>Education #{index + 1}</h4>
            <button onClick={() => removeEducation(index)} className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}>
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Institution</label>
              <input 
                type="text" 
                name="institution" 
                className="form-control" 
                value={edu.institution} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="University of Technology"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Degree</label>
              <input 
                type="text" 
                name="degree" 
                className="form-control" 
                value={edu.degree} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="Bachelor of Science"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Field of Study</label>
              <input 
                type="text" 
                name="fieldOfStudy" 
                className="form-control" 
                value={edu.fieldOfStudy} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="Computer Science"
              />
            </div>

            <div className="form-group">
              <label className="form-label">GPA / Percentage (Optional)</label>
              <input 
                type="text" 
                name="gpa" 
                className="form-control" 
                value={edu.gpa} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="3.8/4.0"
              />
            </div>

            <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Start Date</label>
                <input 
                  type="month" 
                  name="startDate" 
                  className="form-control" 
                  value={edu.startDate} 
                  onChange={(e) => handleChange(index, e)} 
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">End Date</label>
                <input 
                  type="month" 
                  name="endDate" 
                  className="form-control" 
                  value={edu.endDate} 
                  onChange={(e) => handleChange(index, e)} 
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Description / Achievements (Optional)</label>
            <textarea 
              name="description" 
              className="form-control" 
              value={edu.description} 
              onChange={(e) => handleChange(index, e)} 
              placeholder="Relevant coursework, honors, dean's list..."
              rows="2"
            ></textarea>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationForm;
