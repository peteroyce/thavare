'use client';

import { useState, type FormEvent } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

// Note: metadata cannot be exported from a client component.
// SEO is handled via the root layout or a parent server wrapper if needed.

type FormState = 'idle' | 'submitted';

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;
    setFormState('submitted');
  }

  return (
    <div className="bg-cream min-h-screen px-4 md:px-10 lg:px-20 py-14 md:py-24">
      <div className="max-w-[800px] mx-auto">

        <AnimatedSection>
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
            Help
          </div>
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-medium text-navy leading-[1.1] mb-3">
            Track Your Order
          </h1>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Enter your order number and email address below to find your delivery status.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {formState === 'idle' ? (
          <AnimatedSection delay={1}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Order Number */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="order-number"
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-navy/70"
                >
                  Order Number
                </label>
                <input
                  id="order-number"
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g. THV-10042"
                  required
                  className="w-full bg-ivory border border-[#E5DDD0] rounded-lg px-4 py-3 text-[14px] text-navy placeholder:text-text-3 focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/30 transition-colors duration-200"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-[11px] font-semibold tracking-[2px] uppercase text-navy/70"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="The email used to place your order"
                  required
                  className="w-full bg-ivory border border-[#E5DDD0] rounded-lg px-4 py-3 text-[14px] text-navy placeholder:text-text-3 focus:outline-none focus:border-teal/50 focus:ring-1 focus:ring-teal/30 transition-colors duration-200"
                />
              </div>

              <div className="pt-1">
                <Button variant="primary" type="submit">
                  Track Order
                </Button>
              </div>
            </form>
          </AnimatedSection>
        ) : (
          <AnimatedSection delay={1}>
            <div className="bg-ivory border border-[#E5DDD0] rounded-xl px-7 py-8">
              <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
                Order Lookup
              </div>
              <p className="font-serif text-[18px] font-medium text-navy mb-3">
                Check Your Email
              </p>
              <p className="text-[14px] leading-[1.75] text-text-2 mb-5">
                Please check your email for the shipping confirmation with your tracking link,
                or contact us at{' '}
                <a
                  href="mailto:support@thavare.com"
                  className="text-teal underline underline-offset-2"
                >
                  support@thavare.com
                </a>{' '}
                quoting your order number and we&rsquo;ll send you an update directly.
              </p>
              <button
                onClick={() => {
                  setFormState('idle');
                  setOrderNumber('');
                  setEmail('');
                }}
                className="text-[12px] font-semibold tracking-widest uppercase text-navy/50 hover:text-navy underline underline-offset-4 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </AnimatedSection>
        )}

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Where to find your order number */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Where to Find Your Order Number
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            Your order number was included in the order confirmation email sent to you immediately
            after checkout. It looks like{' '}
            <span className="font-medium text-navy">THV-XXXXX</span> and appears in the email
            subject line as well as the order summary section.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            If you cannot find your confirmation email, please check your spam or promotions folder.
            You will also receive a separate shipping confirmation email once your order has been
            dispatched — this email contains your courier tracking link directly.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Still can&rsquo;t find it? Email us at{' '}
            <a href="mailto:support@thavare.com" className="text-teal underline underline-offset-2">
              support@thavare.com
            </a>{' '}
            with the name and email address used during checkout and we&rsquo;ll locate your order.
          </p>
        </AnimatedSection>

      </div>
    </div>
  );
}
