# Thavare — Shopify Headless Integration
## Technical Design Specification

| Field | Value |
|---|---|
| **Date** | 2026-04-13 |
| **Status** | Approved |
| **Version** | 1.0 |
| **Project** | Thavare E-Commerce Platform |
| **Scope** | Backend integration — Phase 3A |

---

## Table of Contents

1. [Overview](#1-overview)
2. [Architecture Decision](#2-architecture-decision)
3. [Scope](#3-scope)
4. [Prerequisites — Shopify Admin Configuration](#4-prerequisites--shopify-admin-configuration)
5. [Data Layer](#5-data-layer)
6. [API Client](#6-api-client)
7. [GraphQL Operations](#7-graphql-operations)
8. [Product Mapping](#8-product-mapping)
9. [Storefront Pages](#9-storefront-pages)
10. [Cart & Checkout Flow](#10-cart--checkout-flow)
11. [Order Success Page](#11-order-success-page)
12. [Infrastructure Changes](#12-infrastructure-changes)
13. [Deletions](#13-deletions)
14. [Out-of-Stock Handling](#14-out-of-stock-handling)
15. [Shopify-Managed Capabilities](#15-shopify-managed-capabilities)
16. [Implementation Order](#16-implementation-order)

---

## 1. Overview

Thavare's storefront is a fully custom Next.js 16.2.3 application with a complete design system, brand identity, and all commerce pages already built. This specification covers wiring that frontend to **Shopify as a headless backend** — replacing the static product data and non-functional checkout with live Shopify data and a real payment flow.

**The end state mirrors the Forest Essentials checkout experience:**

- Customers browse and manage their cart entirely within the Thavare-branded frontend
- At checkout, they are redirected to Shopify's hosted checkout page, which processes payment via Razorpay
- After payment, Shopify redirects back to `thavare.com/order-success`
- All order management, inventory, and customer emails are handled by Shopify automatically

**No visual changes are made to the frontend.** This integration is backend-only.

---

## 2. Architecture Decision

### Decision: Headless Shopify with Storefront API

**Rationale:** Shopify was selected as the commerce backend because it provides a complete operational stack (payments, inventory, order management, logistics, customer emails) without requiring a custom backend to be built or maintained. The Storefront API provides a public GraphQL interface suitable for server-side and client-side consumption from a Next.js App Router application.

**Key trade-offs considered:**

| Approach | Pros | Cons | Decision |
|---|---|---|---|
| Shopify hosted theme | Simplest; everything built-in | Loses custom Thavare frontend | Rejected |
| Custom backend (Razorpay + DB) | Full control | Months of backend work | Rejected |
| Headless Shopify + hosted checkout | Custom frontend + Shopify reliability | Checkout briefly leaves Thavare site | **Selected** |
| Headless Shopify + custom checkout | Full brand control end-to-end | Significant custom payment code | Rejected |

### Decision: Shopify Storefront API (GraphQL, version 2024-01)

The `2024-01` API version is stable and supports all required operations: product queries with metafields, cart creation, and checkout URL generation.

### Decision: `NEXT_PUBLIC_` Environment Variables

The Storefront API access token is a **public-scoped credential** — Shopify intentionally designs it to be safe for browser exposure. It is scoped exclusively to read product data and create carts; it cannot access orders, customer PII, or administrative functions. Using `NEXT_PUBLIC_` allows both server components (product fetching) and client components (cart creation via Zustand) to access the same configuration.

---

## 3. Scope

### In Scope
- Shopify Storefront API client and GraphQL operations
- Product data sourced from Shopify (replaces `lib/products.ts` hardcoded data)
- Shopify cart creation and redirect to hosted checkout
- Order success page
- Shopify admin configuration guide (handles, metafields, branding, payment gateway)
- Out-of-stock display states

### Out of Scope
- Custom order management / admin panel (handled by Shopify dashboard)
- Email notifications (handled by Shopify automatically)
- Shiprocket logistics integration (Phase 3B)
- WhatsApp notifications (Phase 3B)
- Deployment / hosting (Phase 3C)
- User accounts / authentication
- Wishlist / saved items

### File Impact Summary

| File | Status | Description |
|---|---|---|
| `lib/shopify.ts` | **CREATE** | Storefront API GraphQL client + helper functions |
| `lib/shopify-queries.ts` | **CREATE** | GraphQL query and mutation strings |
| `lib/shopify-mapper.ts` | **CREATE** | Maps Shopify response nodes to `Product` type |
| `lib/products.ts` | **MODIFY** | Remove `PRODUCTS` array; add `variantId` to `Product` type |
| `lib/cart.ts` | **MODIFY** | Add `variantId` to `CartItem`; add checkout action |
| `app/shop/page.tsx` | **MODIFY** | Convert to async server component |
| `app/shop/ShopGrid.tsx` | **CREATE** | Extract client-side filter/grid from shop page |
| `app/products/[slug]/page.tsx` | **MODIFY** | Fetch product by handle from Shopify |
| `app/sitemap.ts` | **MODIFY** | Fetch product handles from Shopify |
| `app/order-success/page.tsx` | **CREATE** | Post-checkout confirmation screen |
| `app/cart/page.tsx` | **MODIFY** | Wire checkout button to Shopify redirect |
| `next.config.ts` | **MODIFY** | Allow `cdn.shopify.com` image domain |
| `.env.local` | **MODIFY** | Add Shopify credentials |
| `app/checkout/page.tsx` | **DELETE** | Replaced by Shopify hosted checkout |
| `app/checkout/layout.tsx` | **DELETE** | No longer needed |
| `components/checkout/CheckoutForm.tsx` | **DELETE** | Replaced by Shopify hosted checkout |
| `lib/checkout.ts` | **DELETE** | Replaced by Shopify hosted checkout |

---

## 4. Prerequisites — Shopify Admin Configuration

> **These steps must be completed before any code is written.** The integration will not function without them.

### 4.1 Product Handles

Shopify product URL handles must match the existing frontend slugs exactly. A mismatch will cause product detail pages to return 404.

**Path:** Shopify Admin → Products → [product] → SEO section → URL handle

| Product | Required Handle |
|---|---|
| Body Wash | `body-wash` |
| Body Lotion | `body-lotion` |
| Sun Screen SPF 30 | `sun-screen` |
| Adolescent Sun Block | `adolescent-sun-block` |
| Kumkumadi Taila | `kumkumadi-taila` |

### 4.2 Product Metafields

Shopify's default product schema does not include `subtitle`, `ingredients`, `badge`, or `categoryLabel`. These must be defined as custom metafields and populated per product.

**Path:** Shopify Admin → Settings → Custom data → Products → Add definition

| Namespace & Key | Type | Purpose | Example |
|---|---|---|---|
| `custom.subtitle` | Single line text | Ingredient tagline shown under product name | `Blue Lotus + Wild Himalayan Cherry` |
| `custom.ingredients` | JSON (list) | Ingredient list for product detail page | `["Blue Lotus Extract", "Neem Leaf", ...]` |
| `custom.badge` | Single line text | Product card badge (`Bestseller`, `New`, `Signature`) | `Bestseller` |
| `custom.category` | Single line text | Internal category key for filtering | `pre-sport` |
| `custom.category_label` | Single line text | Display label for category filter UI | `Pre-Sport` |

After creating each definition, enable **Storefront API access** via the toggle on each metafield definition page. Without this, metafields will not be returned by GraphQL queries.

### 4.3 Checkout Branding

Apply Thavare brand identity to Shopify's hosted checkout page.

**Path:** Shopify Admin → Settings → Checkout → Branding

| Setting | Value |
|---|---|
| Logo | Upload Thavare logo |
| Background colour | `#EAE4D3` (cream) |
| Accent / link colour | `#008493` (teal) |
| Button background | `#1A2744` (navy) |
| Button text | `#EAE4D3` (cream) |
| Heading font | Closest available serif (Playfair Display equivalent) |
| Body font | Closest available sans-serif (Nunito Sans equivalent) |

### 4.4 Payment Gateway — Razorpay

**Path:** Shopify Admin → Settings → Payments → Add payment method → search "Razorpay" → Install

Enter the Razorpay **Key ID** and **Key Secret** from the Razorpay dashboard. Enable test mode during development; switch to live credentials before launch.

### 4.5 Post-Purchase Redirect

After a successful payment, Shopify must redirect customers back to the Thavare order success page.

**Path:** Shopify Admin → Settings → Checkout → Order status page → Additional scripts

```html
<script>
  if (Shopify.Checkout.step === 'thank_you') {
    window.location.href = 'https://thavare.com/order-success';
  }
</script>
```

---

## 5. Data Layer

### 5.1 Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=thavare.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=<storefront-api-token>
```

**Obtaining the token:**
Shopify Admin → Apps → Develop apps → Create app → API credentials → Configure Storefront API scopes:
- `unauthenticated_read_product_listings`
- `unauthenticated_read_product_inventory`
- `unauthenticated_write_checkouts`
- `unauthenticated_read_checkouts`

Install the app and copy the Storefront API access token.

### 5.2 Updated `Product` Type (`lib/products.ts`)

The `PRODUCTS` array is removed. The `Product` type gains one new field: `variantId`, which stores the Shopify variant GID required for cart line creation.

```typescript
export type ProductCategory =
  | 'pre-sport'
  | 'recovery'
  | 'daily-essentials'
  | 'sun-care'
  | 'teal-ayurveda';

export type Product = {
  id:            string;
  slug:          string;
  name:          string;
  subtitle:      string;
  category:      ProductCategory;
  categoryLabel: string;
  size:          string;
  price:         number;
  originalPrice?: number;
  badge?:        string;
  description:   string;
  longDescription: string;
  ingredients:   string[];
  images:        { card: string; main: string };
  inStock:       boolean;
  variantId:     string;   // Shopify variant GID — required for cartCreate
};
```

Helper functions `getProductBySlug` and `getProductsByCategory` are removed (data no longer lives in memory). `generateProductParams` is replaced by a Shopify fetch in `generateStaticParams`.

---

## 6. API Client

### `lib/shopify.ts`

A single typed fetch wrapper and two exported helper functions used by pages.

```typescript
const DOMAIN   = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN    = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const ENDPOINT = `https://${DOMAIN}/api/2024-01/graphql.json`;

/**
 * Base GraphQL fetch. Throws on HTTP error or GraphQL errors.
 * Uses Next.js ISR: revalidates every 3600 seconds.
 */
export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  cache: RequestCache | { next: { revalidate: number } } = { next: { revalidate: 3600 } }
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    ...(typeof cache === 'string' ? { cache } : cache),
  });

  if (!res.ok) throw new Error(`Shopify API ${res.status}: ${res.statusText}`);

  const { data, errors } = await res.json();
  if (errors?.length) throw new Error(errors[0].message);

  return data as T;
}

/** Fetch all products. Used by shop page and generateStaticParams. */
export async function getProducts(): Promise<Product[]>;

/** Fetch a single product by its URL handle. Returns null if not found. */
export async function getProductByHandle(handle: string): Promise<Product | null>;
```

Implementations of `getProducts` and `getProductByHandle` call `shopifyFetch` with the appropriate query from `lib/shopify-queries.ts` and pass the result through `mapShopifyProduct` from `lib/shopify-mapper.ts`.

---

## 7. GraphQL Operations

### `lib/shopify-queries.ts`

#### `GET_PRODUCTS` — Shop page and static params generation

```graphql
query GetProducts($first: Int!) {
  products(first: $first) {
    edges {
      node {
        id
        handle
        title
        description
        featuredImage {
          url
          altText
        }
        variants(first: 1) {
          edges {
            node {
              id
              price          { amount currencyCode }
              compareAtPrice { amount currencyCode }
              availableForSale
            }
          }
        }
        subtitle:      metafield(namespace: "custom", key: "subtitle")       { value }
        badge:         metafield(namespace: "custom", key: "badge")          { value }
        category:      metafield(namespace: "custom", key: "category")       { value }
        categoryLabel: metafield(namespace: "custom", key: "category_label") { value }
        ingredients:   metafield(namespace: "custom", key: "ingredients")    { value }
      }
    }
  }
}
```

#### `GET_PRODUCT_BY_HANDLE` — Product detail page

```graphql
query GetProductByHandle($handle: String!) {
  productByHandle(handle: $handle) {
    id
    handle
    title
    description
    images(first: 4) {
      edges {
        node { url altText }
      }
    }
    variants(first: 1) {
      edges {
        node {
          id
          price          { amount currencyCode }
          compareAtPrice { amount currencyCode }
          availableForSale
        }
      }
    }
    subtitle:      metafield(namespace: "custom", key: "subtitle")       { value }
    badge:         metafield(namespace: "custom", key: "badge")          { value }
    category:      metafield(namespace: "custom", key: "category")       { value }
    categoryLabel: metafield(namespace: "custom", key: "category_label") { value }
    ingredients:   metafield(namespace: "custom", key: "ingredients")    { value }
  }
}
```

#### `CART_CREATE` — Triggered on checkout button click

```graphql
mutation CartCreate($lines: [CartLineInput!]!) {
  cartCreate(input: { lines: $lines }) {
    cart {
      id
      checkoutUrl
    }
    userErrors {
      field
      message
    }
  }
}
```

> **Note:** The post-purchase redirect to `thavare.com/order-success` is configured via Shopify Admin (Section 4.5), not through the cart mutation.

---

## 8. Product Mapping

### `lib/shopify-mapper.ts`

Translates a raw Shopify GraphQL product node into the application's `Product` type. This keeps all Shopify-specific data structures isolated from the rest of the codebase.

```typescript
import type { Product, ProductCategory } from './products';

export type ShopifyMetafield = { value: string } | null;

export type ShopifyVariantNode = {
  id:              string;
  price:           { amount: string; currencyCode: string };
  compareAtPrice?: { amount: string; currencyCode: string } | null;
  availableForSale: boolean;
};

export type ShopifyProductNode = {
  id:           string;
  handle:       string;
  title:        string;
  description:  string;
  featuredImage?: { url: string; altText?: string } | null;
  variants:     { edges: Array<{ node: ShopifyVariantNode }> };
  subtitle:      ShopifyMetafield;
  badge:         ShopifyMetafield;
  category:      ShopifyMetafield;
  categoryLabel: ShopifyMetafield;
  ingredients:   ShopifyMetafield;
};

export function mapShopifyProduct(node: ShopifyProductNode): Product {
  const variant = node.variants.edges[0].node;

  return {
    id:            node.handle,
    slug:          node.handle,
    name:          node.title,
    subtitle:      node.subtitle?.value ?? '',
    category:      (node.category?.value ?? 'daily-essentials') as ProductCategory,
    categoryLabel: node.categoryLabel?.value ?? '',
    size:          '',
    price:         Math.round(parseFloat(variant.price.amount)),
    originalPrice: variant.compareAtPrice
                     ? Math.round(parseFloat(variant.compareAtPrice.amount))
                     : undefined,
    badge:         node.badge?.value ?? undefined,
    description:   node.description,
    longDescription: node.description,
    ingredients:   node.ingredients?.value
                     ? (JSON.parse(node.ingredients.value) as string[])
                     : [],
    images: {
      card: node.featuredImage?.url ?? '/images/prod-bodywash-box.png',
      main: node.featuredImage?.url ?? '/images/prod-bodywash-box.png',
    },
    inStock:   variant.availableForSale,
    variantId: variant.id,
  };
}
```

---

## 9. Storefront Pages

### 9.1 Shop Page — `app/shop/page.tsx`

Converted from a `'use client'` component to an **async server component**. Product data is fetched at request time (ISR, 1-hour revalidation) and passed to a new client component that owns filter state.

```typescript
// app/shop/page.tsx — server component
import { getProducts } from '@/lib/shopify';
import { ShopGrid } from './ShopGrid';

export default async function ShopPage() {
  const products = await getProducts();
  return <ShopGrid products={products} />;
}
```

```typescript
// app/shop/ShopGrid.tsx — client component (extracted from current shop page)
'use client';

import { useState } from 'react';
import type { Product, ProductCategory } from '@/lib/products';

export function ShopGrid({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState<ProductCategory | 'all'>('all');

  const filtered = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory);

  // Renders existing category filter bar and product grid UI — no changes to markup.
}
```

### 9.2 Product Detail Page — `app/products/[slug]/page.tsx`

Replace the local `getProductBySlug` call with `getProductByHandle`. Static generation now fetches handles from Shopify at build time.

```typescript
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product  = await getProductByHandle(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: `${product.name} — Thavare`,
      description: product.description,
      images: [{ url: product.images.main }],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product  = await getProductByHandle(slug);
  if (!product) notFound();
  // Remainder of page JSX is unchanged.
}
```

### 9.3 Sitemap — `app/sitemap.ts`

Replace `PRODUCTS.map(...)` with a Shopify fetch:

```typescript
const products = await getProducts();
const productRoutes = products.map(p => ({
  url:             `${base}/products/${p.slug}`,
  priority:        0.8,
  changeFrequency: 'weekly' as const,
  lastModified:    new Date(),
}));
```

---

## 10. Cart & Checkout Flow

### 10.1 Updated Cart Store — `lib/cart.ts`

**`CartItem` gains `variantId`:**

```typescript
export type CartItem = {
  product:   Product;
  quantity:  number;
  variantId: string;   // Shopify variant GID — passed to cartCreate
};
```

**New store fields and action:**

```typescript
type CartStore = {
  items:           CartItem[];
  shopifyCartId:   string | null;   // persisted to localStorage
  addItem:         (product: Product) => void;
  removeItem:      (productId: string) => void;
  updateQuantity:  (productId: string, quantity: number) => void;
  clearCart:       () => void;
  totalItems:      () => number;
  totalPrice:      () => number;
  createShopifyCheckout: () => Promise<void>;
};
```

**`createShopifyCheckout` implementation:**

1. Constructs `lines` array: `items.map(i => ({ merchandiseId: i.variantId, quantity: i.quantity }))`
2. Calls `shopifyFetch` with `CART_CREATE` mutation
3. Checks `userErrors` — throws if non-empty
4. Persists `cart.id` to `shopifyCartId` in Zustand state (written to localStorage)
5. Redirects: `window.location.href = cart.checkoutUrl`

### 10.2 Updated Cart Page — `app/cart/page.tsx`

Replace the existing link to `/checkout` with an async checkout handler:

```typescript
const [loading, setLoading] = useState(false);
const [error,   setError]   = useState<string | null>(null);
const createShopifyCheckout = useCart(s => s.createShopifyCheckout);

async function handleCheckout() {
  setError(null);
  setLoading(true);
  try {
    await createShopifyCheckout();
    // On success, browser navigates away — no further state update needed
  } catch (err) {
    setError('Unable to reach checkout. Please try again.');
    setLoading(false);
  }
}
```

**Checkout button:**

```tsx
<Button
  onClick={handleCheckout}
  disabled={loading || items.length === 0}
  className="w-full justify-center"
>
  {loading ? 'Redirecting to checkout…' : 'Proceed to Checkout'}
</Button>

{error && (
  <p className="text-[12px] text-red-500 mt-2 text-center">{error}</p>
)}
```

### 10.3 End-to-End Checkout Flow

```
Customer on thavare.com/cart
         │
         │  clicks [Proceed to Checkout]
         ▼
cartCreate mutation → Shopify Storefront API
         │
         │  returns checkoutUrl
         ▼
window.location.href = checkoutUrl
         │
         ▼
Shopify hosted checkout
  (Thavare-branded via Section 4.3)
  Payment via Razorpay / UPI / cards
         │
         │  payment successful
         ▼
Shopify sends order confirmation email → customer
         │
         ▼
Redirect → thavare.com/order-success
         │
         ▼
Cart cleared. Order confirmed screen displayed.
```

---

## 11. Order Success Page

### `app/order-success/page.tsx`

A static server component. Cart is cleared via a lightweight client wrapper using `useEffect`.

```typescript
// Metadata — excluded from search indexing
export const metadata: Metadata = {
  title: 'Order Confirmed — Thavare',
  robots: { index: false, follow: false },
};
```

**UI structure:**

```
┌─────────────────────────────────────────────┐
│                                             │
│                    🌿                       │
│                                             │
│            Order Confirmed!                 │
│                                             │
│   Thank you for your order. A confirmation  │
│   has been sent to your email address.      │
│                                             │
│           [Continue Shopping]               │
│                                             │
└─────────────────────────────────────────────┘
```

Styling follows existing page conventions: `bg-cream`, `font-serif` heading in `text-navy`, body in `text-text-2`, Button `variant="primary"` linking to `/shop`.

---

## 12. Infrastructure Changes

### 12.1 `next.config.ts` — Remote Image Domains

Product images are served from Shopify's CDN. Add the following to `images.remotePatterns`:

```typescript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cdn.shopify.com',
      pathname: '/s/files/**',
    },
  ],
},
```

---

## 13. Deletions

The following files are removed entirely. Shopify's hosted checkout replaces all functionality they provided.

| File | Reason |
|---|---|
| `app/checkout/page.tsx` | Replaced by Shopify hosted checkout |
| `app/checkout/layout.tsx` | No longer required |
| `components/checkout/CheckoutForm.tsx` | Replaced by Shopify hosted checkout |
| `lib/checkout.ts` | Validation logic no longer needed |

---

## 14. Out-of-Stock Handling

Availability is derived from `variant.availableForSale` returned by the Storefront API and mapped to `product.inStock`.

| Location | Behaviour |
|---|---|
| Shop page product card | Display "Out of Stock" overlay badge; disable "Add to Bag" button |
| Product detail page | Replace "Add to Bag" with a disabled "Out of Stock" button in the same position |
| Cart page | No change — Shopify will surface an availability error at checkout automatically |

---

## 15. Shopify-Managed Capabilities

The following require **zero custom code** — Shopify handles them through its admin and built-in automations:

- Order confirmation emails to customers
- Order management and fulfilment dashboard
- Inventory decrement on successful purchase
- Shipping and fulfilment notification emails
- Razorpay payment processing and reconciliation
- Refunds and cancellations (via Shopify admin)
- Tax calculation

---

## 16. Implementation Order

Steps must be followed in this sequence. Steps 1–5 are non-code prerequisites; steps 6–18 are code changes.

| # | Task | Notes |
|---|---|---|
| 1 | Set product handles in Shopify admin | Must match slugs in Section 4.1 exactly |
| 2 | Create and populate metafield definitions | Enable Storefront API access on each |
| 3 | Configure checkout branding | Apply Thavare colours and logo |
| 4 | Install Razorpay payment gateway | Use test credentials initially |
| 5 | Configure post-purchase redirect script | Points to `thavare.com/order-success` |
| 6 | Add credentials to `.env.local` | `NEXT_PUBLIC_SHOPIFY_*` variables |
| 7 | Create `lib/shopify.ts` | API client + `getProducts` + `getProductByHandle` |
| 8 | Create `lib/shopify-queries.ts` | Three GraphQL operations |
| 9 | Create `lib/shopify-mapper.ts` | `mapShopifyProduct` with full TypeScript types |
| 10 | Update `lib/products.ts` | Add `variantId`; remove `PRODUCTS` array |
| 11 | Update `next.config.ts` | Add `cdn.shopify.com` remote pattern |
| 12 | Refactor `app/shop/page.tsx` | Async server component |
| 13 | Create `app/shop/ShopGrid.tsx` | Extract client filter component |
| 14 | Update `app/products/[slug]/page.tsx` | Shopify fetch + `generateStaticParams` + `generateMetadata` |
| 15 | Update `app/sitemap.ts` | Fetch handles from Shopify |
| 16 | Update `lib/cart.ts` | `variantId` on `CartItem`; `createShopifyCheckout` action |
| 17 | Update `app/cart/page.tsx` | Checkout handler + loading/error states |
| 18 | Delete checkout files | `app/checkout/`, `components/checkout/`, `lib/checkout.ts` |
| 19 | Create `app/order-success/page.tsx` | Confirmation screen with cart clear |
| 20 | End-to-end test | Shopify test mode — full add-to-cart → payment → success flow |
