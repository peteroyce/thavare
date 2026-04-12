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
      className={`sticky top-0 z-50 h-[72px] flex items-center justify-between px-16 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-navy-deep backdrop-blur-2xl border-white/10'
          : 'bg-transparent border-transparent'
      }`}
    >
      {/* Left links */}
      <div className="flex items-center gap-7">
        {['Shop', 'Collections', 'Our Story'].map(label => (
          <Link
            key={label}
            href={label === 'Shop' ? '/shop' : '#'}
            className="text-[11px] font-medium tracking-[1.5px] uppercase text-cream/60 hover:text-cream transition-colors duration-200 relative group"
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
          className="px-5 py-2 rounded-lg border border-cream/20 text-[11px] font-medium tracking-wide uppercase text-cream hover:border-cream/45 hover:bg-cream/5 transition-all duration-200"
        >
          Bag ({totalItems})
        </Link>
      </div>
    </nav>
  );
}
