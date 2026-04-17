# Thavare Audit Fixes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all 34 issues found in the comprehensive project audit (security, a11y, runtime bugs, SEO, dead code).

**Architecture:** Pure fixes — no new features. Each task group targets non-overlapping files to enable parallel execution.

**Tech Stack:** Next.js 16, Tailwind CSS v4, TypeScript, React 19

**Spec:** Audit report from 2026-04-17 session (4 parallel audit agents).

---

## File Map

| Task | Files |
|------|-------|
| 1 | `middleware.ts` (create) |
| 2 | `app/globals.css`, `components/ui/CustomCursor.tsx` |
| 3 | `app/layout.tsx` |
| 4 | `components/layout/Navbar.tsx`, `components/layout/ProfilePanel.tsx`, `app/account/login/page.tsx` (create), `app/account/register/page.tsx` (create) |
| 5 | `components/shop/QuickViewModal.tsx` |
| 6 | `components/home/Bestsellers.tsx`, `components/home/WhySection.tsx`, `components/home/NewArrivals.tsx`, `components/layout/Footer.tsx`, `components/home/Newsletter.tsx` |
| 7 | `app/order-success/OrderSuccessClearer.tsx`, `lib/cart.ts`, `components/product/ProductInfo.tsx`, `components/cart/CartItem.tsx`, `lib/shopify-mapper.ts`, `components/ui/FloatingVideo.tsx`, `lib/klaviyo.ts` |
| 8 | `app/wishlist/page.tsx`, `app/journal/page.tsx`, `app/track-order/page.tsx`, `app/faqs/page.tsx`, `app/products/[slug]/page.tsx`, `.gitignore`, `e2e/audit.spec.ts`, delete `Hero.tsx`, `PressStrip.tsx`, `UGCSection.tsx`, delete unused images |

---

## Task 1: Security Headers (middleware.ts)

Create `middleware.ts` in project root with CSP, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.

## Task 2: Cursor & Motion Accessibility

- `globals.css:70`: Wrap `cursor: none` in `@media (hover: hover) and (pointer: fine)`
- Add `@media (prefers-reduced-motion: reduce)` to disable all animations
- `CustomCursor.tsx`: Only render on hover-capable devices; add matchMedia check
- Remove redundant `cursor-none` classes from components (60+)

## Task 3: Layout — Skip-to-Content + Schema

- `layout.tsx`: Add skip-to-content link before `<WelcomeBanner />`
- Add `id="main-content"` to `<main>`
- Update Organization schema `sameAs` with social URLs (empty placeholder array → remove or add real URLs)

## Task 4: Navbar + ProfilePanel + Auth Pages

- Navbar: Add `aria-expanded` on shop dropdown and hamburger buttons
- Mobile menu: Add `aria-hidden` when closed, Escape key handler, basic focus management
- ProfilePanel: Add Escape key handler, `aria-hidden` when closed
- Add desktop profile icon (currently mobile-only)
- Create placeholder `/account/login` and `/account/register` pages
- Fix color contrast on nav links (cream/60 → cream/70 minimum)

## Task 5: QuickViewModal Focus + Toast

- Add focus trap (trap Tab within modal)
- Auto-focus close button on open
- Return focus to trigger on close
- Wire wishlist toggle to fire toast (missing from audit)

## Task 6: Home Components + Footer Contrast

- Bestsellers: Change "Add to Bag" Link to actual add-to-cart button
- Footer: Bump text-cream/30 to cream/50, text-cream/45 to cream/60, text-cream/25 to cream/40
- Eyebrow labels: Change `text-[#A87A53]` to `text-[#8B6841]` (darker) across Bestsellers, NewArrivals, WhySection
- Newsletter: Add `<label>` (sr-only) for email input

## Task 7: Runtime Bug Fixes

- OrderSuccessClearer: Only clear cart if URL has valid order params
- cart.ts:89: Add null check on `data.cartCreate.cart`
- ProductInfo:29-30: Fix double state update (pass qty to addItem or use single updateQuantity)
- CartItem: Add aria-labels on +/- and remove buttons
- shopify-mapper:47: Validate category against union
- FloatingVideo: Add try/catch around sessionStorage, add onError fallback for video
- klaviyo.ts:2: Move LIST_ID to env var `NEXT_PUBLIC_KLAVIYO_LIST_ID`

## Task 8: SEO + Dead Code Cleanup

- Add metadata exports to /wishlist, /journal, /track-order (convert to server components or add layout.tsx)
- Add canonical URLs via metadata alternates
- Add BreadcrumbList schema to product pages
- Add FAQPage schema to /faqs
- Add aggregateRating to Product schema (if reviews data available)
- Delete Hero.tsx, PressStrip.tsx, UGCSection.tsx
- Update e2e/audit.spec.ts to remove PressStrip/UGCSection references
- Add `New/`, `test-results/`, `.superpowers/` to .gitignore
- Delete unused images (brand-slide-teal.png, prod-bodylotion*.png, prod-bodywash-box.png, prod-sunblock.png)
