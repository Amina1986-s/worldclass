/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Compass, Mail, Phone, MapPin, Send, MessageSquareCode, Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

interface FooterProps {
  setPage: (page: string) => void;
}

export default function Footer({ setPage }: FooterProps) {
  const { cmsText, destinations, services, theme } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setIsSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  const quickLinks = [
    { label: 'Home Experience', slug: 'home' },
    { label: 'Destination Catalog', slug: 'destinations' },
    { label: 'Bespoke Services', slug: 'services' },
    { label: 'Blog Publication', slug: 'blog' },
    { label: 'Our Heritage Team', slug: 'about' },
    { label: 'Inquiry Registry', slug: 'contact' },
  ];

  return (
    <footer className="relative bg-[#0B1120] border-t border-white/5 pt-16 pb-8 text-sm text-gray-400 overflow-hidden">
      {/* Structural ambient gradient node backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/2 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/2 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        
        {/* COLUMN 1: Company Profile Info */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/30">
              <Compass className="w-5 h-5 gold-text" />
            </div>
            <span className="font-poppins font-black text-lg tracking-tight text-white uppercase">
              WORLD<span className="gold-text">CLASS</span>
            </span>
          </div>
          <p className="text-xs text-gray-400 leading-relaxed font-sans">
            {cmsText.aboutMission.slice(0, 160)}...
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 hover:border-amber-400 flex items-center justify-center hover:bg-amber-500/10 transition-colors text-white">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 hover:border-amber-400 flex items-center justify-center hover:bg-amber-500/10 transition-colors text-white">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 hover:border-amber-400 flex items-center justify-center hover:bg-amber-500/10 transition-colors text-white">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 hover:border-amber-400 flex items-center justify-center hover:bg-amber-500/10 transition-colors text-white">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* COLUMN 2: Navigation & Quick Links */}
        <div className="space-y-4">
          <h4 className="font-poppins font-semibold text-xs text-white uppercase tracking-wider font-mono gold-text">
            Company Navigation
          </h4>
          <ul className="space-y-2 text-xs font-poppins">
            {quickLinks.map((link) => (
              <li key={link.slug}>
                <button
                  onClick={() => {
                    setPage(link.slug);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left py-0.5"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* COLUMN 3: Active Showcase Lists */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-xs text-white uppercase tracking-wider font-mono gold-text">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs">
              {destinations.slice(0, 4).map((d) => (
                <li key={d.id}>
                  <button
                    onClick={() => {
                      setPage('destinations');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left text-gray-400 leading-snug"
                  >
                    {d.name.split('&')[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-poppins font-semibold text-xs text-white uppercase tracking-wider font-mono gold-text">
              Elite Curations
            </h4>
            <ul className="space-y-2 text-xs">
              {services.slice(0, 4).map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => {
                      setPage('services');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer text-left text-gray-400"
                  >
                    {s.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* COLUMN 4: Contact Center & Newsletter */}
        <div id="footer-newsletter-signup" className="space-y-4">
          <h4 className="font-poppins font-semibold text-xs text-white uppercase tracking-wider font-mono gold-text">
            Bespoke Communications
          </h4>
          <div className="space-y-2.5 text-xs font-sans">
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 gold-text mt-0.5 shrink-0" />
              <span>{cmsText.contactAddress}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 gold-text shrink-0" />
              <a href={`tel:${cmsText.contactPhone}`} className="hover:text-white transition-all font-mono">
                {cmsText.contactPhone}
              </a>
            </div>
          </div>

          <div className="pt-2 border-t border-white/5 space-y-2">
            <p className="text-[11px] text-gray-500">Subscribe for executive voyager updates.</p>
            {isSubscribed ? (
              <div className="p-2 border border-emerald-500/20 bg-emerald-500/10 rounded-lg text-emerald-400 text-xs font-medium text-center">
                Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@executive.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-[#090D1A] border border-white/8 rounded-lg text-xs px-3.5 py-2 text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="p-2 gold-bg text-[#0B1120] hover:brightness-110 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* COPYRIGHT & LEGAL DIVISION */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs tracking-wide">
        <div>
          &copy; {new Date().getFullYear()} WORLDCLASS Experience luxury travel concierge. All Rights Preserved.
        </div>
        
        <div className="flex items-center gap-6 text-gray-500 text-xs">
          <button onClick={() => alert('Privacy Policy: All reservation data, passport references, and itineraries processed in WORLDCLASS are encrypted and rest heavily in secure sandboxed local registries.')} className="hover:text-gray-300 cursor-pointer">
            Privacy Policy
          </button>
          <span>•</span>
          <button onClick={() => alert('Terms & Conditions: Holiday package quotes, flight transfers, and visa processing times are estimates and depend strictly on global embassy clearances.')} className="hover:text-gray-300 cursor-pointer">
            Terms & Conditions
          </button>
          <span>•</span>
          <button 
            type="button"
            onClick={() => {
              setPage('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="hover:text-white hover:underline gold-text font-mono flex items-center gap-1 cursor-pointer"
          >
            <MessageSquareCode className="w-3.5 h-3.5" /> Admin Panel Login
          </button>
        </div>
      </div>
    </footer>
  );
}
