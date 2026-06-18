/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Menu, X, Phone, ShieldCheck, Mail, Globe, Facebook, Instagram, Youtube } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setPage: (page: string) => void;
}

export default function Header({ currentPage, setPage }: HeaderProps) {
  const { theme, cmsText, isAdminLoggedIn, setAdminLogin } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor screen scrolling to toggling transparent vs glassy background header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', slug: 'home', hash: '#home' },
    { label: 'Destinations', slug: 'destinations', hash: '#destinations' },
    { label: 'Services', slug: 'services', hash: '#services' },
    { label: 'Blog Insights', slug: 'blog', hash: '#blog' },
    { label: 'About Us', slug: 'about', hash: '#about' },
    { label: 'Contact', slug: 'contact', hash: '#contact' },
  ];

  const handleNavClick = (slug: string) => {
    setPage(slug);
    setIsMobileMenuOpen(false);
    // Smooth scroll to top of site
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const activeColorStyle = {
    color: theme.secondaryColor,
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'py-3 bg-[#0B1120]/80 backdrop-blur-xl border-b border-white/8 shadow-xl' 
        : 'py-5 bg-transparent border-b border-transparent'
    }`}>
      {/* Mini top informational strip on desktop for travel-consultancy styling */}
      <div className={`hidden lg:flex max-w-7xl mx-auto px-6 pb-2.5 justify-between items-center text-xs text-gray-400 font-mono tracking-wide ${isScrolled ? 'hidden' : ''}`}>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 gold-text" /> {cmsText.contactEmail}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-emerald-400"><Globe className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> GLOBAL EXPERTISE DESK ONLINE</span>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors"><Facebook className="w-3.5 h-3.5" /></a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors"><Instagram className="w-3.5 h-3.5" /></a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-amber-400 transition-colors"><Youtube className="w-3.5 h-3.5" /></a>
          <span>|</span>
          <div className="text-gray-300 font-semibold flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 gold-text" /> Call 24/7: <span className="text-white font-mono">{cmsText.contactPhone}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* LOGO */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className="p-2 bg-amber-500/10 rounded-xl border border-amber-500/30 group-hover:rotate-12 transition-transform duration-300">
            <Compass className="w-6 h-6 gold-text" />
          </div>
          <div>
            <span className="block font-poppins font-extrabold text-2xl tracking-tighter uppercase text-white leading-none">
              WORLD<span className="gold-text">CLASS</span>
            </span>
            <span className="block text-[8px] font-mono tracking-[0.3em] text-[#3B82F6] font-semibold -mt-0.5">
              TRAVEL LOGISTICS
            </span>
          </div>
        </button>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-8 text-sm font-poppins font-semibold">
          {navItems.map((item) => (
            <button
              key={item.slug}
              onClick={() => handleNavClick(item.slug)}
              className={`hover:text-amber-400 transition-colors relative py-1 cursor-pointer tracking-wider ${
                currentPage === item.slug ? 'gold-text font-bold' : 'text-white/70'
              }`}
            >
              {item.label}
              {currentPage === item.slug && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 gold-bg rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* ACTION / ADMIN GATEWAYS */}
        <div className="hidden lg:flex items-center gap-4">
          {isAdminLoggedIn ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleNavClick('admin')}
                className="px-4 py-2 border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg text-emerald-400 text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Admin Suite</span>
              </button>
              <button
                onClick={() => {
                  setAdminLogin(false);
                  handleNavClick('home');
                }}
                className="px-3.5 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-gray-400 text-xs font-poppins"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('admin')}
              className="text-white/40 hover:text-white text-xs font-mono tracking-widest uppercase cursor-pointer"
            >
              Staff Portal
            </button>
          )}

          <button
            onClick={() => {
              // Scroll to the bottom or open a query modal
              const bForm = document.getElementById('footer-newsletter-signup') || document.getElementById('booking-portal-trigger-dest');
              if (bForm) {
                bForm.scrollIntoView({ behavior: 'smooth' });
              } else {
                handleNavClick('contact');
              }
            }}
            className="px-6 py-2.5 gold-bg text-[#0B1120] rounded-full font-poppins font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-amber-500/15 hover:-translate-y-0.5"
          >
            Design Tour
          </button>
        </div>

        {/* MOBILE NAVIGATION BUTTON */}
        <div className="lg:hidden flex items-center gap-3">
          {isAdminLoggedIn && (
            <button
              onClick={() => handleNavClick('admin')}
              className="p-2 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-400"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 border border-white/10 rounded-lg bg-slate-900/60 text-white cursor-pointer"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION PANEL */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-[68px] left-0 right-0 bottom-0 bg-[#0B1120]/95 backdrop-blur-2xl border-t border-white/5 p-6 z-40 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="block text-[10px] font-mono text-gray-500 tracking-wider uppercase mb-2">Navigation Links</span>
            {navItems.map((item) => (
              <button
                key={item.slug}
                onClick={() => handleNavClick(item.slug)}
                className={`block w-full text-left py-2 border-b border-white/5 font-poppins text-lg font-bold tracking-wide transition-colors ${
                  currentPage === item.slug ? 'gold-text' : 'text-gray-300 hover:text-amber-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
              <span className="block text-xs text-gray-400 font-mono mb-1">CALL CONCIERGE DESK 24/7</span>
              <a href={`tel:${cmsText.contactPhone}`} className="text-lg font-bold text-white tracking-tight font-mono">
                {cmsText.contactPhone}
              </a>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleNavClick(isAdminLoggedIn ? 'admin' : 'admin')}
                className="flex-1 py-3 border border-white/10 rounded-xl text-gray-300 text-xs font-poppins font-medium text-center shadow-md leading-none bg-white/5"
              >
                {isAdminLoggedIn ? 'Admin Panel' : 'Staff Login'}
              </button>
              <button
                onClick={() => {
                  handleNavClick('contact');
                  setTimeout(() => {
                    document.getElementById('booking-inquiry-section-target')?.scrollIntoView({ behavior: 'smooth' });
                  }, 200);
                }}
                className="flex-1 py-3 gold-bg text-[#0B1120] rounded-xl text-xs font-poppins font-bold text-center shadow-lg leading-none hover:brightness-110"
              >
                Request Quote
              </button>
            </div>
            {isAdminLoggedIn && (
              <button
                onClick={() => {
                  setAdminLogin(false);
                  handleNavClick('home');
                }}
                className="w-full text-center py-2 text-xs text-red-400 font-mono underline"
              >
                Log Out Admin
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
