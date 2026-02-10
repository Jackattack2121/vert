# Yugo Metals - Production Deployment Guide

This guide covers deploying the full production stack for Yugo Metals.

## Architecture

```
Next.js Website → Vercel (FREE)
Listmonk Email Platform → Fly.io (FREE) 🎉
Database → Supabase PostgreSQL (Paid)
File Storage → Supabase Storage (Paid)
Email Delivery → Resend SMTP (FREE tier or $20/mo)
```

## Prerequisites

- [x] Supabase account with paid plan
- [ ] Resend account (free or paid)
- [ ] Fly.io account (free tier available)
- [ ] Fly.io CLI installed
- [ ] Vercel account (free)
- [ ] Domain access: yugometals.com
- [ ] GitHub repository: https://github.com/Jackattack2121/yug.git

---

## Phase 1: Supabase Setup

### 1. Create Listmonk Database

1. Go to your Supabase project dashboard
2. Navigate to **Database** → **Connection String**
3. Note your connection details:
   ```
   Host: db.xxxxxxxxxxxxx.supabase.co
   Port: 5432
   Database: postgres
   User: postgres
   Password: [your-password]
   ```
4. Enable connection pooling:
   - Go to **Database** → **Connection pooling**
   - Note the connection pooler URL (optional, for better performance)

### 2. Create Storage Bucket

1. Navigate to **Storage** in Supabase dashboard
2. Click **Create new bucket**
3. Name: `listmonk-uploads`
4. Set to **Private** (recommended for security)
5. Click **Create bucket**

### 3. Generate Service Role Key

1. Navigate to **Settings** → **API**
2. Copy the following keys:
   - `service_role` key (secret)
   - Project URL: `https://xxxxxxxxxxxxx.supabase.co`
   - Project Ref: `xxxxxxxxxxxxx`

### 4. Configure Storage CORS (Optional)

If you need public access, configure CORS:

1. Go to **Storage** → `listmonk-uploads` bucket → **Configuration**
2. Add CORS configuration:

```json
{
  "allowedOrigins": ["https://listmonk.yugometals.com"],
  "allowedMethods": ["GET", "POST", "PUT", "DELETE"],
  "allowedHeaders": ["*"],
  "maxAgeSeconds": 3600
}
```

---

## Phase 2: Resend Email Setup

### 1. Sign Up and Verify Domain

1. Go to https://resend.com and sign up
2. Navigate to **Domains** → **Add Domain**
3. Enter domain: `yugometals.com`
4. Resend will provide DNS records

### 2. Add DNS Records

Add these DNS records to your domain registrar:

```
Type: TXT
Name: @
Value: v=spf1 include:resend.com ~all

Type: TXT
Name: resend._domainkey
Value: [Long DKIM key provided by Resend]

Type: CNAME
Name: bounce
Value: [Bounce server provided by Resend]
```

### 3. Wait for Verification

- DNS propagation takes 5-30 minutes
- Check status in Resend dashboard
- Status should show "Verified" with green checkmark

### 4. Generate API Key

1. Navigate to **API Keys** in Resend dashboard
2. Click **Create API Key**
3. Name: "Yugo Metals Listmonk Production"
4. Scope: **Sending access**
5. Copy the key (format: `re_xxxxxxxxxxxxx`)
6. **Save this key securely** - you won't see it again

---

## Phase 3: Fly.io Deployment

### 1. Install Fly.io CLI

**Mac/Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

**Windows (PowerShell):**
```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Verify installation:
```bash
flyctl version
```

### 2. Sign Up and Authenticate

```bash
# Sign up for Fly.io (opens browser)
flyctl auth signup

# Or login if you already have an account
flyctl auth login
```

**Note:** Fly.io free tier includes:
- 3 shared-cpu-1x VMs with 256MB RAM
- 3GB persistent storage
- 160GB outbound data transfer

### 3. Prepare Environment Variables

Before deploying, generate secure keys:

```bash
# Navigate to project
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects/yugo-metals"

# Generate secure keys
npm run generate:keys
```

Save these values:
```bash
# Supabase
SUPABASE_DB_HOST=db.xxxxxxxxxxxxx.supabase.co
SUPABASE_DB_PASSWORD=your-supabase-password
SUPABASE_PROJECT_REF=xxxxxxxxxxxxx
SUPABASE_STORAGE_ACCESS_KEY=your-service-role-key
SUPABASE_STORAGE_SECRET_KEY=your-service-role-key

# Resend
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Listmonk
LISTMONK_API_PASSWORD=[generated-password]
LISTMONK_ENCRYPTION_KEY=[generated-32-char-key]
```

### 4. Launch Fly.io App

```bash
# Initialize Fly.io app (in project directory)
flyctl launch --no-deploy

# When prompted:
# - App name: yugo-listmonk (or choose your own)
# - Region: Sydney (syd) - closest to Australia
# - Do you want to set up a PostgreSQL database? NO (we're using Supabase)
# - Do you want to set up an Upstash Redis database? NO
# - Would you want to deploy now? NO
```

This creates `fly.toml` configuration file (already provided in project).

### 5. Set Environment Secrets

Set all secrets using Fly.io CLI:

```bash
flyctl secrets set SUPABASE_DB_HOST="db.xxxxxxxxxxxxx.supabase.co"
flyctl secrets set SUPABASE_DB_PASSWORD="your-password"
flyctl secrets set SUPABASE_PROJECT_REF="xxxxxxxxxxxxx"
flyctl secrets set SUPABASE_STORAGE_ACCESS_KEY="your-key"
flyctl secrets set SUPABASE_STORAGE_SECRET_KEY="your-key"
flyctl secrets set RESEND_API_KEY="re_xxxxxxxxxxxxx"
flyctl secrets set LISTMONK_API_PASSWORD="your-secure-password"
flyctl secrets set LISTMONK_ENCRYPTION_KEY="your-32-char-key"
```

Verify secrets are set:
```bash
flyctl secrets list
```

### 6. Deploy to Fly.io

```bash
# Deploy the app
flyctl deploy

# This will:
# - Build Docker image from listmonk/Dockerfile.production
# - Push to Fly.io registry
# - Deploy to your VM
# - Takes 2-3 minutes
```

Watch deployment logs:
```bash
flyctl logs
```

### 7. Initialize Listmonk Database

**IMPORTANT:** First time setup only

Open a console on your Fly.io app:
```bash
flyctl ssh console

# Inside the container, run:
./listmonk --install

# Answer prompts:
# - Yes to create tables
# - Exit when done
```

Alternative method (if SSH doesn't work):
```bash
flyctl ssh issue --agent
flyctl ssh console
```

### 8. Configure Custom Domain

1. Add domain to Fly.io:
```bash
flyctl certs create listmonk.yugometals.com
```

2. Fly.io will provide DNS instructions. Add to your domain registrar:
```
Type: A
Name: listmonk
Value: [IP address provided by Fly.io]

Type: AAAA (IPv6)
Name: listmonk
Value: [IPv6 address provided by Fly.io]
```

3. Verify certificate status:
```bash
flyctl certs show listmonk.yugometals.com
```

4. Wait for DNS propagation and SSL certificate (5-30 minutes)

### 9. Access Listmonk and Create Admin

1. Visit: `https://listmonk.yugometals.com`
2. Create admin account:
   - Email: `admin@yugometals.com`
   - Password: (use strong password)
3. Save credentials securely

### 10. Create Mailing Lists

Run the setup script from your local machine:

```bash
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects/yugo-metals"

# Update environment variables for production
LISTMONK_URL=https://listmonk.yugometals.com \
LISTMONK_USERNAME=admin@yugometals.com \
LISTMONK_PASSWORD=your-admin-password \
node scripts/setup-listmonk.js
```

This creates your 4 mailing lists:
- General News & Updates
- Investor Updates
- ASX Announcements
- Quarterly Reports

**Note the List IDs** from the output. Update `app/api/subscribe/route.ts` if they differ from defaults (3, 4, 5, 6).

### 11. Monitoring and Scaling

Monitor your Fly.io app:
```bash
# View logs in real-time
flyctl logs

# Check app status
flyctl status

# View metrics
flyctl dashboard
```

**Free Tier Limits:**
- You get 3 VMs on free tier
- Currently using 1 VM for Listmonk
- Can scale up if needed (stays free within 3 VMs)

To scale (if needed in future):
```bash
flyctl scale count 2  # Scale to 2 instances
```

---

## Phase 4: Vercel Deployment

### 1. Push Code to GitHub

Ensure all changes are committed:

```bash
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects/yugo-metals"

git add .
git commit -m "Add production deployment configuration"
git push origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com and sign in with GitHub
2. Click **Add New** → **Project**
3. Import repository: `Jackattack2121/yug`
4. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./` (project root)
   - **Build Command:** `npm run build` (auto-detected)
   - **Output Directory:** `.next` (auto-detected)
   - **Install Command:** `npm install` (auto-detected)

5. Click **Deploy**

### 3. Add Environment Variables

While deployment is running:

1. Go to **Project Settings** → **Environment Variables**
2. Add the following variables for **Production**:

```bash
LISTMONK_URL=https://listmonk.yugometals.com
LISTMONK_USERNAME=listmonk_api
LISTMONK_PASSWORD=your-listmonk-api-password
NEXT_PUBLIC_SITE_URL=https://yugometals.com
```

3. Click **Save**
4. Trigger a redeploy if needed

### 3.1. Production Environment Variables Checklist

Before going live, verify ALL environment variables are properly set. Use `.env.production.template` as a reference.

**CRITICAL - Required for Basic Functionality:**

| Variable | Purpose | How to Generate | Status |
|----------|---------|----------------|--------|
| `NEXTAUTH_URL` | Production domain for auth | `https://yugometals.com` | [ ] |
| `NEXTAUTH_SECRET` | Auth session encryption | `openssl rand -base64 32` | [ ] |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | `https://yugometals.com` | [ ] |
| `ADMIN_EMAIL` | Admin login email | Set to your email | [ ] |
| `ADMIN_PASSWORD_HASH` | Admin password hash | `node scripts/generate-admin-password.js "password"` | [ ] |

**IMPORTANT - Required for Email Features:**

| Variable | Purpose | How to Set | Status |
|----------|---------|-----------|--------|
| `LISTMONK_URL` | Listmonk instance URL | `https://listmonk.yugometals.com` | [ ] |
| `LISTMONK_USERNAME` | Listmonk API username | `listmonk_api` (default) | [ ] |
| `LISTMONK_PASSWORD` | Listmonk API password | Set strong password (16+ chars) | [ ] |

**Note:** If Listmonk variables are missing or use localhost, email subscription forms will gracefully show "Email subscriptions launching soon" message instead of failing.

**OPTIONAL - Features Disabled if Missing:**

| Variable | Purpose | Impact if Missing | Status |
|----------|---------|------------------|--------|
| `DIRECTUS_URL` | CMS instance URL | CMS features disabled | [ ] |
| `DIRECTUS_TOKEN` | CMS API token | CMS integration won't work | [ ] |
| `NEXT_PUBLIC_DIRECTUS_URL` | Public CMS URL | Client-side CMS calls fail | [ ] |
| `GA_MEASUREMENT_ID` | Google Analytics tracking | No analytics tracking | [ ] |
| `GA_PROPERTY_ID` | GA property ID | No GA dashboard | [ ] |

**Security Verification Checklist:**

- [ ] No URLs contain `localhost` or `127.0.0.1`
- [ ] All URLs use `https://` (not `http://`)
- [ ] `NEXTAUTH_SECRET` is unique (not copied from `.env.local`)
- [ ] All passwords are 16+ characters
- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets committed to git repository
- [ ] API keys are production-specific (not development keys)

**Common Mistakes to Avoid:**

1. Using development `NEXTAUTH_SECRET` in production (security risk)
2. Forgetting to update `NEXT_PUBLIC_SITE_URL` (breaks API calls)
3. Using localhost URLs (causes production failures)
4. Weak passwords (security vulnerability)
5. Committing `.env.local` or `.env.production` to git

**Validation Commands:**

Test your production build locally before deploying:

```bash
# Set production env vars in Vercel/platform first, then:
npm run build
npm run start

# Test these URLs:
# - http://localhost:3000 (should work)
# - Check browser console for errors
# - Test subscription form
# - Verify no localhost API calls
```

### 4. Configure Custom Domain

1. Go to **Project Settings** → **Domains**
2. Add domain: `yugometals.com`
3. Add domain: `www.yugometals.com`
4. Vercel will provide DNS instructions

**Add to your domain registrar:**

```
# Root domain
Type: A
Name: @
Value: 76.76.21.21

# WWW subdomain
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

5. Wait for DNS propagation (5-30 minutes)
6. SSL certificates will be automatically provisioned

---

## Phase 5: DNS Configuration Summary

Add all DNS records to your domain registrar at once:

```
# Main website (Vercel)
A       @                       76.76.21.21
CNAME   www                     cname.vercel-dns.com

# Listmonk (Fly.io)
A       listmonk                [IP provided by Fly.io]
AAAA    listmonk                [IPv6 provided by Fly.io]

# Email sending (Resend)
TXT     @                       v=spf1 include:resend.com ~all
TXT     resend._domainkey       [Resend DKIM key - very long]
CNAME   bounce                  [Resend bounce server]

# Optional: Directus CMS (if deploying)
CNAME   cms                     [cms-project].railway.app
```

---

## Phase 6: Testing & Verification

### 1. Test Email Subscription Flow

1. Visit: https://yugometals.com/investors
2. Scroll to "Email Subscriptions" section
3. Fill out form with test email
4. Submit form
5. Verify:
   - Success message appears
   - Check Listmonk dashboard for new subscriber
   - Check email inbox for confirmation (if double opt-in enabled)

### 2. Test Email Campaign

1. Log into Listmonk: https://listmonk.yugometals.com
2. Go to **Campaigns** → **New Campaign**
3. Create test campaign:
   - Name: "Test Email"
   - Subject: "Welcome to Yugo Metals"
   - Lists: Select "General News & Updates"
4. Write simple message
5. Click **Send test** to your email
6. Verify email arrives and looks correct
7. Check all links work

### 3. Test API Endpoint

Test the subscription API directly:

```bash
curl -X POST https://yugometals.com/api/subscribe \
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

Expected response:
```json
{
  "success": true,
  "message": "Successfully subscribed! Please check your email to confirm.",
  "subscriber_id": 123
}
```

### 4. Monitor Logs

**Fly.io (Listmonk):**
1. View logs: `flyctl logs`
2. Check app status: `flyctl status`
3. Watch for any errors or warnings
4. Check database connections are working

**Vercel (Next.js):**
1. Go to Vercel dashboard → Your project
2. Click **Functions** → View logs
3. Test API routes and check responses
4. Monitor for errors

### 5. Test Performance

- Test page load speeds: https://pagespeed.web.dev/
- Test email deliverability: https://www.mail-tester.com/
- Test form submissions under load
- Verify images load from correct sources

---

## Phase 7: Security Checklist

- [ ] All environment variables use Fly.io secrets and Vercel environment variables (not hardcoded)
- [ ] Listmonk admin password is strong and unique
- [ ] `LISTMONK_ENCRYPTION_KEY` is unique for production (never use dev key)
- [ ] Supabase Row Level Security (RLS) policies are configured
- [ ] Supabase API keys are restricted to specific domains
- [ ] HTTPS/SSL is enabled on all services (auto with Fly.io/Vercel)
- [ ] Fly.io app is publicly accessible only via HTTPS
- [ ] Vercel environment variables are set to "Production" only
- [ ] `.env.production` is added to `.gitignore`
- [ ] Test email credentials removed from Listmonk
- [ ] Database backups are enabled in Supabase (automatic)
- [ ] Monitor logs for suspicious activity

---

## Phase 8: Post-Launch Monitoring

### Week 1: Daily Checks

- [ ] Check Fly.io logs for errors: `flyctl logs`
- [ ] Monitor Resend dashboard for bounce rates
- [ ] Verify email deliverability (check spam folders)
- [ ] Test subscription form multiple times
- [ ] Check Supabase dashboard for connection issues
- [ ] Monitor website uptime
- [ ] Review Vercel analytics

### Week 2-4: Weekly Checks

- [ ] Review email engagement metrics in Listmonk
- [ ] Check database storage usage in Supabase
- [ ] Review Fly.io dashboard and usage (should be $0)
- [ ] Test backup restoration (if applicable)
- [ ] Review and respond to subscriber feedback
- [ ] Optimize slow queries if needed

### Alerts to Set Up

1. **Uptime Monitoring:** Use UptimeRobot (free) or Better Uptime
   - Monitor: `yugometals.com`
   - Monitor: `listmonk.yugometals.com`
   - Alert via: Email and/or SMS

2. **Fly.io Monitoring:**
   - Set up alerts via `flyctl` or Fly.io dashboard
   - Monitor via: `flyctl dashboard`
   - Watch logs: `flyctl logs`

3. **Resend Alerts:**
   - Set up bounce rate alerts (if available)
   - Monitor sending limits

4. **Supabase Alerts:**
   - Monitor database size
   - Set up alerts for connection issues

---

## Rollback Plan

If something goes wrong, here's how to rollback:

### Vercel Rollback
1. Go to Vercel dashboard → Deployments
2. Find previous working deployment
3. Click **•••** → **Promote to Production**
4. Rollback is instant

### Fly.io Rollback
1. List previous releases:
```bash
flyctl releases
```

2. Rollback to previous version:
```bash
flyctl releases rollback [version-number]
```

3. Wait 1-2 minutes for rollback

### Database Rollback (Supabase)
1. Go to Supabase dashboard → Database → Backups
2. Select point-in-time to restore
3. Create new restore (creates copy, doesn't overwrite)
4. Update Railway connection string to new database

### Local Fallback
Keep `docker-compose.yml` working locally:
```bash
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects/yugo-metals"
docker-compose up -d
```

---

## Troubleshooting

### Issue: Listmonk won't start on Fly.io

**Solution:**
1. Check Fly.io logs for specific error:
```bash
flyctl logs
```

2. Verify all secrets are set correctly:
```bash
flyctl secrets list
```

3. Ensure `SUPABASE_DB_HOST` includes full domain
4. Verify Supabase allows connections (Fly.io IPs are whitelisted)
5. Test database connection locally:
```bash
psql "postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres?sslmode=require"
```

### Issue: Emails not sending

**Solution:**
1. Check Resend dashboard for error logs
2. Verify domain is verified in Resend
3. Check DNS records are propagated: `dig resend._domainkey.yugometals.com TXT`
4. Test SMTP connection from Fly.io logs: `flyctl logs`
5. Verify `RESEND_API_KEY` is correct: `flyctl secrets list`

### Issue: Subscription form not working

**Solution:**
1. Check browser console for JavaScript errors
2. Verify API route is deployed: `https://yugometals.com/api/subscribe`
3. Check Vercel function logs for errors
4. Verify environment variables in Vercel
5. Test API endpoint with curl (see Phase 6)

### Issue: Images not uploading to Supabase

**Solution:**
1. Verify bucket exists: `listmonk-uploads`
2. Check bucket permissions (public vs private)
3. Verify service role key has storage permissions
4. Check Supabase storage logs
5. Verify endpoint URL format

### Issue: Approaching Fly.io Free Tier Limits

**Solution:**
1. Check Fly.io dashboard for usage
2. Free tier includes:
   - 3 VMs with 256MB RAM
   - 3GB persistent storage
   - 160GB outbound transfer
3. Optimize if needed:
   - Reduce database connections (lower `max_open`)
   - Optimize image sizes
   - Monitor bandwidth usage
4. Upgrade to paid tier if consistently exceeding free limits ($1.94/month per VM)

---

## Cost Breakdown

### Monthly Costs

| Service | Plan | Cost | Notes |
|---------|------|------|-------|
| Vercel | Hobby | $0 | Free forever for personal/commercial |
| Fly.io | Free Tier | **$0** 🎉 | 3 shared VMs, 256MB RAM each, 160GB bandwidth |
| Supabase | Pro | $25 | Already paid |
| Resend | Free Tier | $0 | Up to 100 emails/day, 3,000/month |
| **Total** | | **$25/month** | Or **$0/month** for new services! |

### Free Tier Limits

**Fly.io Free Tier Includes:**
- 3 shared-cpu-1x VMs @ 256MB RAM each
- 3GB persistent storage volumes
- 160GB outbound data transfer/month
- Excellent for small production workloads

**Resend Free Tier Includes:**
- 100 emails per day
- 3,000 emails per month
- All features unlocked
- Perfect for investor updates

### Cost Optimization

- **Resend:** Stay on free tier until sending >100 emails/day (upgrade to $20/month if needed)
- **Fly.io:** Stays free within 3 VMs and 160GB bandwidth (upgrade is $1.94/VM/month if needed)
- **Supabase:** Monitor storage usage, clean old data
- **Vercel:** Free tier is sufficient for most use cases

**Total infrastructure cost: $0/month for new services!** 🎉

---

## Next Steps & Enhancements

After successful deployment, consider:

### Short-term (Week 1-4)
- [ ] Set up automated backups to external storage
- [ ] Configure email templates in Listmonk
- [ ] Add subscriber welcome email automation
- [ ] Set up Google Analytics or Plausible
- [ ] Configure sitemap and robots.txt
- [ ] Submit to Google Search Console

### Medium-term (Month 2-3)
- [ ] Add rate limiting to API routes
- [ ] Implement Redis caching (Upstash free tier or Fly.io Redis)
- [ ] Set up staging environment
- [ ] Add Sentry for error tracking
- [ ] Create automated testing suite
- [ ] Implement CI/CD with GitHub Actions

### Long-term (Month 4+)
- [ ] A/B testing for email campaigns
- [ ] Advanced segmentation in Listmonk
- [ ] Integration with CRM (if needed)
- [ ] Custom analytics dashboard
- [ ] Multi-language support
- [ ] Mobile app (if needed)

---

## Support & Resources

- **Listmonk Docs:** https://listmonk.app/docs
- **Fly.io Docs:** https://fly.io/docs
- **Vercel Docs:** https://vercel.com/docs
- **Supabase Docs:** https://supabase.com/docs
- **Resend Docs:** https://resend.com/docs
- **Next.js Docs:** https://nextjs.org/docs

---

## Deployment Timeline

**Total estimated time: 4-6 hours**

- **Phase 1-2:** 1 hour (Supabase + Resend setup)
- **Phase 3:** 2 hours (Fly.io CLI install + deployment + configuration)
- **Phase 4:** 30 minutes (Vercel deployment)
- **Phase 5:** 30 minutes (DNS configuration)
- **Phase 6-7:** 1 hour (Testing + security)
- **Phase 8:** 30 minutes (Monitoring setup)

---

## Success Criteria

Deployment is successful when:

✅ All services are accessible via HTTPS
✅ Email subscription form works end-to-end
✅ Test emails are received without landing in spam
✅ Website loads in <2 seconds
✅ No errors in Fly.io/Vercel logs
✅ All DNS records are verified
✅ Backup systems are in place
✅ Monitoring and alerts are configured
✅ Staying within Fly.io free tier limits

---

**Deployment completed by:** _______________
**Verified by:** _______________
**Date:** _______________

---

*This deployment guide is part of the Yugo Metals / CoreConnect project.*

