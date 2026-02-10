import { test, expect } from '@playwright/test';

test.describe('Shareholder Portal', () => {
  // Helper to login as shareholder
  async function loginAsShareholder(page) {
    // Note: In real tests, you'd set up authentication properly
    // This is a placeholder for the actual authentication flow
    await page.goto('/portal/login');
    await page.fill('input[type="email"]', 'shareholder@example.com');
    await page.click('button[type="submit"]');
    // In real tests, retrieve magic link token and complete login
  }

  test('should display shareholder dashboard after login', async ({ page }) => {
    await loginAsShareholder(page);
    
    // Should be on dashboard
    await expect(page).toHaveURL(/.*\/portal\/investor\/dashboard/);
    
    // Should show welcome message
    await expect(page.locator('h1')).toContainText('Welcome back');
    
    // Should show portfolio summary
    await expect(page.locator('text=/portfolio summary/i')).toBeVisible();
  });

  test('should display portfolio information', async ({ page }) => {
    await loginAsShareholder(page);
    await page.goto('/portal/investor/dashboard');
    
    // Portfolio summary should be visible
    await expect(page.locator('text=/total value/i')).toBeVisible();
    await expect(page.locator('text=/gain\\/loss/i')).toBeVisible();
    await expect(page.locator('text=/total shares/i')).toBeVisible();
  });

  test('should navigate to portfolio page', async ({ page }) => {
    await loginAsShareholder(page);
    await page.goto('/portal/investor/dashboard');
    
    // Click on portfolio link
    await page.click('a[href="/portal/investor/portfolio"]');
    
    // Should navigate to portfolio page
    await expect(page).toHaveURL(/.*\/portal\/investor\/portfolio/);
  });

  test('should display documents library', async ({ page }) => {
    await loginAsShareholder(page);
    await page.goto('/portal/investor/documents');
    
    // Documents section should be visible
    await expect(page.locator('h1')).toContainText('Documents');
    
    // Should be able to see document categories or list
    await expect(page.locator('text=/financial report|tax document|certificate/i')).toBeVisible();
  });

  test('should display messages', async ({ page }) => {
    await loginAsShareholder(page);
    await page.goto('/portal/investor/messages');
    
    // Messages section should be visible
    await expect(page.locator('h1')).toContainText('Messages');
    
    // Should have option to create new message
    await expect(page.locator('text=/new message/i')).toBeVisible();
  });

  test('should display calendar events', async ({ page }) => {
    await loginAsShareholder(page);
    await page.goto('/portal/investor/calendar');
    
    // Calendar section should be visible
    await expect(page.locator('h1')).toContainText('Calendar');
  });

  test('should navigate using sidebar', async ({ page }) => {
    await loginAsShareholder(page);
    await page.goto('/portal/investor/dashboard');
    
    // Test sidebar navigation
    const navItems = ['Dashboard', 'Portfolio', 'Documents', 'Messages', 'Calendar', 'Profile'];
    
    for (const item of navItems) {
      const navLink = page.locator(`nav a:has-text("${item}")`);
      await expect(navLink).toBeVisible();
    }
  });

  test('should sign out successfully', async ({ page }) => {
    await loginAsShareholder(page);
    await page.goto('/portal/investor/dashboard');
    
    // Click sign out button
    await page.click('button:has-text("Sign Out")');
    
    // Should redirect to login page
    await expect(page).toHaveURL(/.*\/portal\/login/);
  });
});
