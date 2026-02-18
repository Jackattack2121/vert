/**
 * Centralized Image Configuration
 * ================================
 * ALL image paths for the entire site live here.
 * To swap any image, just change the path below — it updates everywhere automatically.
 *
 * Instructions:
 * 1. Drop your images into /public/images/
 * 2. Update the paths below to match your filenames
 * 3. Save this file — images update across the entire site
 *
 * Recommended sizes:
 * - Hero images: 1920x1080 JPG (used as full-width page headers)
 * - Section images: 1200x800 JPG (used inline in content areas)
 * - Company logos: 400x400 PNG with transparency
 * - Site logo: SVG preferred, or PNG with transparency
 */

// ---------------------------------------------------------------------------
// LOGO — Used in Header, Footer, and Why Yugo Metals page
// ---------------------------------------------------------------------------
export const LOGO = {
  /** Main logo file (PNG). Used in header and footer. */
  main: '/images/vert_logo.png',

  /**
   * White variant for dark backgrounds.
   * Currently the main logo is inverted via CSS — if you supply a dedicated
   * white logo file, set it here and remove the CSS brightness/invert filters
   * in Header.tsx and Footer.tsx.
   */
  white: '/images/vert_logo.png',

  /** Browser tab icon */
  favicon: '/favicon.ico',
} as const

// ---------------------------------------------------------------------------
// HERO IMAGES — Full-width page header backgrounds (1920x1080 recommended)
// ---------------------------------------------------------------------------
export const HERO_IMAGES = {
  // Homepage — currently no hero image (uses solid teal + dot pattern)
  // If you want a background photo, set a path here and update page.tsx
  home: '/images/hero.png',

  // About & Corporate
  about: '/images/beautiful-nature-of-bosnia-and-herzegovina-travel-2025-08-29-06-16-13-utc.jpg',
  services: '/images/165-Hindley-10.jpg',
  boardOfDirectors: '/images/three-contemporary-builders-in-uniform-2025-03-16-04-36-05-utc.jpg',

  // Company Pages
  companies: '/images/the-truck-transports-the-minerals-from-the-top-vie-2025-10-16-12-14-08-utc.jpg',
  projects: '/images/yellow-excavator-digging-rocks-at-the-quarry-doin-2025-01-29-03-01-59-utc.jpg',
  whyYugoMetals: '/images/lush-mountain-forest-in-bosnia-aerial-shot-2025-09-09-00-26-14-utc.jpg',

  // Other Pages
  prospectus: '/images/beautiful-nature-of-bosnia-and-herzegovina-travel-2025-08-29-06-16-13-utc.jpg',
  sponsorships: '/images/aerial-drone-view-of-soca-river-in-slovenia-at-sum-2025-03-25-02-59-48-utc.jpg',
  contact: '/images/three-contemporary-builders-in-uniform-2025-03-16-04-36-05-utc.jpg',
} as const

// ---------------------------------------------------------------------------
// PROJECT IMAGES — Used on /projects listing, /projects/[slug], and ProjectPicker
// ---------------------------------------------------------------------------
export const PROJECT_IMAGES = {
  doboj: '/images/open-pit-mine-with-machines-2024-09-16-10-43-35-utc.jpg',
  jezero: '/images/flying-over-open-pit-gold-mine-quarry-in-rosia-m-2025-03-09-07-21-03-utc.jpg',
  sockovac: '/images/aerial-view-over-the-sand-pit-2025-10-13-02-21-23-utc.jpg',
  sinjakovo: '/images/yellow-excavator-digging-rocks-at-the-quarry-doin-2025-01-29-03-01-59-utc.jpg',
  cajnice: '/images/natural-quarry-is-located-near-road-against-backdr-2025-01-29-05-43-49-utc.jpg',
} as const

// ---------------------------------------------------------------------------
// COMPANY PAGE IMAGES — Used in CompanyPageLayout.tsx for /company/[slug] pages
// ---------------------------------------------------------------------------
export const COMPANY_PAGE_IMAGES = {
  corporateDirectory: '/images/beautiful-nature-of-bosnia-and-herzegovina-travel-2025-08-29-06-16-13-utc.jpg',
  corporateGovernance: '/images/lush-mountain-forest-in-bosnia-aerial-shot-2025-09-09-00-26-14-utc.jpg',
  corporateResponsibility: '/images/green-dense-forests-surround-old-mining-factory-wi-2025-08-28-11-53-12-utc.jpg',
} as const

// ---------------------------------------------------------------------------
// SECTION IMAGES — Inline content images (1200x800 recommended)
// ---------------------------------------------------------------------------
export const SECTION_IMAGES = {
  /** Why Yugo Metals — Bosnia nature photo in split section */
  whyYugoBosnia: '/images/beautiful-nature-of-bosnia-and-herzegovina-travel-2025-08-29-06-16-13-utc.jpg',
  /** Why Yugo Metals — mining/construction photo in split section */
  whyYugoMining: '/images/aerial-view-motor-grader-civil-at-construction-sit-2025-07-08-16-02-40-utc.jpg',
} as const

// ---------------------------------------------------------------------------
// SERVICE IMAGES — Used on /services page
// ---------------------------------------------------------------------------
export const SERVICE_IMAGES = {
  corporateAdvisory: '/images/corporateadvisory.jpg',
  capitalRaising: '/images/capitalraising.jpg',
  assetManagement: '/images/assetmanage.jpg',
} as const

// ---------------------------------------------------------------------------
// SPONSORSHIP CARD IMAGES
// ---------------------------------------------------------------------------
export const SPONSORSHIP_IMAGES = {
  sponsorship1: '/images/beautiful-nature-of-bosnia-and-herzegovina-travel-2025-08-29-06-16-13-utc.jpg',
  sponsorship2: '/images/lush-mountain-forest-in-bosnia-aerial-shot-2025-09-09-00-26-14-utc.jpg',
  sponsorship3: '/images/three-contemporary-builders-in-uniform-2025-03-16-04-36-05-utc.jpg',
} as const

// ---------------------------------------------------------------------------
// COMPANY CARD IMAGES — Used on /companies listing page
// ---------------------------------------------------------------------------
export const COMPANY_CARD_IMAGES = {
  meteoricResources: '/images/companies/imgi_5_Logo-Meteoric-Resources-Ltd-MEI.png',
  techGenMetals: '/images/companies/imgi_6_Logo-TechGen-Metals-Ltd-TG1-2.png',
  provinceResources: '/images/companies/imgi_7_Logo-Province-Resources-Ltd-PRL-1.png',
  peakMinerals: '/images/companies/imgi_8_Logo-Peak-Minerals-Ltd-PUA.png',
  msmCorporation: '/images/companies/imgi_9_Logo-MSM-Corporation-International-MSM-1.png',
  raidenResources: '/images/companies/imgi_10_Logo-Raiden-Resources-Ltd-RDN-1.png',
  minbosResources: '/images/companies/imgi_11_Logo-Minbos-Resources-Ltd-MNB-1.png',
  ragusaMinerals: '/images/companies/imgi_12_Logo-Ragusa-Minerals-Ltd-RAS.png',
} as const
