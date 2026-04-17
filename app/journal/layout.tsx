import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Stories, rituals, and insights from Thavare — where Ayurveda meets the active body.',
};

export default function JournalLayout({ children }: { children: React.ReactNode }) {
  return children;
}
