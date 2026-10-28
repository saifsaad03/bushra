import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';

export function Footer({ personal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-quote">
          “Made with a little extra love ♡”
        </div>

        <p className="footer-tagline">
          {personal.fullName} · A Journey in Progress
        </p>

        <div>
          <button
            onClick={scrollToTop}
            className="back-to-top-btn"
          >
            <span>Back to top</span>
            <ArrowUp size={14} />
          </button>
        </div>

        <div className="footer-credits">
          A digital keepsake & portfolio
        </div>
      </div>
    </footer>
  );
}
