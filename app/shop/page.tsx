import { getProducts } from '@/lib/shopify';
import { ShopFilter }  from '@/components/shop/ShopFilter';

export default async function ShopPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    // Shopify unreachable — render with empty product list
  }

  return (
    <div className="min-h-screen bg-cream pt-8 md:pt-12 pb-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">The Range</div>
          <h1 className="font-serif text-[clamp(36px,4vw,56px)] font-medium leading-[1.1] text-navy">
            Shop <em className="italic text-terracotta">Thavare</em>
          </h1>
          <p className="text-[16px] leading-relaxed text-text-2 mt-4 max-w-[480px] mx-auto">
            Clinically crafted Ayurveda for every body that moves.
          </p>
        </div>
        <ShopFilter products={products} />
      </div>
    </div>
  );
}
