'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/Button';

function CheckoutButton() {
  const createShopifyCheckout = useCart(s => s.createShopifyCheckout);
  const items = useCart(s => s.items);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      await createShopifyCheckout();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Checkout failed. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading || items.length === 0}
        className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none bg-navy text-cream hover:bg-navy/90 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Redirecting...' : 'Proceed to Checkout'}
      </button>
      {error && (
        <p className="mt-3 text-[12px] text-red-500 text-center">{error}</p>
      )}
    </div>
  );
}

export default function CartPage() {
  const { items, totalItems, totalPrice } = useCart();
  const count = totalItems();
  const total = totalPrice();
  const shipping = total >= 499 ? 0 : 99;

  if (count === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-6">
        <div className="font-serif text-[32px] text-navy">Your bag is empty</div>
        <p className="text-text-2">Discover our clinically crafted Ayurvedic range.</p>
        <Link href="/shop"><Button>Shop Now</Button></Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream px-4 md:px-10 lg:px-20 py-8 md:py-14">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="font-serif text-[36px] font-medium text-navy mb-6 md:mb-10">Your Bag ({count})</h1>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 md:gap-12">
          {/* Items */}
          <div>
            {items.map(item => <CartItem key={item.product.id} item={item} />)}
          </div>
          {/* Summary */}
          <div className="bg-ivory rounded-2xl p-8 border border-[#E5DDD0] h-fit mt-6 lg:mt-0">
            <h2 className="font-serif text-[22px] font-medium text-navy mb-6">Order Summary</h2>
            <div className="flex justify-between text-[14px] text-text-2 mb-3">
              <span>Subtotal</span><span>₹{total}</span>
            </div>
            <div className="flex justify-between text-[14px] text-text-2 mb-6">
              <span>Shipping</span>
              <span>{shipping === 0 ? <span className="text-teal font-medium">Free</span> : `₹${shipping}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-[12px] text-teal mb-4">Add ₹{499 - total} more for free shipping</p>
            )}
            <div className="border-t border-[#D4C8B8] pt-5 mb-6">
              <div className="flex justify-between font-semibold text-[18px] text-navy">
                <span>Total</span><span>₹{total + shipping}</span>
              </div>
            </div>
            <CheckoutButton />
            <Link href="/shop" className="block text-center text-[12px] text-text-3 hover:text-text-1 mt-4 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
