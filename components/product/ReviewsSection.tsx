import type { JudgemeReview, JudgemeAggregate } from '@/lib/judgeme';

function StarRow({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'lg' ? 'text-2xl' : size === 'sm' ? 'text-sm' : 'text-base';
  return (
    <span className={`${sizeClass} leading-none`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{ color: '#E8A87C' }}>
          {i < rating ? '★' : '☆'}
        </span>
      ))}
    </span>
  );
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return '';
  }
}

type Props = {
  reviews: JudgemeReview[];
  aggregate: JudgemeAggregate;
};

export function ReviewsSection({ reviews, aggregate }: Props) {
  return (
    <section className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20 py-14">
      <h2 className="font-serif text-[28px] font-medium text-navy mb-8">Customer Reviews</h2>

      {/* Aggregate bar */}
      {aggregate.reviews_count > 0 && (
        <div className="flex items-center gap-4 mb-10 p-5 rounded-xl bg-ivory border border-[#E5DDD0] w-fit">
          <StarRow rating={Math.round(aggregate.rating)} size="lg" />
          <span className="text-text-1 font-semibold text-lg">
            {aggregate.rating.toFixed(1)} out of 5
          </span>
          <span className="text-text-3 text-sm">
            ({aggregate.reviews_count} {aggregate.reviews_count === 1 ? 'review' : 'reviews'})
          </span>
        </div>
      )}

      {/* No reviews placeholder */}
      {reviews.length === 0 && (
        <p className="italic text-text-3 text-base py-4">
          No reviews yet — be the first to share your experience.
        </p>
      )}

      {/* Review cards grid */}
      {reviews.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-ivory border border-[#E5DDD0] rounded-xl p-5 flex flex-col gap-2"
            >
              {/* Stars + name + date */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-3">
                  <StarRow rating={review.rating} size="sm" />
                  <span className="font-semibold text-text-1 text-sm">{review.reviewer.name}</span>
                </div>
                <span className="text-text-3 text-[12px]">{formatDate(review.created_at)}</span>
              </div>
              {/* Title */}
              {review.title && (
                <p className="font-medium text-text-1 text-sm">{review.title}</p>
              )}
              {/* Body */}
              {review.body && (
                <p className="text-text-2 text-sm leading-relaxed">{review.body}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
