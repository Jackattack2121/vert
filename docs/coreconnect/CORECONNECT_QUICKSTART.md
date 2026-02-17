# CoreConnect Quick Start Guide

Get CoreConnect up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- Docker and Docker Compose installed
- Terminal/Command Line access

## Step 1: Install Dependencies (1 minute)

```bash
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects/yugo-metals"
npm install
```

## Step 2: Generate Admin Password (30 seconds)

```bash
node scripts/generate-admin-password.js "CoreConnect2024!"
```

Copy the hash output. You'll need it for the next step.

## Step 3: Create Environment File (1 minute)

Create `.env.local` in the project root:

```bash
# Copy this template and fill in your values

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-openssl-rand-base64-32

# Admin Credentials
ADMIN_EMAIL=admin@yugometals.com
ADMIN_PASSWORD_HASH=replace-with-hash-from-step-2

# Directus CMS
NEXT_PUBLIC_DIRECTUS_URL=http://localhost:8055
DIRECTUS_ADMIN_EMAIL=admin@yugometals.com
DIRECTUS_ADMIN_PASSWORD=generate-secure-password-here

# Listmonk Email
LISTMONK_URL=http://localhost:9000
LISTMONK_USERNAME=listmonk_api
LISTMONK_PASSWORD=YUG_API_2024_Secure!
```

### Generate NEXTAUTH_SECRET

```bash
openssl rand -base64 32
```

Copy the output and paste it as `NEXTAUTH_SECRET` in your `.env.local`.

## Step 4: Start Backend Services (1 minute)

```bash
docker-compose up -d
```

Wait for services to start, then verify:

```bash
docker-compose ps
```

You should see:
- ✅ directus (port 8055)
- ✅ postgres (port 5432)
- ✅ listmonk (port 9000)
- ✅ listmonk_db (port 5432)

## Step 5: Start Development Server (30 seconds)

```bash
npm run dev
```

## Step 6: Access CoreConnect (1 minute)

### Login to CoreConnect Admin

1. Open browser to: http://localhost:3000/admin/login
2. Enter credentials:
   - Email: `admin@yugometals.com`
   - Password: *Use the password you generated in Step 2*
3. Click "Sign In"

You should now see the CoreConnect Dashboard! 🎉

## What's Next?

### Explore the Admin Portal

**Dashboard**: Overview of your site stats
- View total projects, subscribers, page views
- Quick actions to create content
- Recent activity feed

**Content Management**:
- `/admin/content` - Overview
- `/admin/content/projects` - Manage mining projects
- `/admin/content/hero` - Edit homepage hero slides
- `/admin/content/settings` - Configure site settings

**Email Marketing**:
- `/admin/email` - Overview
- `/admin/email/campaigns` - Create and send campaigns
- `/admin/email/subscribers` - Manage email list
- `/admin/email/templates` - Edit email templates

**Analytics**:
- `/admin/analytics` - Website traffic and metrics

**SEO**:
- `/admin/seo` - SEO health overview
- `/admin/seo/meta-tags` - Edit page titles and descriptions
- `/admin/seo/performance` - Monitor Core Web Vitals

### View the Public Website

Visit: http://localhost:3000

The public website runs alongside the admin portal.

## Common Tasks

### Create Your First Project

1. Go to `/admin/content/projects`
2. Click "Add New Project"
3. Fill in:
   - Project name: "Test Mining Project"
   - Location: "Western Australia"
   - Commodity: Select REE
   - Description: Add details
   - Status: Published
   - Order: 1
4. Click Save

### Send Your First Email Campaign

1. Go to `/admin/email/campaigns`
2. Click "New Campaign"
3. Enter:
   - Name: "Test Campaign"
   - Subject: "Welcome to Yugo Metals"
   - Select mailing lists
4. Write email content
5. Preview and send

### Optimize Page SEO

1. Go to `/admin/seo/meta-tags`
2. Select a page from sidebar
3. Edit title and description
4. Preview how it looks in search results
5. Click "Save Changes"

## Troubleshooting

### Can't login?

Check that:
- `.env.local` exists in project root
- `ADMIN_EMAIL` matches what you're typing
- `ADMIN_PASSWORD_HASH` is set correctly
- Dev server restarted after creating `.env.local`

### Services not starting?

```bash
# Stop all services
docker-compose down

# Remove volumes (CAUTION: This deletes data)
docker-compose down -v

# Start fresh
docker-compose up -d
```

### Port conflicts?

If ports 3000, 8055, or 9000 are in use:

```bash
# Check what's using ports
lsof -i :3000
lsof -i :8055
lsof -i :9000

# Kill processes if needed
kill -9 <PID>
```

## Next Steps

### Production Deployment

See `CORECONNECT_README.md` for detailed production deployment guide.

### Customize Branding

Edit `tailwind.config.ts` to change colors:

```typescript
colors: {
  coreconnect: {
    orange: '#YOUR_COLOR',
    red: '#YOUR_COLOR',
  }
}
```

### Add Custom Features

1. Create new page in `app/admin/your-feature/page.tsx`
2. Add to sidebar in `components/admin/layout/AdminSidebar.tsx`
3. Build your feature!

## Support

Need help?
- Check `CORECONNECT_README.md` for detailed documentation
- Review browser console for errors
- Check server logs in terminal

---

**You're all set!** Start managing your website with CoreConnect 🚀

