import React from 'react';
import { BookOpen, Coffee, Heart, Sparkles } from 'lucide-react';

export function About({ about, personal }) {
  const iconMap = {
    BookOpen: <BookOpen size={18} />,
    Coffee: <Coffee size={18} />,
    Heart: <Heart size={18} />,
    Sparkles: <Sparkles size={18} />,
  };

  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Perspective</span>
          <h2 className="section-title">{about.heading}</h2>
          <p className="section-subtitle">{about.supportingLine}</p>
        </div>

        <div className="about-grid">
          {/* Left Column: Visual Card with Decorative Quote */}
          <div className="about-visual-card">
            <img
              src="/images/medical_flatlay.jpg"
              alt="Anatomy book, stethoscope and coffee flatlay"
              loading="lazy"
            />
            <div className="about-quote-box">
              <p>"{personal.quote}"</p>
              <span>— Guiding Philosophy</span>
            </div>
          </div>

          {/* Right Column: Editorial Bio and Details */}
          <div className="about-text-content">
            <h3>Beyond the White Coat</h3>
            <div className="about-supporting-line">
              Walking the path of healing with an open heart.
            </div>

            <div className="about-paragraphs">
              {about.introParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Quick Detail Cards */}
            <div className="about-details-grid">
              {about.details.map((item, index) => (
                <div key={index} className="about-detail-item">
                  <small>{item.label}</small>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
