import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, Plus, Sparkles, Palette } from 'lucide-react';

export function ArtGallery({ artworks, onOpenAdminUpload }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const timerRef = useRef(null);

  const total = artworks?.length || 0;

  // Auto-slide effect
  useEffect(() => {
    if (isPlaying && total > 1) {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % total);
      }, 4200);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, total]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const currentItem = artworks?.[currentIndex] || {};

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="section-header">
          <span className="section-label">
            <Palette size={14} />
            <span>Studio & Heart</span>
          </span>
          <h2 className="section-title">Glimpses of the Journey</h2>
          <p className="section-subtitle">
            Anatomical sketches, botanical watercolors, and reflections from medical school.
          </p>
        </div>

        {/* Carousel Showcase Container */}
        {total > 0 && (
          <div
            className="art-carousel-wrapper"
            onMouseEnter={() => setIsPlaying(false)}
            onMouseLeave={() => setIsPlaying(true)}
          >
            {/* Main Slide Card */}
            <div className="art-slide-main" onClick={() => setSelectedArtwork(currentItem)}>
              <div className="art-slide-image-box">
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="art-main-img"
                  loading="lazy"
                />
                <div className="art-zoom-overlay">
                  <Maximize2 size={24} color="#ffffff" />
                  <span>Click to view in detail</span>
                </div>
              </div>

              {/* Artwork Details Pane */}
              <div className="art-slide-info">
                <div className="art-badge-row">
                  <span className="art-category-pill">{currentItem.category || "Original Artwork"}</span>
                  <span className="art-year-tag">{currentItem.year}</span>
                </div>

                <h3 className="art-title">{currentItem.title}</h3>
                <div className="art-medium">{currentItem.medium}</div>

                <p className="art-story">"{currentItem.description}"</p>

                <div className="art-action-bar">
                  <button
                    className="art-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArtwork(currentItem);
                    }}
                  >
                    View High-Res
                  </button>

                  <span className="art-slide-counter">
                    {currentIndex + 1} of {total}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation & Controls */}
            <div className="art-controls-bar">
              <button
                className="art-nav-btn prev"
                onClick={handlePrev}
                aria-label="Previous artwork"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dot Indicators */}
              <div className="art-dots-list">
                {artworks.map((_, idx) => (
                  <button
                    key={idx}
                    className={`art-dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Play/Pause Toggle */}
              <button
                className="art-play-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <button
                className="art-nav-btn next"
                onClick={handleNext}
                aria-label="Next artwork"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            {/* Thumbnails Strip */}
            <div className="art-thumbnails-strip">
              {artworks.map((art, idx) => (
                <div
                  key={art.id || idx}
                  className={`art-thumb-item ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                >
                  <img src={art.image} alt={art.title} />
                  <span>{art.title}</span>
                </div>
              ))}

              {/* Quick Add Artwork Card */}
              {onOpenAdminUpload && (
                <div
                  className="art-thumb-item add-new-slot"
                  onClick={onOpenAdminUpload}
                  title="Upload New Artwork"
                >
                  <Plus size={20} color="var(--accent-primary)" />
                  <span>Upload Art</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedArtwork && (
        <div className="modal-backdrop" onClick={() => setSelectedArtwork(null)}>
          <div className="art-lightbox-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="art-lightbox-close"
              onClick={() => setSelectedArtwork(null)}
              aria-label="Close"
            >
              ✕
            </button>

            <div className="art-lightbox-grid">
              <div className="art-lightbox-img-pane">
                <img src={selectedArtwork.image} alt={selectedArtwork.title} />
              </div>

              <div className="art-lightbox-content">
                <span className="art-category-pill">{selectedArtwork.category || "Original Artwork"}</span>
                <h3>{selectedArtwork.title}</h3>
                <div className="art-lightbox-meta">
                  <strong>Medium:</strong> {selectedArtwork.medium}
                </div>
                <div className="art-lightbox-meta">
                  <strong>Date:</strong> {selectedArtwork.year}
                </div>

                <div className="art-lightbox-story-box">
                  <h4>Artist's Reflection</h4>
                  <p>{selectedArtwork.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
