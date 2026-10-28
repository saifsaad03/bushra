import React, { useState, useEffect } from 'react';
import { loadPortfolioData, fetchLivePortfolioData } from './services/storageService';
import { Navbar } from './components/Navbar';
import { BannerSlot } from './components/BannerSlot';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { JourneyTimeline } from './components/JourneyTimeline';
import { HabijabiCards } from './components/HabijabiCards';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { PersonalCorner } from './components/PersonalCorner';
import { ContactSection } from './components/ContactSection';
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

  const habijabiList = portfolio.habijabi || portfolio.artworks || [];

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
        {/* 1. Hero Section (Transparent Portrait without background, no countdown) */}
        <Hero personal={portfolio.personal} />

        {/* 2. About Me Section (NO IMAGE, with Interests, Work Experience & Hobbies) */}
        <About
          about={portfolio.about}
          personal={portfolio.personal}
          interests={portfolio.interests}
          workExperience={portfolio.workExperience}
        />

        {/* 3. My Medical Journey (Visual 5-Year Progress Meter) */}
        <JourneyTimeline
          journey={portfolio.journey}
        />

        {/* 4. "My Habijabi" — Playing Card Deck Showcase of her Artworks */}
        <HabijabiCards
          items={habijabiList}
          onOpenAdminUpload={() => setAdminModalOpen(true)}
        />

        {/* 5. Academic Foundations (MBBS, HSC, SSC) */}
        <Education
          education={portfolio.education}
        />

        {/* 6. Skills & Competencies (Medical, Clinical, Textile Arts, Languages: Bangla 100%, English 80%, Hindi 70%) */}
        <Skills
          skills={portfolio.skills}
          languages={portfolio.languages}
        />

        {/* 7. A Gentle Glimpse (Scrapbook Polaroids & Inspirations) */}
        <PersonalCorner
          personalCorner={portfolio.personalCorner}
        />

        {/* 8. Contact Me (Facebook, Instagram, WhatsApp, Gmail) */}
        <ContactSection
          socials={portfolio.socials}
          personal={portfolio.personal}
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
