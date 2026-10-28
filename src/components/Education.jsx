import React from 'react';
import { GraduationCap, Award, BookOpenCheck } from 'lucide-react';

export function Education({ education }) {
  const getIcon = (index) => {
    switch (index) {
      case 0:
        return <GraduationCap size={24} />;
      case 1:
        return <Award size={24} />;
      default:
        return <BookOpenCheck size={24} />;
    }
  };

  return (
    <section className="education-section" id="education">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Academic Foundations</span>
          <h2 className="section-title">{education.heading}</h2>
          <p className="section-subtitle">{education.supportingLine}</p>
        </div>

        <div className="education-grid">
          {education.items.map((item, index) => (
            <div
              key={index}
              className={`education-card ${item.isCurrent ? 'featured' : ''}`}
            >
              <div className="edu-card-top">
                <div className="edu-icon-wrap">
                  {getIcon(index)}
                </div>
                {item.tag && (
                  <span className="edu-status-tag">{item.tag}</span>
                )}
              </div>

              <h4>{item.degree}</h4>
              <div className="edu-institution">{item.institution}</div>
              <div className="edu-period">{item.period}</div>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
