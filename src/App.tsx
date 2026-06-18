/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Destinations from './pages/Destinations';
import Services from './pages/Services';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { motion, AnimatePresence } from 'motion/react';

function AppContent() {
  const { theme, seo, cmsText } = useApp();
  const [page, setPage] = useState<string>('home');
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);

  // Synchronize browser URL Hash to support forward/back commands
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase().trim();
      if (hash === '#about') setPage('about');
      else if (hash === '#destinations') setPage('destinations');
      else if (hash === '#services') setPage('services');
      else if (hash === '#blog') setPage('blog');
      else if (hash === '#contact') setPage('contact');
      else if (hash === '#admin') setPage('admin');
      else setPage('home');
    };

    // Run on boot
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update URL Hash and scroll to top when page changes programmatically
  const navigateTo = (slug: string) => {
    setPage(slug);
    window.location.hash = slug === 'home' ? '' : slug;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchronize dynamic SEO browser meta title header
  useEffect(() => {
    if (seo && seo.metaTitle) {
      document.title = seo.metaTitle;
    }
  }, [seo]);

  // Map dynamic font overrides selectively based on Admin Panel choices
  const getFontPairClass = () => {
    switch (theme.fontPair) {
      case 'Inter-SpaceGrotesk':
        return 'font-sans [&_h1]:font-space [&_h2]:font-space [&_h3]:font-space [&_h4]:font-space';
      case 'Inter-Outfit':
        return 'font-sans [&_h1]:font-outfit [&_h2]:font-outfit [&_h3]:font-outfit [&_h4]:font-outfit';
      case 'Inter-Playfair':
        return 'font-sans [&_h1]:font-playfair [&_h2]:font-playfair [&_h3]:font-playfair [&_h4]:font-playfair';
      case 'Inter-Poppins':
      default:
        return 'font-sans [&_h1]:font-poppins [&_h2]:font-poppins [&_h3]:font-poppins [&_h4]:font-poppins';
    }
  };

  // Select page renderer
  const renderPage = () => {
    switch (page) {
      case 'about':
        return <About />;
      case 'destinations':
        return (
          <Destinations 
            initialSelectedDestId={selectedDestId}
            setInitialSelectedDestId={setSelectedDestId}
          />
        );
      case 'services':
        return <Services />;
      case 'blog':
        return <Blog />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <Admin />;
      case 'home':
      default:
        return (
          <Home 
            setPage={navigateTo}
            setSelectedDestId={setSelectedDestId}
          />
        );
    }
  };

  return (
    <div className={`min-h-screen bg-brand-darkbg text-gray-100 flex flex-col justify-between ${getFontPairClass()} selection:bg-brand-secondary/40 selection:text-white`}>
      
      {/* Dynamic Ambient Space Background */}
      {theme.enableStarfield && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
          {/* Subtle slow pulsing visual radial backgrounds representing atmosphere stars */}
          <div className="absolute top-1/10 left-1/3 w-[550px] h-[550px] rounded-full bg-brand-secondary/4 blur-[130px] mesh-blob-1" />
          <div className="absolute top-2/3 right-1/4 w-[450px] h-[450px] rounded-full bg-brand-accent/2.5 blur-[120px] mesh-blob-2" />
        </div>
      )}

      {/* HEADER NAV */}
      <Header currentPage={page} setPage={navigateTo} />

      {/* CORE DISPLAY WINDOW WITH SMOOTH FADE ANIMATION */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: theme.animationSpeed === 'slow' ? 0.45 : theme.animationSpeed === 'fast' ? 0.18 : 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <Footer setPage={navigateTo} />
      
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
