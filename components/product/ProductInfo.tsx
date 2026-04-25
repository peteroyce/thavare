'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import { useToast } from '@/lib/toast';
import type { Product } from '@/lib/products';
import { Button } from '@/components/ui/Button';
import { NotifyMeForm } from '@/components/product/NotifyMeForm';

export function ProductInfo({ product: p }: { product: Product }) {
  const hasVariants = p.variants.length > 1;
  const [selectedVariantIdx, setSelectedVariantIdx] = useState(0);
  const selectedVariant = hasVariants ? p.variants[selectedVariantIdx] : null;

  // Use selected variant's values when available, otherwise fall back to product defaults
  const activePrice = selectedVariant?.price ?? p.price;
  const activeVariantId = selectedVariant?.id ?? p.variantId;
  const activeInStock = selectedVariant?.inStock ?? p.inStock;

  const [qty, setQty] = useState(1);
  const [adding, setAdding] = useState(false);
  const addItem = useCart(s => s.addItem);
  const updateQuantity = useCart(s => s.updateQuantity);
  const { toggle, has } = useWishlist();
  const addToast = useToast(s => s.add);

  const handleAdd = () => {
    if (adding) return;
    setAdding(true);

    // Build a product copy with the selected variant's price and variantId
    const productForCart: Product = {
      ...p,
      price: activePrice,
      variantId: activeVariantId,
      // For multi-variant products, use variant title as ID suffix to keep them separate in cart
      id: hasVariants ? `${p.id}--${activeVariantId}` : p.id,
      name: hasVariants ? `${p.name} (${selectedVariant!.title})` : p.name,
    };

    const cartId = productForCart.id;
    const current = useCart.getState().items.find(i => i.product.id === cartId);
    if (current) {
      const newQty = current.quantity + qty;
      updateQuantity(cartId, newQty);
      const newCount = useCart.getState().totalItems();
      addToast({ type: 'cart-update', productName: productForCart.name, count: newCount, quantity: newQty });
    } else {
      addItem(productForCart);
      if (qty > 1) {
        setTimeout(() => updateQuantity(cartId, qty), 0);
      }
      const newCount = useCart.getState().totalItems();
      addToast({ type: 'cart-add', productName: productForCart.name, count: newCount });
    }
    setTimeout(() => setAdding(false), 600);
  };

  return (
    <div>
      <div className="text-[10px] font-medium tracking-[3px] uppercase text-terracotta mb-3">{p.categoryLabel}</div>
      <h1 className="font-serif text-[40px] font-medium leading-[1.1] text-navy mb-2">{p.name}</h1>
      <p className="text-[16px] text-text-2 italic mb-6">{p.subtitle}</p>

      {/* Variant selector */}
      {hasVariants && (
        <div className="mb-6">
          <div className="text-[10px] font-semibold tracking-[3px] uppercase text-text-3 mb-3">Size</div>
          <div className="flex gap-2">
            {p.variants.map((v, idx) => (
              <button
                key={v.id}
                onClick={() => { setSelectedVariantIdx(idx); setQty(1); }}
                className={`px-5 py-2.5 rounded-lg border text-[13px] font-medium transition-all duration-200 ${
                  idx === selectedVariantIdx
                    ? 'border-terracotta bg-terracotta/5 text-terracotta'
                    : 'border-[#D4C8B8] text-text-2 hover:border-terracotta/40'
                } ${!v.inStock ? 'opacity-50 line-through' : ''}`}
                disabled={!v.inStock}
                aria-label={`Select ${v.title}${!v.inStock ? ' (out of stock)' : ''}`}
              >
                {v.title} — ₹{v.price}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <span className="text-[28px] font-semibold text-terracotta">₹{activePrice}</span>
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
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200 text-[11px] font-semibold tracking-wide uppercase ${
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
      {/* Description — Shopify-managed trusted HTML content */}
      <div
        className="text-[15px] leading-[1.75] text-text-2 mb-8 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
        dangerouslySetInnerHTML={{ __html: p.longDescription ?? p.description }}
      />
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
      {activeInStock ? (
        <div className="flex gap-4 items-center">
          <div className="flex items-center border border-[#D4C8B8] rounded-lg overflow-hidden">
            <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity" className="w-11 h-11 text-[18px] text-text-2 hover:bg-cream transition-colors">−</button>
            <span className="w-10 text-center text-[15px] font-medium text-text-1">{qty}</span>
            <button onClick={() => setQty(q => q + 1)} aria-label="Increase quantity" className="w-11 h-11 text-[18px] text-text-2 hover:bg-cream transition-colors">+</button>
          </div>
          <Button onClick={handleAdd} disabled={adding} className="flex-1">{adding ? 'Adding…' : 'Add to Bag'}</Button>
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
