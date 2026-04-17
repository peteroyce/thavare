'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCart } from '@/lib/cart';

export function OrderSuccessClearer() {
  const clearCart = useCart(s => s.clearCart);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only clear cart if Shopify redirected back with a checkout key
    const hasOrder = searchParams.has('key') || searchParams.has('order_id');
    if (hasOrder) {
      clearCart();
    }
  }, [clearCart, searchParams]);

  return null;
}
