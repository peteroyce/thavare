import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Why Sport. Why Active. — Thavare | Sport Ayurveda & Active Ayurveda',
  description:
    'The human body was built to move. Thavare was built for it. Discover the philosophy behind Sport Ayurveda and Active Ayurveda — ancient intelligence, finally in motion.',
  openGraph: {
    title: 'Why Sport. Why Active. — Sport Ayurveda by Thavare',
    description: 'Sport Ayurveda and Active Ayurveda — ancient intelligence for the modern body in motion.',
    images: [{ url: '/images/cat-presport-sky.jpg', width: 1200, height: 630, alt: 'Why Sport Active — Thavare' }],
  },
};

const KINETIC_WORDS = [
  { word: 'Straining.', color: 'var(--camel)', delay: '0.85s' },
  { word: 'Sweating.', color: 'var(--terracotta)', delay: '1.0s' },
  { word: 'Recovering.', color: 'var(--camel)', delay: '1.15s' },
];

const SPORT_BULLETS = [
  { icon: '🏆', label: 'The Professional' },
  { icon: '🎯', label: 'The Dedicated' },
  { icon: '💪', label: 'The Competitor' },
];

const ACTIVE_BULLETS = [
  { icon: '🚶', label: 'The Walker' },
  { icon: '🚴', label: 'The Cyclist' },
  { icon: '💃', label: 'The One Who Shows Up' },
];

const DECLARATIONS = [
  'This is Sport Ayurveda.',
  'This is Active Ayurveda.',
  'And this is only where we begin.',
];

export default function WhySportActivePage() {
  return (
    <>
      {/* ─── 1. HERO ─── */}
      <section
        className="min-h-[70vh] bg-navy-deep flex flex-col justify-center px-4 md:px-10 lg:px-20 py-14 md:py-24 relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(166,69,44,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Gradient orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full -left-24 -top-24 pointer-events-none orb-fade"
          style={{
            background: 'radial-gradient(circle, rgba(26,39,68,0.9), transparent)',
            filter: 'blur(80px)',
            animationDelay: '0.1s',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full -right-20 bottom-0 pointer-events-none orb-fade"
          style={{
            background: 'radial-gradient(circle, rgba(44,26,14,0.65), transparent)',
            filter: 'blur(80px)',
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
              Why Sport. Why Active.
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-entry font-serif text-[clamp(38px,4.5vw,64px)] font-medium leading-[1.08] text-cream mb-6 max-w-[760px]"
            style={{ animationDelay: '0.45s' }}
          >
            Your Body Was Built<br />
            <em className="italic text-terracotta">to Move.</em>
          </h1>

          {/* Body copy */}
          <p
            className="hero-entry text-[15px] leading-[1.75] font-light text-cream/65 max-w-[580px] mb-8"
            style={{ animationDelay: '0.6s' }}
          >
            Whether you are an athlete chasing a personal best or someone simply trying
            to show up fully for the day — your body is working. And your skin is there
            for all of it.
          </p>

          {/* Kinetic words */}
          <div
            className="hero-entry flex flex-col gap-1 mb-2"
            style={{ animationDelay: '0.75s' }}
          >
            {KINETIC_WORDS.map(({ word, color, delay }) => (
              <div
                key={word}
                className="hero-entry font-serif text-[clamp(28px,3.5vw,52px)] font-medium italic leading-[1.15]"
                style={{ color, animationDelay: delay }}
              >
                {word}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical teal line accent at bottom */}
        <div
          className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-terracotta to-transparent"
          style={{ animation: 'line-grow 1.2s 1.3s var(--ease-out) forwards' }}
        />
      </section>

      {/* ─── 2. TWO WORDS ─── */}
      <section
        className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-navy relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(166,69,44,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(166,69,44,0.05), transparent)',
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Section header */}
          <AnimatedSection className="text-center mb-14">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-3">
              We Use Two Words Deliberately
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-cream">
              Not a Marketing Choice.<br />
              <em className="italic text-terracotta">A Philosophy.</em>
            </h2>
          </AnimatedSection>

          {/* Two feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
            {/* Card A — Sport */}
            <AnimatedSection direction="left" delay={1}>
              <div
                className="rounded-xl p-10 border border-white/8 h-full flex flex-col hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: 'rgba(179,95,66,0.06)',
                  borderColor: 'rgba(179,95,66,0.3)',
                }}
              >
                {/* Large label */}
                <div
                  className="font-serif font-medium leading-none mb-5 select-none"
                  style={{
                    fontSize: 'clamp(60px,6vw,80px)',
                    color: 'var(--terracotta)',
                  }}
                >
                  Sport
                </div>

                {/* Sub */}
                <p className="text-[15px] font-medium text-cream mb-5 leading-[1.5]">
                  For those who train hard, compete, and push limits.
                </p>

                {/* Divider */}
                <div
                  className="w-12 h-px mb-6"
                  style={{ background: 'rgba(179,95,66,0.4)' }}
                />

                {/* Body */}
                <p className="text-[14px] leading-[1.8] text-cream/60 mb-8">
                  The professional. The dedicated. The one who understands that
                  performance is not just about muscle and mind — it is about every
                  layer of the body that shows up to the fight.
                </p>

                {/* Who it&apos;s for */}
                <div className="mt-auto">
                  <div className="text-[9px] font-semibold tracking-[3px] uppercase mb-4"
                    style={{ color: 'rgba(179,95,66,0.6)' }}>
                    Built For
                  </div>
                  <div className="flex flex-col gap-3">
                    {SPORT_BULLETS.map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="text-[18px]">{icon}</span>
                        <span className="text-[13px] text-cream/70 font-medium tracking-[0.5px]">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Card B — Active */}
            <AnimatedSection direction="right" delay={1}>
              <div
                className="rounded-xl p-10 border h-full flex flex-col hover:-translate-y-0.5 transition-all duration-300"
                style={{
                  background: 'rgba(166,69,44,0.06)',
                  borderColor: 'rgba(166,69,44,0.3)',
                }}
              >
                {/* Large label */}
                <div
                  className="font-serif font-medium leading-none mb-5 select-none"
                  style={{
                    fontSize: 'clamp(60px,6vw,80px)',
                    color: 'var(--terracotta)',
                  }}
                >
                  Active
                </div>

                {/* Sub */}
                <p className="text-[15px] font-medium text-cream mb-5 leading-[1.5]">
                  For everyone else.
                </p>

                {/* Divider */}
                <div
                  className="w-12 h-px mb-6"
                  style={{ background: 'rgba(166,69,44,0.4)' }}
                />

                {/* Body */}
                <p className="text-[14px] leading-[1.8] text-cream/60 mb-8">
                  The one who walks, stretches, cycles, dances, chases children,
                  carries groceries, and moves through life with intention. You
                  don&apos;t need to be an athlete for your body to deserve better care.
                </p>

                {/* Who it&apos;s for */}
                <div className="mt-auto">
                  <div className="text-[9px] font-semibold tracking-[3px] uppercase mb-4"
                    style={{ color: 'rgba(166,69,44,0.65)' }}>
                    Built For
                  </div>
                  <div className="flex flex-col gap-3">
                    {ACTIVE_BULLETS.map(({ icon, label }) => (
                      <div key={label} className="flex items-center gap-3">
                        <span className="text-[18px]">{icon}</span>
                        <span className="text-[13px] text-cream/70 font-medium tracking-[0.5px]">
                          {label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── 3. SPORT AYURVEDA ─── */}
      <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* Left — decorative "5000" */}
          <AnimatedSection direction="left">
            <div className="relative">
              {/* Giant decorative number */}
              <div
                className="font-serif font-medium leading-none select-none"
                style={{
                  fontSize: '160px',
                  color: 'var(--navy)',
                  opacity: 0.1,
                  lineHeight: 1,
                }}
              >
                5000
              </div>
              {/* Label below */}
              <div className="text-[10px] font-semibold tracking-[4px] uppercase text-terracotta mt-3">
                Years of Answers.
              </div>
            </div>
          </AnimatedSection>

          {/* Right — copy */}
          <div>
            <AnimatedSection direction="right">
              <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-3">
                Sport Ayurveda
              </div>
              <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy mb-6">
                Always Had the Answers<br />
                <em className="italic text-terracotta">for the Body in Motion.</em>
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={1}>
              <p className="text-[14px] leading-[1.8] text-text-2 mb-5">
                Ayurveda — one of the world&apos;s oldest and most intelligent systems
                of healing — has always understood the body in motion. The warrior, the
                dancer, the labourer, the farmer. Every body that moved was accounted for.
              </p>
              <p className="text-[14px] leading-[1.8] text-text-2 mb-10">
                At Thavare, we believe those answers have always existed. We are simply
                bringing Ayurveda into the conversation it was always meant to have.
              </p>

              {/* Declaration block */}
              <div
                className="border-l-2 pl-6"
                style={{ borderColor: 'var(--terracotta)' }}
              >
                {DECLARATIONS.map((line) => (
                  <div
                    key={line}
                    className="font-serif italic text-[20px] text-navy leading-[1.65]"
                  >
                    {line}
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── 4. CTA ─── */}
      <section
        className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-navy-deep relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(166,69,44,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Ambient gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(166,69,44,0.06), transparent)',
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <AnimatedSection>
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-4">
              Start Here
            </div>
            <h2 className="font-serif text-[clamp(32px,4vw,56px)] font-medium leading-[1.1] text-cream mb-6">
              Every Body<br />
              <em className="italic text-terracotta">Deserves Better.</em>
            </h2>
            <p className="text-[15px] leading-[1.75] text-cream/55 max-w-[480px] mx-auto mb-10">
              Sport Ayurveda. Active Ayurveda. And this is only where we begin.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/shop">
                <Button variant="primary">Shop the Range</Button>
              </Link>
              <Link href="/founders">
                <Button variant="ghost">Meet Our Founder</Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
