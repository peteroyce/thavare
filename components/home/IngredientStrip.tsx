import Image from 'next/image';
import { AnimatedSection } from '@/components/ui/AnimatedSection';

const PANELS = [
  { label: 'Sun Care',        name: 'Sun Screen\nSPF 30',    desc: 'Blue Lotus + Butter Tree. Mineral-rich Ayurvedic protection for the body in motion.', img: '/images/editorial-sunscreen-moody.jpg' },
  { label: 'Cleanse + Prime', name: 'Body Wash\n200ml',      desc: 'Blue Lotus + Wild Himalayan Cherry. Cleanses, primes, and fortifies skin before you move.', img: '/images/editorial-bodywash-seeds.jpg' },
  { label: 'Teal Ayurveda',   name: 'Kumkumadi\nTaila',     desc: 'Cold-pressed oil. Processed with milk. Ancient recovery ritual for luminous skin.', img: '/images/editorial-kumkumadi-hand.jpg' },
];

export function IngredientStrip() {
  return (
    <div className="overflow-hidden bg-navy-deep">
      <div className="grid grid-cols-1 md:grid-cols-3">
        {PANELS.map((panel, i) => (
          <AnimatedSection key={panel.label} direction="scale" delay={(i + 1) as 1|2|3} className="relative h-[280px] md:h-[460px] overflow-hidden group cursor-none">
            <Image
              src={panel.img}
              alt={panel.name.replace('\n', ' ')}
              fill
              className="object-cover group-hover:scale-[1.07] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111C35]/90 to-[#111C35]/10 flex flex-col justify-end p-9 px-8">
              <div className="text-[9px] font-semibold tracking-[3px] uppercase text-teal mb-2">{panel.label}</div>
              <div className="font-serif text-2xl font-medium text-cream leading-[1.2] mb-2" style={{ whiteSpace: 'pre-line' }}>{panel.name}</div>
              <div className="text-[13px] leading-[1.6] text-cream/62 max-w-[230px]">{panel.desc}</div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
