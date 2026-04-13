import type { Metadata } from 'next';
import QuizClient from './QuizClient';

export const metadata: Metadata = {
  title: 'Find Your Skincare Routine — Thavare',
  description:
    '5 questions. Personalised Ayurvedic skincare for how you move. Discover the Thavare products built for your skin and lifestyle.',
  openGraph: {
    title: 'Find Your Skincare Routine — Thavare',
    description: '5 questions. Personalised Ayurvedic skincare for how you move.',
  },
};

export default function QuizPage() {
  return <QuizClient />;
}
