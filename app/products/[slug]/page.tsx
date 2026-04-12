import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, generateProductParams, PRODUCTS } from '@/lib/products';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductCard } from '@/components/shop/ProductCard';

export function generateStaticParams() {
  return generateProductParams();
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <div className="bg-cream min-h-screen">
      {/* Breadcrumb */}
      <div className="px-4 md:px-10 lg:px-20 pt-8 pb-0 text-[12px] text-text-3 flex gap-2">
        <Link href="/" className="hover:text-text-1 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-text-1 transition-colors">Shop</Link>
        <span>/</span>
        <span className="text-text-1">{product.name}</span>
      </div>

      {/* Main grid */}
      <div className="px-4 md:px-10 lg:px-20 py-8 md:py-14 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 max-w-[1200px] mx-auto">
        {/* Image */}
        <div className="bg-gradient-to-br from-ivory to-cream rounded-2xl flex items-center justify-center p-6 md:p-12 border border-[#E5DDD0] min-h-[300px] md:min-h-[500px]">
          <Image
            src={product.images.main}
            alt={product.name}
            width={340}
            height={420}
            className="max-h-[420px] w-auto object-contain"
            style={{ filter: 'drop-shadow(0 12px 32px rgba(0,0,0,0.12))' }}
            priority
          />
        </div>
        {/* Info */}
        <div className="py-8">
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Related */}
      <div className="px-4 md:px-10 lg:px-20 pb-14 md:pb-24 max-w-[1200px] mx-auto">
        <h2 className="font-serif text-[28px] font-medium text-navy mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {related.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
