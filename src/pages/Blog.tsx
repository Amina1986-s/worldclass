/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, 
  User, 
  Calendar, 
  Clock, 
  Share2, 
  Linkedin, 
  Facebook, 
  Twitter, 
  ArrowLeft,
  ChevronRight,
  BookOpen,
  CheckCircle,
  Hash
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Blog() {
  const { blogPosts, incrementPageViews } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  useEffect(() => {
    incrementPageViews();
  }, []);

  const categories = useMemo(() => {
    const list = new Set<string>();
    list.add('All');
    blogPosts.forEach(b => { if (b.status === 'Published') list.add(b.category); });
    return Array.from(list);
  }, [blogPosts]);

  const tagsList = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(b => b.tags.forEach(t => tags.add(t)));
    return Array.from(tags).slice(0, 10);
  }, [blogPosts]);

  // Filter blog posts based on status "Published"
  const publishedPosts = useMemo(() => {
    return blogPosts.filter(b => b.status === "Published");
  }, [blogPosts]);

  // Identify featured article
  const featuredPost = useMemo(() => {
    return publishedPosts.find(b => b.isFeatured) || publishedPosts[0];
  }, [publishedPosts]);

  // Process filters
  const filteredPosts = useMemo(() => {
    return publishedPosts.filter((post) => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [publishedPosts, activeCategory, searchQuery]);

  const activePostData = useMemo(() => {
    return blogPosts.find(b => b.id === activePostId) || null;
  }, [blogPosts, activePostId]);

  const handleShareTrigger = (platform: string, postTitle: string) => {
    setShareSuccess(true);
    setTimeout(() => setShareSuccess(false), 3000);
  };

  return (
    <div className="pt-24 pb-16 space-y-16 overflow-hidden">
      
      {/* HEADER HERO */}
      <section className="text-center max-w-4xl mx-auto px-6 space-y-4 pt-10">
        <span className="text-xs font-mono text-brand-secondary tracking-widest uppercase block animate-pulse">Voyager Insights Column</span>
        <h1 className="text-4xl sm:text-5xl font-black font-poppins text-white leading-tight uppercase">
          WorldClass Editorial Chronicles
        </h1>
        <p className="text-sm text-gray-400 font-sans max-w-2xl mx-auto leading-relaxed font-light">
          Delve behind popular sights with cultural insights, secret coordinates timelines, Ryokan etiquettes guides, and wildlife conservation details curated by our regional historians.
        </p>
      </section>

      {/* FEATURED BANNER COMPONENT */}
      {!searchQuery && activeCategory === 'All' && featuredPost && (
        <section className="max-w-7xl mx-auto px-6">
          <div 
            onClick={() => setActivePostId(featuredPost.id)}
            className="rounded-2xl border border-white/5 bg-slate-900/40 p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center cursor-pointer hover:border-brand-secondary/25 hover:bg-slate-900/60 transition-all shadow-2xl relative overflow-hidden text-left group"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-brand-secondary/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="lg:col-span-6 h-64 sm:h-80 rounded-xl overflow-hidden relative border border-white/10 shrink-0">
              <img 
                src={featuredPost.image} 
                alt={featuredPost.title} 
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-brand-primary/95 border border-white/10 text-[10px] font-mono font-bold text-brand-secondary px-3 py-1 rounded uppercase tracking-wider">
                FEATURED COLUMN
              </span>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="flex items-center gap-3 text-[10px] font-mono text-gray-500">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-gray-400">{featuredPost.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {featuredPost.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-poppins font-extrabold text-white leading-tight group-hover:text-brand-secondary transition-colors uppercase">
                {featuredPost.title}
              </h2>

              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-sans font-light">
                {featuredPost.excerpt}
              </p>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs">
                  <div className="w-8 h-8 rounded-full bg-brand-secondary/10 border border-brand-secondary/20 flex items-center justify-center font-mono font-bold text-brand-secondary text-[11px]">
                    {featuredPost.author.charAt(0)}
                  </div>
                  <div>
                    <span className="block text-white font-semibold">{featuredPost.author}</span>
                    <span className="block text-[9px] text-gray-500 font-mono uppercase">{featuredPost.authorRole}</span>
                  </div>
                </div>

                <span className="text-xs font-mono text-brand-secondary font-semibold group-hover:translate-x-1.5 transition-all flex items-center gap-1 uppercase">
                  Open Dossier <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* FILTER & CORE SEARCH */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="p-4 rounded-xl border border-white/5 bg-slate-900/30 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-1.5 justify-center md:justify-start w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-poppins font-semibold cursor-pointer transition-all ${
                  activeCategory === cat
                    ? 'bg-brand-secondary text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72 shrink-0">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Filter topics or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-brand-secondary"
            />
          </div>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Core items columns */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {filteredPosts.length === 0 ? (
            <div className="md:col-span-2 text-center py-20 border border-white/5 bg-slate-900/20 rounded-2xl space-y-3">
              <BookOpen className="w-10 h-10 text-gray-600 mx-auto" />
              <h3 className="font-poppins font-bold text-gray-400 uppercase">No Articles Found</h3>
              <p className="text-xs text-gray-500">Refine search string parameters or select a different category option.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setActivePostId(post.id)}
                className="p-4 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-brand-secondary/25 hover:bg-slate-900/60 duration-300 transition-all cursor-pointer flex flex-col group shadow-md"
              >
                <div className="h-44 rounded-xl overflow-hidden relative shrink-0">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-white/10 text-[9px] font-mono text-brand-secondary px-2 py-0.5 rounded font-bold uppercase">
                    {post.category}
                  </span>
                </div>
                
                <div className="pt-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-mono text-gray-500 block mb-1">{post.date} • {post.readTime}</span>
                    <h3 className="font-poppins font-bold text-sm text-white line-clamp-2 leading-relaxed group-hover:text-brand-secondary transition-colors duration-300 uppercase">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans line-clamp-3 font-light">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <span className="text-[10px] font-mono text-gray-500 font-bold uppercase tracking-wider">Editor: {post.author.split(' ')[0]}</span>
                    <span className="text-[11px] font-mono text-brand-secondary flex items-center gap-0.5 font-bold group-hover:translate-x-1 duration-300 uppercase">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 space-y-4">
            <h4 className="font-mono text-[10px] font-semibold text-brand-secondary uppercase tracking-widest border-b border-white/5 pb-2">CATEGORICAL INDEX</h4>
            <div className="space-y-1 text-xs">
              {categories.map(c => {
                const count = c === 'All' ? publishedPosts.length : publishedPosts.filter(p => p.category === c).length;
                return (
                  <button 
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className="w-full flex justify-between py-1 px-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-white transition-all text-left cursor-pointer"
                  >
                    <span>{c}</span>
                    <span className="font-mono text-[10px] text-gray-500 bg-slate-900 px-1.5 rounded">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/30 space-y-4">
            <h4 className="font-mono text-[10px] font-semibold text-brand-secondary uppercase tracking-widest border-b border-white/5 pb-2">SUGGESTED TAG CLOUD</h4>
            <div className="flex flex-wrap gap-1.5 text-[10px] font-mono font-medium text-gray-400">
              {tagsList.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setSearchQuery(tag)}
                  className="px-2 py-1 bg-slate-950 border border-white/5 rounded-md hover:border-brand-secondary/20 hover:text-white transition-colors flex items-center gap-0.5 cursor-pointer"
                >
                  <Hash className="w-3 h-3 text-brand-secondary" />
                  <span>{tag}</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </section>

      {/* FLOATING DETAILED ARTICLE MODAL DRAWER */}
      <AnimatePresence>
        {activePostId && activePostData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay background */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePostId(null)}
              className="absolute inset-0 bg-slate-950"
            />

            {/* Core Drawer container */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 30 }}
              className="w-full max-w-3xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl relative z-10 text-left overflow-hidden flex flex-col max-h-[85vh]"
            >
              <div className="h-60 sm:h-72 w-full relative shrink-0">
                <img 
                  src={activePostData.image} 
                  alt={activePostData.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                
                {/* Close Button overlay */}
                <button 
                  onClick={() => setActivePostId(null)}
                  className="absolute top-4 right-4 bg-slate-950/80 border border-white/10 p-2 rounded-full hover:bg-slate-950 hover:border-white/20 transition-all text-white cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <div className="absolute bottom-4 left-6 right-6">
                  <span className="px-2.5 py-0.5 bg-brand-primary text-[10px] font-mono border border-white/10 rounded text-brand-secondary uppercase font-bold tracking-widest mb-2 inline-block">
                    {activePostData.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-poppins font-black text-white uppercase tracking-tight leading-tight">
                    {activePostData.title}
                  </h2>
                </div>
              </div>

              {/* Core Content area */}
              <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
                
                <div className="flex flex-wrap gap-4 justify-between items-center bg-slate-950/40 p-3 rounded-lg border border-white/5 text-xs text-gray-400">
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-brand-secondary" />
                    <span>Post by <span className="text-white font-semibold font-sans">{activePostData.author}</span> ({activePostData.authorRole})</span>
                  </div>
                  <div className="flex gap-4 font-mono text-[10px]">
                    <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {activePostData.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {activePostData.readTime}</span>
                  </div>
                </div>

                {/* Article description text */}
                <div className="text-xs sm:text-sm font-sans font-light text-gray-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                  {activePostData.content}
                </div>

                {/* Tags mapping */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5 items-center">
                  <span className="text-[10px] font-mono text-gray-500 uppercase">Tags Index:</span>
                  {activePostData.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-950 border border-white/5 text-[9px] font-mono rounded text-gray-400 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>

                {/* Social Share bar */}
                <div className="pt-4 border-t border-white/5 flex justify-between items-center bg-white/3 p-4 rounded-xl">
                  <div className="space-y-0.5 text-left">
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest block font-bold">Encrypted Link Syndicate</span>
                    <span className="text-[9px] text-gray-500 block">Deploy secure article URL configurations.</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    {shareSuccess ? (
                      <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle className="w-4.5 h-4.5" /> Token Copied!
                      </span>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleShareTrigger('linkedin', activePostData.title)}
                          className="w-8 h-8 rounded bg-slate-950 border border-white/10 hover:bg-brand-secondary flex items-center justify-center text-white transition-colors cursor-pointer"
                        >
                          <Linkedin className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleShareTrigger('facebook', activePostData.title)}
                          className="w-8 h-8 rounded bg-slate-950 border border-white/10 hover:bg-brand-secondary flex items-center justify-center text-white transition-colors cursor-pointer"
                        >
                          <Facebook className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleShareTrigger('twitter', activePostData.title)}
                          className="w-8 h-8 rounded bg-slate-950 border border-white/10 hover:bg-brand-secondary flex items-center justify-center text-white transition-colors cursor-pointer"
                        >
                          <Twitter className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
