'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart';
import { useToast } from '@/lib/toast';
import { useWishlist } from '@/lib/wishlist';
import type { Product } from '@/lib/products';

type Props = {
  product: Product;
  onClose: () => void;
};

export function QuickViewModal({ product: p, onClose }: Props) {
  const addItem = useCart(s => s.addItem);
  const addToast = useToast(s => s.add);

  function handleAddToCart() {
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

  const { toggle, has } = useWishlist();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Capture the element that opened us
  useEffect(() => {
    triggerRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    return () => { triggerRef.current?.focus(); };
  }, []);

  // Trap focus within dialog
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !dialogRef.current) return;
    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  const ingredientPills = p.ingredients
    ? p.ingredients.split(',').map(s => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Quick view"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="bg-cream rounded-2xl max-w-[760px] w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Close button */}
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-ivory border border-[#E5DDD0] flex items-center justify-center text-text-3 hover:text-navy transition-colors z-10"
          aria-label="Close quick view"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Two-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left — product image */}
          <div className="h-[300px] md:h-full min-h-[300px] bg-gradient-to-br from-ivory to-cream flex items-center justify-center overflow-hidden rounded-tl-2xl rounded-bl-none rounded-tr-2xl md:rounded-tr-none md:rounded-bl-2xl">
            <Image
              src={p.images.main}
              alt={p.name}
              width={220}
              height={280}
              className="h-[75%] w-auto object-contain"
              style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.14))' }}
            />
          </div>

          {/* Right — product info */}
          <div className="p-7 flex flex-col gap-4">
            {/* Wishlist heart */}
            <div className="flex items-start justify-between">
              <div>
                {/* Category eyebrow */}
                <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-camel mb-2">
                  {p.categoryLabel}
                </div>
                {/* Product name */}
                <h2 className="font-serif text-[28px] font-medium text-navy leading-[1.2]">
                  {p.name}
                </h2>
              </div>
              <button
                onClick={() => {
                    const wasWishlisted = has(p.id);
                    toggle(p);
                    const newCount = useWishlist.getState().items.length;
                    if (wasWishlisted) {
                      addToast({ type: 'wishlist-remove', productName: p.name });
                    } else {
                      addToast({ type: 'wishlist-add', productName: p.name, count: newCount });
                    }
                  }}
                className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0 ${
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
            </div>

            {/* Price */}
            <div className="text-[24px] font-semibold text-terracotta leading-none">
              ₹{p.price}
            </div>

            {/* Description */}
            <p className="text-[14px] leading-[1.75] text-text-2 line-clamp-3">
              {p.description}
            </p>

            {/* Ingredients pills */}
            {ingredientPills.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {ingredientPills.map((ingredient) => (
                  <span
                    key={ingredient}
                    className="text-[11px] px-3 py-1.5 bg-white border border-[#D4C8B8] rounded-full text-text-2"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            )}

            {/* CTA buttons */}
            <div className="flex flex-col gap-3 mt-auto pt-2">
              {/* Add to Bag */}
              <button
                onClick={handleAddToCart}
                disabled={!p.inStock}
                className="w-full py-3 text-[11px] font-semibold tracking-[1.5px] uppercase rounded-xl transition-all disabled:cursor-not-allowed bg-terracotta text-white hover:opacity-90 disabled:bg-[#D4C8B8] disabled:text-text-3"
              >
                {p.inStock ? 'Add to Bag' : 'Out of Stock'}
              </button>

              {/* View Full Details */}
              <Link
                href={`/products/${p.slug}`}
                onClick={onClose}
                className="w-full py-3 text-[11px] font-semibold tracking-[1.5px] uppercase rounded-xl border border-navy text-navy text-center hover:bg-navy hover:text-cream transition-all duration-200"
              >
                View Full Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
