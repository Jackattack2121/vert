# 🎉 Listmonk Email Platform - SETUP COMPLETE!

## ✅ What Was Automated

The setup script has successfully configured Listmonk with all investor mailing lists!

### Created Mailing Lists:

1. **Investor Updates** (ID: 3)
   - General investor updates, company news, and announcements
   - Tags: investors, general

2. **ASX Announcements** (ID: 4)
   - Urgent ASX market announcements and price-sensitive information
   - Tags: investors, asx, urgent

3. **Quarterly Reports** (ID: 5)
   - Quarterly financial and activities reports
   - Tags: investors, reports

4. **Media & Press** (ID: 6)
   - Media releases and press coverage notifications
   - Tags: investors, media

---

## 🔐 Credentials

### Web UI Login (Listmonk Dashboard)
- **URL:** http://localhost:9000
- **Email:** admin@yugometals.com
- **Password:** ADMIN1234

### API Credentials (For Automation)
- **Username:** listmonk_api
- **Password:** YUG_API_2024_Secure!
- **Stored in:** `listmonk/config.toml` and `.env.local`

**Note:** API credentials are separate from web UI login!

---

## 🌐 Subscription Forms - LIVE!

The subscription forms on your website are now **fully functional** and connected to Listmonk:

### Where to Test:
- **Main Dashboard:** http://localhost:3003/investors
- **Footer:** Every page (inline form)
- **ESG Page:** http://localhost:3003/investors/esg

### How It Works:
1. User enters email and selects preferences
2. Form sends to `/api/subscribe`
3. API creates subscriber in Listmonk
4. Listmonk sends double opt-in confirmation email
5. User confirms → subscribed!

---

## 📧 Next Step: Configure SMTP

**You MUST configure SMTP to send emails!**

### In Listmonk Dashboard:
1. Go to http://localhost:9000
2. Click **Settings** → **SMTP**
3. Click **"+ New"** button

### Recommended: SendGrid (Free Tier)
1. Sign up: https://sendgrid.com (free 100 emails/day)
2. Get API key
3. Configure in Listmonk:
   ```
   Host: smtp.sendgrid.net
   Port: 587
   Auth: login
   Username: apikey
   Password: [Your SendGrid API Key]
   TLS: Enabled
   Max connections: 10
   ```
4. Click **Test** to verify
5. Click **Save**

### Alternative: Gmail (Testing Only)
```
Host: smtp.gmail.com
Port: 587
Auth: login
Username: your-gmail@gmail.com
Password: [App Password from Google]
TLS: Enabled
```

**Get Gmail App Password:** https://myaccount.google.com/apppasswords

---

## 🧪 Test the Email System

### 1. Add Yourself as a Subscriber
- Go to http://localhost:3003/investors
- Fill out the subscription form
- Use your real email

### 2. Send Test Campaign
In Listmonk dashboard:
1. Go to **Campaigns** → **+ New campaign**
2. Fill in:
   - Name: "Test Email"
   - Subject: "Welcome to Yugo Metals Investor Updates"
   - Lists: Select "Investor Updates"
3. Add content (use the editor)
4. Click **"Continue"** → **"Start campaign"**
5. Check your email!

---

## 📁 Files Created/Modified

### New Files:
- `scripts/setup-listmonk.js` - Automated setup script
- `scripts/debug-listmonk.js` - API connection debugger
- `app/api/subscribe/route.ts` - Subscription API endpoint
- `.env.local` - Environment variables with API credentials
- `LISTMONK_SETUP_COMPLETE.md` - This file

### Modified Files:
- `listmonk/config.toml` - Added API credentials
- `components/investor/SubscriptionForm.tsx` - Connected to real API
- `docker-compose.yml` - Added Listmonk services

---

## 🚀 Usage

### Run Everything:
```bash
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects/yugo-metals"

# Start all services
docker-compose up -d

# Start website
npm run dev
```

### Access:
- **Website:** http://localhost:3003
- **Investor Centre:** http://localhost:3003/investors
- **Listmonk:** http://localhost:9000
- **Directus:** http://localhost:8055

---

## 🔧 Troubleshooting

### Subscription Not Working?
```bash
# Check API credentials are loaded
curl -u listmonk_api:YUG_API_2024_Secure! http://localhost:9000/api/health

# Should return: {"data":true}
```

### Emails Not Sending?
1. Check SMTP configured in Listmonk Settings
2. Send test email from Listmonk dashboard
3. Check spam folder
4. Verify SMTP credentials

### Reset Everything:
```bash
docker-compose down -v
docker-compose up -d
node scripts/setup-listmonk.js
```

---

## 📊 Integration Summary

```
Website Form → /api/subscribe → Listmonk API → Email Sent
     ↓              ↓                ↓              ↓
  User Info    Authentication   Create Sub   Double Opt-in
```

---

## 🎯 Next Steps for Production

### 1. Security:
- [ ] Change API password in `listmonk/config.toml`
- [ ] Update `.env.local` with new password
- [ ] Use environment variables, don't commit passwords
- [ ] Set up HTTPS/SSL

### 2. Email Provider:
- [ ] Sign up for SendGrid/AWS SES
- [ ] Configure SMTP in Listmonk
- [ ] Test email delivery
- [ ] Monitor bounce rates

### 3. Content:
- [ ] Create welcome email template
- [ ] Design investor update templates
- [ ] Set up automated campaigns
- [ ] Add unsubscribe footer

### 4. CoreConnect Multi-Tenancy:
- [ ] Decide on single vs multiple Listmonk instances
- [ ] Build custom UI wrapper
- [ ] Integrate with CoreConnect dashboard
- [ ] Add per-client branding

---

## 📞 Need Help?

**Debug Connection:**
```bash
node scripts/debug-listmonk.js
```

**Re-run Setup:**
```bash
node scripts/setup-listmonk.js
```

**Check Logs:**
```bash
docker-compose logs listmonk
docker-compose logs listmonk_db
```

---

## 🎉 Success!

Your investor centre is now a world-class platform with:
- ✅ Professional investor dashboard
- ✅ Email subscription management
- ✅ Self-hosted email marketing (no monthly fees!)
- ✅ Ready for CoreConnect multi-tenancy
- ✅ Full API control

**Total cost: $0/month** (vs $100-300/month for Relait)

---

**Built with ❤️ for Yugo Metals and CoreConnect**

Last updated: October 30, 2025

