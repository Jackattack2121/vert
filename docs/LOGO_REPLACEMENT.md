# Logo Replacement Guide

## Current Setup

The logo is referenced through a single constant in `/lib/images.ts`:

```typescript
export const LOGO = {
  main: '/vert-logo.svg',   // Used in Header, Footer, Why Yugo Metals
  white: '/vert-logo.svg',  // Reserved for a dedicated white variant
  favicon: '/favicon.ico',  // Browser tab icon
}
```

All components import from this file — change the path once, it updates everywhere.

---

## Step 1: Prepare Your Logo Files

You need:

| File | Format | Size | Where it goes |
|------|--------|------|---------------|
| Main logo | SVG (preferred) or PNG | Any (vector) | `/public/your-logo.svg` |
| White logo variant | SVG or PNG | Same as main | `/public/your-logo-white.svg` |
| Favicon | ICO or PNG | 32x32 | `/public/favicon.ico` |
| Apple touch icon | PNG | 180x180 | `/public/apple-touch-icon.png` |
| OG image | PNG or JPG | 1200x630 | `/public/og-image.png` |

### Logo format notes:
- **SVG is strongly preferred** — it scales perfectly at any size
- If using PNG, export at **2x** (e.g., 300x88 for a 150x44 display) for retina screens
- Ensure transparent background

---

## Step 2: Drop Files In

```
public/
  your-logo.svg          <-- main logo
  your-logo-white.svg    <-- white variant (optional)
  favicon.ico            <-- browser favicon
  apple-touch-icon.png   <-- Apple devices (optional)
```

---

## Step 3: Update the Constants

Open `/lib/images.ts` and change:

```typescript
export const LOGO = {
  main: '/your-logo.svg',
  white: '/your-logo-white.svg',
  favicon: '/favicon.ico',
}
```

That's it. The logo updates across the entire site.

---

## Step 4: Handle Dark/Light Backgrounds (if needed)

Currently the logo uses CSS filters to appear white on dark backgrounds:

**Header** (`components/layout/Header.tsx`):
```tsx
style={{ filter: isDarkHeader ? 'brightness(0) invert(1)' : 'brightness(1) invert(0)' }}
```

**Footer** (`components/layout/Footer.tsx`):
```tsx
className="... brightness-0 invert"
```

### If your logo already has color variants:

If you supply a separate white logo file (`LOGO.white`), you can replace the CSS filter approach:

1. In **Header.tsx**: Use `LOGO.white` when `isDarkHeader` is true, `LOGO.main` otherwise
2. In **Footer.tsx**: Replace the `brightness-0 invert` classes with just using `LOGO.white`

### If your logo works with filters:

No changes needed. The current filter approach works well with single-color SVGs.

---

## Step 5: Update Metadata (Optional)

To add favicon and OG image metadata, update `/app/[locale]/layout.tsx`:

```typescript
export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata.homepage' });

  return {
    title: t('title'),
    description: t('description'),
    icons: {
      icon: [
        { url: '/favicon.ico' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    openGraph: {
      // ...existing config
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
  };
}
```

---

## Where the Logo Appears

| Location | Component | Notes |
|----------|-----------|-------|
| Header (desktop) | `components/layout/Header.tsx` | 150x44, inverted on dark bg |
| Header (mobile menu) | `components/layout/Header.tsx` | 120x40, always white |
| Footer | `components/layout/Footer.tsx` | 150x44, always white |
| Why Yugo Metals hero | `app/[locale]/why-yugo-metals/page.tsx` | 400x160, always white |
| Browser tab | `public/favicon.ico` | 32x32 |

---

## Quick Checklist

- [ ] Drop logo file(s) into `/public/`
- [ ] Update `LOGO.main` path in `/lib/images.ts`
- [ ] Update `LOGO.white` if you have a white variant
- [ ] Replace `favicon.ico` if you have a new one
- [ ] Check header on both light and dark backgrounds
- [ ] Check footer (dark background)
- [ ] Check Why Yugo Metals page (dark background)
- [ ] Check mobile menu (dark background)
