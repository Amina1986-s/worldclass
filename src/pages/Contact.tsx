/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import BookingForm from '../components/BookingForm';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  Globe, 
  CheckCircle,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  q: string;
  a: string;
}

export default function Contact() {
  const { cmsText, incrementPageViews } = useApp();

  const [activeFAQIndex, setActiveFAQIndex] = useState<number | null>(0);
  const [activeHub, setActiveHub] = useState<string>('NY');
  
  // Custom contact Form inputs
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [formSucceed, setFormSucceed] = useState(false);

  useEffect(() => {
    incrementPageViews();
  }, []);

  const contactHubs = [
    { 
      id: 'NY', 
      city: 'New York (HQ)', 
      address: '745 Fifth Avenue, Penthouse Level, New York, NY 10151', 
      phone: '+1 (800) 965-2252', 
      hours: 'Mon - Sun: 24/7 Support Desk', 
      cx: 140, 
      cy: 110 
    },
    { 
      id: 'LDN', 
      city: 'London Registry', 
      address: 'Mayfair Prestige Chambers, 42 Berkeley Square, London', 
      phone: '+44 20 7946 0192', 
      hours: 'Mon - Fri: 8:00 AM - 6:00 PM GMT', 
      cx: 320, 
      cy: 80 
    },
    { 
      id: 'SGP', 
      city: 'Singapore Sector', 
      address: 'Marina Bay Financial Tower 3, #45-02 Singapore', 
      phone: '+65 6789 0112', 
      hours: 'Mon - Sat: 9:00 AM - 8:00 PM SGT', 
      cx: 460, 
      cy: 220 
    },
  ];

  const faqs: FAQItem[] = [
    { 
      q: 'How does the custom travel scheduling process work exactly?', 
      a: 'First, you submit your prefered travel parameters (budget, departure window, destination choice) inside the reservation engine. Within 12 business hours, your assigned personal travel designer drafts a granular, customizable PDF boarding log complete with flight transfers, 5-star hotel options, and cultural clearances. We only proceed upon your custom approvals.' 
    },
    { 
      q: 'Does WORLDCLASS handle visa applications and diplomatic clearances?', 
      a: 'Absolutely. Our secure mobility desk processes your files directly through exclusive diplomatic channels. We handle passport legal certification, fast-track visa stamps, and airport ingress clearances globally so you never stand in a queue.' 
    },
    { 
      q: 'Can I edit or cancel my custom packages after booking?', 
      a: 'Yes. Every booking carries zero deductible protection. You are allowed to adjust your dates, switch accommodations, or cancel fully for full travel credit up to 14 days before your scheduled departure date.' 
    },
    { 
      q: 'Are custom helicopter charters or remote private guides available?', 
      a: 'Yes. Our Luxury Tours service is configured without limits. We routinely orchestrate private glacier helicopter flights, archaeological excavation accesses, luxury safari vehicle bookings, and deep sea scuba exploration vessels.' 
    },
    { 
      q: 'Is my personal booking data kept completely private?', 
      a: 'Discretion is our absolute peak value. Your reservation history, passport sheets, and private invoices are kept in isolated local state indices and never shared or sold to marketing syndicates.' 
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    setFormSucceed(true);
    setClientName('');
    setClientEmail('');
    setClientNotes('');
    
    setTimeout(() => {
      setFormSucceed(false);
    }, 4000);
  };

  const selectedHubData = contactHubs.find(h => h.id === activeHub) || contactHubs[0];

  const triggerWhatsAppRedirect = () => {
    const textPreset = encodeURIComponent("Welcome to WORLDCLASS experience. Requesting a custom luxury voyager callback.");
    window.open(`https://wa.me/${cmsText.contactWhatsApp.replace('+', '')}?text=${textPreset}`, '_blank');
  };

  return (
    <div className="pt-24 pb-16 space-y-16 overflow-hidden">
      
      {/* HEADER HERO */}
      <section className="text-center max-w-4xl mx-auto px-6 space-y-4 pt-10">
        <span className="text-xs font-mono gold-text tracking-widest uppercase block animate-pulse">Contact Command Center</span>
        <h1 className="text-4xl sm:text-5xl font-black font-poppins text-white leading-tight uppercase">
          Enlist In Your Private Odyssey
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          Request bespoke counseling today. Connect with our New York, London, or Singapore registries, or click any world coordinate on our board map below.
        </p>
      </section>

      {/* INTERACTIVE world MAP DIRECTIONS */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Hub Interactive SVG Map */}
        <div className="lg:col-span-8 p-6 rounded-2xl glass-panel relative border border-white/5 bg-[#0B1120]/40 text-left">
          <div className="flex justify-between items-center mb-4">
            <div>
              <span className="text-[10px] font-mono gold-text tracking-widest block uppercase font-bold">WORLD COORDINATE DIALLER</span>
              <h3 className="text-lg font-bold font-poppins text-white uppercase">Corporate Node Registries</h3>
            </div>
            <div className="flex gap-2 text-[10px] font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-emerald-400">GDS GATEWAYS SYNCED</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative border border-white/5 rounded-xl bg-slate-950/80 p-1 overflow-hidden">
            <svg viewBox="0 0 600 300" className="w-full h-auto opacity-75">
              {/* Grid backgrounds */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Vector connection arcs */}
              <path d="M 140 110 Q 230 40 320 80" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1.5" strokeDasharray="3, 3" fill="none" />
              <path d="M 320 80 Q 390 150 460 220" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1.5" strokeDasharray="3, 3" fill="none" />
              <path d="M 140 110 Q 300 180 460 220" stroke="rgba(251, 191, 36, 0.3)" strokeWidth="1.5" strokeDasharray="3, 3" fill="none" />

              {/* Simulated world continent shapes outline backdrops */}
              <path d="M 40 60 Q 60 70 80 100 T 140 120 T 150 160 T 130 190 T 100 240" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <path d="M 280 40 Q 320 50 350 40 T 400 60 T 450 110 T 420 180 T 360 240" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

              {/* Node Hotspots */}
              {contactHubs.map((hub) => {
                const isActive = hub.id === activeHub;
                return (
                  <g 
                    key={hub.id} 
                    className="cursor-pointer" 
                    onClick={() => setActiveHub(hub.id)}
                  >
                    {/* Ring pulsing */}
                    <circle cx={hub.cx} cy={hub.cy} r={isActive ? 12 : 6} fill="none" stroke={isActive ? '#3B82F6' : 'rgba(59, 130, 246, 0.4)'} strokeWidth={isActive ? 3 : 1.5}>
                      {isActive && <animate attributeName="r" values="3;16;3" dur="2s" repeatCount="indefinite" />}
                    </circle>
                    {/* Core circle */}
                    <circle cx={hub.cx} cy={hub.cy} r={isActive ? 5.5 : 3.5} fill={isActive ? '#FBBF24' : '#3B82F6'} />
                    {/* Hub Identifier Tag label */}
                    <text x={hub.cx} y={hub.cy - 12} fill={isActive ? '#FFFFFF' : '#94a3b8'} fontSize="10" fontFamily="monospace" textAnchor="middle" fontWeight={isActive ? 'bold' : 'normal'}>
                      {hub.id}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase mt-4 text-center">
            ← PRESS VECTOR HOTSPOT NODES ON WORLD MAP FOR LOCAL COORDINATES DIRECTORY →
          </p>
        </div>

        {/* Selected Hub Details */}
        <div className="lg:col-span-4 p-6 rounded-2xl border border-white/5 bg-[#0B1120]/50 space-y-6 text-left shadow-2xl h-full">
          <div className="space-y-1.5">
            <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center gold-text shrink-0">
              <Building className="w-5.5 h-5.5" />
            </div>
            <span className="text-[10px] font-mono gold-text tracking-widest block uppercase font-bold">DIRECTORY FILE LOADED</span>
            <h4 className="text-xl font-bold font-poppins text-white uppercase">{selectedHubData.city}</h4>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1 flex items-start gap-2.5">
              <MapPin className="w-4.5 h-4.5 text-gray-500 shrink-0 mt-0.5" />
              <div>
                <span className="block text-gray-500 font-mono text-[9px] uppercase">POSTAL ADDRESS</span>
                <span className="text-white leading-relaxed">{selectedHubData.address}</span>
              </div>
            </div>

            <div className="space-y-1 flex items-center gap-2.5">
              <Phone className="w-4.5 h-4.5 text-gray-500 shrink-0" />
              <div>
                <span className="block text-gray-500 font-mono text-[9px] uppercase">DIRECT PRIVATE VOICE</span>
                <a href={`tel:${selectedHubData.phone}`} className="text-white hover:underline font-bold">{selectedHubData.phone}</a>
              </div>
            </div>

            <div className="space-y-1 flex items-center gap-2.5">
              <Clock className="w-4.5 h-4.5 text-gray-500 shrink-0" />
              <div>
                <span className="block text-gray-500 font-mono text-[9px] uppercase">DESK HOURS STATUS</span>
                <span className="text-white font-medium">{selectedHubData.hours}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/5 space-y-2">
            <button 
              onClick={triggerWhatsAppRedirect}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-white font-poppins font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Secure WhatsApp Chat</span>
            </button>
            <p className="text-[9px] text-gray-500 font-mono text-center">INSTANT ENCRYPTED END-TO-END FEEDBACK CHANNELS</p>
          </div>
        </div>

      </section>

      {/* CORE CONTACT FEEDBACK FORM & FAQs */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Contact Form */}
        <div className="lg:col-span-5 p-6 rounded-2xl border border-white/5 bg-[#0B1120]/40 text-left relative">
          <span className="text-xs font-mono gold-text tracking-widest block uppercase mb-1">CONTACT FILING</span>
          <h3 className="text-2xl font-black font-poppins text-white uppercase mb-4 leading-tight">General Dispatch Registry</h3>
          
          {formSucceed ? (
            <div className="p-8 text-center bg-slate-950/80 border border-emerald-500/20 rounded-xl space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h4 className="font-poppins font-bold text-white text-base">Dispatch Received!</h4>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">Your message has been logged inside our secure concierge deck. A travel pathfinder will connect with you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">Full Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g., Alexandra Huntington"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 text-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">Secure Email *</label>
                <input 
                  type="email" 
                  required 
                  placeholder="alexandra@vancecap.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-2.5 px-4 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 text-sans"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1.5">Dispatch Message Instructions</label>
                <textarea 
                  rows={4} 
                  required 
                  placeholder="Detail your request: corporate incentive program setups, custom sailing itineraries, airport charter connections, etc."
                  value={clientNotes}
                  onChange={(e) => setClientNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl py-2 px-3 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 text-sans"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3 gold-bg hover:brightness-110 rounded-xl text-[#0B1120] font-poppins font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Docket</span>
              </button>
            </form>
          )}
        </div>

        {/* Accordions FAQ Section */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="space-y-1">
            <span className="text-xs font-mono gold-text tracking-widest block uppercase">FAQ DIRECTORY</span>
            <h3 className="text-3xl font-extrabold font-poppins text-white uppercase">Sovereign Voyager Clarifications</h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFAQIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="rounded-xl border border-white/5 bg-[#0B1120]/30 overflow-hidden text-left"
                >
                  <button 
                    onClick={() => setActiveFAQIndex(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center p-4 hover:bg-white/3 transition-all text-left cursor-pointer"
                  >
                    <span className="font-poppins font-bold text-xs text-white uppercase tracking-tight pr-4 flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 gold-text shrink-0" />
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 pt-1.5 border-t border-white/5 text-xs text-gray-300 leading-relaxed font-sans font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
}
