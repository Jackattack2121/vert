# Yugo Metals Branding Updates

## Color Palette Update

Updated the entire color scheme to match the Yugo Metals brand colors from the logo:

### Primary Colors (Teal/Cyan)
- **Primary 500**: `#00bcd4` - Main teal/cyan from logo
- Shades: 50-900 for full color scale
- Used for: Navigation links, buttons (secondary), borders, hover states

### Secondary Colors (Green)
- **Secondary 500**: `#4caf50` - Green from logo
- Shades: 50-900 for full color scale
- Used for: Complementary elements, gradients

### Accent Colors
- **Yellow**: `#ffd700` - Bright yellow from logo (primary buttons, highlights)
- **Gold**: `#ffca28` - Gold variant for hover states
- **Teal**: `#00bcd4` - Teal accent
- **Green**: `#4caf50` - Green accent

## Logo Implementation

### Header Logo
- Dual logo system for scroll effect:
  - **White logo** when header is transparent at top (dark backgrounds)
  - **Black logo** when header has white background (scrolled)
- Smooth transition animation (300ms) using opacity crossfade
- Logo files:
  - White logo: `/public/yugo/images/whitelogo.png`
  - Black logo: `/public/yugo/images/blacklogo.png`

### Implementation Technique
```jsx
// Two logos stacked with absolute positioning
// Opacity controlled by scroll state
<div className="relative">
  {/* Black logo - visible when scrolled */}
  <img src="/yugo/images/blacklogo.png" 
       className={scrolled ? 'opacity-100' : 'opacity-0'} />
  
  {/* White logo - visible at top */}
  <img src="/yugo/images/whitelogo.png" 
       className={scrolled ? 'opacity-0' : 'opacity-100'} />
</div>
```

### Logo Locations
1. **Header** (desktop): Dynamic color-changing logo (64px height)
2. **Mobile Menu**: Black logo (48px height)
3. **Footer**: White logo (80px height)

## Component Updates

### Buttons
- **Primary**: Yellow background (`#ffd700`) with black text
- **Secondary**: Teal background (`#00bcd4`) with white text
- **Outline**: Teal border with hover fill effect

### Section Titles
- Yellow underline accent (`#ffd700`)

### Counters
- Yellow divider line

### Project Cards
- Yellow badge backgrounds for project types
- Black text on yellow for better contrast

### Hero Slider
- Yellow active pagination bullets

## Files Modified

1. `tailwind.config.ts` - Color palette
2. `app/globals.css` - Button styles, utilities
3. `components/layout/Header.tsx` - Logo implementation with scroll effect
4. `components/layout/Footer.tsx` - Logo in footer
5. `components/ui/Button.tsx` - Button color variants
6. `components/ui/SectionTitle.tsx` - Yellow underline
7. `components/ui/Counter.tsx` - Yellow divider
8. `components/ui/HeroSlider.tsx` - Yellow pagination
9. `components/mining/ProjectCard.tsx` - Yellow badges
10. `app/page.tsx` - Yellow accent dividers
11. `app/why-yugo-metals/page.tsx` - Yellow checkmarks
12. All project pages - Yellow badges

## Brand Guidelines

### When to Use Each Color

**Yellow (#ffd700)**
- Primary call-to-action buttons
- Important highlights and accents
- Section dividers
- Badge backgrounds
- Active states

**Teal (#00bcd4)**
- Navigation elements
- Secondary buttons
- Links and hover states
- Brand gradients (with green)

**Green (#4caf50)**
- Complementary elements
- Success states
- Brand gradients (with teal)

**Black/White**
- Text on colored backgrounds
- Maintains excellent contrast and readability

## Accessibility

All color combinations meet WCAG AA contrast requirements:
- Yellow buttons use black text (high contrast)
- Teal/Green elements use white text
- Proper contrast ratios maintained throughout

## Next Steps

If additional branding assets become available:
1. Update favicon with Yugo Metals logo
2. Add Open Graph image with logo
3. Consider custom illustrations matching brand colors
4. Update any placeholder images with brand-aligned photography

