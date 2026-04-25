'use client';

import { useSearchParams } from 'next/navigation';

export function OrderDetails() {
  const searchParams = useSearchParams();
  const orderName = searchParams.get('order_name');
  const email = searchParams.get('email');

  if (!orderName && !email) return null;

  return (
    <div className="mb-6 space-y-2">
      {orderName && (
        <p className="text-[16px] font-medium text-navy">
          Order {orderName}
        </p>
      )}
      {email && (
        <p className="text-[13px] text-text-2">
          Confirmation sent to <span className="font-medium text-text-1">{email}</span>
        </p>
      )}
    </div>
  );
}
