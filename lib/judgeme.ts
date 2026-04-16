export type JudgemeReview = {
  id: number;
  title: string;
  body: string;
  rating: number;
  reviewer: { name: string };
  created_at: string;
};

export type JudgemeAggregate = {
  rating: number;
  reviews_count: number;
};

export async function getProductReviews(handle: string): Promise<{
  reviews: JudgemeReview[];
  aggregate: JudgemeAggregate;
}> {
  const API_TOKEN = process.env.JUDGEME_PRIVATE_TOKEN!;
  const SHOP_DOMAIN = process.env.NEXT_PUBLIC_JUDGEME_SHOP_DOMAIN!;
  const BASE = 'https://judge.me/api/v1';

  const [reviewsRes, productRes] = await Promise.all([
    fetch(
      `${BASE}/reviews?api_token=${API_TOKEN}&shop_domain=${SHOP_DOMAIN}&handle=${handle}&per_page=10`,
      { next: { revalidate: 3600 } }
    ),
    fetch(
      `${BASE}/products/-1?api_token=${API_TOKEN}&shop_domain=${SHOP_DOMAIN}&handle=${handle}`,
      { next: { revalidate: 3600 } }
    ),
  ]);

  if (!reviewsRes.ok) throw new Error(`Judge.me reviews fetch failed: ${reviewsRes.status}`);
  if (!productRes.ok) throw new Error(`Judge.me product fetch failed: ${productRes.status}`);

  const [reviewsData, productData] = await Promise.all([
    reviewsRes.json(),
    productRes.json(),
  ]);

  return {
    reviews: (reviewsData.reviews ?? []) as JudgemeReview[],
    aggregate: {
      rating: productData.product?.rating ?? 0,
      reviews_count: productData.product?.reviews_count ?? 0,
    },
  };
}
