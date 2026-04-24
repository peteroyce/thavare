import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { IngredientsGrid } from './IngredientsGrid';

export const metadata: Metadata = {
  title: 'Ingredient Glossary — Thavare',
  description:
    'Every Ayurvedic ingredient in Thavare products — explained. Discover the science and tradition behind each active, from saffron to sandalwood.',
  openGraph: {
    title: 'Ingredient Glossary — Thavare',
    description:
      'Every Ayurvedic ingredient in Thavare products — explained. Discover the science and tradition behind each active.',
    images: [{ url: '/images/editorial-kumkumadi-hand.jpg', width: 1200, height: 630, alt: 'Thavare Ingredient Glossary' }],
  },
};

export default function IngredientsPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section
        className="min-h-[60vh] bg-navy-deep flex flex-col justify-center px-4 md:px-10 lg:px-20 py-14 md:py-24 relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(166,69,44,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Gradient orbs */}
        <div
          className="absolute w-[640px] h-[640px] rounded-full -left-32 -top-32 pointer-events-none orb-fade"
          style={{
            background: 'radial-gradient(circle, rgba(26,39,68,0.85), transparent)',
            filter: 'blur(90px)',
            animationDelay: '0.1s',
          }}
        />
        <div
          className="absolute w-[480px] h-[480px] rounded-full -right-20 bottom-0 pointer-events-none orb-fade"
          style={{
            background: 'radial-gradient(circle, rgba(44,26,14,0.6), transparent)',
            filter: 'blur(90px)',
            animationDelay: '0.2s',
          }}
        />

        <div className="max-w-[1200px] mx-auto w-full relative z-10">
          {/* Eyebrow */}
          <div
            className="hero-entry inline-flex items-center gap-2.5 mb-5"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="w-7 h-px bg-terracotta" />
            <span className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta">
              Our Ingredients
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-entry font-serif text-[clamp(38px,4.5vw,64px)] font-medium leading-[1.08] text-cream mb-6 max-w-[720px]"
            style={{ animationDelay: '0.45s' }}
          >
            The Thavare<br />
            <em className="italic text-terracotta">Glossary.</em>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-entry text-[15px] leading-[1.75] font-light text-cream/65 max-w-[540px] mb-10"
            style={{ animationDelay: '0.6s' }}
          >
            We believe transparency is the highest form of trust. Every ingredient
            in every Thavare formula is chosen with purpose, rooted in 5,000 years of
            Ayurvedic tradition, and validated by modern science. Nothing hidden.
            Nothing arbitrary.
          </p>

          {/* Stats */}
          <div
            className="hero-entry flex gap-10 pt-7 border-t border-white/10 w-fit"
            style={{ animationDelay: '0.75s' }}
          >
            {[
              ['8', 'Active Ingredients'],
              ['5000+', 'Years of Ayurveda'],
              ['100%', 'Traceable Origins'],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-[30px] font-medium text-camel leading-none">{n}</div>
                <div className="text-[10px] tracking-[1.5px] uppercase text-cream/35 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom line accent */}
        <div
          className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-terracotta to-transparent"
          style={{ animation: 'line-grow 1.2s 0.8s var(--ease-out) forwards' }}
        />
      </section>

      {/* ─── INTRO STRIP ─── */}
      <section className="py-10 md:py-16 px-4 md:px-10 lg:px-20 bg-ivory border-b border-[#E5DDD0]">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection direction="up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
              {[
                {
                  label: 'Ethically Sourced',
                  text: 'Every ingredient is traced to its botanical origin across India\'s diverse regions — from the Western Ghats to Kashmir.',
                },
                {
                  label: 'Clinically Validated',
                  text: 'Each active is selected not by tradition alone, but by modern evidence for efficacy on active, sport-oriented skin.',
                },
                {
                  label: 'No Hidden Fillers',
                  text: 'Our formulas contain no synthetic fragrances, no harsh surfactants, and no inactive padding — just actives that work.',
                },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: 'var(--terracotta)' }}
                  />
                  <div>
                    <div className="font-serif text-[15px] font-medium text-navy mb-1">{item.label}</div>
                    <p className="text-[13px] leading-[1.65] text-text-2">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── GRID ─── */}
      <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-cream">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="mb-8">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-3">
              Browse by Category
            </div>
            <h2 className="font-serif text-[clamp(24px,2.5vw,36px)] font-medium text-navy leading-[1.2]">
              Every Active, Explained.
            </h2>
          </AnimatedSection>

          <IngredientsGrid />
        </div>
      </section>

      {/* ─── PHILOSOPHY CTA ─── */}
      <section
        className="py-14 md:py-20 px-4 md:px-10 lg:px-20 bg-navy relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(166,69,44,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(166,69,44,0.06), transparent)',
          }}
        />
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <AnimatedSection>
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-4">
              From Ingredient to Product
            </div>
            <h2 className="font-serif text-[clamp(26px,3vw,42px)] font-medium leading-[1.15] text-cream mb-5">
              See These Actives<br />
              <em className="italic text-terracotta">In Action.</em>
            </h2>
            <p className="text-[14px] leading-[1.75] text-cream/55 max-w-[480px] mx-auto mb-8">
              Every formula in the Thavare range puts these ingredients to work —
              targeted, balanced, and clinically validated for the body in motion.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <a href="/shop" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none bg-terracotta text-ivory shadow-[0_0_0_1px_var(--terracotta)] hover:-translate-y-px hover:shadow-[0_0_0_1px_var(--terra-h),0_6px_20px_rgba(179,95,66,0.35)]">
                Shop the Range
              </a>
              <a href="/about" className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none bg-transparent text-cream/75 border border-cream/20 hover:border-cream/45 hover:text-cream hover:bg-cream/5">
                Our Philosophy
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
