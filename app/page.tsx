import type { Metadata } from 'next';
import { Hero }            from '@/components/home/Hero';
import { MarqueeStrip }    from '@/components/ui/MarqueeStrip';
import { CategoryGrid }    from '@/components/home/CategoryGrid';
import { Bestsellers }     from '@/components/home/Bestsellers';
import { ValuesSection }   from '@/components/home/ValuesSection';
import { IngredientStrip } from '@/components/home/IngredientStrip';
import { FounderSection }  from '@/components/home/FounderSection';
import { CircleSection }   from '@/components/home/CircleSection';
import { NewArrivals }     from '@/components/home/NewArrivals';
import { WhySection }      from '@/components/home/WhySection';
import { Newsletter }      from '@/components/home/Newsletter';

export const metadata: Metadata = {
  title: 'Thavare — Clinically Crafted Ayurveda',
  description: 'Sport and active Ayurvedic skincare for every body that moves. Clinically formulated by Dr. Meena Ramaiah using ancient Ayurvedic actives.',
  openGraph: {
    title: 'Thavare — Clinically Crafted Ayurveda',
    description: 'Sport and active Ayurvedic skincare for every body that moves.',
    images: [{ url: '/images/hero-model.png', width: 520, height: 720, alt: 'Thavare active skincare' }],
  },
};

const MARQUEE_ITEMS = [
  { label: '🚚 Free Delivery ₹499+' },
  { label: '🌿 100% Ayurvedic Actives' },
  { label: '🔬 Clinically Tested' },
  { label: '♻️ Sustainable Packaging' },
  { label: '👩‍⚕️ Doctor Formulated' },
];

const PATTERN_ITEMS = [
  { label: '◈  ⊙  ❋  ◉' },
  { label: '◈  ⊙  ❋  ◉' },
  { label: '◈  ⊙  ❋  ◉' },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <MarqueeStrip items={MARQUEE_ITEMS} className="bg-teal py-3" />
      <CategoryGrid />
      <Bestsellers />
      <ValuesSection />
      <IngredientStrip />
      <MarqueeStrip items={PATTERN_ITEMS} className="bg-teal py-3" />
      <FounderSection />
      <CircleSection />
      <NewArrivals />
      <WhySection />
      <Newsletter />
    </>
  );
}
