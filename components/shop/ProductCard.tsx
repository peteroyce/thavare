'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import type { Product } from '@/lib/products';

export function ProductCard({ product: p }: { product: Product }) {
  const addItem = useCart(s => s.addItem);

  return (
    <div className="bg-ivory rounded-xl overflow-hidden border border-[#E5DDD0] shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-1.5 hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px] transition-all duration-300 group relative">
      <Link href={`/products/${p.slug}`}>
        <div className="h-[240px] bg-gradient-to-br from-cream to-sand flex items-center justify-center overflow-hidden relative">
          {p.badge && (
            <span className="absolute top-3 left-3 bg-terracotta text-white text-[9px] font-semibold tracking-[1.5px] uppercase px-3 py-1 rounded-full z-10">
              {p.badge}
            </span>
          )}
          <Image
            src={p.images.card}
            alt={p.name}
            width={160}
            height={200}
            className="h-[80%] w-auto object-contain group-hover:scale-[1.08] transition-transform duration-500"
            style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.12))' }}
          />
        </div>
      </Link>
      <div className="p-5">
        <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-camel mb-1.5">{p.categoryLabel} · {p.size}</div>
        <Link href={`/products/${p.slug}`}>
          <div className="font-serif text-[17px] font-medium text-navy mb-1.5 leading-[1.25] hover:text-terracotta transition-colors">{p.name}</div>
        </Link>
        <div className="text-[13px] leading-relaxed text-text-2 mb-4 line-clamp-2">{p.description}</div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[18px] font-semibold text-terracotta">₹{p.price}</span>
            {p.originalPrice && <span className="text-[12px] text-text-3 line-through ml-2">₹{p.originalPrice}</span>}
          </div>
          <button
            onClick={() => addItem(p)}
            className="px-4 py-2 bg-terracotta text-white text-[10px] font-semibold tracking-wide uppercase rounded-lg hover:opacity-90 transition-all cursor-none"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
}
