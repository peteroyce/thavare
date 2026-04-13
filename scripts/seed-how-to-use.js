/**
 * seed-how-to-use.js
 *
 * One-time script that creates the `custom.how_to_use` metafield on every
 * Thavare product in Shopify using the Admin API.
 *
 * Prerequisites:
 *   1. Add SHOPIFY_ADMIN_API_TOKEN to .env.local (Settings → Apps → Develop apps
 *      → create app → Admin API scopes: write_products, read_products)
 *   2. NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN must already be in .env.local
 *
 * Usage:
 *   node --env-file=.env.local scripts/seed-how-to-use.js
 *
 * Safe to re-run — uses metafieldsSet which upserts (create or update).
 */

// ---------------------------------------------------------------------------
// How-to-use content per product handle
// Edit these values to match the final copy before running.
// ---------------------------------------------------------------------------
const HOW_TO_USE = {
  'thavare-body-wash': `Wet skin thoroughly under warm water. Dispense a small amount onto your palms or a loofah and lather gently. Massage in circular motions across the body, paying extra attention to sweat-prone areas — underarms, chest, and back. Rinse thoroughly. For best results, use immediately after every workout or outdoor activity. Follow with Thavare Body Lotion for complete post-sport recovery.`,

  'thavare-body-lotion': `After bathing, pat skin gently dry leaving it slightly damp. Dispense a generous amount onto your palms and massage into skin using long, upward strokes. Focus on high-friction zones — knees, elbows, shins, and calves — as well as areas exposed to sun and sweat during activity. Allow 2–3 minutes to absorb fully before dressing. Use daily after your post-workout shower for sustained skin recovery and deep Ayurvedic hydration.`,

  'thavare-sun-screen': `Apply generously to all exposed skin at least 20 minutes before sun exposure or outdoor activity. Do not forget high-exposure areas: back of hands, tops of feet, ears, back of neck, and shoulders. Reapply every 2 hours during prolonged outdoor use, or immediately after heavy sweating or towel drying. On the face, apply after moisturiser and before any makeup. Suitable for everyday urban use and intense sport.`,

  'thavare-adolescent-sun-block': `Apply a coin-sized amount to the face and a generous layer across all exposed body areas at least 15 minutes before going outdoors. Massage gently until fully absorbed. Reapply every 2 hours, or after swimming, sweating, or towel drying. Safe for daily use — morning application is recommended even on overcast days. Avoid direct contact with eyes; if contact occurs, rinse immediately with cool water. Gentle formula suitable for active adolescent skin.`,
};

// Fallback for any product not listed above
const DEFAULT_HOW_TO_USE = `Apply an appropriate amount to clean skin. Massage gently until fully absorbed. For best results, use consistently as part of your daily skincare routine. Avoid contact with eyes.`;

// ---------------------------------------------------------------------------
// Admin API helpers
// ---------------------------------------------------------------------------
const DOMAIN  = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const TOKEN   = process.env.SHOPIFY_ADMIN_API_TOKEN;

if (!DOMAIN || !TOKEN) {
  console.error(
    '\n❌  Missing env vars.\n' +
    '    Ensure NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN and SHOPIFY_ADMIN_API_TOKEN\n' +
    '    are present in .env.local and run with:\n' +
    '    node --env-file=.env.local scripts/seed-how-to-use.js\n'
  );
  process.exit(1);
}

const ADMIN_URL = `https://${DOMAIN}/admin/api/2025-01/graphql.json`;

async function adminFetch(query, variables = {}) {
  const res = await fetch(ADMIN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Admin API HTTP ${res.status}: ${text}`);
  }
  const json = await res.json();
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

// ---------------------------------------------------------------------------
// Step 1 — fetch all product IDs + handles
// ---------------------------------------------------------------------------
async function fetchAllProducts() {
  const data = await adminFetch(`
    {
      products(first: 50) {
        edges {
          node {
            id
            handle
            title
          }
        }
      }
    }
  `);
  return data.products.edges.map(({ node }) => node);
}

// ---------------------------------------------------------------------------
// Step 2 — upsert how_to_use metafield for each product (batched)
// ---------------------------------------------------------------------------
async function setHowToUse(products) {
  const metafields = products.map((p) => ({
    ownerId: p.id,
    namespace: 'custom',
    key: 'how_to_use',
    type: 'multi_line_text_field',
    value: HOW_TO_USE[p.handle] ?? DEFAULT_HOW_TO_USE,
  }));

  // Shopify metafieldsSet accepts up to 25 per call — chunk if needed
  const CHUNK = 25;
  for (let i = 0; i < metafields.length; i += CHUNK) {
    const chunk = metafields.slice(i, i + CHUNK);
    const data = await adminFetch(
      `mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
        metafieldsSet(metafields: $metafields) {
          metafields { id key namespace ownerId }
          userErrors { field message }
        }
      }`,
      { metafields: chunk }
    );

    const errors = data.metafieldsSet.userErrors;
    if (errors.length) {
      console.error('⚠️  User errors:', errors);
    }

    for (const mf of data.metafieldsSet.metafields) {
      const product = products.find((p) => p.id === mf.ownerId);
      const label = HOW_TO_USE[product?.handle] ? '✅' : '🔧 (default)';
      console.log(`  ${label} ${product?.title ?? mf.ownerId} — how_to_use set`);
    }
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
(async () => {
  console.log(`\n🌿 Thavare — seeding how_to_use metafields`);
  console.log(`   Store: ${DOMAIN}\n`);

  console.log('📦 Fetching products...');
  const products = await fetchAllProducts();
  console.log(`   Found ${products.length} product(s)\n`);

  console.log('✍️  Setting how_to_use metafields...');
  await setHowToUse(products);

  console.log('\n✅ Done. how_to_use is now set on all products.');
  console.log('   The PDP "How to Use" section will display on next page load.\n');
})().catch((err) => {
  console.error('\n❌ Script failed:', err.message);
  process.exit(1);
});
