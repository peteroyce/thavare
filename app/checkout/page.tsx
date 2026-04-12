'use client';

import { useCart } from '@/lib/cart';
import { CheckoutForm } from '@/components/checkout/CheckoutForm';
import Image from 'next/image';
import Link from 'next/link';

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const total    = totalPrice();
  const shipping = total >= 499 ? 0 : 99;

  return (
    <div className="min-h-screen bg-cream px-20 py-14">
      <div className="max-w-[1100px] mx-auto">
        <div className="mb-10">
          <Link href="/cart" className="text-[12px] text-text-3 hover:text-text-1 transition-colors">← Back to Bag</Link>
          <h1 className="font-serif text-[36px] font-medium text-navy mt-2">Checkout</h1>
        </div>
        <div className="grid grid-cols-[1fr_380px] gap-12">
          <CheckoutForm />
          {/* Order summary */}
          <div className="bg-ivory rounded-2xl p-8 border border-[#E5DDD0] h-fit">
            <h2 className="font-serif text-[20px] font-medium text-navy mb-5">Order ({items.length} items)</h2>
            <div className="flex flex-col gap-4 mb-6">
              {items.map(({ product: p, quantity }) => (
                <div key={p.id} className="flex gap-3 items-center">
                  <div className="w-14 h-14 bg-cream rounded-lg flex items-center justify-center flex-shrink-0 border border-[#E5DDD0]">
                    <Image src={p.images.card} alt={p.name} width={44} height={50} className="h-[80%] w-auto object-contain" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.1))' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] font-medium text-navy truncate">{p.name}</div>
                    <div className="text-[11px] text-text-3">Qty: {quantity}</div>
                  </div>
                  <span className="text-[14px] font-semibold text-terracotta flex-shrink-0">₹{p.price * quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#D4C8B8] pt-4">
              <div className="flex justify-between text-[13px] text-text-2 mb-2"><span>Subtotal</span><span>₹{total}</span></div>
              <div className="flex justify-between text-[13px] text-text-2 mb-4"><span>Shipping</span><span>{shipping === 0 ? <span className="text-teal">Free</span> : `₹${shipping}`}</span></div>
              <div className="flex justify-between font-semibold text-[18px] text-navy"><span>Total</span><span>₹{total + shipping}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
