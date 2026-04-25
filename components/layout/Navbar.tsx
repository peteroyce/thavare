'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCart } from '@/lib/cart';
import { ProfilePanel } from './ProfilePanel';

const NAV_LINKS = [
  { label: 'Shop', href: '/shop' },
  { label: 'Collections', href: '/shop' },
  { label: 'Our Story', href: '/about' },
  { label: 'Journal', href: '/journal' },
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
  const [profileOpen, setProfileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const totalItems = useCart(s => s.totalItems());

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menuOpen) setMenuOpen(false);
      if (e.key === 'Escape' && profileOpen) setProfileOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, profileOpen]);

  const closeMenu = () => setMenuOpen(false);

  const linkCls     = scrolled ? 'text-navy/70 hover:text-navy' : 'text-cream/70 hover:text-cream';
  const logoCls     = scrolled ? 'text-navy' : 'text-cream';
  const logoSubCls  = scrolled ? 'text-navy/40' : 'text-cream/40';
  const bagCls      = scrolled
    ? 'border-navy/20 text-navy hover:border-navy/40 hover:bg-navy/5'
    : 'border-cream/20 text-cream hover:border-cream/45 hover:bg-cream/5';
  const mobileBagCls   = scrolled ? 'text-navy/70 hover:text-navy' : 'text-cream/70 hover:text-cream';
  const hamburgerCls   = `block w-6 h-px ${scrolled ? 'bg-navy' : 'bg-cream'}`;

  return (
    <>
      <nav
        className={`sticky top-0 z-50 h-[72px] flex md:grid md:grid-cols-[1fr_auto_1fr] items-center justify-between px-6 md:px-16 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-b ${
          scrolled
            ? 'bg-ivory/95 backdrop-blur-2xl border-[#E5DDD0]'
            : 'bg-navy-deep/92 backdrop-blur-md border-white/8'
        }`}
      >
        {/* Left links — desktop only */}
        <div className="hidden md:flex items-center gap-4 lg:gap-7 justify-self-start">
          {/* Shop — hover-activated mega flyout */}
          <div className="relative" onMouseEnter={() => setShopOpen(true)} onMouseLeave={() => setShopOpen(false)}>
            <button aria-expanded={shopOpen} aria-haspopup="true" className={`text-[11px] font-medium tracking-[1.5px] uppercase transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] relative group flex items-center gap-1 ${linkCls}`}>
              Shop
              <span className={`text-[8px] transition-transform duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${shopOpen ? 'rotate-180' : ''}`}>▾</span>
              <span className="absolute bottom-0 left-0 w-0 h-px bg-terracotta group-hover:w-full transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </button>

            {shopOpen && (
              <div className="absolute top-full left-0 pt-3 w-[220px] z-50">
                <div className="bg-navy-deep border border-white/10 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] py-2">
                  {SHOP_CATEGORIES.map(({ label, href, sub }) => (
                    <Link
                      key={label}
                      href={href}
                      className="flex flex-col px-5 py-3 hover:bg-white/5 transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)] group/item"
                    >
                      <span className="text-[12px] font-medium text-cream/80 group-hover/item:text-cream transition-colors">{label}</span>
                      {sub && <span className="text-[10px] text-cream/35 mt-0.5">{sub}</span>}
                    </Link>
                  ))}
                  <div className="border-t border-white/10 mt-2 pt-2">
                    <Link href="/shop" className="flex items-center justify-between px-5 py-3 hover:bg-white/5 transition-colors duration-150 ease-[cubic-bezier(0.16,1,0.3,1)]">
                      <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-terracotta">View All Products</span>
                      <span className="text-terracotta text-[10px]">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Collections and Our Story */}
          {LEFT_LINKS.filter(({ label }) => label !== 'Shop').map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-[11px] font-medium tracking-[1.5px] uppercase transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] relative group ${linkCls}`}
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-terracotta group-hover:w-full transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </Link>
          ))}
        </div>

        {/* Logo — centered on desktop, left-ish on mobile */}
        <Link href="/" className="flex items-center gap-3 no-underline group md:justify-self-center flex-shrink-0">
          <img src="/images/thavare-icon.svg" alt="" className="w-9 h-9 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[20deg]" style={{ color: 'var(--camel)' }} />
          <div>
            <span className={`block font-serif text-lg font-medium tracking-[5px] leading-none whitespace-nowrap ${logoCls}`}>THAVARE</span>
            <span className={`block text-[8px] tracking-[2px] uppercase mt-0.5 whitespace-nowrap hidden lg:block ${logoSubCls}`}>Clinically Crafted Ayurveda</span>
          </div>
        </Link>

        {/* Right links — desktop only */}
        <div className="hidden md:flex items-center gap-4 lg:gap-7 justify-self-end">
          {RIGHT_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-[11px] font-medium tracking-[1.5px] uppercase transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] relative group ${linkCls}`}
            >
              {label}
              <span className="absolute bottom-0 left-0 w-0 h-px bg-terracotta group-hover:w-full transition-[width] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </Link>
          ))}
          <Link
            href="/cart"
            className={`px-5 py-2 rounded-lg border text-[11px] font-medium tracking-wide uppercase transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${bagCls}`}
          >
            Bag ({mounted ? totalItems : 0})
          </Link>
          <button
            aria-label="My account"
            onClick={() => setProfileOpen(prev => !prev)}
            className={`flex items-center justify-center w-8 h-8 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'text-navy/70 hover:text-navy' : 'text-cream/70 hover:text-cream'}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </button>
        </div>

        {/* Mobile right: bag + profile + hamburger */}
        <div className="flex md:hidden items-center gap-3.5 ml-auto">
          <Link
            href="/cart"
            className={`text-[11px] font-medium tracking-wide uppercase transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] min-w-[44px] min-h-[44px] flex items-center justify-center ${mobileBagCls}`}
          >
            Bag ({mounted ? totalItems : 0})
          </Link>

          {/* Profile icon */}
          <button
            aria-label="My account"
            onClick={() => { setProfileOpen(true); setMenuOpen(false); }}
            className={`flex items-center justify-center w-11 h-11 transition-colors duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'text-navy/70 hover:text-navy' : 'text-cream/70 hover:text-cream'}`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </button>

          <button
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(prev => !prev)}
            className="flex flex-col justify-center items-center w-11 h-11 gap-0 relative"
          >
            {menuOpen ? (
              <span className="text-cream text-xl leading-none select-none">✕</span>
            ) : (
              <span className="flex flex-col gap-[5px]">
                <span className={hamburgerCls} />
                <span className={hamburgerCls} />
                <span className={hamburgerCls} />
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu drawer */}
      <div
        className={`fixed inset-0 z-[60] md:hidden transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'var(--navy-deep)', backdropFilter: 'blur(20px)' }}
        aria-hidden={!menuOpen}
        role="dialog"
        aria-label="Navigation menu"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 h-[68px] border-b border-white/8 shrink-0">
          <div className="flex items-center gap-2.5">
            <img src="/images/thavare-icon.svg" alt="" className="w-7 h-7" style={{ color: 'var(--camel)' }} />
            <span className="font-serif text-[15px] tracking-[4px] text-cream/80">THAVARE</span>
          </div>
          <button onClick={closeMenu} aria-label="Close menu" className="w-8 h-8 flex items-center justify-center text-cream/40 text-lg">✕</button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 py-5">

          {/* Profile — first, most prominent */}
          <button
            onClick={() => { setMenuOpen(false); setProfileOpen(true); }}
            className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-2xl mb-5 text-left"
            style={{ background: 'linear-gradient(135deg, rgba(196,168,130,0.14) 0%, rgba(255,255,255,0.04) 100%)', border: '1px solid rgba(196,168,130,0.22)' }}
          >
            <div className="w-10 h-10 rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-cream/50 shrink-0">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold text-cream leading-tight">My Profile</div>
              <div className="text-[11px] text-cream/40 mt-0.5">Sign in · Orders · Wishlist</div>
            </div>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-camel/50 shrink-0">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>

          {/* Explore */}
          <p className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/25 mb-3 px-1">Explore</p>
          <div className="flex flex-col mb-5">
            {[
              { label: 'Shop All',     href: '/shop',             sub: 'Browse the full range' },
              { label: 'Collections',  href: '/shop',             sub: 'Pre-Sport · Recovery · Daily' },
              { label: 'Our Story',    href: '/about',            sub: 'The science behind Thavare' },
              { label: 'Journal',      href: '/journal',          sub: 'Expert skin & movement tips' },
              { label: 'The Circle',   href: '/circle',           sub: 'Expert community & advice' },
              { label: 'Skin Quiz',    href: '/quiz',             sub: 'Find your Ayurvedic match' },
            ].map(({ label, href, sub }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="flex items-center justify-between py-3.5 border-b border-white/6 group active:bg-white/4 rounded-lg px-1"
              >
                <div>
                  <div className="text-[15px] font-medium text-cream/85 group-active:text-cream leading-tight">{label}</div>
                  <div className="text-[11px] text-cream/30 mt-0.5">{sub}</div>
                </div>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/20 shrink-0">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </Link>
            ))}
          </div>

          {/* Support */}
          <p className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/25 mb-3 px-1">Support</p>
          <div className="flex flex-col mb-6">
            {[
              { label: 'Track My Order', href: '/track-order' },
              { label: 'FAQs',           href: '/faqs' },
              { label: 'Contact Us',     href: '/about' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                onClick={closeMenu}
                className="flex items-center justify-between py-3 border-b border-white/6 px-1 active:bg-white/4 rounded-lg"
              >
                <span className="text-[14px] text-cream/55">{label}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/20 shrink-0">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </Link>
            ))}
          </div>

          {/* IG link */}
          <a
            href="https://www.instagram.com/thavare_ayurveda"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 px-1 py-2 text-cream/65 text-[12px] tracking-wide"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
            </svg>
            @thavare_ayurveda
          </a>

        </div>

        {/* Fixed bottom — Bag CTA */}
        <div className="shrink-0 px-5 pb-8 pt-3 border-t border-white/8">
          <Link
            href="/cart"
            onClick={closeMenu}
            className="flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-terracotta text-cream text-[12px] font-semibold tracking-[2px] uppercase"
          >
            <span>My Bag</span>
            <span className="bg-cream/20 text-cream text-[11px] font-bold px-2.5 py-0.5 rounded-full min-w-[24px] text-center">
              {mounted ? totalItems : 0}
            </span>
          </Link>
        </div>
      </div>

      {/* Profile panel */}
      <ProfilePanel open={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
