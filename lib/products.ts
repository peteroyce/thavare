export type ProductCategory =
  | 'pre-sport'
  | 'recovery'
  | 'daily-essentials'
  | 'sun-care'
  | 'teal-ayurveda';

export type Product = {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  categoryLabel: string;
  size?: string;
  price: number;
  originalPrice?: number;
  variantId?: string;
  badge?: string;
  description: string;
  longDescription: string;
  ingredients: string;
  images: { card: string; main: string };
  inStock: boolean;
};

export const PRODUCTS: Product[] = [
  {
    id: 'body-wash',
    slug: 'body-wash',
    name: 'Body Wash',
    subtitle: 'Blue Lotus + Wild Himalayan Cherry',
    category: 'pre-sport',
    categoryLabel: 'Pre-Sport',
    size: '200ml',
    price: 499,
    originalPrice: 649,
    badge: 'Bestseller',
    description: 'Cleanses and primes active skin before every session.',
    longDescription:
      "A clinically crafted Ayurvedic body wash designed for the skin that moves. Blue Lotus extract calms and protects, while Wild Himalayan Cherry delivers powerful antioxidants. Formulated to cleanse deeply without stripping your skin's natural barrier — so you step into every session with skin that's ready.",
    ingredients: 'Blue Lotus Extract, Wild Himalayan Cherry, Neem Leaf Extract, Aloe Vera, Glycerin',
    images: {
      card: '/images/prod-bodywash-box.png',
      main: '/images/prod-bodywash-box.png',
    },
    inStock: true,
  },
  {
    id: 'body-lotion',
    slug: 'body-lotion',
    name: 'Body Lotion',
    subtitle: 'Blue Lotus + Sandalwood',
    category: 'recovery',
    categoryLabel: 'Recovery',
    size: '200ml',
    price: 599,
    badge: 'New',
    description: 'Deep post-workout recovery for muscles and skin.',
    longDescription:
      "Sandalwood has been used in Ayurveda for centuries to calm inflamed skin and restore natural radiance. Paired with Blue Lotus extract, this lotion absorbs quickly to deliver deep hydration exactly when your skin needs it most — after every session.",
    ingredients: 'Blue Lotus Extract, Sandalwood Oil, Shea Butter, Squalane, Ashwagandha Root',
    images: {
      card: '/images/prod-bodylotion.png',
      main: '/images/prod-bodylotion.png',
    },
    inStock: true,
  },
  {
    id: 'sun-screen',
    slug: 'sun-screen',
    name: 'Sun Screen SPF 30',
    subtitle: 'Blue Lotus + Butter Tree',
    category: 'sun-care',
    categoryLabel: 'Sun Care',
    size: '50ml',
    price: 699,
    badge: 'New',
    description: 'Broad-spectrum Ayurvedic protection for skin that moves outdoors.',
    longDescription:
      "Most sunscreens weren't built for sweating. Ours was. The Butter Tree extract forms a breathable protective film that stays on through activity, while Blue Lotus soothes UV-stressed skin in real time. SPF 30, PA+++, non-comedogenic.",
    ingredients: 'Butter Tree Extract, Blue Lotus Extract, Zinc Oxide, Titanium Dioxide, Green Tea',
    images: {
      card: '/images/prod-sunscreen.png',
      main: '/images/prod-sunscreen.png',
    },
    inStock: true,
  },
  {
    id: 'adolescent-sun-block',
    slug: 'adolescent-sun-block',
    name: 'Adolescent Sun Block',
    subtitle: 'Sandalwood + Willow Bark · SPF 30',
    category: 'sun-care',
    categoryLabel: 'Sun Care',
    size: '50ml',
    price: 549,
    badge: 'New',
    description: 'Gentle mineral protection formulated for young, active skin.',
    longDescription:
      "Willow Bark is nature's salicylic acid — it keeps pores clear while Sandalwood calms any post-sport redness. A mineral-first formula that sits light on young skin without clogging, irritating, or leaving a white cast.",
    ingredients: 'Sandalwood Extract, Willow Bark Extract, Zinc Oxide, Aloe Vera, Vitamin E',
    images: {
      card: '/images/prod-sunblock.png',
      main: '/images/prod-sunblock.png',
    },
    inStock: true,
  },
  {
    id: 'kumkumadi-taila',
    slug: 'kumkumadi-taila',
    name: 'Kumkumadi Taila',
    subtitle: 'Cold-pressed Oil · Processed with Milk',
    category: 'teal-ayurveda',
    categoryLabel: 'Teal Ayurveda',
    size: '15ml',
    price: 899,
    badge: 'Signature',
    description: 'Ancient recovery ritual for luminous, post-sport skin.',
    longDescription:
      "Kumkumadi Taila is one of Ayurveda's oldest and most revered formulations. Cold-pressed and traditionally processed with milk, this golden oil works overnight to fade hyperpigmentation, restore natural glow, and deeply nourish skin that trains hard.",
    ingredients: 'Saffron, Sandalwood, Lotus, Vetiver, Licorice, Sesame Base Oil',
    images: {
      card: '/images/prod-kumkumadi.png',
      main: '/images/prod-kumkumadi.png',
    },
    inStock: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find(p => p.slug === slug);
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter(p => p.category === category);
}

export function generateProductParams() {
  return PRODUCTS.map(p => ({ slug: p.slug }));
}
