import Image from 'next/image';
import Link from 'next/link';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { Button } from '@/components/ui/Button';

export function FounderSection() {
  return (
    <section className="grain glow-warm-center py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-navy-deep">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">
        <AnimatedSection direction="left">
          <div className="rounded-2xl overflow-hidden border border-white/5 shadow-[0_32px_80px_rgba(0,0,0,0.4)] relative group md:hover:scale-[1.02] transition-transform duration-300">
            <div className="absolute font-serif text-[110px] leading-none text-teal/12 top-[-20px] left-2.5 z-10 pointer-events-none">"</div>
            <Image
              src="/images/founder-meena.jpg"
              alt="Dr. Meena Ramaiah — Founder, Thavare"
              width={480}
              height={580}
              className="w-full h-[340px] md:h-[480px] object-cover object-[center_15%] block"
            />
            <div className="px-7 py-6" style={{ background: 'linear-gradient(to top, #111C35, rgba(17,28,53,0.85))' }}>
              <div className="font-serif text-[18px] font-medium text-cream">Dr. Meena Ramaiah</div>
              <div className="text-[10px] font-medium tracking-[2.5px] uppercase text-camel mt-0.5">Founder &amp; Formulator, Thavare</div>
            </div>
          </div>
        </AnimatedSection>
        <AnimatedSection direction="right">
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">The Founder's Story</div>
          <h2 className="font-serif text-[clamp(26px,4vw,36px)] font-medium leading-[1.15] text-cream mb-5 md:mb-6">
            The Lotus Blooms<br /><em className="italic text-terracotta">Through the Mud.</em>
          </h2>
          <div className="relative">
            <span className="absolute -top-6 -left-2 font-serif text-[72px] leading-none text-camel/20 select-none pointer-events-none" aria-hidden="true">&ldquo;</span>
          </div>
          <blockquote className="font-serif text-[17px] italic leading-[1.65] text-beige border-l-2 border-teal pl-6 mb-6">
            "My own skin reaction taught me the hardest lesson — even natural is not always safe. Science and nature must work together, carefully and honestly."
          </blockquote>
          <p className="text-[14px] leading-[1.75] text-cream/55 mb-3">
            My journey began in my mother's kitchen — trusted recipes, natural remedies, skincare passed down through generations. Then my skin betrayed me. A herbal product I trusted caused a severe reaction. What followed wasn't just a skin problem — it quietly became a mental one.
          </p>
          <p className="text-[14px] leading-[1.75] text-cream/55 mb-3">
            A gym injury left me unable to walk. Lying there, I genuinely thought my life was over. But that stillness became my teacher. As a doctor I understood science — but my journey led me to Ayurveda, and what I found was not a contradiction but a conversation. The two don&apos;t compete. They complete each other.
          </p>
          <p className="font-serif italic text-[14px] text-camel mb-8">Thavare means lotus. It blooms not in spite of the mud — but because of it.</p>
          <Link href="/founders"><Button variant="outline-cream">Read the Full Story →</Button></Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
