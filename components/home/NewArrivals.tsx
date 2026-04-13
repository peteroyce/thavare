import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { Product } from '@/lib/products';

const BG = [
  'bg-gradient-to-br from-navy-mid to-teal-dark',
  'bg-gradient-to-br from-beige to-camel',
  'bg-gradient-to-br from-cream to-sand',
  'bg-gradient-to-br from-navy-mid to-teal-dark',
];

export function NewArrivals({ products }: { products: Product[] }) {
  return (
    <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-2.5">Just Landed</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            New <em className="italic text-terracotta">Arrivals</em>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((p, i) => (
            <AnimatedSection key={p.id} delay={((i % 4) + 1) as 1|2|3|4}>
              <Link href={`/products/${p.slug}`} className="block bg-ivory rounded-xl overflow-hidden border border-[#E5DDD0] shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-1.5 hover:shadow-[rgba(26,22,16,0.12)_0_12px_40px] transition-all duration-300 group">
                <div className={`h-[180px] flex items-center justify-center relative overflow-hidden ${BG[i % 4]}`}>
                  <span className="absolute top-2.5 left-2.5 bg-navy text-cream text-[8px] font-semibold tracking-[1.5px] uppercase px-2.5 py-1 rounded-full">
                    {p.badge ?? 'New'}
                  </span>
                  <Image
                    src={p.images.card}
                    alt={p.name}
                    width={120}
                    height={140}
                    className="h-[78%] w-auto object-contain group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500"
                    style={{ filter: 'drop-shadow(0 4px 14px rgba(0,0,0,0.12))' }}
                  />
                </div>
                <div className="p-4 pb-5">
                  <div className="text-[9px] font-medium tracking-[2.5px] uppercase text-camel mb-1.5">{p.categoryLabel}</div>
                  <div className="font-serif text-[15px] font-medium text-navy mb-2 leading-[1.3]">{p.name}</div>
                  <div className="text-[15px] font-semibold text-terracotta">{'\u20B9'}{p.price}</div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
