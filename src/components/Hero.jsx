import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, BookHeart, GraduationCap } from 'lucide-react';

export function Hero({ personal, onOpenGift }) {
  // 4-year countdown calculation (approx 4 years from now)
  const targetDate = new Date();
  targetDate.setFullYear(targetDate.getFullYear() + 4);

  const [timeLeft, setTimeLeft] = useState({
    days: 1460,
    hours: 12,
    minutes: 30
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        setTimeLeft({ days, hours, minutes });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Text Column */}
          <div className="hero-text-col">
            <div className="hero-status-pill">
              <span className="hero-status-dot"></span>
              <span>{personal.statusLabel}</span>
            </div>

            <h1 className="hero-title">{personal.fullName}</h1>
            <div className="hero-tagline">{personal.title}</div>

            <p className="hero-intro">
              "{personal.shortBio}"
            </p>

            <div className="hero-buttons">
              <a href="#journey" className="btn-primary">
                <span>Explore My Journey</span>
                <Sparkles size={16} />
              </a>

              <a href="#about" className="btn-secondary">
                <span>A Little About Me</span>
              </a>
            </div>

            {/* 4-Year Milestone Progress Strip */}
            <div className="hero-countdown-strip">
              <div className="countdown-icon-wrap">
                <GraduationCap size={20} />
              </div>
              <div className="countdown-text-wrap">
                <small>The Path to Graduation</small>
                <span>~{timeLeft.days} Days · 4 Academic Years Ahead</span>
              </div>
            </div>
          </div>

          {/* Right Portrait Column */}
          <div className="hero-portrait-col">
            <div className="portrait-frame-wrapper">
              <div className="portrait-frame-backdrop"></div>
              
              <div className="portrait-frame-main">
                <img
                  src={personal.avatar}
                  alt="Samiha Bushra - Medical Student"
                  loading="eager"
                />
              </div>

              {/* Delicate Botanical / Floating Flower Accent */}
              <span className="floating-flower-accent">🌸</span>

              {/* Handwritten note annotation */}
              <div className="handwritten-badge">
                {personal.handwrittenAnnotation}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Understated Scroll Indicator */}
      <a href="#about" className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <ArrowDown size={14} />
      </a>
    </section>
  );
}
