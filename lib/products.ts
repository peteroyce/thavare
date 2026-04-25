// lib/products.ts

export type ProductCategory =
  | 'sport'
  | 'daily-essentials'
  | 'recovery'
  | 'sun-protection';

export type ProductVariant = {
  id:      string;   // Shopify variant GID
  title:   string;   // e.g. "50ml", "100ml"
  price:   number;
  inStock: boolean;
};

export type Product = {
  id:            string;
  slug:          string;
  name:          string;
  subtitle:      string;
  badge?:        string;
  description:   string;
  longDescription?: string;
  howToUse?:     string;
  category:      ProductCategory;
  categoryLabel: string;
  price:         number;
  variantId:     string;   // Shopify variant GID - required for checkout (default variant)
  inStock:       boolean;
  ingredients:   string;
  variants:      ProductVariant[];  // All variants — length > 1 means variant selector needed
  images: {
    main: string;
    card: string;
  };
};

// Handles of featured products shown in Bestsellers section.
// Must match Shopify product handles exactly.
export const FEATURED_IDS = [
  'thavare-body-lotion',
  'thavare-sun-screen',
  'thavare-adolescent-sun-block',
];
