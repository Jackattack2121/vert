# Vert Capital - Corporate Website

Modern, production-ready corporate website for Vert Capital with integrated investor centre, admin portal, email subscription platform, and multi-language support.

![Next.js](https://img.shields.io/badge/Next.js-14-black)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC)
![License](https://img.shields.io/badge/license-Proprietary-red)

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.local.example .env.local
# Edit .env.local with your values

# Start development server
npm run dev
```

Visit http://localhost:3000

For full setup including Docker services (Listmonk, Directus), see [QUICKSTART.md](./QUICKSTART.md).

## Features

### Website
- Modern homepage with animated hero and rotating text
- Comprehensive investor centre (ASX announcements, share price, financials)
- Mining project showcase pages with dynamic content
- Company information pages (board, governance, directory)
- Email subscription management (Listmonk)
- Fully responsive design
- GSAP-powered animations
- Sitemap generation

### Technical
- **6-language i18n** support (EN, DE, BS, ZH, JA, IT) via next-intl
- **Admin dashboard** (CoreConnect) with analytics, email campaigns, SEO tools
- **Investor portal** with role-based access (shareholder/institutional)
- **Magic link authentication** with rate limiting
- **ASX RSS feed** parsing for live announcements
- **TradingView** share price widget integration
- **Directus CMS** integration (optional)
- **Vercel Analytics** integration

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Animations | GSAP 3.12 |
| Auth | NextAuth 4 + bcryptjs |
| i18n | next-intl 4 |
| Email | Listmonk (self-hosted) |
| CMS | Directus (optional) |
| Charts | Recharts 3 |
| Forms | React Hook Form + Zod |
| Testing | Playwright + axe-core |
| Deployment | Vercel / Fly.io |

## Project Structure

```
vert-capital/
├── app/                          # Next.js 14 App Router
│   ├── [locale]/                # Internationalized pages
│   │   ├── page.tsx             # Homepage
│   │   ├── about/               # About page
│   │   ├── services/            # Services page
│   │   ├── companies/           # Companies page
│   │   ├── news/                # News pages
│   │   ├── projects/            # Mining project pages
│   │   ├── investors/           # Investor centre (9 sub-pages)
│   │   ├── company/             # Corporate pages (4 sub-pages)
│   │   ├── prospectus/          # Prospectus page
│   │   └── sponsorships/        # Sponsorships page
│   ├── admin/                   # Admin dashboard (CoreConnect)
│   ├── portal/                  # Investor portal (login, dashboards)
│   ├── api/                     # API routes
│   └── globals.css              # Global styles
├── components/
│   ├── layout/                  # Header, Footer, ProjectPicker
│   ├── ui/                      # Reusable UI (Button, Card, etc.)
│   ├── mining/                  # Mining project components
│   ├── company/                 # Company page components
│   ├── investor/                # Investor widgets (TradingView, etc.)
│   ├── news/                    # News components
│   ├── admin/                   # Admin dashboard components
│   ├── portal/                  # Portal components
│   │   ├── shareholder/         # Shareholder dashboard widgets
│   │   └── institutional/       # Institutional dashboard widgets
│   └── providers/               # React context providers
├── lib/                         # Utilities & services
│   ├── auth/                    # Auth config, helpers, rate limiter
│   ├── admin/                   # Admin utilities
│   ├── security/                # Security headers
│   ├── utils.ts                 # General utilities (cn helper)
│   ├── gsap-utils.ts            # Animation helpers
│   ├── asx-rss.ts               # ASX feed parser
│   ├── directus-client.ts       # CMS client
│   └── directus-news.ts         # News data fetching
├── messages/                    # i18n translation files (6 locales)
├── types/                       # TypeScript type definitions
├── public/                      # Static assets (images, videos, logos)
├── scripts/                     # Setup & automation scripts
├── listmonk/                    # Email platform config
├── directus/                    # CMS schema & config
├── docs/                        # Archived documentation
│   ├── deployment/              # Deployment guides & env templates
│   ├── features/                # Feature documentation
│   ├── coreconnect/             # Admin system docs
│   ├── security/                # Security checklists
│   ├── translations/            # i18n workflow docs
│   ├── phase2/                  # Phase 2 implementation docs
│   └── reference/               # Historical implementation reports
└── .github/                     # GitHub workflows & templates
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test:e2e` | Run Playwright E2E tests |
| `npm run test:e2e:ui` | Run E2E tests with UI |
| `npm run validate:translations` | Validate translation files |
| `npm run verify` | Verify production readiness |
| `npm run setup:listmonk` | Configure Listmonk mailing lists |
| `npm run docker:up` | Start Docker services |
| `npm run docker:down` | Stop Docker services |

## Environment Variables

Copy `.env.local.example` to `.env.local` and configure:

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXTAUTH_URL` | Yes | Application URL (e.g., http://localhost:3000) |
| `NEXTAUTH_SECRET` | Yes | Session encryption key |
| `ADMIN_EMAIL` | Yes | Admin account email |
| `ADMIN_PASSWORD_HASH` | Yes | Bcrypt hash of admin password |
| `NEXT_PUBLIC_SITE_URL` | Yes | Public site URL for API calls |
| `LISTMONK_URL` | No | Listmonk API endpoint |
| `LISTMONK_USERNAME` | No | Listmonk API username |
| `LISTMONK_PASSWORD` | No | Listmonk API password |
| `DIRECTUS_URL` | No | Directus CMS endpoint |
| `DIRECTUS_TOKEN` | No | Directus API token |

See `.env.local.example` and `.env.production.template` for full variable lists.

## Deployment

### Production Architecture
```
Next.js  -->  Vercel (FREE)
Listmonk -->  Fly.io (FREE)  -->  PostgreSQL (Supabase)
Email    -->  Resend SMTP (FREE)
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full deployment guide.

## Documentation

| Guide | Description |
|-------|-------------|
| [QUICKSTART.md](./QUICKSTART.md) | Local development setup |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment guide |
| [DEPLOYMENT-CHECKLIST.md](./DEPLOYMENT-CHECKLIST.md) | Deployment verification steps |
| [START_HERE.md](./START_HERE.md) | Dynamic CMS project system guide |
| [docs/](./docs/) | Archived documentation by topic |

## License

Proprietary - All rights reserved.
