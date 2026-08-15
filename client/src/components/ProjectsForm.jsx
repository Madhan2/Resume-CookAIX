import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const ProjectsForm = ({ projects, onChange }) => {
  const addProject = () => {
    onChange([
      ...projects,
      {
        name: '',
        description: '',
        technologies: '',
        projectUrl: ''
      }
    ]);
  };

  const removeProject = (index) => {
    const newProj = [...projects];
    newProj.splice(index, 1);
    onChange(newProj);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newProj = [...projects];
    newProj[index] = {
      ...newProj[index],
      [name]: value
    };
    onChange(newProj);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gradient" style={{ margin: 0 }}>Projects</h3>
        <button onClick={addProject} className="btn btn-outline btn-sm">
          <Plus size={16} /> Add Project
        </button>
      </div>

      {projects.length === 0 && (
        <p className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
          No projects added yet. Click "Add Project" to start.
        </p>
      )}

      {projects.map((proj, index) => (
        <div key={index} className="mb-6 pb-6" style={{ borderBottom: index < projects.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h4 style={{ margin: 0 }}>Project #{index + 1}</h4>
            <button onClick={() => removeProject(index)} className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}>
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input 
                type="text" 
                name="name" 
                className="form-control" 
                value={proj.name} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="E-commerce Platform"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Project URL (Optional)</label>
              <input 
                type="url" 
                name="projectUrl" 
                className="form-control" 
                value={proj.projectUrl} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="https://github.com/your-project"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Technologies Used</label>
            <input 
              type="text" 
              name="technologies" 
              className="form-control" 
              value={proj.technologies} 
              onChange={(e) => handleChange(index, e)} 
              placeholder="React, Node.js, MongoDB (comma separated)"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description & Role</label>
            <textarea 
              name="description" 
              className="form-control" 
              value={proj.description} 
              onChange={(e) => handleChange(index, e)} 
              placeholder="Describe what the project does and your contribution..."
              rows="3"
            ></textarea>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectsForm;
