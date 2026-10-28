import React from 'react';
import { Microscope, HeartHandshake, Palette, Sparkles, CheckCircle } from 'lucide-react';

export function Skills({ skills }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Microscope':
        return <Microscope size={22} />;
      case 'HeartHandshake':
        return <HeartHandshake size={22} />;
      case 'Palette':
        return <Palette size={22} />;
      default:
        return <Sparkles size={22} />;
    }
  };

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">{skills?.heading || "Skills & Competencies"}</h2>
          <p className="section-subtitle">{skills?.supportingLine || "Medical science, bedside empathy, and fine arts."}</p>
        </div>

        <div className="skills-card-grid">
          {(skills?.categories || []).map((cat, idx) => (
            <div key={idx} className="skill-cat-card">
              <div className="skill-cat-header">
                <div className="skill-cat-icon">
                  {getIcon(cat.icon)}
                </div>
                <h4>{cat.name}</h4>
              </div>

              <div className="skill-item-rows">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="skill-row-item">
                    <div className="skill-row-left">
                      <CheckCircle size={14} className="skill-check-icon" />
                      <span className="skill-name-txt">{item.name}</span>
                    </div>
                    <span className="skill-badge-tag">{item.level}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
