'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import { useToast } from '@/lib/toast';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { NotifyMeForm } from '@/components/product/NotifyMeForm';

export function ProductInfo({ product: p }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const addItem = useCart(s => s.addItem);
  const updateQuantity = useCart(s => s.updateQuantity);
  const { toggle, has } = useWishlist();
  const addToast = useToast(s => s.add);

  const handleAdd = () => {
    const current = useCart.getState().items.find(i => i.product.id === p.id);
    if (current) {
      const newQty = current.quantity + qty;
      updateQuantity(p.id, newQty);
      const newCount = useCart.getState().totalItems();
      addToast({ type: 'cart-update', productName: p.name, count: newCount, quantity: newQty });
    } else {
      addItem(p);
      if (qty > 1) updateQuantity(p.id, qty);
      const newCount = useCart.getState().totalItems();
      addToast({ type: 'cart-add', productName: p.name, count: newCount });
    }
  };

  return (
    <div>
      <div className="text-[10px] font-medium tracking-[3px] uppercase text-teal mb-3">{p.categoryLabel}</div>
      <h1 className="font-serif text-[40px] font-medium leading-[1.1] text-navy mb-2">{p.name}</h1>
      <p className="text-[16px] text-text-2 italic mb-6">{p.subtitle}</p>
      <div className="flex items-center justify-between mb-6">
        <span className="text-[28px] font-semibold text-terracotta">₹{p.price}</span>
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
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 cursor-none text-[11px] font-semibold tracking-wide uppercase ${
            has(p.id)
              ? 'border-terracotta bg-terracotta/5 text-terracotta'
              : 'border-[#D4C8B8] text-text-3 hover:border-terracotta/50 hover:text-terracotta'
          }`}
          aria-label={has(p.id) ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill={has(p.id) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {has(p.id) ? 'Saved' : 'Save'}
        </button>
      </div>
      <p className="text-[15px] leading-[1.75] text-text-2 mb-8">{p.longDescription}</p>
      {/* Ingredients */}
      <div className="mb-8">
        <div className="text-[10px] font-semibold tracking-[3px] uppercase text-text-3 mb-3">Key Ingredients</div>
        <div className="flex flex-wrap gap-2">
          {p.ingredients.split(',').map(ing => ing.trim()).filter(Boolean).map(ing => (
            <span key={ing} className="text-[12px] px-3 py-1.5 bg-cream border border-[#D4C8B8] rounded-full text-text-2">
              {ing}
            </span>
          ))}
        </div>
      </div>
      {/* How to Use */}
      {p.howToUse && (
        <div className="mb-8">
          <div className="text-[10px] font-semibold tracking-[3px] uppercase text-text-3 mb-3">How to Use</div>
          <p className="text-[14px] leading-[1.75] text-text-2">{p.howToUse}</p>
        </div>
      )}
      {/* Qty + Add */}
      {p.inStock ? (
        <div className="flex gap-4 items-center">
          <div className="flex items-center border border-[#D4C8B8] rounded-lg overflow-hidden">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-11 h-11 text-[18px] text-text-2 hover:bg-cream transition-colors cursor-none">−</button>
            <span className="w-10 text-center text-[15px] font-medium text-text-1">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} className="w-11 h-11 text-[18px] text-text-2 hover:bg-cream transition-colors cursor-none">+</button>
          </div>
          <Button onClick={handleAdd} className="flex-1">Add to Bag</Button>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="px-4 py-2.5 rounded-lg bg-[#F0EAE0] text-center text-[11px] font-semibold tracking-widest uppercase text-text-3">
            Currently Out of Stock
          </div>
          <NotifyMeForm productName={p.name} />
        </div>
      )}
    </div>
  );
}
