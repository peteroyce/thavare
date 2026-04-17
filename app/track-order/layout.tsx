import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Order',
  description: 'Track your Thavare order status.',
};

export default function TrackOrderLayout({ children }: { children: React.ReactNode }) {
  return children;
}
