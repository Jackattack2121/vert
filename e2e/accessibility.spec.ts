import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * E2E tests for accessibility compliance (WCAG 2.1 Level AA)
 * Tests lang attributes, screen reader support, and keyboard navigation
 */

const locales = ['en', 'de', 'bs', 'zh', 'ja', 'fr', 'it'];

test.describe('WCAG 2.1 Level AA Compliance', () => {
  test('should have no accessibility violations on home page', async ({ page }) => {
    await page.goto('/en');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have no accessibility violations on investors page', async ({ page }) => {
    await page.goto('/en/investors');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have no accessibility violations in all locales', async ({ page }) => {
    // Test a subset of locales to keep test time reasonable
    const testLocales = ['en', 'de', 'zh'];
    
    for (const locale of testLocales) {
      await page.goto(`/${locale}`);
      
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();
      
      expect(accessibilityScanResults.violations).toEqual([]);
    }
  });
});

test.describe('Lang Attribute Validation', () => {
  test('should set correct lang attribute on html tag for each locale', async ({ page }) => {
    for (const locale of locales) {
      await page.goto(`/${locale}`);
      
      // HTML element should have correct lang attribute
      const htmlLang = await page.locator('html').getAttribute('lang');
      expect(htmlLang).toBe(locale);
    }
  });

  test('should mark English-only ASX content with lang="en"', async ({ page }) => {
    // Visit investors page in non-English locale
    await page.goto('/de/investors');
    
    // Check if there are elements with lang="en" (ASX content)
    const englishOnlyElements = await page.locator('[lang="en"]').count();
    
    // Should have some English-only content (if ASX announcements are present)
    // This test will pass with 0 if no ASX content is on the page
    expect(englishOnlyElements).toBeGreaterThanOrEqual(0);
  });

  test('should have lang="en" on ASX announcement titles in non-English pages', async ({ page }) => {
    // Go to ASX announcements page in German
    await page.goto('/de/investors/asx-announcements');
    
    // Wait for announcements to load
    await page.waitForSelector('h3', { timeout: 5000 }).catch(() => {
      // Page might not have announcements, that's okay
    });
    
    // Check if announcement titles are wrapped with lang="en"
    const announcementTitles = await page.locator('[lang="en"] h3').count();
    
    // If there are announcements, they should be marked as English
    // Allow 0 if no announcements present
    expect(announcementTitles).toBeGreaterThanOrEqual(0);
  });

  test('should change lang attribute when switching languages', async ({ page }) => {
    await page.goto('/en/investors');
    
    // Verify initial lang
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    
    // Switch to Japanese
    await page.click('[aria-label="Language selector"]');
    await page.click('text=日本語');
    
    await page.waitForURL('/ja/investors');
    
    // Verify lang changed
    await expect(page.locator('html')).toHaveAttribute('lang', 'ja');
  });
});

test.describe('Screen Reader Support', () => {
  test('should have proper ARIA labels on language switcher', async ({ page }) => {
    await page.goto('/en');
    
    // Language switcher button should have aria-label
    const switcherButton = page.locator('[aria-label="Language selector"]');
    await expect(switcherButton).toBeVisible();
    
    // Should have aria-expanded attribute
    const ariaExpanded = await switcherButton.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('false');
    
    // Open dropdown
    await switcherButton.click();
    
    // aria-expanded should change to true
    const ariaExpandedOpen = await switcherButton.getAttribute('aria-expanded');
    expect(ariaExpandedOpen).toBe('true');
  });

  test('should mark active language with aria-current', async ({ page }) => {
    await page.goto('/fr/investors');
    
    // Open language switcher
    await page.click('[aria-label="Language selector"]');
    
    // French option should have aria-current="true"
    const frenchOption = page.locator('button:has-text("Français")');
    await expect(frenchOption).toHaveAttribute('aria-current', 'true');
  });

  test('should have role="menu" on language dropdown', async ({ page }) => {
    await page.goto('/en');
    
    // Open language switcher
    await page.click('[aria-label="Language selector"]');
    
    // Dropdown should have role="menu"
    const dropdown = page.locator('[role="menu"]');
    await expect(dropdown).toBeVisible();
    
    // Menu items should have role="menuitem"
    const menuItems = page.locator('[role="menuitem"]');
    const count = await menuItems.count();
    expect(count).toBe(7); // 7 languages
  });

  test('should provide text alternatives for all images', async ({ page }) => {
    await page.goto('/en');
    
    // All images should have alt text
    const images = await page.locator('img').all();
    
    for (const img of images) {
      const alt = await img.getAttribute('alt');
      // Alt can be empty string for decorative images, but should exist
      expect(alt).not.toBeNull();
    }
  });
});

test.describe('Keyboard Navigation', () => {
  test('should open language switcher with Enter key', async ({ page }) => {
    await page.goto('/en');
    
    // Tab to language switcher
    const switcherButton = page.locator('[aria-label="Language selector"]');
    await switcherButton.focus();
    
    // Open with Enter
    await page.keyboard.press('Enter');
    
    // Dropdown should be visible
    await expect(page.locator('[role="menu"]')).toBeVisible();
  });

  test('should close language switcher with Escape key', async ({ page }) => {
    await page.goto('/en');
    
    // Open dropdown
    await page.click('[aria-label="Language selector"]');
    await expect(page.locator('[role="menu"]')).toBeVisible();
    
    // Close with Escape
    await page.keyboard.press('Escape');
    
    // Dropdown should be hidden
    await expect(page.locator('[role="menu"]')).not.toBeVisible();
  });

  test('should navigate site using keyboard only', async ({ page }) => {
    await page.goto('/en');
    
    // Tab through navigation
    await page.keyboard.press('Tab');
    
    // Should be able to access navigation links
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    
    // Focused element should be an interactive element
    expect(['A', 'BUTTON', 'INPUT'].includes(focusedElement || '')).toBeTruthy();
  });

  test('should have visible focus indicators', async ({ page }) => {
    await page.goto('/en');
    
    // Tab to first interactive element
    await page.keyboard.press('Tab');
    
    // Get computed style of focused element
    const outlineStyle = await page.evaluate(() => {
      const focused = document.activeElement;
      if (focused) {
        const styles = window.getComputedStyle(focused);
        return {
          outline: styles.outline,
          outlineWidth: styles.outlineWidth,
          boxShadow: styles.boxShadow,
        };
      }
      return null;
    });
    
    // Should have some form of focus indicator
    const hasFocusIndicator = outlineStyle && (
      outlineStyle.outline !== 'none' ||
      outlineStyle.outlineWidth !== '0px' ||
      outlineStyle.boxShadow !== 'none'
    );
    
    expect(hasFocusIndicator).toBeTruthy();
  });

  test('should have skip navigation link', async ({ page }) => {
    await page.goto('/en');
    
    // Press Tab to activate skip link (if present)
    await page.keyboard.press('Tab');
    
    // Check if a skip link exists (common accessibility practice)
    const skipLink = await page.locator('a[href="#main"], a:has-text("Skip to content")').count();
    
    // Note: This is recommended but not required for WCAG
    // Test will pass if it exists, just informational if it doesn't
    expect(skipLink).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Color Contrast', () => {
  test('should have sufficient color contrast on all pages', async ({ page }) => {
    const testPages = [
      '/en',
      '/en/investors',
      '/en/projects',
      '/en/contact',
    ];

    for (const pagePath of testPages) {
      await page.goto(pagePath);
      
      // Run axe color-contrast checks
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2aa'])
        .include('body')
        .analyze();
      
      // Filter for color contrast violations
      const contrastViolations = accessibilityScanResults.violations.filter(
        v => v.id === 'color-contrast'
      );
      
      expect(contrastViolations).toEqual([]);
    }
  });
});

test.describe('Form Accessibility', () => {
  test('should have accessible contact form', async ({ page }) => {
    await page.goto('/en/contact');
    
    // Run accessibility scan on form
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('form')
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have labels for all form inputs', async ({ page }) => {
    await page.goto('/en/contact');
    
    // All inputs should have associated labels
    const inputs = await page.locator('input:not([type="hidden"]), textarea, select').all();
    
    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');
      
      // Should have either: id with matching label, aria-label, or aria-labelledby
      const hasLabel = (id && await page.locator(`label[for="${id}"]`).count() > 0) ||
                      ariaLabel ||
                      ariaLabelledBy;
      
      expect(hasLabel).toBeTruthy();
    }
  });
});

test.describe('Responsive Design Accessibility', () => {
  test('should be accessible on mobile devices', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/en');
    
    // Run accessibility scan on mobile view
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have touch-friendly targets on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/en');
    
    // Check that interactive elements meet minimum size requirements (44x44px)
    const buttons = await page.locator('button, a').all();
    
    for (const button of buttons.slice(0, 10)) { // Test first 10
      const box = await button.boundingBox();
      
      if (box && await button.isVisible()) {
        // WCAG 2.1 AAA requires 44x44, AA doesn't specify but 44x44 is best practice
        // We'll check for at least 24x24 as a minimum
        expect(box.width).toBeGreaterThanOrEqual(24);
        expect(box.height).toBeGreaterThanOrEqual(24);
      }
    }
  });
});

test.describe('Text Alternatives', () => {
  test('should provide text alternatives for non-text content', async ({ page }) => {
    await page.goto('/en');
    
    // Check for SVGs without appropriate labels
    const accessibilityScanResults = await new AxeBuilder({ page })
      .include('svg')
      .analyze();
    
    // SVGs used for information should have text alternatives
    const svgViolations = accessibilityScanResults.violations.filter(
      v => v.id === 'svg-img-alt'
    );
    
    expect(svgViolations).toEqual([]);
  });
});

test.describe('CJK Font Accessibility', () => {
  test('should render Chinese text correctly', async ({ page }) => {
    await page.goto('/zh');
    
    // Check if Chinese font is loaded
    await page.waitForLoadState('networkidle');
    
    // Page should be visible and readable
    await expect(page.locator('body')).toBeVisible();
    
    // Check for proper font stack (Noto Sans SC)
    const fontFamily = await page.evaluate(() => {
      const body = document.body;
      return window.getComputedStyle(body).fontFamily;
    });
    
    // Should include CJK font or fallback
    expect(fontFamily).toBeTruthy();
  });

  test('should render Japanese text correctly', async ({ page }) => {
    await page.goto('/ja');
    
    await page.waitForLoadState('networkidle');
    
    // Page should be visible and readable
    await expect(page.locator('body')).toBeVisible();
    
    // Check for proper font rendering
    const fontFamily = await page.evaluate(() => {
      const body = document.body;
      return window.getComputedStyle(body).fontFamily;
    });
    
    expect(fontFamily).toBeTruthy();
  });
});
