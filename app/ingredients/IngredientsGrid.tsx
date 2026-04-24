'use client';

import Link from 'next/link';
import { useState } from 'react';
import { INGREDIENTS, type Ingredient } from '@/lib/ingredients';

const CATEGORY_LABELS: Record<Ingredient['category'], string> = {
  herb:      'Herb',
  oil:       'Oil',
  mineral:   'Mineral',
  botanical: 'Botanical',
};

const CATEGORY_COLORS: Record<Ingredient['category'], string> = {
  herb:      'bg-[rgba(166,69,44,0.08)] text-terracotta border border-[rgba(166,69,44,0.2)]',
  oil:       'bg-[rgba(168,122,83,0.1)] text-camel border border-[rgba(168,122,83,0.2)]',
  mineral:   'bg-[rgba(26,39,68,0.07)] text-navy border border-[rgba(26,39,68,0.12)]',
  botanical: 'bg-[rgba(179,95,66,0.08)] text-terracotta border border-[rgba(179,95,66,0.18)]',
};

const CATEGORY_INITIALS: Record<Ingredient['category'], string> = {
  herb:      '🌿',
  oil:       '🫙',
  mineral:   '🪨',
  botanical: '🌺',
};

type FilterCategory = Ingredient['category'] | 'all';

const FILTERS: { label: string; value: FilterCategory }[] = [
  { label: 'All',       value: 'all' },
  { label: 'Herbs',     value: 'herb' },
  { label: 'Oils',      value: 'oil' },
  { label: 'Botanicals', value: 'botanical' },
  { label: 'Minerals',  value: 'mineral' },
];

export function IngredientsGrid() {
  const [active, setActive] = useState<FilterCategory>('all');

  const filtered =
    active === 'all'
      ? INGREDIENTS
      : INGREDIENTS.filter((i) => i.category === active);

  return (
    <>
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={[
              'px-5 py-2 rounded-full text-[11px] font-semibold tracking-[1.5px] uppercase transition-all duration-200 cursor-none border',
              active === f.value
                ? 'bg-navy text-cream border-navy'
                : 'bg-white text-text-2 border-[#E5DDD0] hover:border-navy/30 hover:text-navy',
            ].join(' ')}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Count label */}
      <p className="text-[12px] tracking-[1.5px] uppercase text-text-3 mb-8">
        {filtered.length} ingredient{filtered.length !== 1 ? 's' : ''}
        {active !== 'all' ? ` · ${CATEGORY_LABELS[active as Ingredient['category']]}` : ''}
      </p>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filtered.map((ingredient) => (
          <Link
            key={ingredient.slug}
            href={`/ingredients/${ingredient.slug}`}
            className="group bg-white rounded-xl border border-[#E5DDD0] p-6 hover:-translate-y-0.5 transition-all duration-300 cursor-none flex flex-col gap-4 shadow-[rgba(26,22,16,0.04)_0_2px_12px] hover:shadow-[rgba(26,22,16,0.09)_0_8px_28px]"
          >
            {/* Icon area */}
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-[22px] flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
              style={{
                background: 'rgba(166,69,44,0.06)',
                border: '1px solid rgba(166,69,44,0.13)',
              }}
            >
              {CATEGORY_INITIALS[ingredient.category]}
            </div>

            {/* Text block */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="font-serif text-[17px] font-medium text-navy leading-tight group-hover:text-terracotta transition-colors duration-200">
                {ingredient.name}
              </div>

              {ingredient.sanskritName && (
                <div className="text-[12px] italic text-text-3">
                  {ingredient.sanskritName}
                </div>
              )}

              <p className="text-[13px] leading-[1.6] text-text-2 mt-1">
                {ingredient.tagline}
              </p>
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E5DDD0]">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-[1px] uppercase ${CATEGORY_COLORS[ingredient.category]}`}
              >
                {CATEGORY_LABELS[ingredient.category]}
              </span>
              <span
                className="text-[10px] font-medium tracking-[1.5px] uppercase transition-colors duration-200"
                style={{ color: 'var(--camel)' }}
              >
                {ingredient.origin.split(',')[0]}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
