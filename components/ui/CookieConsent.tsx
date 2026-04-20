'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem('thavare-cookie-consent')) {
        setVisible(true);
      }
    } catch {}
  }, []);

  function accept() {
    try { localStorage.setItem('thavare-cookie-consent', 'accepted'); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem('thavare-cookie-consent', 'declined'); } catch {}
    setVisible(false);
    // Disable GA by setting the opt-out window property
    const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
    if (gaId && typeof window !== 'undefined') {
      (window as Record<string, unknown>)[`ga-disable-${gaId}`] = true;
    }
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-navy-deep/97 backdrop-blur-md border-t border-white/10 px-4 md:px-10 py-4">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
        <p className="text-[13px] text-cream/70 leading-relaxed flex-1">
          We use cookies to improve your experience and analyse site traffic.{' '}
          <Link href="/privacy-policy" className="underline text-cream/90 hover:text-cream">
            Privacy Policy
          </Link>
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={decline}
            className="px-4 py-2 text-[11px] font-semibold tracking-[1px] uppercase border border-cream/20 text-cream/60 rounded-lg hover:border-cream/40 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 text-[11px] font-semibold tracking-[1px] uppercase bg-[#C4A882] text-[#3D1F0A] rounded-lg hover:opacity-90 transition-opacity"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
