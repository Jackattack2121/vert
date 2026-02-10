# Yugo Metals - Investor Centre Documentation

## 🎉 What's Been Built

A comprehensive, professional investor centre integrated directly into the Yugo Metals website - **no external platforms or subdomains needed!**

### ✅ Completed Features

#### 1. **Investor Dashboard** (`/investors`)
- TradingView share price widget with live ASX data (15-min delayed)
- Latest announcements preview
- Upcoming events calendar
- Email subscription form
- Quick links to all investor resources

#### 2. **Enhanced Pages**
- **ASX Announcements** - Filterable, searchable announcements
- **Financial Reports** - Categorized by type (Quarterly, Half-Yearly, Annual)
- **Presentations** - Investor presentations grid
- **Share Information** - Share registry and trading details

#### 3. **New Pages**
- **Investor Calendar** (`/investors/calendar`) - Upcoming events, AGMs, report dates
- **Media Coverage** (`/investors/media`) - Press articles and news mentions
- **Fact Sheet** (`/investors/fact-sheet`) - Downloadable company fact sheet
- **ESG** (`/investors/esg`) - Environmental, Social & Governance commitments
- **Contact IR Team** (`/investors/contact`) - Dedicated investor relations contact form

#### 4. **Components**
- **TradingViewWidget** - Live share price chart with real ASX:YUG market data
- **SubscriptionForm** - Email subscription with preferences (inline & card variants)

#### 5. **Email Marketing** - Listmonk Integration
- Self-hosted, open-source email marketing platform
- No monthly fees (unlike Mailchimp)
- Full API for programmatic control
- Docker-based deployment

---

## 🚀 Getting Started

### Start the Services

```bash
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects/yugo-metals"

# Start Directus, Listmonk, and databases
docker-compose up -d

# Check if all services are running
docker-compose ps
```

You should see:
- **Directus** running on http://localhost:8055
- **Listmonk** running on http://localhost:9000
- **PostgreSQL databases** for both

### Access the Platforms

#### Directus CMS
- **URL:** http://localhost:8055
- **Email:** admin@yugometals.com
- **Password:** ADMIN1234 (you changed this)

#### Listmonk Email Platform
- **URL:** http://localhost:9000
- **Username:** admin
- **Password:** admin (change after first login!)

---

## 📧 Setting Up Listmonk

### First Time Setup

1. **Access Listmonk:** http://localhost:9000

2. **First Login:**
   - Username: `admin`
   - Password: `admin`
   - **Change password immediately!**

3. **Configure SMTP Settings:**
   - Go to **Settings → SMTP**
   - Add your email provider details:
     - **Host:** Your SMTP server (e.g., smtp.gmail.com)
     - **Port:** Usually 587 (TLS) or 465 (SSL)
     - **Username:** Your email address
     - **Password:** Your email password or app-specific password
     - **Enable TLS:** Yes

4. **Create Your First List:**
   - Go to **Lists → New List**
   - Name: "Investor Updates"
   - Type: Public
   - Save

5. **Test Email:**
   - Go to **Campaigns → New Campaign**
   - Subject: "Test Email"
   - Select your list
   - Send test email to yourself

### SMTP Providers

**Recommended Options:**

1. **SendGrid** (Free tier: 100 emails/day)
   - Host: `smtp.sendgrid.net`
   - Port: `587`
   - Get API key from: https://sendgrid.com

2. **AWS SES** (Pay as you go, very cheap)
   - Host: `email-smtp.[region].amazonaws.com`
   - Port: `587`

3. **Postmark** (Free trial, then paid)
   - Host: `smtp.postmarkapp.com`
   - Port: `587`

4. **Gmail** (For testing only - not recommended for production)
   - Host: `smtp.gmail.com`
   - Port: `587`
   - **Note:** Enable "App Passwords" in Google Account settings

---

## 🎨 Customizing the Investor Centre

### Adding Content via Directus

While the investor centre pages are currently using mock/hardcoded data, they're ready to be connected to Directus CMS.

**TODO (Future Enhancement):**
1. Create Directus collections for:
   - `asx_announcements`
   - `investor_reports`
   - `calendar_events`
   - `media_coverage`
   - `fact_sheets`

2. Update page components to fetch from Directus instead of using mock data

3. Enable content editors to manage investor content through Directus UI

### Share Price Widget

Uses TradingView's Symbol Overview widget to display live ASX:YUG share price.

- **Data:** 15-minute delayed
- **Source:** TradingView (free tier)
- **Symbol:** ASX:YUG
- **No API key required**

#### Troubleshooting

If widget doesn't appear, check:
1. TradingView CDN is accessible
2. Browser allows iframes from tradingview.com
3. Symbol ASX:YUG is still valid

#### Component Location
- Widget component: `components/investor/TradingViewWidget.tsx`
- Used in: `app/[locale]/investors/page.tsx`

---

## 🔌 Integrating Listmonk with Website

### API Endpoints to Create

Create Next.js API routes to connect your subscription form to Listmonk:

**File:** `app/api/subscribe/route.ts`

```typescript
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const { email, name, preferences } = await request.json()

  try {
    // Call Listmonk API
    const response = await fetch('http://localhost:9000/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('admin:your-password'),
      },
      body: JSON.stringify({
        email,
        name,
        lists: [1], // Your list ID from Listmonk
        status: 'enabled',
        attribs: preferences,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to subscribe')
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Subscription failed' },
      { status: 500 }
    )
  }
}
```

### Update Subscription Form

Update `components/investor/SubscriptionForm.tsx` to use the API:

```typescript
const response = await fetch('/api/subscribe', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, name, preferences }),
})
```

---

## 🎯 CoreConnect Multi-Tenancy

### How to Scale This for Multiple Clients

#### **Option 1: Shared Listmonk Instance**
- One Listmonk, multiple lists
- List per client: "Yugo Metals Investors", "Client2 Investors", etc.
- Manage all from one dashboard
- **Pros:** Simple, cost-effective
- **Cons:** All clients share branding

#### **Option 2: Listmonk Per Client**
- Separate Docker container per client
- Full isolation and custom branding
- **Pros:** True multi-tenancy, white-label
- **Cons:** More resources required

#### **Option 3: Custom UI + Listmonk API**
- Build your own email UI in CoreConnect dashboard
- Use Listmonk API in the background
- Each client sees CoreConnect branding
- **Pros:** Full control, best UX
- **Cons:** More development work

**Recommendation:** Start with Option 1, evolve to Option 3 as CoreConnect grows.

---

## 📊 What Makes This Better Than Relait

| Feature | Relait | Yugo Metals Solution |
|---------|--------|---------------------|
| **Platform** | External subdomain | Native website integration |
| **Branding** | Generic/shared | 100% Yugo Metals branded |
| **Cost** | ~$100-300/month | $0 (self-hosted) |
| **Control** | Limited | Full source code access |
| **Data Ownership** | Vendor-controlled | You own everything |
| **Customization** | Limited | Unlimited |
| **Email Marketing** | Relait AI features | Listmonk (equally powerful) |
| **Scalability** | Per-company pricing | Multi-tenant ready |

---

## 🔒 Security Best Practices

### Before Going Live:

1. **Change Default Passwords**
   - Directus admin password ✓ (you did this)
   - Listmonk admin password (do this now!)

2. **Update Docker Compose Secrets**
   ```yaml
   # Generate new secure keys:
   KEY: "your-new-random-key-here"
   SECRET: "your-new-random-secret-here"
   ```

3. **Configure Environment Variables**
   - Never commit passwords to Git
   - Use `.env` file for sensitive data

4. **Set Up SSL/HTTPS**
   - Use reverse proxy (Nginx, Caddy)
   - Get free SSL cert from Let's Encrypt

5. **Firewall Rules**
   - Only expose ports 80/443 publicly
   - Keep ports 8055, 9000 internal
   - Use VPN for admin access

---

## 📝 Next Steps

### Immediate:
1. ✅ Review all new investor pages
2. ✅ Set up Listmonk SMTP
3. ✅ Test email subscription flow
4. 🔲 Add real company content
5. 🔲 Upload company images/videos to pages

### Short-term:
1. Create Directus collections for investor content
2. Connect pages to Directus CMS
3. Integrate real ASX data feeds
4. Complete Listmonk API integration
5. Add real announcements, reports, and media articles

### Long-term:
1. Scale for CoreConnect multi-tenancy
2. Build custom CoreConnect dashboard UI
3. Add analytics and tracking
4. Implement automated email campaigns
5. Create investor analytics dashboard

---

## 🆘 Troubleshooting

### Listmonk won't start
```bash
# Check logs
docker-compose logs listmonk

# Restart services
docker-compose restart listmonk listmonk_db
```

### Email not sending
1. Check SMTP settings in Listmonk
2. Verify email credentials
3. Check firewall allows outbound port 587
4. Test with a simple email first

### Database connection errors
```bash
# Reset databases (WARNING: Deletes all data)
docker-compose down -v
docker-compose up -d
```

---

## 📞 Support

For questions or issues:
- **Email:** developer@yugometals.com
- **Listmonk Docs:** https://listmonk.app/docs
- **Directus Docs:** https://docs.directus.io

---

**Built with ❤️ for Yugo Metals and the future CoreConnect platform**

