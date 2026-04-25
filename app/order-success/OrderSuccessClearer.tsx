'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/cart';

export function OrderSuccessClearer() {
  const clearCart = useCart(s => s.clearCart);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Clear cart for Shopify checkout (key/order_id) or Razorpay (payment_id)
    const hasOrder = searchParams.has('key') || searchParams.has('order_id') || searchParams.has('payment_id');
    if (hasOrder) {
      clearCart();
    }
  }, [clearCart, searchParams]);

  return null;
}
