import React from 'react';
import { Scissors, Palette, BookOpen, Coffee, Stethoscope, Heart, Baby, Compass, CheckCircle } from 'lucide-react';

export function About({ about, personal, interests, workExperience }) {
  const getHobbyIcon = (iconName) => {
    switch (iconName) {
      case 'Scissors':
        return <Scissors size={18} />;
      case 'Palette':
        return <Palette size={18} />;
      case 'Coffee':
        return <Coffee size={18} />;
      default:
        return <BookOpen size={18} />;
    }
  };

  const getInterestIcon = (name) => {
    if (name.includes('Internal')) return <Stethoscope size={18} color="var(--accent-primary)" />;
    if (name.includes('Gynae')) return <Heart size={18} color="var(--accent-primary)" />;
    return <Baby size={18} color="var(--accent-primary)" />;
  };

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Perspective</span>
          <h2 className="section-title">{about?.heading || "A Little About Me"}</h2>
          <p className="section-subtitle">{about?.supportingLine || "Medical student by day, sketch artist by heart."}</p>
        </div>

        {/* Editorial Text Content (No Image as requested!) */}
        <div className="about-editorial-wrap">
          <div className="about-main-text-card">
            <h3>Beyond the Stetho...</h3>
            <div className="about-paragraphs">
              {(about?.introParagraphs || []).map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Quick Profile Tokens */}
            <div className="about-tokens-grid">
              {(about?.details || []).map((item, idx) => (
                <div key={idx} className="about-token-pill">
                  <small>{item.label}</small>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Three Focused Subsection Cards: Interests, Work Experience, Hobbies */}
          <div className="about-subsections-grid">
            {/* 1. Medical Interests / Specialization Aspirations */}
            <div className="about-feature-box">
              <div className="feature-box-header">
                <Stethoscope size={20} className="feature-icon" />
                <h4>Medical Interests & Aspirations</h4>
              </div>
              <p className="feature-sub">Areas of medicine that captivate my curiosity:</p>

              <div className="interests-list">
                {(interests || []).map((intItem, idx) => (
                  <div key={idx} className="interest-item-row">
                    <div className="interest-item-left">
                      {getInterestIcon(intItem.name)}
                      <strong>{intItem.name}</strong>
                    </div>
                    <span>{intItem.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Work Experience */}
            <div className="about-feature-box">
              <div className="feature-box-header">
                <Compass size={20} className="feature-icon" />
                <h4>Clinical & Work Experience</h4>
              </div>
              <div className="experience-badge-pill">
                {workExperience?.status || "Nothing yet — Ready to explore! 🩺✨"}
              </div>
              <p className="experience-desc-text">
                {workExperience?.note || "Currently dedicating full focus to mastering pre-clinical foundations. Looking forward to upcoming ward clerkships and patient interactions."}
              </p>
            </div>

            {/* 3. Hobbies & Delights */}
            <div className="about-feature-box full-width">
              <div className="feature-box-header">
                <Scissors size={20} className="feature-icon" />
                <h4>Hobbies & Creative Delights</h4>
              </div>
              <p className="feature-sub">Things that bring peace between intense study hours:</p>

              <div className="hobbies-cards-grid">
                {(about?.hobbies || []).map((hobby, idx) => (
                  <div key={idx} className="hobby-mini-card">
                    <div className="hobby-mini-icon">
                      {getHobbyIcon(hobby.icon)}
                    </div>
                    <div>
                      <strong>{hobby.name}</strong>
                      <p>{hobby.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
