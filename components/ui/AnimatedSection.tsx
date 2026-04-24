'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Direction = 'up' | 'left' | 'right' | 'scale';
type Props = {
  children: ReactNode;
  direction?: Direction;
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
};

const dirClass: Record<Direction, string> = {
  up:    'reveal',
  left:  'reveal-left',
  right: 'reveal-right',
  scale: 'reveal-scale',
};

const delayClass = ['', 'stagger-1', 'stagger-2', 'stagger-3', 'stagger-4'];

export function AnimatedSection({ children, direction = 'up', delay = 0, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          obs.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px 50% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(dirClass[direction], delay > 0 ? delayClass[delay] : '', className)}
    >
      {children}
    </div>
  );
}
