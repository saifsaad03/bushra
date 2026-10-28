import React from 'react';
import { Microscope, HeartHandshake, Scissors, Sparkles, Languages, CheckCircle } from 'lucide-react';

export function Skills({ skills, languages }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Microscope':
        return <Microscope size={22} />;
      case 'HeartHandshake':
        return <HeartHandshake size={22} />;
      case 'Scissors':
        return <Scissors size={22} />;
      default:
        return <Sparkles size={22} />;
    }
  };

  const getLanguageFlag = (name) => {
    if (name.includes('Bangla')) return '🇧🇩';
    if (name.includes('English')) return '🇬🇧';
    return '🇮🇳';
  };

  return (
    <section className="skills-section" id="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Capabilities</span>
          <h2 className="section-title">{skills?.heading || "Skills & Competencies"}</h2>
          <p className="section-subtitle">{skills?.supportingLine || "Medical science, bedside empathy, and fine craftsmanship."}</p>
        </div>

        {/* 4 Pillars of Competencies */}
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

        {/* Languages Proficiency Section (Bangla 100%, English 80%, Hindi 70%) */}
        <div className="languages-proficiency-block">
          <div className="languages-header">
            <div className="languages-icon-wrap">
              <Languages size={22} />
            </div>
            <div>
              <h3>Language Fluency</h3>
              <p>Communication & multilingual ease in patient care and global learning</p>
            </div>
          </div>

          <div className="languages-grid">
            {(languages || []).map((lang, idx) => (
              <div key={idx} className="language-bar-card">
                <div className="language-bar-top">
                  <div className="language-name-side">
                    <span className="language-flag">{getLanguageFlag(lang.name)}</span>
                    <strong>{lang.name}</strong>
                  </div>
                  <span className="language-percent-text">{lang.percent}%</span>
                </div>

                <div className="language-track">
                  <div
                    className="language-fill"
                    style={{ width: `${lang.percent}%` }}
                  />
                </div>

                <span className="language-level-sub">{lang.level}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
