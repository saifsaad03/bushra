import React, { useState } from 'react';
import { Palette, Image as ImageIcon } from 'lucide-react';

export function BannerSlot({ personal }) {
  const [imgError, setImgError] = useState(false);
  const bannerSrc = personal?.bannerImage || '/assets/banner.jpg';

  return (
    <div className="banner-slot-container">
      <div className="container">
        <div className="banner-card-frame">
          {!imgError ? (
            <div className="banner-image-wrapper">
              <img
                src={bannerSrc}
                alt={personal?.bannerCaption || "Samiha Bushra Banner"}
                onError={() => setImgError(true)}
                className="banner-img"
              />
              <div className="banner-overlay-gradient"></div>
              <div className="banner-caption-pill">
                <Palette size={14} color="#E88FA4" />
                <span>{personal?.bannerCaption || "Where Medicine Meets Art 🩺🎨 · Studio of a Future Healer"}</span>
              </div>
            </div>
          ) : (
            <div className="banner-placeholder-slot">
              <div className="banner-placeholder-icon">
                <ImageIcon size={28} color="var(--accent-primary)" />
              </div>
              <h4>Featured Studio Banner Slot</h4>
              <p>Place your favorite photo as <code>public/assets/banner.jpg</code> to display here!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
