import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Bag',
  description: 'Review your Thavare bag and proceed to checkout.',
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
