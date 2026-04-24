'use client';

import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const CHANNELS = [
  { name: 'Nykaa Luxe',   url: 'https://www.nykaa.com',         desc: 'Premium Beauty',     external: true  },
  { name: 'Tira Beauty',  url: 'https://www.tirabeauty.com',    desc: 'Curated Wellness',   external: true  },
  { name: 'Amazon India', url: 'https://www.amazon.in',         desc: 'Fast Delivery',      external: true  },
  { name: 'Our Store',    url: '/shop',                          desc: 'Direct & Exclusive', external: false },
];

const ringRest = '0px 0px 0px 1px #E5DDD0';
const ringHover = '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px';

export function DistributionStrip() {
  return (
    <section className="grain bg-ivory py-10 px-4 md:px-10 lg:px-20 border-t border-[#E5DDD0]">
      <AnimatedSection>
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-text-3 mb-6">
          Also Available At
        </p>
      </AnimatedSection>
      <div className="flex flex-wrap justify-center gap-3">
        {CHANNELS.map(({ name, url, desc, external }, i) => {
          const sharedClass =
            'cursor-none inline-flex flex-col items-center px-6 py-3 rounded-xl bg-[#FAF4EE] hover:-translate-y-0.5 transition-all duration-200';

          const sharedStyle = { boxShadow: ringRest };
          const onEnter = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.boxShadow = ringHover; };
          const onLeave = (e: React.MouseEvent<HTMLElement>) => { e.currentTarget.style.boxShadow = ringRest; };

          const inner = (
            <>
              <span className="text-navy text-[14px] font-semibold leading-snug">{name}</span>
              <span className="text-text-3 text-[11px] mt-0.5 tracking-wide">{desc}</span>
            </>
          );

          return (
            <AnimatedSection key={name} delay={((i % 4) + 1) as 1|2|3|4}>
              {external ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={sharedClass}
                  style={sharedStyle}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  {inner}
                </a>
              ) : (
                <Link
                  href={url}
                  className={sharedClass}
                  style={sharedStyle}
                  onMouseEnter={onEnter}
                  onMouseLeave={onLeave}
                >
                  {inner}
                </Link>
              )}
            </AnimatedSection>
          );
        })}
      </div>
    </section>
  );
}
