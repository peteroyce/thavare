'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/shop' },
  { label: 'Our Story', href: '/about' },
  { label: 'The Circle', href: '/circle' },
  { label: 'Search', href: '/shop' },
];

const LEFT_LINKS = NAV_LINKS.slice(0, 3);
const RIGHT_LINKS = NAV_LINKS.slice(3);

const SHOP_CATEGORIES = [
  { label: 'Pre-Sport',        href: '/shop?category=sport',            sub: 'Prime your skin before training' },
  { label: 'During Activity',  href: '/shop?category=sport',            sub: 'Formulated for skin in motion' },
  { label: 'Recovery',         href: '/shop?category=recovery',         sub: 'Restore and renew post-workout' },
  { label: 'Daily Essentials', href: '/shop?category=daily-essentials', sub: 'For the everyday mover' },
  { label: 'Sun Protection',   href: '/shop?category=sun-protection',   sub: 'SPF Ayurvedic defence' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const totalItems = useCart(s => s.totalItems());

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 h-[72px] flex items-center justify-between px-6 md:px-16 transition-all duration-300 border-b ${
          scrolled
            ? 'bg-navy-deep backdrop-blur-2xl border-white/10'
            : 'bg-transparent border-transparent'
        }`}
      >
        {/* Left links — desktop only */}
        <div className="hidden md:flex items-center gap-7">
          {/* Shop — hover-activated mega flyout */}
          <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
            <button className="text-[11px] font-medium tracking-[1.5px] uppercase text-cream/60 hover:text-cream transition-colors duration-200 relative group flex items-center gap-1 cursor-none">
              Shop
              <span className={`text-[8px] transition-transform duration-200 ${shopOpen ? 'rotate-180' : ''}`}>▾</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-teal group-hover:w-full transition-[width] duration-300" />
            </button>

            {shopOpen && (
              <div className="absolute top-full left-0 mt-2 w-[220px] bg-navy-deep border border-white/10 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] py-2 z-50">
                {SHOP_CATEGORIES.map(({ label, href, sub }) => (
                  <Link
                    key={label}
                    href={href}
                    className="flex flex-col px-5 py-3 hover:bg-white/5 transition-colors duration-150 group/item"
                  >
                    <span className="text-[12px] font-medium text-cream/80 group-hover/item:text-cream transition-colors">{label}</span>
                    {sub && <span className="text-[10px] text-cream/35 mt-0.5">{sub}</span>}
                  </Link>
                ))}
                <div className="border-t border-white/10 mt-2 pt-2">
                  <Link href="/shop" className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors duration-150">
                    <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-teal">View All Products</span>
                    <span className="text-teal text-[10px]">→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Collections and Our Story */}
          {LEFT_LINKS.filter(({ label }) => label !== 'Shop').map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="text-[11px] font-medium tracking-[1.5px] uppercase text-cream/60 hover:text-cream transition-colors duration-200 relative group"
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-teal group-hover:w-full transition-[width] duration-300" />
            </Link>
          ))}
        </div>

        {/* Logo — centered on desktop, left-ish on mobile */}
        <Link href="/" className="flex items-center gap-3 no-underline group md:absolute md:left-1/2 md:-translate-x-1/2">
          <div className="w-9 h-9 rounded-full border border-camel/50 flex items-center justify-center text-camel text-base transition-all duration-300 group-hover:border-camel group-hover:rotate-[20deg]">
            ◎
          </div>
          <div>
            <span className="block font-serif text-lg font-medium tracking-[5px] text-cream leading-none">THAVARE</span>
            <span className="block text-[8px] tracking-[2px] uppercase text-cream/40 mt-0.5">Clinically Crafted Ayurveda</span>
          </div>
        </Link>

        {/* Right links — desktop only */}
        <div className="hidden md:flex items-center gap-7">
          {RIGHT_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
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

        {/* Mobile right: bag icon + hamburger */}
        <div className="flex md:hidden items-center gap-4 ml-auto">
          <Link
            href="/cart"
            className="text-[11px] font-medium tracking-wide uppercase text-cream/70 hover:text-cream transition-colors duration-200"
          >
            Bag ({totalItems})
          </Link>

          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen(prev => !prev)}
            className="flex flex-col justify-center items-center w-8 h-8 gap-0 relative"
          >
            {menuOpen ? (
              /* X icon */
              <span className="text-cream text-xl leading-none select-none">✕</span>
            ) : (
              /* 3-line hamburger */
              <span className="flex flex-col gap-[5px]">
                <span className="block w-6 h-px bg-cream" />
                <span className="block w-6 h-px bg-cream" />
                <span className="block w-6 h-px bg-cream" />
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay — slides in from right */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'rgba(17,28,53,0.97)', backdropFilter: 'blur(16px)' }}
      >
        {/* Close tap on backdrop area — covered by the panel itself so not needed,
            but we add a top padding to sit below the sticky nav */}
        <div className="flex flex-col items-center justify-center h-full gap-10 px-8 pt-[72px]">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="font-serif text-[28px] text-cream hover:text-camel transition-colors duration-200 tracking-wide"
            >
              {label}
            </Link>
          ))}

          <Link
            href="/cart"
            onClick={closeMenu}
            className="mt-4 px-8 py-3 rounded-lg border border-cream/30 text-[13px] font-medium tracking-[1.5px] uppercase text-cream hover:border-cream/60 hover:bg-cream/5 transition-all duration-200"
          >
            Bag ({totalItems})
          </Link>
        </div>
      </div>
    </>
  );
}
