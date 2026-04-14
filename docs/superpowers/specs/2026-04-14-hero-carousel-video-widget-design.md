# Hero Carousel + Floating Video Widget — Design Spec
**Date:** 2026-04-14
**Project:** Thavare headless storefront
**Status:** Approved

---

## 1. Hero Carousel

### Overview
Replaces the existing static `components/home/Hero.tsx` with a 5-slide auto-advancing carousel. Full viewport height on desktop, 80vh on mobile. The current Hero content becomes Slide 1.

### Slides

| # | Type | Background | Headline | CTA |
|---|---|---|---|---|
| 1 | Brand hero | Navy gradient (`#1A2744 → #2A4070`) | "Clinically Crafted Ayurveda for the Active Body" | Shop All + Our Story |
| 2 | Product spotlight | Cream (`#F5F0E8`) | "Thavare Body Wash — Pre-sport ritual. Clean. Revive. Go." | Shop Body Wash → `/products/thavare-body-wash` |
| 3 | Product spotlight | Forest green (`#2A3C2A → #3A5034`) | "Thavare Sun Screen — Train outdoors. Stay protected." | Shop Sun Screen → `/products/thavare-sun-screen` |
| 4 | Quiz CTA | Sand (`#F0EBE0`) | "Find Your Perfect Routine — Answer 5 questions. Get your match." | Take the Quiz → `/quiz` |
| 5 | Press / trust | Navy deep (`#1A2744 → #14203A`) | Pull quote from Vogue India + 4 press names | — |

### Images used (from existing `/public/images/`)
- Slide 1: `hero-model.png` (right side)
- Slide 2: `prod-bodywash-botanicals.png`
- Slide 3: `prod-sunscreen.png`
- Slide 4: decorative ✦ glyph (no image needed)
- Slide 5: text-only

### Controls & behaviour
- **Auto-advance:** every 5 seconds
- **Pause on hover:** `onMouseEnter` pauses the interval, `onMouseLeave` resumes
- **Dot indicators:** bottom-centre, active dot is wide pill, inactive are small circles
- **Prev / Next arrows:** appear on hover, cream circle with navy chevron, positioned left/right centre
- **Transition:** crossfade (opacity) over 600ms — no slide/push (avoids jank with tall hero)
- **Loop:** wraps back to slide 1 after slide 5

### Architecture
- `components/home/HeroCarousel.tsx` — `'use client'`, replaces `Hero.tsx`
- Slide data defined as a const array inside the file (no external data source needed)
- `useState(activeSlide)` + `useEffect` with `setInterval` for auto-advance
- `app/page.tsx`: swap `<Hero />` import for `<HeroCarousel />`
- `Hero.tsx` kept but no longer imported (can be deleted later)

---

## 2. Floating Video Widget

### Overview
A floating video player that appears bottom-right after a 4-second delay. Muted autoplay loop. Can be minimised to a circle or dismissed for the session.

### States
| State | Description |
|---|---|
| Hidden | Not yet shown (first 4s, or after session dismiss) |
| Expanded | 220px wide card, video playing, − and × buttons |
| Minimised | 56px circle with play icon, click to re-expand |

### Video source
Placeholder: free Pexels stock video of athletic/nature activity.
URL constant at top of component — easy to swap when client supplies real video.
Suggested placeholder: `https://www.pexels.com/video/5322089/` (woman applying skincare) — direct MP4 to be resolved at build time via a `NEXT_PUBLIC_BRAND_VIDEO_URL` env var with a hardcoded fallback.

Fallback URL (hardcoded): `https://videos.pexels.com/video-files/5322089/5322089-uhd_2560_1440_25fps.mp4`

### Behaviour
- **Delay:** appears after 4s via `setTimeout`
- **Muted + autoplay + loop** by default (browser autoplay policy requires muted)
- **Unmute:** user can click the video to toggle mute
- **Minimise (−):** collapses to 56px circle, bottom-right corner
- **Dismiss (×):** removes widget, writes `thavare-video-dismissed` to `sessionStorage` — does not reappear for the rest of the session
- **Re-expand:** clicking the minimised circle restores full player
- **Entry animation:** slides up from below + fades in over 300ms

### Architecture
- `components/ui/FloatingVideo.tsx` — `'use client'`
- `useState`: `status: 'hidden' | 'expanded' | 'minimised'`
- `useEffect` on mount: `setTimeout(() => setStatus('expanded'), 4000)` — checks `sessionStorage` first, skips if dismissed
- `app/layout.tsx`: add `<FloatingVideo />` alongside `<ToastContainer />`

---

## Files to create / modify (all three features combined)

| File | Action |
|---|---|
| `lib/toast.ts` | Create — Zustand toast store |
| `components/ui/Toast.tsx` | Create — single toast card |
| `components/ui/ToastContainer.tsx` | Create — portal container |
| `components/home/HeroCarousel.tsx` | Create — replaces Hero |
| `components/ui/FloatingVideo.tsx` | Create — floating video widget |
| `app/layout.tsx` | Modify — add `<ToastContainer />` + `<FloatingVideo />` |
| `app/page.tsx` | Modify — swap `<Hero />` for `<HeroCarousel />` |
| `components/shop/ProductCard.tsx` | Modify — wire toast |
| `components/home/Bestsellers.tsx` | Modify — wire toast |
| `components/shop/QuickViewModal.tsx` | Modify — wire toast |
| `components/product/ProductInfo.tsx` | Modify — wire toast |

**Total:** 5 new files, 6 modified.

---

## Out of scope
- CMS-driven slide content (static for now)
- Video analytics / play tracking
- Touch swipe on carousel (stretch goal)
- Error toast for checkout failures (already shown inline)
