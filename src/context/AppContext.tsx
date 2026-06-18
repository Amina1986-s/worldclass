/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Destination, 
  TravelPackage, 
  TravelService, 
  BlogPost, 
  Testimonial, 
  BookingInquiry, 
  ThemeConfig, 
  SeoConfig,
  SystemStats
} from '../types';
import { 
  INITIAL_DESTINATIONS, 
  INITIAL_PACKAGES, 
  INITIAL_SERVICES, 
  INITIAL_BLOG_POSTS, 
  INITIAL_TESTIMONIALS, 
  DEFAULT_THEME, 
  DEFAULT_SEO, 
  INITIAL_BOOKINGS,
  INITIAL_STATS
} from '../data/initialData';

interface AppContextType {
  // Theme & Layout Settings
  theme: ThemeConfig;
  updateTheme: (newTheme: Partial<ThemeConfig>) => void;
  resetTheme: () => void;

  // SEO Configurations
  seo: SeoConfig;
  updateSeo: (newSeo: Partial<SeoConfig>) => void;

  // CMS Collections State
  destinations: Destination[];
  addDestination: (dest: Omit<Destination, 'id'>) => void;
  editDestination: (id: string, dest: Partial<Destination>) => void;
  deleteDestination: (id: string) => void;

  packages: TravelPackage[];
  addPackage: (pkg: Omit<TravelPackage, 'id'>) => void;
  editPackage: (id: string, pkg: Partial<TravelPackage>) => void;
  deletePackage: (id: string) => void;

  services: TravelService[];
  editService: (id: string, srvPart: Partial<TravelService>) => void;

  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
  editBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  testimonials: Testimonial[];
  addTestimonial: (test: Omit<Testimonial, 'id'>) => void;
  deleteTestimonial: (id: string) => void;

  bookings: BookingInquiry[];
  submitBooking: (booking: Omit<BookingInquiry, 'id' | 'submittedAt' | 'status'>) => void;
  updateBookingStatus: (id: string, status: BookingInquiry['status']) => void;
  deleteBooking: (id: string) => void;

  // Dynamic system analytics and content edits
  stats: SystemStats;
  incrementPageViews: () => void;
  
  // Custom texts editable from dashboard
  cmsText: {
    heroTitle: string;
    heroSubtitle: string;
    aboutMission: string;
    aboutVision: string;
    aboutHistory: string;
    contactPhone: string;
    contactEmail: string;
    contactAddress: string;
    contactWhatsApp: string;
    contactHours: string;
  };
  updateCmsText: (newText: Partial<AppContextType['cmsText']>) => void;

  // Current logged in admin session
  isAdminLoggedIn: boolean;
  setAdminLogin: (login: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  // Helper to standard-fetch or initialize LocalStorage
  const getLocalStorage = <T,>(key: string, defaultValue: T): T => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [theme, setTheme] = useState<ThemeConfig>(() => getLocalStorage('wc_theme', DEFAULT_THEME));
  const [seo, setSeo] = useState<SeoConfig>(() => getLocalStorage('wc_seo', DEFAULT_SEO));
  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const stored = getLocalStorage<Destination[]>('wc_destinations', INITIAL_DESTINATIONS);
    return Array.isArray(stored) ? stored : INITIAL_DESTINATIONS;
  });

  const [packages, setPackages] = useState<TravelPackage[]>(() => {
    const stored = getLocalStorage<TravelPackage[]>('wc_packages', INITIAL_PACKAGES);
    return Array.isArray(stored) ? stored : INITIAL_PACKAGES;
  });
  const [services, setServices] = useState<TravelService[]>(() => getLocalStorage('wc_services', INITIAL_SERVICES));
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => getLocalStorage('wc_blog_posts', INITIAL_BLOG_POSTS));
  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => getLocalStorage('wc_testimonials', INITIAL_TESTIMONIALS));
  const [bookings, setBookings] = useState<BookingInquiry[]>(() => getLocalStorage('wc_bookings', INITIAL_BOOKINGS));
  const [stats, setStats] = useState<SystemStats>(() => getLocalStorage('wc_stats', INITIAL_STATS));
  
  const [cmsText, setCmsText] = useState(() => getLocalStorage('wc_cms_text', {
    heroTitle: 'DISCOVER ELEVATED GLOBAL WONDERS',
    heroSubtitle: 'We curate bespoke five-star international itineraries, luxury private private charters, and historical culinary expeditions tailored perfectly for the refined explorer.',
    aboutMission: 'WORLDCLASS exists to transcend the traditional boundaries of tourism by styling intimate global expeditions that unite ancient cultural heritages, five-star private villa comfort, and dedicated wildlife preservation.',
    aboutVision: 'To set the absolute peak benchmark of global luxurious hospitality while steering travel emissions into dense reforestation and community-first diplomatic partnerships.',
    aboutHistory: 'Established in 2012 by an elite council of transcontinental pathfinders, WORLDCLASS began as a private boutique yacht log in the Mediterranean. Today, we handle VIP transits for over twelve thousand luxury explorers annually across six continents.',
    contactPhone: '+1 (800) 965-2252',
    contactEmail: 'concierge@worldclass-experience.com',
    contactAddress: '745 Fifth Avenue, Penthouse Level, New York, NY 10151, USA',
    contactWhatsApp: '+18009652252',
    contactHours: 'Mon - Sun: 24/7 White-Glove Support Desk'
  }));

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(() => {
    return sessionStorage.getItem('wc_admin_session') === 'active';
  });

  // Sync state variables to LocalStorage on updates
  useEffect(() => { localStorage.setItem('wc_theme', JSON.stringify(theme)); }, [theme]);
  useEffect(() => { localStorage.setItem('wc_seo', JSON.stringify(seo)); }, [seo]);
  useEffect(() => { localStorage.setItem('wc_destinations', JSON.stringify(destinations)); }, [destinations]);
  useEffect(() => { localStorage.setItem('wc_packages', JSON.stringify(packages)); }, [packages]);
  useEffect(() => { localStorage.setItem('wc_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('wc_blog_posts', JSON.stringify(blogPosts)); }, [blogPosts]);
  useEffect(() => { localStorage.setItem('wc_testimonials', JSON.stringify(testimonials)); }, [testimonials]);
  useEffect(() => { localStorage.setItem('wc_bookings', JSON.stringify(bookings)); }, [bookings]);
  useEffect(() => { localStorage.setItem('wc_stats', JSON.stringify(stats)); }, [stats]);
  useEffect(() => { localStorage.setItem('wc_cms_text', JSON.stringify(cmsText)); }, [cmsText]);

  // Handle CSS variable bindings in raw index.html DOM dynamically
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-accent', theme.accentColor);
    root.style.setProperty('--color-darkbg', theme.darkBgColor);
  }, [theme]);

  // Auth Helper
  const setAdminLogin = (login: boolean) => {
    setIsAdminLoggedIn(login);
    if (login) {
      sessionStorage.setItem('wc_admin_session', 'active');
    } else {
      sessionStorage.removeItem('wc_admin_session');
    }
  };

  // 1. Theme Controllers
  const updateTheme = (newTheme: Partial<ThemeConfig>) => {
    setTheme((prev) => ({ ...prev, ...newTheme }));
  };
  const resetTheme = () => {
    setTheme(DEFAULT_THEME);
  };

  // 2. SEO Controllers
  const updateSeo = (newSeo: Partial<SeoConfig>) => {
    setSeo((prev) => ({ ...prev, ...newSeo }));
  };

  // 3. Destinations CRUD
  const addDestination = (dest: Omit<Destination, 'id'>) => {
    const newId = `dest-${Date.now()}`;
    setDestinations((prev) => [...prev, { ...dest, id: newId }]);
  };
  const editDestination = (id: string, updated: Partial<Destination>) => {
    setDestinations((prev) => prev.map((d) => (d.id === id ? { ...d, ...updated } : d)));
  };
  const deleteDestination = (id: string) => {
    setDestinations((prev) => prev.filter((d) => d.id !== id));
  };

  // 4. Packages CRUD
  const addPackage = (pkg: Omit<TravelPackage, 'id'>) => {
    const newId = `pkg-${Date.now()}`;
    setPackages((prev) => [...prev, { ...pkg, id: newId }]);
  };
  const editPackage = (id: string, updated: Partial<TravelPackage>) => {
    setPackages((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };
  const deletePackage = (id: string) => {
    setPackages((prev) => prev.filter((p) => p.id !== id));
  };

  // 5. Services CRUD
  const editService = (id: string, updated: Partial<TravelService>) => {
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  // 6. Blog Posts CRUD
  const addBlogPost = (post: Omit<BlogPost, 'id' | 'date'>) => {
    const newId = `blog-${Date.now()}`;
    const dateStr = new Date().toISOString().slice(0, 10);
    setBlogPosts((prev) => [...prev, { ...post, id: newId, date: dateStr }]);
  };
  const editBlogPost = (id: string, updated: Partial<BlogPost>) => {
    setBlogPosts((prev) => prev.map((b) => (b.id === id ? { ...b, ...updated } : b)));
  };
  const deleteBlogPost = (id: string) => {
    setBlogPosts((prev) => prev.filter((b) => b.id !== id));
  };

  // 7. Testimonials CRUD
  const addTestimonial = (test: Omit<Testimonial, 'id'>) => {
    const newId = `t-${Date.now()}`;
    setTestimonials((prev) => [...prev, { ...test, id: newId }]);
  };
  const deleteTestimonial = (id: string) => {
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  // 8. Bookings CRUD
  const submitBooking = (booking: Omit<BookingInquiry, 'id' | 'submittedAt' | 'status'>) => {
    const newId = `inq-${Date.now()}`;
    const timestamp = new Date().toISOString();
    const newInquiry: BookingInquiry = {
      ...booking,
      id: newId,
      submittedAt: timestamp,
      status: 'Pending'
    };
    
    setBookings((prev) => [newInquiry, ...prev]);

    // Live update analytical metrics on booking events
    setStats((prev) => ({
      ...prev,
      totalBookings: prev.totalBookings + 1,
      conversionRate: Number((((prev.totalBookings + 1) / prev.visitors) * 100).toFixed(1))
    }));
  };

  const updateBookingStatus = (id: string, status: BookingInquiry['status']) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
  };

  const deleteBooking = (id: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== id));
  };

  // 9. Analytics helpers
  const incrementPageViews = () => {
    setStats((prev) => {
      const updatedViews = prev.pageViews + 1;
      const updatedVisitors = prev.visitors + (Math.random() > 0.7 ? 1 : 0);
      return {
        ...prev,
        pageViews: updatedViews,
        visitors: updatedVisitors,
        conversionRate: Number(((prev.totalBookings / updatedVisitors) * 100).toFixed(1))
      };
    });
  };

  // 10. Direct texts
  const updateCmsText = (newText: Partial<AppContextType['cmsText']>) => {
    setCmsText((prev) => ({ ...prev, ...newText }));
  };

  return (
    <AppContext.Provider
      value={{
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
        submitBooking,
        updateBookingStatus,
        deleteBooking,
        stats,
        incrementPageViews,
        cmsText,
        updateCmsText,
        isAdminLoggedIn,
        setAdminLogin
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
}
