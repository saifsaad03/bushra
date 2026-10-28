import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export function PersonalCorner({ personalCorner }) {
  return (
    <section className="personal-corner-section" id="personal">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Sparkles size={14} />
            <span>Little Things</span>
          </span>
          <h2 className="section-title">{personalCorner?.heading || "A Gentle Glimpse"}</h2>
          <p className="section-subtitle">{personalCorner?.supportingLine || "Little comforts, favorite petals, and quiet inspirations that make me, me."}</p>
        </div>

        {/* Scrapbook Cards Grid */}
        <div className="scrapbook-polaroid-grid">
          {(personalCorner?.cards || []).map((card, idx) => (
            <div
              key={idx}
              className="scrapbook-note-card"
              style={{
                transform: `rotate(${card.tilt || '0deg'})`
              }}
            >
              {/* Washi Tape Effect */}
              <div
                className="washi-tape"
                style={{ backgroundColor: card.tapeColor || 'rgba(232, 143, 164, 0.5)' }}
              />

              <div className="scrapbook-card-top">
                <span className="scrapbook-emoji-badge">{card.icon}</span>
                <span className="scrapbook-tag-pill">{card.tag}</span>
              </div>

              <h4 className="scrapbook-title">{card.title}</h4>
              <p className="scrapbook-text">{card.content}</p>
            </div>
          ))}
        </div>

        {/* Guiding Quote Banner */}
        {personalCorner?.favoriteQuote && (
          <div className="gentle-glimpse-quote-banner">
            <div className="quote-heart-icon">♡</div>
            <p className="quote-text">{personalCorner.favoriteQuote}</p>
            <span className="quote-author">— {personalCorner.quoteAuthor || "Hippocrates"}</span>
          </div>
        )}
      </div>
    </section>
  );
}
