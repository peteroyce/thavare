import type { MetadataRoute } from 'next';
import { getProducts } from '@/lib/shopify';

const BASE = 'https://thavare.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productEntries = products.map(p => ({
      url: `${BASE}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // Shopify may be unreachable during build — omit product routes
  }

  return [
    { url: BASE,               lastModified: new Date(), changeFrequency: 'daily',   priority: 1 },
    { url: `${BASE}/shop`,     lastModified: new Date(), changeFrequency: 'daily',   priority: 0.9 },
    { url: `${BASE}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/founders`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/circle`,   lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...productEntries,
  ];
}
