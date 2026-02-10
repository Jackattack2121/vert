# Phase 2 Branding Update Guide

This guide outlines the steps needed to replace Yugo Metals branding with Vert Capital branding.

## Required Assets

### Logo Files

Please provide the following logo files in the `public/vert/` directory:

1. **Primary Logos**
   - `logo-white.svg` - White logo for dark backgrounds (header when transparent)
   - `logo-black.svg` - Black logo for light backgrounds (header when scrolled, footer)
   - `logo-color.svg` - Full color logo (for general use)

2. **Favicon**
   - `favicon.ico` - 32x32 and 16x16 ICO format
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `apple-touch-icon.png` - 180x180 for iOS
   - `android-chrome-192x192.png` - For Android
   - `android-chrome-512x512.png` - For Android

3. **Social Media**
   - `og-image.jpg` - 1200x630 for Open Graph (Facebook, LinkedIn)
   - `twitter-card.jpg` - 1200x675 for Twitter cards

### Photography

Create directories and add professional photography:

#### Company Photography
`public/vert/company/`
- Board member headshots (professional portraits, 800x800px minimum)
- Office/team photos (1920x1080px)
- Company event photos

#### Project Photography
`public/vert/projects/`
- Mining site photos (high-resolution, 1920x1080px minimum)
- Aerial shots of projects
- Equipment and operations photos
- Geological samples and core photos

#### Hero Images
`public/vert/hero/`
- Homepage hero image/video (1920x1080px or 3840x2160px for 4K)
- Section hero images for key pages

## Files to Update

### 1. Logo References

#### Header Component
**File:** `components/layout/Header.tsx`

Current:
```tsx
<img src="/yugo/images/whitelogo.png" />
<img src="/yugo/images/blacklogo.png" />
```

Update to:
```tsx
<img src="/vert/logo-white.svg" />
<img src="/vert/logo-black.svg" />
```

#### Footer Component
**File:** `components/layout/Footer.tsx`

Current:
```tsx
<img src="/yugo/images/whitelogo.png" />
```

Update to:
```tsx
<img src="/vert/logo-white.svg" />
```

### 2. Favicon Files

**Files to replace:**
- `app/favicon.ico`
- `public/apple-touch-icon.png`
- `public/android-chrome-192x192.png`
- `public/android-chrome-512x512.png`

**File to update:** `app/layout.tsx`

Add Open Graph images:
```tsx
export const metadata: Metadata = {
  // ... existing metadata
  openGraph: {
    images: ['/vert/og-image.jpg'],
  },
  twitter: {
    images: ['/vert/twitter-card.jpg'],
  },
};
```

### 3. Board of Directors Photos

**File:** `app/[locale]/company/board-of-directors/page.tsx`

Update director photo paths from:
```tsx
image: "/yugo/team/director-name.jpg"
```

To:
```tsx
image: "/vert/company/director-name.jpg"
```

### 4. Project Pages

Update all project pages in `app/[locale]/projects/*/page.tsx`:

From:
```tsx
image: "/yugo/projects/project-name.jpg"
```

To:
```tsx
image: "/vert/projects/project-name.jpg"
```

### 5. Homepage Hero

**File:** `app/[locale]/page.tsx`

Update hero images/videos:
```tsx
<video src="/vert/hero/hero-video.mp4" />
<Image src="/vert/hero/hero-image.jpg" />
```

## Color Palette

Verify and update the brand color palette in `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    // Vert Capital primary colors
    50: '#...',
    100: '#...',
    // ... etc
  },
  secondary: {
    // Secondary brand colors
  },
  accent: {
    // Accent colors for CTAs and highlights
  }
}
```

## Brand Guidelines

### Logo Usage

1. **Minimum Size**
   - Digital: 120px width minimum
   - Print: 25mm width minimum

2. **Clear Space**
   - Maintain clear space equal to height of "V" letter around logo
   - No other elements within this space

3. **Backgrounds**
   - Use white logo on dark backgrounds
   - Use black logo on light backgrounds
   - Ensure minimum contrast ratio of 4.5:1

### Typography

Current font stack (update if needed):
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', ...
```

### Photography Style

1. **Professional Quality**
   - High resolution (minimum 1920px width)
   - Properly exposed and color-corrected
   - Consistent lighting and style

2. **Board Photos**
   - Professional headshots
   - Consistent background
   - Business professional attire
   - Same aspect ratio (1:1 or 4:5)

3. **Project Photos**
   - Clear, well-lit images
   - Show scale and context
   - Include branding when appropriate
   - Landscape orientation preferred

## Implementation Checklist

- [ ] Receive all required logo files from client
- [ ] Create `public/vert/` directory structure
- [ ] Add logos to `public/vert/`
- [ ] Update Header component logo paths
- [ ] Update Footer component logo paths
- [ ] Replace favicon files
- [ ] Update Open Graph metadata
- [ ] Receive board member photos
- [ ] Add board photos to `public/vert/company/`
- [ ] Update board of directors page
- [ ] Receive project photography
- [ ] Add project photos to `public/vert/projects/`
- [ ] Update all project pages
- [ ] Receive hero images/videos
- [ ] Add hero assets to `public/vert/hero/`
- [ ] Update homepage hero
- [ ] Verify color palette matches brand guidelines
- [ ] Update Tailwind config if needed
- [ ] Test all pages for broken image links
- [ ] Verify responsive behavior of logos
- [ ] Test dark/light logo switching in header
- [ ] Optimize all images for web (WebP format)
- [ ] Update alt text for accessibility
- [ ] Test social media preview images
- [ ] Verify favicon displays correctly across browsers

## Asset Optimization

Before adding images to the project:

1. **Compress Images**
   - Use tools like TinyPNG, ImageOptim, or Squoosh
   - Target: < 200KB for photos, < 50KB for logos

2. **Format Selection**
   - Logos: SVG (preferred) or PNG with transparency
   - Photos: WebP (preferred) or JPEG
   - Favicons: ICO, PNG

3. **Responsive Images**
   - Provide multiple sizes using Next.js Image component
   - Use srcset for different screen densities

## Contact for Asset Delivery

Please send all branding assets to:
- Email: [developer email]
- Cloud Storage: [Dropbox/Google Drive link]

## Notes

- All asset paths assume files are placed in `public/vert/` directory
- Original Yugo Metals assets in `public/yugo/` can be removed after replacement
- Keep backup of original branding assets
- Update this checklist as assets are received and implemented
- Test thoroughly on all device sizes before deployment

---

**Status:** Awaiting client branding assets

**Last Updated:** February 2024
