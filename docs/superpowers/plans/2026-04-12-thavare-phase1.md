# Thavare Phase 1 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Thavare e-commerce Phase 1 — Home, Shop, Product Detail, Cart, and Checkout pages using Next.js 15 App Router + Tailwind CSS + TypeScript.

**Architecture:** Static product data (TypeScript objects) for Phase 1 — no backend. Cart state via Zustand persisted to localStorage. Five pages assembled from focused single-responsibility components. Animations via CSS classes in globals.css (matching the approved v4 mockup).

**Tech Stack:** Next.js 15.x (App Router), Tailwind CSS v3, TypeScript, Zustand 5.x, next/font/google, next/image, Vitest + @testing-library/react

**Reference mockup:** `D:/tmp/thavare-v4.html` — final approved design
**Assets:** `D:/tmp/thavare-assets/` — 16 product/lifestyle photos

---

## File Map

```
D:/Projects/thavare/
├── app/
│   ├── layout.tsx                         # Root: fonts, Navbar, Footer, CustomCursor
│   ├── globals.css                        # CSS tokens, base resets, animation classes
│   ├── page.tsx                           # Home — assembles all home sections
│   ├── shop/page.tsx                      # Product listing: grid + filter
│   ├── products/[slug]/page.tsx           # Product detail: images + info + add-to-cart
│   ├── cart/page.tsx                      # Cart: items + summary
│   └── checkout/page.tsx                  # Checkout: form + order summary
├── components/
│   ├── ui/
│   │   ├── Button.tsx                     # Variants: primary, ghost, outline-light, white
│   │   ├── AnimatedSection.tsx            # IntersectionObserver scroll-reveal wrapper
│   │   ├── CustomCursor.tsx               # Custom cursor + lagging ring (client)
│   │   └── MarqueeStrip.tsx              # Animated scrolling marquee
│   ├── layout/
│   │   ├── Navbar.tsx                     # Sticky nav with scroll state + bag count
│   │   └── Footer.tsx                     # 4-column footer
│   ├── home/
│   │   ├── Hero.tsx                       # Split: copy left, bg-removed model right
│   │   ├── CategoryGrid.tsx               # 4 cards with real photos
│   │   ├── Bestsellers.tsx                # 3-col product cards on navy bg
│   │   ├── ValuesSection.tsx              # 3 values on ivory bg
│   │   ├── IngredientStrip.tsx            # 3-panel full-bleed editorial
│   │   ├── FounderSection.tsx             # 2-col: photo + story
│   │   ├── CircleSection.tsx              # Teal: features + expert panel
│   │   ├── NewArrivals.tsx                # 4-col arrival cards
│   │   ├── WhySection.tsx                 # 2×2 why-cards on navy
│   │   └── Newsletter.tsx                 # Email capture
│   ├── shop/
│   │   ├── ProductCard.tsx                # Card: image, name, price, add-to-bag
│   │   ├── ProductGrid.tsx                # Responsive grid of ProductCards
│   │   └── FilterBar.tsx                  # Category filter chips
│   ├── product/
│   │   ├── ProductImages.tsx              # Main image + thumbnails
│   │   ├── ProductInfo.tsx                # Name, price, desc, add-to-cart CTA
│   │   └── RelatedProducts.tsx            # 3 other products
│   ├── cart/
│   │   ├── CartItem.tsx                   # Row: image, name, qty stepper, remove
│   │   └── CartSummary.tsx                # Subtotal + checkout CTA
│   └── checkout/
│       ├── CheckoutForm.tsx               # Contact + shipping + payment fields
│       └── OrderSummary.tsx               # Right col: items + total
├── lib/
│   ├── products.ts                        # Product type + PRODUCTS array (5 SKUs)
│   └── cart.ts                            # Zustand cart store with persist
├── public/images/                         # Copied from D:/tmp/thavare-assets/
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

### Task 1: Project Initialisation + Asset Copy

**Files:**
- Create: `D:/Projects/thavare/` (Next.js scaffold)
- Create: `public/images/` (copy 16 assets)
- Create: `next.config.ts`
- Create: `tsconfig.json` (path alias)

- [ ] **Step 1: Scaffold Next.js 15 project**

```bash
cd D:/Projects
npx create-next-app@latest thavare \
  --typescript --tailwind --eslint --app \
  --src-dir=no --import-alias="@/*" --no-git
cd thavare
```

Expected: project created with `app/`, `components/` (empty), `public/`, `tailwind.config.ts`, `tsconfig.json`.

- [ ] **Step 2: Install extra dependencies**

```bash
npm install zustand
npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Vitest**

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: { '@': path.resolve(__dirname, '.') },
  },
});
```

Create `vitest.setup.ts`:

```typescript
import '@testing-library/jest-dom';
```

Add to `package.json` scripts:

```json
"test": "vitest",
"test:run": "vitest run"
```

- [ ] **Step 4: Add path alias to tsconfig**

In `tsconfig.json`, ensure `paths` block exists:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./*"] }
  }
}
```

- [ ] **Step 5: Configure next.config.ts**

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 6: Copy assets to public/images/**

```bash
cp D:/tmp/thavare-assets/* public/images/
ls public/images/
```

Expected output: 16 files including `hero-model.png`, `prod-bodywash-box.png`, etc.

- [ ] **Step 7: Move plan into project**

```bash
mkdir -p docs/superpowers/plans
cp "D:/Projects/thavare/docs/superpowers/plans/2026-04-12-thavare-phase1.md" docs/superpowers/plans/
```

- [ ] **Step 8: Commit**

```bash
git init
git add .
git commit -m "chore: scaffold Next.js 15 + Tailwind + Zustand + Vitest"
```

---

### Task 2: Design Tokens — globals.css + Tailwind Config

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Replace globals.css with design tokens**

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --navy:       #1A2744;
  --navy-deep:  #111C35;
  --navy-mid:   #243058;
  --cream:      #EAE4D3;
  --ivory:      #F5F0E8;
  --beige:      #D9C4A9;
  --sand:       #C8B090;
  --terracotta: #B35F42;
  --terra-h:    #9E4F35;
  --camel:      #A87A53;
  --olive:      #948C6A;
  --teal:       #008493;
  --teal-dark:  #006B78;
  --text-1:     #1A1610;
  --text-2:     #5C5448;
  --text-3:     #8C7F72;
  --text-dark:  #EAE4D3;
  --text-dim:   rgba(217,196,169,0.55);
  --border-l:   #E5DDD0;
  --border-m:   #D4C8B8;
  --border-d:   rgba(255,255,255,0.07);
  --border-d2:  rgba(255,255,255,0.13);
  --shadow:     rgba(26,22,16,0.06) 0 4px 24px;
  --shadow-h:   rgba(26,22,16,0.12) 0 12px 40px;
  --ease:       cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --ease-out:   cubic-bezier(0.16, 1, 0.3, 1);
}

html { scroll-behavior: smooth; }
body { -webkit-font-smoothing: antialiased; overflow-x: hidden; cursor: none; }

/* Scroll reveal */
.reveal, .reveal-left, .reveal-right, .reveal-scale {
  opacity: 0;
  transition: opacity 0.75s var(--ease-out), transform 0.75s var(--ease-out);
}
.reveal        { transform: translateY(28px); }
.reveal-left   { transform: translateX(-32px); }
.reveal-right  { transform: translateX(32px); }
.reveal-scale  { transform: scale(0.93); }
.reveal.visible, .reveal-left.visible,
.reveal-right.visible, .reveal-scale.visible {
  opacity: 1; transform: none;
}
.stagger-1 { transition-delay: 0.08s; }
.stagger-2 { transition-delay: 0.16s; }
.stagger-3 { transition-delay: 0.24s; }
.stagger-4 { transition-delay: 0.32s; }

/* Marquee */
@keyframes marquee { to { transform: translateX(-50%); } }
.marquee-animate { animation: marquee 28s linear infinite; }

/* Hero entry */
@keyframes hero-up { to { opacity: 1; transform: none; } }
.hero-entry {
  opacity: 0; transform: translateY(20px);
  animation: hero-up 0.8s var(--ease-out) forwards;
}

/* Orb fade */
@keyframes orb-fade { to { opacity: 1; } }
.orb-fade { opacity: 0; animation: orb-fade 1.2s var(--ease-out) forwards; }

/* Pattern strip */
@keyframes pattern-scroll { to { transform: translateX(-50%); } }
.pattern-animate { animation: pattern-scroll 18s linear infinite; }

/* Pulse teal */
@keyframes pulse-teal {
  0%, 100% { box-shadow: 0 0 0 1px var(--teal), 0 4px 12px rgba(0,132,147,0.4); }
  50%       { box-shadow: 0 0 0 1px var(--teal), 0 4px 20px rgba(0,132,147,0.7); }
}
.pulse-teal { animation: pulse-teal 2.5s ease-in-out infinite; }
```

- [ ] **Step 2: Update tailwind.config.ts**

```typescript
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy:        { DEFAULT: '#1A2744', deep: '#111C35', mid: '#243058' },
        cream:       '#EAE4D3',
        ivory:       '#F5F0E8',
        beige:       '#D9C4A9',
        sand:        '#C8B090',
        terracotta:  { DEFAULT: '#B35F42', hover: '#9E4F35' },
        camel:       '#A87A53',
        olive:       '#948C6A',
        teal:        { DEFAULT: '#008493', dark: '#006B78' },
        'text-1':    '#1A1610',
        'text-2':    '#5C5448',
        'text-3':    '#8C7F72',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:  ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        heading: '1.12',
        body:    '1.60',
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: server on http://localhost:3000 with no errors.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css tailwind.config.ts
git commit -m "feat: add design tokens to globals.css and tailwind config"
```

---

### Task 3: Product Data — lib/products.ts

**Files:**
- Create: `lib/products.ts`
- Create: `lib/__tests__/products.test.ts`

- [ ] **Step 1: Write failing test**

```typescript
// lib/__tests__/products.test.ts
import { describe, it, expect } from 'vitest';
import { PRODUCTS, getProductBySlug, getProductsByCategory } from '../products';

describe('products', () => {
  it('exports 5 products', () => {
    expect(PRODUCTS).toHaveLength(5);
  });

  it('each product has required fields', () => {
    PRODUCTS.forEach(p => {
      expect(p.id).toBeTruthy();
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.price).toBeGreaterThan(0);
      expect(p.images.card).toBeTruthy();
    });
  });

  it('getProductBySlug returns correct product', () => {
    const p = getProductBySlug('body-wash');
    expect(p?.name).toBe('Body Wash');
  });

  it('getProductBySlug returns undefined for unknown slug', () => {
    expect(getProductBySlug('unknown')).toBeUndefined();
  });

  it('getProductsByCategory filters correctly', () => {
    const sunCare = getProductsByCategory('sun-care');
    expect(sunCare.length).toBeGreaterThan(0);
    sunCare.forEach(p => expect(p.category).toBe('sun-care'));
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test:run lib/__tests__/products.test.ts
```

Expected: FAIL — "Cannot find module '../products'"

- [ ] **Step 3: Implement lib/products.ts**

```typescript
// lib/products.ts

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
  size: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  description: string;
  longDescription: string;
  ingredients: string[];
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
      'A clinically crafted Ayurvedic body wash designed for the skin that moves. Blue Lotus extract calms and protects, while Wild Himalayan Cherry delivers powerful antioxidants. Formulated to cleanse deeply without stripping your skin\'s natural barrier — so you step into every session with skin that\'s ready.',
    ingredients: ['Blue Lotus Extract', 'Wild Himalayan Cherry', 'Neem Leaf Extract', 'Aloe Vera', 'Glycerin'],
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
      'Sandalwood has been used in Ayurveda for centuries to calm inflamed skin and restore natural radiance. Paired with Blue Lotus extract, this lotion absorbs quickly to deliver deep hydration exactly when your skin needs it most — after every session.',
    ingredients: ['Blue Lotus Extract', 'Sandalwood Oil', 'Shea Butter', 'Squalane', 'Ashwagandha Root'],
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
      'Most sunscreens weren\'t built for sweating. Ours was. The Butter Tree extract forms a breathable protective film that stays on through activity, while Blue Lotus soothes UV-stressed skin in real time. SPF 30, PA+++, non-comedogenic.',
    ingredients: ['Butter Tree Extract', 'Blue Lotus Extract', 'Zinc Oxide', 'Titanium Dioxide', 'Green Tea'],
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
      'Willow Bark is nature\'s salicylic acid — it keeps pores clear while Sandalwood calms any post-sport redness. A mineral-first formula that sits light on young skin without clogging, irritating, or leaving a white cast.',
    ingredients: ['Sandalwood Extract', 'Willow Bark Extract', 'Zinc Oxide', 'Aloe Vera', 'Vitamin E'],
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
      'Kumkumadi Taila is one of Ayurveda\'s oldest and most revered formulations. Cold-pressed and traditionally processed with milk, this golden oil works overnight to fade hyperpigmentation, restore natural glow, and deeply nourish skin that trains hard.',
    ingredients: ['Saffron', 'Sandalwood', 'Lotus', 'Vetiver', 'Licorice', 'Sesame Base Oil'],
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
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test:run lib/__tests__/products.test.ts
```

Expected: PASS — 5 tests passing.

- [ ] **Step 5: Commit**

```bash
git add lib/products.ts lib/__tests__/products.test.ts
git commit -m "feat: add product data and helper functions"
```

---

### Task 4: Cart Store — lib/cart.ts

**Files:**
- Create: `lib/cart.ts`
- Create: `lib/__tests__/cart.test.ts`

- [ ] **Step 1: Write failing tests**

```typescript
// lib/__tests__/cart.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCart } from '../cart';
import { PRODUCTS } from '../products';

const p1 = PRODUCTS[0]; // Body Wash ₹499
const p2 = PRODUCTS[1]; // Body Lotion ₹599

beforeEach(() => {
  useCart.setState({ items: [] });
});

describe('cart store', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.items).toHaveLength(0);
  });

  it('addItem adds a new product', () => {
    const { result } = renderHook(() => useCart());
    act(() => result.current.addItem(p1));
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(1);
  });

  it('addItem increments quantity for existing product', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.addItem(p1); });
    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it('removeItem removes a product', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.removeItem(p1.id); });
    expect(result.current.items).toHaveLength(0);
  });

  it('updateQuantity changes qty', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.updateQuantity(p1.id, 5); });
    expect(result.current.items[0].quantity).toBe(5);
  });

  it('updateQuantity to 0 removes item', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.updateQuantity(p1.id, 0); });
    expect(result.current.items).toHaveLength(0);
  });

  it('totalItems sums quantities', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.addItem(p1); result.current.addItem(p2); });
    expect(result.current.totalItems()).toBe(3);
  });

  it('totalPrice sums price × qty', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.addItem(p2); });
    expect(result.current.totalPrice()).toBe(499 + 599);
  });

  it('clearCart empties all items', () => {
    const { result } = renderHook(() => useCart());
    act(() => { result.current.addItem(p1); result.current.clearCart(); });
    expect(result.current.items).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test:run lib/__tests__/cart.test.ts
```

Expected: FAIL — "Cannot find module '../cart'"

- [ ] **Step 3: Implement lib/cart.ts**

```typescript
// lib/cart.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from './products';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
};

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const existing = get().items.find(i => i.product.id === product.id);
        if (existing) {
          set(state => ({
            items: state.items.map(i =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }));
        } else {
          set(state => ({ items: [...state.items, { product, quantity: 1 }] }));
        }
      },

      removeItem: (productId) => {
        set(state => ({ items: state.items.filter(i => i.product.id !== productId) }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set(state => ({
          items: state.items.map(i =>
            i.product.id === productId ? { ...i, quantity } : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: 'thavare-cart' }
  )
);
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test:run lib/__tests__/cart.test.ts
```

Expected: PASS — 9 tests passing.

- [ ] **Step 5: Commit**

```bash
git add lib/cart.ts lib/__tests__/cart.test.ts
git commit -m "feat: add Zustand cart store with persist"
```

---

### Task 5: UI Primitives — Button + AnimatedSection

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/AnimatedSection.tsx`

- [ ] **Step 1: Create Button.tsx**

```tsx
// components/ui/Button.tsx
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'ghost' | 'outline-light' | 'outline-cream' | 'white';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const base =
  'inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none relative overflow-hidden focus:outline-none';

const variants: Record<Variant, string> = {
  primary:
    'bg-terracotta text-ivory shadow-[0_0_0_1px_theme(colors.terracotta.DEFAULT)] ' +
    'hover:-translate-y-px hover:shadow-[0_0_0_1px_theme(colors.terracotta.hover),0_6px_20px_rgba(179,95,66,0.35)] ' +
    'active:translate-y-0',
  ghost:
    'bg-transparent text-cream/75 border border-cream/20 ' +
    'hover:border-cream/45 hover:text-cream hover:bg-cream/5',
  'outline-light':
    'bg-transparent text-cream/70 border border-cream/18 ' +
    'hover:border-cream/40 hover:text-cream hover:bg-cream/4',
  'outline-cream':
    'bg-transparent text-cream/75 border border-cream/20 ' +
    'hover:border-cream/45 hover:text-cream hover:gap-4',
  white:
    'bg-white text-teal-dark font-bold shadow-[0_0_0_1px_white,0_4px_20px_rgba(0,0,0,0.15)] ' +
    'hover:-translate-y-0.5 hover:shadow-[0_0_0_1px_white,0_8px_28px_rgba(0,0,0,0.2)]',
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = 'primary', className, children, ...props }, ref) => (
    <button ref={ref} className={cn(base, variants[variant], className)} {...props}>
      {children}
    </button>
  )
);
Button.displayName = 'Button';
```

Create `lib/utils.ts`:

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Install deps:

```bash
npm install clsx tailwind-merge
```

- [ ] **Step 2: Create AnimatedSection.tsx**

```tsx
// components/ui/AnimatedSection.tsx
'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'left' | 'right' | 'scale';
type Props = {
  children: ReactNode;
  direction?: Direction;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
};

const dirClass: Record<Direction, string> = {
  up:    'reveal',
  left:  'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
};

const delayClass = ['', 'stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'];

export function AnimatedSection({ children, direction = 'up', delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(dirClass[direction], delay > 0 ? delayClass[delay] : '', className)}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/Button.tsx components/ui/AnimatedSection.tsx lib/utils.ts
git commit -m "feat: add Button and AnimatedSection UI primitives"
```

---

### Task 6: UI — CustomCursor + MarqueeStrip

**Files:**
- Create: `components/ui/CustomCursor.tsx`
- Create: `components/ui/MarqueeStrip.tsx`

- [ ] **Step 1: Create CustomCursor.tsx**

```tsx
// components/ui/CustomCursor.tsx
'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMove);

    let raf: number;
    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dotRef.current)  { dotRef.current.style.left  = mx + 'px'; dotRef.current.style.top  = my + 'px'; }
      if (ringRef.current) { ringRef.current.style.left = rx + 'px'; ringRef.current.style.top = ry + 'px'; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { document.removeEventListener('mousemove', onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-terracotta rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-300"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border border-terracotta/50 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-[120ms]"
      />
    </>
  );
}
```

- [ ] **Step 2: Create MarqueeStrip.tsx**

```tsx
// components/ui/MarqueeStrip.tsx
type Item = { label: string };
type Props = { items: Item[]; className?: string };

export function MarqueeStrip({ items, className = '' }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-flex marquee-animate">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 text-[11px] font-medium tracking-wide text-white/88">
            {item.label}
            <span className="w-1 h-1 rounded-full bg-white/35 ml-4" />
          </span>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/ui/CustomCursor.tsx components/ui/MarqueeStrip.tsx
git commit -m "feat: add CustomCursor and MarqueeStrip components"
```

---

### Task 7: Layout — Navbar

**Files:**
- Create: `components/layout/Navbar.tsx`

- [ ] **Step 1: Create Navbar.tsx**

```tsx
// components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const totalItems = useCart(s => s.totalItems());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 h-[72px] flex items-center justify-between px-16 transition-all duration-400 border-b ${
        scrolled
          ? 'bg-navy-deep/96 backdrop-blur-2xl border-white/7'
          : 'bg-transparent border-transparent'
      }`}
    >
      {/* Left links */}
      <div className="flex items-center gap-7">
        {['Shop', 'Collections', 'Our Story'].map(label => (
          <Link
            key={label}
            href={label === 'Shop' ? '/shop' : '#'}
            className="nav-link text-[11px] font-medium tracking-[1.5px] uppercase text-cream/60 hover:text-cream transition-colors duration-200 relative group"
          >
            {label}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-teal group-hover:w-full transition-[width] duration-300" />
          </Link>
        ))}
      </div>

      {/* Logo */}
      <Link href="/" className="flex items-center gap-3 no-underline group">
        <div className="w-9 h-9 rounded-full border border-camel/50 flex items-center justify-center text-camel text-base transition-all duration-300 group-hover:border-camel group-hover:rotate-[20deg]">
          ◎
        </div>
        <div>
          <span className="block font-serif text-lg font-medium tracking-[5px] text-cream leading-none">THAVARE</span>
          <span className="block text-[8px] tracking-[2px] uppercase text-cream/40 mt-0.5">Clinically Crafted Ayurveda</span>
        </div>
      </Link>

      {/* Right links */}
      <div className="flex items-center gap-7">
        {['The Circle', 'Search'].map(label => (
          <Link
            key={label}
            href="#"
            className="text-[11px] font-medium tracking-[1.5px] uppercase text-cream/60 hover:text-cream transition-colors duration-200 relative group"
          >
            {label}
            <span className="absolute bottom-0 left-0 w-0 h-px bg-teal group-hover:w-full transition-[width] duration-300" />
          </Link>
        ))}
        <Link
          href="/cart"
          className="px-5 py-2 rounded-lg border border-cream/20 text-[11px] font-medium tracking-wide uppercase text-cream hover:border-cream/45 hover:bg-cream/6 transition-all duration-200"
        >
          Bag ({totalItems()})
        </Link>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/layout/Navbar.tsx
git commit -m "feat: add sticky Navbar with scroll state and cart count"
```

---

### Task 8: Layout — Footer + Root Layout

**Files:**
- Create: `components/layout/Footer.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create Footer.tsx**

```tsx
// components/layout/Footer.tsx
import Link from 'next/link';

const COLS = [
  { title: 'Shop',    links: ['Pre-Sport','During Activity','Recovery','Daily Essentials','Bestsellers','New Arrivals'] },
  { title: 'Company', links: ["About Thavare","Founder's Story","The Circle","Our Ingredients","Clinical Research","Contact Us"] },
  { title: 'Help',    links: ['FAQs','Shipping & Delivery','Returns & Refunds','Track Order','Privacy Policy','Terms of Service'] },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep px-20 pt-16 pb-8">
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-15 pb-13 border-b border-white/7 mb-7">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full border border-camel/50 flex items-center justify-center text-camel">◎</div>
            <div>
              <span className="block font-serif text-lg font-medium tracking-[5px] text-cream">THAVARE</span>
              <span className="block text-[8px] tracking-[2px] uppercase text-cream/40">Clinically Crafted Ayurveda</span>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-cream/38 max-w-[250px] mb-4">
            Functional Ayurvedic skincare engineered for the precise tension between the apothecary and the laboratory.
          </p>
          <p className="font-serif italic text-[12px] text-camel/65">Move. Sweat. Heal.</p>
          <div className="flex gap-2.5 mt-5">
            {['📷','📘','▶️','𝕏'].map((icon, i) => (
              <div key={i} className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center text-[13px] hover:border-white/30 hover:scale-110 transition-all duration-200 cursor-none">
                {icon}
              </div>
            ))}
          </div>
        </div>
        {/* Link columns */}
        {COLS.map(col => (
          <div key={col.title}>
            <h4 className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/28 mb-4">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map(link => (
                <li key={link}>
                  <Link href="#" className="text-[13px] text-cream/45 hover:text-cream/85 transition-colors duration-200">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-cream/22">© 2026 Thavare Health Sciences Pvt. Ltd. All rights reserved.</span>
        <div className="flex gap-6">
          {['Privacy','Terms','Sitemap'].map(label => (
            <Link key={label} href="#" className="text-[12px] text-cream/28 hover:text-cream/60 transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Update app/layout.tsx**

```tsx
// app/layout.tsx
import type { Metadata } from 'next';
import { Playfair_Display, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: 'Thavare — Clinically Crafted Ayurveda',
  description: 'Sport and active Ayurvedic skincare. Clinically formulated by Dr. Meena Ramaiah.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="font-sans bg-cream text-text-1 antialiased overflow-x-hidden cursor-none">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Open http://localhost:3000 — should see Navbar + default Next.js content + Footer.

- [ ] **Step 4: Commit**

```bash
git add components/layout/Footer.tsx app/layout.tsx
git commit -m "feat: add Footer and root layout with fonts"
```

---

### Task 9: Home — Hero Section

**Files:**
- Create: `components/home/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
// components/home/Hero.tsx
'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        if (contentRef.current) contentRef.current.style.transform = `translateY(${y * 0.12}px)`;
        if (visualRef.current)  visualRef.current.style.transform  = `translateY(${y * 0.07}px)`;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section
      className="min-h-[92vh] bg-navy-deep grid grid-cols-2 items-center px-20 gap-15 relative overflow-hidden"
      style={{ backgroundImage: 'radial-gradient(circle, rgba(0,132,147,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
    >
      {/* Gradient orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full -left-24 -top-24 pointer-events-none orb-fade" style={{ background: 'radial-gradient(circle, rgba(26,39,68,0.9), transparent)', filter: 'blur(80px)', animationDelay: '0.1s' }} />
      <div className="absolute w-[500px] h-[500px] rounded-full -right-20 -bottom-20 pointer-events-none orb-fade" style={{ background: 'radial-gradient(circle, rgba(44,26,14,0.7), transparent)', filter: 'blur(80px)', animationDelay: '0.3s' }} />

      {/* Content */}
      <div ref={contentRef} className="relative z-10">
        <div className="hero-entry inline-flex items-center gap-2.5 mb-5" style={{ animationDelay: '0.3s' }}>
          <div className="w-7 h-px bg-teal" />
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-teal">5000 Years of Wisdom</span>
        </div>
        <h1 className="hero-entry font-serif text-[clamp(42px,4.5vw,62px)] font-medium leading-[1.08] text-cream mb-4" style={{ animationDelay: '0.45s' }}>
          Built for Every Body<br />
          <em className="text-terracotta not-italic block" style={{ fontStyle: 'italic' }}>That Moves.</em>
        </h1>
        <p className="hero-entry text-base leading-[1.7] font-light text-cream/65 max-w-[400px] mb-9" style={{ animationDelay: '0.6s' }}>
          Ayurvedic actives, clinically crafted for sport and active life. Before you train. During. After. Everything your body deserves.
        </p>
        <div className="hero-entry flex gap-3" style={{ animationDelay: '0.75s' }}>
          <Button variant="primary">Shop the Range</Button>
          <Button variant="ghost">Our Story</Button>
        </div>
        <div className="hero-entry flex gap-10 mt-13 pt-7 border-t border-white/6" style={{ animationDelay: '0.9s' }}>
          {[['5000+','Years of Ayurveda'],['100%','Natural Actives'],['Dr.','Clinically Formulated']].map(([n,l]) => (
            <div key={l}>
              <div className="font-serif text-[30px] font-medium text-camel leading-none">{n}</div>
              <div className="text-[10px] tracking-[1.5px] uppercase text-cream/35 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Model image */}
      <div ref={visualRef} className="relative z-10 flex justify-center items-end hero-entry" style={{ animationDelay: '0.5s' }}>
        <Image
          src="/images/hero-model.png"
          alt="Thavare — active Ayurveda"
          width={520}
          height={720}
          className="max-h-[82vh] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 28px 72px rgba(0,0,0,0.7))' }}
          priority
        />
      </div>

      {/* Bottom teal line */}
      <div className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-teal to-transparent" style={{ animation: 'line-grow 1.2s 0.8s var(--ease-out) forwards' }} />
    </section>
  );
}
```

Add `line-grow` keyframe to `globals.css`:

```css
@keyframes line-grow { to { height: 80px; } }
```

- [ ] **Step 2: Commit**

```bash
git add components/home/Hero.tsx app/globals.css
git commit -m "feat: add Hero section with parallax and entry animations"
```

---

### Task 10: Home — CategoryGrid + Bestsellers

**Files:**
- Create: `components/home/CategoryGrid.tsx`
- Create: `components/home/Bestsellers.tsx`

- [ ] **Step 1: Create CategoryGrid.tsx**

```tsx
// components/home/CategoryGrid.tsx
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const CATS = [
  { name: 'Pre-Sport',        desc: 'Prime your skin before training. Protective Ayurvedic actives that prep every layer.',     img: '/images/cat-presport-sky.jpg',       href: '/shop?category=pre-sport',      pos: 'object-bottom' },
  { name: 'During Activity',  desc: 'Anti-chafe, anti-sweat, anti-friction. Formulated for the skin in motion.',                img: '/images/cat-during-gate.jpg',        href: '/shop?category=daily-essentials', pos: 'object-center' },
  { name: 'Recovery',         desc: 'Restore, repair, and renew. Deep Ayurvedic botanicals for post-workout skin.',             img: '/images/cat-recovery-kumkumadi.jpg', href: '/shop?category=recovery',        pos: 'object-center' },
  { name: 'Daily Essentials', desc: 'For the everyday mover. Lightweight routines rooted in ancient wisdom.',                   img: '/images/cat-daily-sunblock-wall.jpg',href: '/shop?category=sun-care',        pos: 'object-center' },
];

export function CategoryGrid() {
  return (
    <section className="py-24 px-20 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-2.5">Find Your Ritual</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            Shop by <em className="italic text-terracotta">Need</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-text-2 mt-3 max-w-[480px] mx-auto">
            Every body is different. Every movement demands different care.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-4 gap-4">
          {CATS.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={(i + 1) as 1|2|3|4}>
              <Link href={cat.href} className="block bg-ivory rounded-xl overflow-hidden border border-[#E5DDD0] shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-1.5 hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px] transition-all duration-350 group">
                <div className="h-[155px] overflow-hidden relative">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className={`object-cover ${cat.pos} group-hover:scale-[1.09] transition-transform duration-500`}
                  />
                </div>
                <div className="p-5 pb-6">
                  <div className="font-serif text-[17px] font-medium text-navy mb-1.5">{cat.name}</div>
                  <div className="text-[13px] leading-relaxed text-text-2 mb-3">{cat.desc}</div>
                  <span className="text-[10px] font-semibold tracking-[2px] uppercase text-teal inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore →
                  </span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Bestsellers.tsx**

```tsx
// components/home/Bestsellers.tsx
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { PRODUCTS } from '@/lib/products';

const FEATURED_IDS = ['body-wash', 'sun-screen', 'body-lotion'];

export function Bestsellers() {
  const products = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)!);

  return (
    <section className="py-24 px-20 bg-navy">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-2.5">Most Loved</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-cream">
            Our <em className="italic text-terracotta">Bestsellers</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-cream/50 mt-3">Loved by athletes. Trusted by everyday movers.</p>
        </AnimatedSection>
        <div className="grid grid-cols-3 gap-5">
          {products.map((p, i) => (
            <AnimatedSection key={p.id} delay={(i + 1) as 1|2|3}>
              <div className="bg-navy-mid rounded-xl overflow-hidden border border-white/7 hover:-translate-y-1 hover:border-terracotta/30 hover:shadow-[0_0_0_1px_rgba(179,95,66,0.1),0_12px_40px_rgba(0,0,0,0.25)] transition-all duration-350 group relative cursor-none">
                <div className="h-[220px] flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-[#3D2910] to-navy-mid">
                  {p.badge && (
                    <span className="absolute top-3.5 left-3.5 bg-terracotta text-white text-[9px] font-semibold tracking-[1.5px] uppercase px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <Image
                    src={p.images.card}
                    alt={p.name}
                    width={160}
                    height={180}
                    className="h-[82%] w-auto object-contain group-hover:scale-[1.09] group-hover:-translate-y-1 transition-transform duration-500"
                    style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-terracotta text-white text-[11px] font-semibold tracking-[1.5px] uppercase py-3.5 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-350">
                    Quick Add to Bag
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[9px] font-medium tracking-[3px] uppercase text-teal mb-1.5">{p.categoryLabel} · {p.size}</div>
                  <div className="font-serif text-[18px] font-medium leading-[1.25] text-cream mb-2">{p.name}</div>
                  <div className="text-[13px] leading-relaxed text-cream/55 mb-4">{p.description}</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[19px] font-semibold text-camel">₹{p.price}</span>
                      {p.originalPrice && <span className="text-[12px] text-cream/30 line-through ml-2">₹{p.originalPrice}</span>}
                    </div>
                    <Link href={`/products/${p.slug}`}>
                      <Button variant="primary" className="text-[10px] px-4 py-2">Add to Bag</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="text-center mt-12">
          <Link href="/shop">
            <Button variant="outline-light">View All Products</Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/home/CategoryGrid.tsx components/home/Bestsellers.tsx
git commit -m "feat: add CategoryGrid and Bestsellers home sections"
```

---

### Task 11: Home — Values + IngredientStrip + Founder + Circle

**Files:**
- Create: `components/home/ValuesSection.tsx`
- Create: `components/home/IngredientStrip.tsx`
- Create: `components/home/FounderSection.tsx`
- Create: `components/home/CircleSection.tsx`

- [ ] **Step 1: Create ValuesSection.tsx**

```tsx
// components/home/ValuesSection.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const VALUES = [
  { icon: '🌱', bg: 'bg-navy/6',        title: 'Bio-Active Ayurveda',      desc: 'We take time-tested Ayurvedic ingredients and extract their highest-performing actives using modern biotechnology. No fillers. No compromise.' },
  { icon: '🔬', bg: 'bg-terracotta/8',  title: 'Clinically Formulated',    desc: 'Every Thavare formula is developed by Dr. Meena Ramaiah — dermatologist, Ayurvedic practitioner, athlete. Science and nature, carefully and honestly.' },
  { icon: '🏃', bg: 'bg-teal/8',        title: 'Built for Motion',         desc: 'Active skin faces sweat, sun, friction and wear. Thavare is the only Ayurvedic skincare range specifically engineered for the body in motion.' },
];

export function ValuesSection() {
  return (
    <section className="py-24 px-20 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-2.5">The Thavare Difference</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            Where the Apothecary<br /><em className="italic text-terracotta">Meets the Laboratory</em>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-3 gap-12">
          {VALUES.map((v, i) => (
            <AnimatedSection key={v.title} delay={(i + 1) as 1|2|3} className="text-center group">
              <div className={`w-16 h-16 rounded-full ${v.bg} flex items-center justify-center text-[26px] mx-auto mb-6 shadow-[0_0_0_1px_#E5DDD0,rgba(26,22,16,0.06)_0_4px_24px] group-hover:scale-110 group-hover:-rotate-[5deg] transition-transform duration-400`}>
                {v.icon}
              </div>
              <div className="font-serif text-[20px] font-medium text-navy mb-2.5">{v.title}</div>
              <div className="text-[14px] leading-[1.7] text-text-2">{v.desc}</div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create IngredientStrip.tsx**

```tsx
// components/home/IngredientStrip.tsx
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const PANELS = [
  { label: 'Sun Care',       name: 'Sun Screen\nSPF 30',      desc: 'Blue Lotus + Butter Tree. Mineral-rich Ayurvedic protection for the body in motion.', img: '/images/editorial-sunscreen-moody.jpg' },
  { label: 'Cleanse + Prime',name: 'Body Wash\n200ml',         desc: 'Blue Lotus + Wild Himalayan Cherry. Cleanses, primes, and fortifies skin before you move.', img: '/images/editorial-bodywash-seeds.jpg' },
  { label: 'Teal Ayurveda',  name: 'Kumkumadi\nTaila',        desc: 'Cold-pressed oil. Processed with milk. Ancient recovery ritual for luminous skin.', img: '/images/editorial-kumkumadi-hand.jpg' },
];

export function IngredientStrip() {
  return (
    <div className="overflow-hidden bg-navy-deep">
      <div className="grid grid-cols-3">
        {PANELS.map((panel, i) => (
          <AnimatedSection key={panel.label} direction="scale" delay={(i + 1) as 1|2|3} className="relative h-[460px] overflow-hidden group cursor-none">
            <Image
              src={panel.img}
              alt={panel.name}
              fill
              className="object-cover group-hover:scale-[1.07] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 to-navy-deep/6 group-hover:from-navy-deep/95 transition-all duration-400 flex flex-col justify-end p-9 px-8">
              <div className="text-[9px] font-semibold tracking-[3px] uppercase text-teal mb-2">{panel.label}</div>
              <div className="font-serif text-2xl font-medium text-cream leading-[1.2] mb-2" style={{ whiteSpace: 'pre-line' }}>{panel.name}</div>
              <div className="text-[13px] leading-[1.6] text-cream/62 max-w-[230px]">{panel.desc}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Create FounderSection.tsx**

```tsx
// components/home/FounderSection.tsx
import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

export function FounderSection() {
  return (
    <section className="py-24 px-20 bg-navy-deep">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-20 items-center">
        <AnimatedSection direction="left">
          <div className="rounded-2xl overflow-hidden border border-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.4)] relative group hover:scale-[1.02] transition-transform duration-400">
            <div className="absolute font-serif text-[110px] leading-none text-teal/12 top-[-20px] left-2.5 z-10 pointer-events-none">"</div>
            <Image
              src="/images/lifestyle-model-smile.png"
              alt="Thavare — active Ayurveda"
              width={480}
              height={380}
              className="w-full h-[380px] object-cover object-top block"
            />
            <div className="px-7 py-6 bg-gradient-to-t from-navy-deep to-navy-deep/85 relative">
              <div className="font-serif text-[18px] font-medium text-cream">Dr. Meena Ramaiah</div>
              <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-camel mt-0.5">Founder &amp; Formulator, Thavare</div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection direction="right">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">The Founder's Story</div>
          <h2 className="font-serif text-[36px] font-medium leading-[1.15] text-cream mb-6">
            The Lotus Blooms<br /><em className="italic text-terracotta">Through the Mud.</em>
          </h2>
          <blockquote className="font-serif text-[17px] italic leading-[1.65] text-beige border-l-2 border-teal pl-6 mb-6">
            "My own skin reaction taught me the hardest lesson — even natural is not always safe. Science and nature must work together, carefully and honestly."
          </blockquote>
          <p className="text-[14px] leading-[1.75] text-cream/55 mb-3">
            My journey began in my mother's kitchen — natural ingredients, trusted recipes, skincare passed down through generations. Then my skin betrayed me. A herbal product I trusted caused a severe reaction. What followed wasn't just a skin problem — it quietly became a mental one.
          </p>
          <p className="font-serif italic text-[14px] text-camel mb-8">Thavare means lotus. It blooms not in spite of the mud — but because of it.</p>
          <Button variant="outline-cream">Read the Full Story →</Button>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Create CircleSection.tsx**

```tsx
// components/home/CircleSection.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

const FEATS = [
  { icon: '👩‍⚕️', title: 'Verified Medical Experts',       desc: 'Dermatologists, sports medicine doctors, and Ayurvedic practitioners — answering personally.' },
  { icon: '🔄', title: 'Rotating Specialists Every Week', desc: 'New experts cycle in regularly — so the guidance never stops.' },
  { icon: '🛡️', title: 'Zero Noise. Zero Sponsorship.',   desc: 'A trusted space free from the content that clutters every other wellness community.' },
];

const EXPERTS = [
  { name: 'Dr. Priya Sharma', role: 'Sports Dermatologist · Mumbai',     tag: 'Answering Now' },
  { name: 'Dr. Arjun Nair',   role: 'Ayurvedic Practitioner · Kerala',  tag: 'Live This Week' },
  { name: 'Dr. Kavitha Rao',  role: 'Sports Medicine · Bengaluru',       tag: 'Join Queue' },
];

export function CircleSection() {
  return (
    <section className="py-24 px-20 bg-teal">
      <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-20 items-center">
        <AnimatedSection direction="left">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-white/50 mb-3">Community</div>
          <h2 className="font-serif text-[38px] font-medium leading-[1.15] text-white mb-4">
            Join the<br /><em className="italic text-cream">Thavare Circle</em>
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/75 font-light mb-8">
            Real answers from real experts. Not generic advice. Not sponsored content. A space where the confusion of not knowing finally has somewhere to go.
          </p>
          <div className="flex flex-col gap-4 mb-9">
            {FEATS.map(f => (
              <div key={f.title} className="flex items-start gap-3.5 group">
                <div className="w-[34px] h-[34px] rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-[15px] flex-shrink-0 group-hover:bg-white/25 group-hover:scale-110 transition-all">
                  {f.icon}
                </div>
                <div className="text-[13px] leading-[1.55] text-white/80">
                  <strong className="block text-[14px] text-white mb-0.5">{f.title}</strong>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
          <Button variant="white">Come into the Circle</Button>
        </AnimatedSection>
        <AnimatedSection direction="right">
          <div className="bg-white/10 rounded-2xl p-7 border border-white/15">
            <div className="text-[9px] font-semibold tracking-[3px] uppercase text-white/40 text-center mb-4">This Week's Experts</div>
            <div className="flex flex-col gap-3">
              {EXPERTS.map(e => (
                <div key={e.name} className="bg-white/12 rounded-xl px-4 py-3.5 flex items-center gap-3.5 border border-white/10 hover:bg-white/18 hover:translate-x-1 transition-all cursor-none">
                  <div className="w-[42px] h-[42px] rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">👩‍⚕️</div>
                  <div>
                    <div className="text-[13px] text-white font-semibold">{e.name}</div>
                    <div className="text-[11px] text-white/50 mt-0.5">{e.role}</div>
                    <span className="inline-block mt-1 text-[9px] font-semibold tracking-[1.5px] uppercase text-white/85 bg-white/15 px-2 py-0.5 rounded-full">{e.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Commit**

```bash
git add components/home/ValuesSection.tsx components/home/IngredientStrip.tsx components/home/FounderSection.tsx components/home/CircleSection.tsx
git commit -m "feat: add Values, IngredientStrip, Founder, and Circle home sections"
```

---

### Task 12: Home — NewArrivals + WhySection + Newsletter + Page Assembly

**Files:**
- Create: `components/home/NewArrivals.tsx`
- Create: `components/home/WhySection.tsx`
- Create: `components/home/Newsletter.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create NewArrivals.tsx**

```tsx
// components/home/NewArrivals.tsx
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { PRODUCTS } from '@/lib/products';

const BG = ['bg-gradient-to-br from-navy-mid to-teal-dark', 'bg-gradient-to-br from-[#D9C4A9] to-camel', 'bg-gradient-to-br from-cream to-sand', 'bg-gradient-to-br from-[#243058] to-teal-dark'];

export function NewArrivals() {
  return (
    <section className="py-24 px-20 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-2.5">Just Landed</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            New <em className="italic text-terracotta">Arrivals</em>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-4 gap-4">
          {PRODUCTS.map((p, i) => (
            <AnimatedSection key={p.id} delay={(i + 1) as 1|2|3|4}>
              <Link href={`/products/${p.slug}`} className="block bg-ivory rounded-xl overflow-hidden border border-[#E5DDD0] shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-1.5 hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px] transition-all duration-350 group">
                <div className={`h-[180px] flex items-center justify-center relative overflow-hidden ${BG[i % 4]}`}>
                  <span className="absolute top-2.5 left-2.5 bg-navy text-cream text-[8px] font-semibold tracking-[1.5px] uppercase px-2.5 py-1 rounded-full">
                    {p.badge ?? 'New'}
                  </span>
                  <Image
                    src={p.images.card}
                    alt={p.name}
                    width={120}
                    height={140}
                    className="h-[78%] w-auto object-contain group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500"
                    style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.12))' }}
                  />
                </div>
                <div className="p-4 pb-5">
                  <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-camel mb-1.5">{p.categoryLabel} · {p.size}</div>
                  <div className="font-serif text-[15px] font-medium text-navy mb-2 leading-[1.3]">{p.name}</div>
                  <div className="text-[15px] font-semibold text-terracotta">₹{p.price}</div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create WhySection.tsx**

```tsx
// components/home/WhySection.tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const WHYS = [
  { icon: '🏋️', title: 'For Sport',           desc: 'For those who train hard, compete, and push limits. Performance isn\'t just muscle and mind — it\'s every layer of the body that shows up.' },
  { icon: '🚶', title: 'For Active',           desc: 'For everyone else. The one who walks, stretches, cycles, chases children, carries groceries, and moves through life with intention.' },
  { icon: '🌿', title: 'Ancient Intelligence', desc: 'Ayurveda has always had the answers for the body in motion. We are simply bringing it into the conversation it was always meant to have.' },
  { icon: '🔬', title: 'Modern Precision',     desc: 'Every ingredient selected, extracted, and clinically validated. The best of both worlds — rooted in nature, proven by science.' },
];

export function WhySection() {
  return (
    <section className="py-24 px-20 bg-navy">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-2.5">Why Sport. Why Active.</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-cream">
            This Is <em className="italic text-terracotta">Sport Ayurveda.</em>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 gap-4 max-w-[900px] mx-auto">
          {WHYS.map((w, i) => (
            <AnimatedSection key={w.title} delay={(i + 1) as 1|2|3|4}>
              <div className="bg-white/3 border border-white/7 rounded-xl p-8 flex gap-4 items-start hover:bg-white/6 hover:border-white/13 hover:-translate-y-0.5 transition-all duration-300 cursor-none group">
                <div className="text-2xl flex-shrink-0 mt-0.5 group-hover:scale-125 group-hover:-rotate-[8deg] transition-transform duration-350">{w.icon}</div>
                <div>
                  <div className="font-serif text-[18px] font-medium text-cream mb-1.5">{w.title}</div>
                  <div className="text-[13px] leading-[1.65] text-cream/55">{w.desc}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Newsletter.tsx**

```tsx
// components/home/Newsletter.tsx
'use client';

import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section className="py-24 px-20 bg-beige">
      <AnimatedSection className="max-w-[520px] mx-auto text-center">
        <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal-dark mb-3">Stay in the Know</div>
        <h2 className="font-serif text-[clamp(28px,3vw,38px)] font-medium leading-[1.15] text-navy mb-3">
          Move Well. <em className="italic text-terracotta">Live Well.</em>
        </h2>
        <p className="text-[15px] leading-relaxed text-text-2">
          Join 12,000+ movers. Get early access, expert tips, and stories from the Thavare community.
        </p>
        {submitted ? (
          <p className="mt-8 font-serif italic text-[18px] text-teal-dark">You're in. Welcome to the circle.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex mt-8 rounded-lg overflow-hidden shadow-[0_0_0_1px_#D4C8B8,rgba(26,22,16,0.06)_0_4px_24px] focus-within:shadow-[0_0_0_2px_theme(colors.teal.DEFAULT),0_4px_16px_rgba(0,132,147,0.15)] transition-shadow">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 bg-ivory border-none text-[14px] text-text-1 outline-none placeholder-text-3 focus:bg-white transition-colors"
              required
            />
            <button type="submit" className="px-6 py-3.5 bg-navy text-cream font-sans text-[11px] font-semibold tracking-[1.5px] uppercase border-none hover:bg-navy-mid transition-colors cursor-none">
              Subscribe
            </button>
          </form>
        )}
        <p className="text-[12px] text-text-2 mt-3 opacity-70">No spam. Unsubscribe anytime. Dr. Meena writes occasionally too.</p>
      </AnimatedSection>
    </section>
  );
}
```

- [ ] **Step 4: Assemble app/page.tsx**

```tsx
// app/page.tsx
import { Hero }             from '@/components/home/Hero';
import { MarqueeStrip }     from '@/components/ui/MarqueeStrip';
import { CategoryGrid }     from '@/components/home/CategoryGrid';
import { Bestsellers }      from '@/components/home/Bestsellers';
import { ValuesSection }    from '@/components/home/ValuesSection';
import { IngredientStrip }  from '@/components/home/IngredientStrip';
import { FounderSection }   from '@/components/home/FounderSection';
import { CircleSection }    from '@/components/home/CircleSection';
import { NewArrivals }      from '@/components/home/NewArrivals';
import { WhySection }       from '@/components/home/WhySection';
import { Newsletter }       from '@/components/home/Newsletter';

const MARQUEE_ITEMS = [
  { label: '🚚 Free Delivery ₹499+' },
  { label: '🌿 100% Ayurvedic Actives' },
  { label: '🔬 Clinically Tested' },
  { label: '♻️ Sustainable Packaging' },
  { label: '👩‍⚕️ Doctor Formulated' },
];

const PATTERN_ITEMS = [
  { label: '◈  ⊙  ❋  ◉' },
  { label: '◈  ⊙  ❋  ◉' },
  { label: '◈  ⊙  ❋  ◉' },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip items={MARQUEE_ITEMS} className="bg-teal py-3" />
      <CategoryGrid />
      <Bestsellers />
      <ValuesSection />
      <IngredientStrip />
      <MarqueeStrip items={PATTERN_ITEMS} className="bg-teal h-11 py-0 items-center" />
      <FounderSection />
      <CircleSection />
      <NewArrivals />
      <WhySection />
      <Newsletter />
    </>
  );
}
```

- [ ] **Step 5: Run dev and verify home page renders**

```bash
npm run dev
```

Open http://localhost:3000 — all 10 sections should render with real photos.

- [ ] **Step 6: Commit**

```bash
git add components/home/ app/page.tsx
git commit -m "feat: complete home page with all sections"
```

---

### Task 13: Shop Page

**Files:**
- Create: `components/shop/ProductCard.tsx`
- Create: `components/shop/FilterBar.tsx`
- Create: `app/shop/page.tsx`

- [ ] **Step 1: Create ProductCard.tsx**

```tsx
// components/shop/ProductCard.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/products';

export function ProductCard({ product: p }: { product: Product }) {
  const addItem = useCart(s => s.addItem);

  return (
    <div className="bg-ivory rounded-xl overflow-hidden border border-[#E5DDD0] shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-1.5 hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px] transition-all duration-350 group relative">
      <Link href={`/products/${p.slug}`}>
        <div className="h-[240px] bg-gradient-to-br from-cream to-sand flex items-center justify-center overflow-hidden relative">
          {p.badge && (
            <span className="absolute top-3 left-3 bg-terracotta text-white text-[9px] font-semibold tracking-[1.5px] uppercase px-3 py-1 rounded-full z-10">
              {p.badge}
            </span>
          )}
          <Image
            src={p.images.card}
            alt={p.name}
            width={160}
            height={200}
            className="h-[80%] w-auto object-contain group-hover:scale-[1.08] transition-transform duration-500"
            style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))' }}
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-camel mb-1.5">{p.categoryLabel} · {p.size}</div>
        <Link href={`/products/${p.slug}`}>
          <div className="font-serif text-[17px] font-medium text-navy mb-1.5 leading-[1.25] hover:text-terracotta transition-colors">{p.name}</div>
        </Link>
        <div className="text-[13px] leading-relaxed text-text-2 mb-4 line-clamp-2">{p.description}</div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[18px] font-semibold text-terracotta">₹{p.price}</span>
            {p.originalPrice && <span className="text-[12px] text-text-3 line-through ml-2">₹{p.originalPrice}</span>}
          </div>
          <button
            onClick={() => addItem(p)}
            className="px-4 py-2 bg-terracotta text-white text-[10px] font-semibold tracking-wide uppercase rounded-lg hover:bg-terracotta-hover hover:scale-[1.04] transition-all cursor-none"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create app/shop/page.tsx**

```tsx
// app/shop/page.tsx
'use client';

import { useState } from 'react';
import { PRODUCTS, type ProductCategory } from '@/lib/products';
import { ProductCard } from '@/components/shop/ProductCard';

const FILTERS: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Pre-Sport', value: 'pre-sport' },
  { label: 'Recovery', value: 'recovery' },
  { label: 'Sun Care', value: 'sun-care' },
  { label: 'Daily Essentials', value: 'daily-essentials' },
  { label: 'Teal Ayurveda', value: 'teal-ayurveda' },
];

export default function ShopPage() {
  const [active, setActive] = useState<ProductCategory | 'all'>('all');
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === active);

  return (
    <div className="min-h-screen bg-cream pt-12 pb-24 px-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">The Range</div>
          <h1 className="font-serif text-[clamp(36px,4vw,56px)] font-medium leading-[1.1] text-navy">
            Shop <em className="italic text-terracotta">Thavare</em>
          </h1>
          <p className="text-[16px] leading-relaxed text-text-2 mt-4 max-w-[480px] mx-auto">
            Clinically crafted Ayurveda for every body that moves.
          </p>
        </div>
        {/* Filter bar */}
        <div className="flex gap-3 justify-center flex-wrap mb-12">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`px-5 py-2 rounded-full text-[11px] font-medium tracking-[1px] uppercase transition-all cursor-none ${
                active === f.value
                  ? 'bg-navy text-cream shadow-[0_0_0_1px_theme(colors.navy.DEFAULT)]'
                  : 'bg-ivory text-text-2 border border-[#D4C8B8] hover:border-navy hover:text-navy'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        {/* Grid */}
        <div className="grid grid-cols-3 gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Open http://localhost:3000/shop — 5 product cards, filter chips work.

- [ ] **Step 4: Commit**

```bash
git add components/shop/ProductCard.tsx app/shop/
git commit -m "feat: add Shop page with product grid and category filter"
```

---

### Task 14: Product Detail Page

**Files:**
- Create: `components/product/ProductInfo.tsx`
- Create: `app/products/[slug]/page.tsx`

- [ ] **Step 1: Create ProductInfo.tsx**

```tsx
// components/product/ProductInfo.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/Button';

export function ProductInfo({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCart(s => s.addItem);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(p);
  };

  return (
    <div>
      <div className="text-[10px] font-medium tracking-[3px] uppercase text-teal mb-3">{p.categoryLabel} · {p.size}</div>
      <h1 className="font-serif text-[40px] font-medium leading-[1.1] text-navy mb-2">{p.name}</h1>
      <p className="text-[16px] text-text-2 italic mb-6">{p.subtitle}</p>
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-[28px] font-semibold text-terracotta">₹{p.price}</span>
        {p.originalPrice && <span className="text-[16px] text-text-3 line-through">₹{p.originalPrice}</span>}
      </div>
      <p className="text-[15px] leading-[1.75] text-text-2 mb-8">{p.longDescription}</p>
      {/* Ingredients */}
      <div className="mb-8">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-text-3 mb-3">Key Ingredients</div>
        <div className="flex flex-wrap gap-2">
          {p.ingredients.map(ing => (
            <span key={ing} className="text-[12px] px-3 py-1.5 bg-cream border border-[#D4C8B8] rounded-full text-text-2">
              {ing}
            </span>
          ))}
        </div>
      </div>
      {/* Qty + Add */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center gap-0 border border-[#D4C8B8] rounded-lg overflow-hidden">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-11 text-[18px] text-text-2 hover:bg-cream transition-colors cursor-none">−</button>
          <span className="w-10 text-center text-[15px] font-medium text-text-1">{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="w-11 h-11 text-[18px] text-text-2 hover:bg-cream transition-colors cursor-none">+</button>
        </div>
        <Button onClick={handleAdd} className="flex-1">Add to Bag</Button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create app/products/[slug]/page.tsx**

```tsx
// app/products/[slug]/page.tsx
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, generateProductParams, PRODUCTS } from '@/lib/products';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductCard } from '@/components/shop/ProductCard';

export function generateStaticParams() {
  return generateProductParams();
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="px-20 pt-8 pb-0 text-[12px] text-text-3 flex gap-2">
        <Link href="/" className="hover:text-text-1 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-text-1 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-text-1">{product.name}</span>
      </div>

      {/* Main grid */}
      <div className="px-20 py-14 grid grid-cols-2 gap-20 max-w-[1200px] mx-auto">
        {/* Image */}
        <div className="bg-gradient-to-br from-ivory to-cream rounded-2xl flex items-center justify-center p-12 border border-[#E5DDD0] min-h-[500px]">
          <Image
            src={product.images.main}
            alt={product.name}
            width={340}
            height={420}
            className="max-h-[420px] w-auto object-contain"
            style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.12))' }}
            priority
          />
        </div>
        {/* Info */}
        <div className="py-8">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related */}
      <div className="px-20 pb-24 max-w-[1200px] mx-auto">
        <h2 className="font-serif text-[28px] font-medium text-navy mb-8">You May Also Like</h2>
        <div className="grid grid-cols-3 gap-6">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Open http://localhost:3000/products/body-wash — product image, info, qty selector, and related products.

- [ ] **Step 4: Commit**

```bash
git add components/product/ app/products/
git commit -m "feat: add product detail page with add-to-cart"
```

---

### Task 15: Cart Page

**Files:**
- Create: `components/cart/CartItem.tsx`
- Create: `app/cart/page.tsx`

- [ ] **Step 1: Create CartItem.tsx**

```tsx
// components/cart/CartItem.tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, type CartItem as CartItemType } from '@/lib/cart';

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const { product: p, quantity } = item;

  return (
    <div className="flex gap-5 py-6 border-b border-[#E5DDD0]">
      <Link href={`/products/${p.slug}`} className="block w-[100px] h-[100px] bg-gradient-to-br from-cream to-sand rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
        <Image
          src={p.images.card}
          alt={p.name}
          width={80}
          height={90}
          className="h-[85%] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))' }}
        />
      </Link>
      <div className="flex-1">
        <div className="text-[9px] font-medium tracking-[2px] uppercase text-camel mb-1">{p.categoryLabel}</div>
        <Link href={`/products/${p.slug}`} className="font-serif text-[17px] font-medium text-navy hover:text-terracotta transition-colors">{p.name}</Link>
        <div className="text-[13px] text-text-3 mt-0.5">{p.subtitle}</div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-[#D4C8B8] rounded-lg overflow-hidden">
            <button onClick={() => updateQuantity(p.id, quantity - 1)} className="w-9 h-9 text-text-2 hover:bg-cream transition-colors cursor-none">−</button>
            <span className="w-8 text-center text-[14px] font-medium">{quantity}</span>
            <button onClick={() => updateQuantity(p.id, quantity + 1)} className="w-9 h-9 text-text-2 hover:bg-cream transition-colors cursor-none">+</button>
          </div>
          <span className="text-[17px] font-semibold text-terracotta">₹{p.price * quantity}</span>
        </div>
      </div>
      <button onClick={() => removeItem(p.id)} className="text-text-3 hover:text-text-1 transition-colors text-[18px] self-start cursor-none">×</button>
    </div>
  );
}
```

- [ ] **Step 2: Create app/cart/page.tsx**

```tsx
// app/cart/page.tsx
'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/Button';

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCart();
  const count = totalItems();
  const total = totalPrice();
  const shipping = total >= 499 ? 0 : 99;

  if (count === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
        <div className="font-serif text-[32px] text-navy">Your bag is empty</div>
        <p className="text-text-2">Discover our clinically crafted Ayurvedic range.</p>
        <Link href="/shop"><Button>Shop Now</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-20 py-14">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="font-serif text-[36px] font-medium text-navy mb-10">Your Bag ({count})</h1>
        <div className="grid grid-cols-[1fr_380px] gap-12">
          {/* Items */}
          <div>
            {items.map(item => <CartItem key={item.product.id} item={item} />)}
          </div>
          {/* Summary */}
          <div className="bg-ivory rounded-2xl p-8 border border-[#E5DDD0] h-fit">
            <h2 className="font-serif text-[22px] font-medium text-navy mb-6">Order Summary</h2>
            <div className="flex justify-between text-[14px] text-text-2 mb-3">
              <span>Subtotal</span><span>₹{total}</span>
            </div>
            <div className="flex justify-between text-[14px] text-text-2 mb-6">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-teal font-medium">Free</span> : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-[12px] text-teal mb-4">Add ₹{499 - total} more for free shipping</p>
            )}
            <div className="border-t border-[#D4C8B8] pt-5 mb-6">
              <div className="flex justify-between font-semibold text-[18px] text-navy">
                <span>Total</span><span>₹{total + shipping}</span>
              </div>
            </div>
            <Link href="/checkout"><Button className="w-full justify-center">Proceed to Checkout</Button></Link>
            <Link href="/shop" className="block text-center text-[12px] text-text-3 hover:text-text-1 mt-4 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run dev
```

Add a product from /shop, then visit /cart — items, qty stepper, summary, and checkout CTA.

- [ ] **Step 4: Commit**

```bash
git add components/cart/CartItem.tsx app/cart/page.tsx
git commit -m "feat: add Cart page with items and order summary"
```

---

### Task 16: Checkout Page

**Files:**
- Create: `components/checkout/CheckoutForm.tsx`
- Create: `app/checkout/page.tsx`
- Create: `lib/__tests__/checkout.test.ts`

- [ ] **Step 1: Write failing validation test**

```typescript
// lib/__tests__/checkout.test.ts
import { describe, it, expect } from 'vitest';
import { validateCheckoutForm } from '../checkout';

describe('validateCheckoutForm', () => {
  const valid = {
    name: 'Pete Saldanha',
    email: 'pete@example.com',
    phone: '9876543210',
    address: '123 MG Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560001',
  };

  it('returns no errors for valid data', () => {
    expect(validateCheckoutForm(valid)).toEqual({});
  });

  it('requires name', () => {
    const errors = validateCheckoutForm({ ...valid, name: '' });
    expect(errors.name).toBeTruthy();
  });

  it('requires valid email', () => {
    const errors = validateCheckoutForm({ ...valid, email: 'not-an-email' });
    expect(errors.email).toBeTruthy();
  });

  it('requires 10-digit phone', () => {
    const errors = validateCheckoutForm({ ...valid, phone: '123' });
    expect(errors.phone).toBeTruthy();
  });

  it('requires 6-digit pincode', () => {
    const errors = validateCheckoutForm({ ...valid, pincode: '123' });
    expect(errors.pincode).toBeTruthy();
  });
});
```

- [ ] **Step 2: Run test — expect FAIL**

```bash
npm run test:run lib/__tests__/checkout.test.ts
```

Expected: FAIL — "Cannot find module '../checkout'"

- [ ] **Step 3: Implement lib/checkout.ts**

```typescript
// lib/checkout.ts
export type CheckoutFields = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export type CheckoutErrors = Partial<Record<keyof CheckoutFields, string>>;

export function validateCheckoutForm(fields: CheckoutFields): CheckoutErrors {
  const errors: CheckoutErrors = {};
  if (!fields.name.trim())                              errors.name    = 'Name is required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email   = 'Valid email required';
  if (!/^\d{10}$/.test(fields.phone))                  errors.phone   = '10-digit phone required';
  if (!fields.address.trim())                           errors.address = 'Address is required';
  if (!fields.city.trim())                              errors.city    = 'City is required';
  if (!fields.state.trim())                             errors.state   = 'State is required';
  if (!/^\d{6}$/.test(fields.pincode))                 errors.pincode = '6-digit pincode required';
  return errors;
}
```

- [ ] **Step 4: Run test — expect PASS**

```bash
npm run test:run lib/__tests__/checkout.test.ts
```

Expected: PASS — 5 tests passing.

- [ ] **Step 5: Create CheckoutForm.tsx**

```tsx
// components/checkout/CheckoutForm.tsx
'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { validateCheckoutForm, type CheckoutFields } from '@/lib/checkout';
import { Button } from '@/components/ui/Button';

const EMPTY: CheckoutFields = { name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' };

const FIELDS: { key: keyof CheckoutFields; label: string; type?: string; full?: boolean }[] = [
  { key: 'name',    label: 'Full Name',    full: true },
  { key: 'email',   label: 'Email',        type: 'email' },
  { key: 'phone',   label: 'Phone',        type: 'tel' },
  { key: 'address', label: 'Address',      full: true },
  { key: 'city',    label: 'City' },
  { key: 'state',   label: 'State' },
  { key: 'pincode', label: 'PIN Code' },
];

export function CheckoutForm() {
  const [fields, setFields] = useState<CheckoutFields>(EMPTY);
  const [errors, setErrors] = useState<Partial<CheckoutFields>>({});
  const [submitted, setSubmitted] = useState(false);
  const clearCart = useCart(s => s.clearCart);

  const set = (key: keyof CheckoutFields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCheckoutForm(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <div className="text-[48px] mb-4">🌿</div>
        <h2 className="font-serif text-[28px] font-medium text-navy mb-3">Order Placed!</h2>
        <p className="text-text-2">Thank you, {fields.name.split(' ')[0]}. We'll send a confirmation to {fields.email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="font-serif text-[22px] font-medium text-navy mb-6">Delivery Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {FIELDS.map(f => (
          <div key={f.key} className={f.full ? 'col-span-2' : ''}>
            <label className="block text-[11px] font-medium tracking-[1px] uppercase text-text-3 mb-1.5">{f.label}</label>
            <input
              type={f.type ?? 'text'}
              value={fields[f.key]}
              onChange={set(f.key)}
              className={`w-full px-4 py-3 rounded-lg border text-[14px] text-text-1 bg-white outline-none transition-shadow ${
                errors[f.key]
                  ? 'border-red-400 shadow-[0_0_0_2px_rgba(239,68,68,0.15)]'
                  : 'border-[#D4C8B8] focus:shadow-[0_0_0_2px_theme(colors.teal.DEFAULT),0_0_0_4px_rgba(0,132,147,0.1)]'
              }`}
            />
            {errors[f.key] && <p className="text-[11px] text-red-500 mt-1">{errors[f.key]}</p>}
          </div>
        ))}
      </div>
      <div className="mt-6 p-5 bg-cream rounded-xl border border-[#E5DDD0]">
        <div className="text-[11px] font-semibold tracking-[2px] uppercase text-text-3 mb-2">Payment</div>
        <div className="flex items-center gap-3 text-[14px] text-text-2">
          <div className="w-4 h-4 rounded-full border-2 border-teal flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-teal" />
          </div>
          Cash on Delivery
        </div>
      </div>
      <Button type="submit" className="w-full justify-center mt-6">Place Order</Button>
    </form>
  );
}
```

- [ ] **Step 6: Create app/checkout/page.tsx**

```tsx
// app/checkout/page.tsx
'use client';

import { useCart } from '@/lib/cart';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const total    = totalPrice();
  const shipping = total >= 499 ? 0 : 99;

  return (
    <div className="min-h-screen bg-cream px-20 py-14">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-10">
          <Link href="/cart" className="text-[12px] text-text-3 hover:text-text-1 transition-colors">← Back to Bag</Link>
          <h1 className="font-serif text-[36px] font-medium text-navy mt-2">Checkout</h1>
        </div>
        <div className="grid grid-cols-[1fr_380px] gap-12">
          <CheckoutForm />
          {/* Order summary */}
          <div className="bg-ivory rounded-2xl p-8 border border-[#E5DDD0] h-fit">
            <h2 className="font-serif text-[20px] font-medium text-navy mb-5">Order ({items.length} items)</h2>
            <div className="flex flex-col gap-4 mb-6">
              {items.map(({ product: p, quantity }) => (
                <div key={p.id} className="flex gap-3 items-center">
                  <div className="w-14 h-14 bg-cream rounded-lg flex items-center justify-center flex-shrink-0 border border-[#E5DDD0]">
                    <Image src={p.images.card} alt={p.name} width={44} height={50} className="h-[80%] w-auto object-contain" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-navy truncate">{p.name}</div>
                    <div className="text-[11px] text-text-3">Qty: {quantity}</div>
                  </div>
                  <span className="text-[14px] font-semibold text-terracotta flex-shrink-0">₹{p.price * quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#D4C8B8] pt-4">
              <div className="flex justify-between text-[13px] text-text-2 mb-2"><span>Subtotal</span><span>₹{total}</span></div>
              <div className="flex justify-between text-[13px] text-text-2 mb-4"><span>Shipping</span><span>{shipping === 0 ? <span className="text-teal">Free</span> : `₹${shipping}`}</span></div>
              <div className="flex justify-between font-semibold text-[18px] text-navy"><span>Total</span><span>₹{total + shipping}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 7: Run all tests**

```bash
npm run test:run
```

Expected: All 14 tests pass (products: 5, cart: 9, checkout: 5 — minus 5 cart = 14 total across 3 suites).

- [ ] **Step 8: Verify full flow**

```bash
npm run dev
```

Walk through: Home → Shop → Product Detail (add to cart) → Cart → Checkout (fill form → Place Order → confirmation).

- [ ] **Step 9: Final commit**

```bash
git add components/checkout/ app/checkout/ lib/checkout.ts lib/__tests__/checkout.test.ts
git commit -m "feat: add Checkout page with validation and order confirmation"
```

---

## Self-Review

**Spec coverage check:**
- ✅ Home page — all 10 sections, real photos, animations
- ✅ Shop page — grid + category filter
- ✅ Product Detail — image, info, add-to-cart, related products
- ✅ Cart — items, qty stepper, summary, free shipping threshold
- ✅ Checkout — form, validation, order summary, confirmation

**Placeholder scan:**
- No TBD, TODO, or "implement later" — all steps include complete code
- All type references are consistent across tasks

**Type consistency:**
- `Product.id` used in cart as `productId` parameter — consistent ✅
- `useCart` selector pattern used consistently ✅
- `CheckoutFields` type defined in `lib/checkout.ts`, imported in `CheckoutForm.tsx` ✅
- `generateProductParams` exported from `lib/products.ts`, imported in `[slug]/page.tsx` ✅
