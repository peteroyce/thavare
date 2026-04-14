# Toast Notification System — Design Spec
**Date:** 2026-04-14
**Project:** Thavare headless storefront
**Status:** Approved

---

## Overview

A lightweight, branded toast notification system that provides instant visual feedback for cart and wishlist actions. Built with zero new npm dependencies — Zustand store + React portal.

---

## Visual Design

Style: cream background card with a coloured left-border accent, top-right slide-in.

### Anatomy of a toast
```
┌─────────────────────────────────────┐
│ ▌ ADDED TO BAG          [×]        │  ← teal left bar, terracotta/grey for wishlist
│   Thavare Body Wash                 │  ← product name (serif)
│   2 items in your bag · View Bag → │  ← count + CTA link
└─────────────────────────────────────┘
  ▓▓▓▓▓▓▓▓▓▓▓▓░░░░░░░░░░░░  ← 3s progress bar (teal/terracotta/grey)
```

### Event types

| Event | Left-bar colour | Label | Count line | CTA |
|---|---|---|---|---|
| Add to cart (new item) | Teal `#2A7A6A` | ADDED TO BAG | `N items in your bag` | View Bag → `/cart` |
| Add to cart (existing) | Teal `#2A7A6A` | BAG UPDATED | `Product ×N · N items in your bag` | View Bag → `/cart` |
| Wishlist add | Terracotta `#C07B3A` | SAVED TO WISHLIST | `N items saved` | View Wishlist → `/wishlist` |
| Wishlist remove | Grey `#9A8F84` | REMOVED FROM WISHLIST | *(no count line)* | — |

### Position & behaviour
- **Position:** fixed top-right, `top-4 right-4`, z-index 9999
- **Entry:** slides in from right (`translateX(100%) → 0`) over 250ms ease-out
- **Exit:** fades out over 200ms
- **Auto-dismiss:** 3 seconds; a thin progress bar visually counts down
- **Manual dismiss:** × button in top-right of card
- **Stacking:** toasts stack vertically with 8px gap (newest on top); max 3 visible at once (oldest auto-removed)
- **Width:** 280px fixed

---

## Architecture

### No circular imports rule
Toast triggers live in **UI components**, not in the Zustand cart/wishlist stores. This keeps stores pure and avoids circular imports.

```
UI Component
  ├── calls addItem(product)              ← cart store mutation
  ├── reads useCart.getState().totalItems() ← post-mutation count
  └── calls toast.add({ type, product, count }) ← toast store
```

### `lib/toast.ts` — Zustand store (no persist)
```ts
type Toast = {
  id: string;
  type: 'cart-add' | 'cart-update' | 'wishlist-add' | 'wishlist-remove';
  productName: string;
  count?: number;       // cart item count OR wishlist item count
  quantity?: number;    // for cart-update: new quantity of this product
}

interface ToastStore {
  toasts: Toast[];
  add: (toast: Omit<Toast, 'id'>) => void;
  remove: (id: string) => void;
}
```
`add()` generates a nanoid (or `Date.now().toString()`), prepends to array, caps at 3.

### `components/ui/Toast.tsx`
Single toast card. Props: `toast: Toast`, `onDismiss: (id) => void`.
Renders the coloured-border card. Triggers `onDismiss` after 3s via `useEffect`; also renders a CSS-animated progress bar (no JS timers for the bar — `animation: linear 3s forwards`).

### `components/ui/ToastContainer.tsx`
`'use client'` component. Reads `useToast(s => s.toasts)`. Renders into a React portal targeting `document.body`. Fixed top-right positioning. Maps toasts → `<Toast />`.

### `app/layout.tsx`
Add `<ToastContainer />` as last child of `<body>` (after `<WelcomeBanner />`).

---

## Wiring — call sites

All four locations that call `addItem` or `toggle` get updated:

| File | Action | Toast call |
|---|---|---|
| `components/shop/ProductCard.tsx` | `addItem(p)` | `toast.add({ type: 'cart-add', productName: p.name, count })` |
| `components/home/Bestsellers.tsx` | `addItem(p)` | same |
| `components/shop/QuickViewModal.tsx` | `addItem(p)` | same |
| `components/product/ProductInfo.tsx` | `handleAdd()` | `cart-add` or `cart-update` depending on whether item existed |
| `components/shop/ProductCard.tsx` | `toggle(p)` | `wishlist-add` or `wishlist-remove` |
| `components/product/ProductInfo.tsx` | `toggle(p)` | same |

For `cart-add` vs `cart-update`: check if the product was already in cart **before** calling `addItem`. If `existing` was truthy → `cart-update`; otherwise → `cart-add`.

For wishlist: check `has(p.id)` **before** calling `toggle`. If it was already saved → `wishlist-remove`; else → `wishlist-add`.

---

## Files to create / modify

| File | Action |
|---|---|
| `lib/toast.ts` | Create — Zustand store |
| `components/ui/Toast.tsx` | Create — single toast card |
| `components/ui/ToastContainer.tsx` | Create — portal container |
| `app/layout.tsx` | Modify — add `<ToastContainer />` |
| `components/shop/ProductCard.tsx` | Modify — wire toast on addItem + wishlist toggle |
| `components/home/Bestsellers.tsx` | Modify — wire toast on addItem |
| `components/shop/QuickViewModal.tsx` | Modify — wire toast on addItem |
| `components/product/ProductInfo.tsx` | Modify — wire toast on handleAdd + wishlist toggle |

**Total:** 3 new files, 5 modified.

---

## Out of scope
- Server-side notifications (email, push)
- Toast for newsletter subscription (Klaviyo not wired yet)
- Error toasts (checkout failures already shown inline)
- Mobile swipe-to-dismiss (stretch goal)
