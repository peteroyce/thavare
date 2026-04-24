// components/ui/icons/botanical/index.tsx

type IconProps = { className?: string };

const STROKE = { stroke: '#A5723C', strokeWidth: '1.2', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, fill: 'none' };

export function BotanicalLeaf({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M2 22c0 0 7-2 10-10S20 2 20 2C10 2 2 10 2 22z" />
      <path d="M12 12L2 22" />
      <path d="M7 17c2-2 4-3 5-3" />
      <path d="M5 13c2-3 6-4 7-4" />
    </svg>
  );
}

export function BotanicalFlask({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M9 3h6" />
      <path d="M10 3v5l-4 8a2 2 0 0 0 1.8 3h8.4a2 2 0 0 0 1.8-3l-4-8V3" />
      <path d="M8 17c1-1 2-1.5 4-1.5s3 .5 4 1.5" />
      <circle cx="14" cy="14" r="0.5" fill="#A5723C" />
    </svg>
  );
}

export function BotanicalWave({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M2 12c1.5-3 3-4.5 4.5-4.5S9 9 10.5 9s3-1.5 4.5-1.5S18 9 19.5 9 21 7.5 22 6" />
      <path d="M2 17c1.5-3 3-4.5 4.5-4.5S9 14 10.5 14s3-1.5 4.5-1.5S18 14 19.5 14 21 12.5 22 11" />
      <path d="M6 5c0 2-1 3-1 5" />
      <path d="M10 4c0 2 1 3 1 5" />
    </svg>
  );
}

export function BotanicalStrength({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M6 4v4" />
      <path d="M18 4v4" />
      <path d="M4 6h2" />
      <path d="M18 6h2" />
      <path d="M8 6h8" />
      <path d="M12 8v8" />
      <path d="M9 20l3-4 3 4" />
      <path d="M9 13c0 0 1-1 3-1s3 1 3 1" />
    </svg>
  );
}

export function BotanicalWalk({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <circle cx="13" cy="4" r="1.5" />
      <path d="M10 8l2 2 2-2" />
      <path d="M12 10v5" />
      <path d="M9 14l-2 6" />
      <path d="M15 14l2 6" />
      <path d="M10 10l-2 4" />
      <path d="M14 10l2 4" />
    </svg>
  );
}

export function BotanicalHerb({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M12 22v-8" />
      <path d="M12 14c-2-2-5-3-7-2 0 4 3 6 7 6" />
      <path d="M12 14c2-2 5-3 7-2 0 4-3 6-7 6" />
      <path d="M12 10c-1-3-4-5-7-4 1 4 4 6 7 6" />
      <path d="M12 10c1-3 4-5 7-4-1 4-4 6-7 6" />
      <path d="M12 6c0-3 1-4 0-5" />
    </svg>
  );
}

export function BotanicalMicroscope({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} {...STROKE}>
      <path d="M6 21h12" />
      <path d="M9 21v-4" />
      <path d="M15 21v-4" />
      <path d="M9 17H7a2 2 0 0 1-2-2v-1" />
      <path d="M15 17h2a2 2 0 0 0 2-2v-1" />
      <rect x="9" y="3" width="6" height="9" rx="1" />
      <path d="M12 3V2" />
      <path d="M10 8h4" />
      <path d="M11 6c0 0 1-1 2 0" />
      <path d="M5 14h14" />
    </svg>
  );
}
