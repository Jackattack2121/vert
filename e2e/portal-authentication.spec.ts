import { test, expect } from '@playwright/test';

test.describe('Portal Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/portal/login');
  });

  test('should display login page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Client Portal');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    // Enter invalid email
    await page.fill('input[type="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    
    // Should show validation error
    await expect(page.locator('text=/valid email/i')).toBeVisible();
  });

  test('should request magic link for valid email', async ({ page }) => {
    // Enter valid email
    await page.fill('input[type="email"]', 'test@example.com');
    await page.click('button[type="submit"]');
    
    // Should show success message
    await expect(page.locator('text=/check your email/i')).toBeVisible();
    await expect(page.locator('text=/15 minutes/i')).toBeVisible();
  });

  test('should handle magic link verification', async ({ page }) => {
    // Note: In real tests, you'd need to get an actual token from test database
    const mockToken = 'test-token-123';
    
    await page.goto(`/portal/verify?token=${mockToken}`);
    
    // Should show verification UI
    await expect(page.locator('text=/verifying/i')).toBeVisible();
  });

  test('should handle expired magic link', async ({ page }) => {
    const expiredToken = 'expired-token';
    
    await page.goto(`/portal/verify?token=${expiredToken}`);
    
    // Wait for verification to complete
    await page.waitForSelector('text=/verification failed/i', { timeout: 10000 });
    
    // Should show error and return to login link
    await expect(page.locator('text=/invalid or expired/i')).toBeVisible();
    await expect(page.locator('a[href="/portal/login"]')).toBeVisible();
  });

  test('should prevent access to protected routes without authentication', async ({ page }) => {
    await page.goto('/portal/investor/dashboard');
    
    // Should redirect to login
    await expect(page).toHaveURL(/.*\/portal\/login/);
  });
});
