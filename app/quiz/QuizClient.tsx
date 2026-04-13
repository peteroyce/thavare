'use client';

import { useState } from 'react';
import Link from 'next/link';

// ─── Types ─────────────────────────────────────────────────────────────────

type Question = {
  id: number;
  text: string;
  options: string[];
};

type ProductHandle =
  | 'thavare-body-wash'
  | 'thavare-body-lotion'
  | 'thavare-sun-screen'
  | 'thavare-adolescent-sun-block';

type ProductInfo = {
  handle: ProductHandle;
  name: string;
  tagline: string;
  reason: (answers: string[]) => string;
};

// ─── Data ──────────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: 'How active are you?',
    options: ['Everyday Mover', 'Weekend Warrior', 'Serious Athlete', "I'm just starting"],
  },
  {
    id: 2,
    text: "What's your primary skin concern?",
    options: [
      'Dryness & Dehydration',
      'Sun Damage & Pigmentation',
      'Sweat Breakouts & Acne',
      'Dullness & Uneven Tone',
    ],
  },
  {
    id: 3,
    text: 'When do you usually exercise?',
    options: ['Early Morning', 'During the Day', 'Evening', 'Varies'],
  },
  {
    id: 4,
    text: 'How would you describe your skin type?',
    options: ['Dry', 'Oily', 'Combination', 'Sensitive'],
  },
  {
    id: 5,
    text: "What's your skincare priority right now?",
    options: [
      'Build a Simple Routine',
      'Target a Specific Issue',
      'Find My Hero Product',
      'Explore Ayurveda',
    ],
  },
];

const PRODUCTS: Record<ProductHandle, ProductInfo> = {
  'thavare-body-lotion': {
    handle: 'thavare-body-lotion',
    name: 'Body Lotion',
    tagline: 'Deep Ayurvedic Hydration',
    reason: (answers) => {
      if (answers[3] === 'Dry' || answers[1] === 'Dryness & Dehydration') {
        return 'Your dry skin profile needs deep, sustained moisture. Our Ayurvedic body lotion restores the skin barrier with Ashwagandha and Shea.';
      }
      if (answers[0] === 'Serious Athlete') {
        return 'High-output movement strips moisture fast. This lotion replenishes and repairs after every session.';
      }
      return 'A foundational step for any active skincare routine — locks in hydration and soothes post-movement skin.';
    },
  },
  'thavare-body-wash': {
    handle: 'thavare-body-wash',
    name: 'Body Wash',
    tagline: 'Clarifying Neem & Turmeric Cleanse',
    reason: (answers) => {
      if (answers[1] === 'Sweat Breakouts & Acne') {
        return 'Sweat-triggered breakouts need an active cleanse. Our Neem and Turmeric formula clears pores without stripping skin.';
      }
      if (answers[0] === 'Serious Athlete') {
        return 'Post-workout skin needs a cleanse that handles heavy sweat. This wash removes buildup while keeping your skin balanced.';
      }
      return 'A gentle but effective daily cleanse formulated for active bodies — keeps skin clear and fresh.';
    },
  },
  'thavare-sun-screen': {
    handle: 'thavare-sun-screen',
    name: 'Sunscreen',
    tagline: 'Broad Spectrum Active Protection',
    reason: (answers) => {
      if (answers[1] === 'Sun Damage & Pigmentation') {
        return 'Sun damage is cumulative. Our broad-spectrum sunscreen with Kumkumadi actives protects and gradually corrects pigmentation.';
      }
      if (answers[2] === 'During the Day' || answers[2] === 'Early Morning') {
        return 'Daytime training means direct UV exposure. This lightweight, sweat-resistant formula keeps you protected while you move.';
      }
      return 'Daily UV protection is non-negotiable for active skin. Lightweight, non-greasy, built for movement.';
    },
  },
  'thavare-adolescent-sun-block': {
    handle: 'thavare-adolescent-sun-block',
    name: 'Adolescent Sun Block',
    tagline: 'Gentle Mineral Shield for Sensitive Skin',
    reason: () =>
      'Sensitive skin needs mineral-based protection without chemical irritants. This sun block offers broad-spectrum coverage that is gentle enough for reactive skin.',
  },
};

// ─── Recommendation Logic ──────────────────────────────────────────────────

function getRecommendations(answers: string[]): ProductHandle[] {
  const [activity, concern, , skinType] = answers;
  const result = new Set<ProductHandle>();

  // Rule: Sun Damage concern → always sunscreen
  if (concern === 'Sun Damage & Pigmentation') {
    result.add('thavare-sun-screen');
  }

  // Rule: Sweat Breakouts concern → always body wash
  if (concern === 'Sweat Breakouts & Acne') {
    result.add('thavare-body-wash');
  }

  // Rule: Dry skin OR Dryness concern → always lotion
  if (skinType === 'Dry' || concern === 'Dryness & Dehydration') {
    result.add('thavare-body-lotion');
  }

  // Rule: Serious Athlete → all three core products
  if (activity === 'Serious Athlete') {
    result.add('thavare-body-wash');
    result.add('thavare-body-lotion');
    result.add('thavare-sun-screen');
  }

  // Rule: Sensitive skin + Sun Damage → adolescent sun block (replaces sunscreen)
  if (skinType === 'Sensitive' && concern === 'Sun Damage & Pigmentation') {
    result.delete('thavare-sun-screen');
    result.add('thavare-adolescent-sun-block');
  }

  // Default catch-all: ensure at least 2 products
  if (result.size === 0) {
    result.add('thavare-body-lotion');
    result.add('thavare-body-wash');
  }

  // Guarantee minimum of 2 products
  if (result.size === 1) {
    if (!result.has('thavare-body-lotion')) {
      result.add('thavare-body-lotion');
    } else {
      result.add('thavare-body-wash');
    }
  }

  return Array.from(result).slice(0, 3) as ProductHandle[];
}

// ─── Sub-components ────────────────────────────────────────────────────────

function ProgressBar({ step }: { step: number }) {
  const pct = Math.round((step / 5) * 100);
  return (
    <div className="w-full h-1 bg-[#D4C8B8] rounded-full overflow-hidden">
      <div
        className="h-full bg-teal rounded-full transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'px-6 py-4 rounded-xl border text-[14px] font-medium text-navy transition-all duration-200 cursor-none text-left',
        selected
          ? 'border-teal bg-teal/5 shadow-[0_0_0_1px_var(--teal)]'
          : 'border-[#D4C8B8] bg-white hover:border-teal hover:bg-teal/5',
      ].join(' ')}
    >
      {label}
    </button>
  );
}

function ProductCard({
  handle,
  answers,
}: {
  handle: ProductHandle;
  answers: string[];
}) {
  const product = PRODUCTS[handle];
  const reason = product.reason(answers);

  return (
    <div
      className="flex flex-col rounded-2xl border bg-white overflow-hidden shadow-[rgba(26,22,16,0.06)_0_4px_24px] hover:-translate-y-0.5 transition-all duration-300"
      style={{ borderColor: 'var(--border-m)' }}
    >
      {/* Image area placeholder */}
      <div
        className="w-full aspect-[4/3] flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, rgba(168,122,83,0.08), rgba(0,132,147,0.06))',
          borderBottom: '1px solid var(--border-l)',
        }}
      >
        <span
          className="font-serif text-[72px] font-medium leading-none select-none"
          style={{ color: 'var(--terracotta)', opacity: 0.55 }}
        >
          T
        </span>
      </div>

      {/* Card content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="text-[10px] font-medium tracking-[3px] uppercase text-teal mb-1.5">
          Thavare
        </div>
        <h3 className="font-serif text-[20px] font-medium text-navy mb-0.5 leading-tight">
          {product.name}
        </h3>
        <p className="text-[12px] text-text-3 uppercase tracking-widest mb-3">
          {product.tagline}
        </p>
        <p className="text-[13px] leading-[1.65] text-text-2 mb-5 flex-1">{reason}</p>
        <Link
          href={`/products/${handle}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 cursor-none bg-terracotta text-ivory hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(179,95,66,0.35)] w-full"
        >
          Shop Now →
        </Link>
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function QuizClient() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const currentQ = step >= 1 && step <= 5 ? QUESTIONS[step - 1] : null;
  const isLastQuestion = step === 5;

  function handleSelect(option: string) {
    setSelected(option);
  }

  function handleNext() {
    if (!selected) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    if (step < 5) {
      setStep(step + 1);
    } else {
      setStep(6);
    }
  }

  function handleRetake() {
    setStep(0);
    setAnswers([]);
    setSelected(null);
  }

  const recommendations = step === 6 ? getRecommendations(answers) : [];

  // ── Intro ──────────────────────────────────────────────────────────────
  if (step === 0) {
    return (
      <section
        className="min-h-[92vh] bg-navy flex flex-col items-center justify-center px-4 md:px-10 py-20 relative overflow-hidden"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,132,147,0.04) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      >
        {/* Ambient orbs */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full -left-24 -top-24 pointer-events-none orb-fade"
          style={{
            background: 'radial-gradient(circle, rgba(26,39,68,0.9), transparent)',
            filter: 'blur(90px)',
            animationDelay: '0.1s',
          }}
        />
        <div
          className="absolute w-[480px] h-[480px] rounded-full -right-16 -bottom-16 pointer-events-none orb-fade"
          style={{
            background: 'radial-gradient(circle, rgba(44,26,14,0.65), transparent)',
            filter: 'blur(90px)',
            animationDelay: '0.25s',
          }}
        />

        <div className="relative z-10 text-center max-w-[640px] mx-auto">
          {/* Eyebrow */}
          <div
            className="hero-entry inline-flex items-center gap-2.5 mb-6 justify-center"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="w-7 h-px bg-teal" />
            <span className="text-[10px] font-medium tracking-[4px] uppercase text-teal">
              Skincare Routine Finder
            </span>
            <div className="w-7 h-px bg-teal" />
          </div>

          {/* Heading */}
          <h1
            className="hero-entry font-serif text-[clamp(38px,5vw,68px)] font-medium leading-[1.07] text-cream mb-5"
            style={{ animationDelay: '0.35s' }}
          >
            Find Your Perfect{' '}
            <em className="italic text-terracotta">Routine.</em>
          </h1>

          {/* Subtitle */}
          <p
            className="hero-entry text-[15px] leading-[1.75] font-light text-cream/65 max-w-[480px] mx-auto mb-10"
            style={{ animationDelay: '0.5s' }}
          >
            5 questions. Personalised Ayurvedic skincare for how you move.
          </p>

          {/* Step indicators */}
          <div
            className="hero-entry flex items-center justify-center gap-2 mb-10"
            style={{ animationDelay: '0.62s' }}
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'rgba(0,132,147,0.4)' }}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="hero-entry" style={{ animationDelay: '0.75s' }}>
            <button
              onClick={() => setStep(1)}
              className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-lg text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 cursor-none bg-terracotta text-ivory shadow-[0_0_0_1px_var(--terracotta)] hover:-translate-y-px hover:shadow-[0_0_0_1px_var(--terra-h),0_6px_24px_rgba(179,95,66,0.4)] active:translate-y-0"
            >
              Start Quiz →
            </button>
          </div>
        </div>

        {/* Bottom teal line */}
        <div
          className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-teal to-transparent"
          style={{ animation: 'line-grow 1.2s 0.8s var(--ease-out) forwards' }}
        />
      </section>
    );
  }

  // ── Questions ──────────────────────────────────────────────────────────
  if (step >= 1 && step <= 5 && currentQ) {
    return (
      <section className="min-h-[92vh] bg-ivory flex flex-col px-4 md:px-10 lg:px-20 py-12 md:py-16">
        <div className="max-w-[720px] mx-auto w-full flex flex-col flex-1">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-medium tracking-[3px] uppercase text-teal">
                Question {step} of 5
              </span>
              <span className="text-[11px] text-text-3">{Math.round((step / 5) * 100)}%</span>
            </div>
            <ProgressBar step={step} />
          </div>

          {/* Question */}
          <div className="flex-1">
            <h2 className="font-serif text-[clamp(26px,3.5vw,42px)] font-medium leading-[1.15] text-navy mb-10">
              {currentQ.text}
            </h2>

            {/* Options grid — 2×2 on md+, 1 col on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-10">
              {currentQ.options.map((opt) => (
                <OptionButton
                  key={opt}
                  label={opt}
                  selected={selected === opt}
                  onClick={() => handleSelect(opt)}
                />
              ))}
            </div>
          </div>

          {/* Navigation row */}
          <div className="flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => {
                  const prev = answers.slice(0, -1);
                  setAnswers(prev);
                  setSelected(answers[step - 2] ?? null);
                  setStep(step - 1);
                }}
                className="text-[12px] font-medium text-text-3 hover:text-navy transition-colors cursor-none"
              >
                ← Back
              </button>
            ) : (
              <div />
            )}

            <button
              onClick={handleNext}
              disabled={!selected}
              className={[
                'inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 cursor-none',
                selected
                  ? 'bg-terracotta text-ivory shadow-[0_0_0_1px_var(--terracotta)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(179,95,66,0.35)]'
                  : 'bg-[#D4C8B8] text-[#8C7F72] pointer-events-none',
              ].join(' ')}
            >
              {isLastQuestion ? 'See My Routine →' : 'Next →'}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ── Results ────────────────────────────────────────────────────────────
  if (step === 6) {
    return (
      <section className="min-h-[92vh] bg-cream px-4 md:px-10 lg:px-20 py-16 md:py-24">
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2.5 mb-5">
              <div className="w-7 h-px bg-teal" />
              <span className="text-[10px] font-medium tracking-[4px] uppercase text-teal">
                Your Results
              </span>
              <div className="w-7 h-px bg-teal" />
            </div>
            <h1 className="font-serif text-[clamp(28px,3.5vw,48px)] font-medium leading-[1.12] text-navy mb-4">
              Your Personalised{' '}
              <em className="italic text-terracotta">Thavare Routine</em>
            </h1>
            <p className="text-[15px] leading-[1.75] text-text-2 max-w-[520px] mx-auto">
              Based on your answers, we recommend:
            </p>
          </div>

          {/* Product cards */}
          <div
            className={[
              'grid gap-6 md:gap-8 mb-14',
              recommendations.length === 2
                ? 'grid-cols-1 md:grid-cols-2 max-w-[760px] mx-auto'
                : 'grid-cols-1 md:grid-cols-3',
            ].join(' ')}
          >
            {recommendations.map((handle) => (
              <ProductCard key={handle} handle={handle} answers={answers} />
            ))}
          </div>

          {/* Divider */}
          <div className="border-t mb-10" style={{ borderColor: 'rgba(0,0,0,0.08)' }} />

          {/* Answer summary pills */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {answers.map((ans, i) => (
              <span
                key={i}
                className="text-[11px] font-medium px-3 py-1.5 rounded-full"
                style={{
                  background: 'rgba(0,132,147,0.07)',
                  border: '1px solid rgba(0,132,147,0.18)',
                  color: 'var(--teal)',
                }}
              >
                {ans}
              </span>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 justify-center flex-wrap">
            <button
              onClick={handleRetake}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 cursor-none border border-navy/25 text-navy/70 hover:border-navy/45 hover:text-navy bg-transparent"
            >
              Retake Quiz
            </button>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg text-[11px] font-semibold tracking-widest uppercase transition-all duration-200 cursor-none bg-terracotta text-ivory shadow-[0_0_0_1px_var(--terracotta)] hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(179,95,66,0.35)]"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
