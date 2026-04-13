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
