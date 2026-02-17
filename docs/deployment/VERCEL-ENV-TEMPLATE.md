# Vercel Environment Variables Template

Add these environment variables to your Vercel project.

**Location:** Vercel Dashboard → Your Project → Settings → Environment Variables

---

## Production Variables

Add these variables with **Environment:** `Production`

```bash
# Listmonk API (Production - Railway)
LISTMONK_URL=https://listmonk.yugometals.com
LISTMONK_USERNAME=listmonk_api
LISTMONK_PASSWORD=your-listmonk-api-password

# Next.js Site URL
NEXT_PUBLIC_SITE_URL=https://yugometals.com

# Optional: Directus CMS (if deploying)
DIRECTUS_URL=https://cms.yugometals.com

# OpenAI API (for AI CMS Assistant)
OPENAI_API_KEY=sk-your-openai-api-key
```

---

## Preview Variables (Optional)

For testing deployments, add with **Environment:** `Preview`

```bash
LISTMONK_URL=https://listmonk-staging.yugometals.com
LISTMONK_USERNAME=listmonk_api
LISTMONK_PASSWORD=your-staging-api-password
NEXT_PUBLIC_SITE_URL=https://preview.yugometals.com
```

---

## Development Variables (Optional)

For local development overrides, add with **Environment:** `Development`

```bash
LISTMONK_URL=http://localhost:9000
LISTMONK_USERNAME=listmonk_api
LISTMONK_PASSWORD=YUG_API_2024_Secure!
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

**Note:** For local development, `.env.local` file is preferred over Vercel dev variables.

---

## How to Get These Values

### LISTMONK_URL
- Production: `https://listmonk.yugometals.com`
- This is set after configuring custom domain on Railway
- Wait for DNS propagation before using this URL
- Temporary Railway URL: `https://[your-project].railway.app`

### LISTMONK_USERNAME
- Fixed value: `listmonk_api`
- This matches the `admin_username` in `config.production.toml`
- Used for API authentication from Next.js

### LISTMONK_PASSWORD
- This must match `LISTMONK_API_PASSWORD` in Railway
- Get from Railway dashboard → Variables
- Or use password manager where you stored it
- This is for API access, NOT the web UI admin password

### NEXT_PUBLIC_SITE_URL
- Production: `https://yugometals.com`
- This is your main website domain
- Used for generating absolute URLs
- Prefix `NEXT_PUBLIC_` makes it available in browser

---

## Adding Variables in Vercel

### Method 1: Web UI (Recommended)

1. Go to https://vercel.com/dashboard
2. Select your project: `yugo-metals`
3. Click **Settings** → **Environment Variables**
4. For each variable:
   - Enter **Key:** (e.g., `LISTMONK_URL`)
   - Enter **Value:** (e.g., `https://listmonk.yugometals.com`)
   - Select **Environment:** `Production`
   - Click **Add**
5. After adding all variables, redeploy:
   - Go to **Deployments**
   - Click **•••** on latest deployment
   - Click **Redeploy**

### Method 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link project
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects/yugo-metals"
vercel link

# Add variables
vercel env add LISTMONK_URL production
# Paste value when prompted

vercel env add LISTMONK_USERNAME production
# Paste value when prompted

vercel env add LISTMONK_PASSWORD production
# Paste value when prompted

vercel env add NEXT_PUBLIC_SITE_URL production
# Paste value when prompted

# Redeploy
vercel --prod
```

---

## Verification Checklist

After adding variables:

- [ ] All 4 required variables are added
- [ ] Environment is set to `Production`
- [ ] No typos in variable names
- [ ] `LISTMONK_PASSWORD` matches Railway value
- [ ] `NEXT_PUBLIC_SITE_URL` has no trailing slash
- [ ] Redeployed after adding variables

---

## Testing Variables

### Test in Vercel Deployment

1. After redeployment, go to **Deployments** → Latest deployment
2. Click **View Function Logs**
3. Open browser to: `https://yugometals.com/investors`
4. Try subscribing with test email
5. Check function logs for any errors

### Test API Endpoint

```bash
curl -X POST https://yugometals.com/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "preferences": {
      "news": true
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

If you get errors:
- Check function logs in Vercel
- Verify Listmonk is accessible from Vercel servers
- Confirm Railway domain is public (not localhost)
- Test Railway URL directly in browser

---

## Troubleshooting

### Error: "Failed to subscribe"

**Cause:** Can't reach Listmonk API

**Solution:**
1. Verify `LISTMONK_URL` is correct public URL
2. Check Railway service is running
3. Test URL in browser: `https://listmonk.yugometals.com`
4. Ensure Railway service has public networking enabled

### Error: "401 Unauthorized"

**Cause:** Wrong username or password

**Solution:**
1. Verify `LISTMONK_USERNAME` is `listmonk_api`
2. Check `LISTMONK_PASSWORD` matches Railway `LISTMONK_API_PASSWORD`
3. Verify credentials work by testing API directly:
```bash
curl -u "listmonk_api:your-password" \
  https://listmonk.yugometals.com/api/lists
```

### Error: Variables not loaded

**Cause:** Vercel didn't redeploy after adding variables

**Solution:**
1. Go to **Deployments** tab
2. Find latest deployment
3. Click **•••** → **Redeploy**
4. Wait for build to complete (~2 minutes)

### Error: CORS issues

**Cause:** API route not allowing requests

**Solution:**
1. Check `app/api/subscribe/route.ts` has OPTIONS handler
2. Verify no CORS errors in browser console
3. Railway Listmonk should allow all origins (default)

---

## Security Best Practices

✅ **DO:**
- Use Vercel's encrypted environment variables
- Set sensitive variables to `Production` only (not Preview)
- Rotate passwords every 6-12 months
- Use different credentials for staging vs production
- Monitor function logs for unauthorized access attempts

❌ **DON'T:**
- Expose `LISTMONK_PASSWORD` in client-side code
- Use `NEXT_PUBLIC_` prefix for sensitive variables
- Commit `.env.production` to Git
- Share credentials in plain text

---

## Variable Reference

| Variable | Type | Public? | Required | Default |
|----------|------|---------|----------|---------|
| `LISTMONK_URL` | Server | No | Yes | - |
| `LISTMONK_USERNAME` | Server | No | Yes | - |
| `LISTMONK_PASSWORD` | Server | No | Yes | - |
| `NEXT_PUBLIC_SITE_URL` | Client | Yes | No | Auto-detected |
| `DIRECTUS_URL` | Server | No | No | - |

**Server variables:** Only available in API routes and server components
**Client variables:** Available in browser (use `NEXT_PUBLIC_` prefix)

---

## Updating Variables

To update an existing variable:

1. Go to **Settings** → **Environment Variables**
2. Find the variable you want to update
3. Click **Edit** (pencil icon)
4. Enter new value
5. Click **Save**
6. **Important:** Redeploy for changes to take effect

**Note:** Updates take effect after next deployment, not immediately.

---

## Exporting Variables (Backup)

To backup your environment variables:

```bash
# Using Vercel CLI
vercel env pull .env.vercel

# This creates .env.vercel with all variables
# DO NOT commit this file to Git
```

Add to `.gitignore`:
```
.env.vercel
.env*.local
.env.production
```

---

**Last updated:** 2025-01-29

