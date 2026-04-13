import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const CHANNELS = [
  { name: 'Nykaa Luxe',   url: 'https://www.nykaa.com',         desc: 'Premium Beauty',     external: true  },
  { name: 'Tira Beauty',  url: 'https://www.tirabeauty.com',    desc: 'Curated Wellness',   external: true  },
  { name: 'Amazon India', url: 'https://www.amazon.in',         desc: 'Fast Delivery',      external: true  },
  { name: 'Our Store',    url: '/shop',                          desc: 'Direct & Exclusive', external: false },
];

export function DistributionStrip() {
  return (
    <section className="bg-ivory py-10 px-4 md:px-10 lg:px-20 border-t border-[#E5DDD0]">
      <AnimatedSection>
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-text-3 mb-6">
          Also Available At
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {CHANNELS.map(({ name, url, desc, external }) => {
            const sharedClass =
              'cursor-none inline-flex flex-col items-center px-6 py-3 rounded-xl border border-[#E5DDD0] bg-white hover:-translate-y-0.5 transition-all duration-200';

            const inner = (
              <>
                <span className="text-navy text-[14px] font-semibold leading-snug">{name}</span>
                <span className="text-text-3 text-[11px] mt-0.5 tracking-wide">{desc}</span>
              </>
            );

            if (external) {
              return (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={sharedClass}
                >
                  {inner}
                </a>
              );
            }

            return (
              <Link key={name} href={url} className={sharedClass}>
                {inner}
              </Link>
            );
          })}
        </div>
      </AnimatedSection>
    </section>
  );
}
