// components/ui/Toast.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import type { Toast as ToastData } from '@/lib/toast';

type Config = {
  borderColor: string;
  labelColor: string;
  label: string;
  ctaText?: string;
  ctaHref?: string;
};

const CONFIG: Record<ToastData['type'], Config> = {
  'cart-add': {
    borderColor: '#2A7A6A',
    labelColor: '#2A7A6A',
    label: 'Added to Bag',
    ctaText: 'View Bag',
    ctaHref: '/cart',
  },
  'cart-update': {
    borderColor: '#2A7A6A',
    labelColor: '#2A7A6A',
    label: 'Bag Updated',
    ctaText: 'View Bag',
    ctaHref: '/cart',
  },
  'wishlist-add': {
    borderColor: '#C07B3A',
    labelColor: '#C07B3A',
    label: 'Saved to Wishlist',
    ctaText: 'View Wishlist',
    ctaHref: '/wishlist',
  },
  'wishlist-remove': {
    borderColor: '#9A8F84',
    labelColor: '#9A8F84',
    label: 'Removed from Wishlist',
  },
};

export function Toast({
  toast,
  onDismiss,
}: {
  toast: ToastData;
  onDismiss: (id: string) => void;
}) {
  const cfg = CONFIG[toast.type];

  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 3000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const countLine = (() => {
    if (toast.type === 'cart-add') {
      return `${toast.count} item${toast.count !== 1 ? 's' : ''} in your bag`;
    }
    if (toast.type === 'cart-update') {
      return `${toast.productName} ×${toast.quantity} · ${toast.count} item${toast.count !== 1 ? 's' : ''} in your bag`;
    }
    if (toast.type === 'wishlist-add') {
      return `${toast.count} item${toast.count !== 1 ? 's' : ''} saved`;
    }
    return null;
  })();

  const content = (
    <div
      className={`flex flex-col overflow-hidden rounded-r-xl shadow-[0_6px_28px_rgba(0,0,0,0.11)] ${cfg.ctaHref ? 'hover:shadow-[0_8px_32px_rgba(0,0,0,0.16)] transition-shadow' : ''}`}
      style={{ borderLeft: `3px solid ${cfg.borderColor}`, background: '#F5F0E8', width: 280 }}
    >
      <div className="flex items-start gap-3 px-4 py-3">
        <div className="flex-1 min-w-0">
          <div
            className="text-[11px] font-bold tracking-[1.5px] uppercase mb-1"
            style={{ color: cfg.labelColor }}
          >
            {cfg.label}
          </div>
          <div className="font-serif text-[13px] text-navy leading-snug truncate">
            {toast.type === 'cart-update' ? '' : toast.productName}
          </div>
          {countLine && (
            <div className="text-[11px] text-text-3 mt-1 leading-snug">
              {countLine}
              {cfg.ctaHref && (
                <span className="font-semibold ml-1" style={{ color: cfg.labelColor }}>
                  {cfg.ctaText} →
                </span>
              )}
            </div>
          )}
          {toast.type !== 'cart-update' ? null : (
            <div className="font-serif text-[13px] text-navy leading-snug truncate mt-0.5">
              {toast.productName}
            </div>
          )}
        </div>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDismiss(toast.id); }}
          aria-label="Dismiss notification"
          className="w-6 h-6 rounded-full border border-[#D4C8B8] flex items-center justify-center text-text-3 text-[13px] flex-shrink-0 mt-0.5 cursor-none hover:border-[#B4A898] transition-colors"
        >
          ×
        </button>
      </div>
      <div className="h-[2px]" style={{ background: '#E5DDD0' }}>
        <div
          className="h-full"
          style={{
            background: cfg.borderColor,
            width: '100%',
            animation: 'toast-progress 3s linear forwards',
          }}
        />
      </div>
    </div>
  );

  if (cfg.ctaHref) {
    return <Link href={cfg.ctaHref} onClick={() => onDismiss(toast.id)}>{content}</Link>;
  }
  return content;
}
