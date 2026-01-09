/**
 * Application-wide constants and configuration
 */

// Brand Colors
export const COLORS = {
  primary: '#b87333',      // Bronze (warm and professional)
  primaryHover: '#9d5f28', // Darker bronze
  dark: '#1A1A1A',         // Dark text
  darkGray: '#1C1C1C',     // Section headings
  mediumGray: '#5A5A5A',   // Body text
  lightGray: '#86837D',    // Muted text
  border: '#E8E4DA',       // Borders
  bgLight: '#FAF9F7',      // Light background
  bgLighter: '#FDFBF7',    // Lighter background
  accent: '#b87333',       // Bronze accent
  accentHover: '#9d5f28',  // Darker bronze for hover states
  white: '#FFFFFF',
} as const;

// Timings (in milliseconds)
export const TIMINGS = {
  imageTransition: 5000,      // Factory image carousel (slower)
  carouselResume: 3000,       // Resume after navigation
  carouselMouseLeave: 1000,   // Resume after mouse leave
  scrollDelay: 300,           // DOM ready delay
  animationStagger: 100,      // Stagger delay between elements
} as const;

// Carousel Configuration
export const CAROUSEL_CONFIG = {
  scrollAmount: 320,          // Pixels to scroll on nav button click
  categoryCardWidth: 128,     // Width of category cards (w-32 = 128px)
  categoryCardHeight: 128,    // Height of category cards (h-32 = 128px)
} as const;

// Animation Configuration
export const ANIMATION_CONFIG = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px',
} as const;

// Retailer Logos
export const RETAILER_LOGOS = [
  { name: 'Khazana', logo: '/logos/Khazana.png' },
  { name: 'GRT', logo: '/logos/grt.webp' },
  { name: 'Kumaran', logo: '/logos/kumaran.png' },
  { name: 'Lalitha', logo: '/logos/lalitha.webp' },
  { name: 'Malabar', logo: '/logos/Malabar.png' },
  { name: 'Pothys', logo: '/logos/pothys.webp' },
  { name: 'Saravana Selvarathinam', logo: '/logos/saravana selvarathinam.png' },
  { name: 'Thangamayil', logo: '/logos/Thangamayil.png' }
] as const;

// Factory Images
export const FACTORY_IMAGES = [
  '/Hands that make Silver Crafts/silver crafts1217.jpg',
  '/Hands that make Silver Crafts/silver crafts1286.jpg',
  '/Hands that make Silver Crafts/silver crafts1301.jpg',
  '/Hands that make Silver Crafts/silver crafts1385.jpg',
  '/Hands that make Silver Crafts/silver crafts1456-2.jpg',
  '/Hands that make Silver Crafts/silver crafts1528.jpg',
  '/Hands that make Silver Crafts/silver crafts1559.jpg',
  '/Hands that make Silver Crafts/silver crafts1604.jpg',
  '/Hands that make Silver Crafts/silver crafts1835.jpg',
  '/Hands that make Silver Crafts/silver crafts1909.jpg',
  '/Hands that make Silver Crafts/silver crafts1922.jpg',
  '/Hands that make Silver Crafts/silver crafts2000.jpg',
  '/Hands that make Silver Crafts/silver crafts2085.jpg',
  '/Hands that make Silver Crafts/silver crafts2122.jpg'
] as const;

// Home Page Carousel Images
export const HOME_CAROUSEL_IMAGES = [
  '/Home page carousel/1.webp',
  '/Home page carousel/2.webp',
  '/Home page carousel/3.webp',
  '/Home page carousel/4.webp',
  '/Home page carousel/5.webp',
  '/Home page carousel/6.webp',
  '/Home page carousel/7.webp',
  '/Home page carousel/8.webp',
  '/Home page carousel/9.webp',
  '/Home page carousel/Vel.webp',
  '/Home page carousel/11.webp',
  '/Home page carousel/12.webp',
  '/Home page carousel/13.webp',
  '/Home page carousel/14.webp',
  '/Home page carousel/15.webp',
  '/Home page carousel/16.webp'
] as const;

// Certifications
export const CERTIFICATIONS = [
  { src: '/Certifications/hallmark.svg', alt: 'Hallmark Certified', name: 'Hallmark' },
  { src: '/Certifications/MSME.png', alt: 'MSME Registered', name: 'MSME Registered' },
  { src: '/Certifications/gjiie.png', alt: 'GJIIE Member', name: 'GJIIE' },
  { src: '/Certifications/IBJA_logo-big.png', alt: 'IBJA Member', name: 'IBJA' },
  { src: '/Certifications/import-export-code-iec-dscraja.png', alt: 'Import Export Code', name: 'IEC' }
] as const;

// Quote Process Steps
export const QUOTE_STEPS = [
  { 
    step: '1', 
    title: 'Book a Consultation', 
    desc: 'Schedule a call to discuss your business goals and challenges' 
  },
  { 
    step: '2', 
    title: 'Get Your Growth Plan', 
    desc: 'Receive a customized strategy tailored to your business needs' 
  },
  { 
    step: '3', 
    title: 'Start Scaling', 
    desc: 'Implement proven strategies and watch your business grow' 
  }
] as const;

// Why Choose Us Features
export const FEATURES = [
  { 
    title: 'Proven Growth Strategies', 
    desc: 'Access battle-tested frameworks and strategies that have helped hundreds of businesses scale successfully' 
  },
  { 
    title: 'Expert Mentorship', 
    desc: 'Learn directly from successful entrepreneurs who have built and scaled multiple businesses' 
  },
  { 
    title: 'Strategic Planning', 
    desc: 'Get customized growth plans tailored to your industry, market, and business goals' 
  },
  { 
    title: 'Ongoing Support', 
    desc: 'Receive continuous guidance and support as you implement strategies and navigate challenges' 
  },
  { 
    title: 'Community Network', 
    desc: 'Connect with a community of ambitious business owners and share insights, opportunities, and experiences' 
  }
] as const;

