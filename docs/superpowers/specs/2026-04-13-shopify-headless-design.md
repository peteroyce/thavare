# Thavare Shopify Headless Integration — Design Spec

**Goal:** Wire the existing custom Next.js frontend to Shopify as the backend — products managed in Shopify admin, checkout handled by Shopify hosted checkout with Razorpay as the payment gateway. Identical checkout experience to Forest Essentials.

**Architecture:** Headless Shopify. The custom Next.js UI handles browsing, product pages, and cart. At checkout, a Shopify cart is created via Storefront API and the user is redirected to Shopify's hosted checkout. Shopify handles payment (Razorpay), order confirmation emails, inventory, and the admin dashboard.

**Tech Stack:** Next.js 16.2.3 App Router, Shopify Storefront API (GraphQL, 2024-01), Zustand 5, Tailwind v4

---

## What Changes vs What Stays the Same

### Stays exactly the same (no visual changes)
- All UI — shop, product, cart, brand pages, navbar, footer
- Design tokens, animations, custom cursor
- SEO — sitemap, robots, Open Graph, JSON-LD
- All components except `CheckoutForm` (removed)

### Changes
| File | Change |
|------|--------|
| `lib/shopify.ts` | NEW — Storefront API GraphQL client |
| `lib/shopify-queries.ts` | NEW — GraphQL query strings |
| `lib/products.ts` | Remove hardcoded `PRODUCTS` array, keep `Product` type + add `variantId` field |
| `lib/cart.ts` | Add `variantId: string` to `CartItem`, add `shopifyCartId` to store, add `createShopifyCheckout()` action |
| `app/shop/page.tsx` | Convert to async server component, fetch products from Shopify |
| `app/shop/ShopGrid.tsx` | NEW — extract client filter/grid component from shop page |
| `app/products/[slug]/page.tsx` | Fetch product by handle from Shopify |
| `app/order-success/page.tsx` | NEW — order confirmed screen, Shopify redirects here |
| `app/checkout/` | REMOVED — Shopify handles checkout |
| `components/checkout/CheckoutForm.tsx` | REMOVED |
| `next.config.ts` | Add `cdn.shopify.com` to `images.remotePatterns` |
| `.env.local` | Add `SHOPIFY_STORE_DOMAIN`, `SHOPIFY_STOREFRONT_ACCESS_TOKEN` |

---

## Section 1: Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=thavare.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=<token-from-shopify-admin>
```

**How to get the token:**
Shopify Admin → Apps → Develop apps → Create an app → Configure Storefront API → enable `unauthenticated_read_products`, `unauthenticated_write_checkouts`, `unauthenticated_read_checkouts` → Install app → copy Storefront API access token.

**Why `NEXT_PUBLIC_`:** The Storefront API token is intentionally designed to be public (it's scoped to read-only product data and create carts). The store domain is already public. Both are used in the Zustand store (client-side) for cart creation. Server components read them via `process.env.NEXT_PUBLIC_*`.

---

## Section 2: Shopify Admin Setup (before any code)

These must be done in Shopify admin before the integration works.

### 2a. Product Handles
Product handles in Shopify must match our existing slugs exactly:
| Shopify handle | Our slug |
|---|---|
| `body-wash` | `body-wash` |
| `body-lotion` | `body-lotion` |
| `sun-screen` | `sun-screen` |
| `adolescent-sun-block` | `adolescent-sun-block` |
| `kumkumadi-taila` | `kumkumadi-taila` |

Set handle: Shopify Admin → Products → [product] → scroll to SEO section → edit URL handle.

### 2b. Metafields
Shopify's default product schema lacks `subtitle`, `ingredients`, `badge`, and `categoryLabel`. Set these up as metafields:

| Metafield key | Type | Example value |
|---|---|---|
| `custom.subtitle` | Single line text | `Blue Lotus + Wild Himalayan Cherry` |
| `custom.ingredients` | List of single line text | `["Blue Lotus Extract", "Neem", ...]` |
| `custom.badge` | Single line text | `Bestseller` |
| `custom.category` | Single line text | `pre-sport` |
| `custom.category_label` | Single line text | `Pre-Sport` |

Shopify Admin → Settings → Custom data → Products → Add definition for each.
Then populate values per product.
Expose in Storefront API: each metafield definition → toggle "Storefront API access".

### 2c. Checkout Branding
Shopify Admin → Settings → Checkout → Branding:
- Upload Thavare logo
- Background colour: `#EAE4D3` (cream)
- Accent colour: `#008493` (teal)
- Button colour: `#1A2744` (navy)
- Font: choose a serif + sans pairing closest to Playfair/Nunito

### 2d. Razorpay Payment Gateway
Shopify Admin → Settings → Payments → Add payment method → search Razorpay → install Razorpay app → enter Razorpay Key ID and Key Secret.

### 2e. Post-purchase Redirect URL
Shopify Admin → Settings → Checkout → Order status page → Additional scripts:
Add redirect to `https://thavare.com/order-success` after purchase.
(Or configure via `lineItems[].customAttributes` in cart — covered in code section.)

---

## Section 3: Storefront API Client

### `lib/shopify.ts`
Single `shopifyFetch` function. All GraphQL queries go through this.

```ts
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token  = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const endpoint = `https://${domain}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error(`Shopify API error: ${res.status}`);
  const { data, errors } = await res.json();
  if (errors) throw new Error(errors[0].message);
  return data as T;
}
```

---

## Section 4: GraphQL Queries

### `lib/shopify-queries.ts`

**getProducts** — used by shop page
```graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        handle
        title
        description
        featuredImage { url altText }
        variants(first: 1) {
          edges {
            node {
              id
              price { amount }
              compareAtPrice { amount }
              availableForSale
            }
          }
        }
        metafield_subtitle:   metafield(namespace:"custom", key:"subtitle")   { value }
        metafield_badge:      metafield(namespace:"custom", key:"badge")      { value }
        metafield_category:   metafield(namespace:"custom", key:"category")   { value }
        metafield_cat_label:  metafield(namespace:"custom", key:"category_label") { value }
        metafield_ingredients: metafield(namespace:"custom", key:"ingredients") { value }
      }
    }
  }
}
```

**getProductByHandle** — used by product detail page
```graphql
query GetProduct($handle: String!) {
  productByHandle(handle: $handle) {
    id
    handle
    title
    description
    images(first: 4) { edges { node { url altText } } }
    variants(first: 1) {
      edges {
        node {
          id
          price { amount }
          compareAtPrice { amount }
          availableForSale
        }
      }
    }
    metafield_subtitle:    metafield(namespace:"custom", key:"subtitle")    { value }
    metafield_badge:       metafield(namespace:"custom", key:"badge")       { value }
    metafield_category:    metafield(namespace:"custom", key:"category")    { value }
    metafield_cat_label:   metafield(namespace:"custom", key:"category_label") { value }
    metafield_ingredients: metafield(namespace:"custom", key:"ingredients") { value }
  }
}
```

**cartCreate** — used when user clicks Checkout
```graphql
mutation CartCreate($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart {
      id
      checkoutUrl
    }
    userErrors { field message }
  }
}
```
Note: the post-purchase redirect to `thavare.com/order-success` is configured in Shopify admin (Section 2e), not in the cart mutation.

---

## Section 5: Product Type + Mapper

### Updated `lib/products.ts`

Add `variantId` to the `Product` type. Remove the hardcoded `PRODUCTS` array.

```ts
export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  size: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  images: { card: string; main: string };
  inStock: boolean;
  variantId: string;  // ← NEW: Shopify variant GID
};
```

### `lib/shopify-mapper.ts` — NEW

Maps raw Shopify GraphQL response to our `Product` type.

```ts
export function mapShopifyProduct(node: ShopifyProductNode): Product {
  const variant = node.variants.edges[0].node;
  return {
    id:            node.handle,
    slug:          node.handle,
    name:          node.title,
    subtitle:      node.metafield_subtitle?.value ?? '',
    category:      (node.metafield_category?.value ?? 'daily-essentials') as ProductCategory,
    categoryLabel: node.metafield_cat_label?.value ?? '',
    size:          '',
    price:         Math.round(parseFloat(variant.price.amount)),
    originalPrice: variant.compareAtPrice
                     ? Math.round(parseFloat(variant.compareAtPrice.amount))
                     : undefined,
    badge:         node.metafield_badge?.value ?? undefined,
    description:   node.description,
    longDescription: node.description,
    ingredients:   node.metafield_ingredients?.value
                     ? JSON.parse(node.metafield_ingredients.value)
                     : [],
    images: {
      card: node.featuredImage?.url ?? '/images/prod-bodywash-box.png',
      main: node.featuredImage?.url ?? '/images/prod-bodywash-box.png',
    },
    inStock:    variant.availableForSale,
    variantId:  variant.id,
  };
}
```

---

## Section 6: Shop Page Refactor

### `app/shop/page.tsx` — async server component
Fetches all products from Shopify, passes them to the client grid component.

```ts
export default async function ShopPage() {
  const products = await getProducts(); // calls shopifyFetch + mapShopifyProduct
  return <ShopGrid products={products} />;
}
```

`getProducts()` and `getProductByHandle(handle)` are exported helper functions defined in `lib/shopify.ts` that call `shopifyFetch` with the appropriate query and return mapped `Product[]` / `Product | null`.

### `app/shop/ShopGrid.tsx` — NEW client component
Extracted from the current shop page. Receives `products: Product[]` as a prop, owns the category filter state. No data fetching.

```ts
'use client';
export function ShopGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<ProductCategory | 'all'>('all');
  const filtered = active === 'all' ? products : products.filter(...);
  // renders existing product grid UI
}
```

---

## Section 7: Product Detail Page

`app/products/[slug]/page.tsx` — already async. Replace `getProductBySlug(slug)` with Shopify fetch:

```ts
export async function generateStaticParams() {
  const products = await getProducts(); // Shopify fetch
  return products.map(p => ({ slug: p.slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductByHandle(slug); // Shopify fetch
  if (!product) notFound();
  // rest of page unchanged
}
```

`generateMetadata` similarly fetches from Shopify.

The sitemap (`app/sitemap.ts`) also updated to fetch handles from Shopify instead of `PRODUCTS`.

---

## Section 8: Cart → Checkout

### Updated `lib/cart.ts`

Add `variantId` to `CartItem`. Add `shopifyCartId` and `createShopifyCheckout` to the store.

```ts
type CartStore = {
  items: CartItem[];           // CartItem now includes variantId
  shopifyCartId: string | null;
  // ... existing actions
  createShopifyCheckout: () => Promise<void>;
};
```

`createShopifyCheckout`:
1. Calls `cartCreate` mutation with `items.map(i => ({ merchandiseId: i.variantId, quantity: i.quantity }))`
2. Gets back `cart.checkoutUrl`
3. Stores `cart.id` in `shopifyCartId` (localStorage via Zustand persist)
4. Redirects: `window.location.href = checkoutUrl`
5. On error: throws so the cart page can show an error message

### Updated `app/cart/page.tsx`

Replace the existing "Checkout" button handler:

```tsx
const [loading, setLoading] = useState(false);
const [error, setError]     = useState('');

async function handleCheckout() {
  setLoading(true);
  try {
    await createShopifyCheckout();
  } catch {
    setError('Something went wrong. Please try again.');
    setLoading(false);
  }
}
```

Button UI:
```tsx
<Button onClick={handleCheckout} disabled={loading || items.length === 0}>
  {loading ? 'Redirecting...' : 'Proceed to Checkout'}
</Button>
{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
```

---

## Section 9: Removed Files

These are deleted entirely — Shopify's hosted checkout replaces them:

- `app/checkout/page.tsx`
- `app/checkout/layout.tsx`
- `components/checkout/CheckoutForm.tsx`
- `lib/checkout.ts`

---

## Section 10: Order Success Page

`app/order-success/page.tsx` — server component, no index.

```ts
export const metadata = {
  title: 'Order Confirmed — Thavare',
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <section className="min-h-screen bg-cream flex flex-col items-center justify-center px-4 text-center">
      <div className="text-[56px] mb-6">🌿</div>
      <h1 className="font-serif text-[36px] font-medium text-navy mb-4">
        Order Confirmed!
      </h1>
      <p className="text-[15px] text-text-2 max-w-[420px] mb-10">
        Thank you for your order. A confirmation has been sent to your email.
      </p>
      <Link href="/shop">
        <Button variant="primary">Continue Shopping</Button>
      </Link>
    </section>
  );
}
```

The cart is cleared on this page via a `useEffect` in a client wrapper that calls `clearCart()`.

---

## Section 11: `next.config.ts` Update

Add Shopify CDN to allowed image domains:

```ts
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.shopify.com',
    },
  ],
},
```

---

## Section 12: Out of Stock Handling

If `product.inStock === false`:
- Shop page: show "Out of Stock" badge, grey out card
- Product detail page: replace "Add to Bag" button with disabled "Out of Stock" button
- Cart: if a carted item goes out of stock, Shopify will reject it at checkout (Shopify handles this automatically)

---

## What Shopify Handles Automatically (zero code)

- Order confirmation email to customer
- Order management dashboard (Shopify admin)
- Inventory decrement on purchase
- Shipping notification emails (if configured)
- Razorpay payment processing
- Refunds (via Shopify admin)

---

## Implementation Order

1. Shopify admin setup (handles, metafields, branding, Razorpay, redirect URL)
2. `lib/shopify.ts` + `lib/shopify-queries.ts`
3. `lib/shopify-mapper.ts`
4. Update `lib/products.ts` (add variantId, remove PRODUCTS array)
5. `next.config.ts` image domains
6. `app/shop/page.tsx` + `app/shop/ShopGrid.tsx`
7. `app/products/[slug]/page.tsx` + `generateStaticParams` + `generateMetadata`
8. `app/sitemap.ts` (fetch handles from Shopify)
9. Update `lib/cart.ts` (variantId + shopifyCartId + createShopifyCheckout)
10. Update `app/cart/page.tsx` (Checkout button → Shopify redirect)
11. Delete checkout page + CheckoutForm + lib/checkout.ts
12. `app/order-success/page.tsx`
13. End-to-end test with Shopify test mode
