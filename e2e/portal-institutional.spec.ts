import { test, expect } from '@playwright/test';

test.describe('Institutional Portal', () => {
  // Helper to login as institutional client
  async function loginAsInstitutional(page) {
    await page.goto('/portal/login');
    await page.fill('input[type="email"]', 'institutional@example.com');
    await page.click('button[type="submit"]');
    // In real tests, complete magic link flow
  }

  test('should display institutional dashboard after login', async ({ page }) => {
    await loginAsInstitutional(page);
    
    // Should be on institutional dashboard
    await expect(page).toHaveURL(/.*\/portal\/institutional\/dashboard/);
    
    // Should show welcome message
    await expect(page.locator('h1')).toContainText('Welcome');
    
    // Should show partnership overview
    await expect(page.locator('text=/partnership overview/i')).toBeVisible();
  });

  test('should display partnership metrics', async ({ page }) => {
    await loginAsInstitutional(page);
    await page.goto('/portal/institutional/dashboard');
    
    // Partnership metrics should be visible
    await expect(page.locator('text=/partnership duration/i')).toBeVisible();
    await expect(page.locator('text=/active projects/i')).toBeVisible();
    await expect(page.locator('text=/investment value/i')).toBeVisible();
  });

  test('should display project updates', async ({ page }) => {
    await loginAsInstitutional(page);
    await page.goto('/portal/institutional/dashboard');
    
    // Project updates panel should be visible
    await expect(page.locator('text=/project updates/i')).toBeVisible();
  });

  test('should navigate to projects page', async ({ page }) => {
    await loginAsInstitutional(page);
    await page.goto('/portal/institutional/dashboard');
    
    // Click on projects link
    await page.click('a[href="/portal/institutional/projects"]');
    
    // Should navigate to projects page
    await expect(page).toHaveURL(/.*\/portal\/institutional\/projects/);
  });

  test('should display account manager information', async ({ page }) => {
    await loginAsInstitutional(page);
    await page.goto('/portal/institutional/dashboard');
    
    // Account manager card should be visible
    await expect(page.locator('text=/account manager/i')).toBeVisible();
    
    // Should show contact options
    await expect(page.locator('text=/schedule meeting|send message/i')).toBeVisible();
  });

  test('should display documents', async ({ page }) => {
    await loginAsInstitutional(page);
    await page.goto('/portal/institutional/documents');
    
    // Documents section should be visible
    await expect(page.locator('h1')).toContainText('Documents');
    
    // Should see confidential document indicators
    await expect(page.locator('text=/contract|nda|presentation/i')).toBeVisible();
  });

  test('should navigate using sidebar', async ({ page }) => {
    await loginAsInstitutional(page);
    await page.goto('/portal/institutional/dashboard');
    
    // Test sidebar navigation
    const navItems = ['Dashboard', 'Projects', 'Documents', 'Messages', 'Calendar', 'Profile'];
    
    for (const item of navItems) {
      const navLink = page.locator(`nav a:has-text("${item}")`);
      await expect(navLink).toBeVisible();
    }
  });
});
