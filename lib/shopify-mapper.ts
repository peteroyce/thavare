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
  const variantEdge = node.variants.edges[0];
  if (!variantEdge) {
    throw new Error(`Product "${node.handle}" has no variants — cannot map to Product type`);
  }
  const variant = variantEdge.node;
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
