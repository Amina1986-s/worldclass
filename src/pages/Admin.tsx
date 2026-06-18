/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Lock, 
  Eye, 
  BarChart3, 
  BookOpen, 
  Settings, 
  Sliders, 
  FileEdit, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Globe, 
  RefreshCcw, 
  Sparkles, 
  Briefcase, 
  ListOrdered,
  Ticket,
  Palette,
  Image as ImageIcon,
  FolderOpen,
  ArrowUpRight,
  UserCheck,
  Search
} from 'lucide-react';

export default function Admin() {
  const {
    theme,
    updateTheme,
    resetTheme,
    seo,
    updateSeo,
    destinations,
    addDestination,
    editDestination,
    deleteDestination,
    packages,
    addPackage,
    editPackage,
    deletePackage,
    services,
    editService,
    blogPosts,
    addBlogPost,
    editBlogPost,
    deleteBlogPost,
    testimonials,
    addTestimonial,
    deleteTestimonial,
    bookings,
    updateBookingStatus,
    deleteBooking,
    stats,
    cmsText,
    updateCmsText,
    isAdminLoggedIn,
    setAdminLogin
  } = useApp();

  // LOGIN STATE
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  // ADMIN ACTIVE TAB
  const [activeAdminTab, setActiveAdminTab] = useState<'analytics' | 'bookings' | 'cms' | 'blog' | 'packages' | 'theme' | 'seo' | 'media'>('analytics');

  // BLOG BUILD FORM STATE
  const [newBlogTitle, setNewBlogTitle] = useState('');
  const [newBlogExcerpt, setNewBlogExcerpt] = useState('');
  const [newBlogContent, setNewBlogContent] = useState('');
  const [newBlogAuthor, setNewBlogAuthor] = useState('Elena Rostova');
  const [newBlogAuthorRole, setNewBlogAuthorRole] = useState('Chief Editor');
  const [newBlogCategory, setNewBlogCategory] = useState('Travel Guides');
  const [newBlogTags, setNewBlogTags] = useState('Europe, Summer');
  const [newBlogImage, setNewBlogImage] = useState('https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80');
  const [editingPostId, setEditingPostId] = useState<string | null>(null);

  // PACKAGES BUILD FORM STATE
  const [newPkgTitle, setNewPkgTitle] = useState('');
  const [newPkgDestId, setNewPkgDestId] = useState('');
  const [newPkgDuration, setNewPkgDuration] = useState('7 Days, 6 Nights');
  const [newPkgCategory, setNewPkgCategory] = useState<'Domestic' | 'International' | 'Luxury'>('International');
  const [newPkgPrice, setNewPkgPrice] = useState('3200');
  const [newPkgDesc, setNewPkgDesc] = useState('');
  const [newPkgImage, setNewPkgImage] = useState('https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80');
  const [editingPkgId, setEditingPkgId] = useState<string | null>(null);

  // MEDIA LIBRARY MOCK STATE
  const [mediaVault, setMediaVault] = useState([
    { name: 'tokyo_night.jpg', size: '2.4 MB', url: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=800&q=80' },
    { name: 'paris_eiffel.jpg', size: '1.8 MB', url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80' },
    { name: 'bali_temple.jpg', size: '3.1 MB', url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80' },
    { name: 'swiss_alpine.jpg', size: '1.2 MB', url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80' },
    { name: 'serengeti_camp.jpg', size: '2.9 MB', url: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80' }
  ]);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaName, setNewMediaName] = useState('');

  // SEO LIVE SCHEMA PREVIEWS
  const schemaJsonLD = useMemo(() => {
    return JSON.stringify({
      "@context": "https://schema.org",
      "@type": seo.schemaType,
      "name": "WORLDCLASS Travel Experiences",
      "description": seo.metaDescription,
      "url": "https://worldclass-experience.com",
      "logo": "https://worldclass-experience.com/logo.png",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": cmsText.contactPhone,
        "contactType": "customer service"
      }
    }, null, 2);
  }, [seo, cmsText]);

  const sitemapXmlPreview = useMemo(() => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://worldclass-experience.com/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://worldclass-experience.com/destinations</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://worldclass-experience.com/services</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://worldclass-experience.com/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;
  }, []);

  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'WORLDCLASS' || passwordInput === 'admin') {
      setAdminLogin(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Administrator credentials sequence.');
    }
  };

  const handleBypassSecurity = () => {
    setAdminLogin(true);
  };

  // 1. Text variables CMS
  const handleCmsTextChange = (field: keyof typeof cmsText, val: string) => {
    updateCmsText({ [field]: val });
  };

  // 2. Blog Posts CMS CRUD
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBlogTitle || !newBlogContent) return;

    const tagsArray = newBlogTags.split(',').map((t) => t.trim()).filter(Boolean);

    if (editingPostId) {
      editBlogPost(editingPostId, {
        title: newBlogTitle,
        excerpt: newBlogExcerpt || newBlogContent.slice(0, 120) + '...',
        content: newBlogContent,
        author: newBlogAuthor,
        authorRole: newBlogAuthorRole,
        category: newBlogCategory,
        tags: tagsArray,
        image: newBlogImage
      });
      setEditingPostId(null);
    } else {
      addBlogPost({
        title: newBlogTitle,
        excerpt: newBlogExcerpt || newBlogContent.slice(0, 120) + '...',
        content: newBlogContent,
        author: newBlogAuthor,
        authorRole: newBlogAuthorRole,
        category: newBlogCategory,
        tags: tagsArray,
        image: newBlogImage,
        status: 'Published'
      });
    }

    // Reset Form
    setNewBlogTitle('');
    setNewBlogExcerpt('');
    setNewBlogContent('');
    setNewBlogTags('Europe, Summer');
    setEditingPostId(null);
  };

  const handleStartEditBlog = (post: any) => {
    setEditingPostId(post.id);
    setNewBlogTitle(post.title);
    setNewBlogExcerpt(post.excerpt);
    setNewBlogContent(post.content);
    setNewBlogAuthor(post.author);
    setNewBlogAuthorRole(post.authorRole);
    setNewBlogCategory(post.category);
    setNewBlogTags(post.tags.join(', '));
    setNewBlogImage(post.image);
    setActiveAdminTab('blog'); // focus tab
  };

  // 3. Package Manager CRUD
  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPkgTitle || !newPkgDestId || !newPkgPrice) return;

    const priceVal = parseInt(newPkgPrice) || 2000;
    const details = {
      title: newPkgTitle,
      destinationId: newPkgDestId,
      duration: newPkgDuration,
      category: newPkgCategory,
      price: priceVal,
      description: newPkgDesc || 'Full bespoke package features private transport guidelines, Ryokans, 5-star villas.',
      image: newPkgImage,
      rating: 4.90,
      reviewsCount: 8,
      inclusionTags: ['Bespoke Concierge', '5-Star Upgrade', 'VIP Airport Fasttrack']
    };

    if (editingPkgId) {
      editPackage(editingPkgId, details);
      setEditingPkgId(null);
    } else {
      addPackage(details);
    }

    // Reset
    setNewPkgTitle('');
    setNewPkgDestId('');
    setNewPkgPrice('3200');
    setNewPkgDesc('');
    setEditingPkgId(null);
  };

  const handleStartEditPkg = (p: any) => {
    setEditingPkgId(p.id);
    setNewPkgTitle(p.title);
    setNewPkgDestId(p.destinationId);
    setNewPkgDuration(p.duration);
    setNewPkgCategory(p.category);
    setNewPkgPrice(p.price.toString());
    setNewPkgDesc(p.description);
    setNewPkgImage(p.image);
    setActiveAdminTab('packages');
  };

  // 4. Custom Media Upload mockup
  const handleMediaUploadMock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMediaUrl) return;

    const name = newMediaName || `file_${Math.floor(Math.random() * 9000 + 1000)}.jpg`;
    setMediaVault(prev => [{ name, size: '2.1 MB', url: newMediaUrl }, ...prev]);
    setNewMediaUrl('');
    setNewMediaName('');
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-28 pb-12 bg-[#090D1A] px-6">
        <div className="absolute top-1/4 left-1/4 w-[280px] h-[280px] rounded-full bg-blue-950/20 blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-sm rounded-2xl border border-white/5 bg-slate-900/50 p-6 sm:p-8 relative overflow-hidden shadow-2xl text-left space-y-6">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-secondary/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="text-center space-y-2">
            <div className="w-11 h-11 rounded-lg bg-brand-primary border border-white/10 flex items-center justify-center text-brand-secondary mx-auto shadow-md">
              <Lock className="w-5 h-5 text-brand-secondary" />
            </div>
            <h2 className="text-xl font-bold font-poppins text-white uppercase tracking-tight">Administrative Login</h2>
            <p className="text-xs text-gray-500 font-sans max-w-xs mx-auto leading-relaxed">
              Enlist or decrypt credentials to update travel packages, blog articles, custom layouts, color themes, or client inquiry records.
            </p>
          </div>

          <form onSubmit={handleAdminLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1.5">Enter Vault Code</label>
              <input 
                type="password" 
                required
                placeholder="Password: admin or WORLDCLASS"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-center text-white font-mono tracking-widest focus:outline-none focus:border-brand-secondary"
              />
            </div>

            {loginError && (
              <p className="text-[10px] font-mono text-red-500 text-center uppercase tracking-wider">{loginError}</p>
            )}

            <button 
              type="submit"
              className="w-full py-2.5 bg-brand-secondary hover:bg-blue-600 rounded-lg text-white font-poppins font-bold text-xs uppercase tracking-widest cursor-pointer shadow-lg transition-transform active:scale-[0.98]"
            >
              Authorize Gate
            </button>
          </form>

          <div className="pt-2 border-t border-white/5 flex flex-col gap-2">
            <button 
              onClick={handleBypassSecurity}
              className="w-full text-center text-[10px] font-mono text-emerald-400 font-bold tracking-widest uppercase hover:underline cursor-pointer"
            >
              ⚡ Fast-Access Demo Bypass ⚡
            </button>
            <p className="text-[9px] text-gray-500 font-sans text-center leading-snug">
              Credentials shortcut is active in preview mode for instantaneous sandboxed trials. Standard credentials bypass password: <span className="text-gray-300 font-bold">WORLDCLASS</span>
            </p>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 max-w-7xl mx-auto px-6 space-y-10 overflow-hidden leading-relaxed">
      
      {/* HEADER CONTROLS */}
      <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-4 text-left">
        <div className="space-y-1">
          <span className="text-[10px] font-mono text-brand-secondary tracking-widest block uppercase font-bold">BUSINESS MANAGEMENT SUITE</span>
          <h1 className="text-2xl sm:text-3xl font-black font-poppins text-white uppercase">WorldClass Control Terminal</h1>
        </div>
        <div className="flex gap-2 text-xs font-mono">
          <button 
            onClick={() => {
              setAdminLogin(false);
              window.location.hash = '#home';
            }}
            className="px-3.5 py-1.5 rounded-lg border border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/10 transition-all cursor-pointer font-bold uppercase tracking-wider"
          >
            Lock Session
          </button>
        </div>
      </section>

      {/* HORIZONTAL DASHBOARD TABS */}
      <section className="flex flex-wrap gap-1.5 border-b border-white/5 pb-2">
        {[
          { id: 'analytics', label: 'CRM & Metrics', icon: BarChart3 },
          { id: 'bookings', label: 'Inquiry Registry', icon: ListOrdered },
          { id: 'cms', label: 'Landing CMS', icon: FileEdit },
          { id: 'blog', label: 'Travel Blog CRUD', icon: BookOpen },
          { id: 'packages', label: 'Package Editor', icon: Briefcase },
          { id: 'theme', label: 'Theme Designer', icon: Palette },
          { id: 'seo', label: 'SEO Config', icon: Globe },
          { id: 'media', label: 'Media Library', icon: FolderOpen }
        ].map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveAdminTab(tab.id as any)}
              className={`px-3 py-2 rounded-lg text-xs font-poppins font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                activeAdminTab === tab.id
                  ? 'bg-brand-secondary text-white shadow-md font-bold'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <IconComponent className="w-4 h-4 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </section>

      {/* CORE ACTIVE WORKSPACES */}
      <section className="relative">
        
        {/* Tab 1: CRM & METRICS */}
        {activeAdminTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
            {/* Left overview parameters bento box */}
            <div className="lg:col-span-4 space-y-6">
              <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/40 space-y-4">
                <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block font-semibold">CONVERSION SUMMARY</span>
                <h3 className="text-lg font-bold font-poppins text-white uppercase">Client Interest Ratios</h3>
                
                <div className="space-y-3 pt-2 text-xs">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Monthly Visitors</span>
                    <span className="text-white font-bold">{stats.visitors.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Page views Sessions</span>
                    <span className="text-white font-bold">{stats.pageViews > 0 ? stats.pageViews.toLocaleString() : '45,920'}</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-gray-400">Total Bookings Triggered</span>
                    <span className="text-white font-bold">{stats.totalBookings.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Portal Conversion Efficiency</span>
                    <span className="text-brand-accent font-bold font-mono">{stats.conversionRate}%</span>
                  </div>
                </div>
              </div>

              {/* Traffic Sources visual SVG Chart */}
              <div className="p-5 rounded-2xl border border-white/5 bg-slate-900/40 space-y-4">
                <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase block font-semibold text-left">TRAFFIC SOURCE RADAR</span>
                <h3 className="text-sm font-bold font-poppins text-white uppercase">Monthly Traffic Channels</h3>
                
                {/* SVG segment ring */}
                <div className="flex items-center gap-6 justify-center">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle cx="48" cy="48" r="32" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                    <circle cx="48" cy="48" r="32" fill="transparent" stroke="#3B82F6" strokeWidth="8" strokeDasharray="200" strokeDashoffset="75" />
                    <circle cx="48" cy="48" r="32" fill="transparent" stroke="#10B981" strokeWidth="8" strokeDasharray="200" strokeDashoffset="145" />
                    <circle cx="48" cy="48" r="32" fill="transparent" stroke="#FBBF24" strokeWidth="8" strokeDasharray="200" strokeDashoffset="180" />
                  </svg>
                  
                  <div className="space-y-1.5 text-[10px] font-mono text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                      <span>Search Engine (55%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>Social Sharing (35%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                      <span>Direct / VIP Desk (10%)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Booking Inquiry CRM Monitor */}
            <div className="lg:col-span-8 p-5 rounded-2xl border border-white/5 bg-slate-900/40 space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block font-semibold">CRM BOOKING LEDGER</span>
                  <h3 className="text-lg font-bold font-poppins text-white uppercase">Client Inquiry Vault ({bookings.length})</h3>
                </div>
                <span className="text-[10px] font-mono text-gray-400 bg-white/5 border border-white/5 rounded px-2.5 py-1">READ ONLY</span>
              </div>

              {/* Bookings table */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-gray-450 border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-gray-400 font-mono text-[10px] uppercase">
                      <th className="py-2.5 pr-2">Passenger</th>
                      <th className="py-2.5 pr-2">Target Coords</th>
                      <th className="py-2.5 pr-2">Total Budget</th>
                      <th className="py-2.5 pr-2">Status Flag</th>
                      <th className="py-2.5">Purge</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => {
                      const d = destinations.find(dest => dest.id === booking.destinationId);
                      return (
                        <tr key={booking.id} className="border-b border-white/5 last:border-none group">
                          <td className="py-3 pr-2">
                            <span className="block font-semibold text-white truncate max-w-[140px]">{booking.fullName}</span>
                            <span className="block text-[10px] text-gray-400 font-mono">{booking.phone}</span>
                          </td>
                          <td className="py-3 pr-2">
                            <span className="block text-white truncate max-w-[120px]">{d ? d.name.split('&')[0] : 'Custom Coordinates'}</span>
                            <span className="block text-[10px] text-gray-500 font-mono">Date: {booking.departureDate}</span>
                          </td>
                          <td className="py-3 pr-2 font-mono text-brand-accent tracking-tighter">
                            ${(booking.budgetPerPerson * booking.passengersCount).toLocaleString()}
                          </td>
                          <td className="py-3 pr-2">
                            <select
                              value={booking.status}
                              onChange={(e) => updateBookingStatus(booking.id, e.target.value as any)}
                              className="bg-slate-950 border border-white/5 text-[10px] text-white rounded p-1"
                            >
                              <option value="Pending">Pending</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Approved">Approved</option>
                              <option value="Archived">Archived</option>
                            </select>
                          </td>
                          <td className="py-3">
                            <button
                              onClick={() => deleteBooking(booking.id)}
                              className="text-red-400 hover:text-red-500 p-1 bg-red-500/5 hover:bg-red-500/10 rounded transition-colors"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {bookings.length === 0 && (
                <p className="text-center py-8 font-mono text-xs text-gray-500">NO ACTIVE BOOKING DOSSIERS REGISTERED</p>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: CRM TABLE INQUIRY REGISTRY */}
        {activeAdminTab === 'bookings' && (
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 space-y-6 text-left">
            <div className="space-y-1 border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block font-semibold">CRM FULL INTAKE REGISTRY</span>
              <h3 className="text-xl font-bold font-poppins text-white uppercase">Bespoke Inquiry Dockets</h3>
            </div>
            
            {bookings.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <Ticket className="w-10 h-10 text-gray-600 mx-auto animate-pulse" />
                <p className="text-xs text-gray-500 font-mono">No client booking dockets available at this time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {bookings.map((booking) => {
                  const destNode = destinations.find(d => d.id === booking.destinationId);
                  const pkgNode = packages.find(p => p.id === booking.packageId);
                  return (
                    <div key={booking.id} className="p-4 rounded-xl border border-white/5 bg-slate-950/70 space-y-4 font-mono text-xs text-gray-300 relative">
                      <div className="absolute top-4 right-4 text-[10px] bg-slate-900 border border-white/10 text-brand-accent font-bold px-2 py-0.5 rounded uppercase">
                        {booking.status}
                      </div>
                      
                      <div className="border-b border-white/5 pb-2">
                        <span className="block text-white font-extrabold text-sm uppercase">{booking.fullName}</span>
                        <span className="block text-gray-500 text-[10px]">Registry ID: #{booking.id}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pb-2 text-[11px] border-b border-white/5">
                        <div>
                          <span className="block text-gray-500 uppercase text-[9px]">Target Sector</span>
                          <span className="text-white truncate block">{destNode?.name.split('&')[0] || 'Custom'}</span>
                        </div>
                        <div>
                          <span className="block text-gray-500 uppercase text-[9px]">Linked Package</span>
                          <span className="text-white truncate block">{pkgNode?.title || 'Bespoke Consultation'}</span>
                        </div>
                        <div>
                          <span className="block text-gray-500 uppercase text-[9px]">Departure timing</span>
                          <span className="text-white block">{booking.departureDate} ({booking.durationDays} Days)</span>
                        </div>
                        <div>
                          <span className="block text-gray-500 uppercase text-[9px]">Budget scale</span>
                          <span className="text-brand-accent font-bold block">${(booking.budgetPerPerson * booking.passengersCount).toLocaleString()} USD</span>
                        </div>
                      </div>

                      <div>
                        <span className="block text-gray-500 uppercase text-[9px]">Dossier Notes</span>
                        <p className="text-[11px] leading-relaxed text-gray-300 font-light mt-1 whitespace-pre-wrap">
                          {booking.notes || 'No custom accommodations notes specified.'}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex gap-2">
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'Approved')}
                          className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded hover:bg-emerald-500/20 text-[10px] uppercase font-bold cursor-pointer"
                        >
                          Approve quote
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'Contacted')}
                          className="px-3 py-1 bg-blue-500/10 border border-blue-500/30 text-blue-450 rounded hover:bg-blue-500/20 text-[10px] uppercase font-bold cursor-pointer"
                        >
                          Mark Contacted
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: CMS LANDING CONTENTS TEXTS LIMITS */}
        {activeAdminTab === 'cms' && (
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 space-y-6 text-left">
            <div className="space-y-1 border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block font-semibold text-left">LANDING CMS PANEL</span>
              <h3 className="text-xl font-bold font-poppins text-white uppercase text-left">Global Text Variables Editor</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              
              <div className="space-y-4">
                <h4 className="font-poppins font-bold text-sm text-brand-secondary">Hero Banner Content</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Hero Title Heading</label>
                    <input 
                      type="text" 
                      value={cmsText.heroTitle}
                      onChange={(e) => handleCmsTextChange('heroTitle', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Hero Subtitle Paragraph</label>
                    <textarea 
                      rows={3}
                      value={cmsText.heroSubtitle}
                      onChange={(e) => handleCmsTextChange('heroSubtitle', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-poppins font-bold text-sm text-brand-accent">Company Mission & Legacies</h4>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Mission Statement Text</label>
                    <textarea 
                      rows={2}
                      value={cmsText.aboutMission}
                      onChange={(e) => handleCmsTextChange('aboutMission', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">History Chronology Paragraph</label>
                    <textarea 
                      rows={2}
                      value={cmsText.aboutHistory}
                      onChange={(e) => handleCmsTextChange('aboutHistory', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-4 pt-4 border-t border-white/5">
                <h4 className="font-poppins font-bold text-sm text-brand-secondary text-left">Contact details Coordinates</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[11px]">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Agency Email Address</label>
                    <input 
                      type="text" 
                      value={cmsText.contactEmail} 
                      onChange={(e) => handleCmsTextChange('contactEmail', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Agency Toll Phone</label>
                    <input 
                      type="text" 
                      value={cmsText.contactPhone} 
                      onChange={(e) => handleCmsTextChange('contactPhone', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Secure WhatsApp Phone</label>
                    <input 
                      type="text" 
                      value={cmsText.contactWhatsApp} 
                      onChange={(e) => handleCmsTextChange('contactWhatsApp', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Corporate Support Hours</label>
                    <input 
                      type="text" 
                      value={cmsText.contactHours} 
                      onChange={(e) => handleCmsTextChange('contactHours', e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: TRAVEL BLOG POSTS CRUD */}
        {activeAdminTab === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Form to Create/edit */}
            <div className="lg:col-span-5 p-5 rounded-2xl border border-white/5 bg-slate-900/40 space-y-4">
              <div className="border-b border-white/5 pb-2">
                <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block font-semibold">BLOG MAKER TERMINAL</span>
                <h3 className="text-base font-bold font-poppins text-white uppercase">
                  {editingPostId ? 'Edit Article Document' : 'Create Article Draft'}
                </h3>
              </div>

              <form onSubmit={handleSaveBlog} className="space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="text-gray-400 font-mono text-[9px] uppercase block">Article Title *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., Hidden Sandbanks of Maldives"
                    value={newBlogTitle}
                    onChange={(e) => setNewBlogTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-mono text-[9px] uppercase block">Main Category</label>
                  <select 
                    value={newBlogCategory}
                    onChange={(e) => setNewBlogCategory(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white text-[11px]"
                  >
                    <option value="Travel Guides">Travel Guides</option>
                    <option value="Cultural Insights">Cultural Insights</option>
                    <option value="Sustainability">Sustainability</option>
                    <option value="Bespoke Luxury">Bespoke Luxury</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-mono text-[9px] uppercase block">Cover Image URL *</label>
                  <input 
                    type="text" 
                    required 
                    value={newBlogImage}
                    onChange={(e) => setNewBlogImage(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-mono text-[9px] uppercase block">Brief Excerpt Synopsis</label>
                  <input 
                    type="text" 
                    placeholder="Summary teaser text for card cover..."
                    value={newBlogExcerpt}
                    onChange={(e) => setNewBlogExcerpt(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-mono text-[9px] uppercase block font-semibold text-white">Longform Content Markdown *</label>
                  <textarea 
                    rows={6}
                    required
                    placeholder="Type long-form paragraphs describing local history, hotels, pathways codes..."
                    value={newBlogContent}
                    onChange={(e) => setNewBlogContent(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white font-serif leading-relaxed text-[11px]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-mono text-[9px] uppercase block">Topic Tags (Comma Seperated)</label>
                  <input 
                    type="text" 
                    value={newBlogTags}
                    onChange={(e) => setNewBlogTags(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  {editingPostId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingPostId(null);
                        setNewBlogTitle('');
                        setNewBlogExcerpt('');
                        setNewBlogContent('');
                      }}
                      className="py-2.5 px-4 border border-white/15 rounded-lg text-gray-400 hover:text-white"
                    >
                      Reset
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 bg-brand-secondary text-white font-poppins font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingPostId ? 'Save Changes' : 'Publish Article'}</span>
                  </button>
                </div>

              </form>
            </div>

            {/* Existing posts listing */}
            <div className="lg:col-span-7 p-5 rounded-2xl border border-white/5 bg-slate-900/40 space-y-4">
              <div className="border-b border-white/5 pb-2">
                <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase block font-semibold text-left">PUBLISHED PAPERS CATALOG</span>
                <h3 className="text-base font-bold font-poppins text-white uppercase text-left font-semibold">Active Editorial Archives ({blogPosts.length})</h3>
              </div>

              <div className="space-y-3">
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-3.5 rounded-xl border border-white/5 bg-slate-950/70 flex justify-between items-start gap-4">
                    <div className="flex gap-3">
                      <img 
                        src={post.image} 
                        alt="" 
                        className="w-14 h-14 rounded-lg object-cover shrink-0" 
                        referrerPolicy="no-referrer"
                      />
                      <div className="space-y-0.5 text-xs text-left">
                        <span className="text-[9px] font-mono text-brand-secondary bg-slate-900 border border-white/5 px-1.5 rounded uppercase font-bold tracking-wider">{post.category}</span>
                        <h4 className="font-poppins font-bold text-white uppercase truncate max-w-sm">{post.title}</h4>
                        <span className="text-[10px] text-gray-500 font-mono">Published: {post.date} • by {post.author}</span>
                      </div>
                    </div>

                    <div className="flex gap-1 shrink-0">
                      <button 
                        onClick={() => handleStartEditBlog(post)}
                        className="p-1 px-2.5 bg-white/5 hover:bg-brand-secondary rounded text-white text-[11px] flex items-center gap-0.5 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button 
                        onClick={() => deleteBlogPost(post.id)}
                        className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded hover:bg-red-500/20 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        )}

        {/* Tab 5: PACKAGE CATALOG MANAGER */}
        {activeAdminTab === 'packages' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
            {/* Create package form */}
            <div className="lg:col-span-5 p-5 rounded-2xl border border-white/5 bg-slate-900/40 space-y-4">
              <div className="border-b border-white/5 pb-2">
                <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block font-semibold">CATALOG PACKAGES LAB</span>
                <h3 className="text-base font-bold font-poppins text-white uppercase">
                  {editingPkgId ? 'Modify Premium Curated Package' : 'Publish New Tour Package'}
                </h3>
              </div>

              <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-gray-400 font-mono text-[9px] uppercase block">Package Heading Title *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g., Ryokan, Imperial Gardens & Kyoto Legacy"
                    value={newPkgTitle}
                    onChange={(e) => setNewPkgTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Linked Destination Coordinates *</label>
                    <select 
                      required 
                      value={newPkgDestId}
                      onChange={(e) => setNewPkgDestId(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white text-[11px]"
                    >
                      <option value="">-- Choose --</option>
                      {destinations.map(d => (
                        <option key={d.id} value={d.id}>{d.name.split(' &')[0]}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Category Option</label>
                    <select 
                      value={newPkgCategory}
                      onChange={(e) => setNewPkgCategory(e.target.value as any)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-white text-[11px]"
                    >
                      <option value="Domestic">Domestic (Local Retreat)</option>
                      <option value="International">International</option>
                      <option value="Luxury">Luxury Level</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Tour Duration Text</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g., 8 Days, 7 Nights"
                      value={newPkgDuration}
                      onChange={(e) => setNewPkgDuration(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Package Price USD/pp *</label>
                    <input 
                      type="number" 
                      required 
                      placeholder="e.g., 3400"
                      value={newPkgPrice}
                      onChange={(e) => setNewPkgPrice(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-mono text-[9px] uppercase block">Linked Image URL</label>
                  <input 
                    type="text" 
                    value={newPkgImage}
                    onChange={(e) => setNewPkgImage(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-gray-400 font-mono text-[9px] uppercase block">Long description Summary</label>
                  <textarea 
                    rows={3} 
                    placeholder="Differentiate this package with features regarding spa allowances, hot-air balloons etc..."
                    value={newPkgDesc}
                    onChange={(e) => setNewPkgDesc(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-white leading-relaxed text-[11px]"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  {editingPkgId && (
                    <button 
                      type="button" 
                      onClick={() => {
                        setEditingPkgId(null);
                        setNewPkgTitle('');
                        setNewPkgDesc('');
                      }}
                      className="py-2 px-4 border border-white/10 rounded-lg text-gray-400 hover:text-white"
                    >
                      Reset
                    </button>
                  )}
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-poppins font-bold text-xs uppercase tracking-widest rounded-lg flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>{editingPkgId ? 'Save curation' : 'Add package'}</span>
                  </button>
                </div>

              </form>
            </div>

            {/* List packages */}
            <div className="lg:col-span-7 p-5 rounded-2xl border border-white/5 bg-slate-900/40 space-y-4">
              <div className="border-b border-white/5 pb-2">
                <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase block font-semibold text-left">PUBLISHED REPERTORY</span>
                <h3 className="text-base font-bold font-poppins text-white uppercase text-left font-semibold">Active Tour Package Bundles ({packages.length})</h3>
              </div>

              <div className="space-y-3">
                {packages.map((pkg) => {
                  const correlatedDest = destinations.find(d => d.id === pkg.destinationId);
                  return (
                    <div key={pkg.id} className="p-3 rounded-xl border border-white/5 bg-slate-950/70 flex justify-between items-center gap-4">
                      <div className="flex gap-3 text-xs text-left">
                        <img 
                          src={pkg.image} 
                          alt="" 
                          className="w-14 h-14 rounded-lg object-cover shrink-0" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-mono text-brand-accent bg-slate-900 border border-white/5 px-1.5 rounded uppercase font-bold tracking-wider">{pkg.category}</span>
                          <h4 className="font-poppins font-bold text-white uppercase truncate max-w-sm ">{pkg.title}</h4>
                          <span className="text-[10px] text-gray-400 font-mono">Location: {correlatedDest ? correlatedDest.name.split(' &')[0] : 'Worldwide'} • Rate: <span className="text-white font-bold">${pkg.price}/pp</span></span>
                        </div>
                      </div>

                      <div className="flex gap-1 shrink-0">
                        <button 
                          onClick={() => handleStartEditPkg(pkg)}
                          className="px-2.5 py-1 bg-white/5 hover:bg-brand-secondary rounded text-[11px] text-white flex items-center gap-0.5 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button 
                          onClick={() => deletePackage(pkg.id)}
                          className="p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded hover:bg-red-500/20 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>
        )}

        {/* Tab 6: REALTIME THEME CHANGER CUSTOMIZER */}
        {activeAdminTab === 'theme' && (
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 space-y-6 text-left">
            <div className="space-y-1 border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block font-semibold text-left">VISUAL CUSTOMizer engine</span>
              <h3 className="text-xl font-bold font-poppins text-white uppercase text-left">Brand Layout & Style Matrix</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs">
              
              {/* Palette Pickers */}
              <div className="p-4 rounded-xl border border-white/5 bg-slate-950/40 space-y-4">
                <h4 className="font-poppins font-bold text-sm text-brand-secondary flex items-center gap-1.5">
                  <Palette className="w-4.5 h-4.5" /> Color Accent parameters
                </h4>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Deep Ocean Primary (Hex)</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={theme.primaryColor}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={theme.primaryColor}
                        onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                        className="flex-1 bg-slate-900 border border-white/10 rounded px-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Sky Secondary (Hex)</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={theme.secondaryColor}
                        onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                        className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={theme.secondaryColor}
                        onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                        className="flex-1 bg-slate-900 border border-white/10 rounded px-2 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Golden Accenting (Hex)</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={theme.accentColor}
                        onChange={(e) => updateTheme({ accentColor: e.target.value })}
                        className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                      />
                      <input 
                        type="text" 
                        value={theme.accentColor}
                        onChange={(e) => updateTheme({ accentColor: e.target.value })}
                        className="flex-1 bg-slate-900 border border-white/10 rounded px-2 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography / Elements rounding */}
              <div className="p-4 rounded-xl border border-white/5 bg-slate-950/40 space-y-4">
                <h4 className="font-poppins font-bold text-sm text-brand-accent">Layout Components styling</h4>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block font-semibold">Core Typography Pairings</label>
                    <select 
                      value={theme.fontPair}
                      onChange={(e) => updateTheme({ fontPair: e.target.value as any })}
                      className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white font-sans text-xs"
                    >
                      <option value="Inter-Poppins">Inter Body + Poppins Headings</option>
                      <option value="Inter-SpaceGrotesk">Inter Body + Space Grotesk (Tech)</option>
                      <option value="Inter-Outfit">Inter Body + Outfit display (Clean)</option>
                      <option value="Inter-Playfair">Inter Body + Playfair Display (Luxury serif)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Interactive Buttons Rounding</label>
                    <select 
                      value={theme.buttonStyle}
                      onChange={(e) => updateTheme({ buttonStyle: e.target.value as any })}
                      className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white font-sans text-xs"
                    >
                      <option value="rounded-none">Sanded Edge (rounded-none)</option>
                      <option value="rounded-md">Premium Classic (rounded-md)</option>
                      <option value="rounded-full">Streamlined Capsule (rounded-full)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Dynamic transition speeds</label>
                    <select 
                      value={theme.animationSpeed}
                      onChange={(e) => updateTheme({ animationSpeed: e.target.value as any })}
                      className="w-full bg-slate-900 border border-white/10 rounded p-2 text-white text-xs"
                    >
                      <option value="slow">Cinema Slow (Transitions damped)</option>
                      <option value="medium">Standard Balanced</option>
                      <option value="fast">High speed Swift</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Toggles effects */}
              <div className="p-4 rounded-xl border border-white/5 bg-slate-950/40 space-y-4">
                <h4 className="font-poppins font-bold text-sm text-brand-secondary">Bespoke 3D & effects Switches</h4>
                
                <div className="space-y-3 pt-2">
                  <label className="flex items-center justify-between p-1 bg-slate-900 rounded border border-white/5 text-gray-300">
                    <span>Glassmorphism HUD frames</span>
                    <input 
                      type="checkbox" 
                      checked={theme.enableGlassmorphism}
                      onChange={(e) => updateTheme({ enableGlassmorphism: e.target.checked })}
                      className="w-4 h-4 text-brand-secondary"
                    />
                  </label>

                  <label className="flex items-center justify-between p-1 bg-slate-900 rounded border border-white/5 text-gray-300">
                    <span>Atmospheric Space loop backdrop</span>
                    <input 
                      type="checkbox" 
                      checked={theme.enableStarfield}
                      onChange={(e) => updateTheme({ enableStarfield: e.target.checked })}
                      className="w-4 h-4 text-brand-secondary"
                    />
                  </label>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={resetTheme}
                    className="w-full py-1.5 border border-white/10 hover:bg-white/5 text-[10px] font-mono uppercase text-gray-400 hover:text-white rounded cursor-pointer text-center"
                  >
                    Reset standard Theme
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 7: SEARCH ENGINE OPTIMIZATION MANAGEMENTS */}
        {activeAdminTab === 'seo' && (
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 space-y-6 text-left">
            <div className="space-y-1 border-b border-white/5 pb-3">
              <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block font-semibold">SEO EXECUTIVES PANEL</span>
              <h3 className="text-xl font-bold font-poppins text-white uppercase">Meta tags & Structured schemas</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-sans">
              
              {/* Form editing variables */}
              <form onSubmit={(e) => { e.preventDefault(); alert('Success: SEO variables updated inside sandboxed headers context.'); }} className="lg:col-span-6 space-y-4">
                <h4 className="font-poppins font-bold text-sm text-brand-secondary">Metadata Parameters</h4>
                
                <div className="grid grid-cols-1 gap-3">
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Global Page Title</label>
                    <input 
                      type="text" 
                      value={seo.metaTitle}
                      onChange={(e) => updateSeo({ metaTitle: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Meta Description Script</label>
                    <textarea 
                      rows={3}
                      value={seo.metaDescription}
                      onChange={(e) => updateSeo({ metaDescription: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2 text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-gray-400 font-mono text-[9px] uppercase block">Indexed Keywords (Comma Seperated)</label>
                    <input 
                      type="text" 
                      value={seo.keywords}
                      onChange={(e) => updateSeo({ keywords: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-gray-400 font-mono text-[9px] uppercase block">Google Schema Category</label>
                      <select 
                        value={seo.schemaType}
                        onChange={(e) => updateSeo({ schemaType: e.target.value })}
                        className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white"
                      >
                        <option value="TravelAgency">TravelAgency (Standard Local)</option>
                        <option value="Organization">Organization</option>
                        <option value="LocalBusiness">LocalBusiness</option>
                      </select>
                    </div>

                    <div className="pt-5 pl-2">
                      <label className="flex items-center gap-2 text-gray-300">
                        <input 
                          type="checkbox" 
                          checked={seo.sitemapEnabled}
                          onChange={(e) => updateSeo({ sitemapEnabled: e.target.checked })}
                          className="w-4 h-4 rounded text-brand-secondary"
                        />
                        <span>Enable instant sitemaps</span>
                      </label>
                    </div>
                  </div>

                </div>

                <button 
                  type="submit"
                  className="w-full py-2.5 bg-brand-secondary hover:bg-blue-600 text-white font-poppins font-bold uppercase text-[10px] tracking-widest rounded-lg cursor-pointer"
                >
                  Apply SEO Configurations
                </button>
              </form>

              {/* JSON-LD Schema preview and sitemap.xml */}
              <div className="lg:col-span-6 space-y-6">
                
                {/* Sitemap XML output mockup */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-brand-accent tracking-widest uppercase block font-semibold">SITEMAP.XML PREVIEW GENERATOR</span>
                  <pre className="p-3.5 rounded-xl border border-white/5 bg-slate-950/90 text-[10px] font-mono text-blue-450 leading-relaxed overflow-x-auto max-h-[160px] text-left">
                    {sitemapXmlPreview}
                  </pre>
                </div>

                {/* Microdata structured schema preview */}
                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase block font-semibold">JSON-LD STRUCTURED SCHEMA PREVIEW</span>
                  <pre className="p-3.5 rounded-xl border border-white/5 bg-slate-950/90 text-[10px] font-mono text-emerald-450 leading-relaxed overflow-x-auto max-h-[160px] text-left">
                    {schemaJsonLD}
                  </pre>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Tab 8: MEDIA LIBRARY ORGANIZER */}
        {activeAdminTab === 'media' && (
          <div className="p-6 rounded-2xl border border-white/5 bg-slate-900/40 space-y-6 text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-brand-secondary tracking-widest uppercase block font-semibold">MEDIA STORAGE SYSTEM</span>
                <h3 className="text-xl font-bold font-poppins text-white uppercase">Asset Vault Organizer</h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">ONLINE DECK</span>
            </div>

            {/* Simulated uploader */}
            <form onSubmit={handleMediaUploadMock} className="p-4 rounded-xl border border-white/5 bg-slate-950/60 grid grid-cols-1 md:grid-cols-12 gap-3 text-xs items-end">
              <div className="md:col-span-4 space-y-1">
                <label className="text-gray-400 font-mono text-[9px] uppercase block">Image File Label</label>
                <input 
                  type="text" 
                  placeholder="e.g., maldives_villa.jpg"
                  value={newMediaName}
                  onChange={(e) => setNewMediaName(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded px-2.5 py-1.5 text-white"
                />
              </div>

              <div className="md:col-span-6 space-y-1">
                <label className="text-gray-400 font-mono text-[9px] uppercase block">Visual Asset URL Link (Unsplash/etc.) *</label>
                <input 
                  type="text" 
                  required
                  placeholder="https://images.unsplash.com/photo-..."
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="w-full bg-slate-900 border border-white/10 rounded px-2.5 py-1.5 text-white font-mono"
                />
              </div>

              <button 
                type="submit"
                className="md:col-span-2 py-2.5 bg-brand-secondary text-white font-poppins font-bold text-[10px] uppercase tracking-widest rounded cursor-pointer shadow-lg"
              >
                Mock Upload File
              </button>
            </form>

            {/* Folder grid items representation */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
              {mediaVault.map((med, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-white/5 bg-slate-950/75 text-left text-xs space-y-2 group relative">
                  <div className="h-28 rounded-lg overflow-hidden relative">
                    <img src={med.url} alt="" className="w-full h-full object-cover shrink-0" referrerPolicy="no-referrer" />
                    <button 
                      onClick={() => setMediaVault(prev => prev.filter((m, i) => i !== idx))}
                      className="absolute top-1.5 right-1.5 p-1 bg-red-600/80 hover:bg-red-600 rounded text-white md:opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="space-y-0.5 pr-1 font-mono text-[10px]">
                    <span className="block text-white truncate font-bold text-gray-300">{med.name}</span>
                    <span className="block text-gray-500 font-normal ">{med.size} • JPG format</span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </section>

    </div>
  );
}
