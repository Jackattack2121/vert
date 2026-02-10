# Admin Authentication Security Checklist

This document provides security guidelines and verification steps for the CoreConnect admin authentication system.

---

## 🔐 Environment Variables Required

### Production Environment

All of the following environment variables MUST be set in production:

```bash
# NextAuth Configuration (REQUIRED)
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=<32+ character cryptographically random string>

# Admin Credentials (REQUIRED)
ADMIN_EMAIL=admin@yourdomain.com
ADMIN_PASSWORD_HASH=<bcrypt hash generated via script>

# Listmonk Configuration (REQUIRED for email features)
LISTMONK_URL=https://listmonk.yourdomain.com
LISTMONK_USERNAME=listmonk_api
LISTMONK_PASSWORD=<secure password>
```

### Security Requirements

1. **NEXTAUTH_SECRET**
   - **Minimum length:** 32 characters
   - **Generation:** `openssl rand -base64 32`
   - **CRITICAL:** Never reuse across environments
   - **CRITICAL:** Never commit to version control

2. **ADMIN_EMAIL**
   - Must be a valid email address
   - Use a monitored email address
   - Consider using a role-based email (e.g., admin@company.com)

3. **ADMIN_PASSWORD_HASH**
   - Must be a valid bcrypt hash (starts with `$2a$` or `$2b$`)
   - **Generation:** `node scripts/generate-admin-password.js "YourSecurePassword"`
   - **Minimum password requirements:**
     - 12+ characters
     - Mix of uppercase, lowercase, numbers, symbols
     - Not found in common password lists
   - **NEVER store plaintext passwords**

---

## 🛡️ Security Features Implemented

### ✅ Authentication Hardening

- **Constant-time user lookup:** Prevents email enumeration via timing attacks
- **Generic error messages:** Same message for invalid email or password
- **Bcrypt password hashing:** Industry-standard with salt (cost factor 10)
- **Environment-based credentials:** No hardcoded users in source code

### ✅ Rate Limiting

- **Max attempts:** 5 failed logins per IP per 15 minutes
- **Exponential backoff:** Increases delay after 3rd failed attempt
- **Automatic cleanup:** Expired entries removed every 60 seconds
- **Implementation:** In-memory (for single instance) or Redis (for multi-instance)

### ✅ Session Security

- **Duration:** 8 hours (appropriate for admin access)
- **Strategy:** JWT-based (stateless, scalable)
- **Role validation:** Explicit admin role check on all protected routes
- **Automatic expiry:** Sessions invalidate after max age

### ✅ Middleware Protection

- **Protected routes:**
  - `/admin/(dashboard)/*` - All admin dashboard pages
  - `/api/admin/*` - All admin API endpoints
- **Role verification:** Requires valid session with `role: 'admin'`
- **Automatic redirect:** Unauthorized users sent to login page

### ✅ Error Handling

- **Generic API errors:** No sensitive data in error messages
- **Sanitized logging:** No passwords, emails, or auth state in logs
- **Safe error responses:** Consistent format for all auth failures

### ✅ Environment Validation

- **Startup checks:** All required env vars validated at boot
- **Format validation:** Email format, hash format, secret length
- **Fail-fast:** Server won't start with invalid configuration

---

## 🚨 What NOT to Log

**NEVER log the following in production:**

- ❌ Passwords (even hashed)
- ❌ Email addresses during auth attempts
- ❌ Session tokens or JWTs
- ❌ API keys or secrets
- ❌ Auth state details (success/failure with identifiers)
- ❌ IP addresses in auth failures (GDPR concern)

**Acceptable to log:**

- ✅ Generic error messages: `[API] Authentication request failed`
- ✅ Aggregate metrics: `[SECURITY] 15 failed login attempts in last hour`
- ✅ Critical events: `[SECURITY] Rate limit threshold exceeded`

---

## 📋 Pre-Deployment Checklist

### 1. Credential Security

- [ ] Admin password is strong (12+ chars, mixed case, numbers, symbols)
- [ ] Password hash generated using official script
- [ ] NEXTAUTH_SECRET is cryptographically random (32+ chars)
- [ ] NEXTAUTH_SECRET is unique to this environment
- [ ] No credentials exist in source code (verified via `git grep -i "admin123"`)
- [ ] No credentials in `.env` files committed to git
- [ ] `.env.local` is in `.gitignore`

### 2. Environment Configuration

- [ ] All required environment variables set in production
- [ ] `NEXTAUTH_URL` matches production domain
- [ ] Production secrets differ from development/staging
- [ ] Environment variables set via secure method (Fly.io secrets, Vercel env vars, etc.)

### 3. Access Control

- [ ] Only one admin account exists (single point of control)
- [ ] Admin email is monitored regularly
- [ ] Admin password not shared or stored insecurely
- [ ] No default/demo credentials left active

### 4. Code Review

- [ ] No hardcoded credentials in codebase
- [ ] No sensitive data in error logs
- [ ] Rate limiting implemented and tested
- [ ] Middleware protects all admin routes
- [ ] Session duration appropriate (8 hours)

---

## 🧪 Testing & Verification

### Authentication Testing

Run these tests after deployment:

#### Test 1: Invalid Email
```
Action: Login with non-existent email
Expected: "Invalid email or password" (generic error)
Success: ✅ No indication that email doesn't exist
```

#### Test 2: Invalid Password
```
Action: Login with correct email, wrong password
Expected: Same error as Test 1
Success: ✅ Error message identical to Test 1
```

#### Test 3: Rate Limiting
```
Action: 
  1. Attempt 5 failed logins rapidly
  2. Attempt 6th login
Expected: 
  1. First 5 attempts return same error
  2. 6th attempt blocked (may see same error, but delayed response)
Success: ✅ 6th attempt is rate limited
```

#### Test 4: Rate Limit Reset
```
Action: Wait 15 minutes after Test 3, then login
Expected: Rate limit cleared, can attempt login again
Success: ✅ Login attempts allowed after cooldown
```

#### Test 5: Successful Login
```
Action: Login with correct credentials
Expected: Redirected to /admin dashboard
Success: ✅ Access granted, session created
```

### Session Testing

#### Test 6: Session Validation
```
Action: After successful login, access /admin/analytics
Expected: Page loads successfully
Success: ✅ Admin routes accessible with valid session
```

#### Test 7: Session Expiry
```
Action: 
  1. Login successfully
  2. Wait 8 hours + 1 minute
  3. Try to access admin route
Expected: Redirected to login page
Success: ✅ Session expired, access denied
```

#### Test 8: Logout
```
Action: 
  1. Login successfully
  2. Click logout
  3. Try to access admin route
Expected: Redirected to login page
Success: ✅ Session invalidated on logout
```

### API Protection Testing

#### Test 9: Unauthenticated API Access
```
Action: Call /api/admin/analytics without session
Expected: 403 Forbidden
Success: ✅ API protected from unauthenticated access
```

#### Test 10: Authenticated Admin API Access
```
Action: Login, then call /api/admin/analytics
Expected: 200 OK with data
Success: ✅ Admin can access protected APIs
```

### Timing Analysis (Advanced)

#### Test 11: Timing Attack Resistance
```
Action: 
  1. Measure response time for invalid email (100 attempts)
  2. Measure response time for valid email, wrong password (100 attempts)
  3. Calculate average and compare
Expected: 
  - Average times within ±50ms
  - Both ~100-200ms (bcrypt comparison time)
Success: ✅ No timing difference reveals valid emails
```

---

## 🔍 Production Monitoring

### What to Monitor

1. **Failed Login Attempts**
   - Alert on: >10 failures in 5 minutes
   - Could indicate: Brute force attack

2. **Rate Limit Triggers**
   - Alert on: >5 IPs hitting rate limit per hour
   - Could indicate: Distributed attack

3. **Session Creation Anomalies**
   - Alert on: Multiple successful logins in short time
   - Could indicate: Credential compromise

4. **API Access Patterns**
   - Alert on: Unusual API call volume
   - Could indicate: Compromised session

### Logging Best Practices

```typescript
// ✅ GOOD: Generic logging
console.error('[AUTH] Failed login attempt');
console.warn('[SECURITY] Rate limit exceeded');
console.info('[AUTH] Admin session created');

// ❌ BAD: Leaks sensitive info
console.error('Login failed for:', email);
console.error('Invalid password:', password);
console.log('Session token:', token);
```

---

## 🚑 Incident Response

### If Admin Account is Compromised

1. **Immediate Actions** (within 5 minutes)
   - [ ] Generate new admin password
   - [ ] Update `ADMIN_PASSWORD_HASH` in production
   - [ ] Redeploy application (forces all sessions invalid)
   - [ ] Verify old password no longer works

2. **Investigation** (within 1 hour)
   - [ ] Review access logs for unauthorized activity
   - [ ] Check for malicious changes (content, settings, emails)
   - [ ] Identify attack vector (phishing, brute force, etc.)

3. **Remediation** (within 24 hours)
   - [ ] Restore any malicious changes
   - [ ] Enhance security (2FA, IP whitelist, etc.)
   - [ ] Document incident and response
   - [ ] Notify stakeholders if data exposed

### If Rate Limiting is Bypassed

1. **Immediate Actions**
   - [ ] Implement Redis-backed rate limiter (distributed)
   - [ ] Add IP-based blocking at infrastructure level (CloudFlare, etc.)
   - [ ] Consider CAPTCHA on login form

2. **Long-term Solutions**
   - [ ] Implement 2FA/MFA for admin account
   - [ ] Add IP whitelist for admin access
   - [ ] Use VPN requirement for admin login

---

## 🎯 Security Roadmap (Future Enhancements)

### Phase 2 (Next 3 months)
- [ ] Two-factor authentication (TOTP)
- [ ] Audit log persistence (database)
- [ ] Redis-backed rate limiter (multi-instance)
- [ ] Session device tracking

### Phase 3 (Next 6 months)
- [ ] IP whitelisting for admin access
- [ ] Passwordless authentication (magic links)
- [ ] Role-based access control (multiple admin levels)
- [ ] Security dashboard with metrics

### Phase 4 (Next 12 months)
- [ ] OAuth integration (Google, Microsoft)
- [ ] Hardware key support (FIDO2)
- [ ] Advanced threat detection (ML-based)
- [ ] Compliance certifications (SOC2, ISO27001)

---

## 📚 Additional Resources

### Password Management
- **Generate secure password:** `openssl rand -base64 32 | head -c 20`
- **Password manager:** Use 1Password, LastPass, or Bitwarden
- **Password policy:** NIST SP 800-63B guidelines

### Security Standards
- **OWASP Top 10:** https://owasp.org/www-project-top-ten/
- **NIST Authentication:** https://pages.nist.gov/800-63-3/
- **bcrypt best practices:** https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html

### Deployment Guides
- **Fly.io secrets:** `flyctl secrets set KEY=value`
- **Vercel env vars:** Dashboard → Settings → Environment Variables
- **Railway vars:** Dashboard → Variables → Add Variable

---

## ✅ Sign-Off

Before deploying to production, verify:

- [ ] All items in Pre-Deployment Checklist completed
- [ ] All tests in Testing & Verification passed
- [ ] Monitoring and alerting configured
- [ ] Incident response plan documented
- [ ] Team trained on security procedures

**Deployed by:** ___________________  
**Date:** ___________________  
**Verified by:** ___________________  
**Date:** ___________________  

---

**Last Updated:** 2026-02-02  
**Version:** 1.0  
**Maintainer:** CoreConnect Security Team
