# Yugo Metals - Quick Start Guide

Get the project running locally in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- Docker Desktop installed and running
- Git installed

## Local Development Setup

### 1. Clone Repository

```bash
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects"
cd yugo-metals
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Docker Services

Start Directus CMS and Listmonk:

```bash
docker-compose up -d
```

Wait 30 seconds for services to initialize, then:

- **Directus:** http://localhost:8055
  - Email: `admin@yugometals.com`
  - Password: `ADMIN1234`

- **Listmonk:** http://localhost:9000
  - Follow initial setup wizard
  - Create admin account

### 4. Setup Listmonk Mailing Lists

```bash
# Configure Listmonk with default mailing lists
node scripts/setup-listmonk.js
```

This creates 4 mailing lists:
- General News & Updates
- Investor Updates  
- ASX Announcements
- Quarterly Reports

### 5. Start Next.js Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## Project Structure

```
yugo-metals/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes (email subscription)
│   ├── investors/         # Investor centre pages
│   ├── projects/          # Project pages
│   ├── company/           # Company pages
│   └── page.tsx           # Homepage
├── components/
│   ├── layout/            # Header, Footer
│   ├── ui/                # Reusable UI components
│   ├── mining/            # Mining-specific components
│   └── investor/          # Investor centre widgets
├── lib/                   # Utilities and helpers
├── public/                # Static assets
├── listmonk/              # Listmonk configuration
├── scripts/               # Setup and deployment scripts
└── docker-compose.yml     # Local development services
```

## Key Features

### Homepage
- Video hero slider with GSAP animations
- Project showcase
- ASX announcements feed
- Parallax video section

### Investor Centre
- Share price widget (ASX data)
- ASX announcements archive
- Financial reports
- Presentations
- Email subscriptions (Listmonk)

### Projects
- Mick Well REE Project
- Arthur River LK1 REE Project
- Chalby Chalby Lithium Project
- NSW Projects

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm start                # Start production server

# Docker
docker-compose up -d     # Start services
docker-compose down      # Stop services
docker-compose logs -f   # View logs

# Listmonk
node scripts/setup-listmonk.js  # Setup mailing lists
```

## Testing Email Subscriptions

1. Visit http://localhost:3000/investors
2. Scroll to "Email Subscriptions" section
3. Fill out form and submit
4. Check Listmonk dashboard: http://localhost:9000
5. View new subscriber in "Subscribers" section

## Environment Variables

Local development uses these defaults (no setup needed):

```bash
LISTMONK_URL=http://localhost:9000
LISTMONK_USERNAME=listmonk_api
LISTMONK_PASSWORD=YUG_API_2024_Secure!
DIRECTUS_URL=http://localhost:8055
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Production Deployment

Ready to deploy? See:
- **DEPLOYMENT.md** - Complete production deployment guide
- **RAILWAY-ENV-TEMPLATE.md** - Railway environment variables
- **VERCEL-ENV-TEMPLATE.md** - Vercel environment variables

## Technology Stack

- **Frontend:** Next.js 14, React 19, TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP, Framer Motion
- **Email Platform:** Listmonk (open-source)
- **CMS:** Directus (headless CMS)
- **Database:** PostgreSQL (via Supabase in production)
- **Hosting:** Vercel (Next.js) + Railway (Listmonk)

## Troubleshooting

### Docker services won't start

```bash
# Stop all containers
docker-compose down

# Remove volumes (WARNING: Deletes data)
docker-compose down -v

# Start fresh
docker-compose up -d
```

### Next.js build errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

### Listmonk API not working

1. Check Listmonk is running: `docker-compose ps`
2. View logs: `docker-compose logs listmonk`
3. Verify credentials in `listmonk/config.toml`
4. Re-run setup: `node scripts/setup-listmonk.js`

### Port already in use

If port 3000, 8055, or 9000 is in use:

```bash
# Find process using port
lsof -ti:3000  # or :8055 or :9000

# Kill process
kill -9 $(lsof -ti:3000)
```

## Getting Help

- **Documentation:** See all `*.md` files in project root
- **Listmonk Docs:** https://listmonk.app/docs
- **Next.js Docs:** https://nextjs.org/docs
- **Directus Docs:** https://docs.directus.io

## Next Steps

1. ✅ Get local development running
2. ✅ Explore the website and features
3. ✅ Test email subscriptions
4. 📖 Read DEPLOYMENT.md for production deployment
5. 🚀 Deploy to Vercel + Railway
6. 🌐 Configure custom domain
7. 📧 Set up Resend for production emails

---

**Need help?** Check DEPLOYMENT.md or TROUBLESHOOTING.md for detailed guides.
