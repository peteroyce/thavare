import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "The Founder's Story — Thavare | Dr. Meena Ramaiah",
  description:
    'Dr. Meena Ramaiah built Thavare from personal suffering — a skin allergy, a gym injury, and the discovery that science and nature must work together. This is her story.',
};

const CHAPTERS = [
  {
    number: '01',
    label: 'The Beginning',
    side: 'left',
    text: "My journey began in my mother\u2019s kitchen \u2014 natural ingredients, trusted recipes, skin care passed down through generations. That obsession with natural care became mine too.",
  },
  {
    number: '02',
    label: 'The Betrayal',
    side: 'right',
    text: "Then my skin betrayed me. A herbal product I trusted caused a severe skin allergy. The inflammation left behind post inflammatory hyperpigmentation that refused to fade. What followed wasn\u2019t just a skin problem \u2014 it quietly became a mental one. Every mirror. Every photograph. A constant reminder of what I had lost. A slow erosion of confidence that no one around me could see or understand. I felt completely alone in it.",
  },
  {
    number: '03',
    label: 'The Injury',
    side: 'left',
    text: "And what I didn\u2019t realise then is that the mind and body are always in conversation. The stress lived in my body, tightened my muscles, and one day \u2014 it snapped. A gym injury left me unable to walk. Lying there, I genuinely thought my life was over.",
  },
  {
    number: '04',
    label: 'The Realisation',
    side: 'right',
    text: "But that stillness became my teacher. I read everything. Explored healing modalities I\u2019d never slowed down enough to discover. As a doctor I understood science \u2014 but my journey led me to Ayurveda, and what I found was not a contradiction but a conversation. The two don\u2019t compete. They complete each other.",
  },
] as const;

const CREDENTIALS = [
  { title: 'MD / MBBS', sub: 'Medical Practitioner' },
  { title: 'Ayurvedic Practitioner', sub: 'Traditional Wellness' },
  { title: 'Athlete', sub: 'Understanding the Body in Motion' },
  { title: 'Formulator', sub: 'Clinically Crafted Actives' },
] as const;

export default function FoundersPage() {
  return (
    <>
      {/* ─── 1. HERO ─── */}
      <section
        className="min-h-[65vh] bg-navy-deep flex flex-col justify-center px-4 md:px-10 lg:px-20 py-14 md:py-24 relative overflow-hidden"
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
            background: 'radial-gradient(circle, rgba(26,39,68,0.9), transparent)',
            filter: 'blur(80px)',
            animationDelay: '0.1s',
          }}
        />
        <div
          className="absolute w-[480px] h-[480px] rounded-full -right-20 bottom-0 pointer-events-none orb-fade"
          style={{
            background: 'radial-gradient(circle, rgba(44,26,14,0.6), transparent)',
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
            <div className="w-7 h-px bg-teal" />
            <span className="text-[10px] font-medium tracking-[4px] uppercase text-teal">
              The Founder&apos;s Story
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-entry font-serif text-[clamp(38px,4.5vw,64px)] font-medium leading-[1.08] text-cream mb-4 max-w-[780px]"
            style={{ animationDelay: '0.45s' }}
          >
            Why I Started<br />
            <em className="italic text-terracotta">Thavare.</em>
          </h1>

          {/* Sub-headline */}
          <p
            className="hero-entry text-[13px] font-medium tracking-[2.5px] uppercase text-cream/40 mb-10"
            style={{ animationDelay: '0.58s' }}
          >
            Dr. Meena Ramaiah &mdash; Founder &amp; Formulator
          </p>

          {/* Epigraph / opening line */}
          <p
            className="hero-entry font-serif text-[clamp(17px,1.8vw,22px)] italic leading-[1.6] text-beige max-w-[640px]"
            style={{ animationDelay: '0.72s' }}
          >
            &ldquo;My journey began in my mother&apos;s kitchen — natural ingredients,
            trusted recipes, skin care passed down through generations.&rdquo;
          </p>
        </div>

        {/* Vertical teal line accent at bottom */}
        <div
          className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-teal to-transparent"
          style={{ animation: 'line-grow 1.2s 0.9s var(--ease-out) forwards' }}
        />
      </section>

      {/* ─── 2. THE JOURNEY ─── */}
      <section
        className="py-16 md:py-28 px-4 md:px-10 lg:px-20 bg-navy relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,132,147,0.035) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(0,132,147,0.05), transparent)',
          }}
        />

        <div className="max-w-[1100px] mx-auto relative z-10">
          {/* Section header */}
          <AnimatedSection className="text-center mb-20">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
              The Journey
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-cream">
              The Story Behind<br />
              <em className="italic text-terracotta">Every Formula.</em>
            </h2>
          </AnimatedSection>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical center line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
              style={{
                background:
                  'linear-gradient(to bottom, rgba(0,132,147,0.15), rgba(0,132,147,0.7) 30%, rgba(0,132,147,0.7) 70%, rgba(0,132,147,0.15))',
              }}
            />

            <div className="flex flex-col gap-16">
              {CHAPTERS.map((chapter, i) => {
                const isLeft = chapter.side === 'left';
                return (
                  <div key={chapter.number} className="relative flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-0 items-center">
                    {/* Number circle on the line */}
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                                 w-10 h-10 rounded-full flex items-center justify-center
                                 font-sans text-[10px] font-bold tracking-[1px] text-teal"
                      style={{
                        background: 'var(--navy)',
                        border: '1px solid rgba(0,132,147,0.55)',
                        boxShadow: '0 0 0 4px rgba(0,132,147,0.07)',
                      }}
                    >
                      {chapter.number}
                    </div>

                    {/* Left content */}
                    <div className={`pr-14 ${isLeft ? '' : 'opacity-0 pointer-events-none'}`}>
                      {isLeft && (
                        <AnimatedSection direction="left" delay={(i % 4) as 0 | 1 | 2 | 3}>
                          <div className="text-right">
                            <div className="text-[10px] font-medium tracking-[3px] uppercase text-teal mb-2">
                              {chapter.label}
                            </div>
                            <p className="text-[14px] leading-[1.8] text-cream/65">
                              {chapter.text}
                            </p>
                          </div>
                        </AnimatedSection>
                      )}
                    </div>

                    {/* Right content */}
                    <div className={`pl-14 ${!isLeft ? '' : 'opacity-0 pointer-events-none'}`}>
                      {!isLeft && (
                        <AnimatedSection direction="right" delay={(i % 4) as 0 | 1 | 2 | 3}>
                          <div>
                            <div className="text-[10px] font-medium tracking-[3px] uppercase text-teal mb-2">
                              {chapter.label}
                            </div>
                            <p className="text-[14px] leading-[1.8] text-cream/65">
                              {chapter.text}
                            </p>
                          </div>
                        </AnimatedSection>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. THE LESSON — breakout impact quote ─── */}
      <section
        className="py-16 md:py-28 px-4 md:px-10 lg:px-20 relative overflow-hidden"
        style={{ background: 'var(--teal-dark)' }}
      >
        {/* Subtle texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* Ambient orb */}
        <div
          className="absolute w-[700px] h-[700px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(0,132,147,0.25), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <AnimatedSection direction="up">
            <div className="text-[10px] font-medium tracking-[4px] uppercase mb-8"
              style={{ color: 'rgba(234,228,211,0.45)' }}>
              The Lesson
            </div>

            <blockquote
              className="font-serif text-[clamp(20px,2.5vw,32px)] italic leading-[1.6] text-center max-w-[760px] mx-auto mb-8"
              style={{ color: 'rgba(234,228,211,0.92)' }}
            >
              &ldquo;My own skin reaction taught me the hardest lesson — even natural is not always
              safe. Science and nature must work together, carefully and honestly.&rdquo;
            </blockquote>

            <div
              className="text-[12px] font-medium tracking-[2px] uppercase"
              style={{ color: 'rgba(234,228,211,0.5)' }}
            >
              — Dr. Meena Ramaiah
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── 4. THE BIRTH OF THAVARE ─── */}
      <section className="py-16 md:py-28 px-4 md:px-10 lg:px-20 bg-ivory">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
          {/* Left — CSS lotus / decorative wordmark */}
          <AnimatedSection direction="left">
            <div className="relative flex items-center justify-center h-[380px]">
              {/* Concentric rings */}
              <div
                className="absolute w-[320px] h-[320px] rounded-full border"
                style={{ borderColor: 'rgba(168,122,83,0.15)' }}
              />
              <div
                className="absolute w-[240px] h-[240px] rounded-full border"
                style={{ borderColor: 'rgba(168,122,83,0.28)' }}
              />
              <div
                className="absolute w-[160px] h-[160px] rounded-full border"
                style={{ borderColor: 'rgba(168,122,83,0.45)' }}
              />
              <div
                className="absolute w-[88px] h-[88px] rounded-full"
                style={{
                  background:
                    'radial-gradient(circle, rgba(168,122,83,0.2), rgba(179,95,66,0.1))',
                  border: '1px solid rgba(179,95,66,0.4)',
                }}
              />
              {/* T glyph */}
              <span
                className="font-serif text-[80px] font-medium relative z-10"
                style={{ color: 'var(--terracotta)', opacity: 0.8 }}
              >
                T
              </span>
              {/* Floating wordmark label */}
              <div
                className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[9px] font-semibold tracking-[3.5px] uppercase"
                style={{ color: 'var(--camel)', opacity: 0.7 }}
              >
                Thavare
              </div>
            </div>
          </AnimatedSection>

          {/* Right — story copy */}
          <div>
            <AnimatedSection direction="right">
              <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
                The Birth of Thavare
              </div>
              <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy mb-6">
                Born Not in Spite<br />
                <em className="italic text-terracotta">of the Mud.</em>
              </h2>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={1}>
              <p className="text-[14px] leading-[1.8] text-text-2 mb-5">
                That realisation — born in my mother&apos;s kitchen and broken open by my own
                suffering — became Thavare. A skincare range built around movement. Before you
                train, during, and after. Everything I couldn&apos;t find when I needed it most.
              </p>
              <p className="text-[14px] leading-[1.8] text-text-2 mb-5">
                But skin was only where this story began. The body has more to say — and so do I.
              </p>

              {/* Lotus metaphor — pull-quote style */}
              <blockquote
                className="font-serif text-[16px] italic leading-[1.65] border-l-2 pl-5 mb-8"
                style={{
                  color: 'var(--navy)',
                  borderColor: 'var(--terracotta)',
                }}
              >
                Thavare means lotus. It blooms not in spite of the mud — but because of it.
              </blockquote>

              {/* Signature */}
              <div
                className="font-serif text-[13px] italic mb-8"
                style={{ color: 'var(--camel)' }}
              >
                — Dr. Meena Ramaiah
              </div>

              <div className="flex gap-3 flex-wrap">
                <Link href="/shop">
                  <Button variant="primary">Shop the Range</Button>
                </Link>
                <Link href="/circle">
                  <button
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg
                               text-xs font-semibold tracking-widest uppercase transition-all
                               duration-200 cursor-none border bg-transparent"
                    style={{
                      borderColor: 'rgba(26,39,68,0.18)',
                      color: 'rgba(26,39,68,0.65)',
                    }}
                  >
                    Join the Circle
                  </button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ─── 5. CREDENTIALS STRIP ─── */}
      <section
        className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-navy-deep relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,132,147,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Ambient gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,132,147,0.04), transparent)',
          }}
        />

        <div className="max-w-[1100px] mx-auto relative z-10 text-center">
          {/* Header */}
          <AnimatedSection className="mb-14">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
              Behind Every Formula
            </div>
            <h2 className="font-serif text-[clamp(24px,2.5vw,36px)] font-medium leading-[1.2] text-cream mb-5">
              Expertise Built From<br />
              <em className="italic text-terracotta">Lived Experience.</em>
            </h2>
            <p className="text-[14px] leading-[1.75] text-cream/50 max-w-[620px] mx-auto">
              Every Thavare formula carries Dr. Meena&apos;s personal experience, medical
              expertise, and lived understanding of the active body.
            </p>
          </AnimatedSection>

          {/* Credential cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
            {CREDENTIALS.map((c, i) => (
              <AnimatedSection
                key={c.title}
                direction="up"
                delay={(i % 4) as 0 | 1 | 2 | 3}
              >
                <div
                  className="rounded-xl px-6 py-7 border text-center group hover:-translate-y-0.5 transition-all duration-300 cursor-none"
                  style={{
                    borderColor: 'rgba(255,255,255,0.08)',
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  {/* Teal accent dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full mx-auto mb-4"
                    style={{ background: 'var(--teal)', opacity: 0.7 }}
                  />
                  <div className="font-serif text-[16px] font-medium text-cream mb-1.5 leading-tight">
                    {c.title}
                  </div>
                  <div className="text-[11px] tracking-[1.5px] uppercase text-cream/35">
                    {c.sub}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t border-white/8 mb-10" />

          {/* Bottom CTA */}
          <AnimatedSection delay={4}>
            <Link href="/shop">
              <Button variant="ghost">Explore the Range</Button>
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
