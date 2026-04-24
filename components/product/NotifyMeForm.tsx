'use client';

import { useState } from 'react';
import { notifyBackInStock } from '@/lib/klaviyo';

export function NotifyMeForm({ productName }: { productName: string }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError(null);
    try {
      await notifyBackInStock(email, productName);
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <p className="text-[13px] text-terracotta font-medium text-center py-3">
        Got it! We&apos;ll email you at {email} when this is back in stock.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="text-[11px] text-text-3 tracking-wide uppercase font-medium mb-2">
        Get notified when back in stock
      </div>
      <input
        type="email"
        required
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        aria-label={`Notify me when ${productName} is back in stock`}
        className="w-full px-4 py-3 rounded-lg border border-[#D4C8B8] bg-white text-[14px] text-navy focus:outline-none focus:border-terracotta transition-colors"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 rounded-lg bg-navy text-cream text-[11px] font-semibold tracking-widest uppercase hover:bg-navy/90 transition-colors cursor-none"
      >
        {loading ? 'Saving...' : 'Notify Me'}
      </button>
      {error && <p className="text-[12px] text-red-500 mt-1">{error}</p>}
    </form>
  );
}
