'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart, type CartItem as CartItemType } from '@/lib/cart';

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const { product: p, quantity } = item;

  return (
    <div className="flex gap-5 py-6 border-b border-[#E5DDD0]">
      <Link href={`/products/${p.slug}`} className="w-[100px] h-[100px] bg-gradient-to-br from-cream to-sand rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
        <Image
          src={p.images.card}
          alt={p.name}
          width={80}
          height={90}
          className="h-[85%] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.1))' }}
        />
      </Link>
      <div className="flex-1">
        <div className="text-[9px] font-medium tracking-[2px] uppercase text-camel mb-1">{p.categoryLabel}</div>
        <Link href={`/products/${p.slug}`} className="font-serif text-[17px] font-medium text-navy hover:text-terracotta transition-colors">{p.name}</Link>
        <div className="text-[13px] text-text-3 mt-0.5">{p.subtitle}</div>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-[#D4C8B8] rounded-lg overflow-hidden">
            <button onClick={() => updateQuantity(p.id, quantity - 1)} className="w-9 h-9 text-text-2 hover:bg-cream transition-colors cursor-none">−</button>
            <span className="w-8 text-center text-[14px] font-medium">{quantity}</span>
            <button onClick={() => updateQuantity(p.id, quantity + 1)} className="w-9 h-9 text-text-2 hover:bg-cream transition-colors cursor-none">+</button>
          </div>
          <span className="text-[17px] font-semibold text-terracotta">₹{p.price * quantity}</span>
        </div>
      </div>
      <button onClick={() => removeItem(p.id)} className="text-text-3 hover:text-text-1 transition-colors text-[18px] self-start cursor-none">×</button>
    </div>
  );
}
