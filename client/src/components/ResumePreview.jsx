import React from 'react';

// Render the professional resume
const ResumePreview = ({ resume }) => {
  if (!resume || !resume.personalInfo) {
    return <div>No resume data available</div>;
  }

  const { personalInfo, summary, experience, education, skills, projects, certifications } = resume;
  const { fullName, email, phone, location, linkedinUrl, githubUrl } = personalInfo;

  return (
    <div className="resume-document" style={{
      fontFamily: "'Times New Roman', Times, serif",
      color: '#000',
      background: '#fff',
      padding: '40px',
      margin: '0 auto',
      maxWidth: '850px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      lineHeight: '1.4',
      textAlign: 'left'
    }}>
      {/* Header */}
      <header style={{ textAlign: 'center', borderBottom: '2px solid #000', paddingBottom: '15px', marginBottom: '15px' }}>
        <h1 style={{ fontSize: '28px', margin: '0 0 5px 0', textTransform: 'uppercase', letterSpacing: '1px', color: '#000' }}>
          {fullName}
        </h1>
        <div style={{ fontSize: '14px', display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
          {location && <span>{location}</span>}
          {location && (email || phone || linkedinUrl) && <span>•</span>}
          {phone && <span>{phone}</span>}
          {phone && (email || linkedinUrl) && <span>•</span>}
          {email && <a href={`mailto:${email}`} style={{ color: '#000', textDecoration: 'none' }}>{email}</a>}
          {email && (linkedinUrl || githubUrl) && <span>•</span>}
          {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none' }}>LinkedIn</a>}
          {linkedinUrl && githubUrl && <span>•</span>}
          {githubUrl && <a href={githubUrl} target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none' }}>GitHub</a>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section style={{ marginBottom: '15px' }}>
          <p style={{ margin: 0, fontSize: '14px', textAlign: 'justify' }}>{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', margin: '0 0 10px 0', paddingBottom: '3px', color: '#000' }}>
            Professional Experience
          </h2>
          {experience.map((exp, index) => (
            <div key={index} style={{ marginBottom: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>{exp.jobTitle}</h3>
                <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                  {exp.startDate ? new Date(exp.startDate).toLocaleDateString(undefined, {month: 'short', year: 'numeric'}) : ''} - 
                  {exp.current ? ' Present' : exp.endDate ? new Date(exp.endDate).toLocaleDateString(undefined, {month: 'short', year: 'numeric'}) : ''}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '5px' }}>
                <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{exp.company}</span>
                <span style={{ fontSize: '14px' }}>{exp.location}</span>
              </div>
              {exp.responsibilities && (
                <div style={{ fontSize: '14px', marginLeft: '15px' }}>
                  <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                    {exp.responsibilities.split('\n').filter(Boolean).map((bullet, i) => (
                      <li key={i} style={{ marginBottom: '3px' }}>{bullet.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                </div>
              )}
              {exp.achievements && (
                <div style={{ fontSize: '14px', marginLeft: '15px' }}>
                  <ul style={{ margin: '5px 0', paddingLeft: '15px' }}>
                    {exp.achievements.split('\n').filter(Boolean).map((bullet, i) => (
                      <li key={i} style={{ marginBottom: '3px' }}>{bullet.replace(/^- /, '')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', margin: '0 0 10px 0', paddingBottom: '3px', color: '#000' }}>
            Projects
          </h2>
          {projects.map((proj, index) => (
            <div key={index} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>{proj.name}</h3>
                {proj.technologies && <span style={{ fontSize: '13px', fontStyle: 'italic' }}>| {proj.technologies}</span>}
                {proj.projectUrl && <a href={proj.projectUrl} target="_blank" rel="noreferrer" style={{ fontSize: '13px', color: '#000' }}>[Link]</a>}
              </div>
              {proj.description && (
                <p style={{ margin: '5px 0 0 0', fontSize: '14px' }}>{proj.description}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', margin: '0 0 10px 0', paddingBottom: '3px', color: '#000' }}>
            Education
          </h2>
          {education.map((edu, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold' }}>{edu.institution}</h3>
                <span style={{ fontSize: '14px' }}>
                  {edu.startDate ? new Date(edu.startDate).getFullYear() : ''} - 
                  {edu.endDate ? new Date(edu.endDate).getFullYear() : 'Present'}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: '14px', fontStyle: 'italic' }}>
                  {edu.degree} in {edu.fieldOfStudy}
                </span>
                {edu.gpa && <span style={{ fontSize: '14px' }}>GPA: {edu.gpa}</span>}
              </div>
              {edu.description && <p style={{ margin: '3px 0 0 0', fontSize: '14px' }}>{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', margin: '0 0 5px 0', paddingBottom: '3px', color: '#000' }}>
            Skills
          </h2>
          <p style={{ margin: 0, fontSize: '14px' }}>
            {skills.join(', ')}
          </p>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section style={{ marginBottom: '15px' }}>
          <h2 style={{ fontSize: '16px', textTransform: 'uppercase', borderBottom: '1px solid #ccc', margin: '0 0 5px 0', paddingBottom: '3px', color: '#000' }}>
            Certifications
          </h2>
          <ul style={{ margin: '5px 0', paddingLeft: '20px', fontSize: '14px' }}>
            {certifications.map((cert, index) => (
              <li key={index} style={{ marginBottom: '3px' }}>
                <strong>{cert.name}</strong>, {cert.issuer} 
                {cert.date && ` (${new Date(cert.date).getFullYear()})`}
                {cert.url && <a href={cert.url} target="_blank" rel="noreferrer" style={{ marginLeft: '5px', color: '#000' }}>[Link]</a>}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
