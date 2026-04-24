import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import { ARTICLES } from '@/lib/journal';
import type { JournalArticle } from '@/lib/journal';

// ─── Static generation ────────────────────────────────────────────────────────

export function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} — Thavare Journal`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      images: [{ url: article.coverImage, width: 1200, height: 630, alt: article.title }],
    },
  };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<JournalArticle['category'], string> = {
  skincare: 'Skincare',
  ayurveda: 'Ayurveda',
  sport: 'Sport',
  wellness: 'Wellness',
};

const CATEGORY_COLORS: Record<JournalArticle['category'], string> = {
  skincare: 'bg-terracotta/10 text-terracotta border border-terracotta/20',
  ayurveda: 'bg-terracotta/10 text-terracotta border border-terracotta/20',
  sport:    'bg-navy/10 text-navy border border-navy/20',
  wellness: 'bg-camel/10 text-camel border border-camel/20',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getRelatedArticles(current: JournalArticle): JournalArticle[] {
  const others = ARTICLES.filter(a => a.slug !== current.slug);
  // Prefer same category; fallback to any two
  const sameCategory = others.filter(a => a.category === current.category);
  const pool = sameCategory.length >= 2 ? sameCategory : others;
  // Deterministic: first two from pool
  return pool.slice(0, 2);
}

// ─── Page component ───────────────────────────────────────────────────────────

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) notFound();

  const paragraphs = article.content.split('\n\n').filter(Boolean);
  const related = getRelatedArticles(article);

  return (
    <div className="bg-cream min-h-screen">
      {/* ─── BREADCRUMB ─── */}
      <div className="max-w-[760px] mx-auto px-4 md:px-6 pt-8 pb-2">
        <nav className="flex items-center gap-2 text-[11px] text-text-3 tracking-wide">
          <Link href="/" className="cursor-none hover:text-navy transition-colors duration-150">Home</Link>
          <span className="text-text-3/40">›</span>
          <Link href="/journal" className="cursor-none hover:text-navy transition-colors duration-150">Journal</Link>
          <span className="text-text-3/40">›</span>
          <span className="text-navy/60 truncate max-w-[200px]">{article.title}</span>
        </nav>
      </div>

      {/* ─── ARTICLE HEADER ─── */}
      <header className="max-w-[760px] mx-auto px-4 md:px-6 pt-7 pb-9">
        <AnimatedSection>
          <div className="mb-4">
            <span
              className={`inline-block text-[9px] font-semibold tracking-[2px] uppercase px-3 py-1 rounded-full ${CATEGORY_COLORS[article.category]}`}
            >
              {CATEGORY_LABELS[article.category]}
            </span>
          </div>

          <h1 className="font-serif text-[clamp(28px,4vw,46px)] font-medium leading-[1.12] text-navy mb-5">
            {article.title}
          </h1>

          {/* Meta row */}
          <div className="flex items-center gap-4 flex-wrap mb-7">
            <span className="text-[12px] text-text-3">{article.readTime} min read</span>
            <span className="w-1 h-1 rounded-full bg-text-3/30" />
            <span className="text-[12px] text-text-3">{formatDate(article.publishedAt)}</span>
          </div>

          {/* Author */}
          <div
            className="flex items-center gap-4 p-4 rounded-xl border border-[#E5DDD0] bg-white/60"
            style={{ boxShadow: 'var(--shadow)' }}
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-[18px] flex-shrink-0"
              style={{ background: 'rgba(166,69,44,0.07)', border: '1px solid rgba(166,69,44,0.15)' }}
            >
              👩‍⚕️
            </div>
            <div>
              <div className="text-[13px] font-semibold text-navy leading-tight">Dr. Meena Ramaiah</div>
              <div className="text-[11px] text-text-3 mt-0.5 leading-relaxed">
                Physician & Formulator. 18 years of clinical practice, in collaboration with a traditional Ayurvedic physician.
                Founder & Formulator at Thavare.
              </div>
            </div>
          </div>
        </AnimatedSection>
      </header>

      {/* ─── COVER IMAGE ─── */}
      <div className="max-w-[760px] mx-auto px-4 md:px-6 mb-10">
        <AnimatedSection>
          <div className="relative w-full h-[280px] md:h-[400px] rounded-xl overflow-hidden">
            <Image
              src={article.coverImage}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </AnimatedSection>
      </div>

      {/* ─── ARTICLE BODY ─── */}
      <main className="max-w-[760px] mx-auto px-4 md:px-6 pb-16">
        <AnimatedSection>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className="text-[15px] leading-[1.85] text-text-2 mb-5"
            >
              {para}
            </p>
          ))}
        </AnimatedSection>

        {/* Divider */}
        <div className="border-t border-[#E5DDD0] my-14" />

        {/* ─── MORE FROM THE JOURNAL ─── */}
        {related.length > 0 && (
          <section>
            <AnimatedSection className="mb-7">
              <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-2">
                Continue Reading
              </div>
              <h2 className="font-serif text-[24px] font-medium text-navy leading-tight">
                More from the Journal
              </h2>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((rel, i) => (
                <AnimatedSection key={rel.slug} direction="up" delay={(i + 1) as 1 | 2}>
                  <Link href={`/journal/${rel.slug}`} className="cursor-none group block">
                    <article className="bg-white rounded-xl overflow-hidden border border-[#E5DDD0] hover:-translate-y-1 transition-all duration-300 h-full flex flex-col shadow-[0_2px_12px_rgba(26,22,16,0.05)]">
                      <div className="relative w-full h-[140px] overflow-hidden flex-shrink-0">
                        <Image
                          src={rel.coverImage}
                          alt={rel.title}
                          fill
                          className="object-cover group-hover:scale-[1.04] transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="mb-2">
                          <span
                            className={`inline-block text-[8px] font-semibold tracking-[2px] uppercase px-2.5 py-0.5 rounded-full ${CATEGORY_COLORS[rel.category]}`}
                          >
                            {CATEGORY_LABELS[rel.category]}
                          </span>
                        </div>
                        <h3 className="font-serif text-[15px] font-medium leading-[1.3] text-navy group-hover:text-terracotta transition-colors duration-200 flex-1">
                          {rel.title}
                        </h3>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#E5DDD0]">
                          <span className="text-[10px] text-text-3">{rel.readTime} min read</span>
                          <span className="text-[10px] font-semibold tracking-[1px] uppercase text-terracotta inline-flex items-center gap-1">
                            Read <span>→</span>
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          </section>
        )}

        {/* ─── CTA ─── */}
        <AnimatedSection className="mt-14">
          <div
            className="rounded-2xl p-8 md:p-10 text-center border border-[#E5DDD0] bg-navy"
            style={{
              backgroundImage:
                'radial-gradient(circle, rgba(166,69,44,0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          >
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-3">
              Thavare Collection
            </div>
            <h3 className="font-serif text-[clamp(22px,3vw,32px)] font-medium text-cream leading-[1.2] mb-3">
              Built for Every Body<br />
              <em className="italic text-terracotta">That Moves.</em>
            </h3>
            <p className="text-[14px] leading-[1.7] text-cream/60 max-w-[420px] mx-auto mb-7">
              Ayurvedic actives formulated for active skin. Explore the full range — cleansers,
              oils, SPF, and recovery care.
            </p>
            <Link href="/shop">
              <Button variant="primary">Explore the Range</Button>
            </Link>
          </div>
        </AnimatedSection>
      </main>
    </div>
  );
}
