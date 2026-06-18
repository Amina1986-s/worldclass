/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Globe3D from '../components/Globe3D';
import BookingForm from '../components/BookingForm';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Star, 
  TrendingUp, 
  UserCheck, 
  Award, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight,
  PlaneTakeoff,
  Luggage,
  SlidersHorizontal
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HomeProps {
  setPage: (page: string) => void;
  setSelectedDestId: (id: string | null) => void;
}

export default function Home({ setPage, setSelectedDestId }: HomeProps) {
  const { 
    destinations, 
    packages, 
    blogPosts, 
    testimonials, 
    cmsText, 
    stats, 
    theme,
    incrementPageViews
  } = useApp();

  const [activeTab, setActiveTab] = useState<'Domestic' | 'International' | 'Luxury'>('International');
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Search input triggers
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetFilter, setBudgetFilter] = useState('');
  const [activeTestimonial, setActiveTestimonial] = useState(testimonials[0] || null);

  useEffect(() => {
    // Record page view on entrance
    incrementPageViews();
  }, []);

  // Update active testimonial safely
  useEffect(() => {
    if (testimonials.length > 0) {
      setActiveTestimonial(testimonials[testimonialIndex] || testimonials[0]);
    }
  }, [testimonialIndex, testimonials]);

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Filter packages based on active category
  const filteredPackages = packages.filter(p => p.category === activeTab);

  // Apply button rounding style from custom theme
  const getBtnRounded = () => {
    if (theme.buttonStyle === 'rounded-none') return 'rounded-none';
    if (theme.buttonStyle === 'rounded-full') return 'rounded-full';
    return 'rounded-lg';
  };

  const handleExploreDest = (id: string) => {
    setSelectedDestId(id);
    setPage('destinations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchTrigger = (e: React.FormEvent) => {
    e.preventDefault();
    setPage('destinations');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-24 pb-12 overflow-hidden">
      
      {/* 1. HERO SECTION WITH 3D GLOBE */}
      <section className="relative min-h-screen pt-28 pb-12 flex items-center justify-center ocean-gradient">
        {/* Orbit decoration bg matching the theme's SVG/dashed rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-20 z-0 hidden lg:block">
          <div className="absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_60s_linear_infinite]"></div>
          <div className="absolute inset-10 rounded-full border border-dashed border-[#3B82F6]/20 animate-[spin_40s_linear_infinite_reverse]"></div>
          <div className="absolute inset-20 rounded-full bg-gradient-to-tr from-[#0A2540] to-[#3B82F6] blur-3xl opacity-30"></div>
          <svg viewBox="0 0 200 200" className="w-full h-full text-white/5">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M20 100 Q 100 20 180 100" fill="none" stroke="#FBBF24" strokeWidth="1" opacity="0.4"/>
            <path d="M20 100 Q 100 180 180 100" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.4"/>
          </svg>
        </div>

        {/* Animated Gradient Mesh backdrop */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-blue-900/10 filter blur-[120px] mesh-blob-1 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-emerald-900/5 filter blur-[100px] mesh-blob-2 pointer-events-none" />

        {/* Dynamic Starfield Overlay */}
        {theme.enableStarfield && (
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/5 via-slate-950/20 to-slate-950 pointer-events-none opacity-40" />
        )}

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
          {/* Hero Left Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border-white/10 text-xs font-semibold mb-2">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="gold-text tracking-widest font-mono text-[9px] font-bold uppercase">GLOBAL TRAVEL ACCESS OPEN</span>
            </div>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-black tracking-tight text-white font-poppins leading-[1.05] uppercase">
              {cmsText.heroTitle}
            </h1>

            <p className="text-sm sm:text-base text-white/60 font-sans max-w-2xl leading-relaxed font-light">
              {cmsText.heroSubtitle}
            </p>

            {/* Quick Hero Search Engine bar */}
            <form onSubmit={handleSearchTrigger} className="p-2 sm:p-2.5 glass border-white/10 rounded-2xl flex flex-col sm:flex-row gap-2 max-w-xl hover:border-amber-400/25 transition-all shadow-2xl">
              <div className="flex-1 flex items-center gap-2 px-3">
                <MapPin className="w-4 h-4 gold-text shrink-0" />
                <input 
                  type="text" 
                  placeholder="Where would you like to escape?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-none text-xs text-white focus:outline-none placeholder-white/20"
                />
              </div>
              
              <div className="flex items-center gap-2 px-3 border-t sm:border-t-0 sm:border-l border-white/10 py-1.5 sm:py-0">
                <SlidersHorizontal className="w-3.5 h-3.5 gold-text shrink-0" />
                <select 
                  value={budgetFilter}
                  onChange={(e) => setBudgetFilter(e.target.value)}
                  className="bg-transparent text-xs text-white/75 focus:outline-none p-1 shrink-0 select-none cursor-pointer outline-none"
                >
                  <option value="" className="bg-[#0b1120] text-gray-300">Any Budget</option>
                  <option value="luxury" className="bg-[#0b1120] text-gray-300">Luxury Tier</option>
                  <option value="mid" className="bg-[#0b1120] text-gray-300">Executive Tier</option>
                </select>
              </div>

              <button 
                type="submit" 
                className={`px-5 py-3 gold-bg text-[#0B1120] hover:brightness-110 font-poppins font-semibold text-xs text-[#0B1120] uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer transition-all shadow-lg ${getBtnRounded()}`}
              >
                <span>Navigate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Floating Tags */}
            <div className="flex flex-wrap gap-2.5 pt-2 text-[10px] font-mono text-white/40 tracking-wider">
              <span>FEATURED ESCAPES:</span>
              <button type="button" onClick={() => handleExploreDest('dest-tokyo')} className="text-white/60 hover:text-amber-400 transition-colors underline cursor-pointer uppercase font-semibold">TOKYO imperial</button>
              <span>•</span>
              <button type="button" onClick={() => handleExploreDest('dest-swiss-alps')} className="text-white/60 hover:text-amber-400 transition-colors underline cursor-pointer uppercase font-semibold">SWISS peaks</button>
              <span>•</span>
              <button type="button" onClick={() => handleExploreDest('dest-serengeti')} className="text-white/60 hover:text-amber-400 transition-colors underline cursor-pointer uppercase font-semibold">SERENGETI wild</button>
            </div>
          </div>

          {/* Hero Right Globe Canvas */}
          <div className="lg:col-span-5 flex items-center justify-center relative">
            <div className="w-full max-w-[420px] relative">
              {/* Radial background glare */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-secondary/10 to-emerald-500/5 rounded-full filter blur-[50px] -z-10" />
              <Globe3D />
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="p-8 rounded-2xl glass-panel relative overflow-hidden grid grid-cols-2 lg:grid-cols-4 gap-8 text-center bg-gradient-to-r from-slate-900/50 to-slate-950/65">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-brand-secondary" />
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-extrabold font-poppins text-white tracking-tight">12K+</div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">VIP VOYAGERS SERVED</div>
          </div>
          <div className="space-y-1 border-l border-white/5">
            <div className="text-3xl sm:text-4xl font-extrabold font-poppins text-white tracking-tight">180+</div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">COORDS EXCURSIONS</div>
          </div>
          <div className="space-y-1 border-l border-white/5">
            <div className="text-3xl sm:text-4xl font-extrabold font-poppins text-brand-accent tracking-tight">99.8%</div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">SATISFACTION SCORE</div>
          </div>
          <div className="space-y-1 border-l border-white/5">
            <div className="text-3xl sm:text-4xl font-extrabold font-poppins text-white tracking-tight">
              {stats.pageViews > 0 ? `${(stats.pageViews / 1000).toFixed(1)}k` : '45.9k'}
            </div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">PORTAL VIEW SESSIONS</div>
          </div>
        </div>
      </section>

      {/* 3. POPULAR DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">THE WORLD CATALOGUE</span>
            <h2 className="text-3xl font-extrabold font-poppins text-white leading-tight uppercase">Featured Hub Coordinates</h2>
          </div>
          <button 
            onClick={() => {
              setPage('destinations');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-1.5 text-xs font-poppins font-semibold text-brand-secondary hover:text-blue-400 transition-colors cursor-pointer"
          >
            <span>DISCOVER ALL CONTINENTS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Destination bento/card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 3).map((dest) => (
            <div 
              key={dest.id}
              onClick={() => handleExploreDest(dest.id)}
              className="group relative h-[380px] rounded-2xl overflow-hidden shadow-2xl cursor-pointer border border-white/5 hover:border-white/15 transition-all text-left"
            >
              {/* Cover Image */}
              <img 
                src={dest.image} 
                alt={dest.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/35 to-transparent opacity-90" />
              <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/0 transition-colors" />

              {/* Tag Badges */}
              <div className="absolute top-4 left-4 flex gap-1.5">
                <span className="px-2.5 py-1 rounded bg-slate-900/85 backdrop-blur-md text-[10px] font-mono text-brand-accent uppercase tracking-widest font-semibold border border-white/5">
                  {dest.continent}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900/85 backdrop-blur-md text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold border border-white/5">
                  ★ {dest.rating}
                </span>
              </div>

              {/* Card Content Footer */}
              <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2.5">
                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">{dest.country}</span>
                <h3 className="text-xl font-bold font-poppins text-white">{dest.name}</h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed font-light line-clamp-2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {dest.overview}
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-white/5">
                  <div className="font-mono text-xs text-gray-400">
                    Est. Cost: <span className="text-brand-accent font-semibold">${dest.avgCost.toLocaleString()}</span>
                  </div>
                  <span className="text-[10px] font-poppins font-bold text-white uppercase tracking-widest bg-brand-secondary/20 px-3 py-1 rounded border border-brand-secondary/30 flex items-center gap-1 group-hover:bg-brand-secondary transition-colors">
                    Explore <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. WHY CHOOSE WORLDCLASS */}
      <section className="relative bg-slate-950/40 py-16 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-4 space-y-4 text-left">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase shrink-0">Bespoke Framework</span>
            <h2 className="text-3xl font-extrabold font-poppins text-white uppercase tracking-tight leading-tight">
              Why Cruising WIth WORLDCLASS Counts
            </h2>
            <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
              We design itineraries completely insulated from generic mass tourism packages. Discover true global luxury managed by transcontinental pathfinders.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => {
                  setPage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-5 py-2.5 bg-slate-900 border border-white/10 hover:border-brand-secondary text-[11px] font-mono uppercase tracking-widest text-white cursor-pointer transition-all ${getBtnRounded()}`}
              >
                Inspect Credentials
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Box 1 */}
            <div className="p-5 rounded-xl border border-white/5 bg-slate-900/40 space-y-3 hover:border-brand-secondary/20 transition-all text-left">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-brand-secondary shrink-0">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="font-poppins font-bold text-sm text-white">Direct Diplomatic Access</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Enjoy fast-track visa certification and priority VIP gateways globally. Skip custom checkpoint delays instantly.
              </p>
            </div>

            {/* Box 2 */}
            <div className="p-5 rounded-xl border border-white/5 bg-slate-900/40 space-y-3 hover:border-emerald-500/20 transition-all text-left">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="font-poppins font-bold text-sm text-white">24/7 Dedicated Concierge</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connect directly with a dedicated travel professional on call at any hour for immediate itinerary alterations.
              </p>
            </div>

            {/* Box 3 */}
            <div className="p-5 rounded-xl border border-white/5 bg-slate-900/40 space-y-3 hover:border-amber-500/20 transition-all text-left">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-brand-accent shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-poppins font-bold text-sm text-white">Elite 5-Star Partnerships</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Secure standard late checkouts, VIP room upgrades, and local dining credits at celebrated Mandarin and Aman retreats.
              </p>
            </div>

            {/* Box 4 */}
            <div className="p-5 rounded-xl border border-white/5 bg-slate-900/40 space-y-3 hover:border-indigo-500/20 transition-all text-left">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-poppins font-bold text-sm text-white">Secure Asset Protection</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Every booking processes through verified insurance modules guaranteeing trip cancellation recovery and zero deductible.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CURATED TRAVEL PACKAGES (TABS) */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">SELECTED EXPLORATIONS</span>
          <h2 className="text-3xl font-extrabold font-poppins text-white uppercase">The Curated Package Collections</h2>
          <div className="flex justify-center gap-1 p-1 bg-slate-900/80 border border-white/10 rounded-xl max-w-sm mx-auto">
            {(['Domestic', 'International', 'Luxury'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`flex-1 py-1.5 text-xs font-poppins font-bold rounded-lg cursor-pointer transition-all ${
                  activeTab === cat 
                    ? 'bg-brand-secondary text-white shadow-md' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Cards list */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPackages.map((pkg) => {
              const dest = destinations.find(d => d.id === pkg.destinationId);
              return (
                <motion.div
                  layout
                  key={pkg.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35 }}
                  className="rounded-2xl border border-white/5 bg-slate-900/50 overflow-hidden hover:border-white/15 transition-all flex flex-col shadow-xl text-left"
                >
                  <div className="h-48 relative overflow-hidden shrink-0">
                    <img 
                      src={pkg.image} 
                      alt={pkg.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-brand-accent px-2 py-1 rounded font-bold uppercase tracking-widest">
                      {pkg.duration}
                    </div>
                    {pkg.originalPrice && (
                      <div className="absolute top-3 right-3 bg-red-500/10 border border-red-500/30 text-[10px] font-mono text-red-400 px-2.5 py-0.5 rounded font-bold uppercase tracking-widest">
                        PROMO RATE
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-mono text-gray-500">
                        <span>{dest?.name.split('&')[0] || 'Worldwide'}</span>
                        <span className="text-emerald-400 flex items-center gap-0.5">★ {pkg.rating} ({pkg.reviewsCount} reviews)</span>
                      </div>
                      <h3 className="font-poppins font-bold text-sm text-white line-clamp-2 leading-relaxed">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-gray-400 leading-relaxed line-clamp-3 font-light font-sans">
                        {pkg.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-3 border-t border-white/5">
                      {/* Inclusion tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {pkg.inclusionTags.map((tag, i) => (
                          <span key={i} className="text-[9px] font-mono bg-white/5 border border-white/5 text-gray-400 px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-end pb-1 pt-1">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 block -mb-0.5">EST. VOYAGER RATE</span>
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-base font-extrabold font-poppins text-white">${pkg.price.toLocaleString()}</span>
                            {pkg.originalPrice && (
                              <span className="text-xs text-gray-500 line-through">${pkg.originalPrice.toLocaleString()}</span>
                            )}
                            <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">/ pp</span>
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            setSelectedDestId(pkg.destinationId);
                            setPage('destinations');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setTimeout(() => {
                              document.getElementById('booking-inquiry-section-target')?.scrollIntoView({ behavior: 'smooth' });
                            }, 200);
                          }}
                          className={`px-4 py-2 bg-brand-secondary hover:bg-blue-600 font-poppins font-semibold text-[10px] uppercase tracking-widest text-white shadow-md cursor-pointer transition-colors ${getBtnRounded()}`}
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. TESTIMONIALS SLIDER */}
      <section className="bg-slate-950/40 py-20 border-y border-white/5 relative">
        <div className="absolute top-1/2 left-4 w-72 h-72 rounded-full bg-blue-500/5 blur-3xl -translate-y-1/2" />
        <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">TESTIMONIAL STORIES</span>
            <h2 className="text-3xl font-extrabold font-poppins text-white uppercase tracking-tight">Standard Executive Peer Feedback</h2>
          </div>

          <div className="glass-panel p-8 sm:p-12 rounded-3xl relative min-h-[280px] flex flex-col justify-between text-left">
            <div className="text-right text-brand-accent text-5xl font-serif leading-none absolute top-4 right-8 pointer-events-none opacity-20">
              ”
            </div>

            <AnimatePresence mode="wait">
              {activeTestimonial && (
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <p className="text-base sm:text-lg text-gray-200 leading-relaxed italic font-sans font-light">
                    "{activeTestimonial.comment}"
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    <img 
                      src={activeTestimonial.image} 
                      alt={activeTestimonial.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-full object-cover border border-white/10"
                    />
                    <div>
                      <h4 className="font-poppins font-bold text-sm text-white">{activeTestimonial.name}</h4>
                      <p className="text-xs text-gray-400 font-mono tracking-wider uppercase mt-0.5">
                        {activeTestimonial.location} • visited <span className="text-brand-accent font-semibold">{activeTestimonial.packageVisited}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Slider arrows */}
            <div className="flex gap-2 justify-end pt-4 sm:pt-0 sm:absolute sm:bottom-12 sm:right-12">
              <button 
                onClick={handlePrevTestimonial}
                className="w-9 h-9 border border-white/10 hover:bg-white/5 rounded-lg flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={handleNextTestimonial}
                className="w-9 h-9 border border-white/10 hover:bg-white/5 rounded-lg flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. RECENT BLOG POSTS */}
      <section className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="flex justify-between items-end">
          <div className="space-y-2 text-left">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">WORLDCLASS INSIGHTS</span>
            <h2 className="text-3xl font-extrabold font-poppins text-white uppercase">The Editorial Travel Chronicles</h2>
          </div>
          <button 
            onClick={() => {
              setPage('blog');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-center gap-1.5 text-xs font-poppins font-semibold text-brand-secondary hover:text-blue-400 cursor-pointer"
          >
            <span>VIEW ALL PUBLICATIONS</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post) => (
            <div 
              key={post.id}
              onClick={() => {
                setPage('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-2xl border border-white/5 bg-slate-900/40 p-4 hover:border-brand-secondary/20 transition-all flex flex-col group cursor-pointer text-left"
            >
              <div className="h-44 rounded-xl overflow-hidden mb-4 shrink-0 relative">
                <img 
                  src={post.image} 
                  alt={post.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 bg-brand-primary/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-brand-secondary px-2 py-0.5 rounded uppercase font-bold tracking-wider">
                  {post.category}
                </span>
              </div>
              <div className="space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono text-gray-500">{post.date} • {post.readTime}</span>
                  <h3 className="font-poppins font-bold text-sm text-white line-clamp-2 leading-relaxed mt-1 group-hover:text-brand-secondary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3 font-light mt-1.5">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/5 mt-4 text-[11px] font-mono text-gray-500 font-semibold uppercase">
                  <span>Editor: {post.author.split(' ')[0]}</span>
                  <span className="text-brand-secondary group-hover:translate-x-1.5 transition-transform flex items-center gap-0.5">
                    Read Article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. EMBEDDED CONCIERGE & NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-6" id="booking-portal-trigger-dest">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">DIRECT BOOKING GATEWAY</span>
            <h2 className="text-4xl font-extrabold font-poppins text-white uppercase tracking-tight leading-[1.15]">
              Let Our Master Travel Pathfinders Style Your Expedition
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-sans font-light">
              Submit your desired parameters into our reservation interface. Within 12 business hours, your assigned private concierge will follow up directly on secure channels with custom coordinates and flight options.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 bg-slate-900/50 rounded-xl border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-yellow-500/10 flex items-center justify-center text-brand-accent">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-poppins font-bold">Unmapped Excursions Cataloged</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Explore historic castles, private islands, and national parks in seclusion.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-900/50 rounded-xl border border-white/5">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                  <Luggage className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white font-poppins font-bold">Comprehensive Visa Handling</h4>
                  <p className="text-xs text-gray-400 mt-0.5">Skip embassies queues completely. We handle legal ingress parameters globally.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            {/* Embedded MultiStep Form component */}
            <BookingForm />
          </div>

        </div>
      </section>

    </div>
  );
}
