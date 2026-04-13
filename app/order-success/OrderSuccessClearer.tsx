'use client';

import { useEffect } from 'react';
import { useCart } from '@/lib/cart';

// Clears the cart on mount. Separated into a client component so the parent
// order-success page can remain a server component.
export function OrderSuccessClearer() {
  const clearCart = useCart(s => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
