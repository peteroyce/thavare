'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { validateCheckoutForm, type CheckoutFields } from '@/lib/checkout';
import { Button } from '@/components/ui/Button';

const EMPTY: CheckoutFields = { name: '', email: '', phone: '', address: '', city: '', state: '', pincode: '' };

const FIELDS: { key: keyof CheckoutFields; label: string; type?: string; full?: boolean }[] = [
  { key: 'name',    label: 'Full Name',  full: true },
  { key: 'email',   label: 'Email',      type: 'email' },
  { key: 'phone',   label: 'Phone',      type: 'tel' },
  { key: 'address', label: 'Address',    full: true },
  { key: 'city',    label: 'City' },
  { key: 'state',   label: 'State' },
  { key: 'pincode', label: 'PIN Code' },
];

export function CheckoutForm() {
  const [fields, setFields] = useState<CheckoutFields>(EMPTY);
  const [errors, setErrors] = useState<Partial<CheckoutFields>>({});
  const [submitted, setSubmitted] = useState(false);
  const clearCart = useCart(s => s.clearCart);

  const set = (key: keyof CheckoutFields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields(f => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateCheckoutForm(fields);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-16 text-center">
        <div className="text-[48px] mb-4">🌿</div>
        <h2 className="font-serif text-[28px] font-medium text-navy mb-3">Order Placed!</h2>
        <p className="text-text-2">Thank you, {fields.name.split(' ')[0]}. We'll send a confirmation to {fields.email}.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="font-serif text-[22px] font-medium text-navy mb-6">Delivery Details</h2>
      <div className="grid grid-cols-2 gap-4">
        {FIELDS.map(f => (
          <div key={f.key} className={f.full ? 'col-span-2' : ''}>
            <label className="block text-[11px] font-medium tracking-[1px] uppercase text-text-3 mb-1.5">{f.label}</label>
            <input
              type={f.type ?? 'text'}
              value={fields[f.key]}
              onChange={set(f.key)}
              className={`w-full px-4 py-3 rounded-lg border text-[14px] text-text-1 bg-white outline-none transition-shadow ${
                errors[f.key]
                  ? 'border-red-400 shadow-[0_0_0_2px_rgba(239,68,68,0.15)]'
                  : 'border-[#D4C8B8] focus:border-teal focus:shadow-[0_0_0_2px_rgba(0,132,147,0.2)]'
              }`}
            />
            {errors[f.key] && <p className="text-[11px] text-red-500 mt-1">{errors[f.key]}</p>}
          </div>
        ))}
      </div>
      <div className="mt-6 p-5 bg-cream rounded-xl border border-[#E5DDD0]">
        <div className="text-[11px] font-semibold tracking-[2px] uppercase text-text-3 mb-2">Payment</div>
        <div className="flex items-center gap-3 text-[14px] text-text-2">
          <div className="w-4 h-4 rounded-full border-2 border-teal flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-teal" />
          </div>
          Cash on Delivery
        </div>
      </div>
      <Button type="submit" className="w-full justify-center mt-6">Place Order</Button>
    </form>
  );
}
