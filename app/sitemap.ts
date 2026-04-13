import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/shopify';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://thavare.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base,                       lastModified: new Date(), changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/shop`,             lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${base}/about`,            lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/founders`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/circle`,           lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/why-sport-active`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
  ];

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getProducts();
    productRoutes = products.map(p => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  } catch {
    // Shopify may be unreachable during build — omit product routes
  }

  return [...staticRoutes, ...productRoutes];
}
