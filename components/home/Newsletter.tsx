'use client';

import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { subscribeToNewsletter } from '@/lib/klaviyo';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError(null);
    try {
      await subscribeToNewsletter(email);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-beige">
      <AnimatedSection className="max-w-[520px] mx-auto text-center">
        <div className="text-[10px] font-medium tracking-[4px] uppercase text-[#A87A53] mb-3">Stay in the Know</div>
        <h2 className="font-serif text-[clamp(28px,3vw,38px)] font-medium leading-[1.15] text-navy mb-3">
          Move Well. <em className="italic text-terracotta">Live Well.</em>
        </h2>
        <p className="text-[15px] leading-relaxed text-text-2">
          Join 12,000+ movers. Get early access, expert tips, and stories from the Thavare community.
        </p>
        {submitted ? (
          <p className="mt-8 font-serif italic text-[18px] text-teal-dark">You're in. Welcome to the circle.</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row mt-8 rounded-lg overflow-hidden shadow-[0_0_0_1px_#D4C8B8]">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 px-5 py-3.5 bg-ivory text-[14px] text-text-1 outline-none placeholder:text-text-3 focus:bg-white transition-colors rounded-lg sm:rounded-none sm:rounded-l-lg"
              required
            />
            <button type="submit" disabled={loading} className="px-6 py-3.5 bg-navy text-cream font-sans text-[11px] font-semibold tracking-[1.5px] uppercase hover:bg-navy-mid transition-colors cursor-none rounded-lg sm:rounded-none sm:rounded-r-lg w-full sm:w-auto">
              {loading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        )}
        {error && <p className="text-[12px] text-red-500 mt-2">{error}</p>}
        <p className="text-[12px] text-text-2/70 mt-3">No spam. Unsubscribe anytime. Dr. Meena writes occasionally too.</p>
      </AnimatedSection>
    </section>
  );
}
