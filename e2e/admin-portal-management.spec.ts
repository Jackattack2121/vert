import { test, expect } from '@playwright/test';

test.describe('Admin Portal Management', () => {
  // Helper to login as admin
  async function loginAsAdmin(page) {
    await page.goto('/admin/login');
    await page.fill('input[name="email"]', process.env.ADMIN_EMAIL || 'admin@test.com');
    await page.fill('input[name="password"]', process.env.ADMIN_PASSWORD || 'password');
    await page.click('button[type="submit"]');
    await page.waitForURL(/.*\/admin/);
  }

  test('should display portal management dashboard', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/portal');
    
    // Should show portal management sections
    await expect(page.locator('h1')).toContainText('Portal Management');
    
    // Should have links to management sections
    await expect(page.locator('text=/user management/i')).toBeVisible();
    await expect(page.locator('text=/document management/i')).toBeVisible();
    await expect(page.locator('text=/message management/i')).toBeVisible();
    await expect(page.locator('text=/calendar management/i')).toBeVisible();
  });

  test('should display portal users table', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/portal/users');
    
    // Should show users table
    await expect(page.locator('h1')).toContainText('Portal Users');
    
    // Should have filter tabs
    await expect(page.locator('text=/all|shareholder|institutional/i')).toBeVisible();
    
    // Should have invite button
    await expect(page.locator('text=/invite new user/i')).toBeVisible();
  });

  test('should filter users by role', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/portal/users');
    
    // Click shareholder filter
    await page.click('text=/shareholder/i');
    
    // Table should update (verify by checking tab is active)
    const shareholderTab = page.locator('button:has-text("Shareholder")');
    await expect(shareholderTab).toHaveClass(/border-primary/);
  });

  test('should display messages management', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/portal/messages');
    
    // Should show messages table
    await expect(page.locator('h1')).toContainText('Portal Messages');
    
    // Should have status filters
    await expect(page.locator('text=/all|open|replied|resolved/i')).toBeVisible();
  });

  test('should display message details when selected', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/portal/messages');
    
    // Wait for messages to load
    await page.waitForSelector('button', { timeout: 5000 });
    
    // Click on first message if available
    const firstMessage = page.locator('table tbody tr, [role="button"]').first();
    if (await firstMessage.isVisible()) {
      await firstMessage.click();
      
      // Reply panel should be visible
      await expect(page.locator('text=/reply to message/i')).toBeVisible();
      await expect(page.locator('textarea')).toBeVisible();
    }
  });

  test('should restrict access to non-admin users', async ({ page }) => {
    // Try to access admin portal without login
    await page.goto('/admin/portal');
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*\/admin\/login/);
  });

  test('should show portal statistics', async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto('/admin/portal');
    
    // Statistics should be visible
    await expect(page.locator('text=/total users/i')).toBeVisible();
    await expect(page.locator('text=/documents/i')).toBeVisible();
    await expect(page.locator('text=/messages/i')).toBeVisible();
  });
});
