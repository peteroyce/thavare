'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import { useToast } from '@/lib/toast';
import type { Product } from '@/lib/products';
import { QuickViewModal } from '@/components/shop/QuickViewModal';

export function ProductCard({ product: p }: { product: Product }) {
  const addItem = useCart(s => s.addItem);
  const { toggle, has } = useWishlist();
  const addToast = useToast(s => s.add);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const addingRef = useRef(false);

  function handleAddToCart() {
    if (addingRef.current) return;
    addingRef.current = true;
    setAdded(true);
    setTimeout(() => { addingRef.current = false; setAdded(false); }, 800);

    const wasInCart = useCart.getState().items.some(i => i.product.id === p.id);
    addItem(p);
    const newCount = useCart.getState().totalItems();
    if (wasInCart) {
      const newQty = useCart.getState().items.find(i => i.product.id === p.id)?.quantity ?? 1;
      addToast({ type: 'cart-update', productName: p.name, count: newCount, quantity: newQty });
    } else {
      addToast({ type: 'cart-add', productName: p.name, count: newCount });
    }
  }

  function handleWishlistToggle(e: React.MouseEvent) {
    e.preventDefault();
    const wasWishlisted = has(p.id);
    toggle(p);
    const newCount = useWishlist.getState().items.length;
    if (wasWishlisted) {
      addToast({ type: 'wishlist-remove', productName: p.name });
    } else {
      addToast({ type: 'wishlist-add', productName: p.name, count: newCount });
    }
  }

  return (
    <div
      className="bg-[#FAF4EE] rounded-xl overflow-hidden hover:-translate-y-2 transition-all duration-300 group relative flex flex-col h-full"
      style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #C4A882, 0 4px 12px rgba(168,122,83,0.08), 0 16px 40px rgba(26,22,16,0.06)')}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0')}
    >
      <Link href={`/products/${p.slug}`}>
        <div className="h-[280px] bg-gradient-to-b from-[#F2EBE0] to-[#EDE7DC] flex items-center justify-center overflow-hidden relative">
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
            style={{ filter: 'drop-shadow(0 6px 16px rgba(168,122,83,0.18))' }}
          />
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewOpen(true); }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-navy text-[10px] font-semibold tracking-[1.5px] uppercase px-4 py-2 rounded-full border border-[#E5DDD0] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-200 cursor-none whitespace-nowrap z-10"
          >
            Quick View
          </button>
        </div>
      </Link>
      <button
        onClick={handleWishlistToggle}
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
      <div className="p-5 flex-1 flex flex-col">
        <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-camel mb-1.5">{p.categoryLabel}</div>
        <Link href={`/products/${p.slug}`}>
          <div className="font-serif text-[17px] font-medium text-navy mb-1.5 leading-[1.25] hover:text-terracotta transition-colors">{p.name}</div>
        </Link>
        <div className="text-[13px] leading-relaxed text-text-2 mb-4 line-clamp-2">{p.description}</div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[18px] font-semibold text-terracotta">₹{p.price}</span>
          <button
            onClick={handleAddToCart}
            disabled={!p.inStock}
            className="px-4 py-2 text-[10px] font-semibold tracking-wide uppercase rounded-lg transition-all cursor-none disabled:cursor-not-allowed bg-navy text-cream hover:bg-navy/90 disabled:bg-[#D4C8B8] disabled:text-text-3"
          >
            {!p.inStock ? 'Out of Stock' : added ? 'Added ✓' : 'Add to Bag'}
          </button>
        </div>
      </div>
      {quickViewOpen && (
        <QuickViewModal product={p} onClose={() => setQuickViewOpen(false)} />
      )}
    </div>
  );
}
