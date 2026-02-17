# CoreConnect Admin Backend

![CoreConnect](https://img.shields.io/badge/CoreConnect-v1.0.0-FF7B42)
![Next.js](https://img.shields.io/badge/Next.js-14.2.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)

> **CoreConnect** is a unified admin control panel for the Yugo Metals website, providing centralized management of CMS content, email marketing, analytics, and SEO from a single, beautiful interface.

## 🎯 Overview

CoreConnect consolidates all website management tasks into one powerful admin dashboard:

- **Content Management** - Manage mining projects, hero slides, and site settings via Directus CMS
- **Email Marketing** - Create campaigns, manage subscribers, and templates via Listmonk
- **Analytics** - Monitor website traffic, user behavior, and performance metrics
- **SEO Management** - Optimize meta tags, track performance, and improve search rankings

## 🚀 Features

### Authentication & Security
- ✅ NextAuth.js integration with credentials provider
- ✅ JWT-based session management
- ✅ Protected `/admin/*` routes with middleware
- ✅ SSO to Directus and Listmonk (no separate logins needed)
- ✅ Secure proxy APIs for backend services

### Content Management (Directus Integration)
- ✅ Mining projects CRUD operations
- ✅ Homepage hero slides management
- ✅ Site configuration editor
- ✅ Media library integration
- ✅ Draft/publish workflow
- ✅ Real-time content preview

### Email Marketing (Listmonk Integration)
- ✅ Campaign creation and management
- ✅ Subscriber list with search/filter
- ✅ Email template editor
- ✅ Campaign analytics (opens, clicks)
- ✅ List management (ASX Announcements, Reports, News)

### Analytics Dashboard
- ✅ Page views and visitor trends (7/30/90 days)
- ✅ Top pages and traffic sources
- ✅ Device breakdown (Desktop/Mobile/Tablet)
- ✅ Real-time visitor count
- ✅ Beautiful charts with Recharts

### SEO Management
- ✅ Meta tags editor for all pages
- ✅ SEO health scoring
- ✅ Performance monitoring (Core Web Vitals)
- ✅ Search result previews
- ✅ Optimization recommendations

### UI/UX
- ✅ Modern, responsive design with Tailwind CSS
- ✅ CoreConnect branded interface (Orange/Red theme)
- ✅ Sidebar navigation with active states
- ✅ Beautiful dashboards with stats cards
- ✅ Smooth animations and transitions

## 📁 File Structure

```
yugo-metals/
├── app/
│   ├── admin/                          # CoreConnect Admin Portal
│   │   ├── layout.tsx                  # Admin-only layout
│   │   ├── page.tsx                    # Dashboard
│   │   ├── login/                      # Login page
│   │   ├── content/                    # CMS management
│   │   │   ├── page.tsx                # Content overview
│   │   │   ├── projects/               # Projects management
│   │   │   ├── hero/                   # Hero slides
│   │   │   └── settings/               # Site settings
│   │   ├── email/                      # Email marketing
│   │   │   ├── page.tsx                # Email overview
│   │   │   ├── campaigns/              # Campaign management
│   │   │   ├── subscribers/            # Subscriber list
│   │   │   └── templates/              # Email templates
│   │   ├── analytics/                  # Analytics dashboard
│   │   │   └── page.tsx
│   │   └── seo/                        # SEO management
│   │       ├── page.tsx                # SEO overview
│   │       ├── meta-tags/              # Meta tag editor
│   │       └── performance/            # Performance monitoring
│   ├── api/
│   │   ├── auth/[...nextauth]/         # NextAuth endpoint
│   │   └── admin/
│   │       ├── directus/[...path]/     # Directus proxy
│   │       └── listmonk/[...path]/     # Listmonk proxy
├── components/
│   ├── admin/
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx
│   │   │   └── AdminHeader.tsx
│   │   └── dashboard/
│   │       ├── StatsCard.tsx
│   │       ├── QuickActions.tsx
│   │       └── RecentActivity.tsx
├── lib/
│   ├── auth/
│   │   ├── auth-config.ts              # NextAuth configuration
│   │   └── auth-helpers.ts             # SSO helpers
│   └── admin/
│       ├── directus-admin.ts           # Directus admin client
│       └── listmonk-admin.ts           # Listmonk admin client
├── middleware.ts                        # Route protection
├── types/
│   └── next-auth.d.ts                  # NextAuth types
└── scripts/
    └── generate-admin-password.js      # Password hash generator
```

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
cd "yugo-metals"
npm install
```

The following packages are required:
- `next-auth` - Authentication
- `recharts` - Analytics charts
- `react-hook-form` - Form handling
- `zod` - Validation
- `@tanstack/react-table` - Data tables
- `date-fns` - Date formatting
- `lucide-react` - Icons
- `bcryptjs` - Password hashing

### 2. Generate Admin Password

```bash
node scripts/generate-admin-password.js "YourSecurePassword"
```

This will output a bcrypt hash to use in your environment variables.

### 3. Configure Environment Variables

Create or update `.env.local`:

```bash
# NextAuth - CoreConnect Admin Authentication
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# CoreConnect Admin User
ADMIN_EMAIL=admin@yugometals.com
ADMIN_PASSWORD_HASH=<hash-from-step-2>

# Directus CMS
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_ADMIN_EMAIL=admin@yugometals.com
DIRECTUS_ADMIN_PASSWORD=admin123

# Listmonk Email Marketing
LISTMONK_URL=http://localhost:9000
LISTMONK_USERNAME=listmonk_api
LISTMONK_PASSWORD=YUG_API_2024_Secure!

# Google Analytics (Optional)
GA_MEASUREMENT_ID=G-XXXXXXXXXX
GA_PROPERTY_ID=12345678

# ASX RSS Feed
ASX_CODE=YUG
```

### 4. Start Backend Services

```bash
# Start Directus and Listmonk
docker-compose up -d

# Check services are running
docker-compose ps
```

### 5. Run Development Server

```bash
npm run dev
```

Visit:
- **Website**: http://localhost:3000
- **CoreConnect Admin**: http://localhost:3000/admin
- **Directus**: http://localhost:8055
- **Listmonk**: http://localhost:9000

## 🔐 Default Login Credentials

**CoreConnect Admin Portal**
- URL: http://localhost:3000/admin/login
- Email: `admin@yugometals.com`
- Password: `CoreConnect2024!` (or your custom password)

> ⚠️ **Security Note**: Change default password in production!

## 📚 Usage Guide

### Accessing CoreConnect

1. Navigate to `/admin/login`
2. Enter your credentials
3. You'll be redirected to the dashboard

### Managing Content

**Projects:**
1. Go to Content → Projects
2. Click "Add New Project" to create
3. Fill in details: name, location, commodity type, description
4. Upload hero image
5. Set status (Draft/Published) and order
6. Click Save

**Hero Slides:**
1. Go to Content → Hero Slides
2. Add slides with title, subtitle, description
3. Upload image or video
4. Set display order
5. Publish when ready

**Site Settings:**
1. Go to Content → Site Settings
2. Update company info, contact details
3. Upload logo
4. Save changes

### Email Marketing

**Creating a Campaign:**
1. Go to Email → Campaigns
2. Click "New Campaign"
3. Enter campaign name and subject
4. Select mailing lists
5. Design email content
6. Preview and test
7. Schedule or send immediately

**Managing Subscribers:**
1. Go to Email → Subscribers
2. View, search, and filter subscribers
3. Export/import subscriber lists
4. Manage subscription status

### Monitoring Analytics

1. Go to Analytics
2. Select time range (24h, 7d, 30d, 90d)
3. View key metrics:
   - Page views and visitors
   - Top pages
   - Traffic sources
   - Device breakdown
4. Monitor real-time visitors

### SEO Optimization

**Editing Meta Tags:**
1. Go to SEO → Meta Tags
2. Select page from sidebar
3. Edit title (30-60 chars optimal)
4. Edit description (120-160 chars optimal)
5. Add focus keywords
6. Set Open Graph image
7. Preview how it appears in search
8. Save changes

**Monitoring Performance:**
1. Go to SEO → Performance
2. View Core Web Vitals (LCP, FID, CLS)
3. Check Lighthouse scores
4. Review optimization recommendations
5. Run performance audits

## 🎨 CoreConnect Branding

**Color Scheme:**
- Primary: `#FF7B42` (CoreConnect Orange)
- Secondary: `#D14D15` (CoreConnect Red)
- Dark: `#1E293B` (Slate)
- Success: `#10B981`
- Warning: `#F59E0B`
- Danger: `#EF4444`

**Typography:**
- Headings: Montserrat Bold
- Body: Montserrat Regular
- Accent: Josefin Sans

## 🔄 API Proxy Pattern

CoreConnect uses a proxy pattern to securely communicate with backend services:

```typescript
// User logs into CoreConnect → NextAuth session created
// When accessing Directus/Listmonk features:
//   1. CoreConnect validates user session
//   2. Generates/retrieves service credentials
//   3. Proxies request with proper authentication
//   4. Returns response to user

// Example: /api/admin/directus/items/mining_projects
// → Proxies to: http://localhost:8055/items/mining_projects
// With: Authorization: Bearer <directus-token>
```

This ensures:
- Users never see backend credentials
- Single sign-on experience
- Centralized security management
- Better error handling and logging

## 🛠️ Development

### Adding New Admin Pages

1. Create page in `app/admin/your-section/page.tsx`
2. Add route to sidebar in `components/admin/layout/AdminSidebar.tsx`
3. Page is automatically protected by middleware

### Creating Custom Components

Place reusable admin components in:
- `components/admin/dashboard/` - Dashboard widgets
- `components/admin/forms/` - Form components
- `components/admin/tables/` - Data tables
- `components/admin/charts/` - Chart components

### API Integration

For new backend integrations:
1. Create client in `lib/admin/your-service-admin.ts`
2. Create proxy route in `app/api/admin/your-service/[...path]/route.ts`
3. Use in pages via client-side fetch or server actions

## 📊 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js
- **CMS**: Directus
- **Email**: Listmonk
- **Charts**: Recharts
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Date**: date-fns

## 🚢 Deployment

### Production Checklist

- [ ] Change default admin password
- [ ] Generate secure `NEXTAUTH_SECRET`
- [ ] Update Directus admin credentials
- [ ] Update Listmonk API credentials
- [ ] Configure production database URLs
- [ ] Set up SSL certificates
- [ ] Enable rate limiting
- [ ] Configure backup strategy
- [ ] Set up monitoring/logging
- [ ] Test all proxy endpoints
- [ ] Update CORS settings
- [ ] Enable analytics integration

### Environment Setup

**Vercel/Netlify (Frontend):**
```bash
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<production-secret>
ADMIN_EMAIL=admin@yourcompany.com
ADMIN_PASSWORD_HASH=<production-hash>
NEXT_PUBLIC_DIRECTUS_URL=https://cms.yourdomain.com
DIRECTUS_ADMIN_EMAIL=<directus-admin>
DIRECTUS_ADMIN_PASSWORD=<directus-password>
LISTMONK_URL=https://email.yourdomain.com
LISTMONK_USERNAME=<listmonk-user>
LISTMONK_PASSWORD=<listmonk-password>
```

**Docker/VPS (Backend Services):**
- Deploy Directus with PostgreSQL
- Deploy Listmonk with PostgreSQL
- Configure reverse proxy (Nginx/Caddy)
- Set up SSL with Let's Encrypt

## 🔒 Security Best Practices

1. **Authentication:**
   - Use strong passwords (12+ characters)
   - Enable 2FA for production (future enhancement)
   - Rotate credentials regularly

2. **API Security:**
   - All admin APIs validate session
   - Credentials stored server-side only
   - Rate limiting on sensitive endpoints

3. **Data Protection:**
   - HTTPS in production
   - Secure cookie settings
   - CSRF protection enabled

4. **Access Control:**
   - Role-based access (future: multi-user support)
   - Audit logging for sensitive actions
   - Session timeout after inactivity

## 📝 Future Enhancements

- [ ] Multi-user support with roles
- [ ] Two-factor authentication
- [ ] Activity audit log
- [ ] Real-time notifications
- [ ] Batch operations for content
- [ ] Advanced email template builder (drag & drop)
- [ ] A/B testing for campaigns
- [ ] Enhanced analytics (Google Analytics 4 API)
- [ ] Scheduled content publishing
- [ ] Webhook integrations
- [ ] Mobile app for admin
- [ ] Dark mode theme

## 🐛 Troubleshooting

### Cannot login to CoreConnect

**Issue**: "Invalid email or password"

**Solution:**
1. Verify `ADMIN_EMAIL` matches your input
2. Check `ADMIN_PASSWORD_HASH` is set correctly
3. Generate new hash with: `node scripts/generate-admin-password.js`
4. Restart dev server after updating `.env.local`

### Directus connection failed

**Issue**: "Failed to authenticate with Directus CMS"

**Solution:**
1. Check Directus is running: `docker-compose ps`
2. Verify `NEXT_PUBLIC_DIRECTUS_URL` is correct
3. Test Directus directly: http://localhost:8055
4. Check `DIRECTUS_ADMIN_EMAIL` and `DIRECTUS_ADMIN_PASSWORD`

### Listmonk API errors

**Issue**: "Failed to communicate with Listmonk"

**Solution:**
1. Verify Listmonk is running: `docker-compose ps`
2. Check `LISTMONK_URL` points to correct address
3. Verify `LISTMONK_USERNAME` and `LISTMONK_PASSWORD`
4. Test Listmonk directly: http://localhost:9000

### Session expired immediately

**Issue**: Redirected to login after successful auth

**Solution:**
1. Ensure `NEXTAUTH_SECRET` is set
2. Generate with: `openssl rand -base64 32`
3. Clear browser cookies
4. Restart dev server

## 📞 Support

For issues or questions:
- Check this README first
- Review `DIRECTUS_INTEGRATION.md` for CMS details
- Check `LISTMONK_SETUP_COMPLETE.md` for email setup
- Inspect browser console for errors
- Check server logs with `npm run dev`

## 📄 License

This project is part of the Yugo Metals website. Internal use only.

---

**CoreConnect v1.0.0** - Built with ❤️ for Yugo Metals

