# Thavare UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign Thavare's homepage and shop components from a dark-navy-dominant aesthetic to a warm cream-dominant luxury style matching Forest Essentials, using espresso-amber brand moments, botanical SVG icons, gold accents, and a ring-shadow depth system.

**Architecture:** Pure visual/CSS component changes — no logic, routing, state management, or API changes. Each task is a self-contained file edit with a visual verification step at `http://localhost:3000`. No existing tests are affected; no new tests needed for pure style changes.

**Tech Stack:** Next.js 15 App Router, Tailwind CSS v4, TypeScript, React SVG components.

**Spec:** `docs/superpowers/specs/2026-04-15-ui-redesign-design.md`

---

## File Map

| Task | Files |
|------|-------|
| 1 | `components/ui/icons/botanical/index.tsx` (create) |
| 2 | `components/home/HeroCarousel.tsx` (modify) |
| 3 | `components/layout/Navbar.tsx` (modify) |
| 4 | `app/page.tsx` (modify) |
| 5 | `components/home/Bestsellers.tsx` (modify), `components/ui/Button.tsx` (modify) |
| 6 | `components/home/ValuesSection.tsx` (modify) |
| 7 | `components/home/WhySection.tsx` (modify) |
| 8 | `components/home/PressStrip.tsx` (modify) |
| 9 | `components/shop/ProductCard.tsx` (modify) |
| 10 | `components/home/NewArrivals.tsx` (modify), `components/home/CategoryGrid.tsx` (modify), `components/home/Newsletter.tsx` (modify) |

---

## Task 1: Botanical SVG Icon Components

**Files:**
- Create: `components/ui/icons/botanical/index.tsx`

- [ ] **Step 1: Create the botanical icons file**

Create `components/ui/icons/botanical/index.tsx` with this exact content:

```tsx
// components/ui/icons/botanical/index.tsx

type IconProps = { className?: string };

const STROKE = { stroke: '#A87A53', strokeWidth: '1.2', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

export function BotanicalLeaf({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M2 22c0 0 7-2 10-10S20 2 20 2C10 2 2 10 2 22z" />
      <path d="M12 12L2 22" />
      <path d="M7 17c2-2 4-3 5-3" />
      <path d="M5 13c2-3 6-4 7-4" />
    </svg>
  );
}

export function BotanicalFlask({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M10 2h4" />
      <path d="M10 2v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V2" />
      <path d="M7 17c1.5-1 3.5-1 5 0s3.5 1 5 0" />
    </svg>
  );
}

export function BotanicalWave({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M2 12c2-5 4-5 5 0s3 5 5 0 3-5 5 0 2.5 2.5 3 3" />
      <path d="M2 17c1-2 2-3 3-2" />
      <path d="M19 5c0 0 1 2 1 4" />
    </svg>
  );
}

export function BotanicalStrength({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M3 20L9 9L12 15L15 9L21 20" />
      <path d="M3 20h18" />
      <path d="M9 9c0-2 1-4 3-5" />
      <path d="M15 9c0-2-1-4-3-5" />
    </svg>
  );
}

export function BotanicalWalk({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <circle cx="13" cy="4" r="1.5" />
      <path d="M9 20l2-6 3 3 3-8" />
      <path d="M7 13l2-4 4 1 3-3" />
    </svg>
  );
}

export function BotanicalHerb({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M12 22V12" />
      <path d="M12 12c0 0-4-1-6-5s4-6 6-5c2-1 8 1 6 5s-6 5-6 5z" />
      <path d="M12 16c0 0-3 1-4 3" />
      <path d="M12 16c0 0 3 1 4 3" />
    </svg>
  );
}

export function BotanicalMicroscope({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14V4l3 2 3-2v10" />
      <path d="M7 7h4" />
    </svg>
  );
}
```

- [ ] **Step 2: Verify the file compiles — run dev server**

```bash
cd D:/Projects/thavare && npm run dev
```

Expected: Server starts at `http://localhost:3000` with no TypeScript errors. The icons aren't used yet so nothing visual to check.

- [ ] **Step 3: Commit**

```bash
cd D:/Projects/thavare && git add components/ui/icons/botanical/index.tsx && git commit -m "feat: add botanical SVG icon set (leaf, flask, wave, strength, walk, herb, microscope)"
```

---

## Task 2: Hero Carousel Redesign

**Files:**
- Modify: `components/home/HeroCarousel.tsx`

- [ ] **Step 1: Update SLIDES — backgrounds, darkText, CTAs**

Replace the entire `SLIDES` constant with:

```ts
const SLIDES: Slide[] = [
  {
    id: 1,
    bg: '#3D1F0A',
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
    bg: '#F5F0E8',
    label: 'Pre-Sport Ritual',
    headline: ['Thavare', 'Body Wash'],
    accentLine: null,
    sub: 'Clean. Revive. Go.',
    ctas: [{ text: 'Shop Body Wash — ₹1,200', href: '/products/thavare-body-wash', variant: 'dark' }],
    image: '/images/prod-bodywash-botanicals.png',
    darkText: true,
  },
  {
    id: 3,
    bg: '#F0EAD8',
    label: 'Outdoor Protection',
    headline: ['Thavare', 'Sun Screen'],
    accentLine: null,
    sub: 'Train outdoors. Stay protected. Always.',
    ctas: [{ text: 'Shop Sun Screen — ₹1,100', href: '/products/thavare-sun-screen', variant: 'dark' }],
    image: '/images/prod-sunscreen.png',
    darkText: true,
  },
  {
    id: 4,
    bg: '#F5F0E8',
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
    bg: '#3D1F0A',
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
```

- [ ] **Step 2: Update CTA_STYLES**

Replace the `CTA_STYLES` constant with:

```ts
const CTA_STYLES: Record<CTA['variant'], string> = {
  primary:    'bg-[#C4A882] text-[#3D1F0A] font-bold hover:opacity-90',
  ghost:      'border border-[rgba(196,168,130,0.4)] text-cream hover:border-[#C4A882]',
  dark:       'bg-navy text-cream hover:bg-navy/90',
  terracotta: 'bg-[#B35F42] text-white font-bold hover:opacity-90',
  teal:       'bg-[#2A7A6A] text-cream hover:opacity-90',
};
```

- [ ] **Step 3: Update derived color variables and add gold hairlines**

Find the block starting with `const slide = SLIDES[active];` and replace it:

```tsx
  const slide = SLIDES[active];
  const textBase = slide.darkText ? 'text-navy' : 'text-cream';
  const labelColor = slide.darkText ? 'text-[#008493]' : 'text-[#C4A882]';
```

Then find the Background `<div>` and the content `<div>`. The content div currently starts with:
```tsx
      {/* Content */}
      <div
        className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto"
```

Add the gold hairlines as absolute elements INSIDE the section, just before the Background div:

```tsx
      {/* Gold hairlines — dark slides only */}
      {!slide.darkText && (
        <>
          <div
            className="absolute top-5 left-6 md:left-16 right-6 md:right-16 h-px z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #C4A882, transparent)' }}
          />
          <div
            className="absolute bottom-9 left-6 md:left-16 right-6 md:right-16 h-px z-10 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #C4A882, transparent)' }}
          />
        </>
      )}
```

- [ ] **Step 4: Update label letter-spacing**

Find the label element:
```tsx
            <div className={`text-[10px] font-semibold tracking-[3px] uppercase mb-4 ${labelColor}`}>
```

Change `tracking-[3px]` to `tracking-[4px]`:
```tsx
            <div className={`text-[10px] font-semibold tracking-[4px] uppercase mb-4 ${labelColor}`}>
```

- [ ] **Step 5: Verify visually at localhost:3000**

Open `http://localhost:3000`. Check:
- Slide 1: Espresso-amber background, cream text, gold hairlines top and bottom, gold CTA button
- Slide 2: Warm ivory bg, navy text, navy "Shop Body Wash" CTA
- Slide 3: Sandy warm bg, navy text (was dark green — confirm it's gone)
- Slide 4: Ivory bg, navy text, teal quiz CTA
- Slide 5: Espresso-amber bg, cream text, gold hairlines, press names in gold

- [ ] **Step 6: Commit**

```bash
cd D:/Projects/thavare && git add components/home/HeroCarousel.tsx && git commit -m "feat: hero carousel — espresso-amber brand slides, cream product slides, gold hairlines"
```

---

## Task 3: Navbar Scroll State Redesign

**Files:**
- Modify: `components/layout/Navbar.tsx`

- [ ] **Step 1: Add computed color classes based on scroll state**

Find the line `const closeMenu = () => setMenuOpen(false);` and add these derived classes after it:

```tsx
  const linkCls        = `text-[11px] font-medium tracking-[1.5px] uppercase transition-colors duration-200 relative group cursor-none ${scrolled ? 'text-navy/70 hover:text-navy' : 'text-cream/60 hover:text-cream'}`;
  const logoCls        = scrolled ? 'text-navy' : 'text-cream';
  const logoSubCls     = scrolled ? 'text-navy/40' : 'text-cream/40';
  const bagCls         = `px-5 py-2 rounded-lg border text-[11px] font-medium tracking-wide uppercase transition-all duration-200 ${scrolled ? 'border-navy/20 text-navy hover:border-navy/45 hover:bg-navy/5' : 'border-cream/20 text-cream hover:border-cream/45 hover:bg-cream/5'}`;
  const mobileBagCls   = `text-[11px] font-medium tracking-wide uppercase transition-colors duration-200 ${scrolled ? 'text-navy/70 hover:text-navy' : 'text-cream/70 hover:text-cream'}`;
  const hamburgerCls   = `block w-6 h-px ${scrolled ? 'bg-navy' : 'bg-cream'}`;
```

- [ ] **Step 2: Update nav container scroll class**

Find:
```tsx
          scrolled
            ? 'bg-navy-deep backdrop-blur-2xl border-white/10'
            : 'bg-transparent border-transparent'
```

Replace with:
```tsx
          scrolled
            ? 'bg-ivory/95 backdrop-blur-2xl border-[#E5DDD0]'
            : 'bg-transparent border-transparent'
```

- [ ] **Step 3: Update Shop button**

Find:
```tsx
            <button className="text-[11px] font-medium tracking-[1.5px] uppercase text-cream/60 hover:text-cream transition-colors duration-200 relative group flex items-center gap-1 cursor-none">
```

Replace with:
```tsx
            <button className={`${linkCls} flex items-center gap-1`}>
```

- [ ] **Step 4: Update left nav links (Collections, Our Story)**

Find:
```tsx
              className="text-[11px] font-medium tracking-[1.5px] uppercase text-cream/60 hover:text-cream transition-colors duration-200 relative group"
```
(inside the `LEFT_LINKS.filter(...)` map)

Replace with:
```tsx
              className={linkCls}
```

- [ ] **Step 5: Update logo**

Find:
```tsx
            <span className="block font-serif text-lg font-medium tracking-[5px] text-cream leading-none">THAVARE</span>
            <span className="block text-[8px] tracking-[2px] uppercase text-cream/40 mt-0.5">Clinically Crafted Ayurveda</span>
```

Replace with:
```tsx
            <span className={`block font-serif text-lg font-medium tracking-[5px] leading-none ${logoCls}`}>THAVARE</span>
            <span className={`block text-[8px] tracking-[2px] uppercase mt-0.5 ${logoSubCls}`}>Clinically Crafted Ayurveda</span>
```

- [ ] **Step 6: Update right nav links**

Find the RIGHT_LINKS map:
```tsx
              className="text-[11px] font-medium tracking-[1.5px] uppercase text-cream/60 hover:text-cream transition-colors duration-200 relative group"
```
(inside the `RIGHT_LINKS.map(...)` map)

Replace with:
```tsx
              className={linkCls}
```

- [ ] **Step 7: Update desktop Bag button**

Find:
```tsx
          <Link
            href="/cart"
            className="px-5 py-2 rounded-lg border border-cream/20 text-[11px] font-medium tracking-wide uppercase text-cream hover:border-cream/45 hover:bg-cream/5 transition-all duration-200"
          >
            Bag ({totalItems})
          </Link>
```
(the desktop one, inside `hidden md:flex`)

Replace with:
```tsx
          <Link href="/cart" className={bagCls}>
            Bag ({totalItems})
          </Link>
```

- [ ] **Step 8: Update mobile Bag link and hamburger lines**

Find the mobile Bag link:
```tsx
          <Link
            href="/cart"
            className="text-[11px] font-medium tracking-wide uppercase text-cream/70 hover:text-cream transition-colors duration-200"
          >
```

Replace with:
```tsx
          <Link href="/cart" className={mobileBagCls}>
```

Find the hamburger lines:
```tsx
              <span className="flex flex-col gap-[5px]">
                <span className="block w-6 h-px bg-cream" />
                <span className="block w-6 h-px bg-cream" />
                <span className="block w-6 h-px bg-cream" />
              </span>
```

Replace with:
```tsx
              <span className="flex flex-col gap-[5px]">
                <span className={hamburgerCls} />
                <span className={hamburgerCls} />
                <span className={hamburgerCls} />
              </span>
```

- [ ] **Step 9: Verify visually at localhost:3000**

Check:
- At top of page (over espresso hero): navbar is transparent, cream links — correct
- After scrolling past hero: navbar becomes warm ivory background, navy links, navy logo
- On mobile: hamburger lines are cream at top, navy when scrolled; mobile menu overlay stays dark with cream links

- [ ] **Step 10: Commit**

```bash
cd D:/Projects/thavare && git add components/layout/Navbar.tsx && git commit -m "feat: navbar scroll state — ivory bg + navy text when scrolled"
```

---

## Task 4: Homepage Marquee Cleanup

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Remove second MarqueeStrip and update first marquee items**

Open `app/page.tsx`. Find the `MARQUEE_ITEMS` constant and replace it:

```ts
const MARQUEE_ITEMS = [
  { label: 'Free Delivery ₹499+' },
  { label: 'Ayurvedic Actives' },
  { label: 'Clinically Tested' },
  { label: 'Sustainable Packaging' },
  { label: 'Doctor Formulated' },
];
```

Then find and delete the `PATTERN_ITEMS` constant entirely:
```ts
// DELETE THIS ENTIRE BLOCK:
const PATTERN_ITEMS = [
  { label: '◈  ⊙  ❋  ◉' },
  { label: '◈  ⊙  ❋  ◉' },
  { label: '◈  ⊙  ❋  ◉' },
];
```

- [ ] **Step 2: Remove second MarqueeStrip from JSX**

Find and delete this line in the JSX:
```tsx
      <MarqueeStrip items={PATTERN_ITEMS} className="bg-teal py-3" />
```

- [ ] **Step 3: Verify at localhost:3000**

Scroll the homepage. Confirm:
- One teal marquee strip after the hero, with clean text (no emojis), dots separating items
- No second marquee strip between FounderSection and CircleSection

- [ ] **Step 4: Commit**

```bash
cd D:/Projects/thavare && git add app/page.tsx && git commit -m "feat: remove duplicate marquee strip, remove emojis from marquee items"
```

---

## Task 5: Bestsellers Redesign + Button outline variant

**Files:**
- Modify: `components/ui/Button.tsx`
- Modify: `components/home/Bestsellers.tsx`

- [ ] **Step 1: Add 'outline' variant to Button.tsx**

Open `components/ui/Button.tsx`. Find:
```ts
type Variant = 'primary' | 'ghost' | 'outline-light' | 'outline-cream' | 'white';
```

Replace with:
```ts
type Variant = 'primary' | 'ghost' | 'outline' | 'outline-light' | 'outline-cream' | 'white';
```

Then find the `variants` object and add the new variant after `ghost`:
```ts
  outline:
    'bg-transparent text-navy border border-navy/25 ' +
    'hover:border-navy/50 hover:bg-navy/5',
```

- [ ] **Step 2: Redesign Bestsellers section**

Open `components/home/Bestsellers.tsx`. Replace the entire file with:

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { useToast } from '@/lib/toast';

export function Bestsellers({ products }: { products: Product[] }) {
  const addItem = useCart(s => s.addItem);
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

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-[#A87A53] mb-2.5">Most Loved</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            Our <em className="italic text-terracotta">Bestsellers</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-text-2 mt-3">Loved by athletes. Trusted by everyday movers.</p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <AnimatedSection key={p.id} delay={(i + 1) as 1|2|3}>
              <div
                className="bg-white rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300 group relative cursor-none"
                style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0')}
              >
                <div className="h-[220px] flex items-center justify-center relative overflow-hidden bg-[#F0EBE0]">
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
                    style={{ filter: 'drop-shadow(0 8px 24px rgba(168,122,83,0.22))' }}
                  />
                  <button
                    onClick={() => handleQuickAdd(p)}
                    className="absolute bottom-0 left-0 right-0 bg-terracotta text-white text-[11px] font-semibold tracking-[1.5px] uppercase py-3.5 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300 cursor-none"
                  >
                    Quick Add to Bag
                  </button>
                </div>
                <div className="p-6">
                  <div className="text-[9px] font-medium tracking-[3px] uppercase text-[#A87A53] mb-1.5">{p.categoryLabel}</div>
                  <div className="font-serif text-[18px] font-medium leading-[1.25] text-navy mb-2">{p.name}</div>
                  <div className="text-[13px] leading-relaxed text-text-2 mb-4">{p.description}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[19px] font-semibold text-terracotta">₹{p.price}</span>
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
            <Button variant="outline">View All Products</Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify at localhost:3000**

Scroll to Bestsellers section. Confirm:
- Section background is warm ivory (not dark navy)
- Overline label is camel/gold, not teal
- Product cards are white with cream ring border
- On card hover: gold ring appears
- Card image area is warm `#F0EBE0` (not dark gradient)
- Product shadow is warm amber-tinted (not cool black)
- "View All Products" button is navy outline on ivory bg

- [ ] **Step 4: Commit**

```bash
cd D:/Projects/thavare && git add components/ui/Button.tsx components/home/Bestsellers.tsx && git commit -m "feat: bestsellers — ivory bg, warm card image bgs, ring shadow system, gold overline"
```

---

## Task 6: ValuesSection — Botanical Icons + Gold Borders

**Files:**
- Modify: `components/home/ValuesSection.tsx`

- [ ] **Step 1: Replace emoji icons with botanical SVGs**

Replace the entire file with:

```tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { BotanicalLeaf, BotanicalFlask, BotanicalWave } from '@/components/ui/icons/botanical';

const VALUES = [
  { Icon: BotanicalLeaf,  title: 'Bio-Active Ayurveda',   desc: 'We take time-tested Ayurvedic ingredients and extract their highest-performing actives using modern biotechnology. No fillers. No compromise.' },
  { Icon: BotanicalFlask, title: 'Clinically Formulated', desc: 'Every Thavare formula is developed by Dr. Meena Ramaiah — dermatologist, Ayurvedic practitioner, athlete. Science and nature, carefully and honestly.' },
  { Icon: BotanicalWave,  title: 'Built for Motion',      desc: 'Active skin faces sweat, sun, friction and wear. Thavare is the only Ayurvedic skincare range specifically engineered for the body in motion.' },
];

export function ValuesSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-[#A87A53] mb-2.5">The Thavare Difference</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            Where the Apothecary<br /><em className="italic text-terracotta">Meets the Laboratory</em>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {VALUES.map((v, i) => (
            <AnimatedSection key={v.title} delay={(i + 1) as 1|2|3} className="text-center group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 bg-[#F9F6F1] border border-[#C4A882] group-hover:scale-110 transition-transform duration-300">
                <v.Icon />
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

- [ ] **Step 2: Verify at localhost:3000**

Scroll to Values section. Confirm:
- Three botanical SVG icons visible (leaf, flask, wave) in warm `#F9F6F1` circles with gold border
- Overline label in camel, not teal
- On hover: icon circles scale up

- [ ] **Step 3: Commit**

```bash
cd D:/Projects/thavare && git add components/home/ValuesSection.tsx && git commit -m "feat: values section — botanical SVG icons, gold icon borders, camel overline"
```

---

## Task 7: WhySection Redesign + SVG Icons

**Files:**
- Modify: `components/home/WhySection.tsx`

- [ ] **Step 1: Replace file with redesigned version**

```tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { BotanicalStrength, BotanicalWalk, BotanicalHerb, BotanicalMicroscope } from '@/components/ui/icons/botanical';

const WHYS = [
  { Icon: BotanicalStrength,   title: 'For Sport',           desc: "For those who train hard, compete, and push limits. Performance isn't just muscle and mind — it's every layer of the body that shows up." },
  { Icon: BotanicalWalk,       title: 'For Active',          desc: 'For everyone else. The one who walks, stretches, cycles, chases children, carries groceries, and moves through life with intention.' },
  { Icon: BotanicalHerb,       title: 'Ancient Intelligence', desc: 'Ayurveda has always had the answers for the body in motion. We are simply bringing it into the conversation it was always meant to have.' },
  { Icon: BotanicalMicroscope, title: 'Modern Precision',    desc: 'Every ingredient selected, extracted, and clinically validated. The best of both worlds — rooted in nature, proven by science.' },
];

export function WhySection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-[#A87A53] mb-2.5">Why Sport. Why Active.</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            This Is <em className="italic text-terracotta">Sport Ayurveda.</em>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[900px] mx-auto">
          {WHYS.map((w, i) => (
            <AnimatedSection key={w.title} delay={(i + 1) as 1|2|3|4}>
              <div
                className="bg-white border border-[#E5DDD0] rounded-xl p-8 flex gap-4 items-start hover:-translate-y-0.5 transition-all duration-300 cursor-none group"
                style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0')}
              >
                <div className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <w.Icon />
                </div>
                <div>
                  <div className="font-serif text-[18px] font-medium text-navy mb-1.5">{w.title}</div>
                  <div className="text-[13px] leading-[1.65] text-text-2">{w.desc}</div>
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

- [ ] **Step 2: Verify at localhost:3000**

Scroll to Why section. Confirm:
- Ivory background (not dark navy)
- Four botanical SVG icons in camel stroke
- White cards with warm ring border, gold ring on hover
- Navy text throughout

- [ ] **Step 3: Commit**

```bash
cd D:/Projects/thavare && git add components/home/WhySection.tsx && git commit -m "feat: why section — ivory bg, botanical SVG icons, ring shadow cards"
```

---

## Task 8: PressStrip Redesign

**Files:**
- Modify: `components/home/PressStrip.tsx`

- [ ] **Step 1: Replace file with redesigned version**

```tsx
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const PRESS = [
  { name: 'The Hindu',   quote: '"Bridging ancient Ayurveda and modern sport science"' },
  { name: 'Vogue India', quote: '"The active skincare brand rewriting Ayurvedic rules"' },
  { name: 'Healthshots', quote: '"Doctor-formulated and clinically tested — it shows"' },
  { name: 'Femina',      quote: '"Sport meets ritual in this Ayurvedic powerhouse"' },
];

export function PressStrip() {
  return (
    <section className="bg-ivory py-16 md:py-24 px-4 md:px-10 lg:px-20">
      <AnimatedSection>
        <p className="text-[#A87A53] text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 text-center">
          In The Press
        </p>
        <h2 className="font-serif text-navy text-[28px] md:text-[36px] font-medium text-center mb-10">
          As Seen In
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRESS.map(({ name, quote }) => (
            <div
              key={name}
              className="bg-white border border-[#E5DDD0] rounded-xl p-6 flex flex-col gap-2"
              style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
            >
              <span className="font-serif text-[18px] text-[#A87A53] font-medium leading-snug">
                {name}
              </span>
              <p className="text-[13px] italic text-text-2 mt-2 leading-relaxed">
                {quote}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
```

- [ ] **Step 2: Verify at localhost:3000**

Scroll to Press section. Confirm:
- Ivory background (not dark navy-deep)
- Overline "In The Press" in camel/gold
- "As Seen In" heading in navy
- White press cards with warm ring border
- Publication names (The Hindu, Vogue India etc.) in camel/gold on white bg

- [ ] **Step 3: Commit**

```bash
cd D:/Projects/thavare && git add components/home/PressStrip.tsx && git commit -m "feat: press strip — ivory bg, camel publication names, warm ring cards"
```

---

## Task 9: ProductCard Redesign

**Files:**
- Modify: `components/shop/ProductCard.tsx`

- [ ] **Step 1: Update card container, image area, shadow, and Add to Bag button**

In `components/shop/ProductCard.tsx`, find the outermost card div:
```tsx
    <div className="bg-ivory rounded-xl overflow-hidden border border-[#E5DDD0] shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-1.5 hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px] transition-all duration-300 group relative">
```

Replace with:
```tsx
    <div
      className="bg-white rounded-xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 group relative"
      style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0')}
    >
```

Find the image container div:
```tsx
          <div className="h-[240px] bg-gradient-to-br from-cream to-sand flex items-center justify-center overflow-hidden relative">
```

Replace with:
```tsx
          <div className="h-[240px] bg-[#F0EBE0] flex items-center justify-center overflow-hidden relative">
```

Find the product Image element and update its `style` prop:
```tsx
            style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))' }}
```

Replace with:
```tsx
            style={{ filter: 'drop-shadow(0 6px 16px rgba(168,122,83,0.18))' }}
```

Find the Add to Bag button (the one inside `<div className="p-5">`):
```tsx
            className="px-4 py-2 text-[10px] font-semibold tracking-wide uppercase rounded-lg transition-all cursor-none disabled:cursor-not-allowed bg-terracotta text-white hover:opacity-90 disabled:bg-[#D4C8B8] disabled:text-text-3"
```

Replace with:
```tsx
            className="px-4 py-2 text-[10px] font-semibold tracking-wide uppercase rounded-lg transition-all cursor-none disabled:cursor-not-allowed bg-navy text-cream hover:bg-navy/90 disabled:bg-[#D4C8B8] disabled:text-text-3"
```

- [ ] **Step 2: Verify at localhost:3000 — navigate to /shop**

Open `http://localhost:3000/shop`. Confirm:
- ProductCards are white (not ivory), with warm ring border
- Card image area is `#F0EBE0` warm cream (not cream-to-sand gradient)
- Product drop shadow is warm camel-tinted (not cool black)
- "Add to Bag" button is navy fill with cream text
- Gold ring appears on card hover

- [ ] **Step 3: Commit**

```bash
cd D:/Projects/thavare && git add components/shop/ProductCard.tsx && git commit -m "feat: product card — cream image bg, warm shadow, navy add-to-bag, ring shadow"
```

---

## Task 10: NewArrivals, CategoryGrid + Newsletter

**Files:**
- Modify: `components/home/NewArrivals.tsx`
- Modify: `components/home/CategoryGrid.tsx`
- Modify: `components/home/Newsletter.tsx`

- [ ] **Step 1: Fix NewArrivals card image backgrounds and spacing**

Open `components/home/NewArrivals.tsx`. Find the outer section element:
```tsx
    <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-cream">
```

Replace with:
```tsx
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-cream">
```

Find the `BG` constant:
```ts
const BG = [
  'bg-gradient-to-br from-navy-mid to-teal-dark',
  'bg-gradient-to-br from-beige to-camel',
  'bg-gradient-to-br from-cream to-sand',
  'bg-gradient-to-br from-navy-mid to-teal-dark',
];
```

Replace with:
```ts
const BG = [
  'bg-[#F5F0E8]',
  'bg-[#EDE5D8]',
  'bg-[#F0EBE0]',
  'bg-[#E8DFD0]',
];
```

Then find the NewArrivals card Link element:
```tsx
              <Link href={`/products/${p.slug}`} className="block bg-ivory rounded-xl overflow-hidden border border-[#E5DDD0] shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-1.5 hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px] transition-all duration-300 group">
```

Replace with:
```tsx
              <Link
                href={`/products/${p.slug}`}
                className="block bg-white rounded-xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 group"
                style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0')}
              >
```

- [ ] **Step 2: Fix CategoryGrid ring shadow and spacing**

Open `components/home/CategoryGrid.tsx`. Find the outer section element:
```tsx
    <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-cream">
```

Replace with:
```tsx
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-cream">
```

Find the category card Link element:
```tsx
              <Link href={cat.href} className="block bg-ivory rounded-xl overflow-hidden border border-[#E5DDD0] shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-1.5 hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px] transition-all duration-300 group">
```

Replace with:
```tsx
              <Link
                href={cat.href}
                className="block bg-ivory rounded-xl overflow-hidden hover:-translate-y-1.5 transition-all duration-300 group"
                style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0')}
              >
```

- [ ] **Step 3: Fix Newsletter overline and spacing**

Open `components/home/Newsletter.tsx`. Find the outer section element:
```tsx
    <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-beige">
```

Replace with:
```tsx
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-beige">
```

Find the overline:
```tsx
        <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal-dark mb-3">Stay in the Know</div>
```

Replace with:
```tsx
        <div className="text-[10px] font-medium tracking-[4px] uppercase text-[#A87A53] mb-3">Stay in the Know</div>
```

- [ ] **Step 4: Verify at localhost:3000**

Scroll through homepage. Confirm:
- New Arrivals: all 4 card image areas are warm cream tones (no dark navy gradients)
- Category Grid: cards have ring shadow on hover
- Newsletter: overline is camel/gold, not teal-dark
- Both card grids show gold ring on hover

- [ ] **Step 5: Commit**

```bash
cd D:/Projects/thavare && git add components/home/NewArrivals.tsx components/home/CategoryGrid.tsx components/home/Newsletter.tsx && git commit -m "feat: new arrivals + category grid ring shadows, newsletter camel overline"
```

---

## Final Visual QA

- [ ] **Full homepage scroll** — `http://localhost:3000`
  - Hero: espresso-amber slide 1, cream product slides, espresso-amber press slide 5
  - Marquee: clean text, no emojis, single strip
  - Category Grid: ring shadows on hover
  - Bestsellers: ivory bg, warm cards, gold overline
  - Values: botanical leaf/flask/wave icons, gold icon borders
  - Ingredient Strip: unchanged (dark editorial photos — correct)
  - Founder Section: unchanged (dark brand moment — correct)
  - Circle Section: unchanged (teal — correct)
  - New Arrivals: all warm cream card image bgs
  - Why Section: ivory bg, botanical icons, ring shadow cards
  - Press Strip: ivory bg, camel publication names
  - Newsletter: camel overline
  - Footer: unchanged (dark — correct)

- [ ] **Shop page** — `http://localhost:3000/shop`
  - ProductCards: white with ring shadow, warm image bg, navy Add to Bag

- [ ] **Navbar**
  - At top of page: transparent, cream text (over espresso hero)
  - After scrolling: warm ivory bg, navy text, navy logo
