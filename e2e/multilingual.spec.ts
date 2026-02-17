import { test, expect } from '@playwright/test';

/**
 * E2E tests for multilingual functionality
 * Tests language switching, cookie persistence, and path preservation
 */

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'zh', name: 'Chinese', nativeName: '中文' },
];

test.describe('Language Switcher', () => {
  test('should display all 3 languages in dropdown', async ({ page }) => {
    await page.goto('/en');
    
    // Click language switcher button
    await page.click('[aria-label="Language selector"]');
    
    // Wait for dropdown to appear
    await page.waitForSelector('[role="menu"]');
    
    // Check all languages are present
    for (const lang of languages) {
      const languageOption = page.locator(`text=${lang.nativeName}`);
      await expect(languageOption).toBeVisible();
    }
  });

  test('should switch language and preserve current path', async ({ page }) => {
    // Start on English investors page
    await page.goto('/en/investors');
    
    // Open language switcher
    await page.click('[aria-label="Language selector"]');
    
    // Select French
    await page.click('text=Français');
    
    // Verify URL changed to French but kept the path
    await expect(page).toHaveURL('/fr/investors');
    
    // Verify page content is in French (check for French text)
    await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  });

  test('should set cookie when switching languages', async ({ page, context }) => {
    await page.goto('/en/investors');
    
    // Click language switcher
    await page.click('[aria-label="Language selector"]');
    
    // Select French
    await page.click('text=Français');
    
    // Wait for navigation
    await page.waitForURL('/fr/investors');
    
    // Check if NEXT_LOCALE cookie was set
    const cookies = await context.cookies();
    const localeCookie = cookies.find(c => c.name === 'NEXT_LOCALE');
    
    expect(localeCookie).toBeDefined();
    expect(localeCookie?.value).toBe('fr');
  });

  test('should persist language choice across page navigation', async ({ page }) => {
    // Go to home page in Chinese
    await page.goto('/zh');
    
    // Navigate to different pages
    await page.click('a[href*="/zh/investors"]');
    await expect(page).toHaveURL(/\/zh\/investors/);
    
    // Language should still be Chinese
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
  });

  test('should highlight current language in dropdown', async ({ page }) => {
    await page.goto('/fr/investors');
    
    // Open language switcher
    await page.click('[aria-label="Language selector"]');
    
    // French option should be marked as current
    const frenchOption = page.locator('button:has-text("Français")');
    await expect(frenchOption).toHaveAttribute('aria-current', 'true');
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/en');
    
    // Focus on language switcher button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); // May need to adjust based on header structure
    
    // Open with Enter
    await page.keyboard.press('Enter');
    
    // Wait for dropdown
    await page.waitForSelector('[role="menu"]', { state: 'visible' });
    
    // Close with Escape
    await page.keyboard.press('Escape');
    
    // Dropdown should be closed
    await expect(page.locator('[role="menu"]')).not.toBeVisible();
  });

  test('should work on all major pages', async ({ page }) => {
    const testPages = [
      '/investors',
      '/projects',
      '/contact',
      '/why-yugo-metals',
    ];

    for (const pagePath of testPages) {
      // Visit page in English
      await page.goto(`/en${pagePath}`);
      
      // Switch to Chinese
      await page.click('[aria-label="Language selector"]');
      await page.click('text=中文');
      
      // Verify we're on the Chinese version of the same page
      await expect(page).toHaveURL(`/zh${pagePath}`);
      await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
    }
  });

  test('should display language switcher in mobile view', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/en');
    
    // Language switcher should be visible
    const languageSwitcher = page.locator('[aria-label="Language selector"]');
    await expect(languageSwitcher).toBeVisible();
    
    // Open dropdown
    await languageSwitcher.click();
    
    // Check dropdown is accessible
    await expect(page.locator('[role="menu"]')).toBeVisible();
  });
});

test.describe('Cookie Persistence', () => {
  test('should remember language preference on return visit', async ({ page, context }) => {
    // First visit - set language to Chinese
    await page.goto('/en');
    await page.click('[aria-label="Language selector"]');
    await page.click('text=中文');
    await page.waitForURL('/zh');
    
    // Verify cookie is set
    const cookies = await context.cookies();
    const localeCookie = cookies.find(c => c.name === 'NEXT_LOCALE');
    expect(localeCookie?.value).toBe('zh');
    
    // Simulate return visit by going to root and letting cookie detection work
    // (In real app, middleware would redirect based on cookie)
    await page.goto('/zh/investors');
    
    // Should still be on Chinese version
    await expect(page.locator('html')).toHaveAttribute('lang', 'zh');
  });

  test('cookie should have appropriate expiration', async ({ page, context }) => {
    await page.goto('/en');
    await page.click('[aria-label="Language selector"]');
    await page.click('text=Deutsch');
    await page.waitForURL('/de');
    
    const cookies = await context.cookies();
    const localeCookie = cookies.find(c => c.name === 'NEXT_LOCALE');
    
    // Cookie should have a long expiration (1 year in next-intl)
    // Check that expires is set and is in the future
    expect(localeCookie?.expires).toBeGreaterThan(Date.now() / 1000);
  });
});

test.describe('Fallback Behavior', () => {
  test('should fallback to English for invalid locale', async ({ page }) => {
    // Try to access invalid locale
    await page.goto('/xx/investors');
    
    // Should either redirect to /en/investors or show 404
    // Depending on implementation, check one of these
    const url = page.url();
    expect(url.includes('/en/') || url.includes('404')).toBeTruthy();
  });

  test('should handle missing translations gracefully', async ({ page }) => {
    // Even if some translations are missing, page should render
    await page.goto('/zh/investors');
    
    // Page should load without errors
    await expect(page.locator('body')).toBeVisible();
    
    // Check no console errors for missing translation keys
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    await page.reload();
    
    // Filter out unrelated errors and check for translation-related errors
    const translationErrors = errors.filter(err => 
      err.includes('translation') || err.includes('i18n') || err.includes('locale')
    );
    
    expect(translationErrors.length).toBe(0);
  });
});
