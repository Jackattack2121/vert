# Yugo Metals - Corporate Website

Modern, production-ready website for Yugo Metals Limited with integrated investor centre and email subscription platform.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC)
![License](https://img.shields.io/badge/license-Proprietary-red)

## 🚀 Quick Start

Get started in 5 minutes:

```bash
# Install dependencies
npm install

# Start Docker services (Listmonk + Directus)
docker-compose up -d

# Setup Listmonk mailing lists
node scripts/setup-listmonk.js

# Start development server
npm run dev
```

Visit http://localhost:3000

📖 **Detailed guide:** See [QUICKSTART.md](./QUICKSTART.md)

## 📦 What's Included

### Website Features
- ✨ Modern homepage with video hero sliders
- 📊 Comprehensive investor centre
- 📧 Email subscription management (Listmonk)
- 🏔️ Project showcase pages (REE, Lithium, Base Metals)
- 📰 ASX announcements feed
- 👥 Company information pages
- 📱 Fully responsive design
- ⚡ Optimized performance (Core Web Vitals)
- 🎭 Smooth GSAP animations

### Technical Features
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS 4 for styling
- GSAP for animations
- Listmonk for email marketing
- Directus CMS (optional)
- PostgreSQL database
- Docker for local development

## 🏗️ Architecture

### Development Stack
```
Next.js (localhost:3000)
    ↓
Listmonk (localhost:9000) → Local PostgreSQL
    ↓
Directus CMS (localhost:8055) → Local PostgreSQL
```

### Production Stack
```
Next.js → Vercel (FREE)
    ↓
Listmonk → Fly.io (FREE) 🎉 → Supabase PostgreSQL
    ↓
Email Delivery → Resend SMTP (FREE)
    ↓
File Storage → Supabase Storage
```

**Total Production Cost:** **$0/month for new services!** 🎉 (only Supabase if you're already paying for it)

## 📁 Project Structure

```
yugo-metals/
├── app/                          # Next.js 14 App Router
│   ├── api/
│   │   └── subscribe/           # Email subscription API
│   ├── investors/               # Investor Centre
│   │   ├── page.tsx            # Dashboard
│   │   ├── asx-announcements/  # ASX feed
│   │   ├── presentations/      # Investor presentations
│   │   ├── calendar/           # Events calendar
│   │   └── ...
│   ├── projects/                # Mining Projects
│   │   ├── mick-well/          # REE Project
│   │   ├── arthur-river/       # REE Project
│   │   ├── chalby-chalby/      # Lithium Project
│   │   └── nsw-projects/       # Base & Precious Metals
│   ├── company/                 # Company Info
│   │   ├── board-of-directors/
│   │   ├── corporate-directory/
│   │   └── ...
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Homepage
│
├── components/
│   ├── layout/                 # Header, Footer
│   ├── ui/                     # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── SectionTitle.tsx
│   │   ├── HeroSlider.tsx
│   │   └── AnimatedSection.tsx
│   ├── mining/                 # Domain-specific components
│   │   ├── ProjectCard.tsx
│   │   └── ASXAnnouncementList.tsx
│   └── investor/               # Investor centre widgets
│       ├── SharePriceWidget.tsx
│       ├── SubscriptionForm.tsx
│       └── DocumentCard.tsx
│
├── lib/                        # Utilities & Helpers
│   ├── utils.ts               # General utilities
│   ├── gsap-utils.ts          # Animation utilities
│   ├── asx-rss.ts             # ASX data fetching
│   └── directus.ts            # CMS client (optional)
│
├── public/                     # Static Assets
│   ├── images/                # Project images
│   ├── documents/             # PDF downloads
│   ├── herobg.mp4            # Hero video 1
│   ├── herobg2.mp4           # Hero video 2
│   └── parallax.mp4          # Parallax section video
│
├── listmonk/                   # Listmonk Config
│   ├── config.toml            # Local development
│   ├── config.production.toml # Production
│   └── Dockerfile.production  # Fly.io deployment
│
├── scripts/                    # Automation Scripts
│   ├── setup-listmonk.js      # Create mailing lists
│   ├── seed-directus.js       # Seed CMS data
│   └── generate-env-keys.sh   # Generate secure keys
│
├── docker-compose.yml          # Local services
├── fly.toml                    # Fly.io deployment config
├── next.config.js              # Next.js configuration
├── tailwind.config.ts          # Tailwind configuration
│
└── Documentation/
    ├── README.md              # This file
    ├── QUICKSTART.md          # 5-minute setup guide
    ├── DEPLOYMENT.md          # Full production deployment
    ├── FLY-ENV-TEMPLATE.md    # Fly.io env vars
    └── VERCEL-ENV-TEMPLATE.md  # Vercel env vars
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** GSAP 3.12
- **Icons:** React Icons 5
- **UI Components:** Custom component library

### Backend & Services
- **Email Platform:** Listmonk (open-source)
- **CMS:** Directus (optional, headless CMS)
- **Database:** PostgreSQL 13
- **Email Delivery:** Resend
- **File Storage:** Supabase Storage

### Deployment
- **Website Hosting:** Vercel (FREE)
- **Listmonk Hosting:** Fly.io (FREE) 🎉
- **Database:** Supabase (PostgreSQL)
- **CDN:** Vercel Edge Network
- **SSL:** Automatic (Vercel + Fly.io)

### Development Tools
- **Package Manager:** npm
- **Code Quality:** ESLint, TypeScript
- **Containerization:** Docker & Docker Compose
- **Version Control:** Git + GitHub

## 📚 Documentation

| Guide | Description |
|-------|-------------|
| [QUICKSTART.md](./QUICKSTART.md) | Get running locally in 5 minutes |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Complete production deployment guide |
| [FLY-ENV-TEMPLATE.md](./FLY-ENV-TEMPLATE.md) | Fly.io environment variables |
| [VERCEL-ENV-TEMPLATE.md](./VERCEL-ENV-TEMPLATE.md) | Vercel environment variables |

## 🚢 Deployment

### Prerequisites
- Supabase account (for PostgreSQL + Storage)
- Resend account (for email delivery - FREE tier)
- Fly.io account (for Listmonk hosting - FREE tier) 🎉
- Vercel account (for website hosting - FREE tier)
- Domain access: yugometals.com

### Quick Deploy

```bash
# 1. Generate production keys
./scripts/generate-env-keys.sh

# 2. Push to GitHub
git push origin main

# 3. Deploy to Fly.io (Listmonk) - FREE!
# - Install Fly.io CLI
# - Run: flyctl launch --no-deploy
# - Set secrets from FLY-ENV-TEMPLATE.md
# - Deploy: flyctl deploy

# 4. Deploy to Vercel (Website) - FREE!
# - Connect GitHub repo to Vercel
# - Add environment variables from VERCEL-ENV-TEMPLATE.md
# - Deploy

# 5. Configure DNS
# - Add DNS records from DEPLOYMENT.md Phase 5
# - Wait for propagation (5-30 minutes)
```

📖 **Full guide:** See [DEPLOYMENT.md](./DEPLOYMENT.md)

## 🧪 Testing

### Test Email Subscription

```bash
# Test API endpoint
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "preferences": {
      "news": true,
      "announcements": true
    }
  }'
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
npm start
```

## 📊 Key Features

### Investor Centre
- **Share Price Widget** - Live ASX data (20-min delayed)
- **ASX Announcements** - Searchable archive with filtering
- **Financial Reports** - Quarterly and annual reports
- **Presentations** - Investor and corporate presentations
- **Email Subscriptions** - Powered by Listmonk
- **Calendar** - Upcoming events and deadlines
- **Fact Sheet** - Company overview and key metrics
- **ESG** - Environmental, Social & Governance reporting

### Project Pages
1. **Mick Well REE Project** - Rare earth elements discovery
2. **Arthur River LK1** - Large-scale REE prospect
3. **Chalby Chalby** - Lithium exploration project
4. **NSW Projects** - Base & precious metals portfolio

### Email Platform (Listmonk)
- 4 segmented mailing lists
- Double opt-in support
- Unsubscribe management
- Campaign analytics
- Template editor
- A/B testing capable

## 🔧 Configuration

### Environment Variables

**Local Development:**
```bash
LISTMONK_URL=http://localhost:9000
LISTMONK_USERNAME=listmonk_api
LISTMONK_PASSWORD=YUG_API_2024_Secure!
DIRECTUS_URL=http://localhost:8055
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Production:**
See [VERCEL-ENV-TEMPLATE.md](./VERCEL-ENV-TEMPLATE.md) and [RAILWAY-ENV-TEMPLATE.md](./RAILWAY-ENV-TEMPLATE.md)

### Tailwind Colors

Brand colors configured in `tailwind.config.ts`:

```typescript
colors: {
  primary: { /* Navy Blue */ },
  secondary: { /* Charcoal Gray */ },
  accent: {
    yellow: '#FFB81C',
    gold: '#F0A000',
    teal: '#00B0B9',
    green: '#6BA539',
  }
}
```

## 📈 Performance

- **Lighthouse Score:** 95+ (Desktop)
- **First Contentful Paint:** <1.5s
- **Largest Contentful Paint:** <2.5s
- **Time to Interactive:** <3.5s
- **Cumulative Layout Shift:** <0.1

## 🔐 Security

- Environment variables for all secrets
- HTTPS/SSL everywhere (automatic)
- CORS properly configured
- Rate limiting on API routes (planned)
- Row Level Security on Supabase
- API key rotation recommended every 6 months

## 🐛 Troubleshooting

### Listmonk won't start
```bash
docker-compose logs listmonk
# Check for database connection errors
```

### Next.js build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

### Email subscriptions not working
1. Check Listmonk is running: `docker-compose ps`
2. Verify API credentials in browser console
3. Check Listmonk logs: `docker-compose logs listmonk`
4. Test API directly: See [Testing](#testing) section

## 🤝 Contributing

This is a private project for Yugo Metals Limited.

## 📝 License

Proprietary - © 2025 Yugo Metals Limited

## 🔗 Links

- **Website:** https://yugometals.com
- **Listmonk:** https://listmonk.app
- **Next.js:** https://nextjs.org
- **Vercel:** https://vercel.com
- **Fly.io:** https://fly.io
- **Supabase:** https://supabase.com
- **Resend:** https://resend.com

## 📞 Support

For technical support or questions:
- **Documentation:** See all `*.md` files in project root
- **Listmonk Issues:** https://github.com/knadh/listmonk/issues
- **Next.js Issues:** https://github.com/vercel/next.js/issues

---

**Built with ❤️ for Yugo Metals**

*Last Updated: January 2025*
