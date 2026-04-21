'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import type { Product } from '@/lib/products';
import { useCart } from '@/lib/cart';
import { useToast } from '@/lib/toast';

export function Bestsellers({ products }: { products: Product[] }) {
  const addItem = useCart(s => s.addItem);
  const addToast = useToast(s => s.add);
  const addingRef = useRef<Set<string>>(new Set());

  function handleQuickAdd(p: Product, e: React.MouseEvent) {
    e.stopPropagation();
    // Guard: skip if already processing this product
    if (addingRef.current.has(p.id)) return;
    addingRef.current.add(p.id);
    setTimeout(() => addingRef.current.delete(p.id), 800);

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

  return (
    <section className="grain glow-warm py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-[#7A5D3A] mb-2.5">Most Loved</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            Our <em className="italic text-terracotta">Bestsellers</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-text-2 mt-3">Loved by athletes. Trusted by everyday movers.</p>
          <div className="divider-ornament mx-auto max-w-[200px] my-8"><span>&#x25C6;</span></div>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {products.map((p, i) => (
            <AnimatedSection key={p.id} delay={(i + 1) as 1|2|3}>
              <div
                className="bg-[#FDFBF7] rounded-xl overflow-hidden md:hover:-translate-y-1 transition-all duration-300 group relative cursor-none"
                style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0')}
              >
                <div className="h-[260px] bg-gradient-to-b from-[#F5F0E8] to-[#EDE7DC] flex items-center justify-center relative overflow-hidden">
                  {p.badge && (
                    <span className="absolute top-3.5 left-3.5 bg-terracotta text-white text-[9px] font-semibold tracking-[1.5px] uppercase px-3 py-1 rounded-full">
                      {p.badge}
                    </span>
                  )}
                  <Image
                    src={p.images.card}
                    alt={p.name}
                    width={160}
                    height={180}
                    className="h-[82%] w-auto object-contain md:group-hover:scale-[1.09] md:group-hover:-translate-y-1 transition-transform duration-500"
                    style={{ filter: 'drop-shadow(0 8px 24px rgba(168,122,83,0.22))' }}
                  />
                  <button
                    onClick={(e) => handleQuickAdd(p, e)}
                    className="absolute bottom-0 left-0 right-0 bg-terracotta text-white text-[11px] font-semibold tracking-[1.5px] uppercase py-3.5 text-center translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300 cursor-none"
                  >
                    Quick Add to Bag
                  </button>
                </div>
                <div className="p-6">
                  <div className="text-[9px] font-medium tracking-[3px] uppercase text-[#7A5D3A] mb-1.5">{p.categoryLabel}</div>
                  <div className="font-serif text-[18px] font-medium leading-[1.25] text-navy mb-2">{p.name}</div>
                  <div className="text-[13px] leading-relaxed text-text-2 mb-4 line-clamp-2">{p.description}</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[19px] font-semibold text-terracotta">{'\u20B9'}{p.price}</span>
                    </div>
                    <button
                      onClick={(e) => handleQuickAdd(p, e)}
                      className="text-[10px] px-4 py-2 bg-navy text-cream font-semibold tracking-wide uppercase rounded-lg hover:bg-navy/90 transition-colors"
                    >
                      Add to Bag
                    </button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="text-center mt-14">
          <Link href="/shop">
            <Button variant="outline" className="px-10 py-4 border-navy/20 hover:border-[#C4A882] hover:text-[#3D1F0A] transition-all duration-300">View All Products</Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
