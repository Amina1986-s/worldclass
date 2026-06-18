/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plane, 
  Hotel, 
  FileText, 
  Compass, 
  Ship, 
  Briefcase, 
  Gem, 
  Heart, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Award,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Services() {
  const { services, theme, incrementPageViews } = useApp();
  const [activeInquiryService, setActiveInquiryService] = useState<string | null>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  useEffect(() => {
    incrementPageViews();
  }, []);

  const iconMapping: { [key: string]: React.ElementType } = {
    PlaneInside: Plane,
    Hotel: Hotel,
    FileText: FileText,
    Compass: Compass,
    Ship: Ship,
    Briefcase: Briefcase,
    Gem: Gem,
    Heart: Heart,
    Users: Users,
    ShieldCheck: ShieldCheck,
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName || !inquiryPhone) return;

    setInquirySubmitted(true);
    setTimeout(() => {
      setShowInquiryModal(false);
      setInquirySubmitted(false);
      setInquiryName('');
      setInquiryPhone('');
      setActiveInquiryService(null);
    }, 2500);
  };

  const handleTriggerInquiry = (serviceTitle: string) => {
    setActiveInquiryService(serviceTitle);
    setShowInquiryModal(true);
  };

  // Button rounding styles
  const getBtnRounded = () => {
    if (theme.buttonStyle === 'rounded-none') return 'rounded-none';
    if (theme.buttonStyle === 'rounded-full') return 'rounded-full';
    return 'rounded-lg';
  };

  return (
    <div className="pt-24 pb-16 space-y-16 overflow-hidden">
      
      {/* HEADER HERO */}
      <section className="text-center max-w-4xl mx-auto px-6 space-y-4 pt-10">
        <span className="text-xs font-mono gold-text tracking-widest uppercase block animate-pulse">Logistics Engine Tier</span>
        <h1 className="text-4xl sm:text-5xl font-black font-poppins text-white leading-tight uppercase">
          TEN ENTERPRISE TRAVEL SERVICES
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          We operate direct, premium APIs and global diplomatic clearances to deliver flawless transcontinental transits, luxury accommodations, and executive secure pathways.
        </p>
      </section>

      {/* SERVICES GRID */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((item) => {
            const IconComponent = iconMapping[item.icon] || Compass;
            return (
              <div 
                key={item.id} 
                className="p-6 rounded-2xl border border-white/5 bg-[#0B1120]/60 hover:border-amber-400/30 hover:bg-[#0B1120]/80 transition-all flex flex-col justify-between text-left group shadow-xl"
              >
                <div className="space-y-4">
                  {/* Service Icon inside glowing sphere frame */}
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 group-hover:border-amber-400 flex items-center justify-center group-hover:scale-105 duration-300 shadow-lg">
                    <IconComponent className="w-6 h-6 text-amber-400 group-hover:text-amber-300" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">{item.shortDescription}</span>
                    <h3 className="text-lg font-bold font-poppins text-white uppercase group-hover:gold-text transition-colors duration-300">{item.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                      {item.longDescription}
                    </p>
                  </div>

                  {/* Bullet features */}
                  <ul className="space-y-1.5 pt-3 border-t border-white/5 text-[11px] text-gray-300 font-sans">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="gold-text mt-0.5 font-bold">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6">
                  <button 
                    onClick={() => handleTriggerInquiry(item.title)}
                    className="w-full py-2.5 bg-white/5 group-hover:gold-bg group-hover:text-[#0B1120] text-[11px] font-mono uppercase tracking-widest font-bold text-white rounded-lg flex items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer border border-white/5 group-hover:border-transparent"
                  >
                    <span>Instant Request</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TRUST SEAL PROMOTION */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="p-8 rounded-2xl glass-panel text-center grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-slate-900/40 border border-white/5">
          <div className="space-y-1">
            <span className="block font-poppins font-extrabold text-2xl text-white">GDS REGISTERED</span>
            <span className="block text-[10px] font-mono text-gray-500 tracking-wider">Direct API links with 180+ Airways</span>
          </div>
          <div className="space-y-1 border-t md:border-t-0 md:border-x border-white/5 py-4 md:py-0">
            <span className="block font-poppins font-extrabold text-2xl text-emerald-400">ENCRYPTED VAULT</span>
            <span className="block text-[10px] font-mono text-gray-500 tracking-wider">Cryptographically isolated customer files</span>
          </div>
          <div className="space-y-1">
            <span className="block font-poppins font-extrabold text-2xl gold-text">24/7 SUPPORT</span>
            <span className="block text-[10px] font-mono text-gray-500 tracking-wider">Assigned 1-to-1 Travel Designer desk</span>
          </div>
        </div>
      </section>

      {/* DYNAMIC COMPREHENSIVE SERVICE INQUIRY DRAWER MODAL */}
      <AnimatePresence>
        {showInquiryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInquiryModal(false)}
              className="absolute inset-0 bg-slate-950"
            />

            {/* Modal Canvas Box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="w-full max-w-md bg-[#0B1120] border border-white/10 p-6 rounded-2xl shadow-2xl relative z-10 text-left space-y-6 overflow-hidden"
            >
              {/* Decorative accent blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl -z-10 pointer-events-none" />
              
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <div>
                  <span className="text-[10px] font-mono gold-text tracking-widest uppercase block">Service Inquiry Desk</span>
                  <h3 className="font-poppins font-bold text-base text-white">{activeInquiryService}</h3>
                </div>
                <button 
                  onClick={() => setShowInquiryModal(false)}
                  className="p-1 px-2.5 bg-white/5 hover:bg-white/10 rounded text-xs text-gray-400 hover:text-white"
                >
                  X
                </button>
              </div>

              {inquirySubmitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="inline-flex p-3 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="font-poppins font-semibold text-lg text-white">Inquiry Filed Instantly!</h4>
                  <p className="text-xs text-gray-400 font-sans">Your assigned Travel Concierge will reach out on cellular networks with price options.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g., Charlotte Vance"
                      value={inquiryName}
                      onChange={(e) => setInquiryName(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">Secure Phone Number *</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+44 7911 123456"
                      value={inquiryPhone}
                      onChange={(e) => setInquiryPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-sans"
                    />
                  </div>

                  <p className="text-[10px] text-gray-500 leading-snug">
                    By submitting your secure contact coordinates, you authorize WORLDCLASS Experience designers to connect with you via secure WhatsApp or voice calls.
                  </p>

                  <div className="pt-2 grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      onClick={() => setShowInquiryModal(false)}
                      className="py-2.5 px-4 border border-white/10 hover:bg-white/5 rounded-lg text-xs text-gray-400 hover:text-white font-poppins"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className={`py-2.5 px-4 gold-bg hover:brightness-110 font-poppins font-bold text-xs text-[#0B1120] uppercase tracking-wider shadow-lg ${getBtnRounded()}`}
                    >
                      Secure Code
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
