# Current Image Inventory

## Images Currently in Use

All paths are relative to `/public/`.

### Logo
| Constant | Current File | Used In |
|----------|-------------|---------|
| `LOGO.main` | `/vert-logo.svg` | Header, Footer, Why Yugo Metals |

### Hero Images (Page Backgrounds)
| Constant | Current File | Page |
|----------|-------------|------|
| `HERO_IMAGES.about` | `beautiful-nature-of-bosnia-and-herzegovina-travel-*.jpg` | About |
| `HERO_IMAGES.services` | `165-Hindley-10.jpg` | Services |
| `HERO_IMAGES.boardOfDirectors` | `three-contemporary-builders-in-uniform-*.jpg` | Board of Directors |
| `HERO_IMAGES.investors` | `open-pit-mine-with-machines-*.jpg` | Investor Centre |
| `HERO_IMAGES.shareInformation` | `flying-over-open-pit-gold-mine-quarry-*.jpg` | Share Information |
| `HERO_IMAGES.financialReports` | `natural-quarry-is-located-near-road-*.jpg` | Financial Reports |
| `HERO_IMAGES.presentations` | `aerial-view-motor-grader-civil-*.jpg` | Presentations |
| `HERO_IMAGES.asxAnnouncements` | `aerial-view-motor-grader-civil-*.jpg` | ASX Announcements |
| `HERO_IMAGES.factSheet` | `aerial-view-motor-grader-civil-*.jpg` | Fact Sheet |
| `HERO_IMAGES.prospectus` | `hero-mining-1.jpg` | Prospectus |
| `HERO_IMAGES.calendar` | `bosnia-and-herzegovina-jablanica-*.jpg` | Calendar |
| `HERO_IMAGES.esg` | `green-dense-forests-surround-old-mining-factory-*.jpg` | ESG |
| `HERO_IMAGES.media` | `lush-mountain-forest-in-bosnia-*.jpg` | Media |
| `HERO_IMAGES.companies` | `the-truck-transports-the-minerals-*.jpg` | Companies |
| `HERO_IMAGES.projects` | `yellow-excavator-digging-rocks-*.jpg` | Projects |
| `HERO_IMAGES.whyYugoMetals` | `lush-mountain-forest-in-bosnia-*.jpg` | Why Yugo Metals |
| `HERO_IMAGES.sponsorships` | `aerial-drone-view-of-soca-river-*.jpg` | Sponsorships |
| `HERO_IMAGES.contact` | `three-contemporary-builders-in-uniform-*.jpg` | Contact |
| `HERO_IMAGES.investorContact` | `three-contemporary-builders-in-uniform-*.jpg` | Investor Contact |

### Project Images (Cards + Detail Pages + ProjectPicker)
| Constant | Current File | Project |
|----------|-------------|---------|
| `PROJECT_IMAGES.doboj` | `open-pit-mine-with-machines-*.jpg` | Doboj |
| `PROJECT_IMAGES.jezero` | `flying-over-open-pit-gold-mine-quarry-*.jpg` | Jezero |
| `PROJECT_IMAGES.sockovac` | `aerial-view-over-the-sand-pit-*.jpg` | Sockovac |
| `PROJECT_IMAGES.sinjakovo` | `yellow-excavator-digging-rocks-*.jpg` | Sinjakovo |
| `PROJECT_IMAGES.cajnice` | `natural-quarry-is-located-near-road-*.jpg` | Cajnice |

### Company Page Images (CompanyPageLayout heroes)
| Constant | Current File | Page |
|----------|-------------|------|
| `COMPANY_PAGE_IMAGES.corporateDirectory` | `beautiful-nature-of-bosnia-*.jpg` | Corporate Directory |
| `COMPANY_PAGE_IMAGES.corporateGovernance` | `lush-mountain-forest-in-bosnia-*.jpg` | Corporate Governance |
| `COMPANY_PAGE_IMAGES.corporateResponsibility` | `green-dense-forests-surround-*.jpg` | Corporate Responsibility |

### Section Images (Inline Content)
| Constant | Current File | Usage |
|----------|-------------|-------|
| `SECTION_IMAGES.whyYugoBosnia` | `beautiful-nature-of-bosnia-*.jpg` | Why Yugo Metals - Bosnia photo |
| `SECTION_IMAGES.whyYugoMining` | `aerial-view-motor-grader-civil-*.jpg` | Why Yugo Metals - mining photo |

### Sponsorship Card Images
| Constant | Current File | Card |
|----------|-------------|------|
| `SPONSORSHIP_IMAGES.sponsorship1` | `beautiful-nature-of-bosnia-*.jpg` | Sponsorship 1 |
| `SPONSORSHIP_IMAGES.sponsorship2` | `lush-mountain-forest-in-bosnia-*.jpg` | Sponsorship 2 |
| `SPONSORSHIP_IMAGES.sponsorship3` | `three-contemporary-builders-*.jpg` | Sponsorship 3 |

### Company Card Images
| Constant | Current File | Card |
|----------|-------------|------|
| `COMPANY_CARD_IMAGES.company1` | `open-pit-mine-with-machines-*.jpg` | Company 1 |
| `COMPANY_CARD_IMAGES.company2` | `flying-over-open-pit-gold-mine-*.jpg` | Company 2 |
| `COMPANY_CARD_IMAGES.company3` | `aerial-view-over-the-sand-pit-*.jpg` | Company 3 |

---

## All Stock Photos on Disk

Located in `/public/images/`:

| Filename | Subject | Currently Used? |
|----------|---------|-----------------|
| `165-Hindley-10.jpg` | Office building | Yes (Services hero) |
| `aerial-drone-view-of-soca-river-in-slovenia-*.jpg` | River/nature aerial | Yes (Sponsorships hero) |
| `aerial-view-motor-grader-civil-*.jpg` | Construction site | Yes (multiple) |
| `aerial-view-over-the-sand-pit-*.jpg` | Sand pit mining | Yes (Sockovac project) |
| `beautiful-nature-of-bosnia-*.jpg` | Bosnia landscape | Yes (multiple) |
| `bosnia-and-herzegovina-jablanica-*.jpg` | Bosnia landscape | Yes (Calendar hero) |
| `flying-over-open-pit-gold-mine-*.jpg` | Gold mine aerial | Yes (multiple) |
| `green-dense-forests-surround-old-mining-factory-*.jpg` | Forest/mining | Yes (ESG hero) |
| `hero-mining-1.jpg` | Mining scene | Yes (Prospectus hero) |
| `lush-mountain-forest-in-bosnia-*.jpg` | Mountain forest | Yes (multiple) |
| `natural-quarry-is-located-near-road-*.jpg` | Quarry | Yes (Financial Reports, Cajnice) |
| `open-pit-mine-with-machines-*.jpg` | Open pit mine | Yes (multiple) |
| `the-truck-transports-the-minerals-*.jpg` | Mining truck | Yes (Companies hero) |
| `three-contemporary-builders-*.jpg` | Construction workers | Yes (multiple) |
| `yellow-excavator-digging-rocks-*.jpg` | Excavator | Yes (Projects hero, Sinjakovo) |

### Unused Images on Disk (can be removed)

| Filename | Subject |
|----------|---------|
| `director-1.jpg` through `director-4.jpg` | Placeholder director photos |
| `folio-*.jpg` (20+ files) | Portfolio/gallery placeholders |
| `folio-man-*.jpg` (10 files) | Male portrait placeholders |
| `project-*.jpg` files | Old project images |
| `slide-*.jpg` files | Old presentation slides |

---

## Homepage Special Cases

The homepage (`/app/[locale]/page.tsx`) currently has:
- **No hero background image** — uses solid teal with dot pattern overlay
- **No full-bleed image** — section at line 235 shows a placeholder "Full-bleed Photography"
- **Company logos grid** — shows placeholder text "Company 1-4" (needs real company logos)

To add a homepage hero image, set `HERO_IMAGES.home` in `/lib/images.ts` and add it to the homepage JSX.
