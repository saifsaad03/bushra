import React, { useState, useEffect } from 'react';
import { X, Heart, Edit3, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export function KeepsakeModal({ isOpen, onClose, giftData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [letterContent, setLetterContent] = useState(giftData.letter);
  const [signature, setSignature] = useState(giftData.signature);

  useEffect(() => {
    if (isOpen) {
      // Gentle celebratory pastel confetti
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F5DDE3', '#D9A6B2', '#A8B7A0', '#E8D7BC', '#FFF9F4']
        });
      } catch (err) {
        // Fallback gracefully if canvas-confetti is not loaded
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="keepsake-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className="keepsake-header">
          <div className="keepsake-icon">💌</div>
          <h3>{giftData.title}</h3>
        </div>

        {isEditing ? (
          <div>
            <textarea
              value={letterContent}
              onChange={(e) => setLetterContent(e.target.value)}
              style={{
                width: '100%',
                minHeight: '220px',
                padding: '1rem',
                border: '1.5px solid var(--accent-primary)',
                borderRadius: 'var(--radius-md)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.95rem',
                lineHeight: '1.7',
                marginBottom: '1rem'
              }}
            />
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder="Signature / From"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1.5rem',
                fontFamily: 'var(--font-hand)',
                fontSize: '1.25rem'
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                className="btn-primary"
                onClick={() => setIsEditing(false)}
              >
                <Check size={16} />
                <span>Save Message</span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="keepsake-letter-content">
              {letterContent}
            </div>

            <div className="keepsake-signature">
              {signature}
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-start' }}>
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-primary)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  cursor: 'pointer',
                  opacity: 0.8
                }}
              >
                <Edit3 size={13} />
                <span>Customize this note</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
