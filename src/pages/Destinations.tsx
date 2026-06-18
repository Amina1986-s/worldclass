/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import BookingForm from '../components/BookingForm';
import { 
  Compass, 
  MapPin, 
  Clock, 
  Award, 
  Search, 
  Filter, 
  DollarSign, 
  Star, 
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DestinationsProps {
  initialSelectedDestId: string | null;
  setInitialSelectedDestId: (id: string | null) => void;
}

export default function Destinations({ initialSelectedDestId, setInitialSelectedDestId }: DestinationsProps) {
  const { destinations, packages, incrementPageViews } = useApp();

  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeBookDestId, setActiveBookDestId] = useState<string>('');
  const [activeBookPkgId, setActiveBookPkgId] = useState<string>('');

  useEffect(() => {
    incrementPageViews();
    if (initialSelectedDestId) {
      setActiveBookDestId(initialSelectedDestId);
      // Clean up after reading
      setInitialSelectedDestId(null);
    }
  }, [initialSelectedDestId]);

  const continents = ['All', 'Asia', 'Europe', 'North America', 'South America', 'Africa', 'Australia'];

  // Handle filtering
  const filteredDestinations = destinations.filter((dest) => {
    const matchesContinent = selectedContinent === 'All' || dest.continent === selectedContinent;
    const matchesSearch = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.attractions.some(attr => attr.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesContinent && matchesSearch;
  });

  const handleBookTrigger = (destId: string, pkgId: string = '') => {
    setActiveBookDestId(destId);
    setActiveBookPkgId(pkgId);
    
    // Smooth scroll down to booking section
    setTimeout(() => {
      document.getElementById('booking-inquiry-section-target')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  return (
    <div className="pt-24 pb-16 space-y-16 overflow-hidden">
      
      {/* HEADER STATEMENT */}
      <section className="text-center max-w-4xl mx-auto px-6 space-y-4 pt-10">
        <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">WORLD SYMPHONY MAP</span>
        <h1 className="text-4xl sm:text-5xl font-black font-poppins text-white leading-tight uppercase">
          VIP Destination Hub Coordinates
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          Unlock absolute priority access. Review our verified collection of regional hubs and explore bespoke private packages linked to each sector.
        </p>
      </section>

      {/* FILTER & SEARCH TERMINAL */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="p-4 sm:p-5 rounded-2xl glass-panel flex flex-col md:flex-row gap-4 justify-between items-center bg-slate-900/40">
          
          {/* Continent Filters list */}
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start w-full md:w-auto">
            {continents.map((cont) => (
              <button
                key={cont}
                onClick={() => setSelectedContinent(cont)}
                className={`px-3 py-1.5 rounded-lg text-xs font-poppins font-semibold cursor-pointer transition-all ${
                  selectedContinent === cont
                    ? 'gold-bg text-[#0B1120] shadow-md font-bold'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 bg-white/5 border border-white/5'
                }`}
              >
                {cont}
              </button>
            ))}
          </div>

          {/* Search trigger box */}
          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Tokyo, temples, reef..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-secondary"
            />
          </div>

        </div>
      </section>

      {/* DESTINATIONS CATALOGUE DISPLAY */}
      <section className="max-w-7xl mx-auto px-6">
        {filteredDestinations.length === 0 ? (
          <div className="text-center py-20 border border-white/5 bg-slate-900/20 rounded-2xl space-y-4">
            <Compass className="w-12 h-12 text-gray-600 mx-auto animate-spin" />
            <h3 className="text-lg font-poppins font-bold text-gray-400 uppercase">NO COORDINATES MATCH FOUND</h3>
            <p className="text-xs text-gray-500 max-w-md mx-auto">Please refine your search string or select alternative continents above.</p>
          </div>
        ) : (
          <div className="space-y-16">
            {filteredDestinations.map((dest, index) => {
              // Find matching packages for this specific destination
              const linkedPkgs = packages.filter(p => p.destinationId === dest.id);
              
              return (
                <div 
                  key={dest.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-white/5 last:border-none ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Image Presentation */}
                  <div className={`col-span-1 lg:col-span-5 h-[340px] sm:h-[400px] rounded-2xl overflow-hidden relative border border-white/15 shadow-2xl ${
                    index % 2 === 1 ? 'lg:order-last' : ''
                  }`}>
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:scale-102 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Position parameters */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                      <div>
                        <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest block font-bold">REPUTED COORDINATE</span>
                        <span className="text-lg font-bold font-poppins text-white leading-tight uppercase font-semibold">{dest.country}</span>
                      </div>
                      <span className="px-3 py-1 bg-slate-900/85 backdrop-blur-md rounded-md border border-white/10 text-[10px] font-mono text-emerald-400 font-bold">
                        ★ {dest.rating} RATING
                      </span>
                    </div>
                  </div>

                  {/* Text Content Description */}
                  <div className="col-span-1 lg:col-span-7 space-y-5 text-left">
                    <div className="space-y-1">
                      <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">{dest.continent} BLOCK</span>
                      <h3 className="text-2xl sm:text-3xl font-extrabold font-poppins text-white uppercase">{dest.name}</h3>
                    </div>

                    <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed font-light">
                      {dest.overview}
                    </p>

                    {/* Key Attractions Grid */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Signature Heritage Attractions</span>
                      <div className="flex flex-wrap gap-2">
                        {dest.attractions.map((attr, idx) => (
                          <span key={idx} className="px-3 py-1 rounded bg-slate-900 border border-white/5 text-[11px] font-mono text-gray-400">
                            ❖ {attr}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Meta info boxes: Best season, Price metrics */}
                    <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-white/5 bg-slate-900/50">
                      <div>
                        <span className="text-[9px] font-mono text-gray-500 block">OPTIMAL SEASON RADAR</span>
                        <span className="text-xs text-white font-semibold flex items-center gap-1 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                          {dest.bestTimeToVisit.split(' (')[0]}
                        </span>
                      </div>
                      <div>
                        <span className="text-[9px] font-mono text-gray-500 block">EST. PRIVATE BUDGET BASE</span>
                        <span className="text-xs text-brand-accent font-mono font-bold flex items-center gap-1 mt-0.5">
                          <DollarSign className="w-3.5 h-3.5 text-brand-accent shrink-0" />
                          ${dest.avgCost.toLocaleString()} USD / Person
                        </span>
                      </div>
                    </div>

                    {/* Highlight linked packages */}
                    {linkedPkgs.length > 0 ? (
                      <div className="space-y-2.5">
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block">Linked Travel Packages ({linkedPkgs.length})</span>
                        <div className="space-y-2">
                          {linkedPkgs.map(pkg => (
                            <div key={pkg.id} className="p-3 bg-slate-900/30 hover:bg-slate-900/70 border border-white/5 rounded-xl flex justify-between items-center text-xs transition-colors">
                              <div className="space-y-0.5 pr-2">
                                <span className="font-poppins font-medium text-white block truncate">{pkg.title}</span>
                                <span className="text-[10px] font-mono text-gray-400">{pkg.duration} • <span className="text-emerald-400">★ {pkg.rating}</span></span>
                              </div>
                              <button
                                onClick={() => handleBookTrigger(dest.id, pkg.id)}
                                className="px-4 py-1.5 gold-bg text-[#0B1120] text-[10px] uppercase font-mono tracking-wider font-bold rounded cursor-pointer shrink-0 hover:brightness-110 transition-all"
                              >
                                Select & Book
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="pt-2">
                        <button
                          onClick={() => handleBookTrigger(dest.id)}
                          className="px-5 py-2.5 gold-bg text-[#0B1120] text-xs font-poppins font-bold uppercase tracking-wider rounded-lg flex items-center gap-1.5 cursor-pointer hover:brightness-110 shadow-lg shadow-amber-500/10 transition-all"
                        >
                          <span>Design Custom coordinates Tour</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                  </div>

                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* 4. ACTIVE RESERVATION INTAKE STATION */}
      <section className="bg-slate-950/40 py-20 border-t border-white/5" id="booking-inquiry-section-target">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 space-y-6 text-left">
            <span className="text-xs font-mono text-brand-accent tracking-widest uppercase block animate-pulse">◆ LUXURY CONCIERGE TERMINAL ◆</span>
            <h2 className="text-4xl font-extrabold font-poppins text-white uppercase tracking-tight leading-tight">
              A Private Pathfinder Is Waiting For Your Instructions
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed font-sans font-light">
              Choose your travel coordinates inside the adjacent form. Our 24/7 travel designers orchestrate high-speed Shinkansens booking, over-water bungalows reservation and priority airport terminals clearance.
            </p>

            <div className="p-4 rounded-xl border border-emerald-500/10 bg-emerald-500/5 text-[11px] font-sans text-gray-300 leading-relaxed max-w-sm flex gap-3">
              <Sparkles className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="block text-white font-bold uppercase mb-0.5">ESTATE MEMBER PERK</span>
                Your request qualifies you for standard premium lounge upgrades and complete visa counseling credits at no cost.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* The interactive multi-step booking module */}
            <BookingForm 
              initialDestinationId={activeBookDestId} 
              initialPackageId={activeBookPkgId} 
              key={activeBookDestId + '-' + activeBookPkgId} // force render recycle on change
            />
          </div>

        </div>
      </section>

    </div>
  );
}
