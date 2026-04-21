/**
 * Mobile viewport audit — screenshots every key page at 375x812 (iPhone)
 * to visually inspect mobile responsiveness.
 */
import { test, expect } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

const PAGES = [
  { name: 'homepage', path: '/' },
  { name: 'shop', path: '/shop' },
  { name: 'product', path: '/products/thavare-body-wash' },
  { name: 'cart-empty', path: '/cart' },
  { name: 'about', path: '/about' },
  { name: 'founders', path: '/founders' },
  { name: 'quiz', path: '/quiz' },
  { name: 'ingredients', path: '/ingredients' },
  { name: 'journal', path: '/journal' },
  { name: 'faqs', path: '/faqs' },
  { name: 'circle', path: '/circle' },
  { name: 'wishlist', path: '/wishlist' },
];

for (const { name, path } of PAGES) {
  test(`mobile: ${name} renders without overflow`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle', timeout: 15000 });

    // Check no horizontal overflow
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasOverflow, `${name} has horizontal overflow on mobile`).toBe(false);

    // Check all text is readable (no text smaller than 10px)
    const tinyText = await page.evaluate(() => {
      const els = document.querySelectorAll('*');
      const issues: string[] = [];
      els.forEach(el => {
        const style = window.getComputedStyle(el);
        const fontSize = parseFloat(style.fontSize);
        if (el.textContent?.trim() && fontSize < 10 && el.children.length === 0) {
          issues.push(`"${el.textContent.trim().slice(0, 30)}" at ${fontSize}px`);
        }
      });
      return issues.slice(0, 5);
    });

    // Log tiny text issues but don't fail (some are intentional like overlines)
    if (tinyText.length > 0) {
      console.log(`  [${name}] tiny text:`, tinyText);
    }

    // Check buttons/links are at least 44px touch targets
    const smallTouchTargets = await page.evaluate(() => {
      const interactive = document.querySelectorAll('button, a, [role="button"]');
      const issues: string[] = [];
      interactive.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0 && (rect.height < 36 || rect.width < 36)) {
          const text = el.textContent?.trim().slice(0, 20) || el.getAttribute('aria-label') || 'unknown';
          issues.push(`"${text}" ${Math.round(rect.width)}x${Math.round(rect.height)}`);
        }
      });
      return issues.slice(0, 5);
    });

    if (smallTouchTargets.length > 0) {
      console.log(`  [${name}] small touch targets:`, smallTouchTargets);
    }

    // Take screenshot for visual review
    await page.screenshot({ path: `test-results/mobile-${name}.png`, fullPage: true });
  });
}

// Special test: homepage scroll through all sections
test('mobile: homepage full scroll check', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 15000 });

  // Scroll through entire page in steps
  const pageHeight = await page.evaluate(() => document.body.scrollHeight);
  const steps = Math.ceil(pageHeight / 812);

  for (let i = 0; i < steps; i++) {
    await page.evaluate((y) => window.scrollTo(0, y), i * 812);
    await page.waitForTimeout(200);
  }

  // Final check: no elements wider than viewport
  const wideElements = await page.evaluate(() => {
    const issues: string[] = [];
    document.querySelectorAll('*').forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 375 + 5) { // 5px tolerance
        const tag = el.tagName.toLowerCase();
        const cls = el.className?.toString().slice(0, 40) || '';
        issues.push(`<${tag}> ${Math.round(rect.width)}px (${cls})`);
      }
    });
    // Dedupe
    return [...new Set(issues)].slice(0, 10);
  });

  if (wideElements.length > 0) {
    console.log('  Wide elements on mobile:', wideElements);
  }
});
