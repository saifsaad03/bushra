import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export function Hero({ personal }) {
  return (
    <section className="hero-section" id="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Text Column */}
          <div className="hero-text-col">
            <div className="hero-status-pill">
              <span className="hero-status-dot"></span>
              <span>{personal?.statusLabel || "MBBS JOURNEY · IN PROGRESS"}</span>
            </div>

            <h1 className="hero-title">{personal?.fullName || "Samiha Bushra"}</h1>
            <div className="hero-tagline">{personal?.title || "Future Physician in the Making ♡"}</div>

            <p className="hero-intro">
              "{personal?.shortBio || "Healing lives through science and empathy; capturing the quiet poetry of life through sketches and colors."}"
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
          </div>

          {/* Right Portrait Column — Designed Specially for Transparent Background Cut-out Portrait */}
          <div className="hero-portrait-col">
            <div className="transparent-portrait-stage">
              {/* Soft Ambient Pedestal Glow behind the cutout portrait */}
              <div className="portrait-ambient-aura"></div>
              <div className="portrait-ambient-ring"></div>

              {/* Cut-out / Transparent Background Portrait */}
              <div className="cutout-img-wrapper">
                <img
                  src={personal?.avatar || "/images/avatar.jpg"}
                  alt={personal?.fullName || "Samiha Bushra"}
                  className="cutout-portrait-img"
                  loading="eager"
                />
              </div>

              {/* Floating Flower Accent */}
              <span className="floating-flower-accent">🌸</span>

              {/* Handwritten Note Annotation */}
              <div className="handwritten-badge">
                {personal?.handwrittenAnnotation || "One day, Dr. Samiha ♡"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
