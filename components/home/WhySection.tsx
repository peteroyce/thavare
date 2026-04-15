import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { BotanicalStrength, BotanicalWalk, BotanicalHerb, BotanicalMicroscope } from '@/components/ui/icons/botanical';

const WHYS = [
  { Icon: BotanicalStrength,   title: 'For Sport',            desc: "For those who train hard, compete, and push limits. Performance isn't just muscle and mind — it's every layer of the body that shows up." },
  { Icon: BotanicalWalk,       title: 'For Active',           desc: 'For everyone else. The one who walks, stretches, cycles, chases children, carries groceries, and moves through life with intention.' },
  { Icon: BotanicalHerb,       title: 'Ancient Intelligence', desc: 'Ayurveda has always had the answers for the body in motion. We are simply bringing it into the conversation it was always meant to have.' },
  { Icon: BotanicalMicroscope, title: 'Modern Precision',     desc: 'Every ingredient selected, extracted, and clinically validated. The best of both worlds — rooted in nature, proven by science.' },
];

export function WhySection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-[#A87A53] mb-2.5">Why Sport. Why Active.</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            This Is <em className="italic text-terracotta">Sport Ayurveda.</em>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-[900px] mx-auto">
          {WHYS.map((w, i) => (
            <AnimatedSection key={w.title} delay={(i + 1) as 1|2|3|4}>
              <div
                className="bg-white border border-[#E5DDD0] rounded-xl p-8 flex gap-4 items-start hover:-translate-y-0.5 transition-all duration-300 cursor-none group"
                style={{ boxShadow: '0px 0px 0px 1px #E5DDD0' }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #C4A882, rgba(26,22,16,0.04) 0px 4px 16px')}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = '0px 0px 0px 1px #E5DDD0')}
              >
                <div className="flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                  <w.Icon />
                </div>
                <div>
                  <div className="font-serif text-[18px] font-medium text-navy mb-1.5">{w.title}</div>
                  <div className="text-[13px] leading-[1.65] text-text-2">{w.desc}</div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
