# Phase 2 Testing Guide

## E2E Test Suite

Comprehensive end-to-end tests for Phase 2 portal features using Playwright.

### Test Files

1. **portal-authentication.spec.ts**
   - Login page display
   - Email validation
   - Magic link request
   - Token verification
   - Expired link handling
   - Protected route access

2. **portal-shareholder.spec.ts**
   - Dashboard display
   - Portfolio information
   - Document library
   - Messages
   - Calendar events
   - Navigation
   - Sign out

3. **portal-institutional.spec.ts**
   - Dashboard display
   - Partnership metrics
   - Project updates
   - Account manager info
   - Documents
   - Navigation

4. **news-blog.spec.ts**
   - News listing page
   - Category filtering
   - Article display
   - RSS feed
   - Related articles
   - Social sharing
   - Mobile responsiveness

5. **admin-portal-management.spec.ts**
   - Portal management dashboard
   - User management
   - Message management
   - Access control
   - Statistics display

### Running Tests

#### Run All Tests
```bash
npm run test:e2e
```

#### Run Specific Test Suite
```bash
npx playwright test portal-authentication
npx playwright test portal-shareholder
npx playwright test portal-institutional
npx playwright test news-blog
npx playwright test admin-portal-management
```

#### Run in UI Mode (Interactive)
```bash
npm run test:e2e:ui
```

#### Run with Browser Visible
```bash
npm run test:e2e:headed
```

#### View Test Report
```bash
npm run test:e2e:report
```

### Test Environment Setup

#### Required Environment Variables
```bash
# .env.test
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=test-secret-key-32-characters-long
ADMIN_EMAIL=admin@test.com
ADMIN_PASSWORD_HASH=$2a$10$...
DIRECTUS_URL=http://localhost:8055
LISTMONK_URL=http://localhost:9000
```

#### Test Database
- Use separate Directus instance or test database
- Seed with test data before running tests
- Clean up after test run

### Test Data

Create test fixtures for:

#### Portal Users
```typescript
// Shareholder test user
{
  email: "shareholder@test.com",
  first_name: "Test",
  last_name: "Shareholder",
  role: "shareholder",
  status: "active"
}

// Institutional test user
{
  email: "institutional@test.com",
  first_name: "Test",
  last_name: "Client",
  role: "institutional",
  status: "active"
}
```

#### News Posts
```typescript
{
  title: "Test Article",
  slug: "test-article",
  category: "Company News",
  content: "Test content...",
  status: "published"
}
```

### CI/CD Integration

#### GitHub Actions
```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run build
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
```

### Test Coverage Goals

- [ ] Authentication flows: 100%
- [ ] Portal navigation: 100%
- [ ] Dashboard displays: 100%
- [ ] Admin management: 100%
- [ ] News/blog functionality: 100%
- [ ] Security features: 100%

### Manual Testing Checklist

In addition to automated tests, manually verify:

#### Portal Functionality
- [ ] Magic link email delivery
- [ ] Email formatting and branding
- [ ] Document download
- [ ] File upload
- [ ] Message notifications
- [ ] Calendar event reminders
- [ ] Profile updates

#### Security
- [ ] Session expiry
- [ ] Rate limiting
- [ ] Role-based access
- [ ] XSS prevention
- [ ] CSRF protection

#### Performance
- [ ] Page load times < 2s
- [ ] Dashboard renders smoothly
- [ ] Large document handling
- [ ] Concurrent user load

#### Accessibility
- [ ] Screen reader compatibility
- [ ] Keyboard navigation
- [ ] Color contrast
- [ ] Focus indicators
- [ ] Alt text for images

#### Cross-Browser Testing
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

### Known Test Limitations

1. **Magic Link Testing**
   - Currently mocked in tests
   - Real email delivery not tested automatically
   - Manual verification required

2. **External Services**
   - Directus API calls mocked
   - TradingView widget not tested
   - Listmonk integration requires manual testing

3. **File Uploads**
   - Limited testing of large files
   - Virus scanning not included in tests

### Test Maintenance

- Review and update tests after feature changes
- Add new tests for new features
- Remove obsolete tests
- Keep test data fresh and realistic
- Update selectors if UI changes

### Debugging Tests

#### View Test Traces
```bash
npx playwright show-trace trace.zip
```

#### Debug Specific Test
```bash
npx playwright test --debug portal-authentication
```

#### Screenshot on Failure
Tests automatically capture screenshots on failure in `test-results/`

### Performance Testing

#### Load Testing (Optional)
```bash
# Using k6 or similar tool
k6 run load-test.js
```

#### Lighthouse CI
```bash
npm install -g @lhci/cli
lhci autorun
```

### Security Testing

#### OWASP ZAP
```bash
# Run automated security scan
zap-cli quick-scan http://localhost:3000
```

#### npm audit
```bash
npm audit
npm audit fix
```

## Continuous Testing

- Run tests on every commit
- Block merges if tests fail
- Monitor test execution time
- Track test coverage trends
- Regular security scans

---

**Last Updated:** February 2024  
**Next Review:** After each feature addition
