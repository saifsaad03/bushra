import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export function FutureDreams({ futureDreams }) {
  return (
    <section className="future-dreams-section" id="dreams">
      <div className="container">
        <div className="future-dreams-card">
          <div className="future-dreams-content">
            <span className="section-label">Aspiration</span>
            <h3>{futureDreams.heading}</h3>

            <div className="future-dreams-message">
              "{futureDreams.message}"
            </div>

            <p className="future-dreams-subtext">
              {futureDreams.subtext}
            </p>
          </div>

          <div className="future-dreams-image">
            <img
              src="/images/scrubs.jpg"
              alt="Medical scrubs with stethoscope and flowers"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
