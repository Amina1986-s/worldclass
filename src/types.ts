/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Destination {
  id: string;
  name: string;
  continent: 'Asia' | 'Europe' | 'North America' | 'South America' | 'Africa' | 'Australia';
  country: string;
  image: string;
  rating: number;
  overview: string;
  attractions: string[];
  bestTimeToVisit: string;
  avgCost: number;
  popularPackageName: string;
}

export interface TravelPackage {
  id: string;
  destinationId: string;
  title: string;
  duration: string; // e.g., "7 Days, 6 Nights"
  category: 'Domestic' | 'International' | 'Luxury';
  price: number;
  originalPrice?: number;
  inclusionTags: string[];
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  isPopular?: boolean;
}

export interface TravelService {
  id: string;
  title: string;
  icon: string; // Lucide icon key name
  shortDescription: string;
  longDescription: string;
  features: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  image: string;
  isFeatured?: boolean;
  status: 'Published' | 'Scheduled' | 'Draft';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  comment: string;
  image: string;
  packageVisited: string;
}

export interface BookingInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  destinationId: string;
  packageId?: string;
  departureDate: string;
  durationDays: number;
  budgetPerPerson: number;
  passengersCount: number;
  notes?: string;
  submittedAt: string;
  status: 'Pending' | 'Contacted' | 'Approved' | 'Archived';
}

export interface SystemStats {
  visitors: number;
  pageViews: number;
  totalBookings: number;
  conversionRate: number;
}

export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  schemaType: string;
  sitemapEnabled: boolean;
}

export interface ThemeConfig {
  primaryColor: string; // Hex color e.g. "#3B82F6"
  secondaryColor: string; // Hex color e.g. "#10B981"
  darkBgColor: string; // Hex e.g. "#0B1120"
  accentColor: string; // Hex e.g. "#FBBF24"
  fontPair: 'Inter-Poppins' | 'Inter-SpaceGrotesk' | 'Inter-Outfit' | 'Inter-Playfair';
  buttonStyle: 'rounded-none' | 'rounded-md' | 'rounded-full';
  animationSpeed: 'slow' | 'medium' | 'fast';
  enableGlassmorphism: boolean;
  enableStarfield: boolean;
}
