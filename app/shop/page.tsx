import type { Metadata } from 'next';
import { getProducts } from '@/lib/shopify';
import { ShopGrid }    from './ShopGrid';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Shop - Thavare',
  description: "Browse Thavare's full range of clinically crafted Ayurvedic skincare for active bodies.",
};

export default async function ShopPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const { category } = await searchParams;
  const products = await getProducts();

  return (
    <div className="bg-cream min-h-screen px-4 md:px-10 lg:px-20 py-14 md:py-24 grain glow-warm">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-16">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
            The Collection
          </div>
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-medium text-navy leading-[1.1]">
            Shop All Products
          </h1>
        </div>
        <ShopGrid products={products} defaultCategory={category} />
      </div>
    </div>
  );
}
