# Yugo Metals - Production Deployment Checklist

Use this checklist to track your deployment progress.

## Pre-Deployment Preparation

### 1. Local Environment Setup ✓
- [x] Project cloned and running locally
- [x] All dependencies installed (`npm install`)
- [x] Docker services running (`docker-compose up -d`)
- [x] Listmonk mailing lists created (`node scripts/setup-listmonk.js`)
- [x] Website tested locally (http://localhost:3000)
- [x] Email subscriptions tested locally

### 2. Generate Production Keys
- [ ] Run key generation script: `./scripts/generate-env-keys.sh`
- [ ] Save `LISTMONK_API_PASSWORD` to password manager
- [ ] Save `LISTMONK_ENCRYPTION_KEY` to password manager
- [ ] Verify keys are at least 32 characters

### 3. Code Repository
- [ ] All code committed to Git
- [ ] Repository pushed to GitHub: `https://github.com/Jackattack2121/yug.git`
- [ ] `.gitignore` properly configured (no secrets committed)
- [ ] Repository is accessible from Railway and Vercel

---

## Phase 1: Supabase Configuration

### Database Setup
- [ ] Supabase project created
- [ ] Note Supabase connection details:
  - [ ] Host: `db.xxxxxxxxxxxxx.supabase.co`
  - [ ] Project Ref: `xxxxxxxxxxxxx`
  - [ ] Database Password saved
- [ ] Connection pooling enabled (optional)

### Storage Setup
- [ ] Storage bucket created: `listmonk-uploads`
- [ ] Bucket set to Private (recommended)
- [ ] Service role key generated and saved
- [ ] CORS configured (if needed)

### Verification
- [ ] Can connect to database from local machine
- [ ] Can upload file to storage bucket
- [ ] Service role key has proper permissions

**Estimated Time:** 30 minutes

---

## Phase 2: Resend Email Service

### Domain Verification
- [ ] Resend account created
- [ ] Domain added: `yugometals.com`
- [ ] DNS records obtained from Resend

### DNS Configuration
- [ ] SPF record added: `TXT @ v=spf1 include:resend.com ~all`
- [ ] DKIM record added: `TXT resend._domainkey [key]`
- [ ] Bounce CNAME added: `CNAME bounce [server]`
- [ ] DNS propagation verified (use `dig` or online tools)
- [ ] Domain shows "Verified" in Resend dashboard

### API Key
- [ ] API key generated: Name "Yugo Metals Listmonk Production"
- [ ] API key saved to password manager (starts with `re_`)
- [ ] Test email sent from Resend dashboard

**Estimated Time:** 30 minutes (+ DNS propagation time)

---

## Phase 3: Railway Deployment (Listmonk)

### Prepare Environment Variables
- [ ] All values collected from Phase 1 & 2
- [ ] `SUPABASE_DB_HOST` ready
- [ ] `SUPABASE_DB_PASSWORD` ready
- [ ] `SUPABASE_PROJECT_REF` ready
- [ ] `SUPABASE_STORAGE_ACCESS_KEY` ready (service role key)
- [ ] `SUPABASE_STORAGE_SECRET_KEY` ready (service role key)
- [ ] `RESEND_API_KEY` ready
- [ ] `LISTMONK_API_PASSWORD` ready (generated in pre-deployment)
- [ ] `LISTMONK_ENCRYPTION_KEY` ready (generated in pre-deployment)

### Deploy to Railway
- [ ] Railway account created
- [ ] New project created
- [ ] GitHub repository connected
- [ ] Railway detects `railway.json` and Dockerfile
- [ ] Initial build completed (wait 2-3 minutes)

### Configure Variables
- [ ] All 8 environment variables added to Railway
- [ ] Variables double-checked for typos
- [ ] Service redeployed with new variables
- [ ] Deployment logs show no errors

### Initialize Database
- [ ] Railway shell opened (or Railway CLI installed)
- [ ] Run: `./listmonk --install`
- [ ] Database schema created successfully
- [ ] No errors in initialization

### Custom Domain
- [ ] Railway domain generated: `[project].railway.app`
- [ ] Custom domain added: `listmonk.yugometals.com`
- [ ] CNAME record added to DNS: `CNAME listmonk [project].railway.app`
- [ ] SSL certificate provisioned (automatic)
- [ ] Domain accessible via HTTPS

### Create Admin User
- [ ] Visited: `https://listmonk.yugometals.com`
- [ ] Admin account created: `admin@yugometals.com`
- [ ] Strong password set and saved
- [ ] Can log into Listmonk web UI

### Create Mailing Lists
- [ ] Setup script run: `LISTMONK_URL=https://listmonk.yugometals.com node scripts/setup-listmonk.js`
- [ ] 4 mailing lists created:
  - [ ] General News & Updates
  - [ ] Investor Updates
  - [ ] ASX Announcements
  - [ ] Quarterly Reports
- [ ] List IDs noted (should be 3, 4, 5, 6)

**Estimated Time:** 2 hours

---

## Phase 4: Vercel Deployment (Website)

### Deploy to Vercel
- [ ] Vercel account created
- [ ] New project created from GitHub
- [ ] Repository imported: `Jackattack2121/yug`
- [ ] Framework detected: Next.js
- [ ] Build settings confirmed (auto-detected)
- [ ] Initial deployment successful

### Add Environment Variables
Variables added to Vercel (Production environment):
- [ ] `LISTMONK_URL=https://listmonk.yugometals.com`
- [ ] `LISTMONK_USERNAME=listmonk_api`
- [ ] `LISTMONK_PASSWORD=[your-api-password]`
- [ ] `NEXT_PUBLIC_SITE_URL=https://yugometals.com`
- [ ] Service redeployed after adding variables

### Custom Domain
- [ ] Vercel temporary domain tested: `[project].vercel.app`
- [ ] Custom domain added: `yugometals.com`
- [ ] WWW domain added: `www.yugometals.com`
- [ ] DNS records obtained from Vercel

**Estimated Time:** 30 minutes

---

## Phase 5: DNS Configuration

### Add DNS Records to Domain Registrar

**Website (Vercel):**
- [ ] `A @ 76.76.21.21` (or IP provided by Vercel)
- [ ] `CNAME www cname.vercel-dns.com`

**Listmonk (Railway):**
- [ ] `CNAME listmonk [project].railway.app`

**Email (Resend):**
- [ ] `TXT @ v=spf1 include:resend.com ~all`
- [ ] `TXT resend._domainkey [long-key]`
- [ ] `CNAME bounce [resend-server]`

### Verify DNS
- [ ] All records added to domain registrar
- [ ] DNS propagation checked: `dig yugometals.com`
- [ ] All records resolving correctly
- [ ] SSL certificates issued (automatic, wait 5-30 min)

**Estimated Time:** 30 minutes (+ propagation time)

---

## Phase 6: Testing & Verification

### Test Website
- [ ] Visit: `https://yugometals.com`
- [ ] All pages load correctly
- [ ] No 404 errors
- [ ] Images load properly
- [ ] Videos play correctly
- [ ] Animations work smoothly
- [ ] Mobile responsive

### Test Listmonk Admin
- [ ] Visit: `https://listmonk.yugometals.com`
- [ ] Can log in successfully
- [ ] All 4 mailing lists visible
- [ ] Can create test campaign
- [ ] Test email sends successfully

### Test Email Subscription
- [ ] Visit: `https://yugometals.com/investors`
- [ ] Scroll to subscription form
- [ ] Fill out form with test email
- [ ] Submit form
- [ ] Success message appears
- [ ] Subscriber appears in Listmonk dashboard
- [ ] Confirmation email received (if enabled)

### Test API Endpoint
```bash
curl -X POST https://yugometals.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","name":"Test","preferences":{"news":true}}'
```
- [ ] API returns 200 status
- [ ] Success message in response
- [ ] Subscriber created in Listmonk

### Check Logs
- [ ] Railway logs show no errors
- [ ] Vercel function logs show no errors
- [ ] Supabase dashboard shows connections
- [ ] Resend dashboard shows test emails

### Performance Testing
- [ ] Run Lighthouse audit (target: 90+ score)
- [ ] Test page load speed (<3 seconds)
- [ ] Test on mobile device
- [ ] Test in different browsers (Chrome, Safari, Firefox)

**Estimated Time:** 1 hour

---

## Phase 7: Security & Cleanup

### Security Checks
- [ ] All secrets in Railway/Vercel (not in code)
- [ ] `.env.production` not committed to Git
- [ ] Listmonk admin password is strong
- [ ] `LISTMONK_ENCRYPTION_KEY` is unique (not from dev)
- [ ] Supabase RLS policies configured
- [ ] Supabase API keys restricted to domains
- [ ] Test subscriber data removed from Listmonk

### Documentation
- [ ] Deployment date documented
- [ ] All passwords saved in password manager
- [ ] Team members granted necessary access
- [ ] Backup of environment variables stored securely

**Estimated Time:** 30 minutes

---

## Phase 8: Monitoring Setup

### Uptime Monitoring
- [ ] UptimeRobot account created (or similar)
- [ ] Monitor added: `yugometals.com`
- [ ] Monitor added: `listmonk.yugometals.com`
- [ ] Alert email configured
- [ ] Test alert sent

### Service Alerts
- [ ] Railway deployment alerts enabled
- [ ] Railway crash alerts enabled
- [ ] Vercel deployment notifications enabled
- [ ] Supabase usage alerts configured

### Analytics (Optional)
- [ ] Google Analytics added (if desired)
- [ ] Vercel Analytics enabled
- [ ] Resend webhook configured for bounce tracking

**Estimated Time:** 30 minutes

---

## Post-Launch Checklist

### Week 1 (Daily)
- [ ] Day 1: Check Railway logs
- [ ] Day 1: Check Vercel function logs
- [ ] Day 1: Test subscription form
- [ ] Day 1: Verify emails delivered
- [ ] Day 2: Monitor error rates
- [ ] Day 3: Check email deliverability
- [ ] Day 4: Review subscriber growth
- [ ] Day 5: Test all pages again
- [ ] Day 6: Check database size
- [ ] Day 7: Review performance metrics

### Week 2-4 (Weekly)
- [ ] Week 2: Review logs and metrics
- [ ] Week 2: Send first email campaign
- [ ] Week 3: Monitor engagement rates
- [ ] Week 3: Check bounce rates
- [ ] Week 4: Optimize slow queries
- [ ] Week 4: Review security logs

---

## Rollback Plan

If anything goes wrong:

### Vercel Rollback
1. [ ] Go to Vercel → Deployments
2. [ ] Find last working deployment
3. [ ] Click ••• → Promote to Production
4. [ ] Verify site is working

### Railway Rollback
1. [ ] Go to Railway → Deployments
2. [ ] Find last working deployment
3. [ ] Click ••• → Redeploy
4. [ ] Wait 2-3 minutes
5. [ ] Verify Listmonk is working

### Database Rollback (Supabase)
1. [ ] Go to Supabase → Database → Backups
2. [ ] Select restore point
3. [ ] Create new database from backup
4. [ ] Update Railway connection string
5. [ ] Redeploy Railway service

---

## Final Sign-Off

- [ ] All phases completed successfully
- [ ] All tests passing
- [ ] Monitoring active
- [ ] Team trained on new system
- [ ] Documentation complete

**Deployment Date:** _______________

**Deployed By:** _______________

**Verified By:** _______________

**Sign-Off:** _______________

---

## Quick Reference

| Service | URL | Login |
|---------|-----|-------|
| Website | https://yugometals.com | N/A |
| Listmonk | https://listmonk.yugometals.com | admin@yugometals.com |
| Railway | https://railway.app/dashboard | GitHub OAuth |
| Vercel | https://vercel.com/dashboard | GitHub OAuth |
| Supabase | https://app.supabase.com | Email/Password |
| Resend | https://resend.com/overview | Email/Password |

---

## Support Contacts

- **Technical Issues:** See DEPLOYMENT.md
- **Listmonk Issues:** https://github.com/knadh/listmonk/issues
- **Urgent Rollback:** Follow rollback plan above

---

**Total Estimated Time:** 4-6 hours

**Budget:** ~$30/month (or $10/month if you have Supabase)

---

*Keep this checklist for reference and future deployments.*

