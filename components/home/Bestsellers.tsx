import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { PRODUCTS } from '@/lib/products';

const FEATURED_IDS = ['body-wash', 'sun-screen', 'body-lotion'];

export function Bestsellers() {
  const products = FEATURED_IDS.map(id => PRODUCTS.find(p => p.id === id)!);

  return (
    <section className="py-24 px-20 bg-navy">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-2.5">Most Loved</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-cream">
            Our <em className="italic text-terracotta">Bestsellers</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-cream/50 mt-3">Loved by athletes. Trusted by everyday movers.</p>
        </AnimatedSection>
        <div className="grid grid-cols-3 gap-5">
          {products.map((p, i) => (
            <AnimatedSection key={p.id} delay={(i + 1) as 1|2|3}>
              <div className="bg-navy-mid rounded-xl overflow-hidden border border-white/10 hover:-translate-y-1 hover:border-terracotta/30 transition-all duration-300 group relative cursor-none">
                <div className="h-[220px] flex items-center justify-center relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #3D2910, #243058)' }}>
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
                    className="h-[82%] w-auto object-contain group-hover:scale-[1.09] group-hover:-translate-y-1 transition-transform duration-500"
                    style={{ filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.35))' }}
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-terracotta text-white text-[11px] font-semibold tracking-[1.5px] uppercase py-3.5 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    Quick Add to Bag
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-[9px] font-medium tracking-[3px] uppercase text-teal mb-1.5">{p.categoryLabel} · {p.size}</div>
                  <div className="font-serif text-[18px] font-medium leading-[1.25] text-cream mb-2">{p.name}</div>
                  <div className="text-[13px] leading-relaxed text-cream/55 mb-4">{p.description}</div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[19px] font-semibold text-camel">₹{p.price}</span>
                      {p.originalPrice && <span className="text-[12px] text-cream/30 line-through ml-2">₹{p.originalPrice}</span>}
                    </div>
                    <Link href={`/products/${p.slug}`}>
                      <Button variant="primary" className="text-[10px] px-4 py-2">Add to Bag</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="text-center mt-12">
          <Link href="/shop">
            <Button variant="outline-light">View All Products</Button>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
