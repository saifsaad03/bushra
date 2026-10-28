import React, { useState, useEffect } from 'react';
import { X, Lock, Unlock, Palette, Activity, Edit3, MessageCircle, Plus, Trash2, Check, CheckCircle2 } from 'lucide-react';
import { savePortfolioData } from '../services/storageService';

export function AdminPanel({ isOpen, onClose, data, onUpdateData }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [passError, setPassError] = useState(false);
  const [activeTab, setActiveTab] = useState('artworks');

  // Local draft state for edits
  const [formData, setFormData] = useState(data);
  const [saveStatus, setSaveStatus] = useState({ state: 'idle', message: '' });

  // New artwork form state
  const [newArt, setNewArt] = useState({
    title: '',
    medium: 'Watercolor & Ink',
    year: '2026',
    category: 'Medical Art',
    description: '',
    image: '',
    tag: 'My Habijabi'
  });

  useEffect(() => {
    setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    const validPins = ['samiha', 'bushra', '2026', '1234', 'admin'];
    if (validPins.includes(passcode.trim().toLowerCase())) {
      setIsAuthenticated(true);
      setPassError(false);
    } else {
      setPassError(true);
    }
  };

  const handleArtworkImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewArt((prev) => ({ ...prev, image: event.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddArtwork = () => {
    if (!newArt.title || !newArt.image) {
      alert("Please provide at least a Title and an Image!");
      return;
    }

    const artworkItem = {
      id: Date.now(),
      ...newArt
    };

    const currentList = formData.habijabi || formData.artworks || [];
    const updatedList = [artworkItem, ...currentList];
    const updated = {
      ...formData,
      habijabi: updatedList,
      artworks: updatedList
    };
    setFormData(updated);
    onUpdateData(updated);

    // Reset artwork form
    setNewArt({
      title: '',
      medium: 'Watercolor & Ink',
      year: '2026',
      category: 'Medical Art',
      description: '',
      image: '',
      tag: 'My Habijabi'
    });
  };

  const handleDeleteArtwork = (id) => {
    const currentList = formData.habijabi || formData.artworks || [];
    const updatedList = currentList.filter((a) => a.id !== id);
    const updated = {
      ...formData,
      habijabi: updatedList,
      artworks: updatedList
    };
    setFormData(updated);
    onUpdateData(updated);
  };

  const handleSaveAll = async () => {
    setSaveStatus({ state: 'saving', message: 'Publishing...' });
    await savePortfolioData(formData);
    onUpdateData(formData);
    setSaveStatus({ state: 'success', message: 'Published Live Successfully!' });
    setTimeout(() => setSaveStatus({ state: 'idle', message: '' }), 4000);
  };

  const habijabiItems = formData.habijabi || formData.artworks || [];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="admin-modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="admin-close-btn" onClick={onClose} aria-label="Close Admin Panel">
          <X size={18} />
        </button>

        {/* Lock Screen */}
        {!isAuthenticated ? (
          <div className="admin-auth-pane">
            <div className="admin-auth-icon">
              <Lock size={32} color="var(--accent-primary)" />
            </div>
            <h3>Studio Admin</h3>
            <p>Enter the studio passcode to upload artwork & update your medical journey:</p>

            <form onSubmit={handleLogin} className="admin-auth-form">
              <input
                type="password"
                placeholder="Enter passcode (e.g. 2026 or samiha)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
              <button type="submit" className="btn-primary">
                <Unlock size={16} />
                <span>Unlock Studio</span>
              </button>
            </form>

            {passError && (
              <span className="admin-error-text">Incorrect passcode. Try <code>samiha</code> or <code>2026</code></span>
            )}
          </div>
        ) : (
          /* Authenticated Fresh Admin Dashboard */
          <div className="admin-dashboard">
            <div className="admin-dash-header">
              <div>
                <h3>Studio & Journey Dashboard</h3>
                <span className="admin-sub">Editing: {formData.personal?.fullName}</span>
              </div>

              <div className="admin-header-actions">
                <button
                  className="btn-primary"
                  onClick={handleSaveAll}
                  style={{ padding: '0.55rem 1.35rem', fontSize: '0.85rem' }}
                >
                  <Check size={16} />
                  <span>
                    {saveStatus.state === 'saving'
                      ? 'Publishing...'
                      : saveStatus.state === 'success'
                      ? '✓ Published Live!'
                      : 'Publish / Save Changes'}
                  </span>
                </button>
              </div>
            </div>

            {/* Notification Banner */}
            {saveStatus.state === 'success' && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  marginBottom: '1rem',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  backgroundColor: '#e8f7ed',
                  color: '#1b7339',
                  border: '1px solid #b4e6c3'
                }}
              >
                <CheckCircle2 size={16} />
                <span>Changes saved and published live!</span>
              </div>
            )}

            {/* Clean Tab Navigation */}
            <div className="admin-tabs-nav">
              <button
                className={`admin-tab-btn ${activeTab === 'artworks' ? 'active' : ''}`}
                onClick={() => setActiveTab('artworks')}
              >
                <Palette size={16} />
                <span>My Habijabi ({habijabiItems.length})</span>
              </button>

              <button
                className={`admin-tab-btn ${activeTab === 'journey' ? 'active' : ''}`}
                onClick={() => setActiveTab('journey')}
              >
                <Activity size={16} />
                <span>Medical Progress ({formData.journey?.currentPercentage || 20}%)</span>
              </button>

              <button
                className={`admin-tab-btn ${activeTab === 'content' ? 'active' : ''}`}
                onClick={() => setActiveTab('content')}
              >
                <Edit3 size={16} />
                <span>Text & Banner</span>
              </button>

              <button
                className={`admin-tab-btn ${activeTab === 'socials' ? 'active' : ''}`}
                onClick={() => setActiveTab('socials')}
              >
                <MessageCircle size={16} />
                <span>Social Links</span>
              </button>
            </div>

            {/* Tab 1: Artwork / Habijabi Upload */}
            {activeTab === 'artworks' && (
              <div className="admin-tab-content">
                <div className="admin-subcard">
                  <h4>Upload to "My Habijabi"</h4>
                  <p className="admin-hint">Select a photo from your device to add it immediately to the playing card deck slider.</p>

                  <div className="admin-form-grid">
                    <div>
                      <label>Artwork Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Cranial Nerves in Pastels"
                        value={newArt.title}
                        onChange={(e) => setNewArt({ ...newArt, title: e.target.value })}
                      />
                    </div>

                    <div>
                      <label>Medium</label>
                      <input
                        type="text"
                        placeholder="e.g. Watercolor & Micron Pen"
                        value={newArt.medium}
                        onChange={(e) => setNewArt({ ...newArt, medium: e.target.value })}
                      />
                    </div>

                    <div>
                      <label>Category</label>
                      <select
                        value={newArt.category}
                        onChange={(e) => setNewArt({ ...newArt, category: e.target.value })}
                      >
                        <option value="Medical Art">Medical Art</option>
                        <option value="Botanical Watercolor">Botanical Watercolor</option>
                        <option value="Study Journal">Study Journal</option>
                        <option value="Pencil Sketch">Pencil Sketch</option>
                        <option value="Embroidery & Craft">Embroidery & Craft</option>
                        <option value="Still Life">Still Life</option>
                      </select>
                    </div>

                    <div>
                      <label>Year</label>
                      <input
                        type="text"
                        placeholder="2026"
                        value={newArt.year}
                        onChange={(e) => setNewArt({ ...newArt, year: e.target.value })}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label>Story or Reflection behind the artwork</label>
                      <textarea
                        rows={2}
                        placeholder="What inspired you to draw or paint this piece?"
                        value={newArt.description}
                        onChange={(e) => setNewArt({ ...newArt, description: e.target.value })}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label>Upload Artwork Image (JPG / PNG) *</label>
                      <div className="admin-file-upload-box">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleArtworkImageUpload}
                        />
                        {newArt.image && (
                          <div className="admin-preview-thumb">
                            <img src={newArt.image} alt="Preview" />
                            <span>Image Selected ✓</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '1rem', textAlign: 'right' }}>
                    <button className="btn-primary" onClick={handleAddArtwork}>
                      <Plus size={16} />
                      <span>Add to My Habijabi</span>
                    </button>
                  </div>
                </div>

                {/* Existing Artworks List */}
                <h4 style={{ marginTop: '1.5rem', marginBottom: '0.75rem' }}>Current Habijabi Cards</h4>
                <div className="admin-art-list">
                  {habijabiItems.map((art) => (
                    <div key={art.id} className="admin-art-item">
                      <img src={art.image} alt={art.title} />
                      <div className="admin-art-item-info">
                        <strong>{art.title}</strong>
                        <span>{art.medium} · {art.year}</span>
                      </div>
                      <button
                        className="admin-delete-btn"
                        onClick={() => handleDeleteArtwork(art.id)}
                        title="Delete Artwork"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Medical Journey Progress */}
            {activeTab === 'journey' && (
              <div className="admin-tab-content">
                <div className="admin-subcard">
                  <h4>Update MBBS Completion Percentage</h4>
                  <p className="admin-hint">
                    Rule: <strong>100% / 5 Years = 20% per year</strong> (or 10% per half-year / term).
                    <br />
                    Currently: <strong>{formData.journey?.currentPercentage || 20}%</strong> completed.
                  </p>

                  <div style={{ margin: '1.5rem 0' }}>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: '0.5rem' }}>
                      <span>Progress Meter:</span>
                      <span style={{ color: 'var(--accent-primary)', fontSize: '1.1rem' }}>
                        {formData.journey?.currentPercentage || 20}%
                      </span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={formData.journey?.currentPercentage || 20}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        const updated = {
                          ...formData,
                          journey: { ...formData.journey, currentPercentage: val }
                        };
                        setFormData(updated);
                        onUpdateData(updated);
                      }}
                      style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                    />
                  </div>

                  {/* Quick Preset Buttons */}
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                    {[
                      { lbl: '1st Year Done (20%)', val: 20 },
                      { lbl: '2nd Year Mid (30%)', val: 30 },
                      { lbl: '2nd Year Done (40%)', val: 40 },
                      { lbl: '3rd Year Done (60%)', val: 60 },
                      { lbl: '4th Year Done (80%)', val: 80 },
                      { lbl: 'Graduated! (100%)', val: 100 }
                    ].map((preset) => (
                      <button
                        key={preset.val}
                        className="btn-secondary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.78rem' }}
                        onClick={() => {
                          const updated = {
                            ...formData,
                            journey: { ...formData.journey, currentPercentage: preset.val }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                      >
                        {preset.lbl}
                      </button>
                    ))}
                  </div>

                  <div className="admin-form-grid">
                    <div>
                      <label>Current Status Badge</label>
                      <input
                        type="text"
                        value={formData.journey?.currentYearLabel || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            journey: { ...formData.journey, currentYearLabel: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                        placeholder="e.g. Year 02 · Pre-Clinical to Clinical Transition"
                      />
                    </div>

                    <div>
                      <label>Current Milestone Note</label>
                      <input
                        type="text"
                        value={formData.journey?.statusNote || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            journey: { ...formData.journey, statusNote: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                        placeholder="e.g. Phase I Completed ♡"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Text & Banner Slot */}
            {activeTab === 'content' && (
              <div className="admin-tab-content">
                <div className="admin-subcard">
                  <h4>Personal Details & Studio Banner</h4>

                  <div className="admin-form-grid">
                    <div>
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={formData.personal?.fullName || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            personal: { ...formData.personal, fullName: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                      />
                    </div>

                    <div>
                      <label>Hero Subtitle</label>
                      <input
                        type="text"
                        value={formData.personal?.title || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            personal: { ...formData.personal, title: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                      />
                    </div>

                    <div style={{ gridColumn: 'span 2' }}>
                      <label>Short Introduction</label>
                      <textarea
                        rows={2}
                        value={formData.personal?.shortBio || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            personal: { ...formData.personal, shortBio: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                      />
                    </div>

                    <div>
                      <label>Banner Image Asset Path</label>
                      <input
                        type="text"
                        value={formData.personal?.bannerImage || '/assets/banner.jpg'}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            personal: { ...formData.personal, bannerImage: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                        placeholder="/assets/banner.jpg"
                      />
                    </div>

                    <div>
                      <label>Banner Caption</label>
                      <input
                        type="text"
                        value={formData.personal?.bannerCaption || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            personal: { ...formData.personal, bannerCaption: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                        placeholder="Where Medicine Meets Art 🩺🎨"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 4: Social Links (Facebook, Instagram, WhatsApp, Email) */}
            {activeTab === 'socials' && (
              <div className="admin-tab-content">
                <div className="admin-subcard">
                  <h4>Contact & Social Profile Links</h4>
                  <p className="admin-hint">Update the links that visitors can use to reach out at the bottom of the page.</p>

                  <div className="admin-form-grid">
                    <div>
                      <label>Facebook Profile / Page URL</label>
                      <input
                        type="text"
                        placeholder="https://facebook.com/your-profile"
                        value={formData.socials?.facebook || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            socials: { ...formData.socials, facebook: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                      />
                    </div>

                    <div>
                      <label>Instagram URL</label>
                      <input
                        type="text"
                        placeholder="https://instagram.com/your-username"
                        value={formData.socials?.instagram || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            socials: { ...formData.socials, instagram: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                      />
                    </div>

                    <div>
                      <label>WhatsApp Number / URL</label>
                      <input
                        type="text"
                        placeholder="https://wa.me/8801700000000"
                        value={formData.socials?.whatsapp || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            socials: { ...formData.socials, whatsapp: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                      />
                    </div>

                    <div>
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="samihabushra@gmail.com"
                        value={formData.socials?.email || ''}
                        onChange={(e) => {
                          const updated = {
                            ...formData,
                            socials: { ...formData.socials, email: e.target.value }
                          };
                          setFormData(updated);
                          onUpdateData(updated);
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
