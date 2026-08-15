import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const CertificationsForm = ({ certifications, onChange }) => {
  const addCert = () => {
    onChange([
      ...certifications,
      {
        name: '',
        issuer: '',
        date: '',
        url: ''
      }
    ]);
  };

  const removeCert = (index) => {
    const newCerts = [...certifications];
    newCerts.splice(index, 1);
    onChange(newCerts);
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const newCerts = [...certifications];
    newCerts[index] = {
      ...newCerts[index],
      [name]: value
    };
    onChange(newCerts);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-gradient" style={{ margin: 0 }}>Certifications</h3>
        <button onClick={addCert} className="btn btn-outline btn-sm">
          <Plus size={16} /> Add Certification
        </button>
      </div>

      {certifications.length === 0 && (
        <p className="text-center py-4" style={{ color: 'var(--text-muted)' }}>
          No certifications added yet. Click "Add Certification" to start.
        </p>
      )}

      {certifications.map((cert, index) => (
        <div key={index} className="mb-6 pb-6" style={{ borderBottom: index < certifications.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
          <div className="flex justify-between items-center mb-4">
            <h4 style={{ margin: 0 }}>Certification #{index + 1}</h4>
            <button onClick={() => removeCert(index)} className="btn btn-ghost btn-sm" style={{ color: 'var(--danger)' }}>
              <Trash2 size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2">
            <div className="form-group">
              <label className="form-label">Certification Name</label>
              <input 
                type="text" 
                name="name" 
                className="form-control" 
                value={cert.name} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="AWS Certified Solutions Architect"
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Issuing Organization</label>
              <input 
                type="text" 
                name="issuer" 
                className="form-control" 
                value={cert.issuer} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="Amazon Web Services"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Issue Date</label>
              <input 
                type="month" 
                name="date" 
                className="form-control" 
                value={cert.date} 
                onChange={(e) => handleChange(index, e)} 
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Credential URL (Optional)</label>
              <input 
                type="url" 
                name="url" 
                className="form-control" 
                value={cert.url} 
                onChange={(e) => handleChange(index, e)} 
                placeholder="https://credly.com/badges/..."
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationsForm;
