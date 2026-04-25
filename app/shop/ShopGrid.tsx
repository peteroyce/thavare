'use client';

import { useState } from 'react';
import { ProductCard } from '@/components/shop/ProductCard';
import type { Product, ProductCategory } from '@/lib/products';

const CATEGORIES: { value: 'all' | ProductCategory; label: string }[] = [
  { value: 'all',              label: 'All' },
  { value: 'sport',            label: 'Sport' },
  { value: 'daily-essentials', label: 'Daily Essentials' },
  { value: 'recovery',         label: 'Recovery' },
  { value: 'sun-protection',   label: 'Sun Protection' },
];

export function ShopGrid({ products, defaultCategory }: { products: Product[]; defaultCategory?: string }) {
  const validDefault = (CATEGORIES.find(c => c.value === defaultCategory)?.value) ?? 'all';
  const [active, setActive] = useState<'all' | ProductCategory>(validDefault);

  const filtered = active === 'all'
    ? products
    : products.filter(p => p.category === active);

  return (
    <>
      <div className="flex gap-3 flex-wrap mb-10">
        {CATEGORIES.map(c => (
          <button
            key={c.value}
            onClick={() => setActive(c.value)}
            className={[
              'px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 border',
              active === c.value
                ? 'bg-navy text-cream border-navy'
                : 'bg-transparent text-navy/60 border-navy/20 hover:border-navy/40 hover:text-navy',
            ].join(' ')}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
