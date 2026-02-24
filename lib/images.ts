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
// LOGO — Used in Header, Footer, and site-wide
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
  // Homepage — currently no hero image (uses video + teal overlay)
  home: '/images/hero.png',

  // About page
  about: '/images/165-Hindley-10.jpg',

  // Portfolio page (reuses companies hero)
  portfolio: '/images/aerial-drone-view-of-soca-river-in-slovenia-at-sum-2025-03-25-02-59-48-utc.jpg',

  // Contact page
  contact: '/images/three-contemporary-builders-in-uniform-2025-03-16-04-36-05-utc.jpg',
} as const

// ---------------------------------------------------------------------------
// SERVICE IMAGES — Used on About page services section
// ---------------------------------------------------------------------------
export const SERVICE_IMAGES = {
  corporateAdvisory: '/images/corporateadvisory.jpg',
  capitalRaising: '/images/capitalraising.jpg',
  assetManagement: '/images/assetmanage.jpg',
} as const

// ---------------------------------------------------------------------------
// COMPANY CARD IMAGES — Used on Portfolio page company cards
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
