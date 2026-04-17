import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { BotanicalLeaf, BotanicalFlask, BotanicalWave } from '@/components/ui/icons/botanical';

const VALUES = [
  { Icon: BotanicalLeaf,  title: 'Bio-Active Ayurveda',   desc: 'We take time-tested Ayurvedic ingredients and extract their highest-performing actives using modern biotechnology. No fillers. No compromise.' },
  { Icon: BotanicalFlask, title: 'Clinically Formulated', desc: 'Every Thavare formula is developed by Dr. Meena Ramaiah — dermatologist, Ayurvedic practitioner, athlete. Science and nature, carefully and honestly.' },
  { Icon: BotanicalWave,  title: 'Built for Motion',      desc: 'Active skin faces sweat, sun, friction and wear. Thavare is the only Ayurvedic skincare range specifically engineered for the body in motion.' },
];

export function ValuesSection() {
  return (
    <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-ivory">
      <div className="max-w-[1200px] mx-auto">
        <AnimatedSection className="text-center mb-14">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-[#7A5D3A] mb-2.5">The Thavare Difference</div>
          <h2 className="font-serif text-[clamp(28px,3vw,42px)] font-medium leading-[1.15] text-navy">
            Where the Apothecary<br /><em className="italic text-terracotta">Meets the Laboratory</em>
          </h2>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {VALUES.map((v, i) => (
            <AnimatedSection key={v.title} delay={(i + 1) as 1|2|3} className="text-center group">
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-[#C4A882] bg-[#F9F6F1] group-hover:scale-110 transition-transform duration-300">
                <v.Icon />
              </div>
              <div className="font-serif text-[20px] font-medium text-navy mb-2.5">{v.title}</div>
              <div className="text-[14px] leading-[1.7] text-text-2">{v.desc}</div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
