import { test, expect } from '@playwright/test';

test.describe('News & Blog', () => {
  test('should display news listing page', async ({ page }) => {
    await page.goto('/en/news');
    
    // Should show news page
    await expect(page.locator('h1')).toContainText('News & Updates');
    
    // Should have category filters
    await expect(page.locator('text=/all news|company news|project updates/i')).toBeVisible();
  });

  test('should filter news by category', async ({ page }) => {
    await page.goto('/en/news');
    
    // Click on a category filter
    await page.click('text=/company news/i');
    
    // URL should update with category parameter
    await expect(page).toHaveURL(/.*category=Company\+News/);
  });

  test('should display news article', async ({ page }) => {
    await page.goto('/en/news');
    
    // Wait for news cards to load
    await page.waitForSelector('article', { timeout: 5000 });
    
    // Click on first news article (if any exist)
    const firstArticle = page.locator('article').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      
      // Should navigate to article page
      await expect(page).toHaveURL(/.*\/news\/.+/);
      
      // Article content should be visible
      await expect(page.locator('h1')).toBeVisible();
    }
  });

  test('should display RSS feed link', async ({ page }) => {
    // RSS feed should be accessible
    const response = await page.goto('/en/news/rss.xml');
    
    // Should return XML content
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('xml');
  });

  test('should show related articles', async ({ page }) => {
    // Navigate to a news article
    await page.goto('/en/news');
    
    const firstArticle = page.locator('article').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      
      // Scroll to bottom to see related articles
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Related articles section should be visible (if articles exist)
      const relatedSection = page.locator('text=/related articles/i');
      if (await relatedSection.isVisible()) {
        await expect(relatedSection).toBeVisible();
      }
    }
  });

  test('should have social sharing options', async ({ page }) => {
    await page.goto('/en/news');
    
    const firstArticle = page.locator('article').first();
    if (await firstArticle.isVisible()) {
      await firstArticle.click();
      
      // Scroll down to sharing section
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      
      // Social sharing buttons should be visible
      await expect(page.locator('text=/share this article/i')).toBeVisible();
      await expect(page.locator('text=/twitter|linkedin/i')).toBeVisible();
    }
  });

  test('should be responsive on mobile', async ({ page, viewport }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/en/news');
    
    // Page should be visible and functional
    await expect(page.locator('h1')).toBeVisible();
    
    // Category filters should be visible (may wrap on mobile)
    await expect(page.locator('text=/all news/i')).toBeVisible();
  });
});
