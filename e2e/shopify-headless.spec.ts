import { test, expect } from '@playwright/test';

/* ------------------------------------------------------------------ */
/*  1. Homepage                                                        */
/* ------------------------------------------------------------------ */
test.describe('Homepage', () => {
  test('loads with nav, Bestsellers, and New Arrivals sections', async ({ page }) => {
    await page.goto('/', { timeout: 15000 });

    // Navbar renders with brand name
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('nav').getByText('THAVARE')).toBeVisible();

    // Navigation links present (desktop links)
    await expect(page.getByRole('link', { name: /shop/i }).first()).toBeVisible();

    // Bestsellers section — has heading; products may or may not be present
    const bestsellersHeading = page.getByRole('heading', { name: /bestsellers/i });
    await expect(bestsellersHeading).toBeVisible();

    // New Arrivals section
    const newArrivalsHeading = page.getByRole('heading', { name: /arrivals/i });
    await expect(newArrivalsHeading).toBeVisible();

    // If Shopify returned products, at least one product card image should be visible
    // (graceful: we don't fail if Shopify returned nothing)
    const productImages = page.locator('img[alt]').filter({ hasNotText: /hero|founder|logo/i });
    const count = await productImages.count();
    // Just log — no hard assertion on count since Shopify data may vary
    console.log(`  Homepage product images found: ${count}`);
  });
});

/* ------------------------------------------------------------------ */
/*  2. Shop page                                                       */
/* ------------------------------------------------------------------ */
test.describe('Shop page', () => {
  test('loads with filter buttons and product cards', async ({ page }) => {
    await page.goto('/shop', { timeout: 15000 });

    // Page heading
    await expect(page.getByRole('heading', { name: /shop all products/i })).toBeVisible();

    // Category filter buttons
    const filters = ['All', 'Sport', 'Daily Essentials', 'Recovery', 'Sun Protection'];
    for (const label of filters) {
      await expect(page.getByRole('button', { name: label })).toBeVisible();
    }

    // Product cards should be visible (at least one)
    // Each product card has an "Add to Bag" button
    const addButtons = page.getByRole('button', { name: /add to bag/i });
    await expect(addButtons.first()).toBeVisible({ timeout: 10000 });
    const cardCount = await addButtons.count();
    expect(cardCount).toBeGreaterThanOrEqual(1);
    console.log(`  Shop page product cards: ${cardCount}`);
  });

  test('filter buttons toggle product visibility', async ({ page }) => {
    await page.goto('/shop', { timeout: 15000 });

    // Wait for cards to render
    await expect(page.getByRole('button', { name: /add to bag/i }).first()).toBeVisible({ timeout: 10000 });

    const allCount = await page.getByRole('button', { name: /add to bag/i }).count();

    // Click "Sport" filter
    await page.getByRole('button', { name: 'Sport' }).click();
    // Allow time for filter to apply
    await page.waitForTimeout(500);

    const sportCount = await page.getByRole('button', { name: /add to bag/i }).count();
    // Sport count should be <= All count (some products may not be sport)
    expect(sportCount).toBeLessThanOrEqual(allCount);

    // Click "All" to reset
    await page.getByRole('button', { name: 'All' }).click();
    await page.waitForTimeout(500);
    const resetCount = await page.getByRole('button', { name: /add to bag/i }).count();
    expect(resetCount).toBe(allCount);
  });
});

/* ------------------------------------------------------------------ */
/*  3. Product detail page                                             */
/* ------------------------------------------------------------------ */
test.describe('Product detail page', () => {
  test('navigate from shop to a product, verify breadcrumb, image, name, Add to Bag', async ({ page }) => {
    // First visit /shop to discover a real product URL
    await page.goto('/shop', { timeout: 15000 });
    await expect(page.getByRole('button', { name: /add to bag/i }).first()).toBeVisible({ timeout: 10000 });

    // Get the first product link (the card image links to /products/[slug])
    const productLink = page.locator('a[href^="/products/"]').first();
    const href = await productLink.getAttribute('href');
    expect(href).toBeTruthy();
    console.log(`  Navigating to product: ${href}`);

    // Navigate to that product page
    await page.goto(href!, { timeout: 15000 });

    // Breadcrumb: Home / Shop / <product name>
    const breadcrumb = page.locator('text=Home').first();
    await expect(breadcrumb).toBeVisible();
    await expect(page.locator('a[href="/shop"]').first()).toBeVisible();

    // Product image
    const mainImage = page.locator('img').first();
    await expect(mainImage).toBeVisible();

    // Product name (h1)
    const h1 = page.getByRole('heading', { level: 1 });
    await expect(h1).toBeVisible();
    const productName = await h1.textContent();
    expect(productName!.length).toBeGreaterThan(0);
    console.log(`  Product name: ${productName}`);

    // "Add to Bag" button on product detail (first is the main one, others are related product cards)
    const addButton = page.getByRole('button', { name: /add to bag/i }).first();
    await expect(addButton).toBeVisible();

    // Quantity controls (minus and plus buttons)
    await expect(page.getByText('\u2212')).toBeVisible(); // minus sign
    await expect(page.getByRole('button', { name: 'Increase quantity' })).toBeVisible();

    // "You May Also Like" related products section
    await expect(page.getByRole('heading', { name: /you may also like/i })).toBeVisible();
  });
});

/* ------------------------------------------------------------------ */
/*  4. Cart flow                                                       */
/* ------------------------------------------------------------------ */
test.describe('Cart flow', () => {
  test('add product from shop page, navigate to cart, verify item and checkout button', async ({ page }) => {
    // Go to shop
    await page.goto('/shop', { timeout: 15000 });
    await expect(page.getByRole('button', { name: /add to bag/i }).first()).toBeVisible({ timeout: 10000 });

    // Click the first "Add to Bag" button on a product card
    await page.getByRole('button', { name: /add to bag/i }).first().click();

    // The nav bag counter should update to at least 1
    // Nav has "Bag (N)" text
    await expect(page.getByText(/bag\s*\(\s*[1-9]/i).first()).toBeVisible({ timeout: 5000 });

    // Navigate to cart
    await page.goto('/cart', { timeout: 15000 });

    // Cart heading should include count, e.g. "Your Bag (1)"
    await expect(page.getByRole('heading', { name: /your bag/i })).toBeVisible();

    // Order Summary section
    await expect(page.getByText('Order Summary')).toBeVisible();
    await expect(page.getByText('Subtotal')).toBeVisible();
    await expect(page.getByText('Shipping', { exact: true })).toBeVisible();

    // "Pay Now" button exists and is enabled (Razorpay checkout)
    const checkoutBtn = page.getByRole('button', { name: /pay now/i });
    await expect(checkoutBtn).toBeVisible();
    await expect(checkoutBtn).toBeEnabled();
  });
});

/* ------------------------------------------------------------------ */
/*  5. Order success page                                              */
/* ------------------------------------------------------------------ */
test.describe('Order success page', () => {
  test('shows confirmation UI with CTAs', async ({ page }) => {
    await page.goto('/order-success', { timeout: 15000 });

    // "Order Confirmed" text
    await expect(page.getByText('Order Confirmed')).toBeVisible();

    // Thank you heading
    await expect(page.getByRole('heading', { name: /thank you for your order/i })).toBeVisible();

    // Confirmation message
    await expect(page.getByText(/products are on their way/i)).toBeVisible();

    // "Continue Shopping" button/link
    const continueBtn = page.getByRole('link', { name: /continue shopping/i });
    await expect(continueBtn).toBeVisible();

    // "Back to Home" button/link
    const homeBtn = page.getByRole('button', { name: /back to home/i });
    // The "Back to Home" is a <button> inside a <Link>
    // Try button first, then fall back to link
    const backLink = page.getByRole('link', { name: /back to home/i });
    const homeVisible = await homeBtn.isVisible().catch(() => false) || await backLink.isVisible().catch(() => false);
    expect(homeVisible).toBe(true);
  });
});

/* ------------------------------------------------------------------ */
/*  6. Sitemap                                                         */
/* ------------------------------------------------------------------ */
test.describe('Sitemap', () => {
  test('returns valid XML with product URLs', async ({ request }) => {
    const response = await request.get('/sitemap.xml', { timeout: 15000 });
    expect(response.status()).toBe(200);

    const contentType = response.headers()['content-type'] ?? '';
    expect(contentType).toContain('xml');

    const body = await response.text();
    // Should be valid XML sitemap
    expect(body).toContain('<urlset');
    expect(body).toContain('<url>');
    expect(body).toContain('<loc>');

    // Should contain core pages
    expect(body).toContain('thavare.com');
    expect(body).toContain('/shop');

    // Should contain at least one product URL
    expect(body).toContain('/products/');
    console.log(`  Sitemap size: ${body.length} bytes`);
  });
});

/* ------------------------------------------------------------------ */
/*  7. 404 page                                                        */
/* ------------------------------------------------------------------ */
test.describe('404 page', () => {
  test('renders not-found page for invalid route (no crash)', async ({ page }) => {
    const response = await page.goto('/nonexistent-page-that-does-not-exist', { timeout: 15000 });

    // Should return 404 status
    expect(response?.status()).toBe(404);

    // Page should render something (not a blank crash)
    // Next.js default 404 shows "This page could not be found."
    const body = page.locator('body');
    await expect(body).toBeVisible();

    // Check for typical 404 text
    const text = await body.textContent();
    const has404Indicator = /404|not found|could not be found|page doesn.t exist/i.test(text ?? '');
    expect(has404Indicator).toBe(true);
  });
});
