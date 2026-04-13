import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { INGREDIENTS, type Ingredient } from '@/lib/ingredients';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

/* ─── Static generation ─── */

export function generateStaticParams() {
  return INGREDIENTS.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = INGREDIENTS.find((i) => i.slug === slug);
  if (!ingredient) return {};
  return {
    title: `${ingredient.name} — Thavare Ingredients`,
    description: ingredient.description.slice(0, 160),
    openGraph: {
      title: `${ingredient.name} — Thavare Ingredient Glossary`,
      description: ingredient.tagline,
    },
  };
}

/* ─── Helpers ─── */

const CATEGORY_LABELS: Record<Ingredient['category'], string> = {
  herb:      'Herb',
  oil:       'Oil',
  mineral:   'Mineral',
  botanical: 'Botanical',
};

const CATEGORY_BADGE_COLORS: Record<Ingredient['category'], string> = {
  herb:      'bg-[rgba(0,132,147,0.08)] text-teal border border-[rgba(0,132,147,0.2)]',
  oil:       'bg-[rgba(168,122,83,0.1)] text-camel border border-[rgba(168,122,83,0.2)]',
  mineral:   'bg-[rgba(26,39,68,0.07)] text-navy border border-[rgba(26,39,68,0.12)]',
  botanical: 'bg-[rgba(179,95,66,0.08)] text-terracotta border border-[rgba(179,95,66,0.18)]',
};

// Maps product handles to human-readable display names.
const PRODUCT_NAMES: Record<string, string> = {
  'thavare-body-wash':          'Thavare Body Wash',
  'thavare-body-lotion':        'Thavare Body Lotion',
  'thavare-sun-screen':         'Thavare Sunscreen SPF 50',
  'thavare-adolescent-sun-block': 'Thavare Adolescent Sun Block',
};

/* ─── Page ─── */

export default async function IngredientPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const ingredient = INGREDIENTS.find((i) => i.slug === slug);
  if (!ingredient) notFound();

  const initial = ingredient.name[0].toUpperCase();

  return (
    <>
      {/* ─── 1. HERO ─── */}
      <section
        className="min-h-[62vh] bg-navy-deep flex flex-col justify-center px-4 md:px-10 lg:px-20 py-14 md:py-24 relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,132,147,0.04) 1px, transparent 1px)',
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
          className="absolute w-[520px] h-[520px] rounded-full -right-24 bottom-0 pointer-events-none orb-fade"
          style={{
            background: 'radial-gradient(circle, rgba(44,26,14,0.65), transparent)',
            filter: 'blur(90px)',
            animationDelay: '0.25s',
          }}
        />

        <div className="max-w-[1200px] mx-auto w-full relative z-10">
          {/* Breadcrumb */}
          <div
            className="hero-entry inline-flex items-center gap-2 mb-5"
            style={{ animationDelay: '0.25s' }}
          >
            <Link
              href="/ingredients"
              className="text-[10px] font-medium tracking-[3px] uppercase text-teal/70 hover:text-teal transition-colors cursor-none"
            >
              Ingredients
            </Link>
            <span className="text-teal/30 text-[10px]">/</span>
            <span className="text-[10px] font-medium tracking-[3px] uppercase text-teal">
              {ingredient.name}
            </span>
          </div>

          {/* Name */}
          <h1
            className="hero-entry font-serif text-[clamp(42px,5vw,72px)] font-medium leading-[1.05] text-cream mb-3 max-w-[800px]"
            style={{ animationDelay: '0.4s' }}
          >
            {ingredient.name}
          </h1>

          {/* Sanskrit name */}
          {ingredient.sanskritName && (
            <p
              className="hero-entry font-serif text-[clamp(15px,1.6vw,20px)] italic text-beige/65 mb-5"
              style={{ animationDelay: '0.52s' }}
            >
              {ingredient.sanskritName}
            </p>
          )}

          {/* Tagline */}
          <p
            className="hero-entry text-[15px] leading-[1.75] font-light text-cream/65 max-w-[520px] mb-8"
            style={{ animationDelay: '0.62s' }}
          >
            {ingredient.tagline}
          </p>

          {/* Meta row */}
          <div
            className="hero-entry flex flex-wrap gap-3 items-center"
            style={{ animationDelay: '0.75s' }}
          >
            <span
              className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-[1.5px] uppercase ${CATEGORY_BADGE_COLORS[ingredient.category]}`}
            >
              {CATEGORY_LABELS[ingredient.category]}
            </span>
            <span className="text-cream/25 text-[10px]">·</span>
            <span className="text-[11px] tracking-[1.5px] uppercase text-cream/40">
              {ingredient.origin}
            </span>
          </div>
        </div>

        <div
          className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-teal to-transparent"
          style={{ animation: 'line-grow 1.2s 0.8s var(--ease-out) forwards' }}
        />
      </section>

      {/* ─── 2. ABOUT — 2-col with decorative initial ─── */}
      <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-cream">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* Left — description */}
          <div>
            <AnimatedSection direction="left">
              <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
                About this Ingredient
              </div>
              <h2 className="font-serif text-[clamp(26px,3vw,40px)] font-medium leading-[1.15] text-navy mb-6">
                What Makes It<br />
                <em className="italic text-terracotta">Remarkable.</em>
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={1}>
              <p className="text-[14px] leading-[1.8] text-text-2">
                {ingredient.description}
              </p>
            </AnimatedSection>
          </div>

          {/* Right — decorative initial circle (mirrors About / Promise section) */}
          <AnimatedSection direction="right">
            <div className="relative flex items-center justify-center h-[320px]">
              {/* Outer ring */}
              <div
                className="absolute w-[280px] h-[280px] rounded-full border"
                style={{ borderColor: 'rgba(168,122,83,0.18)' }}
              />
              {/* Middle ring */}
              <div
                className="absolute w-[200px] h-[200px] rounded-full border"
                style={{ borderColor: 'rgba(168,122,83,0.32)' }}
              />
              {/* Inner filled circle */}
              <div
                className="absolute w-[128px] h-[128px] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(168,122,83,0.16), rgba(179,95,66,0.07))',
                  border: '1px solid rgba(179,95,66,0.28)',
                }}
              />
              {/* Decorative initial */}
              <span
                className="font-serif text-[104px] font-medium leading-none select-none relative z-10"
                style={{ color: 'var(--terracotta)', opacity: 0.72 }}
              >
                {initial}
              </span>
              {/* Small floating origin label */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-[3px] uppercase whitespace-nowrap"
                style={{ color: 'var(--camel)' }}
              >
                {ingredient.origin.split(',')[0]}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── 3. BENEFITS ─── */}
      <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="mb-12">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
              Why It Works
            </div>
            <h2 className="font-serif text-[clamp(26px,3vw,40px)] font-medium leading-[1.15] text-navy">
              Key Benefits<br />
              <em className="italic text-terracotta">for Active Skin.</em>
            </h2>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[860px]">
            {ingredient.benefits.map((benefit, i) => (
              <AnimatedSection
                key={benefit}
                direction="up"
                delay={(Math.min(i, 4)) as 0 | 1 | 2 | 3 | 4}
              >
                <div
                  className="flex items-start gap-4 p-5 rounded-xl border bg-white hover:-translate-y-0.5 transition-all duration-300 cursor-none"
                  style={{
                    borderColor: 'var(--border-l)',
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  {/* Number badge */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-serif text-[13px] font-medium"
                    style={{
                      background: 'rgba(0,132,147,0.07)',
                      border: '1px solid rgba(0,132,147,0.18)',
                      color: 'var(--teal)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-[13px] leading-[1.65] text-text-2 pt-0.5">
                    {benefit}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. FOUND IN THESE PRODUCTS ─── */}
      <section
        className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-navy relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,132,147,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,132,147,0.05), transparent)',
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          <AnimatedSection className="mb-10">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
              Find It In
            </div>
            <h2 className="font-serif text-[clamp(24px,2.5vw,36px)] font-medium leading-[1.2] text-cream">
              Products Featuring<br />
              <em className="italic text-terracotta">{ingredient.name}.</em>
            </h2>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={1}>
            <div className="flex flex-wrap gap-3">
              {ingredient.usedIn.map((handle) => (
                <Link
                  key={handle}
                  href={`/products/${handle}`}
                  className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl border transition-all duration-200 cursor-none hover:-translate-y-0.5"
                  style={{
                    borderColor: 'rgba(255,255,255,0.1)',
                    background: 'rgba(255,255,255,0.04)',
                  }}
                >
                  {/* Teal dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform duration-200"
                    style={{ background: 'var(--teal)' }}
                  />
                  <span className="text-[12px] font-medium text-cream/75 group-hover:text-cream transition-colors duration-200 tracking-[0.5px]">
                    {PRODUCT_NAMES[handle] ?? handle}
                  </span>
                  {/* Arrow */}
                  <span
                    className="text-[10px] opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-200"
                    style={{ color: 'var(--teal)' }}
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── 5. CTA ─── */}
      <section className="py-14 md:py-20 px-4 md:px-10 lg:px-20 bg-ivory">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <AnimatedSection direction="left">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
              The Full Picture
            </div>
            <h2 className="font-serif text-[clamp(26px,3vw,40px)] font-medium leading-[1.15] text-navy mb-5">
              {ingredient.name} is just<br />
              <em className="italic text-terracotta">the beginning.</em>
            </h2>
            <p className="text-[14px] leading-[1.75] text-text-2 mb-8 max-w-[440px]">
              Every Thavare formula combines multiple Ayurvedic actives — each chosen
              to complement the others and address the unique demands of active,
              movement-oriented skin. Explore the full collection.
            </p>
            <div className="flex gap-3 flex-wrap">
              <Link href="/shop">
                <Button variant="primary">Explore the Collection</Button>
              </Link>
              <Link href="/ingredients">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none border border-navy/20 text-navy/70 hover:border-navy/40 hover:text-navy bg-transparent">
                  All Ingredients
                </button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Decorative: other ingredient initials */}
          <AnimatedSection direction="right">
            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              {INGREDIENTS.filter((i) => i.slug !== ingredient.slug).map((other) => (
                <Link
                  key={other.slug}
                  href={`/ingredients/${other.slug}`}
                  className="group relative w-14 h-14 rounded-full flex items-center justify-center border transition-all duration-200 cursor-none hover:scale-105 hover:-translate-y-0.5"
                  style={{
                    borderColor: 'rgba(168,122,83,0.25)',
                    background: 'rgba(168,122,83,0.06)',
                  }}
                  title={other.name}
                >
                  <span
                    className="font-serif text-[22px] font-medium leading-none select-none group-hover:opacity-100 transition-opacity duration-200"
                    style={{ color: 'var(--terracotta)', opacity: 0.65 }}
                  >
                    {other.name[0]}
                  </span>
                  {/* Tooltip */}
                  <div
                    className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] font-medium tracking-[0.5px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                    style={{ color: 'var(--camel)' }}
                  >
                    {other.name}
                  </div>
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
