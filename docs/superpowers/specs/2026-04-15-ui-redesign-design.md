# Thavare UI Redesign — Design Spec

**Date:** 2026-04-15
**Scope:** Full site — component-level redesign (Approach 2)
**Reference:** `docs/gap-analysis-forest-essentials.md`, `D:/Knowledge/DESIGN.md`

---

## 1. Design Direction

**Theme:** Warm cream-dominant with deep espresso-amber brand moments — inspired by Forest Essentials' luxury Ayurvedic aesthetic.

**Principle:** Depth comes from section-to-section alternation (light → dark → light), not from gradients within sections. All section backgrounds are **flat** warm tones.

**NOT changing:** Page structure, component logic, Shopify integration, Zustand stores, animations, or any non-visual code.

---

## 2. Color System

### Section Backgrounds (flat — no gradients)
| Use | Token | Hex |
|-----|-------|-----|
| Primary light bg | `ivory` | `#F5F0E8` |
| Secondary light bg | `cream` | `#EAE4D3` |
| Product card image bg | — | `#F0EBE0` |
| Card body bg | white | `#FFFFFF` |
| Brand/press hero bg | — | `#3D1F0A` (espresso-amber) |
| Keep: IngredientStrip | `navy-deep` | `#111C35` |
| Keep: FounderSection | `navy-deep` | `#111C35` |
| Keep: CircleSection | `teal` | `#008493` |
| Keep: Footer | `navy-deep` | `#111C35` |

### Gold Accent System (`#C4A882` / `#A87A53`)
Gold is used in exactly 6 places — not as decoration, as precision:

1. **Hero hairlines (dark slides):** 1px top + bottom rules — `linear-gradient(90deg, transparent, #C4A882, transparent)`
2. **Hero CTAs (dark slides):** `#C4A882` fill button with `#3D1F0A` text
3. **Section overline labels (cream sections):** `#A87A53` (camel) instead of teal
4. **Card hover ring:** `box-shadow: 0px 0px 0px 1px #C4A882`
5. **Botanical icon borders:** `border: 1px solid #C4A882` on icon circles
6. **Press publication names:** `#A87A53` (camel) on ivory bg

### Shadow System (from design.md ring approach)
| State | Value |
|-------|-------|
| Default card | `0px 0px 0px 1px #E5DDD0` |
| Card hover | `0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px` |
| Elevated feature cards | `rgba(26,22,16,0.05) 0px 4px 24px` |
| Product image on dark slide | `rgba(0,0,0,0.30) 0px 8px 24px` |

Replace all existing `shadow-[rgba(26,22,16,0.06)_0_4px_24px]` and `hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px]` with the ring shadow system above.

---

## 3. Section-by-Section Changes

### HeroCarousel (`components/home/HeroCarousel.tsx`)

**Keep:** 5-slide carousel structure, auto-advance, dot indicators, crossfade.

**Slide backgrounds — all flat:**
| Slide | Content | New bg | Text |
|-------|---------|--------|------|
| 1 | Brand hero | `#3D1F0A` (espresso-amber) | Cream |
| 2 | Body Wash | `#F5F0E8` (ivory) | Navy |
| 3 | Sun Screen | `#F0EAD8` (warm sandy) | Navy |
| 4 | Quiz | `#F5F0E8` (ivory) | Navy |
| 5 | Press quote | `#3D1F0A` (espresso-amber) | Cream |

**Changes applied to ALL slides:**
- Remove inline `bg` style property with gradients — use flat hex bg instead
- Overline label letter-spacing: `3px` → `4px` tracking
- Product name label below product image on product slides (small camel text)

**Changes on dark slides (1 + 5) only:**
- Add gold hairline: 1px top + bottom absolute positioned rules inside slide
- CTA variant: primary/ghost → gold fill (`bg-[#C4A882] text-[#3D1F0A]`) / ghost stays but border changes to `rgba(196,168,130,0.4)`
- `darkText: false` stays — cream text on espresso bg

**Changes on cream slides (2, 3, 4):**
- All `darkText: true` (navy text)
- CTA: `dark` variant → navy fill `bg-navy text-cream`
- Sub text: `text-[#5C5448]`
- Remove green slide 3 label color — all labels use `text-[#008493]` (teal)

### Navbar (`components/layout/Navbar.tsx`)

**Scroll state change:**
```
// Before:
'bg-navy-deep backdrop-blur-2xl border-white/10'
// After:
'bg-ivory/95 backdrop-blur-2xl border-[#E5DDD0]'
```
- Link colors on scroll: `text-cream/60 hover:text-cream` → `text-navy/60 hover:text-navy`
- Logo on scroll: `text-cream` → `text-navy`
- Cart/wishlist icons on scroll: cream → navy

**Transparent (top of page) state:** Keep as-is — works fine over the dark espresso hero.

### MarqueeStrip (`components/ui/MarqueeStrip.tsx` + `app/page.tsx`)

- **Remove second marquee** (the pattern `◈ ⊙ ❋ ◉` strip between FounderSection and CircleSection) from `app/page.tsx`
- **First marquee items:** Remove all emojis. Use `·` as a separate item between each label:
  ```ts
  const MARQUEE_ITEMS = [
    { label: 'Free Delivery ₹499+' },
    { label: '·' },
    { label: 'Ayurvedic Actives' },
    { label: '·' },
    { label: 'Clinically Tested' },
    { label: '·' },
    { label: 'Sustainable Packaging' },
    { label: '·' },
    { label: 'Doctor Formulated' },
  ];
  ```
  Separator `·` items: `text-white/40` (dimmed). Label items: `text-white font-medium tracking-[2px] uppercase text-[11px]`

### Bestsellers (`components/home/Bestsellers.tsx`)

- `bg-navy` → `bg-ivory`
- Section heading: `text-cream` → `text-navy`, italic accent `text-terracotta` (stays)
- Sub text: `text-cream/50` → `text-text-2`
- Product card container: `bg-navy-mid border border-white/10` → `bg-white border-0 ring shadow` (ring shadow system)
- Card image bg: `linear-gradient(135deg, #3D2910, #243058)` → flat `#F0EBE0`
- Card image hover overlay "Quick Add": stays terracotta
- Card body: `p-6` stays, text colors flip to navy/dark
  - Category label: `text-teal` → `text-[#A87A53]` (camel)
  - Product name: `text-cream` → `text-navy`
  - Description: `text-cream/55` → `text-text-2`
  - Price: `text-camel` → `text-terracotta`
- "View All Products" button: `variant="outline-light"` → `variant="outline"` (navy outline on ivory bg)

### ValuesSection (`components/home/ValuesSection.tsx`)

- `bg-ivory` stays
- **Replace emoji icons** with botanical SVG illustrations:
  - Bio-Active Ayurveda: leaf/botanical SVG
  - Clinically Formulated: flask/vessel SVG
  - Built for Motion: wave/motion SVG
- Icon circle: current `shadow-[0_0_0_1px_#E5DDD0]` → `border border-[#C4A882]` (gold border)
- Icon circle bg: add subtle `bg-[#F9F6F1]`
- Overline label: `text-teal` → `text-[#A87A53]`

### WhySection (`components/home/WhySection.tsx`)

- `bg-navy` → `bg-ivory`
- Section heading: `text-cream` → `text-navy`, `text-terracotta` accent stays
- Overline: `text-teal` → `text-[#A87A53]`
- Card: `bg-white/5 border border-white/10` → `bg-white border border-[#E5DDD0]`
- Card hover: `hover:bg-white/8` → `hover:border-[#C4A882]` (gold ring on hover)
- **Replace emoji icons** (🏋️🚶🌿🔬) with thin-line SVGs in `text-[#A87A53]`
- Card text: `text-cream` → `text-navy`, `text-cream/55` → `text-text-2`

### PressStrip (`components/home/PressStrip.tsx`)

- `bg-navy-deep` → `bg-ivory`
- Section label: `text-teal` → `text-[#A87A53]` (camel — consistent with all cream section overlines)
- Heading: `text-cream` → `text-navy`
- Press cards: `bg-white/5 border border-white/10` → `bg-white border border-[#E5DDD0]`
- Publication name: `text-camel` → `text-[#A87A53]` (same camel, now on light bg — legible)
- Quote text: `text-cream/55` → `text-text-2`

### ProductCard (`components/shop/ProductCard.tsx`)

- Card: `bg-ivory rounded-xl border border-[#E5DDD0] shadow-[...]` → `bg-white rounded-xl` with ring shadow system
- Image area: `bg-gradient-to-br from-cream to-sand` → `bg-[#F0EBE0]`
- Product drop shadow: `drop-shadow(0 6px 16px rgba(0,0,0,0.12))` → `drop-shadow(0 6px 16px rgba(168,122,83,0.18))` (warm camel-tinted)
- Category label: `text-camel` stays (already good)
- Add to Bag button: `bg-terracotta` → `bg-navy` (navy fill, cream text). Terracotta reserved for CTA-primary only.
- Wishlist heart: stays as-is

### NewArrivals (`components/home/NewArrivals.tsx`)

- `bg-cream` stays
- `BG` array — all 4 variants become warm cream:
  ```ts
  const BG = [
    'bg-[#F5F0E8]',
    'bg-[#EDE5D8]',
    'bg-[#F0EBE0]',
    'bg-[#E8DFD0]',
  ];
  ```
- Card: `bg-ivory border border-[#E5DDD0] shadow-[...]` → ring shadow system
- Badge: `bg-navy text-cream` stays

### CategoryGrid (`components/home/CategoryGrid.tsx`)

- `bg-cream` stays — no changes needed.
- Cards: `bg-ivory border shadow-[...]` → ring shadow system only.

### Newsletter (`components/home/Newsletter.tsx`)

- `bg-beige` stays — no changes.
- Minor: overline `text-teal-dark` → `text-[#A87A53]`

### DistributionStrip / Footer / IngredientStrip / FounderSection / CircleSection

- **No changes.** These are either already correct or intentionally dark/teal.

---

## 4. Typography

No font changes — Playfair Display (serif) + Nunito (sans) pairing is correct.

**Spacing bump:** All content sections: `py-14 md:py-24` → `py-16 md:py-24` (mobile spacing from 56px → 64px).

**Body line-height:** Already `leading-relaxed` (1.625) — matches design.md recommendation of 1.60. Keep.

**Serif weight:** Already `font-medium` (500) throughout. Keep.

---

## 5. Botanical SVG Icons

Needed for ValuesSection (3 icons) and WhySection (4 icons). 7 total SVGs.

**ValuesSection:**
1. `BotanicalLeaf` — stylised leaf with stem and veins in `stroke-[#A87A53]`
2. `BotanicalFlask` — Ayurvedic vessel/flask with botanical detail
3. `BotanicalWave` — motion/energy wave form

**WhySection:**
4. `BotanicalStrength` — minimal dumbbell or mountain silhouette
5. `BotanicalWalk` — minimal figure in motion
6. `BotanicalHerb` — ashwagandha-style leaf cluster
7. `BotanicalMicroscope` — stylised lab vessel with leaf detail

All SVGs: `width="24" height="24"`, `stroke-width="1.2"`, `stroke-linecap="round"`, `stroke-linejoin="round"`, `fill="none"`, stroke color `#A87A53`. Create in `components/ui/icons/botanical/`.

---

## 6. Files Changed

| File | Change |
|------|--------|
| `components/home/HeroCarousel.tsx` | Slide bgs, gold hairlines, text colors, CTA variants |
| `components/layout/Navbar.tsx` | Scroll state: dark → warm ivory |
| `components/ui/MarqueeStrip.tsx` | No change (just data) |
| `app/page.tsx` | Remove 2nd `<MarqueeStrip>`, update 1st marquee items (no emojis) |
| `components/home/Bestsellers.tsx` | bg, card colors, text colors |
| `components/home/ValuesSection.tsx` | Replace emoji → botanical SVGs, gold icon borders |
| `components/home/WhySection.tsx` | bg, replace emoji → thin-line SVGs, card colors |
| `components/home/PressStrip.tsx` | bg, card colors, text colors |
| `components/home/NewArrivals.tsx` | BG array → warm cream variants, ring shadows |
| `components/home/CategoryGrid.tsx` | Ring shadow system only |
| `components/home/Newsletter.tsx` | Overline color only |
| `components/shop/ProductCard.tsx` | Image bg, ring shadow, Add to Bag button color |
| `components/ui/icons/botanical/` | New dir — 7 botanical SVG components |

**Unchanged:** `Bestsellers` quick-add logic, all `lib/` files, all `app/` page files (except `page.tsx` marquee removal), Footer, FounderSection, CircleSection, IngredientStrip, DistributionStrip.

---

## 7. Out of Scope

- Feature gaps from `docs/gap-analysis-forest-essentials.md` (separate sprint)
- PDP page redesign
- Shop page redesign
- Journal, Quiz, About, Circle, legal pages
- Any new functionality
