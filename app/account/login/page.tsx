import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Sign In' };

export default function LoginPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20">
      <h1 className="font-serif text-[36px] font-medium text-navy mb-4">Sign In</h1>
      <p className="text-[15px] text-text-2 mb-8 text-center max-w-md">
        Account features are coming soon. In the meantime, you can continue shopping as a guest.
      </p>
      <Link href="/shop" className="px-6 py-3 bg-navy text-cream rounded-lg text-[11px] font-semibold tracking-[1.5px] uppercase hover:bg-navy/90 transition-colors">
        Continue Shopping
      </Link>
    </div>
  );
}
