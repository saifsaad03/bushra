import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, Plus, Sparkles, Layers } from 'lucide-react';

export function HabijabiCards({ items, onOpenAdminUpload }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const timerRef = useRef(null);

  const total = items?.length || 0;

  const handleNext = () => {
    if (isSwiping || total <= 1) return;
    setIsSwiping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
      setIsSwiping(false);
    }, 320);
  };

  const handlePrev = () => {
    if (isSwiping || total <= 1) return;
    setIsSwiping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + total) % total);
      setIsSwiping(false);
    }, 320);
  };

  // Auto-slide effect like dealing playing cards
  useEffect(() => {
    if (isPlaying && total > 1) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 4500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, total, currentIndex, isSwiping]);

  if (!items || total === 0) return null;

  const activeCard = items[currentIndex];

  // Helper to get card index relative to current
  const getCardAtOffset = (offset) => {
    return items[(currentIndex + offset) % total];
  };

  return (
    <section className="habijabi-section" id="habijabi">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Sparkles size={14} />
            <span>Sketchbook & Doodles</span>
          </span>
          <h2 className="section-title">My Habijabi ♡</h2>
          <p className="section-subtitle">
            Anatomical sketches, botanical watercolors, and little creative experiments between study hours.
          </p>
        </div>

        {/* Playing Card Deck Stage */}
        <div
          className="card-deck-stage"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <div className="card-deck-container">
            {/* Card 3 (Bottom of Stack) */}
            {total >= 3 && (
              <div className="playing-card-frame card-layer-3">
                <img src={getCardAtOffset(2).image} alt="Background Card" />
                <div className="card-back-pattern"></div>
              </div>
            )}

            {/* Card 2 (Middle of Stack) */}
            {total >= 2 && (
              <div className="playing-card-frame card-layer-2">
                <img src={getCardAtOffset(1).image} alt="Middle Card" />
                <div className="card-back-pattern"></div>
              </div>
            )}

            {/* Card 1 (Active Top Card - Clickable) */}
            <div
              className={`playing-card-frame card-layer-top ${isSwiping ? 'card-swiping-out' : ''}`}
              onClick={() => setSelectedItem(activeCard)}
            >
              <div className="card-top-inner">
                {/* Artwork Image */}
                <div className="card-art-visual">
                  <img src={activeCard.image} alt={activeCard.title} />
                  <div className="card-zoom-prompt">
                    <Maximize2 size={20} />
                    <span>Expand Artwork</span>
                  </div>
                </div>

                {/* Card Editorial Footer */}
                <div className="card-art-details">
                  <div className="card-tags-row">
                    <span className="card-habijabi-badge">{activeCard.tag || "Habijabi"}</span>
                    <span className="card-category-tag">{activeCard.category || "Sketch"}</span>
                    <span className="card-year-tag">{activeCard.year}</span>
                  </div>

                  <h3 className="card-art-title">{activeCard.title}</h3>
                  <div className="card-art-medium">{activeCard.medium}</div>
                  <p className="card-art-story">"{activeCard.description}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Playing Card Controls */}
          <div className="card-deck-controls">
            <button
              className="card-nav-arrow"
              onClick={handlePrev}
              title="Previous Card"
              aria-label="Previous Card"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              className="card-deal-btn"
              onClick={handleNext}
              title="Pass Next Card"
            >
              <Layers size={18} />
              <span>Next Card 🃏 ({currentIndex + 1}/{total})</span>
            </button>

            <button
              className="card-play-pause-btn"
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Card Auto-Shuffle" : "Play Card Auto-Shuffle"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <button
              className="card-nav-arrow"
              onClick={handleNext}
              title="Next Card"
              aria-label="Next Card"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Quick Upload Slot */}
          {onOpenAdminUpload && (
            <div className="habijabi-quick-action">
              <button className="btn-secondary" onClick={onOpenAdminUpload}>
                <Plus size={16} />
                <span>Add to My Habijabi</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div className="modal-backdrop" onClick={() => setSelectedItem(null)}>
          <div className="art-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="art-lightbox-close"
              onClick={() => setSelectedItem(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="art-lightbox-grid">
              <div className="art-lightbox-img-pane">
                <img src={selectedItem.image} alt={selectedItem.title} />
              </div>

              <div className="art-lightbox-content">
                <span className="card-habijabi-badge">{selectedItem.tag || "Habijabi"}</span>
                <h3>{selectedItem.title}</h3>
                <div className="art-lightbox-meta">
                  <strong>Medium:</strong> {selectedItem.medium}
                </div>
                <div className="art-lightbox-meta">
                  <strong>Year:</strong> {selectedItem.year}
                </div>

                <div className="art-lightbox-story-box">
                  <h4>The Story Behind the Piece</h4>
                  <p>{selectedItem.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
