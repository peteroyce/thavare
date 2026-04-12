type Item = { label: string };
type Props = { items: Item[]; className?: string };

export function MarqueeStrip({ items, className = '' }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-flex marquee-animate">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 text-[11px] font-medium tracking-wide text-white/88">
            {item.label}
            <span className="w-1 h-1 rounded-full bg-white/35 ml-4" />
          </span>
        ))}
      </div>
    </div>
  );
}
