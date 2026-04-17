'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const CATS = [
  { name: 'Pre-Sport',        desc: 'Prime your skin before training. Protective Ayurvedic actives that prep every layer.',     img: '/images/cat-presport-sky.jpg',        href: '/shop?category=sport',            pos: 'object-bottom' },
  { name: 'During Activity',  desc: 'Anti-chafe, anti-sweat, anti-friction. Formulated for the skin in motion.',                img: '/images/cat-during-gate.jpg',         href: '/shop?category=sport',            pos: 'object-center' },
  { name: 'Recovery',         desc: 'Restore, repair, and renew. Deep Ayurvedic botanicals for post-workout skin.',             img: '/images/cat-recovery-kumkumadi.jpg',  href: '/shop?category=recovery',         pos: 'object-center' },
  { name: 'Daily Essentials', desc: 'For the everyday mover. Lightweight routines rooted in ancient wisdom.',                   img: '/images/cat-daily-sunblock-wall.jpg', href: '/shop?category=daily-essentials', pos: 'object-center' },
];

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-cream">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-2.5">Find Your Ritual</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            Shop by <em className="italic text-terracotta">Need</em>
          </h2>
          <p className="text-[15px] leading-relaxed text-text-2 mt-3 max-w-[480px] mx-auto">
            Every body is different. Every movement demands different care.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATS.map((cat, i) => (
            <AnimatedSection key={cat.name} delay={(i + 1) as 1|2|3|4}>
              <Link
                href={cat.href}
                className="block bg-ivory rounded-xl overflow-hidden md:hover:-translate-y-1.5 transition-all duration-300 group"
                style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0')}
              >
                <div className="h-[155px] overflow-hidden relative">
                  <Image
                    src={cat.img}
                    alt={cat.name}
                    fill
                    className={`object-cover ${cat.pos} group-hover:scale-[1.09] transition-transform duration-500`}
                  />
                </div>
                <div className="p-5 pb-6">
                  <div className="font-serif text-[17px] font-medium text-navy mb-1.5">{cat.name}</div>
                  <div className="text-[13px] leading-relaxed text-text-2 mb-3 line-clamp-3 sm:line-clamp-none">{cat.desc}</div>
                  <span className="text-[10px] font-semibold tracking-[2px] uppercase text-teal">Explore →</span>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
