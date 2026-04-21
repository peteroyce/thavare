// components/home/HeroCarousel.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CTA = {
  text: string;
  href: string;
  variant: 'primary' | 'ghost' | 'dark';
};

type Slide = {
  id: number;
  bg: string;
  label: string;
  headline: string[];
  accentLine: number | null;
  sub: string;
  ctas: CTA[];
  image: string | null;
  imageLabel?: string;
  darkText: boolean; // false = cream text (dark bg), true = navy text (light bg)
  press?: string[];
  attribution?: string;
};

const SLIDES: Slide[] = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, rgba(14,10,6,0.76) 30%, rgba(42,28,14,0.52)), url("/images/brand-slide-icon.png") center / cover no-repeat',
    label: '',
    headline: ['Clinically Crafted', 'Ayurveda', 'for the Active Body'],
    accentLine: 1,
    sub: '',
    ctas: [
      { text: 'Shop All', href: '/shop', variant: 'primary' },
      { text: 'Our Story', href: '/about', variant: 'ghost' },
    ],
    image: null,
    darkText: false,
  },
  {
    id: 2,
    bg: 'linear-gradient(135deg, rgba(18,8,2,0.72) 35%, rgba(55,22,6,0.48)), url("/images/cat-during-gate.jpg") center / cover no-repeat',
    label: 'Pre-Sport Ritual',
    headline: ['Thavare', 'Body Wash'],
    accentLine: null,
    sub: 'Clean. Revive. Go.',
    ctas: [{ text: 'Shop Body Wash — ₹1,200', href: '/products/thavare-body-wash', variant: 'primary' }],
    image: null,
    darkText: false,
  },
  {
    id: 3,
    bg: 'linear-gradient(160deg, rgba(8,22,12,0.74) 30%, rgba(15,38,22,0.52)), url("/images/cat-daily-sunblock-wall.jpg") center / cover no-repeat',
    label: 'Outdoor Protection',
    headline: ['Thavare', 'Sun Screen'],
    accentLine: null,
    sub: 'Train outdoors. Stay protected. Always.',
    ctas: [{ text: 'Shop Sun Screen — ₹1,100', href: '/products/thavare-sun-screen', variant: 'primary' }],
    image: null,
    darkText: false,
  },
  {
    id: 4,
    bg: 'linear-gradient(135deg, rgba(18,12,6,0.74) 30%, rgba(48,30,14,0.50)), url("/images/brand-slide-warm.png") center / cover no-repeat',
    label: 'Personalised For You',
    headline: ['Find Your', 'Perfect Routine'],
    accentLine: null,
    sub: 'Answer 5 questions. Get your Ayurvedic match.',
    ctas: [{ text: 'Take the Quiz →', href: '/quiz', variant: 'primary' }],
    image: null,
    darkText: false,
  },
  {
    id: 5,
    bg: 'linear-gradient(135deg, rgba(72,15,32,0.82) 35%, rgba(100,22,45,0.65)), url("/images/editorial-kumkumadi-hand.jpg") center / cover no-repeat',
    label: 'As Seen In Vogue India',
    headline: ['"The active skincare brand', 'rewriting Ayurvedic rules"'],
    accentLine: null,
    sub: '',
    ctas: [],
    image: '/images/prod-kumkumadi.png',
    imageLabel: 'Kumkumadi Face Oil',
    darkText: false,
    press: ['Vogue India', 'The Hindu', 'Femina', 'Healthshots'],
    attribution: '— Vogue India',
  },
];

const CTA_STYLES: Record<CTA['variant'], string> = {
  primary: 'bg-[#C4A882] text-[#3D1F0A] font-bold hover:opacity-90',
  ghost:   'border border-[rgba(196,168,130,0.4)] text-cream hover:border-[#C4A882]',
  dark:    'bg-navy text-cream hover:bg-navy/90',
};

const INTERVAL_MS = 5000;

export function HeroCarousel() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fading, setFading] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const goTo = useCallback((idx: number) => {
    if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    setFading(true);
    fadeTimerRef.current = setTimeout(() => {
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

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const slide = SLIDES[active];
  const isDark = !slide.darkText; // dark bg = cream text
  const textBase = slide.darkText ? 'text-navy' : 'text-cream';
  const labelColor = slide.darkText ? 'text-[#008493]' : 'text-[#C4A882]';

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;
    // Only act on taps (no significant movement), skip links/buttons
    if (Math.abs(dx) > 12 || Math.abs(dy) > 12) return;
    if ((e.target as HTMLElement).closest('a, button')) return;
    const rect = e.currentTarget.getBoundingClientRect();
    if (e.changedTouches[0].clientX - rect.left < rect.width / 2) prev(); else next();
  };

  return (
    <section
      className="relative w-full h-[100svh] min-h-[560px] max-h-[900px] overflow-hidden select-none group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: slide.bg, opacity: fading ? 0 : 1 }}
      />

      {/* Gold hairlines — dark slides only */}
      {isDark && (
        <>
          <div
            className="absolute top-0 left-0 right-0 z-10 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #C4A882, transparent)', opacity: fading ? 0 : 1, transition: 'opacity 0.3s' }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 z-10 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #C4A882, transparent)', opacity: fading ? 0 : 1, transition: 'opacity 0.3s' }}
          />
        </>
      )}

      {/* Content */}
      <div
        className="relative z-10 h-full flex items-center px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.3s' }}
      >
        <div className="flex-1 max-w-[560px]">
          {slide.label && (
            <div className={`text-[10px] font-semibold tracking-[4px] uppercase mb-4 ${labelColor}`}>
              {slide.label}
            </div>
          )}
          <h1 className={`font-serif text-[clamp(24px,5vw,72px)] font-medium leading-[1.08] mb-3 md:mb-4 ${textBase}`}>
            {slide.headline.map((line, i) => (
              <span key={i} className="block">
                {slide.accentLine === i
                  ? <em className="italic text-[#E8A87C] not-italic">{line}</em>
                  : line}
              </span>
            ))}
          </h1>
          {slide.sub && (
            <p className={`text-[14px] md:text-[16px] leading-relaxed mb-6 md:mb-8 ${slide.darkText ? 'text-[#5C5448]' : 'text-cream/65'}`}>
              {slide.sub}
            </p>
          )}
          {slide.press && (
            <p className={`text-[13px] mb-6 ${slide.darkText ? 'text-[#5C5448]' : 'text-cream/50'}`}>
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
          <div className="hidden md:flex flex-1 flex-col items-center justify-center gap-3">
            <Image
              src={slide.image}
              alt={slide.headline.join(' ')}
              width={320}
              height={420}
              className="h-[65vh] w-auto object-contain"
              style={{ filter: isDark ? 'drop-shadow(0 8px 24px rgba(0,0,0,0.30))' : 'drop-shadow(0 6px 16px rgba(168,122,83,0.18))' }}
              priority={active === 0}
            />
            {slide.imageLabel && (
              <span className="text-[11px] font-medium tracking-[2px] uppercase text-[#A87A53]">
                {slide.imageLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Desktop-only prev/next arrows */}
      <button onClick={prev} aria-label="Previous slide" className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center text-black transition-all cursor-none opacity-0 group-hover:opacity-100 text-base">‹</button>
      <button onClick={next} aria-label="Next slide" className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 items-center justify-center text-black transition-all cursor-none opacity-0 group-hover:opacity-100 text-base">›</button>

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
