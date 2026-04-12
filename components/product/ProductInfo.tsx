'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/Button';

export function ProductInfo({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCart(s => s.addItem);

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(p);
  };

  return (
    <div>
      <div className="text-[10px] font-medium tracking-[3px] uppercase text-teal mb-3">{p.categoryLabel} · {p.size}</div>
      <h1 className="font-serif text-[40px] font-medium leading-[1.1] text-navy mb-2">{p.name}</h1>
      <p className="text-[16px] text-text-2 italic mb-6">{p.subtitle}</p>
      <div className="flex items-baseline gap-3 mb-6">
        <span className="text-[28px] font-semibold text-terracotta">₹{p.price}</span>
        {p.originalPrice && <span className="text-[16px] text-text-3 line-through">₹{p.originalPrice}</span>}
      </div>
      <p className="text-[15px] leading-[1.75] text-text-2 mb-8">{p.longDescription}</p>
      {/* Ingredients */}
      <div className="mb-8">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-text-3 mb-3">Key Ingredients</div>
        <div className="flex flex-wrap gap-2">
          {p.ingredients.map(ing => (
            <span key={ing} className="text-[12px] px-3 py-1.5 bg-cream border border-[#D4C8B8] rounded-full text-text-2">
              {ing}
            </span>
          ))}
        </div>
      </div>
      {/* Qty + Add */}
      <div className="flex gap-4 items-center">
        <div className="flex items-center border border-[#D4C8B8] rounded-lg overflow-hidden">
          <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-11 text-[18px] text-text-2 hover:bg-cream transition-colors cursor-none">−</button>
          <span className="w-10 text-center text-[15px] font-medium text-text-1">{qty}</span>
          <button onClick={() => setQty(q => q + 1)} className="w-11 h-11 text-[18px] text-text-2 hover:bg-cream transition-colors cursor-none">+</button>
        </div>
        <Button onClick={handleAdd} className="flex-1">Add to Bag</Button>
      </div>
    </div>
  );
}
