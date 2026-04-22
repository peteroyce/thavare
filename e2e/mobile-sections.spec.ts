import { test } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

const SECTIONS = [
  { name: 'hero', scrollTo: 0 },
  { name: 'marquee-category', scrollTo: 700 },
  { name: 'bestsellers', scrollTo: 1400 },
  { name: 'values', scrollTo: 2800 },
  { name: 'ingredients', scrollTo: 3800 },
  { name: 'founder', scrollTo: 4600 },
  { name: 'circle', scrollTo: 5400 },
  { name: 'newarrivals', scrollTo: 6200 },
  { name: 'why', scrollTo: 8000 },
  { name: 'press', scrollTo: 9000 },
  { name: 'newsletter', scrollTo: 9800 },
  { name: 'distribution', scrollTo: 10400 },
  { name: 'footer', scrollTo: 11200 },
];

test('mobile section screenshots', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(1000);

  for (const { name, scrollTo } of SECTIONS) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
    await page.waitForTimeout(500);
    await page.screenshot({ path: `test-results/m-${name}.png` });
  }
});

test('mobile shop page', async ({ page }) => {
  await page.goto('/shop', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `test-results/m-shop-top.png` });
  await page.evaluate(() => window.scrollTo(0, 800));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `test-results/m-shop-cards.png` });
});

test('mobile product page', async ({ page }) => {
  await page.goto('/products/thavare-body-wash', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `test-results/m-pdp-top.png` });
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.waitForTimeout(500);
  await page.screenshot({ path: `test-results/m-pdp-info.png` });
});

test('mobile cart page', async ({ page }) => {
  await page.goto('/shop', { waitUntil: 'networkidle', timeout: 15000 });
  await page.getByRole('button', { name: /add to bag/i }).first().click();
  await page.waitForTimeout(500);
  await page.goto('/cart', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `test-results/m-cart.png` });
});

test('mobile nav menu', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle', timeout: 15000 });
  await page.waitForTimeout(500);
  const hamburger = page.locator('button[aria-label="Open menu"]');
  await hamburger.click();
  await page.waitForTimeout(500);
  await page.screenshot({ path: `test-results/m-nav-menu.png` });
});
