import React from 'react';
import { X, Image as ImageIcon, Upload, RefreshCw } from 'lucide-react';

export function BgCustomizer({
  isOpen,
  onClose,
  currentBg,
  onChangeBg,
  bgOpacity,
  onChangeOpacity
}) {
  if (!isOpen) return null;

  const presets = [
    { label: 'Default Ivory', url: '' },
    { label: 'Anatomy Flatlay', url: '/images/medical_flatlay.jpg' },
    { label: 'Scrubs & Flowers', url: '/images/scrubs.jpg' },
  ];

  const handleCustomFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChangeBg(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '25px',
        right: '25px',
        width: '320px',
        backgroundColor: '#FFF9F4',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem',
        boxShadow: '0 15px 45px rgba(73, 55, 70, 0.2)',
        zIndex: 1500,
        animation: 'scaleIn 0.25s ease'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ImageIcon size={18} color="var(--accent-primary)" />
          <h5 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', color: 'var(--color-plum)' }}>
            Background Aesthetic
          </h5>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
        >
          <X size={16} />
        </button>
      </div>

      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.85rem' }}>
        Choose a background wallpaper or upload any JPG photo:
      </p>

      {/* Preset Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => onChangeBg(preset.url)}
            style={{
              padding: '0.45rem 0.2rem',
              fontSize: '0.72rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-sm)',
              border: currentBg === preset.url ? '1.5px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
              background: currentBg === preset.url ? 'var(--color-blush-light)' : '#ffffff',
              color: 'var(--color-plum)',
              cursor: 'pointer'
            }}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Custom Upload */}
      <label
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.45rem',
          padding: '0.55rem',
          borderRadius: 'var(--radius-sm)',
          border: '1px dashed var(--accent-primary)',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          fontSize: '0.8rem',
          color: 'var(--accent-primary)',
          cursor: 'pointer',
          marginBottom: '1rem'
        }}
      >
        <Upload size={14} />
        <span>Upload Custom JPG Photo</span>
        <input
          type="file"
          accept="image/*"
          onChange={handleCustomFile}
          style={{ display: 'none' }}
        />
      </label>

      {/* Opacity Slider if background image is active */}
      {currentBg && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
            <span>Wallpaper Intensity</span>
            <span>{Math.round(bgOpacity * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.45"
            step="0.02"
            value={bgOpacity}
            onChange={(e) => onChangeOpacity(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
          />
        </div>
      )}
    </div>
  );
}
