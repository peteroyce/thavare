'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        if (contentRef.current) contentRef.current.style.transform = `translateY(${y * 0.12}px)`;
        if (visualRef.current)  visualRef.current.style.transform  = `translateY(${y * 0.07}px)`;
      }
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section
      className="min-h-[92vh] bg-navy-deep grid grid-cols-1 md:grid-cols-2 items-center px-4 md:px-10 lg:px-20 gap-8 md:gap-16 py-12 md:py-0 relative overflow-hidden"
      style={{ backgroundImage: 'radial-gradient(circle, rgba(0,132,147,0.04) 1px, transparent 1px)', backgroundSize: '32px 32px' }}
    >
      {/* Gradient orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full -left-24 -top-24 pointer-events-none orb-fade" style={{ background: 'radial-gradient(circle, rgba(26,39,68,0.9), transparent)', filter: 'blur(80px)', animationDelay: '0.1s' }} />
      <div className="absolute w-[500px] h-[500px] rounded-full -right-20 -bottom-20 pointer-events-none orb-fade" style={{ background: 'radial-gradient(circle, rgba(44,26,14,0.7), transparent)', filter: 'blur(80px)', animationDelay: '0.3s' }} />

      {/* Content */}
      <div ref={contentRef} className="relative z-10 order-1 md:order-none">
        <div className="hero-entry inline-flex items-center gap-2.5 mb-5" style={{ animationDelay: '0.3s' }}>
          <div className="w-7 h-px bg-teal" />
          <span className="text-[10px] font-medium tracking-[4px] uppercase text-teal">5000 Years of Wisdom</span>
        </div>
        <h1 className="hero-entry font-serif text-[clamp(42px,4.5vw,62px)] font-medium leading-[1.08] text-cream mb-4" style={{ animationDelay: '0.45s' }}>
          Built for Every Body<br />
          <em className="text-terracotta not-italic block" style={{ fontStyle: 'italic' }}>That Moves.</em>
        </h1>
        <p className="hero-entry text-base leading-[1.7] font-light text-cream/65 max-w-[400px] mb-9" style={{ animationDelay: '0.6s' }}>
          Ayurvedic actives, clinically crafted for sport and active life. Before you train. During. After. Everything your body deserves.
        </p>
        <div className="hero-entry flex gap-3" style={{ animationDelay: '0.75s' }}>
          <Link href="/shop"><Button variant="primary">Shop the Range</Button></Link>
          <Link href="/about"><Button variant="ghost">Our Story</Button></Link>
        </div>
        <div className="hero-entry flex flex-wrap gap-6 md:gap-10 mt-12 pt-7 border-t border-white/10" style={{ animationDelay: '0.9s' }}>
          {[['5000+','Years of Ayurveda'],['100%','Natural Actives'],['Dr.','Clinically Formulated']].map(([n,l]) => (
            <div key={l}>
              <div className="font-serif text-[30px] font-medium text-camel leading-none">{n}</div>
              <div className="text-[10px] tracking-[1.5px] uppercase text-cream/35 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Model image */}
      <div ref={visualRef} className="relative z-10 order-2 md:order-none hidden md:flex justify-center items-end hero-entry" style={{ animationDelay: '0.5s' }}>
        <Image
          src="/images/hero-model.png"
          alt="Thavare — active Ayurveda"
          width={520}
          height={720}
          className="max-h-[82vh] w-auto object-contain"
          style={{ filter: 'drop-shadow(0 28px 72px rgba(0,0,0,0.7))' }}
          priority
        />
      </div>

      {/* Bottom teal line */}
      <div className="absolute left-1/2 bottom-0 w-px h-0 bg-gradient-to-t from-teal to-transparent" style={{ animation: 'line-grow 1.2s 0.8s var(--ease-out) forwards' }} />
    </section>
  );
}
