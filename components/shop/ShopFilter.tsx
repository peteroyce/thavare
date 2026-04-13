'use client';

import { useState } from 'react';
import { type ProductCategory, type Product } from '@/lib/products';
import { ProductCard } from '@/components/shop/ProductCard';

const FILTERS: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'All',              value: 'all' },
  { label: 'Sport',            value: 'sport' },
  { label: 'Recovery',         value: 'recovery' },
  { label: 'Sun Protection',   value: 'sun-protection' },
  { label: 'Daily Essentials', value: 'daily-essentials' },
];

export function ShopFilter({ products }: { products: Product[] }) {
  const [active, setActive] = useState<ProductCategory | 'all'>('all');
  const filtered = active === 'all' ? products : products.filter(p => p.category === active);

  return (
    <>
      {/* Filter bar */}
      <div className="flex gap-3 justify-center flex-wrap mb-12">
        {FILTERS.map(f => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-5 py-2 rounded-full text-[11px] font-medium tracking-[1px] uppercase transition-all cursor-none ${
              active === f.value
                ? 'bg-navy text-cream'
                : 'bg-ivory text-text-2 border border-[#D4C8B8] hover:border-navy hover:text-navy'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </>
  );
}
