import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Stethoscope, UsersThree, ArrowsClockwise, ShieldCheck, Trophy, Person, HeartBreak } from '@/components/ui/Icons';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Thavare Circle — Real Answers for Every Body',
  description:
    'The Thavare Circle is a community where every body gets real answers from verified doctors, Ayurvedic practitioners, and wellness specialists. No sponsored content. No generic advice.',
  openGraph: {
    title: 'The Thavare Circle — Real Answers from Real Experts',
    description: 'A community where every body gets honest answers from verified medical and wellness experts.',
    images: [{ url: '/images/editorial-sunscreen-moody.jpg', width: 1200, height: 630, alt: 'The Thavare Circle' }],
  },
};

const BENEFITS = [
  {
    icon: <Stethoscope size={22} weight="light" />,
    title: 'Expert Answers',
    desc: 'Real questions answered by verified medical and wellness experts — honestly and personally.',
  },
  {
    icon: <UsersThree size={22} weight="light" />,
    title: 'A Real Community',
    desc: 'A community of people who move, struggle, heal and grow together — because none of us should carry it alone.',
  },
  {
    icon: <ArrowsClockwise size={22} weight="light" />,
    title: 'Rotating Specialists',
    desc: 'Dermatologists, sports medicine doctors, Ayurvedic practitioners and more — rotating every week so the guidance never stops.',
  },
  {
    icon: <ShieldCheck size={22} weight="light" />,
    title: 'Trusted Space',
    desc: 'Free from noise, sponsored content and generic advice. Just honest guidance from people who care.',
  },
];

const AUDIENCE = [
  {
    icon: <Trophy size={20} weight="light" />,
    label: 'The Athlete',
    desc: 'You push hard. You want to recover smarter — not guess your way through it.',
  },
  {
    icon: <Person size={20} weight="light" />,
    label: 'The Active Person',
    desc: 'You move, you show up, and you want to understand what your body is telling you.',
  },
  {
    icon: <HeartBreak size={20} weight="light" />,
    label: 'The One Let Down',
    desc: 'By your skin, your body, or advice that simply did not work. You deserve answers that actually fit.',
  },
];

export default function CirclePage() {
  return (
    <>
      {/* ─── 1. HERO ─── */}
      <section
        className="min-h-[65vh] bg-navy-deep flex flex-col justify-center px-4 md:px-10 lg:px-20 py-14 md:py-24 relative overflow-hidden"
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
            <div className="w-7 h-px bg-terracotta" />
            <span className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta">
              The Thavare Circle
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-entry font-serif text-[clamp(38px,4.5vw,64px)] font-medium leading-[1.08] text-cream mb-6 max-w-[760px]"
            style={{ animationDelay: '0.45s' }}
          >
            Where Every Body Gets<br />
            <em className="italic text-terracotta">Real Answers.</em>
          </h1>

          {/* Sub copy */}
          <p
            className="hero-entry text-[15px] leading-[1.75] font-light text-cream/65 max-w-[560px] mb-8"
            style={{ animationDelay: '0.6s' }}
          >
            Your body asks questions every day. After a hard session, when your skin flares up,
            when an old injury quietly returns — the internet gives you a thousand answers and
            none of them feel right. The Thavare Circle is different.
          </p>

          {/* Lotus closing line */}
          <p
            className="hero-entry font-serif text-[clamp(16px,1.6vw,20px)] italic leading-[1.6] text-beige max-w-[480px] mb-10"
            style={{ animationDelay: '0.72s' }}
          >
            The lotus does not bloom alone. Neither should you.
          </p>

          {/* CTA */}
          <div
            className="hero-entry"
            style={{ animationDelay: '0.88s' }}
          >
            <a
              href="#join"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg
                         text-xs font-semibold tracking-widest uppercase transition-all duration-200
                         bg-terracotta text-cream hover:opacity-90"
            >
              Join the Waitlist
            </a>
          </div>
        </div>

        {/* Bottom line accent */}
        <div
          className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-terracotta to-transparent"
          style={{ animation: 'line-grow 1.2s 0.9s var(--ease-out) forwards' }}
        />
      </section>

      {/* ─── 2. WHAT YOU GET ─── */}
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
              'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(166,69,44,0.05), transparent)',
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10">
          {/* Section header */}
          <AnimatedSection className="text-center mb-14">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-3">
              What&apos;s Inside
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-cream mb-5">
              Real Experts. Honest Answers.<br />
              <em className="italic text-terracotta">No Noise.</em>
            </h2>
            <p className="text-[14px] leading-[1.75] text-cream/55 max-w-[520px] mx-auto">
              This is not a loyalty programme. It is not a discount club. It is a space where
              what you carry alone — the confusion, the frustration, the quiet suffering of
              not knowing — finally has somewhere to go.
            </p>
          </AnimatedSection>

          {/* 2×2 benefit cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {BENEFITS.map((b, i) => (
              <AnimatedSection
                key={b.title}
                direction="up"
                delay={(i % 4) as 0 | 1 | 2 | 3}
              >
                <div
                  className="rounded-xl p-8 border border-white/8 group hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
                  style={{ background: 'rgba(255,255,255,0.03)' }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[22px] mb-5 group-hover:scale-110 transition-transform duration-300 flex-shrink-0"
                    style={{
                      background: 'rgba(166,69,44,0.1)',
                      border: '1px solid rgba(166,69,44,0.2)',
                    }}
                  >
                    {b.icon}
                  </div>
                  {/* Title */}
                  <div className="font-serif text-[19px] font-medium text-cream mb-3 leading-tight">
                    {b.title}
                  </div>
                  {/* Desc */}
                  <p className="text-[14px] leading-[1.75] text-cream/55">{b.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. WHO IT'S FOR ─── */}
      <section className="py-14 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
        <div className="max-w-[1200px] mx-auto">
          {/* Section header */}
          <AnimatedSection className="text-center mb-14">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-3">
              Who It Is For
            </div>
            <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy mb-5">
              Built for Every Body<br />
              <em className="italic text-terracotta">That Has Felt Let Down.</em>
            </h2>
          </AnimatedSection>

          {/* Three audience cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-12">
            {AUDIENCE.map((a, i) => (
              <AnimatedSection
                key={a.label}
                direction="up"
                delay={(i + 1) as 1 | 2 | 3}
              >
                <div
                  className="rounded-xl p-8 border group hover:-translate-y-0.5 transition-all duration-300"
                  style={{
                    borderColor: 'var(--border-m)',
                    background: 'rgba(255,255,255,0.6)',
                    boxShadow: 'var(--shadow)',
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[22px] mb-5 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      background: 'rgba(166,69,44,0.07)',
                      border: '1px solid rgba(166,69,44,0.15)',
                    }}
                  >
                    {a.icon}
                  </div>
                  {/* Label */}
                  <div className="font-serif text-[18px] font-medium text-navy mb-3 leading-tight">
                    {a.label}
                  </div>
                  {/* Body */}
                  <p className="text-[13px] leading-[1.7] text-text-2">{a.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          {/* Closing line */}
          <AnimatedSection delay={4} className="text-center">
            <p className="text-[14px] leading-[1.75] text-text-2 italic">
              You don&apos;t need a title to belong here. You need only the belief that your body deserves better.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ─── 4. JOIN THE CIRCLE ─── */}
      <section
        id="join"
        className="py-16 md:py-28 px-4 md:px-10 lg:px-20 relative overflow-hidden"
        style={{ background: 'var(--terracotta)' }}
      >
        {/* Subtle dot texture */}
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
            background: 'radial-gradient(circle, rgba(166,69,44,0.25), transparent 70%)',
            filter: 'blur(60px)',
          }}
        />

        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <AnimatedSection direction="up">
            {/* Lotus symbol — concentric circles */}
            <div className="relative flex items-center justify-center h-[120px] mb-10 mx-auto w-[120px]">
              <div
                className="absolute w-[112px] h-[112px] rounded-full border"
                style={{ borderColor: 'rgba(234,228,211,0.12)' }}
              />
              <div
                className="absolute w-[80px] h-[80px] rounded-full border"
                style={{ borderColor: 'rgba(234,228,211,0.22)' }}
              />
              <div
                className="absolute w-[50px] h-[50px] rounded-full border"
                style={{ borderColor: 'rgba(234,228,211,0.38)' }}
              />
              <div
                className="absolute w-[24px] h-[24px] rounded-full"
                style={{
                  background: 'rgba(234,228,211,0.18)',
                  border: '1px solid rgba(234,228,211,0.55)',
                }}
              />
            </div>

            {/* Eyebrow */}
            <div
              className="text-[10px] font-medium tracking-[4px] uppercase mb-6"
              style={{ color: 'rgba(234,228,211,0.45)' }}
            >
              Join the Circle
            </div>

            {/* Heading */}
            <h2
              className="font-serif text-[clamp(32px,4vw,56px)] font-medium leading-[1.1] mb-6 max-w-[680px] mx-auto"
              style={{ color: 'rgba(234,228,211,0.95)' }}
            >
              Come Into<br />
              <em className="italic" style={{ color: 'rgba(234,228,211,0.75)' }}>
                the Circle.
              </em>
            </h2>

            {/* Body */}
            <p
              className="text-[15px] leading-[1.8] max-w-[520px] mx-auto mb-12"
              style={{ color: 'rgba(234,228,211,0.6)' }}
            >
              A space that asks nothing of you except that you show up.
            </p>

            {/* Email waitlist form */}
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-5 py-3 rounded-l-lg text-[14px] text-navy placeholder:text-navy/40 bg-white focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-r-lg text-xs font-semibold tracking-widest uppercase bg-white text-terracotta-dark hover:bg-cream transition-colors whitespace-nowrap"
                style={{ color: 'var(--terracotta)' }}
              >
                Join Waitlist
              </button>
            </div>

            {/* Privacy note */}
            <p
              className="text-[11px] tracking-[0.5px] mt-4"
              style={{ color: 'rgba(234,228,211,0.32)' }}
            >
              No spam. No sponsored content. Just the Circle.
            </p>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
