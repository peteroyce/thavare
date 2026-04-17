import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProducts, getProductByHandle } from '@/lib/shopify';
import { getProductReviews } from '@/lib/judgeme';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductCard } from '@/components/shop/ProductCard';
import { ReviewsSection } from '@/components/product/ReviewsSection';

export async function generateStaticParams() {
  try {
    const products = await getProducts();
    return products.map(p => ({ slug: p.slug }));
  } catch {
    // Shopify may be unreachable during build — return empty for on-demand ISR
    return [];
  }
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByHandle(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.longDescription ?? product.description,
    openGraph: {
      title: `${product.name} — Thavare`,
      description: product.description,
      images: [{ url: product.images.card, width: 400, height: 500, alt: product.name }],
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${product.name} — Thavare`,
      description: product.description,
      images: [product.images.card],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let reviewsData: { reviews: import('@/lib/judgeme').JudgemeReview[]; aggregate: import('@/lib/judgeme').JudgemeAggregate } = {
    reviews: [],
    aggregate: { rating: 0, reviews_count: 0 },
  };

  const [product, allProducts] = await Promise.all([
    getProductByHandle(slug),
    getProducts(),
  ]);
  if (!product) notFound();

  try {
    reviewsData = await getProductReviews(slug);
  } catch {
    // Judge.me unavailable — render page without reviews
  }

  const { reviews, aggregate } = reviewsData;

  const related = allProducts.filter(p => p.id !== product.id).slice(0, 3);

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.longDescription ?? product.description,
    image: product.images.main,
    brand: { '@type': 'Brand', name: 'Thavare' },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://thavare.com/products/${product.slug}`,
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://thavare.com' },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: 'https://thavare.com/shop' },
      { '@type': 'ListItem', position: 3, name: product.name },
    ],
  };

  const schemas = [productSchema, breadcrumbSchema];

  return (
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />
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

      {/* Reviews */}
      <ReviewsSection reviews={reviews} aggregate={aggregate} />

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
