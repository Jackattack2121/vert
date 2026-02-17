# Fly.io Environment Variables Template

Add these environment variables (secrets) to your Fly.io app.

**Location:** Use Fly.io CLI to set secrets

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

# OpenAI API (for AI CMS Assistant)
OPENAI_API_KEY=sk-your-openai-api-key
```

---

## Setting Secrets via Fly.io CLI

Once you have Fly.io CLI installed and authenticated:

```bash
# Navigate to project directory
cd "/Users/jack/Documents/Luxe & Lens Co Projects/Luxe Web Projects/yugo-metals"

# Set secrets one by one
flyctl secrets set SUPABASE_DB_HOST="db.xxxxxxxxxxxxx.supabase.co"
flyctl secrets set SUPABASE_DB_PASSWORD="your-password"
flyctl secrets set SUPABASE_PROJECT_REF="xxxxxxxxxxxxx"
flyctl secrets set SUPABASE_STORAGE_ACCESS_KEY="your-key"
flyctl secrets set SUPABASE_STORAGE_SECRET_KEY="your-key"
flyctl secrets set RESEND_API_KEY="re_xxxxxxxxxxxxx"
flyctl secrets set LISTMONK_API_PASSWORD="your-secure-password"
flyctl secrets set LISTMONK_ENCRYPTION_KEY="your-32-char-key"

# Verify secrets are set
flyctl secrets list
```

**Note:** Setting secrets automatically redeploys your app.

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

## Bulk Set Secrets (Advanced)

You can set all secrets at once:

```bash
# Create a temporary file (DO NOT COMMIT THIS)
cat > /tmp/fly-secrets.txt << 'EOF'
SUPABASE_DB_HOST=db.xxxxxxxxxxxxx.supabase.co
SUPABASE_DB_PASSWORD=your-password
SUPABASE_PROJECT_REF=xxxxxxxxxxxxx
SUPABASE_STORAGE_ACCESS_KEY=your-key
SUPABASE_STORAGE_SECRET_KEY=your-key
RESEND_API_KEY=re_xxxxxxxxxxxxx
LISTMONK_API_PASSWORD=your-secure-password
LISTMONK_ENCRYPTION_KEY=your-32-char-key
EOF

# Import all secrets at once
flyctl secrets import < /tmp/fly-secrets.txt

# Delete the temporary file
rm /tmp/fly-secrets.txt
```

---

## Verification Checklist

Before deploying, verify:

- [ ] All 8 secrets are set
- [ ] No placeholder text remains (no `xxx`, `your-`, etc.)
- [ ] `SUPABASE_DB_HOST` includes full domain with `db.` prefix
- [ ] `RESEND_API_KEY` starts with `re_`
- [ ] `LISTMONK_ENCRYPTION_KEY` is exactly 32 characters
- [ ] `LISTMONK_API_PASSWORD` is at least 20 characters
- [ ] Storage keys are the same as service_role key from Supabase

Run this to verify:
```bash
flyctl secrets list
```

---

## Security Best Practices

✅ **DO:**
- Use Fly.io's built-in secrets management
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

## Updating Secrets

To update an existing secret:

```bash
flyctl secrets set SECRET_NAME="new-value"
```

The app will automatically redeploy with the new secret.

---

## Viewing Secrets

To view which secrets are set (values are hidden):

```bash
flyctl secrets list
```

To unset a secret:

```bash
flyctl secrets unset SECRET_NAME
```

---

## Troubleshooting

### Error: "Secret not found"

**Cause:** Secret name typo or not set

**Solution:**
```bash
flyctl secrets list  # Check what secrets are set
flyctl secrets set CORRECT_NAME="value"
```

### Error: "Deployment failed after setting secret"

**Cause:** Invalid secret value or app configuration issue

**Solution:**
1. Check Fly.io logs: `flyctl logs`
2. Verify secret value is correct
3. Check `fly.toml` configuration
4. Ensure Supabase allows connections

### Secrets not taking effect

**Cause:** App didn't redeploy

**Solution:**
```bash
flyctl deploy  # Force a redeploy
```

---

**Last updated:** 2025-01-29

