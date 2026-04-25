// components/ui/FloatingVideo.tsx
'use client';

import { useState, useEffect } from 'react';

const VIDEO_URL =
  process.env.NEXT_PUBLIC_BRAND_VIDEO_URL ??
  'https://videos.pexels.com/video-files/5322089/5322089-sd_640_360_25fps.mp4';

type Status = 'hidden' | 'expanded' | 'minimised';

export function FloatingVideo() {
  const [status, setStatus] = useState<Status>('hidden');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try { if (sessionStorage.getItem('thavare-video-dismissed')) return; } catch { return; }
    const timer = setTimeout(() => setStatus('expanded'), 4000);
    return () => clearTimeout(timer);
  }, []);

  function dismiss() {
    setStatus('hidden');
    try { sessionStorage.setItem('thavare-video-dismissed', '1'); } catch {}
  }

  if (status === 'hidden') return null;

  if (status === 'minimised') {
    return (
      <button
        onClick={() => setStatus('expanded')}
        className="fixed bottom-6 right-6 z-[9998] w-14 h-14 rounded-full bg-navy shadow-[0_4px_16px_rgba(0,0,0,0.25)] flex items-center justify-center hover:scale-105 transition-transform toast-slide-in"
        aria-label="Expand video"
      >
        <span className="text-cream text-xl leading-none">▶</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-[9998] w-[220px] rounded-xl overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.25)] toast-slide-in">
      <div className="relative bg-navy-deep">
        <video
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setStatus('hidden')}
          className="w-full h-[124px] object-cover"
        />
        <div className="absolute top-1.5 right-1.5 flex gap-1">
          <button
            onClick={() => setStatus('minimised')}
            aria-label="Minimise video"
            className="w-5 h-5 rounded bg-black/60 text-white text-[11px] flex items-center justify-center hover:bg-black/80 transition-colors leading-none"
          >
            −
          </button>
          <button
            onClick={dismiss}
            aria-label="Dismiss video"
            className="w-5 h-5 rounded bg-black/60 text-white text-[11px] flex items-center justify-center hover:bg-black/80 transition-colors leading-none"
          >
            ×
          </button>
        </div>
      </div>
      <div className="px-3 py-2.5 bg-navy">
        <div className="text-[9px] text-camel/60 uppercase tracking-[1px] mb-0.5">Now Playing</div>
        <div className="font-serif text-[12px] text-cream leading-snug">Thavare — The Active Ritual</div>
      </div>
    </div>
  );
}
