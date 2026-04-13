import { AnimatedSection } from '@/components/ui/AnimatedSection';

const PRESS = [
  { name: 'The Hindu',    quote: '"Bridging ancient Ayurveda and modern sport science"' },
  { name: 'Vogue India',  quote: '"The active skincare brand rewriting Ayurvedic rules"' },
  { name: 'Healthshots',  quote: '"Doctor-formulated and clinically tested — it shows"' },
  { name: 'Femina',       quote: '"Sport meets ritual in this Ayurvedic powerhouse"' },
];

export function PressStrip() {
  return (
    <section className="bg-navy-deep py-12 px-4 md:px-10 lg:px-20">
      <AnimatedSection>
        <p className="text-teal text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 text-center">
          In The Press
        </p>
        <h2 className="font-serif text-cream text-[28px] md:text-[36px] font-medium text-center mb-10">
          As Seen In
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRESS.map(({ name, quote }) => (
            <div
              key={name}
              className="bg-white/5 border border-white/10 rounded-xl p-6 flex flex-col gap-2"
            >
              <span className="font-serif text-[18px] text-camel font-medium leading-snug">
                {name}
              </span>
              <p className="text-[13px] italic text-cream/55 mt-2 leading-relaxed">
                {quote}
              </p>
            </div>
          ))}
        </div>
      </AnimatedSection>
    </section>
  );
}
