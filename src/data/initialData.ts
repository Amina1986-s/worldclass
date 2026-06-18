/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Destination, TravelPackage, TravelService, BlogPost, Testimonial, ThemeConfig, SeoConfig, BookingInquiry, SystemStats } from '../types';

import tokyoImg from '../assets/images/tokyo_kyoto_odyssey_1781805647569.jpg';
import parisRivieraImg from '../assets/images/french_riviera_odyssey_1781805668436.jpg';
import sydneyReefImg from '../assets/images/sydney_reef_expedition_1781805684300.jpg';

export const INITIAL_DESTINATIONS: Destination[] = [
  {
    id: 'dest-tokyo',
    name: 'Tokyo & Kyoto Odyssey',
    continent: 'Asia',
    country: 'Japan',
    image: tokyoImg,
    rating: 4.92,
    overview: 'Witness a captivating intersection of ultra-modern skyscrapers, neon-lit alleys, tranquil shrines, and timeless bamboo forests. Experience Michelin-starred culinary craft, high-speed Shinkansen transits, and traditional Ryokan hospitality.',
    attractions: ['Shibuya Crossing', 'Fushimi Inari-taisha Shrines', 'Mount Fuji Vista', 'Sensō-ji Temple', 'Arashiyama Bamboo Grove'],
    bestTimeToVisit: 'March to May (Cherry Blossom) or October to November (Autumn Leaves)',
    avgCost: 3400,
    popularPackageName: 'The Imperial Legacy'
  },
  {
    id: 'dest-paris',
    name: 'Parisian Elegance & Loire Valley',
    continent: 'Europe',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    rating: 4.88,
    overview: 'The global capital of high art, gastronomy, fashion, and romance. Delve beyond the iconic steel arches of Eiffel into Parisian sidewalk cafes, historic palace galleries, and the majestic châteaux dotting the serene Loire countryside.',
    attractions: ['The Louvre Palace', 'Eiffel Tower Premium Access', 'Notre-Dame & Seine Cruise', 'Palace of Versailles', 'Château de Chambord'],
    bestTimeToVisit: 'April to June or September to October',
    avgCost: 4100,
    popularPackageName: 'L’Art de Vivre Exclusive'
  },
  {
    id: 'dest-bali',
    name: 'Ubud Spiritual & Beach Bliss',
    continent: 'Asia',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    rating: 4.85,
    overview: 'A tropical paradise characterized by majestic volcanic peaks, cascading rice terraces, and coral-fringed beaches matched with deep, ancient artistic traditions, serene yoga retreats, and luxurious seaside villas.',
    attractions: ['Tegallalang Rice Terraces', 'Uluwatu Cliffside Temple', 'Nusa Penida Coastal Cliffs', 'Ubud Sacred Monkey Forest', 'Mount Batur Sunrise'],
    bestTimeToVisit: 'May to September (Dry Season)',
    avgCost: 1900,
    popularPackageName: 'Tropical Serenity Retreat'
  },
  {
    id: 'dest-rome',
    name: 'Eternal Empire Classics',
    continent: 'Europe',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80',
    rating: 4.90,
    overview: 'Unearth millennia of civilization where ancient gladiatorial ruins exist in perfect harmony with Renaissance palaces and buzzing espresso bars. Feast on Roman culinary arts and visit the grand galleries of the Vatican.',
    attractions: ['The Colosseum & Forum', 'Vatican Museums & Sistine Chapel', 'Trevi Fountain', 'Pantheon Dome', 'Piazza Navona'],
    bestTimeToVisit: 'April to May or September to October',
    avgCost: 3200,
    popularPackageName: 'The Grand Gladiator Grandeur'
  },
  {
    id: 'dest-swiss-alps',
    name: 'Majestic Peaks of Switzerland',
    continent: 'Europe',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    rating: 4.96,
    overview: 'A visual symphony of emerald meadows, emerald-colored pristine glacial lakes, and snow-capped alpine peaks of the Matterhorn. Ride legendary scenic rails, ski pristine powder, and indulge in gourmet Swiss chocolatiers.',
    attractions: ['Jungfraujoch - Top of Europe', 'Zermatt & Matterhorn Views', 'Lake Geneva Promenade', 'Interlaken Mountain Adventure', 'Bernese Oberland Villages'],
    bestTimeToVisit: 'December to March (Skiing) or June to September (Hiking)',
    avgCost: 4800,
    popularPackageName: 'Peak Panorama & Luxury Chalet'
  },
  {
    id: 'dest-sydney',
    name: 'Sydney Harbour & Queensland Reefs',
    continent: 'Australia',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80',
    rating: 4.87,
    overview: 'Experience the energetic, solar-bathed harbors of Sydney before plunging into the world’s most magnificent marine ecosystem—the Great Barrier Reef. Marvel at dramatic sandstone cliffs in the Blue Mountains and taste iconic Hunter Valley wines.',
    attractions: ['Sydney Opera House Behind-The-Scenes', 'Great Barrier Reef Luxury Dive', 'Bondi Beach Coastal Walk', 'Blue Mountains Sandstone Canyons', 'Hunter Valley Private Vineyards'],
    bestTimeToVisit: 'September to November or March to May',
    avgCost: 5200,
    popularPackageName: 'Continental Wonders & Coral Reefs'
  },
  {
    id: 'dest-serengeti',
    name: 'Serengeti & Ngorongoro Wildlife',
    continent: 'Africa',
    country: 'Tanzania',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    rating: 4.95,
    overview: 'Embark on the ultimate raw wilderness experience. Watch the breathtaking annual Wildebeest Migration across vast golden savannahs and spot the fabled Big Five in the volcanic amphitheater of the Ngorongoro Crater.',
    attractions: ['Serengeti River Crossings', 'Ngorongoro Crater Safari Drive', 'Maasai Cultural Exchange', 'Hot Air Balloon at Dawn', 'Tarangire Baobab Forests'],
    bestTimeToVisit: 'June to October (Dry Season & Great Migration)',
    avgCost: 5500,
    popularPackageName: 'Ultimate Wild Horizon Private Safari'
  },
  {
    id: 'dest-rio',
    name: 'Rio Carnival & Amazon Frontier',
    continent: 'South America',
    country: 'Brazil',
    image: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80',
    rating: 4.79,
    overview: 'Succumb to the vibrant rhythmic beats of Samba in Rio, relax at the prestigious Copacabana and Ipanema shorelines, and voyage into the deep jungle canopies of the mysterious Rio Negro in the ancient Amazon Basin.',
    attractions: ['Christ the Redeemer Statue', 'Sugarloaf Mountain Aerial Cableway', 'Amazon Rainforest Eco-Tour', 'Ipanema Beach Walkway', 'Iguazu Falls Border Expedition'],
    bestTimeToVisit: 'December to March (Summer & Carnival Season)',
    avgCost: 3500,
    popularPackageName: 'Samba, Sand & Deep Rainforest'
  },
  {
    id: 'dest-ny',
    name: 'Manhattan Skyline & Niagara Wonders',
    continent: 'North America',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80',
    rating: 4.84,
    overview: 'Soak in the electric, cinematic energy of the world’s premier commercial and cultural hub. Enjoy private Broadway access, helicopter flights over the Hudson, and a scenic drive up-state to the thunderous majesty of Niagara Falls.',
    attractions: ['Empire State Building Sunset Entry', 'Broadway Behind the Curtain', 'Central Park Horse Carriage', 'Statue of Liberty & Ellis Guided', 'Niagara Falls Maid of the Mist'],
    bestTimeToVisit: 'September to November or April to June',
    avgCost: 3800,
    popularPackageName: 'Urban Giants & Thunder Water'
  }
];

export const INITIAL_PACKAGES: TravelPackage[] = [
  // Domestic Packages (Simulating high-end local luxury options within countries)
  {
    id: 'pkg-majestic-fuji',
    destinationId: 'dest-tokyo',
    title: 'Ryokan, Hot Springs & Mount Fuji Grandeur',
    duration: '5 Days, 4 Nights',
    category: 'Domestic',
    price: 1800,
    originalPrice: 2200,
    inclusionTags: ['Traditional Ryokan', 'Private Onsen', 'Fuji Trekking', 'Kaiseki Dinners'],
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    rating: 4.90,
    reviewsCount: 88,
    description: 'Escape the Tokyo rush with an exclusive local retreat in Hakone. Soak in geothermally heated pools overlooking Mt. Fuji, sleep on plush hand-woven tatami mats, and discover ancient cedar forests.',
    isPopular: false
  },
  {
    id: 'pkg-chateaux-loire',
    destinationId: 'dest-paris',
    title: 'Loire Castle estates & Vintage Wine Trails',
    duration: '6 Days, 5 Nights',
    category: 'Domestic',
    price: 2400,
    originalPrice: 2900,
    inclusionTags: ['Lighthouse Châteaux Visit', 'Private Wine Tasting', 'Electric Bike Tours', 'Gourmet Castles'],
    image: 'https://images.unsplash.com/photo-1549144511-f099e773c147?auto=format&fit=crop&w=800&q=80',
    rating: 4.86,
    reviewsCount: 42,
    description: 'Unwind along Europe’s most regal river valley. Walk through the private gardens of French Kings, explore castle halls, and participate in legendary vineyard cellars in Sancerre and Vouvray.',
    isPopular: false
  },

  // International Packages
  {
    id: 'pkg-imperial-legacy',
    destinationId: 'dest-tokyo',
    title: 'The Imperial Legacy: Tokyo, Kyoto & Osaka Custom Tour',
    duration: '10 Days, 9 Nights',
    category: 'International',
    price: 3600,
    originalPrice: 4200,
    inclusionTags: ['Bullet Train Pass', 'Expert Private Historian', 'Tea Ceremony Mastery', 'Sushi Workshop'],
    image: tokyoImg,
    rating: 4.94,
    reviewsCount: 145,
    description: 'Our signature Asian itinerary. Traverse sparkling corporate high-rises in Shinjuku, slow down under zen temple gardens in historical Kyoto, and end in the lively neon culinary capital of Osaka.',
    isPopular: true
  },
  {
    id: 'pkg-art-vivre',
    destinationId: 'dest-paris',
    title: "L'Art de Vivre Exclusive: Paris & French Riviera Odyssey",
    duration: '12 Days, 11 Nights',
    category: 'International',
    price: 4900,
    originalPrice: 5600,
    inclusionTags: ['5-Star Luxury Hotels', 'Riviera Yacht Cruise', 'VIP Louvre Access', 'Michelin Stars'],
    image: parisRivieraImg,
    rating: 4.93,
    reviewsCount: 124,
    description: 'Indulge in French perfection. Spend golden afternoons strolling the Seine, enjoy exclusive museum hours, and then fly with private charter down to the shimmering sands of Monaco, Cannes, and Nice.',
    isPopular: true
  },
  {
    id: 'pkg-reef-glamour',
    destinationId: 'dest-sydney',
    title: 'Great Barrier Reef & Sydney Yacht Expedition',
    duration: '11 Days, 10 Nights',
    category: 'International',
    price: 5400,
    originalPrice: 6200,
    inclusionTags: ['Luxury Coral Catamaran', 'Scuba Master Guide', 'Opera Seat Upgrades', 'Hunter Vineyards'],
    image: sydneyReefImg,
    rating: 4.89,
    reviewsCount: 96,
    description: 'An expansive expedition combining urban luxury with magnificent natural wonders. Sail private yachts in Sydney Harbour, dive with manta rays in Queensland, and visit ancient eucalyptus ranges.',
    isPopular: true
  },

  // Luxury Packages
  {
    id: 'pkg-serenity-retreat',
    destinationId: 'dest-bali',
    title: 'Tropical Serenity: Ultra-Luxury Private Bali Estates',
    duration: '8 Days, 7 Nights',
    category: 'Luxury',
    price: 3200,
    originalPrice: 3800,
    inclusionTags: ['Infinity Plunge Pool', 'Personal Butler 24/7', 'Helicopter Shoreline Tour', 'Private Spas'],
    image: 'https://images.unsplash.com/photo-1537953773315-2213cd4609c0?auto=format&fit=crop&w=800&q=80',
    rating: 4.97,
    reviewsCount: 202,
    description: 'Your own private tropical sanctuary. Housed in custom hand-sculpted teakwood estates over hanging cliffs in Ubud and Uluwatu. Features specialized Ayurvedic health packages, organic meals, and VIP airport fast-track.',
    isPopular: true
  },
  {
    id: 'pkg-chalet-peaks',
    destinationId: 'dest-swiss-alps',
    title: 'Chalet Summit: 5-Star Swiss Alps Estate & Private Rail Tour',
    duration: '9 Days, 8 Nights',
    category: 'Luxury',
    price: 6900,
    originalPrice: 7900,
    inclusionTags: ['Alpine Manor Chalet', 'Glacier Express First-Class', 'Private Ski Jet', 'Cheese & Fondue Masterclass'],
    image: 'https://images.unsplash.com/photo-1486916856992-e4db22c8df33?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    reviewsCount: 74,
    description: 'Live like royalty on the snow slopes. Settle into unmatched private chalets in Zermatt, enjoy open-hearth fires, ride first-class glass-roofed mountain express, and ski with former alpine Olympic medalists.',
    isPopular: true
  },
  {
    id: 'pkg-wild-horizon',
    destinationId: 'dest-serengeti',
    title: 'Ultimate Wild Horizon: Serengeti Luxury Tented Camp Safari',
    duration: '8 Days, 7 Nights',
    category: 'Luxury',
    price: 7500,
    originalPrice: 8500,
    inclusionTags: ['Four Seasons Safari Club', 'Private Open 4x4 Cruiser', 'Champagne Balloon Flight', 'Sunset Savannah Dining'],
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
    rating: 4.99,
    reviewsCount: 61,
    description: 'Witness the boundless Serengeti from ultimate luxury. Sleep at award-winning wilderness camps suspended over tracking routes. Wake to trumpeting herds and dine beneath sparkling starfields with private armed rangers.',
    isPopular: true
  }
];

export const INITIAL_SERVICES: TravelService[] = [
  {
    id: 'srv-flights',
    title: 'Flight Booking',
    icon: 'PlaneInside', // represented using Plane in lucide
    shortDescription: 'First & Business-Class Global Ingress',
    longDescription: 'Collaborating directly with 180+ global elite airlines, we procure premium seating configurations, access-restricted lounges, private charter transfers, and absolute priority check-in rights to secure seamless transcontinental transits.',
    features: ['Elite Business & First Class Priority Allocation', 'Private Aviation & Charter Bookings', 'Dedicated 24/7 Flight Monitoring Desk', 'Complimentary In-Flight Amenity Customization']
  },
  {
    id: 'srv-hotels',
    title: 'Hotel Reservations',
    icon: 'Hotel',
    shortDescription: 'The World’s Most Celebrated 5-Star Retreats',
    longDescription: 'Step into unmatched luxurious comfort. Our exclusive membership network grants you instant room upgrades, priority late check-outs, custom spa credits, and bespoke hospitality at Mandarin Oriental, Aman, and Ritz-Carlton locations.',
    features: ['VIP Priority Room Upgrades & Best Rate Guarantee', 'Exclusive On-Site Dining & Spa Allowances', 'Pre-Vaporized Scent & Bedding Customization', 'Signature Welcoming Platters']
  },
  {
    id: 'srv-visa',
    title: 'Visa Assistance',
    icon: 'FileText',
    shortDescription: 'Fast-Track International Ingress & Diplomacy',
    longDescription: 'Bypass stressful bureaucratic queues. Our legal and global mobility specialists handle your document certifications, diplomatic visa applications, and fast-track processing so that you enter your destinations smoothly.',
    features: ['Bespoke Concierge Dossier Preparation', 'Dedicated Diplomatic Channel Expeditions', 'Corporate Multi-Entry Visas & Golden Passports', 'Real-Time Application Status Alerts']
  },
  {
    id: 'srv-packages',
    title: 'Holiday Packages',
    icon: 'Compass',
    shortDescription: 'Curated All-Inclusive Global Escapes',
    longDescription: 'Meticulously planned journeys balancing historic excursions, premium regional dining, breathtaking private transits, and guided adventures. Live out authentic local stories curated by destination historians.',
    features: ['All-Inclusive Accommodation, Dinners & Transits', 'Fully Customized, Responsive Itinerary Schedules', 'Uninhibited Access to Sold-Out Heritage Parks', 'Native English-Speaking Local Historians']
  },
  {
    id: 'srv-cruises',
    title: 'Cruise Booking',
    icon: 'Ship',
    shortDescription: 'Celestial Floating Resorts & Intimate Yachts',
    longDescription: 'Sail through cobalt-colored seas. Choose from opulent ocean liners or ultra-private sailing yachts traversing the French Riviera, Greek Isles, Caribbean coves, or dramatic Alaskan fjords with top-tier cabin suites.',
    features: ['Luxury Suite & Private Balcony Assignments', 'All-Inclusive On-Board Fine Dine Michelin Concepts', 'Private Marina Shore Excursions at Ports', 'Royal Butler & Lounge Passes Included']
  },
  {
    id: 'srv-corporate',
    title: 'Corporate Travel',
    icon: 'Briefcase',
    shortDescription: 'High-Velocity Executive Logistics Engines',
    longDescription: 'Designed for global boards, international delegations, and fast-paced executives. We align flights, meetings, private work lounges, secure cars, and expense-reporting trackers to maximize corporate efficiency.',
    features: ['Dedicated Corporate Travel Manager 24/7/365', 'Bulk Executive Fare Negotiations & Air-Miles Sync', 'Group Flight Scheduling & VIP Airport Terminals', 'Centralized Real-Time Billing & Invoicing']
  },
  {
    id: 'srv-luxury',
    title: 'Luxury Tours',
    icon: 'Gem',
    shortDescription: 'The Pinnacle of Personal Jetset Lifestyles',
    longDescription: 'Crafted without limits. Access restricted historic vaults, charter private helicopters over glaciers, hold private banquets at historical fortresses, and enjoy standard 24/7 white-glove personal concierge attention.',
    features: ['Private Jet & Helicopter Charter Inclusions', 'Exclusive Closures of Historic Sites for Private Viewing', 'Bespoke Private Sommelier-Led Dinners', 'Specialist Personal Security Attachments']
  },
  {
    id: 'srv-honeymoon',
    title: 'Honeymoon Packages',
    icon: 'Heart',
    shortDescription: 'Intimate Coastal Sanctuaries & Romance',
    longDescription: 'Celebrate timeless bonds in magical environments. From over-water glass bungalows in Bora Bora to rustic castle turrets in Scotland, we deliver candlelit sandbank dinners, coupling treatments, and absolute privacy.',
    features: ['Complimentary Champagne & Petal Room Styling', 'Private Sunset Sandbank Dinners with Violinists', 'Couples Massage & Rejuvenating Sea Spas', 'Romantic Lifestyle Photo-Shoot Excursion']
  },
  {
    id: 'srv-group',
    title: 'Group Tours',
    icon: 'Users',
    shortDescription: 'Synchronized Expeditions for Elite Gatherings',
    longDescription: 'Unifying family reunions, hobby associations, or private membership clubs. We orchestrate larger luxury transits, private banquets, multi-room boutique lodge buyouts, and customized interactive group itineraries.',
    features: ['Private Luxury Coach & VIP Bus Charters', 'Full-Boutique Lodge Buyouts & Private Castles', 'Custom Multi-lingual Group Guides', 'Comprehensive Micro-Activity Scheduling']
  },
  {
    id: 'srv-insurance',
    title: 'Travel Insurance',
    icon: 'ShieldCheck',
    shortDescription: 'Fortress Protection for Global Explorers',
    longDescription: 'Venture forth with absolute absolute peace of mind. Our premier global policy coverages insure trip cancellations, instant medical evacuations, lost elite assets, flight delays, and personal liability globally.',
    features: ['Multi-Million Dollar Global Medical Evacuation Cover', 'Zero-Deductible Tech & Valuables Protection', 'Instant Flight Interruption Cash Reimbursements', '24/7 International Emergency Helpline Support']
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: '10 Unchartered European Valleys to Discover This Summer',
    excerpt: 'Step away from the crowded Parisian galleries and Venetian canals. We explore ten pristine valleys in Switzerland, France, and Italy that offer absolute serenity.',
    content: 'Mass tourism has altered the character of many legendary European landmarks during mid-summer. However, nestled in the shadows of the Bernese Alps, or along the coastal folds of the Italian Dolomites, lie isolated micro-communities that retain their crystalline historic charm.\n\nIn Switzerland’s Lauterbrunnen, seventy-two waterfalls plunge into emerald alpine grasses. Meanwhile, the stunning Val Pellice in Piedmont, Italy remains highly intact, offering mountain hikers traditional chestnut-honey tastings and trails unaffected by crowds.\n\nTo truly appreciate Europe, travel slow. Hire custom hybrid bicycles, rent a private stone villa in the Loire Valley, and dine with third-generation olive oil pressers in rural Provence...',
    author: 'Elena Rostova',
    authorRole: 'Chief Travel Editor',
    date: '2026-05-12',
    readTime: '6 mins read',
    category: 'Travel Guides',
    tags: ['Europe', 'Summer Travel', 'Hidden Gems', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80',
    isFeatured: true,
    status: 'Published'
  },
  {
    id: 'blog-2',
    title: 'The Art of the Slow Ryokan: Inside Kyoto’s Imperial Retreats',
    excerpt: 'Beyond high-speed Shinkansen rails and robot cafes, Japan’s soul is preserved inside its quiet sliding shoji screens. Learn how to experience zen Ryokans.',
    content: 'Entering a traditional Japanese Ryokan is like stepping into a hand-painted 17th-century scroll. The fragrance of freshly shaved Tatami reed mats, the soft splash of trickling hot spring water in rocky exterior baths, and the quiet bow of your dedicated Nakai-san (hostess) instantly quietens modern digital noises.\n\nIn Kyoto, institutions like Tawaraya have hosted legends for over three hundred years. Here, dinner is not a meal, but Kaiseki—a twelve-course seasonal poem expressed through fresh seasonal botanicals, ocean-caught bonito, and local pottery craft.\n\nOur travel planners share the crucial etiquette rules: take off your shoes at the genkan platform, always bathe before entering the clear hot spring, and let your body sink into the exquisite slow speed of Japanese luxury...',
    author: 'Kenji Sato',
    authorRole: 'East Asia Specialist',
    date: '2026-06-02',
    readTime: '8 mins read',
    category: 'Cultural Insights',
    tags: ['Japan', 'Ryokan', 'Luxury Travel', 'Kyoto'],
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    status: 'Published'
  },
  {
    id: 'blog-3',
    title: 'The Safari of Tomorrow: Sustainable Wildlife Conservation',
    excerpt: 'Modern wilderness travel has transcended the typical sightseeing tour. We highlight how Serengeti lodges are fighting poaching and restoring ancient savannahs.',
    content: 'The Serengeti savannah holds our planet’s deepest ancient rhythm. Every year, over two million wildebeests migrate across dangerous waters. But today, wild ecosystems require intelligent guardrails.\n\nToday’s luxury safari lodges—such as those run by Singita and the Four Seasons—have fundamentally fused high-end hospitality with intense local conservation efforts. By buying a single luxury travel package, you directly fund armed anti-poaching squads, veterinary operations, and indigenous educational academies.\n\nIn this article, our leading wildlife guide explains how solar-powered 4x4 expedition vehicles allow guests to glide silently within feet of lions and cheetahs without emitting carbon exhaust or disruptive engines...',
    author: 'Michael Adaba',
    authorRole: 'Lead Wildlife Guide',
    date: '2026-06-14',
    readTime: '5 mins read',
    category: 'Sustainability',
    tags: ['Africa', 'Safari', 'Conservation', 'Wilderness'],
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
    isFeatured: false,
    status: 'Published'
  }
];

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Sir Reginald Sterling',
    location: 'London, United Kingdom',
    rating: 5,
    comment: 'WorldClass orchestrated our multi-generational safari in the Serengeti flawlessly. The private aircraft, the luxury tented camps, and the expertise of our guide Michael was simply celestial. A masterclass in luxury coordination.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400',
    packageVisited: 'Ultimate Wild Horizon Tented Safari'
  },
  {
    id: 't-2',
    name: 'Alexandra Dupont',
    location: 'Geneva, Switzerland',
    rating: 5,
    comment: 'The Bali Serenity Retreat exceeded every expectation. Our private estate had the most beautiful cliffside infinity pool, and the dedicated personal butler was incredibly polite and intuitive. I will never book another way.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400',
    packageVisited: 'Tropical Serenity Ubud Estates'
  },
  {
    id: 't-3',
    name: 'Dr. Hiroshi Tanaka',
    location: 'Tokyo, Japan',
    rating: 5,
    comment: 'Managing corporate luxury excursions for board members requires extreme micro-precision. The Swiss Alps Chalet package was flawlessly integrated—private Glacier Express cars, pristine high-altitude safety, and Michelin catering.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400',
    packageVisited: '5-Star Swiss Alps Estate Tour'
  }
];

export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#0A2540', // Deep Ocean Blue
  secondaryColor: '#3B82F6', // Sky Blue
  darkBgColor: '#0B1120', // Dark Mode Base
  accentColor: '#FBBF24', // Golden Accent
  fontPair: 'Inter-Poppins',
  buttonStyle: 'rounded-md',
  animationSpeed: 'medium',
  enableGlassmorphism: true,
  enableStarfield: true
};

export const DEFAULT_SEO: SeoConfig = {
  metaTitle: 'WORLDCLASS | Premium International Travel Agency & Global Luxury Tours',
  metaDescription: 'Discover the world with WORLDCLASS luxury travel designers. Bespoke 5-star packages, private safari tent camps, business charters, and custom international heritage journeys worldwide.',
  keywords: 'luxury travel agency, bespoke tour operators, international travel packages, honeymoon resorts, private flight charter, custom tours',
  ogTitle: 'WORLDCLASS Luxury Tours - Signature Global Adventures',
  ogDescription: 'Curating the peak of private international travel with meticulous flight, hotel, and visa assistance.',
  ogImage: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&h=630',
  schemaType: 'TravelAgency',
  sitemapEnabled: true
};

export const INITIAL_BOOKINGS: BookingInquiry[] = [
  {
    id: 'inq-1',
    fullName: 'Charlotte Huntington',
    email: 'charlotte.h@vanguardcap.com',
    phone: '+44 7911 123456',
    destinationId: 'dest-tokyo',
    packageId: 'pkg-imperial-legacy',
    departureDate: '2026-10-15',
    durationDays: 10,
    budgetPerPerson: 5000,
    passengersCount: 2,
    notes: 'Requesting the premium cherry blossom and autumn Ryokan itinerary with first-class tickets on All Nippon Airways and a private tea master in Kyoto.',
    submittedAt: '2026-06-17T09:12:30.000Z',
    status: 'Pending'
  },
  {
    id: 'inq-2',
    fullName: 'Marcus Aurelius Vance',
    email: 'marcus@vancecreatives.co',
    phone: '+1 (555) 019-2834',
    destinationId: 'dest-serengeti',
    packageId: 'pkg-wild-horizon',
    departureDate: '2026-08-20',
    durationDays: 8,
    budgetPerPerson: 9000,
    passengersCount: 4,
    notes: 'Family trip with active kids. We need connecting luxury canvas family suites, an open-roof Land Rover and dietary accommodations (gluten-free).',
    submittedAt: '2026-06-18T06:45:00.000Z',
    status: 'Contacted'
  }
];

export const INITIAL_STATS: SystemStats = {
  visitors: 12840,
  pageViews: 45920,
  totalBookings: 1840,
  conversionRate: 14.3
};
