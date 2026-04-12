'use client';

import { useState } from 'react';
import { PRODUCTS, type ProductCategory } from '@/lib/products';
import { ProductCard } from '@/components/shop/ProductCard';

const FILTERS: { label: string; value: ProductCategory | 'all' }[] = [
  { label: 'All',              value: 'all' },
  { label: 'Pre-Sport',        value: 'pre-sport' },
  { label: 'Recovery',         value: 'recovery' },
  { label: 'Sun Care',         value: 'sun-care' },
  { label: 'Daily Essentials', value: 'daily-essentials' },
  { label: 'Teal Ayurveda',    value: 'teal-ayurveda' },
];

export default function ShopPage() {
  const [active, setActive] = useState<ProductCategory | 'all'>('all');
  const filtered = active === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === active);

  return (
    <div className="min-h-screen bg-cream pt-12 pb-24 px-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">The Range</div>
          <h1 className="font-serif text-[clamp(36px,4vw,56px)] font-medium leading-[1.1] text-navy">
            Shop <em className="italic text-terracotta">Thavare</em>
          </h1>
          <p className="text-[16px] leading-relaxed text-text-2 mt-4 max-w-[480px] mx-auto">
            Clinically crafted Ayurveda for every body that moves.
          </p>
        </div>
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
        <div className="grid grid-cols-3 gap-6">
          {filtered.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
