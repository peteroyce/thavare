import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { OrderSuccessClearer } from './OrderSuccessClearer';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Order Confirmed - Thavare',
  description: 'Thank you for your order. Your Thavare products are on their way.',
  robots: { index: false, follow: false },
};

export default function OrderSuccessPage() {
  return (
    <div className="bg-cream min-h-[70vh] flex items-center justify-center px-4">
      <Suspense><OrderSuccessClearer /></Suspense>
      <div className="text-center max-w-[480px]">
        <div className="w-16 h-16 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center mx-auto mb-8">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-teal">
            <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
          Order Confirmed
        </div>
        <h1 className="font-serif text-[clamp(28px,4vw,42px)] font-medium text-navy leading-[1.12] mb-4">
          Thank You for Your Order
        </h1>
        <p className="text-[14px] leading-[1.75] text-text-2 mb-10">
          Your Thavare products are on their way. You will receive a confirmation email
          shortly with your order details and tracking information.
        </p>

        <div className="border-t border-navy/10 mb-10" />

        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/shop">
            <Button variant="primary">Continue Shopping</Button>
          </Link>
          <Link href="/">
            <button className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none border border-navy/20 text-navy/70 hover:border-navy/40 hover:text-navy bg-transparent">
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
