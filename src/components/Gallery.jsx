import React, { useState } from 'react';
import { Maximize2, Plus, X } from 'lucide-react';

export function Gallery({ gallery, onAddPhoto }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          id: Date.now(),
          url: event.target.result,
          caption: "A Treasured Memory ♡",
          sub: "Added with love"
        };
        if (onAddPhoto) onAddPhoto(newPhoto);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section className="gallery-section" id="gallery" style={{ backgroundColor: 'var(--color-ivory-warm)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-label">Moments in Time</span>
          <h2 className="section-title">{gallery.heading}</h2>
          <p className="section-subtitle">{gallery.supportingLine}</p>
        </div>

        <div className="gallery-grid">
          {gallery.photos.map((photo) => (
            <div
              key={photo.id}
              className="gallery-card"
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="gallery-img-wrap">
                <img src={photo.url} alt={photo.caption} loading="lazy" />
              </div>
              <div className="gallery-caption">
                <h5>{photo.caption}</h5>
                <p>{photo.sub}</p>
              </div>
            </div>
          ))}

          {/* Add/Replace Photo Upload Slot */}
          <div
            className="gallery-card"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '340px',
              border: '2px dashed var(--border-subtle)',
              background: 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer'
            }}
          >
            <label
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.75rem',
                cursor: 'pointer',
                textAlign: 'center',
                padding: '1.5rem'
              }}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'var(--color-blush-light)',
                  color: 'var(--accent-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plus size={24} />
              </div>
              <div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--color-plum)', display: 'block' }}>
                  Add Your Own Photo
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Click to select any JPG or PNG
                </span>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedPhoto(null)}
          style={{ cursor: 'zoom-out' }}
        >
          <div
            style={{
              maxWidth: '850px',
              width: '90%',
              backgroundColor: '#fff',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'rgba(255,255,255,0.85)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}
            >
              <X size={18} />
            </button>

            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'contain', display: 'block', background: '#faf5f2' }}
            />

            <div style={{ padding: '1.25rem 1.75rem', textAlign: 'center' }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: 'var(--color-plum)' }}>
                {selectedPhoto.caption}
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {selectedPhoto.sub}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
