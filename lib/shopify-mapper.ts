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
  how_to_use: { value: string } | null;
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

const VALID_CATEGORIES: ProductCategory[] = ['sport', 'daily-essentials', 'recovery', 'sun-protection'];

/** Filter out placeholder/junk badge values from Shopify metafields */
function sanitizeBadge(raw?: string | null): string | undefined {
  if (!raw) return undefined;
  const cleaned = raw.replace(/^`+$/, '').trim();
  if (!cleaned) return undefined;
  // Filter out obvious placeholder text left in Shopify admin
  const JUNK = ['leave empty', 'placeholder', 'test', 'todo', 'xxx', 'tbd', 'n/a', 'none'];
  if (JUNK.includes(cleaned.toLowerCase())) return undefined;
  return cleaned;
}

/** Fix stale category labels left over from old branding */
const CATEGORY_LABEL_FIXES: Record<string, string> = {
  'Teal Ayurveda': 'Pure Ayurveda',
};

function isValidCategory(val: string | undefined): val is ProductCategory {
  return VALID_CATEGORIES.includes(val as ProductCategory);
}

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
    badge: sanitizeBadge(node.badge?.value),
    description: node.description,
    longDescription: node.descriptionHtml,
    category: isValidCategory(node.category?.value) ? node.category!.value : 'daily-essentials',
    categoryLabel: CATEGORY_LABEL_FIXES[node.category_label?.value ?? ''] ?? node.category_label?.value ?? '',
    price: Math.round(parseFloat(variant.price.amount)),
    variantId: variant.id,
    inStock: variant.availableForSale,
    ingredients: node.ingredients?.value ?? '',
    howToUse: node.how_to_use?.value ?? undefined,
    images: { main: mainImage, card: cardImage },
  };
}
