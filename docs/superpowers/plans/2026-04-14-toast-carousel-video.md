# Toast Notifications, Hero Carousel & Floating Video Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add branded toast notifications for cart/wishlist actions, replace the static Hero with a 5-slide auto-advancing carousel, and add a floating video widget that appears after 4s.

**Architecture:** Toast system uses a Zustand store (no persist) + React portal rendered into `document.body`. Toasts are triggered from UI call sites — never from inside the stores — to avoid circular imports. HeroCarousel replaces `Hero.tsx` with a `'use client'` component managing slide state via `useState` + `setInterval`. FloatingVideo is a self-contained `'use client'` component with `sessionStorage` dismiss.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, Zustand 5, React portal (`createPortal`), CSS animations

---

## File Map

| File | Action |
|---|---|
| `app/globals.css` | Modify — add `toast-slide-in` + `toast-progress` keyframes |
| `lib/toast.ts` | Create — Zustand toast store |
| `components/ui/Toast.tsx` | Create — single toast card component |
| `components/ui/ToastContainer.tsx` | Create — portal container, top-right |
| `app/layout.tsx` | Modify — add `<ToastContainer />` + `<FloatingVideo />` |
| `components/shop/ProductCard.tsx` | Modify — fire toast on addItem + wishlist toggle |
| `components/home/Bestsellers.tsx` | Modify — fire toast on Quick Add |
| `components/shop/QuickViewModal.tsx` | Modify — fire toast on addItem |
| `components/product/ProductInfo.tsx` | Modify — fire toast on handleAdd + wishlist toggle |
| `components/home/HeroCarousel.tsx` | Create — 5-slide carousel |
| `app/page.tsx` | Modify — swap `<Hero />` for `<HeroCarousel />` |
| `components/ui/FloatingVideo.tsx` | Create — floating video widget |

---

## Task 1: Add toast CSS animations to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add animations after the existing `.pulse-teal` block**

Open `app/globals.css`. After line 114 (`.pulse-teal { ... }`), add:

```css
/* Toast notifications */
@keyframes toast-slide-in {
  from { transform: translateX(110%); opacity: 0; }
  to   { transform: translateX(0);    opacity: 1; }
}
.toast-slide-in { animation: toast-slide-in 0.25s cubic-bezier(0.16,1,0.3,1) forwards; }

@keyframes toast-progress { to { width: 0%; } }
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add toast-slide-in and toast-progress CSS animations"
```

---

## Task 2: Create toast Zustand store

**Files:**
- Create: `lib/toast.ts`

- [ ] **Step 1: Create the file**

```ts
// lib/toast.ts
import { create } from 'zustand';

export type ToastType = 'cart-add' | 'cart-update' | 'wishlist-add' | 'wishlist-remove';

export interface Toast {
  id: string;
  type: ToastType;
  productName: string;
  count?: number;    // total cart items OR total wishlist items
  quantity?: number; // for cart-update: new qty of this specific product
}

interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
}

export const useToast = create<ToastStore>((set) => ({
  toasts: [],
  add: (toast) =>
    set((state) => ({
      toasts: [
        { ...toast, id: Date.now().toString(36) + Math.random().toString(36).slice(2) },
        ...state.toasts,
      ].slice(0, 3),
    })),
  remove: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
```

- [ ] **Step 2: Commit**

```bash
git add lib/toast.ts
git commit -m "feat: add toast Zustand store"
```

---

## Task 3: Create Toast card component

**Files:**
- Create: `components/ui/Toast.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ui/Toast.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Toast as ToastData } from '@/lib/toast';

type Config = {
  borderColor: string;
  labelColor: string;
  label: string;
  ctaText?: string;
  ctaHref?: string;
};

const CONFIG: Record<ToastData['type'], Config> = {
  'cart-add': {
    borderColor: '#2A7A6A',
    labelColor: '#2A7A6A',
    label: 'Added to Bag',
    ctaText: 'View Bag',
    ctaHref: '/cart',
  },
  'cart-update': {
    borderColor: '#2A7A6A',
    labelColor: '#2A7A6A',
    label: 'Bag Updated',
    ctaText: 'View Bag',
    ctaHref: '/cart',
  },
  'wishlist-add': {
    borderColor: '#C07B3A',
    labelColor: '#C07B3A',
    label: 'Saved to Wishlist',
    ctaText: 'View Wishlist',
    ctaHref: '/wishlist',
  },
  'wishlist-remove': {
    borderColor: '#9A8F84',
    labelColor: '#9A8F84',
    label: 'Removed from Wishlist',
  },
};

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: string) => void;
}) {
  const cfg = CONFIG[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const countLine = (() => {
    if (toast.type === 'cart-add') {
      return `${toast.count} item${toast.count !== 1 ? 's' : ''} in your bag`;
    }
    if (toast.type === 'cart-update') {
      return `${toast.productName} ×${toast.quantity} · ${toast.count} item${toast.count !== 1 ? 's' : ''} in your bag`;
    }
    if (toast.type === 'wishlist-add') {
      return `${toast.count} item${toast.count !== 1 ? 's' : ''} saved`;
    }
    return null;
  })();

  return (
    <div
      className="flex flex-col overflow-hidden rounded-r-xl shadow-[0_6px_28px_rgba(0,0,0,0.11)]"
      style={{ borderLeft: `3px solid ${cfg.borderColor}`, background: '#F5F0E8', width: 280 }}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="flex-1 min-w-0">
          <div
            className="text-[11px] font-bold tracking-[1.5px] uppercase mb-1"
            style={{ color: cfg.labelColor }}
          >
            {cfg.label}
          </div>
          <div className="font-serif text-[13px] text-navy leading-snug truncate">
            {toast.type === 'cart-update' ? '' : toast.productName}
          </div>
          {countLine && (
            <div className="text-[11px] text-text-3 mt-1 leading-snug">
              {countLine}
              {cfg.ctaHref && (
                <>
                  {' · '}
                  <Link
                    href={cfg.ctaHref}
                    className="font-semibold hover:underline"
                    style={{ color: cfg.labelColor }}
                  >
                    {cfg.ctaText} →
                  </Link>
                </>
              )}
            </div>
          )}
          {/* cart-update: show product name below the count line */}
          {toast.type !== 'cart-update' ? null : (
            <div className="font-serif text-[13px] text-navy leading-snug truncate mt-0.5">
              {toast.productName}
            </div>
          )}
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss notification"
          className="w-6 h-6 rounded-full border border-[#D4C8B8] flex items-center justify-center text-text-3 text-[13px] flex-shrink-0 mt-0.5 cursor-none hover:border-[#B4A898] transition-colors"
        >
          ×
        </button>
      </div>
      {/* Progress bar */}
      <div className="h-[2px]" style={{ background: '#E5DDD0' }}>
        <div
          className="h-full"
          style={{
            background: cfg.borderColor,
            width: '100%',
            animation: 'toast-progress 3s linear forwards',
          }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/Toast.tsx
git commit -m "feat: add Toast card component"
```

---

## Task 4: Create ToastContainer portal

**Files:**
- Create: `components/ui/ToastContainer.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ui/ToastContainer.tsx
'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '@/lib/toast';
import { Toast } from '@/components/ui/Toast';

export function ToastContainer() {
  const { toasts, remove } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-slide-in pointer-events-auto">
          <Toast toast={toast} onDismiss={remove} />
        </div>
      ))}
    </div>,
    document.body
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/ToastContainer.tsx
git commit -m "feat: add ToastContainer portal"
```

---

## Task 5: Wire ToastContainer into layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add import and component**

Add to the imports at the top:
```tsx
import { ToastContainer } from '@/components/ui/ToastContainer';
```

Inside `<body>`, add `<ToastContainer />` after `<Footer />`:
```tsx
      <body className="font-sans bg-cream text-text-1 antialiased overflow-x-hidden cursor-none">
        <WelcomeBanner />
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ToastContainer />
      </body>
```

- [ ] **Step 2: Start dev server and verify no crash**

```bash
npm run dev
```

Open http://localhost:3000. Page should load with no console errors. No toasts visible yet.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: mount ToastContainer in root layout"
```

---

## Task 6: Wire toast into ProductCard

**Files:**
- Modify: `components/shop/ProductCard.tsx`

- [ ] **Step 1: Update the component**

Replace the full file content:

```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import { useToast } from '@/lib/toast';
import type { Product } from '@/lib/products';
import { QuickViewModal } from '@/components/shop/QuickViewModal';

export function ProductCard({ product: p }: { product: Product }) {
  const addItem = useCart(s => s.addItem);
  const { toggle, has } = useWishlist();
  const addToast = useToast(s => s.add);
  const [quickViewOpen, setQuickViewOpen] = useState(false);

  function handleAddToCart() {
    const wasInCart = useCart.getState().items.some(i => i.product.id === p.id);
    addItem(p);
    const newCount = useCart.getState().totalItems();
    if (wasInCart) {
      const newQty = useCart.getState().items.find(i => i.product.id === p.id)?.quantity ?? 1;
      addToast({ type: 'cart-update', productName: p.name, count: newCount, quantity: newQty });
    } else {
      addToast({ type: 'cart-add', productName: p.name, count: newCount });
    }
  }

  function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault();
    const wasWishlisted = has(p.id);
    toggle(p);
    const newCount = useWishlist.getState().items.length;
    if (wasWishlisted) {
      addToast({ type: 'wishlist-remove', productName: p.name });
    } else {
      addToast({ type: 'wishlist-add', productName: p.name, count: newCount });
    }
  }

  return (
    <div className="bg-ivory rounded-xl overflow-hidden border border-[#E5DDD0] shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-1.5 hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px] transition-all duration-300 group relative">
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
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewOpen(true); }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-navy text-[10px] font-semibold tracking-[1.5px] uppercase px-4 py-2 rounded-full border border-[#E5DDD0] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 cursor-none whitespace-nowrap z-10"
          >
            Quick View
          </button>
        </div>
      </Link>
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-none ${
          has(p.id)
            ? 'bg-terracotta text-white shadow-md'
            : 'bg-white/80 text-text-3 hover:bg-white hover:text-terracotta'
        }`}
        aria-label={has(p.id) ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={has(p.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      <div className="p-5">
        <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-camel mb-1.5">{p.categoryLabel}</div>
        <Link href={`/products/${p.slug}`}>
          <div className="font-serif text-[17px] font-medium text-navy mb-1.5 leading-[1.25] hover:text-terracotta transition-colors">{p.name}</div>
        </Link>
        <div className="text-[13px] leading-relaxed text-text-2 mb-4 line-clamp-2">{p.description}</div>
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-semibold text-terracotta">₹{p.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={!p.inStock}
            className="px-4 py-2 text-[10px] font-semibold tracking-wide uppercase rounded-lg transition-all cursor-none disabled:cursor-not-allowed bg-terracotta text-white hover:opacity-90 disabled:bg-[#D4C8B8] disabled:text-text-3"
          >
            {p.inStock ? 'Add to Bag' : 'Out of Stock'}
          </button>
        </div>
      </div>
      {quickViewOpen && (
        <QuickViewModal product={p} onClose={() => setQuickViewOpen(false)} />
      )}
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

Go to http://localhost:3000/shop. Click "Add to Bag" on any product card. A cream toast with teal left-border should slide in from top-right saying "Added to Bag · [product name] · 1 item in your bag · View Bag →". Click the wishlist heart — a terracotta toast should appear.

- [ ] **Step 3: Commit**

```bash
git add components/shop/ProductCard.tsx
git commit -m "feat: wire cart and wishlist toasts into ProductCard"
```

---

## Task 7: Wire toast into Bestsellers

**Files:**
- Modify: `components/home/Bestsellers.tsx`

- [ ] **Step 1: Add toast import and wire the Quick Add button**

Add import at top:
```tsx
import { useToast } from '@/lib/toast';
```

Add inside the `Bestsellers` function, after `const addItem = useCart(s => s.addItem);`:
```tsx
  const addToast = useToast(s => s.add);

  function handleQuickAdd(p: Product) {
    const wasInCart = useCart.getState().items.some(i => i.product.id === p.id);
    addItem(p);
    const newCount = useCart.getState().totalItems();
    if (wasInCart) {
      const newQty = useCart.getState().items.find(i => i.product.id === p.id)?.quantity ?? 1;
      addToast({ type: 'cart-update', productName: p.name, count: newCount, quantity: newQty });
    } else {
      addToast({ type: 'cart-add', productName: p.name, count: newCount });
    }
  }
```

Change the Quick Add button's onClick from `() => addItem(p)` to `() => handleQuickAdd(p)`:
```tsx
                  <button
                    onClick={() => handleQuickAdd(p)}
                    className="absolute bottom-0 left-0 right-0 bg-terracotta text-white text-[11px] font-semibold tracking-[1.5px] uppercase py-3.5 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-none"
                  >
                    Quick Add to Bag
                  </button>
```

Also add the `Product` type import since it's used in the function signature. It's already imported via `type { Product }` in the file, so no change needed there.

- [ ] **Step 2: Commit**

```bash
git add components/home/Bestsellers.tsx
git commit -m "feat: wire cart toast into Bestsellers Quick Add"
```

---

## Task 8: Wire toast into QuickViewModal

**Files:**
- Modify: `components/shop/QuickViewModal.tsx`

- [ ] **Step 1: Add toast import and wire addItem call (line 133)**

Add import at top:
```tsx
import { useToast } from '@/lib/toast';
```

Add inside `QuickViewModal`, after `const addItem = useCart(s => s.addItem);`:
```tsx
  const addToast = useToast(s => s.add);

  function handleAddToCart() {
    const wasInCart = useCart.getState().items.some(i => i.product.id === p.id);
    addItem(p);
    const newCount = useCart.getState().totalItems();
    if (wasInCart) {
      const newQty = useCart.getState().items.find(i => i.product.id === p.id)?.quantity ?? 1;
      addToast({ type: 'cart-update', productName: p.name, count: newCount, quantity: newQty });
    } else {
      addToast({ type: 'cart-add', productName: p.name, count: newCount });
    }
  }
```

Change the Add to Bag button's onClick from `() => { addItem(p); }` to `handleAddToCart`:
```tsx
                onClick={handleAddToCart}
```

- [ ] **Step 2: Commit**

```bash
git add components/shop/QuickViewModal.tsx
git commit -m "feat: wire cart toast into QuickViewModal"
```

---

## Task 9: Wire toast into ProductInfo

**Files:**
- Modify: `components/product/ProductInfo.tsx`

- [ ] **Step 1: Add toast import and update handleAdd + wishlist toggle**

Add import at top:
```tsx
import { useToast } from '@/lib/toast';
```

Add inside `ProductInfo`, after the existing hooks:
```tsx
  const addToast = useToast(s => s.add);
```

Replace the existing `handleAdd` function:
```tsx
  const handleAdd = () => {
    const current = useCart.getState().items.find(i => i.product.id === p.id);
    if (current) {
      const newQty = current.quantity + qty;
      updateQuantity(p.id, newQty);
      const newCount = useCart.getState().totalItems();
      addToast({ type: 'cart-update', productName: p.name, count: newCount, quantity: newQty });
    } else {
      addItem(p);
      if (qty > 1) updateQuantity(p.id, qty);
      const newCount = useCart.getState().totalItems();
      addToast({ type: 'cart-add', productName: p.name, count: newCount });
    }
  };
```

Replace the wishlist `onClick` on the Save button:
```tsx
          onClick={() => {
            const wasWishlisted = has(p.id);
            toggle(p);
            const newCount = useWishlist.getState().items.length;
            if (wasWishlisted) {
              addToast({ type: 'wishlist-remove', productName: p.name });
            } else {
              addToast({ type: 'wishlist-add', productName: p.name, count: newCount });
            }
          }}
```

- [ ] **Step 2: Verify toast on PDP**

Go to http://localhost:3000/shop, click any product to reach the PDP. Click "Add to Bag" — teal toast appears. Click the Save button — terracotta toast appears.

- [ ] **Step 3: Commit**

```bash
git add components/product/ProductInfo.tsx
git commit -m "feat: wire cart and wishlist toasts into ProductInfo"
```

---

## Task 10: Create HeroCarousel component

**Files:**
- Create: `components/home/HeroCarousel.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/home/HeroCarousel.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CTA = {
  text: string;
  href: string;
  variant: 'primary' | 'ghost' | 'dark' | 'terracotta' | 'teal';
};

type Slide = {
  id: number;
  bg: string;
  label: string;
  headline: string[];
  accentLine: number | null; // index of headline line shown in accent colour
  sub: string;
  ctas: CTA[];
  image: string | null;
  darkText: boolean; // false = navy text, true = cream text
  press?: string[];
  attribution?: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    bg: 'linear-gradient(120deg, #1A2744 60%, #2A4070)',
    label: '',
    headline: ['Clinically Crafted', 'Ayurveda', 'for the Active Body'],
    accentLine: 1,
    sub: '',
    ctas: [
      { text: 'Shop All', href: '/shop', variant: 'primary' },
      { text: 'Our Story', href: '/about', variant: 'ghost' },
    ],
    image: '/images/hero-model.png',
    darkText: false,
  },
  {
    id: 2,
    bg: 'linear-gradient(120deg, #F5F0E8 60%, #EDE5D8)',
    label: 'Pre-Sport Ritual',
    headline: ['Thavare', 'Body Wash'],
    accentLine: null,
    sub: 'Clean. Revive. Go.',
    ctas: [{ text: 'Shop Body Wash — ₹499', href: '/products/thavare-body-wash', variant: 'dark' }],
    image: '/images/prod-bodywash-botanicals.png',
    darkText: true,
  },
  {
    id: 3,
    bg: 'linear-gradient(120deg, #2A3C2A 60%, #3A5034)',
    label: 'Outdoor Protection',
    headline: ['Thavare', 'Sun Screen'],
    accentLine: null,
    sub: 'Train outdoors. Stay protected. Always.',
    ctas: [{ text: 'Shop Sun Screen — ₹599', href: '/products/thavare-sun-screen', variant: 'terracotta' }],
    image: '/images/prod-sunscreen.png',
    darkText: false,
  },
  {
    id: 4,
    bg: 'linear-gradient(120deg, #F0EBE0 60%, #EAE0D0)',
    label: 'Personalised For You',
    headline: ['Find Your', 'Perfect Routine'],
    accentLine: null,
    sub: 'Answer 5 questions. Get your Ayurvedic match.',
    ctas: [{ text: 'Take the Quiz →', href: '/quiz', variant: 'teal' }],
    image: null,
    darkText: true,
  },
  {
    id: 5,
    bg: 'linear-gradient(120deg, #1A2744 60%, #14203A)',
    label: '',
    headline: ['"The active skincare brand', 'rewriting Ayurvedic rules"'],
    accentLine: null,
    sub: '',
    ctas: [],
    image: null,
    darkText: false,
    press: ['Vogue India', 'The Hindu', 'Femina', 'Healthshots'],
    attribution: '— Vogue India',
  },
];

const CTA_STYLES: Record<CTA['variant'], string> = {
  primary:    'bg-[#E8A87C] text-navy font-bold',
  ghost:      'border border-cream/50 text-cream hover:border-cream',
  dark:       'bg-navy text-cream hover:bg-navy/90',
  terracotta: 'bg-[#E8A87C] text-navy font-bold hover:opacity-90',
  teal:       'bg-[#2A7A6A] text-cream hover:opacity-90',
};

const INTERVAL_MS = 5000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);

  const goTo = useCallback((idx: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(idx);
      setFading(false);
    }, 300);
  }, []);

  const next = useCallback(() => goTo((active + 1) % SLIDES.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + SLIDES.length) % SLIDES.length), [active, goTo]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = SLIDES[active];
  const textBase = slide.darkText ? 'text-navy' : 'text-cream';
  const labelColor = slide.darkText ? 'text-[#2A7A6A]' : 'text-[#C4A882]';

  return (
    <section
      className="relative w-full h-[100svh] min-h-[560px] max-h-[900px] overflow-hidden select-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: slide.bg, opacity: fading ? 0 : 1 }}
      />

      {/* Content */}
      <div
        className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.3s' }}
      >
        <div className="flex-1 max-w-[560px]">
          {slide.label && (
            <div className={`text-[10px] font-semibold tracking-[3px] uppercase mb-4 ${labelColor}`}>
              {slide.label}
            </div>
          )}
          <h1 className={`font-serif text-[clamp(36px,5vw,72px)] font-medium leading-[1.08] mb-4 ${textBase}`}>
            {slide.headline.map((line, i) => (
              <span key={i} className="block">
                {slide.accentLine === i
                  ? <em className="italic text-[#E8A87C] not-italic">{line}</em>
                  : line}
              </span>
            ))}
          </h1>
          {slide.sub && (
            <p className={`text-[16px] leading-relaxed mb-8 ${slide.darkText ? 'text-[#7A6E63]' : 'text-cream/65'}`}>
              {slide.sub}
            </p>
          )}
          {slide.press && (
            <p className={`text-[13px] mb-6 ${slide.darkText ? 'text-[#7A6E63]' : 'text-cream/50'}`}>
              {slide.attribution}
            </p>
          )}
          {slide.ctas.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {slide.ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className={`px-6 py-3 rounded-lg text-[11px] tracking-[1.5px] uppercase transition-all duration-200 cursor-none ${CTA_STYLES[cta.variant]}`}
                >
                  {cta.text}
                </Link>
              ))}
            </div>
          )}
          {slide.press && (
            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-8">
              {slide.press.map((name) => (
                <span key={name} className="text-[12px] font-semibold text-[#C4A882]">{name}</span>
              ))}
            </div>
          )}
        </div>
        {slide.image && (
          <div className="hidden md:flex flex-1 items-center justify-center">
            <Image
              src={slide.image}
              alt={slide.headline.join(' ')}
              width={320}
              height={420}
              className="h-[65vh] w-auto object-contain drop-shadow-2xl"
              priority
            />
          </div>
        )}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-none opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-none opacity-0 hover:opacity-100 focus:opacity-100"
      >
        ›
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-[3px] rounded-full transition-all duration-300 cursor-none ${
              i === active
                ? 'w-6 bg-white'
                : 'w-[6px] bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/home/HeroCarousel.tsx
git commit -m "feat: add HeroCarousel with 5 slides, auto-advance, dot indicators"
```

---

## Task 11: Swap Hero for HeroCarousel in page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update the import and JSX**

Change line 2 from:
```tsx
import { Hero }            from '@/components/home/Hero';
```
to:
```tsx
import { HeroCarousel }    from '@/components/home/HeroCarousel';
```

Change line 54 from:
```tsx
      <Hero />
```
to:
```tsx
      <HeroCarousel />
```

- [ ] **Step 2: Verify in browser**

Go to http://localhost:3000. The homepage should now show the 5-slide carousel. Slides auto-advance every 5s. Hovering pauses it. Dot indicators at bottom. Prev/Next arrows visible on hover.

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: replace static Hero with HeroCarousel on homepage"
```

---

## Task 12: Create FloatingVideo component

**Files:**
- Create: `components/ui/FloatingVideo.tsx`

- [ ] **Step 1: Create the file**

```tsx
// components/ui/FloatingVideo.tsx
'use client';

import { useState, useEffect } from 'react';

const VIDEO_URL =
  process.env.NEXT_PUBLIC_BRAND_VIDEO_URL ??
  'https://videos.pexels.com/video-files/5322089/5322089-sd_640_360_25fps.mp4';

type Status = 'hidden' | 'expanded' | 'minimised';

export function FloatingVideo() {
  const [status, setStatus] = useState<Status>('hidden');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (sessionStorage.getItem('thavare-video-dismissed')) return;
    const timer = setTimeout(() => setStatus('expanded'), 4000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setStatus('hidden');
    sessionStorage.setItem('thavare-video-dismissed', '1');
  }

  if (status === 'hidden') return null;

  if (status === 'minimised') {
    return (
      <button
        onClick={() => setStatus('expanded')}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full bg-navy shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex items-center justify-center cursor-none hover:scale-105 transition-transform toast-slide-in"
        aria-label="Expand video"
      >
        <span className="text-cream text-xl leading-none">▶</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9998] w-[220px] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)] toast-slide-in">
      <div className="relative bg-navy-deep">
        <video
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-[124px] object-cover"
        />
        <div className="absolute top-1.5 right-1.5 flex gap-1">
          <button
            onClick={() => setStatus('minimised')}
            aria-label="Minimise video"
            className="w-5 h-5 rounded bg-black/60 text-white text-[11px] flex items-center justify-center cursor-none hover:bg-black/80 transition-colors leading-none"
          >
            −
          </button>
          <button
            onClick={dismiss}
            aria-label="Dismiss video"
            className="w-5 h-5 rounded bg-black/60 text-white text-[11px] flex items-center justify-center cursor-none hover:bg-black/80 transition-colors leading-none"
          >
            ×
          </button>
        </div>
      </div>
      <div className="px-3 py-2.5 bg-navy">
        <div className="text-[9px] text-camel/60 uppercase tracking-[1px] mb-0.5">Now Playing</div>
        <div className="font-serif text-[12px] text-cream leading-snug">Thavare — The Active Ritual</div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ui/FloatingVideo.tsx
git commit -m "feat: add FloatingVideo widget with expand/minimise/dismiss"
```

---

## Task 13: Wire FloatingVideo into layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Add import and component**

Add import:
```tsx
import { FloatingVideo } from '@/components/ui/FloatingVideo';
```

Add `<FloatingVideo />` after `<ToastContainer />`:
```tsx
        <ToastContainer />
        <FloatingVideo />
```

- [ ] **Step 2: Verify in browser**

Go to http://localhost:3000 and wait 4 seconds. The video widget should slide up from the bottom-right corner, play a muted video. Click − to minimise to a circle. Click the circle to re-expand. Click × to dismiss. Refresh — widget should NOT reappear (sessionStorage persists within the tab session). Open a new tab — it should reappear after 4s.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: mount FloatingVideo in root layout"
```

---

## Self-Review Notes

- All toast types (`cart-add`, `cart-update`, `wishlist-add`, `wishlist-remove`) covered ✓
- `useCart.getState()` used post-mutation to get accurate count ✓
- `useWishlist.getState()` used post-toggle to get accurate count ✓
- `cart-update` toast shows product name + new quantity correctly ✓
- Carousel `accentLine` is `null` not `undefined` for explicit falsy checks ✓
- FloatingVideo checks `sessionStorage` on mount, cleans up `setTimeout` on unmount ✓
- `toast-slide-in` class reused for FloatingVideo entry animation ✓
- All file paths are exact ✓
