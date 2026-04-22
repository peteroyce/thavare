import { test } from '@playwright/test';

test.use({ viewport: { width: 375, height: 812 } });

const PAGES = [
  { name: 'homepage', path: '/', scrollSteps: [0, 600, 1200, 1800, 2400, 3200, 4000, 4800, 5600, 6400, 7200, 8000, 8800, 9600, 10400, 11200] },
  { name: 'shop', path: '/shop', scrollSteps: [0, 600, 1200, 1800] },
  { name: 'pdp-bodywash', path: '/products/thavare-body-wash', scrollSteps: [0, 500, 1000, 1500] },
  { name: 'pdp-lotion', path: '/products/thavare-body-lotion', scrollSteps: [0, 500, 1000] },
  { name: 'pdp-sunscreen', path: '/products/thavare-sun-screen', scrollSteps: [0, 500, 1000] },
  { name: 'about', path: '/about', scrollSteps: [0, 600, 1200, 1800, 2400] },
  { name: 'founders', path: '/founders', scrollSteps: [0, 600, 1200, 1800, 2400, 3000] },
  { name: 'quiz', path: '/quiz', scrollSteps: [0] },
  { name: 'ingredients', path: '/ingredients', scrollSteps: [0, 600, 1200] },
  { name: 'ingredient-detail', path: '/ingredients/kumkumadi', scrollSteps: [0, 500] },
  { name: 'journal', path: '/journal', scrollSteps: [0, 600, 1200] },
  { name: 'journal-article', path: '/journal/why-active-skin-needs-different-care', scrollSteps: [0, 600, 1200] },
  { name: 'circle', path: '/circle', scrollSteps: [0, 600] },
  { name: 'faqs', path: '/faqs', scrollSteps: [0, 600, 1200] },
  { name: 'shipping', path: '/shipping', scrollSteps: [0, 600] },
  { name: 'returns', path: '/returns', scrollSteps: [0, 600] },
  { name: 'track-order', path: '/track-order', scrollSteps: [0] },
  { name: 'privacy', path: '/privacy-policy', scrollSteps: [0, 600, 1200] },
  { name: 'terms', path: '/terms', scrollSteps: [0, 600, 1200] },
  { name: 'wishlist', path: '/wishlist', scrollSteps: [0] },
  { name: 'cart-empty', path: '/cart', scrollSteps: [0] },
  { name: 'why-sport', path: '/why-sport-active', scrollSteps: [0, 600, 1200] },
];

for (const { name, path, scrollSteps } of PAGES) {
  test(`screenshots: ${name}`, async ({ page }) => {
    await page.goto(path, { waitUntil: 'networkidle', timeout: 15000 });
    await page.waitForTimeout(800);

    for (let i = 0; i < scrollSteps.length; i++) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollSteps[i]);
      await page.waitForTimeout(400);
      await page.screenshot({ path: `test-results/all-${name}-${i}.png` });
    }
  });
}
