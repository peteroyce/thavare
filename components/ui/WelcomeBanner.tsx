'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'thavare-welcome-dismissed';

export function WelcomeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable (e.g. SSR, private browsing restrictions)
    }
  }, []);

  function dismiss() {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="w-full bg-terracotta text-white py-2.5 px-4 flex items-center justify-center gap-3">
      <span className="text-[12px] font-medium tracking-wide text-center">
        Welcome — Get 10% off your first order with code{' '}
        <strong className="font-semibold">WELCOME10</strong> at checkout
      </span>
      <button
        onClick={dismiss}
        aria-label="Dismiss welcome banner"
        className="ml-auto shrink-0 text-white/70 hover:text-white text-[16px] leading-none transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
      >
        ×
      </button>
    </div>
  );
}
