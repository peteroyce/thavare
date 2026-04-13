'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import type { Product } from '@/lib/products';

export function ProductCard({ product: p }: { product: Product }) {
  const addItem = useCart(s => s.addItem);
  const { toggle, has } = useWishlist();

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
      <button
        onClick={(e) => { e.preventDefault(); toggle(p); }}
        className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-none ${
          has(p.id)
            ? 'bg-terracotta text-white shadow-md'
            : 'bg-white/80 text-text-3 hover:bg-white hover:text-terracotta'
        }`}
        aria-label={has(p.id) ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill={has(p.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
      <div className="p-5">
        <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-camel mb-1.5">{p.categoryLabel}</div>
        <Link href={`/products/${p.slug}`}>
          <div className="font-serif text-[17px] font-medium text-navy mb-1.5 leading-[1.25] hover:text-terracotta transition-colors">{p.name}</div>
        </Link>
        <div className="text-[13px] leading-relaxed text-text-2 mb-4 line-clamp-2">{p.description}</div>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[18px] font-semibold text-terracotta">₹{p.price}</span>
          </div>
          <button
            onClick={() => addItem(p)}
            disabled={!p.inStock}
            className="px-4 py-2 text-[10px] font-semibold tracking-wide uppercase rounded-lg transition-all cursor-none disabled:cursor-not-allowed bg-terracotta text-white hover:opacity-90 disabled:bg-[#D4C8B8] disabled:text-text-3"
          >
            {p.inStock ? 'Add to Bag' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
