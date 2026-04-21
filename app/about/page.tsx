import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us — Thavare | Clinically Crafted Ayurveda',
  description:
    'Thavare was built for real life — for every body that moves. Where ancient Ayurvedic wisdom meets modern science, clinically crafted for active skin.',
  openGraph: {
    title: 'About Thavare — For Every Body That Moves',
    description: 'Where ancient Ayurvedic wisdom meets modern science. Thavare was built for real life — for every body that moves.',
    images: [{ url: '/images/editorial-kumkumadi-hand.jpg', width: 1200, height: 630, alt: 'About Thavare' }],
  },
};

const STATS = [
  ['5000+', 'Years of Ayurveda'],
  ['100%', 'Natural Actives'],
  ['Dr.', 'Clinically Formulated'],
];

const PILLARS = [
  {
    icon: '🌿',
    title: 'Rooted in Nature',
    desc: 'Ayurvedic wisdom distilled from 5000 years of traditional practice — every ingredient chosen with purpose and respect.',
  },
  {
    icon: '🔬',
    title: 'Proven by Science',
    desc: 'Modern biotechnology that extracts and elevates ancient actives, clinically validated so nature and science always work together.',
  },
  {
    icon: '💧',
    title: 'Built for Motion',
    desc: 'Engineered for the unique demands of active skin — sweat, sun, friction, and the wear of everyday movement.',
  },
];

const CERTIFICATIONS = [
  { icon: '🔬', label: 'Clinically Tested', sub: 'Dermatologist validated formulations' },
  { icon: '🌿', label: '100% Ayurvedic Actives', sub: 'No synthetic fragrances or harsh chemicals' },
  { icon: '👩‍⚕️', label: 'Doctor Formulated', sub: 'By Dr. Meena Ramaiah, Ayurvedic physician' },
  { icon: '♻️', label: 'Sustainable Packaging', sub: 'Recyclable materials, minimal plastic' },
  { icon: '🚫', label: 'Cruelty Free', sub: 'Never tested on animals' },
  { icon: '🇮🇳', label: 'Made in India', sub: 'Manufactured in GMP-certified facilities' },
];

const PACE = [
  {
    word: 'Move.',
    desc: 'Show up for yourself. Every walk, run, session, or stretch is a choice worth honouring.',
  },
  {
    word: 'Sweat.',
    desc: 'Your skin is on the frontline. Active skin faces the sun, the sweat, the wind — and it deserves better care.',
  },
  {
    word: 'Heal.',
    desc: 'Recover, restore, and feel your best — because wellness is not a destination, it is a daily choice.',
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-x-hidden">
      {/* ─── HERO ─── */}
      <section
        className="min-h-[70vh] bg-navy-deep flex flex-col justify-center px-4 md:px-10 lg:px-20 py-14 md:py-24 relative overflow-hidden"
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
          {/* Eyebrow */}
          <div
            className="hero-entry inline-flex items-center gap-2.5 mb-5"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="w-7 h-px bg-teal" />
            <span className="text-[10px] font-medium tracking-[4px] uppercase text-teal">
              About Thavare
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-entry font-serif text-[clamp(38px,4.5vw,64px)] font-medium leading-[1.08] text-cream mb-6 max-w-[720px]"
            style={{ animationDelay: '0.45s' }}
          >
            For Every Body<br />
            <em className="italic text-terracotta">That Moves.</em>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-entry text-[15px] leading-[1.75] font-light text-cream/65 max-w-[560px] mb-10"
            style={{ animationDelay: '0.6s' }}
          >
            Thavare was created for anyone who chooses to show up — whether you&apos;re hitting the gym,
            running a marathon, or simply stepping out for your morning walk. Movement looks different
            for everyone, and so do the skin and body needs that come with it.
          </p>

          {/* Stats row */}
          <div
            className="hero-entry flex flex-wrap gap-6 md:gap-10 pt-7 border-t border-white/10 w-fit"
            style={{ animationDelay: '0.75s' }}
          >
            {STATS.map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-[30px] font-medium text-camel leading-none">{n}</div>
                <div className="text-[10px] tracking-[1.5px] uppercase text-cream/35 mt-1">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom line accent */}
        <div
          className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-teal to-transparent"
          style={{ animation: 'line-grow 1.2s 0.8s var(--ease-out) forwards' }}
        />
      </section>

      {/* ─── MISSION ─── */}
      <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-start">
          {/* Left col — story copy */}
          <div>
            <AnimatedSection direction="left">
              <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
                Our Mission
              </div>
              <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy mb-6">
                Where Ancient Wisdom<br />
                <em className="italic text-terracotta">Meets Modern Science.</em>
              </h2>
            </AnimatedSection>
            <AnimatedSection direction="left" delay={1}>
              <p className="text-[14px] leading-[1.75] text-text-2 mb-5">
                At the heart of Thavare lies a deep respect for Ayurveda — one of the world&apos;s
                oldest and most trusted wellness traditions. We take the power of time-tested Ayurvedic
                ingredients and elevate them through modern technology, creating skincare that is not
                only rooted in nature but proven by science.
              </p>
              <p className="text-[14px] leading-[1.75] text-text-2 mb-5">
                Active skin is different. It faces the sun, the sweat, the wind, and the wear of
                everyday movement. Most wellness brands were built for extremes. Thavare was built
                for real life.
              </p>
              <p className="text-[14px] leading-[1.75] text-text-2">
                Our journey began with a simple but powerful belief — that everyone who moves
                deserves better care. The best of both worlds, in every product.
              </p>
            </AnimatedSection>
          </div>

          {/* Right col — philosophy pillar cards */}
          <div className="flex flex-col gap-5">
            {PILLARS.map((p, i) => (
              <AnimatedSection key={p.title} direction="right" delay={(i + 1) as 1 | 2 | 3}>
                <div
                  className="flex items-start gap-5 p-6 rounded-xl border group hover:-translate-y-0.5 transition-all duration-300 cursor-none"
                  style={{
                    borderColor: 'var(--border-m)',
                    background: 'rgba(255,255,255,0.6)',
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[22px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'rgba(0,132,147,0.07)',
                      border: '1px solid rgba(0,132,147,0.15)',
                    }}
                  >
                    {p.icon}
                  </div>
                  <div>
                    <div className="font-serif text-[17px] font-medium text-navy mb-1.5">
                      {p.title}
                    </div>
                    <div className="text-[13px] leading-[1.65] text-text-2">{p.desc}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY ─── */}
      <section
        className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-navy relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,132,147,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Ambient orb */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,132,147,0.06), transparent)',
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Centered header */}
          <AnimatedSection className="text-center mb-14">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
              Our Philosophy
            </div>
            <h2 className="font-serif text-[clamp(28px,3.5vw,48px)] font-medium leading-[1.12] text-cream mb-6">
              Move Well.{' '}
              <em className="italic text-terracotta">Feel Well.</em>
              <br />
              Live Well.
            </h2>
            <p className="text-[15px] leading-[1.75] text-cream/60 max-w-[560px] mx-auto">
              We believe wellness isn&apos;t a destination — it&apos;s a daily choice. Every Thavare
              product is built on the belief that caring for your skin isn&apos;t a luxury, it&apos;s
              a necessity. No matter your age, fitness level, or pace of life, you deserve products
              that are rooted in nature and backed by science.
            </p>
          </AnimatedSection>

          {/* Divider */}
          <div className="border-t border-white/10 mb-14" />

          {/* Three-col pace items */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {PACE.map((item, i) => (
              <AnimatedSection
                key={item.word}
                direction="up"
                delay={(i + 1) as 1 | 2 | 3}
                className="text-center"
              >
                <div
                  className="rounded-xl p-8 border border-white/8 group hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300 cursor-none"
                  style={{
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <div className="font-serif text-[42px] font-medium text-camel leading-none mb-4">
                    {item.word}
                  </div>
                  <div className="text-[13px] leading-[1.65] text-cream/55">{item.desc}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* CTA */}
          <AnimatedSection delay={4} className="text-center">
            <Link href="/shop">
              <Button variant="primary">Shop the Range</Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── PROMISE ─── */}
      <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-cream">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* Left — decorative visual accent */}
          <AnimatedSection direction="left">
            <div className="relative flex items-center justify-center h-[340px]">
              {/* Outer ring */}
              <div
                className="absolute w-[300px] h-[300px] rounded-full border"
                style={{ borderColor: 'rgba(168,122,83,0.2)' }}
              />
              {/* Middle ring */}
              <div
                className="absolute w-[220px] h-[220px] rounded-full border"
                style={{ borderColor: 'rgba(168,122,83,0.35)' }}
              />
              {/* Inner circle */}
              <div
                className="absolute w-[140px] h-[140px] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(168,122,83,0.18), rgba(179,95,66,0.08))',
                  border: '1px solid rgba(179,95,66,0.3)',
                }}
              />
              {/* Large decorative T */}
              <span
                className="font-serif text-[110px] font-medium leading-none select-none relative z-10"
                style={{ color: 'var(--terracotta)', opacity: 0.75 }}
              >
                T
              </span>
              {/* Small floating label */}
              <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-[3px] uppercase"
                style={{ color: 'var(--camel)' }}
              >
                Thavare
              </div>
            </div>
          </AnimatedSection>

          {/* Right — promise text */}
          <AnimatedSection direction="right">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
              The Promise
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy mb-5">
              That&apos;s the<br />
              <em className="italic text-terracotta">Thavare Promise.</em>
            </h2>
            <p className="text-[15px] leading-[1.75] text-text-2 mb-3">
              For every body, at every pace.
            </p>
            <p className="text-[14px] leading-[1.75] text-text-2 mb-10">
              From the early morning walker greeting the sunrise, to the athlete pushing through a
              tough session, every person&apos;s skin has unique needs that ordinary products just
              don&apos;t meet. Thavare&apos;s active skincare is built for one purpose — to keep you
              feeling your best, no matter your pace. And this is just the beginning.
            </p>

            {/* Divider */}
            <div
              className="border-t mb-8"
              style={{ borderColor: 'rgba(0,0,0,0.08)' }}
            />

            <div className="flex gap-3 flex-wrap">
              <Link href="/founders">
                <Button variant="primary">Meet Our Founders</Button>
              </Link>
              <Link href="/circle">
                <button className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-xs font-semibold tracking-widest uppercase transition-all duration-200 cursor-none border border-navy/20 text-navy/70 hover:border-navy/40 hover:text-navy bg-transparent">
                  Join the Circle
                </button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ─── */}
      <section className="py-14 md:py-20 px-4 md:px-10 lg:px-20 bg-ivory">
        <div className="max-w-[1200px] mx-auto">
          <AnimatedSection className="text-center mb-12">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">Our Standards</div>
            <h2 className="font-serif text-[clamp(24px,2.5vw,36px)] font-medium text-navy leading-[1.2]">
              What We Stand For
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CERTIFICATIONS.map((cert, i) => (
              <AnimatedSection key={cert.label} delay={(i % 4 + 1) as 1|2|3|4}>
                <div className="flex flex-col items-center text-center p-5 rounded-xl bg-white border border-[#E5DDD0] shadow-[rgba(26,22,16,0.04)_0_2px_12px] hover:-translate-y-0.5 transition-all duration-300 cursor-none h-full">
                  <div className="text-[28px] mb-3">{cert.icon}</div>
                  <div className="font-semibold text-[12px] text-navy mb-1.5 leading-tight">{cert.label}</div>
                  <div className="text-[11px] text-text-3 leading-relaxed">{cert.sub}</div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
