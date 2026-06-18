/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Target, Compass, Sparkles, Milestone, Award, Users, ShieldAlert, Globe } from 'lucide-react';
import { motion } from 'motion/react';

export default function About() {
  const { cmsText, incrementPageViews } = useApp();

  useEffect(() => {
    incrementPageViews();
  }, []);

  const historyMilestones = [
    { year: '2012', title: 'The Private Register Yacht Log', desc: 'WORLDCLASS was established in Monaco by a small council of five pathfinders managing boutique transfers for mega yachts.' },
    { year: '2016', title: 'Bespoke Aviation Chartering', desc: 'Launched direct legal treaties with elite private jet fleets, offering integrated luxury private flight routes.' },
    { year: '2020', title: 'Savannah Sanctuary Sponsorship', desc: 'Pioneered zero-emission African safaris, directly buying and sponsoring wide conservation areas in Tanzania.' },
    { year: '2026', title: 'Comprehensive Global Expansion', desc: 'Orchestrating white-glove luxury logistics for over twelve thousand elite voyagers globally with five offices.' }
  ];

  const values = [
    { title: 'Absolute Discretion', icon: ShieldAlert, desc: 'Your reservation files, travel schedules, and banking credentials are kept in highly secured, cryptographically isolated registries.' },
    { title: 'Architectural Hospitality', icon: Sparkles, desc: 'We only align our bookings with celebrated properties featuring dedicated butler tiers, pre-configured climates, and strict quality assurance.' },
    { title: 'Conservation Alliances', icon: Target, desc: '10% of our annual profit margins directly fund marine sanctuary restorations in Queensland and anti-poaching operations in Serengeti.' },
    { title: 'Bespoke Sovereignty', icon: Compass, desc: 'Every itinerary is custom designed from scratch. No cookie-cutter packages, no crowded tourist columns, only absolute pathfinding freedom.' }
  ];

  const executiveTeam = [
    { name: 'Elena Rostova', role: 'Chief Executive Voyager', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400', bio: 'Former advisor for sovereign wealth travels, Elena orchestrates our global diplomatic relationships across six continents.' },
    { name: 'Dr. Alistair Sterling', role: 'Chief Curator of Heritage', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400', bio: 'With a PhD in Archeology from Oxford University, Alistair coordinates our private clearances into global heritage ruins.' },
    { name: 'Katarina Vance', role: 'West Mediterranean Specialist', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400', bio: 'Spends her time auditing high-end resorts and sailing yachts in Nice and Capri to ensure absolute quality control.' }
  ];

  return (
    <div className="pt-24 pb-16 space-y-20 overflow-hidden">
      
      {/* HEADER HERO */}
      <section className="text-center max-w-4xl mx-auto px-6 space-y-4 pt-10">
        <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block animate-pulse">Our Heritage Chronos</span>
        <h1 className="text-4xl sm:text-5xl font-black font-poppins text-white leading-tight uppercase">
          STYLE OVER COPIES, EXPERIENCE ABOVE SIGHTSEEING
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          We operate are premium global travel concierge designed strictly for explorers who view travel not as a checklist, but as an elegant, highly personalized art block.
        </p>
      </section>

      {/* MISSION & VISION */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl glass-panel relative overflow-hidden space-y-4 text-left border border-white/5 bg-slate-900/40">
          <div className="absolute right-6 top-8 text-brand-secondary/15"><Compass className="w-16 h-16" /></div>
          <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block">CONCIERGE CORE</span>
          <h2 className="text-2xl font-bold font-poppins text-white uppercase">The Agency Mission</h2>
          <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
            {cmsText.aboutMission}
          </p>
          <div className="border-t border-white/5 pt-4 flex items-center gap-2 text-[10px] font-mono text-gray-500 font-semibold">
            <Globe className="w-4 h-4 text-brand-secondary" />
            <span>ESTABLISHED WORLD CLASS RECONCILIATIONS</span>
          </div>
        </div>

        <div className="p-8 rounded-2xl glass-panel relative overflow-hidden space-y-4 text-left border border-white/5 bg-slate-900/40">
          <div className="absolute right-6 top-8 text-brand-accent/15"><Target className="w-16 h-16" /></div>
          <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase block">SOCIETAL HORIZONS</span>
          <h2 className="text-2xl font-bold font-poppins text-white uppercase">The Agency Vision</h2>
          <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
            {cmsText.aboutVision}
          </p>
          <div className="border-t border-white/5 pt-4 flex items-center gap-2 text-[10px] font-mono text-gray-500 font-semibold">
            <Award className="w-4 h-4 text-brand-accent" />
            <span>CLIMATE NEUTRAL AVIATION REINTEGRATIONS</span>
          </div>
        </div>
      </section>

      {/* VALUES BENCHES */}
      <section className="max-w-7xl mx-auto px-6 space-y-8 text-center">
        <div className="space-y-2">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">THE WORLDCLASS SEAL</span>
          <h2 className="text-3xl font-extrabold font-poppins text-white uppercase">The Code We Preserve</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => {
            const IconComp = v.icon;
            return (
              <div key={i} className="p-6 rounded-2xl border border-white/5 bg-slate-900/50 hover:border-brand-secondary/25 transition-all text-left space-y-4 shadow-xl">
                <div className="w-11 h-11 rounded-xl bg-slate-950 border border-white/10 flex items-center justify-center text-brand-secondary shrink-0">
                  <IconComp className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-poppins font-bold text-sm text-white uppercase">{v.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* COMPANY HISTORY VERTICAL TIMELINE */}
      <section className="bg-slate-950/40 py-20 border-y border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6 space-y-12 text-center relative z-10">
          <div className="space-y-2">
            <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">TIMELINE CHRONOLOGY</span>
            <h2 className="text-3xl font-extrabold font-poppins text-white uppercase">Our Evolution Pathway</h2>
            <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              {cmsText.aboutHistory}
            </p>
          </div>

          <div className="relative border-l border-white/10 text-left pl-6 sm:pl-10 space-y-10 max-w-2xl mx-auto">
            {historyMilestones.map((mil, idx) => (
              <div key={idx} className="relative group space-y-1.5">
                {/* Dot index identifier */}
                <div className="absolute -left-[30px] sm:-left-[46px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-brand-secondary group-hover:scale-125 transition-all outline outline-slate-900" />
                <span className="text-xs font-mono text-brand-accent font-bold tracking-widest block">{mil.year}</span>
                <h3 className="font-poppins font-bold text-sm text-white uppercase tracking-tight group-hover:text-brand-secondary transition-colors">
                  {mil.title}
                </h3>
                <p className="text-xs text-gray-400 font-sans tracking-wide leading-relaxed font-light">
                  {mil.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXECUTIVE TEAM MEMBERS */}
      <section className="max-w-7xl mx-auto px-6 space-y-10 text-center">
        <div className="space-y-2">
          <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block">MEET THE COUNCIL</span>
          <h2 className="text-3xl font-extrabold font-poppins text-white uppercase">Travel Designers & Historians</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {executiveTeam.map((member, idx) => (
            <div key={idx} className="rounded-2xl border border-white/5 bg-slate-900/40 overflow-hidden text-left hover:border-white/10 transition-all flex flex-col group shadow-lg">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src={member.image} 
                  alt={member.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <h4 className="font-poppins font-extrabold text-sm text-white">{member.name}</h4>
                  <span className="text-[10px] font-mono text-brand-accent uppercase tracking-widest font-semibold">{member.role}</span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <p className="text-xs text-gray-400 leading-relaxed font-sans font-light">
                  {member.bio}
                </p>
                <div className="pt-4 border-t border-white/5 mt-4 flex justify-between items-center text-[10px] font-mono text-gray-500 uppercase tracking-widest font-bold">
                  <span>WORLDCLASS DELEGATE</span>
                  <span className="text-[#3b82f6] group-hover:underline cursor-pointer">View Dossier</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GLOBAL EXPERTISE & PARTNERSHIPS */}
      <section className="max-w-7xl mx-auto px-6 pt-10">
        <div className="p-8 rounded-2xl glass-panel text-center space-y-6">
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Our Global Alliance Tier Network</span>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-35 hover:opacity-50 transition-all duration-300">
            <span className="font-poppins font-extrabold text-lg text-white tracking-widest">A MAN HOTELS</span>
            <span className="font-mono text-sm tracking-widest font-semibold text-white">MANDARIN ORIENTAL</span>
            <span className="font-serif italic text-lg text-white">The Ritz-Carlton</span>
            <span className="font-sans font-black text-sm tracking-widest text-white">SINGITA SAFARIS</span>
            <span className="font-serif font-extrabold text-base text-white">FOUR SEASONS</span>
          </div>
          <p className="text-[10px] text-gray-500 font-mono tracking-widest pt-2">
            DIRECT GDS CHANNELS INTEGRATED WITH 180+ ELITE HOSPITALITY BRANDING
          </p>
        </div>
      </section>

    </div>
  );
}
