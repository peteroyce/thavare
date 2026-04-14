// components/home/HeroCarousel.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
  const textBase = slide.darkText ? 'text-navy' : 'text-cream';
  const labelColor = slide.darkText ? 'text-[#2A7A6A]' : 'text-[#C4A882]';

  return (
    <section
      className="relative w-full h-[100svh] min-h-[560px] max-h-[900px] overflow-hidden select-none group"
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
              priority={active === 0}
            />
          </div>
        )}
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-none opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 text-lg"
      >
        ‹
      </button>
      <button
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white transition-all cursor-none opacity-0 hover:opacity-100 focus:opacity-100 group-hover:opacity-100 text-lg"
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
