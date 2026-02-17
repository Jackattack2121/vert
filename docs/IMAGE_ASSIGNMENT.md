# Image Assignment Checklist

## How It Works

All image paths are centralized in **one file**: `/lib/images.ts`

To swap any image on the site:
1. Drop your image into `/public/images/`
2. Open `/lib/images.ts`
3. Change the path — done. It updates everywhere.

---

## Hero Images (1920x1080 JPG recommended)

These are the full-width background images at the top of every page.

### About & Corporate

- [ ] `HERO_IMAGES.about` — About page hero
  - File: `/app/[locale]/about/page.tsx`

- [ ] `HERO_IMAGES.services` — Services page hero
  - File: `/app/[locale]/services/page.tsx`

- [ ] `HERO_IMAGES.boardOfDirectors` — Board of Directors hero
  - File: `/app/[locale]/company/board-of-directors/page.tsx`

### Investor Pages

- [ ] `HERO_IMAGES.investors` — Investor Centre hero
  - File: `/app/[locale]/investors/page.tsx`

- [ ] `HERO_IMAGES.shareInformation` — Share Information hero
  - File: `/app/[locale]/investors/share-information/page.tsx`

- [ ] `HERO_IMAGES.financialReports` — Financial Reports hero
  - File: `/app/[locale]/investors/financial-reports/page.tsx`

- [ ] `HERO_IMAGES.presentations` — Presentations hero
  - File: `/app/[locale]/investors/presentations/page.tsx`

- [ ] `HERO_IMAGES.asxAnnouncements` — ASX Announcements hero
  - File: `/app/[locale]/investors/asx-announcements/page.tsx`

- [ ] `HERO_IMAGES.factSheet` — Fact Sheet hero
  - File: `/app/[locale]/investors/fact-sheet/page.tsx`

- [ ] `HERO_IMAGES.prospectus` — Prospectus hero
  - File: `/app/[locale]/prospectus/page.tsx`

- [ ] `HERO_IMAGES.calendar` — Calendar hero
  - File: `/app/[locale]/investors/calendar/page.tsx`

- [ ] `HERO_IMAGES.esg` — ESG hero
  - File: `/app/[locale]/investors/esg/page.tsx`

- [ ] `HERO_IMAGES.media` — Media hero
  - File: `/app/[locale]/investors/media/page.tsx`

### Company Pages

- [ ] `HERO_IMAGES.companies` — Companies listing hero
  - File: `/app/[locale]/companies/page.tsx`

- [ ] `HERO_IMAGES.projects` — Projects listing hero
  - File: `/app/[locale]/projects/page.tsx`

- [ ] `HERO_IMAGES.whyYugoMetals` — Why Yugo Metals hero
  - File: `/app/[locale]/why-yugo-metals/page.tsx`

### Other Pages

- [ ] `HERO_IMAGES.sponsorships` — Sponsorships hero
  - File: `/app/[locale]/sponsorships/page.tsx`

- [ ] `HERO_IMAGES.contact` — Contact hero
  - File: `/app/[locale]/contact/page.tsx`

- [ ] `HERO_IMAGES.investorContact` — Investor Contact hero
  - File: `/app/[locale]/investors/contact/page.tsx`

---

## Project Images (1200x800 JPG recommended)

Used on the Projects listing page, individual project detail pages, and the ProjectPicker dropdown in the header.

- [ ] `PROJECT_IMAGES.doboj`
  - Used in: `/app/[locale]/projects/page.tsx`, `/app/[locale]/projects/[slug]/page.tsx`, `ProjectPicker.tsx`

- [ ] `PROJECT_IMAGES.jezero`
  - Used in: same as above

- [ ] `PROJECT_IMAGES.sockovac`
  - Used in: same as above

- [ ] `PROJECT_IMAGES.sinjakovo`
  - Used in: same as above

- [ ] `PROJECT_IMAGES.cajnice`
  - Used in: same as above

---

## Company Page Images (Hero backgrounds for /company/[slug] pages)

- [ ] `COMPANY_PAGE_IMAGES.corporateDirectory`
  - Used in: `CompanyPageLayout.tsx` for `/company/corporate-directory`

- [ ] `COMPANY_PAGE_IMAGES.corporateGovernance`
  - Used in: `CompanyPageLayout.tsx` for `/company/corporate-governance`

- [ ] `COMPANY_PAGE_IMAGES.corporateResponsibility`
  - Used in: `CompanyPageLayout.tsx` for `/company/corporate-responsibility`

---

## Section Images (1200x800 JPG recommended)

Inline content images used within page sections.

- [ ] `SECTION_IMAGES.whyYugoBosnia` — Bosnia nature photo in split section
  - Used in: `/app/[locale]/why-yugo-metals/page.tsx`

- [ ] `SECTION_IMAGES.whyYugoMining` — Mining/construction photo in split section
  - Used in: `/app/[locale]/why-yugo-metals/page.tsx`

---

## Sponsorship Card Images (800x600 JPG recommended)

- [ ] `SPONSORSHIP_IMAGES.sponsorship1`
  - Used in: `/app/[locale]/sponsorships/page.tsx` card 1

- [ ] `SPONSORSHIP_IMAGES.sponsorship2`
  - Used in: `/app/[locale]/sponsorships/page.tsx` card 2

- [ ] `SPONSORSHIP_IMAGES.sponsorship3`
  - Used in: `/app/[locale]/sponsorships/page.tsx` card 3

---

## Company Card Images (800x600 JPG recommended)

- [ ] `COMPANY_CARD_IMAGES.company1`
  - Used in: `/app/[locale]/companies/page.tsx` card 1

- [ ] `COMPANY_CARD_IMAGES.company2`
  - Used in: `/app/[locale]/companies/page.tsx` card 2

- [ ] `COMPANY_CARD_IMAGES.company3`
  - Used in: `/app/[locale]/companies/page.tsx` card 3

---

## Logo

- [ ] `LOGO.main` — Main site logo (SVG preferred)
  - Used in: Header, Footer, Why Yugo Metals page
  - Current file: `/public/vert-logo.svg`

- [ ] `LOGO.favicon` — Browser tab icon
  - Current file: `/public/favicon.ico`
