# Vert Capital Branding Assets

This directory contains all Vert Capital branding assets including logos, photography, and other visual assets.

## Directory Structure

```
vert/
├── logo-white.svg          # White logo for dark backgrounds
├── logo-black.svg          # Black logo for light backgrounds
├── logo-color.svg          # Full color logo
├── favicon.ico             # Website favicon
├── og-image.jpg            # Open Graph social preview (1200x630)
├── twitter-card.jpg        # Twitter card image (1200x675)
├── company/                # Company and team photography
│   ├── board/              # Board member headshots
│   ├── team/               # Team photos
│   └── office/             # Office photos
├── projects/               # Project site photography
│   ├── doboj/              # Doboj project photos
│   ├── jezero/             # Jezero project photos
│   └── [other-projects]/   # Other project folders
└── hero/                   # Hero images and videos
    ├── homepage/           # Homepage hero assets
    └── sections/           # Section hero images
```

## Asset Specifications

### Logos
- **Format:** SVG (preferred) or PNG with transparency
- **Size:** Vector-based (SVG) or minimum 500px width (PNG)
- **Usage:** See PHASE2_BRANDING_GUIDE.md for implementation details

### Favicons
- **favicon.ico:** 32x32 and 16x16 sizes
- **Apple Touch Icon:** 180x180 PNG
- **Android Chrome:** 192x192 and 512x512 PNG

### Photography
- **Format:** JPEG or WebP
- **Resolution:** Minimum 1920x1080 for hero images, 800x800 for portraits
- **Optimization:** Compressed for web (target < 200KB per image)

### Social Media Images
- **Open Graph:** 1200x630 JPEG
- **Twitter Card:** 1200x675 JPEG

## Implementation Status

- [ ] Logos added
- [ ] Favicons replaced
- [ ] Board member photos added
- [ ] Project photography added
- [ ] Hero images added
- [ ] Social media preview images added

## Notes

- All images should be optimized for web before adding
- Use descriptive filenames (e.g., `board-john-smith.jpg`)
- Maintain consistent aspect ratios within each category
- Keep original high-resolution assets in a separate backup location

---

**For implementation instructions, see:** `/PHASE2_BRANDING_GUIDE.md`
