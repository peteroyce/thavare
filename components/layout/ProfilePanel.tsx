'use client';

import Link from 'next/link';
import { useWishlist } from '@/lib/wishlist';

interface Props {
  open: boolean;
  onClose: () => void;
}

const PROFILE_ROWS = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    label: 'My Wishlist',
    sub: null, // filled dynamically
    href: '/wishlist',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M5 8h14M5 8a2 2 0 1 0 0-4h14a2 2 0 1 0 0 4M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8M10 12h4"/>
      </svg>
    ),
    label: 'My Orders',
    sub: 'Track & manage orders',
    href: '/track-order',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M17.657 16.657L13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z"/>
        <path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
      </svg>
    ),
    label: 'Saved Addresses',
    sub: 'Sign in to manage',
    href: null,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/>
      </svg>
    ),
    label: 'Recent Purchases',
    sub: 'Sign in to view history',
    href: null,
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
        <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
      </svg>
    ),
    label: 'My Skin Profile',
    sub: 'Your Ayurvedic quiz result',
    href: '/quiz',
  },
];

export function ProfilePanel({ open, onClose }: Props) {
  const wishlistItems = useWishlist(s => s.items);

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ease-in-out flex flex-col ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}
      style={{ background: 'rgba(15,25,48,0.98)', backdropFilter: 'blur(20px)' }}
      aria-modal="true"
      aria-label="Profile panel"
      aria-hidden={!open}
      tabIndex={-1}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 h-[72px] border-b border-white/10 shrink-0">
        <span className="font-serif text-[20px] font-medium text-cream tracking-wide">My Account</span>
        <button
          onClick={onClose}
          aria-label="Close profile"
          className="w-8 h-8 flex items-center justify-center text-cream/50 hover:text-cream transition-colors text-lg"
        >
          ✕
        </button>
      </div>

      {/* Scrollable body */}
      <div className="flex-1 overflow-y-auto px-6 py-7">

        {/* Guest state */}
        <div className="flex flex-col items-center text-center mb-8 pt-2">
          <div className="w-[60px] h-[60px] rounded-full bg-white/8 border border-white/15 flex items-center justify-center text-cream/50 mb-4">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
              <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
            </svg>
          </div>
          <p className="font-serif text-[20px] text-cream mb-1">Hello, Mover</p>
          <p className="text-[13px] text-cream/45">Sign in to unlock your full experience</p>
        </div>

        {/* Auth CTA */}
        <div className="flex gap-3 mb-8">
          <Link
            href="/account/login"
            onClick={onClose}
            className="flex-1 py-3.5 text-center rounded-xl bg-teal text-white text-[11px] font-semibold tracking-[2px] uppercase transition-opacity hover:opacity-85"
          >
            Sign In
          </Link>
          <Link
            href="/account/register"
            onClick={onClose}
            className="flex-1 py-3.5 text-center rounded-xl border border-cream/20 text-cream text-[11px] font-semibold tracking-[2px] uppercase hover:bg-white/5 transition-colors"
          >
            Create Account
          </Link>
        </div>

        {/* Divider label */}
        <p className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/25 mb-4">Your Space</p>

        {/* Profile rows */}
        <div className="flex flex-col gap-2.5 mb-6">
          {PROFILE_ROWS.map((row) => {
            const sub = row.label === 'My Wishlist'
              ? `${wishlistItems.length} saved item${wishlistItems.length !== 1 ? 's' : ''}`
              : row.sub;

            const inner = (
              <div className="flex items-center justify-between px-4 py-3.5 rounded-xl bg-white/5 border border-white/8 hover:bg-white/9 active:bg-white/12 transition-colors group">
                <div className="flex items-center gap-3.5">
                  <span className="text-cream/50 group-hover:text-cream/70 transition-colors">{row.icon}</span>
                  <div>
                    <div className="text-[14px] font-medium text-cream leading-tight">{row.label}</div>
                    {sub && <div className="text-[11px] text-cream/38 mt-0.5">{sub}</div>}
                  </div>
                </div>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cream/20 group-hover:text-cream/40 transition-colors shrink-0">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            );

            return row.href ? (
              <Link key={row.label} href={row.href} onClick={onClose}>
                {inner}
              </Link>
            ) : (
              <div key={row.label} className="opacity-60 cursor-default">{inner}</div>
            );
          })}

          {/* Rewards — coming soon badge */}
          <div className="relative flex items-center justify-between px-4 py-3.5 rounded-xl bg-white/5 border border-white/8 overflow-hidden">
            <div className="absolute top-0 right-0 bg-camel/25 text-camel text-[8px] font-bold tracking-[2px] uppercase px-3 py-1 rounded-bl-xl">
              Coming Soon
            </div>
            <div className="flex items-center gap-3.5">
              <span className="text-cream/30">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </span>
              <div>
                <div className="text-[14px] font-medium text-cream/50">Thavare Rewards</div>
                <div className="text-[11px] text-cream/28 mt-0.5">Earn points on every purchase</div>
              </div>
            </div>
          </div>
        </div>

        {/* Gift Cards */}
        <div className="rounded-xl border border-camel/20 bg-camel/5 px-4 py-4 mb-8 flex items-center gap-3.5">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-camel shrink-0">
            <rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20M7 6V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2M13 6V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2"/>
          </svg>
          <div>
            <div className="text-[13px] font-medium text-camel">Gift Cards</div>
            <div className="text-[11px] text-camel/60 mt-0.5">Give the gift of Ayurveda</div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/8 pt-6 mb-4">
          <p className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/20 mb-3">Support</p>
          <div className="flex flex-col gap-3">
            <Link href="/faqs" onClick={onClose} className="flex items-center justify-between text-[13px] text-cream/40 hover:text-cream/70 transition-colors">
              Help & FAQs
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
            <Link href="/shipping" onClick={onClose} className="flex items-center justify-between text-[13px] text-cream/40 hover:text-cream/70 transition-colors">
              Shipping & Returns
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
            <Link href="/track-order" onClick={onClose} className="flex items-center justify-between text-[13px] text-cream/40 hover:text-cream/70 transition-colors">
              Track an Order
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </Link>
            <a href="mailto:support@thavare.com" className="flex items-center justify-between text-[13px] text-cream/40 hover:text-cream/70 transition-colors">
              Contact Support
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
            </a>
          </div>
        </div>

        {/* Legal micro-links */}
        <div className="flex gap-5 mt-6 pb-8">
          <Link href="/privacy-policy" onClick={onClose} className="text-[11px] text-cream/20 hover:text-cream/45 transition-colors">Privacy</Link>
          <Link href="/terms" onClick={onClose} className="text-[11px] text-cream/20 hover:text-cream/45 transition-colors">Terms</Link>
        </div>

      </div>
    </div>
  );
}
