import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse the full Thavare range — Pre-Sport, Recovery, Sun Care, Daily Essentials, and Teal Ayurveda products.',
  openGraph: {
    title: 'Shop Thavare — Clinically Crafted Ayurveda',
    description: 'Browse the full Thavare range — Ayurvedic skincare for sport and active life.',
    images: [{ url: '/images/editorial-bodywash-seeds.jpg', width: 1200, height: 630, alt: 'Thavare shop' }],
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
