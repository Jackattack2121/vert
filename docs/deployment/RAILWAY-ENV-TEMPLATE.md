# Railway Environment Variables Template

Copy and paste these environment variables into Railway dashboard.

**Location:** Railway Dashboard → Your Service → Variables

---

## Required Variables

```bash
# Supabase Database Connection
SUPABASE_DB_HOST=db.xxxxxxxxxxxxx.supabase.co
SUPABASE_DB_PASSWORD=your-supabase-database-password
SUPABASE_PROJECT_REF=xxxxxxxxxxxxx

# Supabase Storage (S3 Compatible)
SUPABASE_STORAGE_ACCESS_KEY=your-supabase-service-role-key
SUPABASE_STORAGE_SECRET_KEY=your-supabase-service-role-key

# Resend SMTP
RESEND_API_KEY=re_xxxxxxxxxxxxx

# Listmonk Security
LISTMONK_API_PASSWORD=generate-secure-password-here
LISTMONK_ENCRYPTION_KEY=generate-32-char-random-string

# Railway Port (required)
PORT=9000
```

---

## How to Get These Values

### SUPABASE_DB_HOST
1. Go to Supabase Dashboard → Your Project
2. Navigate to **Settings** → **Database**
3. Copy the host from Connection String
4. Format: `db.xxxxxxxxxxxxx.supabase.co`

### SUPABASE_DB_PASSWORD
1. This is your project database password
2. Set when you created your Supabase project
3. Can reset in: **Settings** → **Database** → **Reset Database Password**

### SUPABASE_PROJECT_REF
1. Found in your Supabase project URL
2. Format: The random string in `https://app.supabase.com/project/[THIS-IS-IT]`
3. Or in **Settings** → **API** → Project URL

### SUPABASE_STORAGE_ACCESS_KEY & SECRET_KEY
1. Go to **Settings** → **API**
2. Copy `service_role` key (keep this secret!)
3. Use same key for both `ACCESS_KEY` and `SECRET_KEY`
4. This key has admin access to your project

### RESEND_API_KEY
1. Go to Resend Dashboard: https://resend.com/api-keys
2. Click **Create API Key**
3. Name: "Yugo Metals Listmonk Production"
4. Permissions: **Sending access**
5. Copy the key (starts with `re_`)

### LISTMONK_API_PASSWORD
Generate a secure random password:
```bash
# On Mac/Linux
openssl rand -base64 24

# Or use a password generator
# Requirements: At least 20 characters, mix of letters/numbers/symbols
```

### LISTMONK_ENCRYPTION_KEY
Generate a 32-character random string:
```bash
# On Mac/Linux
openssl rand -hex 16

# This outputs 32 hexadecimal characters
# Example: c157a79031e1c40f85931829bc5fc552
```

⚠️ **IMPORTANT:** Never reuse the encryption key from development!

---

## Verification Checklist

Before deploying, verify:

- [ ] All 8 environment variables are filled in
- [ ] No placeholder text remains (no `xxx`, `your-`, etc.)
- [ ] `SUPABASE_DB_HOST` includes full domain with `db.` prefix
- [ ] `RESEND_API_KEY` starts with `re_`
- [ ] `LISTMONK_ENCRYPTION_KEY` is exactly 32 characters
- [ ] `LISTMONK_API_PASSWORD` is at least 20 characters
- [ ] `PORT` is set to `9000`
- [ ] Storage keys are the same as service_role key from Supabase

---

## Security Best Practices

✅ **DO:**
- Use Railway's built-in secrets management
- Generate unique passwords for production
- Store backups of these values in a password manager
- Rotate keys every 6-12 months
- Use different keys for staging vs production

❌ **DON'T:**
- Commit these values to Git
- Share keys in Slack/Email
- Reuse keys from development
- Use simple/guessable passwords
- Store in plain text files

---

## Testing Variables

After adding variables to Railway:

1. Click **Deploy** to redeploy with new variables
2. Go to **Deployments** → **View Logs**
3. Check for successful startup
4. Look for: "listmonk started" message
5. Verify no database connection errors

If you see errors:
- Double-check each variable is exactly correct
- Ensure no extra spaces or quotes
- Verify Supabase allows connections (IP whitelist)
- Check database password is correct

---

## Updating Variables

To update a variable:

1. Go to Railway dashboard → Your service
2. Click **Variables** tab
3. Click on variable name to edit
4. Update value
5. Click **Add** or **Update**
6. Service will automatically redeploy

**Note:** Updating variables triggers a redeploy (2-3 min downtime)

---

**Last updated:** 2025-01-29

