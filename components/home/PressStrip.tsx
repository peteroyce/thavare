'use client';

import { AnimatedSection } from '@/components/ui/AnimatedSection';

const PRESS = [
  { name: 'The Hindu',   quote: '\u201CBridging ancient Ayurveda and modern sport science\u201D' },
  { name: 'Vogue India', quote: '\u201CThe active skincare brand rewriting Ayurvedic rules\u201D' },
  { name: 'Healthshots', quote: '\u201CDoctor-formulated and clinically tested \u2014 it shows\u201D' },
  { name: 'Femina',      quote: '\u201CSport meets ritual in this Ayurvedic powerhouse\u201D' },
];

export function PressStrip() {
  return (
    <section className="bg-ivory py-16 md:py-24 px-4 md:px-10 lg:px-20">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection>
          <p className="text-[10px] font-medium tracking-[4px] uppercase text-[#A87A53] mb-2.5 text-center">
            In The Press
          </p>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy text-center mb-10">
            As Seen In
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRESS.map((item, i) => (
            <AnimatedSection key={item.name} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div
                className="bg-[#FDFBF7] border border-[#E5DDD0] rounded-xl p-6 flex flex-col gap-2 hover:-translate-y-0.5 transition-all duration-300 h-full"
                style={{
                  boxShadow: '0px 0px 0px 1px #E5DDD0',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0';
                }}
              >
                <span className="font-serif text-[18px] text-[#A87A53] font-medium leading-snug">
                  {item.name}
                </span>
                <p className="text-[13px] italic text-text-2 mt-2 leading-relaxed">
                  {item.quote}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
