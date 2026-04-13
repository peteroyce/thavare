'use client';

import Link from 'next/link';
import { useWishlist } from '@/lib/wishlist';
import { ProductCard } from '@/components/shop/ProductCard';
import { Button } from '@/components/ui/Button';

export default function WishlistPage() {
  const { items, clear } = useWishlist();

  return (
    <div className="min-h-screen bg-cream px-4 md:px-10 lg:px-20 py-8 md:py-14">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-8 md:mb-12">
          <div>
            <div className="text-[10px] font-medium tracking-[3px] uppercase text-teal mb-2">Your Collection</div>
            <h1 className="font-serif text-[36px] md:text-[44px] font-medium text-navy leading-[1.1]">
              Saved Items ({items.length})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clear}
              className="text-[11px] font-medium tracking-wide uppercase text-text-3 hover:text-terracotta transition-colors cursor-none"
            >
              Clear All
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-[#D4C8B8] flex items-center justify-center text-2xl text-text-3">
              ♡
            </div>
            <div>
              <p className="font-serif text-[24px] text-navy mb-2">Your wishlist is empty</p>
              <p className="text-[14px] text-text-2">Save products you love by tapping the heart icon.</p>
            </div>
            <Link href="/shop"><Button>Shop All Products</Button></Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {items.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
