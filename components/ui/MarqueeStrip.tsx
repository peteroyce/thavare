type Item = { label: string };
type Props = { items: Item[]; className?: string };

export function MarqueeStrip({ items, className = '' }: Props) {
  const doubled = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div className="inline-flex marquee-animate-slow">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-8 text-[11px] font-medium tracking-[3px] uppercase text-white/88">
            {item.label}
            <span className="text-[#C4A882] text-[8px] ml-4 opacity-60" aria-hidden="true">&#x25C6;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
