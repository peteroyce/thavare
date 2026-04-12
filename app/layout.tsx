import type { Metadata } from 'next';
import { Playfair_Display, Nunito_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thavare.com'),
  title: {
    default: 'Thavare — Clinically Crafted Ayurveda',
    template: '%s | Thavare',
  },
  description: 'Sport and active Ayurvedic skincare. Clinically formulated by Dr. Meena Ramaiah. For every body that moves.',
  keywords: ['Ayurvedic skincare', 'sport skincare', 'active skincare', 'Dr. Meena Ramaiah', 'Thavare', 'natural skincare India'],
  openGraph: {
    type: 'website',
    siteName: 'Thavare',
    title: 'Thavare — Clinically Crafted Ayurveda',
    description: 'Sport and active Ayurvedic skincare. Clinically formulated by Dr. Meena Ramaiah. For every body that moves.',
    images: [{ url: '/images/editorial-sunscreen-moody.jpg', width: 1200, height: 630, alt: 'Thavare — Clinically Crafted Ayurveda' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Thavare — Clinically Crafted Ayurveda',
    description: 'Sport and active Ayurvedic skincare. Clinically formulated by Dr. Meena Ramaiah.',
    images: ['/images/editorial-sunscreen-moody.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Thavare',
    url: 'https://thavare.com',
    logo: 'https://thavare.com/images/hero-model.png',
    description: 'Sport and active Ayurvedic skincare clinically formulated by Dr. Meena Ramaiah.',
    founder: { '@type': 'Person', name: 'Dr. Meena Ramaiah' },
    sameAs: [],
  };

  return (
    <html lang="en" className={`${playfair.variable} ${nunito.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className="font-sans bg-cream text-text-1 antialiased overflow-x-hidden cursor-none">
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
