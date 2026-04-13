'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { ARTICLES } from '@/lib/journal';
import type { JournalArticle } from '@/lib/journal';

const CATEGORY_LABELS: Record<JournalArticle['category'] | 'all', string> = {
  all: 'All',
  skincare: 'Skincare',
  ayurveda: 'Ayurveda',
  sport: 'Sport',
  wellness: 'Wellness',
};

const CATEGORY_COLORS: Record<JournalArticle['category'], string> = {
  skincare: 'bg-teal/10 text-teal border border-teal/20',
  ayurveda: 'bg-terracotta/10 text-terracotta border border-terracotta/20',
  sport:    'bg-navy/10 text-navy border border-navy/20',
  wellness: 'bg-camel/10 text-camel border border-camel/20',
};

function CategoryBadge({ category }: { category: JournalArticle['category'] }) {
  return (
    <span
      className={`inline-block text-[9px] font-semibold tracking-[2px] uppercase px-3 py-1 rounded-full ${CATEGORY_COLORS[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function JournalPage() {
  const [active, setActive] = useState<JournalArticle['category'] | 'all'>('all');

  const featured = ARTICLES[0];
  const rest = ARTICLES.slice(1);

  const filteredFeatured = active === 'all' || featured.category === active ? featured : null;
  const filteredRest = rest.filter(a => active === 'all' || a.category === active);

  const allFiltered: JournalArticle[] =
    active === 'all'
      ? ARTICLES
      : ARTICLES.filter(a => a.category === active);

  const displayFeatured = active === 'all' ? featured : null;
  const displayGrid =
    active === 'all' ? rest : allFiltered;

  return (
    <>
      {/* ─── HERO ─── */}
      <section
        className="min-h-[52vh] bg-navy-deep flex flex-col justify-center px-4 md:px-10 lg:px-20 py-14 md:py-20 relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,132,147,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        <div
          className="absolute w-[540px] h-[540px] rounded-full -left-32 -top-24 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(26,39,68,0.85), transparent)',
            filter: 'blur(90px)',
          }}
        />
        <div
          className="absolute w-[440px] h-[440px] rounded-full -right-16 bottom-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(44,26,14,0.55), transparent)',
            filter: 'blur(90px)',
          }}
        />

        <div className="max-w-[1200px] mx-auto w-full relative z-10">
          <div className="hero-entry inline-flex items-center gap-2.5 mb-5" style={{ animationDelay: '0.3s' }}>
            <div className="w-7 h-px bg-teal" />
            <span className="text-[10px] font-medium tracking-[4px] uppercase text-teal">
              The Journal
            </span>
          </div>
          <h1
            className="hero-entry font-serif text-[clamp(36px,4.5vw,60px)] font-medium leading-[1.08] text-cream mb-5 max-w-[680px]"
            style={{ animationDelay: '0.45s' }}
          >
            Insights for{' '}
            <em className="italic text-terracotta">Active Skin.</em>
          </h1>
          <p
            className="hero-entry text-[15px] leading-[1.75] font-light text-cream/60 max-w-[500px]"
            style={{ animationDelay: '0.6s' }}
          >
            Ayurvedic science, sport skincare routines, and ingredient deep-dives — written for
            every body that moves.
          </p>
        </div>

        <div
          className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-teal to-transparent"
          style={{ animation: 'line-grow 1.2s 0.8s var(--ease-out) forwards' }}
        />
      </section>

      {/* ─── FILTER PILLS ─── */}
      <section className="bg-ivory border-b border-[#E5DDD0] sticky top-[72px] z-30">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 py-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {(Object.keys(CATEGORY_LABELS) as Array<JournalArticle['category'] | 'all'>).map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`cursor-none whitespace-nowrap px-5 py-2 rounded-full text-[10px] font-semibold tracking-[1.5px] uppercase transition-all duration-200 border ${
                active === cat
                  ? 'bg-navy text-cream border-navy'
                  : 'bg-white text-navy/50 border-[#E5DDD0] hover:border-navy/30 hover:text-navy/80'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </section>

      <div className="bg-cream min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 py-14 md:py-20">

          {/* ─── FEATURED ARTICLE ─── */}
          {displayFeatured && (
            <AnimatedSection className="mb-14 md:mb-20">
              <Link href={`/journal/${displayFeatured.slug}`} className="cursor-none group block">
                <div className="relative w-full rounded-2xl overflow-hidden border border-[#E5DDD0] bg-white shadow-[0_4px_32px_rgba(26,22,16,0.07)] group-hover:-translate-y-1 transition-all duration-300">
                  {/* Cover image */}
                  <div className="relative w-full h-[320px] md:h-[480px] overflow-hidden">
                    <Image
                      src={displayFeatured.coverImage}
                      alt={displayFeatured.title}
                      fill
                      className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      priority
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/75 via-navy-deep/15 to-transparent" />

                    {/* Overlaid text */}
                    <div className="absolute bottom-0 left-0 right-0 p-7 md:p-10">
                      <div className="mb-3">
                        <span className="inline-block text-[9px] font-semibold tracking-[2px] uppercase px-3 py-1 rounded-full bg-white/15 text-cream border border-white/25 backdrop-blur-sm">
                          {CATEGORY_LABELS[displayFeatured.category]}
                        </span>
                      </div>
                      <h2 className="font-serif text-[clamp(22px,3vw,40px)] font-medium leading-[1.15] text-cream mb-3 max-w-[700px]">
                        {displayFeatured.title}
                      </h2>
                      <p className="text-[14px] leading-[1.65] text-cream/70 max-w-[600px] mb-5 hidden md:block">
                        {displayFeatured.excerpt}
                      </p>
                      <div className="flex items-center gap-5">
                        <span className="text-[11px] text-cream/55 tracking-wide">
                          {displayFeatured.readTime} min read
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[1.5px] uppercase text-teal group-hover:gap-2.5 transition-all duration-200">
                          Read Article <span>→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          )}

          {/* ─── ARTICLE GRID ─── */}
          {displayGrid.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              {displayGrid.map((article, i) => (
                <AnimatedSection key={article.slug} direction="up" delay={((i % 2) + 1) as 1 | 2}>
                  <Link href={`/journal/${article.slug}`} className="cursor-none group block h-full">
                    <article className="bg-white rounded-xl overflow-hidden border border-[#E5DDD0] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col shadow-[0_2px_16px_rgba(26,22,16,0.05)]">
                      {/* Card image */}
                      <div className="relative w-full h-[220px] overflow-hidden flex-shrink-0">
                        <Image
                          src={article.coverImage}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                      </div>

                      {/* Card body */}
                      <div className="p-6 flex flex-col flex-1">
                        <div className="mb-3">
                          <CategoryBadge category={article.category} />
                        </div>
                        <h3 className="font-serif text-[18px] font-medium leading-[1.25] text-navy mb-2.5 group-hover:text-terracotta transition-colors duration-200">
                          {article.title}
                        </h3>
                        <p className="text-[13px] leading-[1.7] text-text-2 mb-5 flex-1">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-[#E5DDD0] mt-auto">
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] text-text-3">{article.readTime} min read</span>
                            <span className="text-text-3/40 text-[9px]">•</span>
                            <span className="text-[11px] text-text-3">{formatDate(article.publishedAt)}</span>
                          </div>
                          <span className="text-[11px] font-semibold tracking-[1px] uppercase text-teal group-hover:gap-2.5 transition-all duration-200 inline-flex items-center gap-1">
                            Read <span>→</span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <AnimatedSection className="text-center py-24">
              <p className="text-[15px] text-text-3">No articles in this category yet.</p>
            </AnimatedSection>
          )}
        </div>
      </div>
    </>
  );
}
