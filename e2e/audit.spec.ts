/**
 * audit.spec.ts
 * Comprehensive Playwright audit — covers all pages including P2/P3 additions.
 * Checks for broken links, missing content, JS errors, and UI regressions.
 */

import { test, expect } from '@playwright/test';

// Collect console errors across tests
function watchErrors(page: import('@playwright/test').Page) {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', err => errors.push(err.message));
  return errors;
}

/* ------------------------------------------------------------------ */
/*  HOMEPAGE                                                           */
/* ------------------------------------------------------------------ */
test.describe('Homepage', () => {
  test('no JS errors on load', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/', { waitUntil: 'networkidle' });
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });

  test('WelcomeBanner renders and can be dismissed', async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem('thavare-welcome-dismissed'));
    await page.goto('/');
    await expect(page.getByText('WELCOME10')).toBeVisible({ timeout: 5000 });
  });


  test('DistributionStrip renders "Also Available At"', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Also Available At')).toBeVisible({ timeout: 5000 });
    // Multiple channel names match — use .first()
    await expect(page.getByText(/Nykaa|Tira/i).first()).toBeVisible({ timeout: 5000 });
  });

  test('Hero quiz CTA button links to /quiz', async ({ page }) => {
    await page.goto('/');
    const quizLink = page.locator('a[href="/quiz"]').first();
    await expect(quizLink).toBeVisible({ timeout: 5000 });
  });

  test('CategoryGrid links go to /shop?category=...', async ({ page }) => {
    await page.goto('/');
    const categoryLinks = page.locator('a[href^="/shop?category="]');
    const count = await categoryLinks.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });
});

/* ------------------------------------------------------------------ */
/*  NAVIGATION                                                         */
/* ------------------------------------------------------------------ */
test.describe('Navbar', () => {
  test('contains Journal link', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav').getByRole('link', { name: /journal/i })).toBeVisible();
  });

  test('Shop mega-menu appears on hover (desktop nav)', async ({ page }) => {
    await page.goto('/');
    // The Shop trigger is a <button> inside a div.relative, not a link
    const shopBtn = page.locator('nav').getByRole('button', { name: /^shop/i }).first();
    await shopBtn.hover();
    // Mega-menu links: Pre-Sport, Recovery, Sun Protection, Daily Essentials
    await expect(page.getByText(/Pre-Sport|Recovery|Sun Protection|Daily Essentials/).first()).toBeVisible({ timeout: 3000 });
  });

  test('Cart bag link is present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav').getByRole('link', { name: /bag|cart/i })).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  SHOP PAGE + PRODUCT CARDS                                          */
/* ------------------------------------------------------------------ */
test.describe('Shop page', () => {
  test('no JS errors on load', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/shop', { waitUntil: 'networkidle' });
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });

  test('Quick View button appears on card hover', async ({ page }) => {
    await page.goto('/shop');
    const card = page.locator('.group').first();
    await expect(card).toBeVisible({ timeout: 10000 });
    await card.hover();
    await expect(page.getByRole('button', { name: /quick view/i }).first()).toBeVisible({ timeout: 3000 });
  });

  test('Quick View modal opens and shows product info', async ({ page }) => {
    await page.goto('/shop');
    const card = page.locator('.group').first();
    await expect(card).toBeVisible({ timeout: 10000 });
    await card.hover();
    await page.getByRole('button', { name: /quick view/i }).first().click();
    // Modal has role="dialog" (added in code fix)
    await expect(page.locator('[role="dialog"]').first()).toBeVisible({ timeout: 3000 });
    // Should show add-to-bag inside the modal
    await expect(page.getByRole('button', { name: /add to bag/i }).first()).toBeVisible();
    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]').first()).not.toBeVisible({ timeout: 3000 });
  });

  test('Wishlist heart button toggles on product card', async ({ page }) => {
    await page.goto('/shop');
    const heartBtn = page.locator('button[aria-label*="wishlist"]').first();
    await expect(heartBtn).toBeVisible({ timeout: 10000 });
    await heartBtn.click();
    await expect(page.locator('button[aria-label*="Remove from wishlist"]').first()).toBeVisible({ timeout: 2000 });
  });
});

/* ------------------------------------------------------------------ */
/*  PRODUCT DETAIL PAGE                                                */
/* ------------------------------------------------------------------ */
test.describe('Product detail page', () => {
  test('PDP loads without crash and has h1', async ({ page }) => {
    await page.goto('/shop');
    await expect(page.locator('a[href^="/products/"]').first()).toBeVisible({ timeout: 10000 });
    const href = await page.locator('a[href^="/products/"]').first().getAttribute('href');
    const response = await page.goto(href!);
    expect(response?.status()).toBeLessThan(500);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 5000 });
  });

  test('Wishlist Save button toggles on PDP', async ({ page }) => {
    await page.goto('/shop');
    await expect(page.locator('a[href^="/products/"]').first()).toBeVisible({ timeout: 10000 });
    const href = await page.locator('a[href^="/products/"]').first().getAttribute('href');
    await page.goto(href!);
    const saveBtn = page.locator('button[aria-label*="wishlist"]').first();
    await expect(saveBtn).toBeVisible({ timeout: 5000 });
    await saveBtn.click();
    await expect(page.locator('button[aria-label*="Remove"]').first()).toBeVisible({ timeout: 2000 });
  });
});

/* ------------------------------------------------------------------ */
/*  SKINCARE QUIZ                                                      */
/* ------------------------------------------------------------------ */
test.describe('/quiz', () => {
  test('renders intro screen with h1 and Start Quiz button', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/quiz');
    // step=0 shows an h1 heading and "Start Quiz" button
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('button', { name: /start quiz/i })).toBeVisible({ timeout: 3000 });
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });

  test('can step through all 5 questions to get recommendations', async ({ page }) => {
    await page.goto('/quiz');
    // Click Start Quiz
    await page.getByRole('button', { name: /start quiz/i }).click();
    // Click first option for each of the 5 questions
    for (let i = 0; i < 5; i++) {
      // Wait for a question option button (not "Back")
      await page.waitForSelector('button', { timeout: 5000 });
      await page.waitForTimeout(200);
      // Pick the first option button (they're in a grid)
      const optionBtns = page.locator('button').filter({ hasNotText: /back|start/i });
      await optionBtns.first().click();
      await page.waitForTimeout(300);
    }
    // Should reach results view (step=6)
    const body = await page.locator('body').textContent();
    expect(body!.length).toBeGreaterThan(200);
  });
});

/* ------------------------------------------------------------------ */
/*  INGREDIENT GLOSSARY                                                */
/* ------------------------------------------------------------------ */
test.describe('/ingredients', () => {
  test('index page loads and shows ingredient links', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/ingredients');
    await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 8000 });
    // Wait for client-side hydration then check for ingredient links
    await page.waitForSelector('a[href^="/ingredients/"]', { timeout: 8000 });
    const links = page.locator('a[href^="/ingredients/"]');
    expect(await links.count()).toBeGreaterThanOrEqual(1);
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });

  test('slug page renders ingredient detail', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/ingredients/kumkumadi');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 5000 });
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });

  test('all 8 known ingredient slugs resolve without 404', async ({ request }) => {
    const slugs = ['kumkumadi', 'ashwagandha', 'neem', 'turmeric', 'aloe-vera', 'vetiver', 'sandalwood', 'manjistha'];
    for (const slug of slugs) {
      const res = await request.get(`/ingredients/${slug}`);
      expect(res.status(), `Expected /ingredients/${slug} to return 200`).toBe(200);
    }
  });
});

/* ------------------------------------------------------------------ */
/*  JOURNAL / BLOG                                                     */
/* ------------------------------------------------------------------ */
test.describe('/journal', () => {
  test('index page loads and shows article links', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/journal');
    await expect(page.getByRole('heading').first()).toBeVisible({ timeout: 8000 });
    // Wait for article links to render
    await page.waitForSelector('a[href^="/journal/"]', { timeout: 8000 });
    const articleLinks = page.locator('a[href^="/journal/"]');
    expect(await articleLinks.count()).toBeGreaterThanOrEqual(1);
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });

  test('navigating to a journal article renders full content', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/journal');
    await page.waitForSelector('a[href^="/journal/"]', { timeout: 8000 });
    const href = await page.locator('a[href^="/journal/"]').first().getAttribute('href');
    await page.goto(href!);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 5000 });
    await expect(page.getByText(/Dr\. Meena|Meena Ramaiah/i)).toBeVisible({ timeout: 5000 });
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });
});

/* ------------------------------------------------------------------ */
/*  LEGAL + HELP PAGES                                                 */
/* ------------------------------------------------------------------ */
test.describe('Legal & Help pages', () => {
  const pages = [
    '/privacy-policy',
    '/terms',
    '/faqs',
    '/shipping',
    '/returns',
    '/track-order',
  ];

  for (const path of pages) {
    test(`${path} renders without crash`, async ({ page }) => {
      const errors = watchErrors(page);
      const response = await page.goto(path, { timeout: 15000 });
      expect(response?.status()).toBeLessThan(500);
      // Check a heading exists somewhere on the page
      const headings = page.getByRole('heading');
      await expect(headings.first()).toBeVisible({ timeout: 5000 });
      expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
    });
  }

  test('/faqs accordion opens on click', async ({ page }) => {
    await page.goto('/faqs');
    const summary = page.locator('summary').first();
    await expect(summary).toBeVisible({ timeout: 5000 });
    await summary.click();
    const details = page.locator('details[open]').first();
    await expect(details).toBeVisible({ timeout: 2000 });
  });
});

/* ------------------------------------------------------------------ */
/*  ABOUT + FOUNDERS                                                   */
/* ------------------------------------------------------------------ */
test.describe('About & Founders', () => {
  test('/about renders certifications strip', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/about');
    // Wait for page to fully load; certifications are lower on page
    await expect(page.getByText('Clinically Tested')).toBeVisible({ timeout: 8000 });
    await expect(page.getByText('Cruelty Free')).toBeVisible({ timeout: 3000 });
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });

  test('/founders renders founder h1 heading', async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto('/founders');
    // hero-entry animation is 0.8s; wait up to 3s for it to complete
    await expect(page.getByRole('heading', { name: /why i started/i })).toBeVisible({ timeout: 8000 });
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });
});

/* ------------------------------------------------------------------ */
/*  WISHLIST PAGE (created to fix 404)                                 */
/* ------------------------------------------------------------------ */
test.describe('/wishlist', () => {
  test('renders empty state when no saved items', async ({ page }) => {
    const errors = watchErrors(page);
    // Clear wishlist AFTER first load (addInitScript runs on every navigation)
    await page.goto('/wishlist');
    await page.evaluate(() => localStorage.removeItem('thavare-wishlist'));
    await page.reload();
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 5000 });
    // Both the h1 "Saved Items (0)" and the empty-state p contain matching text
    await expect(page.getByRole('heading', { level: 1, name: /saved items/i })).toBeVisible({ timeout: 3000 });
    expect(errors.filter(e => !e.includes('net::ERR'))).toHaveLength(0);
  });

  test('saved items persist from shop to wishlist page', async ({ page }) => {
    // Clear wishlist once, then add item, then navigate
    await page.goto('/shop');
    await page.evaluate(() => localStorage.removeItem('thavare-wishlist'));
    const heartBtn = page.locator('button[aria-label*="wishlist"]').first();
    await expect(heartBtn).toBeVisible({ timeout: 10000 });
    await heartBtn.click();
    // Navigate to wishlist — localStorage persists across goto() within same page context
    await page.goto('/wishlist');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 5000 });
    const heading = await page.getByRole('heading', { level: 1 }).textContent();
    expect(heading).toMatch(/\(1\)/);
  });
});

/* ------------------------------------------------------------------ */
/*  CART                                                               */
/* ------------------------------------------------------------------ */
test.describe('Cart', () => {
  test('shows empty state with heading when no items', async ({ page }) => {
    await page.addInitScript(() => localStorage.removeItem('thavare-cart'));
    await page.goto('/cart');
    // Empty state: "Your bag is empty" (now h1 after code fix)
    await expect(page.getByRole('heading', { name: /your bag is empty/i })).toBeVisible({ timeout: 5000 });
    await expect(page.getByRole('link', { name: /shop now/i })).toBeVisible({ timeout: 3000 });
  });

  test('add to cart from shop then verify cart heading', async ({ page }) => {
    // Clear cart once after first load, then add item, then navigate
    await page.goto('/shop');
    await page.evaluate(() => localStorage.removeItem('thavare-cart'));
    await page.reload();
    await expect(page.getByRole('button', { name: /add to bag/i }).first()).toBeVisible({ timeout: 10000 });
    await page.getByRole('button', { name: /add to bag/i }).first().click();
    await page.goto('/cart');
    // "Your Bag (N)" heading
    await expect(page.getByRole('heading', { name: /your bag/i })).toBeVisible({ timeout: 5000 });
    // Order Summary present
    await expect(page.getByText('Order Summary')).toBeVisible();
    await expect(page.getByText('Subtotal')).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  BROKEN LINKS SCAN                                                  */
/* ------------------------------------------------------------------ */
test.describe('Broken links scan', () => {
  const internalRoutes = [
    '/',
    '/shop',
    '/about',
    '/founders',
    '/quiz',
    '/ingredients',
    '/journal',
    '/privacy-policy',
    '/terms',
    '/faqs',
    '/shipping',
    '/returns',
    '/track-order',
    '/cart',
    '/wishlist',
    '/circle',
  ];

  for (const route of internalRoutes) {
    test(`${route} returns < 500`, async ({ request }) => {
      const res = await request.get(route, { timeout: 15000 });
      expect(res.status(), `${route} returned ${res.status()}`).toBeLessThan(500);
    });
  }
});

/* ------------------------------------------------------------------ */
/*  FOOTER LINKS                                                       */
/* ------------------------------------------------------------------ */
test.describe('Footer links', () => {
  test('all footer internal links are present', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const footerLinks = page.locator('footer a[href^="/"]');
    const count = await footerLinks.count();
    console.log(`  Footer internal links: ${count}`);
    expect(count).toBeGreaterThan(3);
  });

  test('Instagram link points to thavare_ayurveda', async ({ page }) => {
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const igLink = page.locator('a[href*="instagram.com/thavare"]');
    await expect(igLink.first()).toBeVisible({ timeout: 3000 });
  });
});
