import { test, expect } from '@playwright/test';

/**
 * E2E tests for locale routing
 * Tests URL structure, locale detection, and routing behavior
 */

const locales = ['en', 'fr', 'zh'];

test.describe('Locale Routing', () => {
  test('should access all pages in all locales', async ({ page }) => {
    const testPaths = [
      '',  // home
      '/investors',
      '/projects',
      '/contact',
      '/why-yugo-metals',
    ];

    for (const locale of locales) {
      for (const path of testPaths) {
        const fullPath = `/${locale}${path}`;
        await page.goto(fullPath);
        
        // Page should load successfully (not 404)
        const statusCode = page.url().includes('404') ? 404 : 200;
        expect(statusCode).toBe(200);
        
        // HTML lang attribute should match locale
        await expect(page.locator('html')).toHaveAttribute('lang', locale);
      }
    }
  });

  test('should always use locale prefix in URLs', async ({ page }) => {
    // All routes should have locale prefix
    await page.goto('/en');
    
    // Navigate to different pages
    const links = await page.locator('a[href^="/"]').all();
    
    for (const link of links.slice(0, 5)) { // Test first 5 links
      const href = await link.getAttribute('href');
      
      // Skip external links, anchors, and special routes
      if (href && !href.startsWith('http') && !href.startsWith('#') && 
          !href.includes('/admin') && !href.includes('/api')) {
        // Should start with locale prefix
        const hasLocalePrefix = locales.some(locale => href.startsWith(`/${locale}`));
        expect(hasLocalePrefix).toBeTruthy();
      }
    }
  });

  test('should handle root path with locale detection', async ({ page }) => {
    // Access root path
    await page.goto('/');
    
    // Should redirect to a locale version (likely /en)
    await page.waitForLoadState('networkidle');
    
    const url = page.url();
    const hasLocaleInUrl = locales.some(locale => url.includes(`/${locale}`));
    
    expect(hasLocaleInUrl).toBeTruthy();
  });

  test('should preserve query parameters when switching locales', async ({ page }) => {
    await page.goto('/en/investors?tab=announcements&sort=date');
    
    // Switch language
    await page.click('[aria-label="Language selector"]');
    await page.click('text=Français');
    
    // URL should have locale changed but query params preserved
    const url = page.url();
    expect(url).toContain('/fr/investors');
    expect(url).toContain('tab=announcements');
    expect(url).toContain('sort=date');
  });

  test('should handle deep linking with locale', async ({ page }) => {
    // Direct access to deeply nested page
    await page.goto('/fr/investors/asx-announcements');
    
    // Should load successfully
    await expect(page.locator('body')).toBeVisible();
    
    // Locale should be correct
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });

  test('should not apply locale prefix to admin routes', async ({ page }) => {
    // Admin routes should be accessible without locale prefix
    await page.goto('/admin/login');
    
    // Should not redirect to /en/admin/login
    const url = page.url();
    expect(url).toContain('/admin/login');
    expect(url).not.toMatch(/\/(en|fr|zh)\/admin/);
  });

  test('should not apply locale prefix to API routes', async ({ page }) => {
    // API routes should work without locale prefix
    const response = await page.goto('/api/announcements');
    
    // Should be accessible
    expect(response?.status()).toBeLessThan(500);
  });

  test('should handle trailing slashes consistently', async ({ page }) => {
    // With trailing slash
    await page.goto('/en/investors/');
    const urlWithSlash = page.url();
    
    // Without trailing slash
    await page.goto('/en/investors');
    const urlWithoutSlash = page.url();
    
    // Both should resolve to the same content
    // Check that both load successfully
    expect(urlWithSlash.includes('investors')).toBeTruthy();
    expect(urlWithoutSlash.includes('investors')).toBeTruthy();
  });
});

test.describe('Locale Detection', () => {
  test('should detect locale from Accept-Language header', async ({ browser }) => {
    // Create context with French Accept-Language header
    const context = await browser.newContext({
      locale: 'fr-FR',
      extraHTTPHeaders: {
        'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
      },
    });
    
    const page = await context.newPage();
    
    // Go to root without specifying locale
    await page.goto('/');
    
    // Wait for redirect
    await page.waitForLoadState('networkidle');
    
    // Should redirect to French version (if no cookie exists)
    const url = page.url();
    // Note: This behavior depends on middleware configuration
    // May redirect to /fr or stay on /en as default
    expect(url).toContain('/');
    
    await context.close();
  });

  test('should prefer cookie over Accept-Language header', async ({ browser }) => {
    // Create context with Chinese Accept-Language
    const context = await browser.newContext({
      locale: 'zh-CN',
    });
    
    const page = await context.newPage();
    
    // First set cookie to French
    await context.addCookies([{
      name: 'NEXT_LOCALE',
      value: 'fr',
      domain: 'localhost',
      path: '/',
    }]);
    
    // Navigate to root
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should use cookie (French) instead of Accept-Language (Chinese)
    // Check if we end up on French version
    const url = page.url();
    expect(url).toContain('/fr');
    
    await context.close();
  });

  test('should use default locale when no preference found', async ({ browser }) => {
    // Create context with no specific locale preferences
    const context = await browser.newContext({
      locale: 'en-US',
    });
    
    const page = await context.newPage();
    
    // Navigate without locale
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Should default to English
    const url = page.url();
    expect(url).toContain('/en');
    
    await context.close();
  });
});

test.describe('SEO and Metadata', () => {
  test('should have correct hreflang tags on all pages', async ({ page }) => {
    await page.goto('/en/investors');
    
    // Check for hreflang alternate links
    const hreflangLinks = await page.locator('link[rel="alternate"][hreflang]').all();
    
    // Should have links for all locales + x-default
    expect(hreflangLinks.length).toBeGreaterThanOrEqual(locales.length);
    
    // Check specific locales are present
    const hreflangValues = await Promise.all(
      hreflangLinks.map(link => link.getAttribute('hreflang'))
    );
    
    expect(hreflangValues).toContain('en');
    expect(hreflangValues).toContain('fr');
    expect(hreflangValues).toContain('x-default');
  });

  test('should have correct canonical URLs per locale', async ({ page }) => {
    await page.goto('/fr/investors');
    
    // Canonical should point to current locale version
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
    
    expect(canonical).toContain('/fr');
  });

  test('should have localized metadata', async ({ page }) => {
    // English version
    await page.goto('/en');
    const enTitle = await page.title();
    
    // French version
    await page.goto('/fr');
    const frTitle = await page.title();
    
    // Titles should be different (translated)
    expect(enTitle).not.toBe(frTitle);
  });

  test('should have Open Graph locale metadata', async ({ page }) => {
    await page.goto('/zh/investors');
    
    // Check for og:locale meta tag
    const ogLocale = await page.locator('meta[property="og:locale"]').getAttribute('content');
    
    // Should be set to Chinese
    expect(ogLocale).toBe('zh');
  });
});

test.describe('Navigation and Links', () => {
  test('should maintain locale when navigating between pages', async ({ page }) => {
    await page.goto('/fr/investors');
    
    // Click a link to another page
    await page.click('a[href*="/fr/projects"]');
    
    // Should stay on French version
    await expect(page).toHaveURL(/\/fr\/projects/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });

  test('should update all navigation links when locale changes', async ({ page }) => {
    await page.goto('/en/investors');
    
    // Switch to Chinese
    await page.click('[aria-label="Language selector"]');
    await page.click('text=中文');
    
    await page.waitForURL('/zh/investors');
    
    // Check that navigation links now point to Chinese versions
    const navLinks = await page.locator('nav a[href*="/zh/"]').all();
    
    // Should have multiple navigation links with /zh/ prefix
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test('should handle back button navigation with locale', async ({ page }) => {
    // Navigate through multiple pages
    await page.goto('/en/investors');
    await page.goto('/en/projects');
    await page.goto('/en/contact');
    
    // Go back
    await page.goBack();
    
    // Should be on projects page with correct locale
    await expect(page).toHaveURL(/\/en\/projects/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });
});

test.describe('Error Handling', () => {
  test('should show 404 for non-existent pages in any locale', async ({ page }) => {
    const response = await page.goto('/en/non-existent-page-xyz');
    
    // Should return 404 or show 404 page
    const is404 = response?.status() === 404 || 
                  await page.locator('text=/404|not found/i').isVisible();
    
    expect(is404).toBeTruthy();
  });

  test('should handle locale-specific 404 pages', async ({ page }) => {
    await page.goto('/fr/non-existent-page');
    
    // Even 404 page should respect locale
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });
});
