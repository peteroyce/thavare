import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

const FEATS = [
  { icon: '👩‍⚕️', title: 'Verified Medical Experts',       desc: 'Dermatologists, sports medicine doctors, and Ayurvedic practitioners — answering personally.' },
  { icon: '🔄', title: 'Rotating Specialists Every Week', desc: 'New experts cycle in regularly — so the guidance never stops.' },
  { icon: '🛡️', title: 'Zero Noise. Zero Sponsorship.',   desc: 'A trusted space free from the content that clutters every other wellness community.' },
];

const EXPERTS = [
  { name: 'Dr. Priya Sharma', role: 'Sports Dermatologist · Mumbai',   tag: 'Answering Now' },
  { name: 'Dr. Arjun Nair',   role: 'Ayurvedic Practitioner · Kerala', tag: 'Live This Week' },
  { name: 'Dr. Kavitha Rao',  role: 'Sports Medicine · Bengaluru',     tag: 'Join Queue' },
];

export function CircleSection() {
  return (
    <section className="grain py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-teal">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-20 items-center">
        <AnimatedSection direction="left">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-white/50 mb-3">Community</div>
          <h2 className="font-serif text-[clamp(28px,3vw,38px)] font-medium leading-[1.15] text-white mb-4">
            Join the<br /><em className="italic text-cream">Thavare Circle</em>
          </h2>
          <p className="text-[15px] leading-[1.7] text-white/75 font-light mb-8">
            Real answers from real experts. Not generic advice. Not sponsored content. A space where the confusion of not knowing finally has somewhere to go.
          </p>
          <div className="flex flex-col gap-4 mb-9">
            {FEATS.map(f => (
              <div key={f.title} className="flex items-start gap-3.5 group">
                <div className="w-[34px] h-[34px] rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-[15px] flex-shrink-0 group-hover:bg-white/25 transition-all">
                  {f.icon}
                </div>
                <div className="text-[13px] leading-[1.55] text-white/80">
                  <strong className="block text-[14px] text-white mb-0.5">{f.title}</strong>
                  {f.desc}
                </div>
              </div>
            ))}
          </div>
          <Link href="/circle"><Button variant="white">Come into the Circle</Button></Link>
        </AnimatedSection>
        <AnimatedSection direction="right">
          <div className="bg-white/10 rounded-2xl p-7 border border-white/15">
            <div className="text-[9px] font-semibold tracking-[3px] uppercase text-white/40 text-center mb-4">This Week's Experts</div>
            <div className="flex flex-col gap-3">
              {EXPERTS.map(e => (
                <div key={e.name} className="bg-white/10 rounded-xl px-4 py-3.5 flex items-center gap-3.5 border border-white/10 hover:bg-white/18 transition-all cursor-none">
                  <div className="w-[42px] h-[42px] rounded-full bg-white/20 flex items-center justify-center text-lg flex-shrink-0">👩‍⚕️</div>
                  <div>
                    <div className="text-[13px] text-white font-semibold">{e.name}</div>
                    <div className="text-[11px] text-white/50 mt-0.5">{e.role}</div>
                    <span className="inline-block mt-1 text-[9px] font-semibold tracking-[1.5px] uppercase text-white/85 bg-white/15 px-2 py-0.5 rounded-full">{e.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
