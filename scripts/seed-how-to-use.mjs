/**
 * One-time seed script — sets the custom.how_to_use metafield on all 6 products.
 *
 * Usage:
 *   SHOPIFY_ADMIN_TOKEN=shpat_xxxx node scripts/seed-how-to-use.mjs
 *
 * Get your token: Shopify Admin → Settings → Apps → Develop apps
 *   → Create app → Admin API access → write_products scope → Install
 */

const STORE = 'thavare-2.myshopify.com';
const API_VERSION = '2025-01';
const TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

if (!TOKEN) {
  console.error('❌  Set SHOPIFY_ADMIN_TOKEN env var first.');
  console.error('   SHOPIFY_ADMIN_TOKEN=shpat_xxxx node scripts/seed-how-to-use.mjs');
  process.exit(1);
}

const HOW_TO_USE = {
  'thavare-body-wash':
    'Apply to wet skin, lather gently, leave for 60 seconds, rinse. Use pre or post workout.',
  'thavare-body-lotion':
    'Massage onto damp skin after shower. Focus on joints and dry areas. Use daily.',
  'thavare-sun-screen':
    'Apply 15 minutes before sun exposure. Reapply every 2 hours during outdoor activity.',
  'thavare-adolescent-sun-block':
    'Apply generously to face and exposed skin. Safe for daily school and outdoor use.',
  'thavare-anti-perspirant-lotion':
    'Apply to underarms on dry skin. Works best when applied the night before.',
  'thavare-kumkumadi-taila':
    'Warm 2–3 drops between palms. Press gently onto clean face. Use nightly.',
};

async function adminFetch(query, variables = {}) {
  const res = await fetch(`https://${STORE}/admin/api/${API_VERSION}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

const GET_PRODUCT_ID = `
  query($handle: String!) {
    productByHandle(handle: $handle) { id }
  }
`;

const SET_METAFIELD = `
  mutation($input: ProductInput!) {
    productUpdate(input: $input) {
      product { id }
      userErrors { field message }
    }
  }
`;

for (const [handle, value] of Object.entries(HOW_TO_USE)) {
  process.stdout.write(`Setting how_to_use on ${handle}... `);
  try {
    const { productByHandle } = await adminFetch(GET_PRODUCT_ID, { handle });
    if (!productByHandle) { console.log('❌  not found'); continue; }

    const data = await adminFetch(SET_METAFIELD, {
      input: {
        id: productByHandle.id,
        metafields: [{ namespace: 'custom', key: 'how_to_use', type: 'single_line_text_field', value }],
      },
    });

    const errs = data.productUpdate?.userErrors ?? [];
    if (errs.length) { console.log('❌ ', errs[0].message); }
    else { console.log('✓'); }
  } catch (e) {
    console.log('❌ ', e.message);
  }
}

console.log('\nDone. Reload the site to see How to Use on PDPs.');
