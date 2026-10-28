import React, { useState, useEffect } from 'react';
import { loadPortfolioData, fetchLivePortfolioData } from './services/storageService';
import { Navbar } from './components/Navbar';
import { BannerSlot } from './components/BannerSlot';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { JourneyTimeline } from './components/JourneyTimeline';
import { ArtGallery } from './components/ArtGallery';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { PersonalCorner } from './components/PersonalCorner';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { Lock } from 'lucide-react';

export function App() {
  const [portfolio, setPortfolio] = useState(() => loadPortfolioData());
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('samiha_theme') || 'natural';
  });

  // Apply data-theme attribute to root HTML element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('samiha_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'natural' ? 'dark' : 'natural'));
  };

  // Background fetch from Supabase Cloud Database on load
  useEffect(() => {
    let isMounted = true;
    fetchLivePortfolioData().then((liveData) => {
      if (isMounted && liveData) {
        setPortfolio(liveData);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleUpdateData = (newData) => {
    setPortfolio({ ...newData });
  };

  return (
    <div className="portfolio-app-root">
      {/* Background Radial Texture */}
      <div className="bg-texture-grid" />

      {/* Top Navbar with Theme Toggle (Natural / Dark Mode) & Working Menubar */}
      <Navbar
        personal={portfolio.personal}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Dedicated Banner Slot Immediately Below Navigation Bar */}
      <BannerSlot personal={portfolio.personal} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <Hero personal={portfolio.personal} />

        {/* About Me Section */}
        <About
          about={portfolio.about}
          personal={portfolio.personal}
        />

        {/* Redesigned Medical Journey Section (Visual 5-Year Progress Meter) */}
        <JourneyTimeline
          journey={portfolio.journey}
        />

        {/* Glimpses of the Journey: Her Artwork Auto-Slide Carousel & Studio */}
        <ArtGallery
          artworks={portfolio.artworks}
          onOpenAdminUpload={() => setAdminModalOpen(true)}
        />

        {/* Academic Foundations (MBBS, HSC, SSC) */}
        <Education
          education={portfolio.education}
        />

        {/* Skills & Competencies (Medical, Clinical, Arts, Strengths) */}
        <Skills
          skills={portfolio.skills}
        />

        {/* A Gentle Glimpse (Redesigned Scrapbook Polaroids & Inspirations) */}
        <PersonalCorner
          personalCorner={portfolio.personalCorner}
        />
      </main>

      {/* Footer */}
      <Footer personal={portfolio.personal} />

      {/* Fresh Studio Admin Panel Modal */}
      <AdminPanel
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        data={portfolio}
        onUpdateData={handleUpdateData}
      />

      {/* Floating Discreet Studio Admin Trigger */}
      <button
        className="floating-admin-trigger"
        onClick={() => setAdminModalOpen(true)}
        title="Open Studio Admin & Medical Progress Panel"
      >
        <Lock size={14} color="var(--accent-primary)" />
        <span>Studio Admin</span>
      </button>
    </div>
  );
}

export default App;
