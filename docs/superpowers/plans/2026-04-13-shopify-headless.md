# Shopify Headless Integration - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Wire the existing Thavare Next.js frontend to Shopify as a headless backend - replacing static `PRODUCTS` data with live Shopify Storefront API data and replacing the non-functional checkout with Shopify hosted checkout + Razorpay.

**Architecture:** Shopify Storefront GraphQL API (2024-01) serves products. The cart is managed client-side in Zustand. At checkout, `cartCreate` mutation generates a Shopify `checkoutUrl`; the user is redirected there. After payment, Shopify redirects back to `/order-success`.

**Tech Stack:** Next.js 16.2.3, TypeScript, Zustand 5, Shopify Storefront API 2024-01, GraphQL, Vitest, Tailwind CSS v4

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `next.config.ts` | Add `cdn.shopify.com` remotePatterns |
| Create | `.env.local` | Shopify env vars |
| Create | `lib/shopify-queries.ts` | Raw GraphQL query strings |
| Create | `lib/shopify-mapper.ts` | ShopifyProductNode to Product mapper |
| Create | `lib/shopify.ts` | shopifyFetch, getProducts, getProductByHandle |
| Create | `lib/__tests__/shopify-mapper.test.ts` | Unit tests for mapper (11 tests) |
| Modify | `lib/products.ts` | Add variantId to Product type, remove PRODUCTS array |
| Delete | `lib/__tests__/products.test.ts` | No longer needed |
| Delete | `lib/__tests__/checkout.test.ts` | Checkout deleted |
| Modify | `components/home/Bestsellers.tsx` | Accept products prop |
| Modify | `components/home/NewArrivals.tsx` | Accept products prop |
| Modify | `app/page.tsx` | Async server component, call getProducts() |
| Create | `app/shop/ShopGrid.tsx` | Client component with filter state |
| Modify | `app/shop/page.tsx` | Async server component |
| Modify | `app/products/[slug]/page.tsx` | Use getProductByHandle + getProducts |
| Modify | `app/sitemap.ts` | Async, call getProducts() |
| Modify | `lib/cart.ts` | Add variantId to CartItem, shopifyCartId, createShopifyCheckout |
| Modify | `lib/__tests__/cart.test.ts` | Mock shopify, checkout action tests |
| Modify | `app/cart/page.tsx` | Replace Link /checkout with checkout button |
| Delete | `app/checkout/page.tsx` | Replaced by Shopify hosted checkout |
| Delete | `app/checkout/layout.tsx` | Replaced by Shopify hosted checkout |
| Delete | `components/checkout/CheckoutForm.tsx` | Replaced by Shopify hosted checkout |
| Delete | `lib/checkout.ts` | Replaced by Shopify hosted checkout |
| Create | `app/order-success/OrderSuccessClearer.tsx` | Client component, clears cart on mount |
| Create | `app/order-success/page.tsx` | Order success landing page |

---
## Task 1: Foundation

**Files:**
- Modify: `next.config.ts`
- Create: `.env.local`

- [ ] **Step 1: Update next.config.ts**

Replace `images: { unoptimized: true }` with remotePatterns for Shopify CDN:

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Create .env.local**

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token
```

> Fill in real values from: Shopify Admin -> Apps -> Develop apps -> Create app -> Configure Storefront API scopes (read_products, unauthenticated_read_product_listings, unauthenticated_write_checkouts) -> Install -> copy token. The `NEXT_PUBLIC_` prefix is required because `createShopifyCheckout` runs client-side.

- [ ] **Step 3: Verify build**

```bash
cd D:/Projects/thavare && npm run build
```

Expected: Build passes.

- [ ] **Step 4: Commit**

```bash
git add next.config.ts .env.local
git commit -m "feat: configure Shopify CDN image domain and env vars"
```

---
## Task 2: Shopify Data Layer

**Files:**
- Create: `lib/shopify-queries.ts`
- Create: `lib/shopify-mapper.ts`
- Create: `lib/shopify.ts`
- Create: `lib/__tests__/shopify-mapper.test.ts`

- [ ] **Step 1: Write the failing mapper test**

Create `lib/__tests__/shopify-mapper.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { mapShopifyProduct } from '../shopify-mapper';
import type { ShopifyProductNode } from '../shopify-mapper';

function makeNode(overrides: Partial<ShopifyProductNode> = {}): ShopifyProductNode {
  return {
    id: 'gid://shopify/Product/1',
    handle: 'body-wash',
    title: 'Body Wash',
    descriptionHtml: '<p>A great body wash</p>',
    description: 'A great body wash',
    subtitle: { value: 'Daily cleanse' },
    badge: { value: 'Best Seller' },
    category: { value: 'sport' },
    category_label: { value: 'Sport' },
    ingredients: { value: 'Neem, Tulsi' },
    images: {
      edges: [
        { node: { url: 'https://cdn.shopify.com/s/files/main.jpg', altText: 'Body Wash' } },
        { node: { url: 'https://cdn.shopify.com/s/files/card.jpg', altText: null } },
      ],
    },
    variants: {
      edges: [{
        node: {
          id: 'gid://shopify/ProductVariant/1',
          price: { amount: '599.00', currencyCode: 'INR' },
          availableForSale: true,
        },
      }],
    },
    ...overrides,
  };
}

describe('mapShopifyProduct', () => {
  it('maps handle to slug and id', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.slug).toBe('body-wash');
    expect(p.id).toBe('body-wash');
  });

  it('maps title to name', () => {
    const p = mapShopifyProduct(makeNode({ title: 'Sun Screen SPF 50' }));
    expect(p.name).toBe('Sun Screen SPF 50');
  });

  it('maps price as integer rounded from string', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.price).toBe(599);
  });

  it('maps variantId from first variant', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.variantId).toBe('gid://shopify/ProductVariant/1');
  });

  it('maps inStock true from availableForSale true', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.inStock).toBe(true);
  });

  it('maps inStock false from availableForSale false', () => {
    const p = mapShopifyProduct(makeNode({
      variants: {
        edges: [{ node: { id: 'gid://shopify/ProductVariant/1', price: { amount: '599.00', currencyCode: 'INR' }, availableForSale: false } }],
      },
    }));
    expect(p.inStock).toBe(false);
  });

  it('maps first image to images.main', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.images.main).toBe('https://cdn.shopify.com/s/files/main.jpg');
  });

  it('maps second image to images.card', () => {
    const p = mapShopifyProduct(makeNode());
    expect(p.images.card).toBe('https://cdn.shopify.com/s/files/card.jpg');
  });

  it('falls back images.card to images.main when only one image', () => {
    const node = makeNode();
    node.images.edges = [{ node: { url: 'https://cdn.shopify.com/s/files/main.jpg', altText: null } }];
    const p = mapShopifyProduct(node);
    expect(p.images.card).toBe('https://cdn.shopify.com/s/files/main.jpg');
  });

  it('falls back subtitle to empty string when metafield absent', () => {
    const p = mapShopifyProduct(makeNode({ subtitle: null }));
    expect(p.subtitle).toBe('');
  });

  it('defaults category to daily-essentials when metafield absent', () => {
    const p = mapShopifyProduct(makeNode({ category: null }));
    expect(p.category).toBe('daily-essentials');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run lib/__tests__/shopify-mapper.test.ts
```

Expected: FAIL - `Cannot find module '../shopify-mapper'`

- [ ] **Step 3: Create lib/shopify-queries.ts**

```typescript
// lib/shopify-queries.ts

export const GET_PRODUCTS = `
  query GetProducts($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          handle
          title
          description
          descriptionHtml
          subtitle: metafield(namespace: "custom", key: "subtitle") { value }
          badge: metafield(namespace: "custom", key: "badge") { value }
          category: metafield(namespace: "custom", key: "category") { value }
          category_label: metafield(namespace: "custom", key: "category_label") { value }
          ingredients: metafield(namespace: "custom", key: "ingredients") { value }
          images(first: 2) { edges { node { url altText } } }
          variants(first: 1) {
            edges { node { id price { amount currencyCode } availableForSale } }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_HANDLE = `
  query GetProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      handle
      title
      description
      descriptionHtml
      subtitle: metafield(namespace: "custom", key: "subtitle") { value }
      badge: metafield(namespace: "custom", key: "badge") { value }
      category: metafield(namespace: "custom", key: "category") { value }
      category_label: metafield(namespace: "custom", key: "category_label") { value }
      ingredients: metafield(namespace: "custom", key: "ingredients") { value }
      images(first: 2) { edges { node { url altText } } }
      variants(first: 1) {
        edges { node { id price { amount currencyCode } availableForSale } }
      }
    }
  }
`;

export const CART_CREATE = `
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { id checkoutUrl }
      userErrors { field message }
    }
  }
`;
```

- [ ] **Step 4: Create lib/shopify-mapper.ts**

```typescript
// lib/shopify-mapper.ts
import type { Product, ProductCategory } from './products';

export type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  subtitle: { value: string } | null;
  badge: { value: string } | null;
  category: { value: string } | null;
  category_label: { value: string } | null;
  ingredients: { value: string } | null;
  images: {
    edges: Array<{ node: { url: string; altText: string | null } }>;
  };
  variants: {
    edges: Array<{
      node: {
        id: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
      };
    }>;
  };
};

export function mapShopifyProduct(node: ShopifyProductNode): Product {
  const variant = node.variants.edges[0].node;
  const mainImage = node.images.edges[0]?.node.url ?? '';
  const cardImage = node.images.edges[1]?.node.url ?? mainImage;

  return {
    id: node.handle,
    slug: node.handle,
    name: node.title,
    subtitle: node.subtitle?.value ?? '',
    badge: node.badge?.value ?? '',
    description: node.description,
    longDescription: node.descriptionHtml,
    category: (node.category?.value ?? 'daily-essentials') as ProductCategory,
    categoryLabel: node.category_label?.value ?? '',
    price: Math.round(parseFloat(variant.price.amount)),
    variantId: variant.id,
    inStock: variant.availableForSale,
    ingredients: node.ingredients?.value ?? '',
    images: { main: mainImage, card: cardImage },
  };
}
```

- [ ] **Step 5: Create lib/shopify.ts**

```typescript
// lib/shopify.ts
import type { Product } from './products';
import { mapShopifyProduct, type ShopifyProductNode } from './shopify-mapper';
import { GET_PRODUCTS, GET_PRODUCT_BY_HANDLE } from './shopify-queries';

const DOMAIN   = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const TOKEN    = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const ENDPOINT = `https://${DOMAIN}/api/2024-01/graphql.json`;

export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  cache: RequestCache | { next: { revalidate: number } } = { next: { revalidate: 3600 } },
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
  if (!res.ok) throw new Error(`Shopify API error: ${res.status} ${res.statusText}`);
  const json = await res.json() as { data: T; errors?: Array<{ message: string }> };
  if (json.errors?.length) throw new Error(json.errors[0].message);
  return json.data;
}

export async function getProducts(): Promise<Product[]> {
  const data = await shopifyFetch<{
    products: { edges: Array<{ node: ShopifyProductNode }> };
  }>(GET_PRODUCTS, { first: 50 });
  return data.products.edges.map(({ node }) => mapShopifyProduct(node));
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const data = await shopifyFetch<{
    productByHandle: ShopifyProductNode | null;
  }>(GET_PRODUCT_BY_HANDLE, { handle });
  if (!data.productByHandle) return null;
  return mapShopifyProduct(data.productByHandle);
}
```

- [ ] **Step 6: Run mapper tests**

```bash
npx vitest run lib/__tests__/shopify-mapper.test.ts
```

Expected: 11 tests PASS

- [ ] **Step 7: Commit**

```bash
git add lib/shopify-queries.ts lib/shopify-mapper.ts lib/shopify.ts lib/__tests__/shopify-mapper.test.ts
git commit -m "feat: add Shopify data layer - queries, mapper, API client"
```

---
## Task 3: Product Type + Home Components

**Files:**
- Modify: `lib/products.ts`
- Delete: `lib/__tests__/products.test.ts`
- Delete: `lib/__tests__/checkout.test.ts`
- Modify: `components/home/Bestsellers.tsx`
- Modify: `components/home/NewArrivals.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace lib/products.ts**

Read the current file first. Replace the entire file with:

```typescript
// lib/products.ts

export type ProductCategory =
  | 'sport'
  | 'daily-essentials'
  | 'recovery'
  | 'sun-protection';

export type Product = {
  id:            string;
  slug:          string;
  name:          string;
  subtitle:      string;
  badge?:        string;
  description:   string;
  longDescription?: string;
  category:      ProductCategory;
  categoryLabel: string;
  price:         number;
  variantId:     string;   // Shopify variant GID - required for checkout
  inStock:       boolean;
  ingredients:   string;
  images: {
    main: string;
    card: string;
  };
};

// Handles of featured products shown in Bestsellers section.
// Must match Shopify product handles exactly.
export const FEATURED_IDS = [
  'body-wash',
  'body-lotion',
  'sun-screen',
  'adolescent-sun-block',
];
```

- [ ] **Step 2: Delete old test files**

```bash
rm D:/Projects/thavare/lib/__tests__/products.test.ts
rm D:/Projects/thavare/lib/__tests__/checkout.test.ts
```

- [ ] **Step 3: Update Bestsellers.tsx**

Read `components/home/Bestsellers.tsx`. Keep all existing JSX, className, and animations. Only change:
- Remove `import { PRODUCTS } from '@/lib/products'`
- Add `import type { Product } from '@/lib/products'`
- Change `export function Bestsellers()` to `export function Bestsellers({ products }: { products: Product[] })`
- Replace the `PRODUCTS` reference in the map with `products`

- [ ] **Step 4: Update NewArrivals.tsx**

Read `components/home/NewArrivals.tsx`. Apply the same prop change as Step 3.

- [ ] **Step 5: Update app/page.tsx**

```typescript
// app/page.tsx
import type { Metadata } from 'next';
import { Hero }            from '@/components/home/Hero';
import { MarqueeStrip }    from '@/components/ui/MarqueeStrip';
import { CategoryGrid }    from '@/components/home/CategoryGrid';
import { Bestsellers }     from '@/components/home/Bestsellers';
import { ValuesSection }   from '@/components/home/ValuesSection';
import { IngredientStrip } from '@/components/home/IngredientStrip';
import { FounderSection }  from '@/components/home/FounderSection';
import { CircleSection }   from '@/components/home/CircleSection';
import { NewArrivals }     from '@/components/home/NewArrivals';
import { WhySection }      from '@/components/home/WhySection';
import { Newsletter }      from '@/components/home/Newsletter';
import { getProducts }     from '@/lib/shopify';
import { FEATURED_IDS }    from '@/lib/products';

export const metadata: Metadata = {
  title: 'Thavare - Clinically Crafted Ayurveda',
  description: 'Sport and active Ayurvedic skincare for every body that moves. Clinically formulated by Dr. Meena Ramaiah using ancient Ayurvedic actives.',
  openGraph: {
    title: 'Thavare - Clinically Crafted Ayurveda',
    description: 'Sport and active Ayurvedic skincare for every body that moves.',
    images: [{ url: '/images/hero-model.png', width: 520, height: 720, alt: 'Thavare active skincare' }],
  },
};

const MARQUEE_ITEMS = [
  { label: 'Free Delivery Rs499+' },
  { label: '100% Ayurvedic Actives' },
  { label: 'Clinically Tested' },
  { label: 'Sustainable Packaging' },
  { label: 'Doctor Formulated' },
];

const PATTERN_ITEMS = [
  { label: 'Thavare' },
  { label: 'Thavare' },
  { label: 'Thavare' },
];

export default async function HomePage() {
  const allProducts = await getProducts();
  const featured = allProducts.filter(p => FEATURED_IDS.includes(p.id));

  return (
    <>
      <Hero />
      <MarqueeStrip items={MARQUEE_ITEMS} className="bg-teal py-3" />
      <CategoryGrid />
      <Bestsellers products={featured} />
      <ValuesSection />
      <IngredientStrip />
      <MarqueeStrip items={PATTERN_ITEMS} className="bg-teal py-3" />
      <FounderSection />
      <CircleSection />
      <NewArrivals products={allProducts} />
      <WhySection />
      <Newsletter />
    </>
  );
}
```

> Note: Keep the actual emoji and symbol strings from the current app/page.tsx - the above substitutes them for brevity.

- [ ] **Step 6: Run full test suite**

```bash
npx vitest run
```

Expected: All remaining tests pass.

- [ ] **Step 7: Commit**

```bash
git add lib/products.ts components/home/Bestsellers.tsx components/home/NewArrivals.tsx app/page.tsx
git rm lib/__tests__/products.test.ts lib/__tests__/checkout.test.ts
git commit -m "feat: remove static PRODUCTS, wire home sections to Shopify data"
```

---
## Task 4: Shop Page Refactor

**Files:**
- Create: `app/shop/ShopGrid.tsx`
- Modify: `app/shop/page.tsx`

- [ ] **Step 1: Read the current shop page**

Read `app/shop/page.tsx` to capture all existing className values, filter logic, and section markup before rewriting.

- [ ] **Step 2: Create app/shop/ShopGrid.tsx**

```typescript
// app/shop/ShopGrid.tsx
'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/shop/ProductCard';
import type { Product, ProductCategory } from '@/lib/products';

const CATEGORIES: { value: 'all' | ProductCategory; label: string }[] = [
  { value: 'all',              label: 'All' },
  { value: 'sport',            label: 'Sport' },
  { value: 'daily-essentials', label: 'Daily Essentials' },
  { value: 'recovery',         label: 'Recovery' },
  { value: 'sun-protection',   label: 'Sun Protection' },
];

export function ShopGrid({ products }: { products: Product[] }) {
  const [active, setActive] = useState<'all' | ProductCategory>('all');

  const filtered = active === 'all'
    ? products
    : products.filter(p => p.category === active);

  return (
    <>
      <div className="flex gap-3 flex-wrap mb-10">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            onClick={() => setActive(c.value)}
            className={[
              'px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 cursor-none border',
              active === c.value
                ? 'bg-navy text-cream border-navy'
                : 'bg-transparent text-navy/60 border-navy/20 hover:border-navy/40 hover:text-navy',
            ].join(' ')}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
```

- [ ] **Step 3: Rewrite app/shop/page.tsx**

```typescript
// app/shop/page.tsx
import type { Metadata } from 'next';
import { getProducts } from '@/lib/shopify';
import { ShopGrid }    from './ShopGrid';

export const metadata: Metadata = {
  title: 'Shop - Thavare',
  description: "Browse Thavare's full range of clinically crafted Ayurvedic skincare for active bodies.",
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <div className="bg-cream min-h-screen px-4 md:px-10 lg:px-20 py-14 md:py-24">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-12">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
            The Collection
          </div>
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-medium text-navy leading-[1.1]">
            Shop All Products
          </h1>
        </div>
        <ShopGrid products={products} />
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run build check**

```bash
npm run build
```

Expected: Build passes.

- [ ] **Step 5: Commit**

```bash
git add app/shop/ShopGrid.tsx app/shop/page.tsx
git commit -m "feat: refactor shop page to server/client split with Shopify data"
```

---
## Task 5: Product Detail Page + Sitemap

**Files:**
- Modify: `app/products/[slug]/page.tsx`
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Read the current product page**

Read `app/products/[slug]/page.tsx`. The file currently uses `getProductBySlug`, `generateProductParams`, and `PRODUCTS` for the related section.

- [ ] **Step 2: Rewrite app/products/[slug]/page.tsx**

Keep the full JSX markup (breadcrumb, image grid, ProductInfo, related section) identical to the current page. Only change the data source and add the JSON-LD product schema. Key changes:

1. Remove imports: `getProductBySlug`, `generateProductParams`, `PRODUCTS`
2. Add imports: `getProductByHandle`, `getProducts` from `@/lib/shopify`
3. Make `generateStaticParams` async and call `getProducts()` instead of `generateProductParams()`
4. Make `ProductPage` async and use `Promise.all` to fetch product + all products concurrently
5. Replace `PRODUCTS.filter(p => p.id !== product.id).slice(0, 3)` with `allProducts.filter(p => p.id !== product.id).slice(0, 3)`

Complete file:

```typescript
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductByHandle, getProducts } from '@/lib/shopify';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductCard } from '@/components/shop/ProductCard';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map(p => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.longDescription ?? product.description,
    openGraph: {
      title: `${product.name} - Thavare`,
      description: product.description,
      images: [{ url: product.images.card, width: 400, height: 500, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${product.name} - Thavare`,
      description: product.description,
      images: [product.images.card],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductByHandle(slug),
    getProducts(),
  ]);
  if (!product) notFound();

  const related = allProducts.filter(p => p.id !== product.id).slice(0, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription ?? product.description,
    image: product.images.main,
    brand: { '@type': 'Brand', name: 'Thavare' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `https://thavare.com/products/${product.slug}`,
    },
  };

  return (
    <div className="bg-cream min-h-screen">
      {/* JSON-LD schema script - keep same as existing page, data now from Shopify */}
      {/* Breadcrumb, image grid, ProductInfo, related - copy from existing page verbatim */}
    </div>
  );
}
```

> After pasting the complete file: copy the breadcrumb div, main grid div, and related section div from the current `app/products/[slug]/page.tsx` into the return statement above, replacing the comment placeholders. The script tag for JSON-LD schema (using the dangerouslySetInnerHTML prop) is identical to the current page - copy it as-is from the existing file.

- [ ] **Step 3: Update app/sitemap.ts**

Read the current sitemap.ts. Replace PRODUCTS with getProducts():

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/shopify';

const BASE = 'https://thavare.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const productEntries = products.map(p => ({
    url: `${BASE}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    { url: BASE,               lastModified: new Date(), changeFrequency: 'daily',   priority: 1 },
    { url: `${BASE}/shop`,     lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/founders`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/circle`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...productEntries,
  ];
}
```

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: Build passes, no TypeScript errors.

- [ ] **Step 5: Commit**

```bash
git add "app/products/[slug]/page.tsx" app/sitemap.ts
git commit -m "feat: product detail page and sitemap use Shopify Storefront API"
```

---
## Task 6: Cart Store Update

**Files:**
- Modify: `lib/cart.ts`
- Modify: `lib/__tests__/cart.test.ts`

- [ ] **Step 1: Read current lib/cart.ts and lib/__tests__/cart.test.ts**

Read both files. Note the current `CartItem` shape and all existing test helpers.

- [ ] **Step 2: Write the failing checkout tests**

Add to `lib/__tests__/cart.test.ts`. Add at the top (after existing imports):

```typescript
import { vi } from 'vitest';

vi.mock('@/lib/shopify', () => ({
  shopifyFetch: vi.fn(),
}));

import { shopifyFetch } from '@/lib/shopify';
import type { Product } from '@/lib/products';

// Product factory - replaces direct use of PRODUCTS[0], PRODUCTS[1]
function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 'body-wash',
    slug: 'body-wash',
    name: 'Body Wash',
    subtitle: 'Daily cleanse',
    description: 'A great body wash',
    longDescription: '<p>A great body wash</p>',
    category: 'sport',
    categoryLabel: 'Sport',
    price: 599,
    variantId: 'gid://shopify/ProductVariant/1',
    inStock: true,
    ingredients: 'Neem, Tulsi',
    images: { main: '/img/main.jpg', card: '/img/card.jpg' },
    ...overrides,
  };
}
```

Replace all `PRODUCTS[0]` in existing tests with `makeProduct()` and `PRODUCTS[1]` with `makeProduct({ id: 'body-lotion', slug: 'body-lotion', variantId: 'gid://shopify/ProductVariant/2', name: 'Body Lotion' })`.

Add at the bottom of the file:

```typescript
describe('createShopifyCheckout', () => {
  beforeEach(() => {
    useCartStore.getState().clearCart();
    vi.clearAllMocks();
  });

  it('does nothing when cart is empty', async () => {
    await useCartStore.getState().createShopifyCheckout();
    expect(shopifyFetch).not.toHaveBeenCalled();
  });

  it('calls shopifyFetch with correct cart lines', async () => {
    const p1 = makeProduct({ id: 'body-wash', variantId: 'gid://shopify/ProductVariant/1' });
    const p2 = makeProduct({ id: 'body-lotion', variantId: 'gid://shopify/ProductVariant/2', slug: 'body-lotion', name: 'Body Lotion' });
    useCartStore.getState().addItem(p1);
    useCartStore.getState().addItem(p2);

    (shopifyFetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      cartCreate: {
        cart: { id: 'gid://shopify/Cart/abc', checkoutUrl: 'https://store.myshopify.com/checkout/abc' },
        userErrors: [],
      },
    });

    vi.stubGlobal('location', { href: '' });
    await useCartStore.getState().createShopifyCheckout();

    expect(shopifyFetch).toHaveBeenCalledWith(
      expect.stringContaining('cartCreate'),
      {
        lines: [
          { merchandiseId: 'gid://shopify/ProductVariant/1', quantity: 1 },
          { merchandiseId: 'gid://shopify/ProductVariant/2', quantity: 1 },
        ],
      },
      'no-store',
    );
  });

  it('persists shopifyCartId in store after success', async () => {
    useCartStore.getState().addItem(makeProduct());

    (shopifyFetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      cartCreate: {
        cart: { id: 'gid://shopify/Cart/xyz', checkoutUrl: 'https://store.myshopify.com/checkout/xyz' },
        userErrors: [],
      },
    });

    vi.stubGlobal('location', { href: '' });
    await useCartStore.getState().createShopifyCheckout();

    expect(useCartStore.getState().shopifyCartId).toBe('gid://shopify/Cart/xyz');
  });

  it('redirects to checkoutUrl', async () => {
    useCartStore.getState().addItem(makeProduct());

    (shopifyFetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      cartCreate: {
        cart: { id: 'gid://shopify/Cart/abc', checkoutUrl: 'https://store.myshopify.com/checkout/abc' },
        userErrors: [],
      },
    });

    const loc = { href: '' };
    vi.stubGlobal('location', loc);
    await useCartStore.getState().createShopifyCheckout();

    expect(loc.href).toBe('https://store.myshopify.com/checkout/abc');
  });

  it('throws when Shopify returns userErrors', async () => {
    useCartStore.getState().addItem(makeProduct());

    (shopifyFetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      cartCreate: {
        cart: null,
        userErrors: [{ field: 'lines', message: 'Invalid variant' }],
      },
    });

    await expect(useCartStore.getState().createShopifyCheckout()).rejects.toThrow('Invalid variant');
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npx vitest run lib/__tests__/cart.test.ts
```

Expected: FAIL - `createShopifyCheckout is not a function`

- [ ] **Step 4: Rewrite lib/cart.ts**

Read the current file. Replace entirely with:

```typescript
// lib/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './products';
import { shopifyFetch } from './shopify';
import { CART_CREATE } from './shopify-queries';

export type CartItem = {
  product:   Product;
  quantity:  number;
  variantId: string;   // Shopify variant GID
};

type CartStore = {
  items:                 CartItem[];
  shopifyCartId:         string | null;
  addItem:               (product: Product) => void;
  removeItem:            (productId: string) => void;
  updateQuantity:        (productId: string, qty: number) => void;
  clearCart:             () => void;
  createShopifyCheckout: () => Promise<void>;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      shopifyCartId: null,

      addItem: (product) => {
        set(state => {
          const existing = state.items.find(i => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map(i =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            items: [...state.items, { product, quantity: 1, variantId: product.variantId }],
          };
        });
      },

      removeItem: (productId) => {
        set(state => ({
          items: state.items.filter(i => i.product.id !== productId),
        }));
      },

      updateQuantity: (productId, qty) => {
        if (qty < 1) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId ? { ...i, quantity: qty } : i
          ),
        }));
      },

      clearCart: () => set({ items: [], shopifyCartId: null }),

      createShopifyCheckout: async () => {
        const { items } = get();
        if (items.length === 0) return;

        const lines = items.map(i => ({
          merchandiseId: i.variantId,
          quantity: i.quantity,
        }));

        const data = await shopifyFetch<{
          cartCreate: {
            cart: { id: string; checkoutUrl: string } | null;
            userErrors: Array<{ field: string; message: string }>;
          };
        }>(CART_CREATE, { lines }, 'no-store');

        if (data.cartCreate.userErrors.length > 0) {
          throw new Error(data.cartCreate.userErrors[0].message);
        }

        const { id, checkoutUrl } = data.cartCreate.cart!;
        set({ shopifyCartId: id });
        window.location.href = checkoutUrl;
      },
    }),
    {
      name: 'thavare-cart',
      partialize: state => ({ items: state.items, shopifyCartId: state.shopifyCartId }),
    }
  )
);
```

- [ ] **Step 5: Run cart tests**

```bash
npx vitest run lib/__tests__/cart.test.ts
```

Expected: All tests PASS

- [ ] **Step 6: Run full test suite**

```bash
npx vitest run
```

Expected: All tests PASS

- [ ] **Step 7: Commit**

```bash
git add lib/cart.ts lib/__tests__/cart.test.ts
git commit -m "feat: add variantId to CartItem, add createShopifyCheckout action"
```

---
## Task 7: Cart Page + Checkout Deletions

**Files:**
- Modify: `app/cart/page.tsx`
- Delete: `app/checkout/page.tsx`
- Delete: `app/checkout/layout.tsx`
- Delete: `components/checkout/CheckoutForm.tsx`
- Delete: `lib/checkout.ts`

- [ ] **Step 1: Read app/cart/page.tsx**

Read the current file to find where the Link href="/checkout" CTA is rendered.

- [ ] **Step 2: Update app/cart/page.tsx**

Ensure `'use client'` is at the top. Add `CheckoutButton` component and use it in place of the Link:

```typescript
// Add to imports:
import React, { useState } from 'react';
import { useCartStore } from '@/lib/cart';

// Add CheckoutButton component in the file (before the page component):
function CheckoutButton() {
  const createShopifyCheckout = useCartStore(s => s.createShopifyCheckout);
  const items = useCartStore(s => s.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      await createShopifyCheckout();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none bg-navy text-cream hover:bg-navy/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Redirecting...' : 'Proceed to Checkout'}
      </button>
      {error && (
        <p className="mt-3 text-[12px] text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}
```

Replace `<Link href="/checkout"><Button ...>` with `<CheckoutButton />`. Keep all other cart page markup unchanged.

- [ ] **Step 3: Delete checkout files**

```bash
rm D:/Projects/thavare/app/checkout/page.tsx
rm D:/Projects/thavare/app/checkout/layout.tsx
rm D:/Projects/thavare/components/checkout/CheckoutForm.tsx
rm D:/Projects/thavare/lib/checkout.ts
rmdir D:/Projects/thavare/app/checkout 2>/dev/null || true
rmdir D:/Projects/thavare/components/checkout 2>/dev/null || true
```

- [ ] **Step 4: Run build**

```bash
npm run build
```

Expected: Build passes. No import errors from deleted files.

- [ ] **Step 5: Commit**

```bash
git add app/cart/page.tsx
git rm app/checkout/page.tsx app/checkout/layout.tsx components/checkout/CheckoutForm.tsx lib/checkout.ts
git commit -m "feat: replace checkout with Shopify redirect, delete custom checkout files"
```

---
## Task 8: Order Success Page

**Files:**
- Create: `app/order-success/OrderSuccessClearer.tsx`
- Create: `app/order-success/page.tsx`

- [ ] **Step 1: Create app/order-success/OrderSuccessClearer.tsx**

```typescript
// app/order-success/OrderSuccessClearer.tsx
'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/lib/cart';

// Clears the cart on mount. Separated into a client component so the parent
// order-success page can remain a server component.
export function OrderSuccessClearer() {
  const clearCart = useCartStore(s => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
```

- [ ] **Step 2: Create app/order-success/page.tsx**

```typescript
// app/order-success/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { OrderSuccessClearer } from './OrderSuccessClearer';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Order Confirmed - Thavare',
  description: 'Thank you for your order. Your Thavare products are on their way.',
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <div className="bg-cream min-h-[70vh] flex items-center justify-center px-4">
      <OrderSuccessClearer />
      <div className="text-center max-w-[480px]">
        <div className="w-16 h-16 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-teal">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
          Order Confirmed
        </div>
        <h1 className="font-serif text-[clamp(28px,4vw,42px)] font-medium text-navy leading-[1.12] mb-4">
          Thank You for Your Order
        </h1>
        <p className="text-[14px] leading-[1.75] text-text-2 mb-10">
          Your Thavare products are on their way. You will receive a confirmation email
          shortly with your order details and tracking information.
        </p>

        <div className="border-t border-navy/10 mb-10" />

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/shop">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <button className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none border border-navy/20 text-navy/70 hover:border-navy/40 hover:text-navy bg-transparent">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Run build**

```bash
npm run build
```

Expected: Build passes. /order-success route available.

- [ ] **Step 4: Commit**

```bash
git add app/order-success/OrderSuccessClearer.tsx app/order-success/page.tsx
git commit -m "feat: add order success page with cart clearing"
```

---
## Task 9: End-to-End Verification

**Files:** No new files - verification only.

- [ ] **Step 1: Run full test suite**

```bash
cd D:/Projects/thavare && npx vitest run
```

Expected: All tests PASS. Note total test count.

- [ ] **Step 2: Run TypeScript check**

```bash
npx tsc --noEmit
```

Expected: Zero errors.

- [ ] **Step 3: Run production build**

```bash
npm run build
```

Expected: Build passes with no errors.

- [ ] **Step 4: Start dev server and verify routes**

```bash
npm run dev
```

Open http://localhost:3000 and verify:

| Route | Expected |
|-------|----------|
| `/` | Loads. Bestsellers + NewArrivals render products from Shopify (or empty if env not configured). |
| `/shop` | Filter buttons work. Product grid renders. |
| `/products/body-wash` | Product detail loads. Related products shown. |
| `/cart` | Add a product first. Cart shows item. "Proceed to Checkout" button visible. |
| `/order-success` | Loads. Cart is cleared. CTAs visible. |
| `/sitemap.xml` | Returns sitemap with product URLs. |

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "chore: end-to-end verification complete - Shopify headless integration"
```

---

## Post-Implementation: Shopify Admin Checklist

Before going live, complete in Shopify Admin:

1. **Create products** with handles matching exactly: `body-wash`, `body-lotion`, `sun-screen`, `adolescent-sun-block`, `kumkumadi-taila`
2. **Create metafields** (Settings -> Custom data -> Products -> Add definition):
   - `custom.subtitle` - type: single_line_text_field - expose to Storefront API
   - `custom.badge` - type: single_line_text_field - expose to Storefront API
   - `custom.category` - type: single_line_text_field - expose to Storefront API
   - `custom.category_label` - type: single_line_text_field - expose to Storefront API
   - `custom.ingredients` - type: multi_line_text_field - expose to Storefront API
3. **Install Razorpay** payment gateway (Shopify App Store -> Razorpay for Shopify)
4. **Add redirect script** for post-checkout return (Shopify Admin -> Online Store -> Themes -> Edit code -> layout/theme.liquid):
   ```liquid
   {% if checkout.order_id %}
     <script>window.location.href = "https://thavare.com/order-success";</script>
   {% endif %}
   ```
5. **Brand the hosted checkout**: Admin -> Settings -> Checkout -> Customize (add Thavare logo, set navy #1A2744 as primary, teal #008493 as accent)
6. **Fill .env.local** with real values from: Shopify Admin -> Apps -> Develop apps -> Your app -> API credentials -> Storefront API access token
