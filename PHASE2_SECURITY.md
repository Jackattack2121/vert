# Phase 2 Security Documentation

## Security Measures Implemented

### 1. Authentication Security

#### Magic Link Authentication
- **Token Generation**: Cryptographically secure random tokens (64 characters)
- **Token Expiry**: 15 minutes (configurable via `MAGIC_LINK_EXPIRY`)
- **One-Time Use**: Tokens are invalidated immediately after use
- **Auto-Cleanup**: Expired tokens are automatically removed

**Implementation:** `lib/auth/magic-link.ts`

#### Session Management
- **Strategy**: JWT-based sessions
- **Max Age**: 30 days (configurable)
- **Secure Cookies**: httpOnly, secure, sameSite=lax
- **Role Persistence**: User role stored in session token

**Implementation:** `lib/auth/auth-config.ts`

### 2. Authorization & Access Control

#### Role-Based Access Control (RBAC)
Three distinct roles with different permissions:

1. **Admin**
   - Full access to admin panel
   - Portal user management
   - Content management (Directus)
   - Message moderation

2. **Shareholder**
   - Access to investor portal only
   - View own portfolio
   - Access assigned documents
   - Message with IR team
   - View calendar events

3. **Institutional**
   - Access to institutional portal only
   - View project updates
   - Access assigned documents
   - Message with account manager
   - Schedule meetings

**Implementation:** `lib/auth/portal-auth.ts`

#### Route Protection

**Portal Routes:**
- `/portal/investor/*` - Shareholder only
- `/portal/institutional/*` - Institutional clients only
- `/admin/*` - Admin only
- `/api/admin/*` - Admin only
- `/api/portal/*` - Authenticated portal users only

**Middleware:** `middleware.ts`

**Layout-level protection:** Portal layouts check auth and redirect unauthorized users

### 3. Data Access Security

#### Document Access Control
Documents have multiple access levels:
- `specific_user` - Assigned to one user
- `all_shareholders` - All shareholder accounts
- `all_institutional` - All institutional clients
- `all_portal_users` - All portal users

**Implementation:** Directus collection `client_documents`

#### API Security
- All portal API endpoints verify user session
- Users can only access their own data
- Admin endpoints require admin role
- Rate limiting on authentication endpoints

### 4. Input Validation & Sanitization

#### Email Validation
- Format validation (regex)
- Domain validation
- Prevents email enumeration attacks

#### XSS Prevention
- Rich text content sanitized
- HTML content escaped by default
- Next.js automatic escaping in JSX

#### CSRF Protection
- NextAuth.js built-in CSRF protection
- API routes use `getServerSession` for verification

### 5. Rate Limiting

**Authentication Endpoints:**
- Maximum 5 attempts per IP per 15 minutes
- Applies to:
  - Admin login
  - Magic link requests
  - Token verification

**Implementation:** `lib/auth/rate-limiter.ts`

### 6. Database Security

#### Directus Permissions
Configure row-level security in Directus:

**Portal Users Role:**
```json
{
  "portal_users": { "read": "own" },
  "portfolios": { "read": "own" },
  "client_documents": { "read": "own_or_assigned" },
  "messages": { "create": "full", "read": "own", "update": "own" },
  "calendar_events": { "read": "role_based" },
  "news_posts": { "read": "published_only" }
}
```

#### SQL Injection Prevention
- Directus SDK uses parameterized queries
- No raw SQL queries in application code

### 7. Secrets Management

#### Environment Variables
All sensitive data stored in environment variables:
```bash
NEXTAUTH_SECRET=<crypto-random-32-bytes>
ADMIN_PASSWORD_HASH=<bcrypt-hash>
DIRECTUS_URL=<directus-endpoint>
MAGIC_LINK_SECRET=<crypto-random-32-bytes>
```

#### Password Hashing
- Admin passwords: bcrypt (10 rounds)
- Password comparison: timing-safe

**Implementation:** `lib/auth/auth-config.ts`

### 8. Secure Communication

#### HTTPS Enforcement
- Production must use HTTPS
- Secure cookie flag enabled in production
- HSTS headers recommended

#### API Security Headers
```javascript
{
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'geolocation=(), microphone=(), camera=()'
}
```

### 9. Logging & Monitoring

#### Security Event Logging
- Failed login attempts
- Magic link requests
- Unauthorized access attempts
- Admin actions (user creation, deletion)

#### Audit Trail
- User last login timestamp
- Document download tracking
- Message read status
- Calendar event attendance

**Implementation:** Directus audit logs + custom tracking

### 10. Data Privacy (GDPR Compliance)

#### User Rights
- **Right to Access**: Users can download their data
- **Right to Erasure**: Admins can delete user accounts
- **Right to Rectification**: Users can update their profile
- **Data Portability**: Export functionality (TODO)

#### Privacy Features
- Email addresses not visible to other users
- Personal data encrypted in transit (HTTPS)
- Minimal data collection principle
- Clear privacy policy required

## Security Checklist

### Pre-Production

- [ ] All environment variables configured securely
- [ ] HTTPS enabled and enforced
- [ ] Security headers configured
- [ ] Rate limiting tested
- [ ] Magic link expiry tested
- [ ] Session timeout tested
- [ ] Role-based access tested
- [ ] XSS prevention verified
- [ ] CSRF protection verified
- [ ] Directus permissions configured
- [ ] Admin password changed from default
- [ ] API keys rotated
- [ ] Logging configured
- [ ] Error messages don't leak sensitive info
- [ ] File upload validation implemented
- [ ] Maximum file sizes configured

### Post-Production

- [ ] Monitor failed login attempts
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Review access logs monthly
- [ ] Rotate API keys every 6 months
- [ ] Test backup restoration
- [ ] Incident response plan documented
- [ ] Security contact email published

## Vulnerability Response

### If a Security Issue is Discovered:

1. **Immediate Actions**
   - Document the vulnerability
   - Assess the impact and severity
   - Determine if data was compromised

2. **Mitigation**
   - Deploy fix to production ASAP
   - Force logout all affected sessions if needed
   - Notify affected users if data breach occurred

3. **Post-Incident**
   - Conduct post-mortem analysis
   - Update security documentation
   - Implement additional preventive measures

## Security Best Practices for Developers

1. **Never commit secrets** - Use `.gitignore` for `.env` files
2. **Validate all inputs** - Never trust client data
3. **Use parameterized queries** - Prevent SQL injection
4. **Escape output** - Prevent XSS
5. **Principle of least privilege** - Give minimum necessary permissions
6. **Keep dependencies updated** - Regular `npm audit` and updates
7. **Review code for security** - Peer review all changes
8. **Test security features** - Include security in test coverage

## Useful Security Tools

### Code Scanning
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for outdated packages
npm outdated
```

### Security Testing
```bash
# Run security-focused E2E tests
npm run test:e2e -- security.spec.ts

# Check for common security issues
npm run lint
```

## Contact

For security concerns or to report vulnerabilities:
- **Email**: security@vertcapital.com.au (if available)
- **Internal**: Contact development team immediately

---

**Last Updated:** February 2024  
**Review Schedule:** Quarterly
