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
  howToUse?:     string;
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
  'thavare-body-wash',
  'thavare-body-lotion',
  'thavare-sun-screen',
  'thavare-adolescent-sun-block',
];
