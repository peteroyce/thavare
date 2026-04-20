import { NextResponse } from 'next/server';

const COMPANY_ID = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY!;
const LIST_ID = process.env.KLAVIYO_LIST_ID ?? 'TGt6Zc';
const ENDPOINT = `https://a.klaviyo.com/client/subscriptions/?company_id=${COMPANY_ID}`;

// Simple in-memory rate limiter: max 5 requests per IP per minute
const rateMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + 60_000 });
    return false;
  }
  entry.count++;
  return entry.count > 5;
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
  }

  let body: { email: string; productName?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { email, productName } = body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const profileAttributes: Record<string, unknown> = { email };
  if (productName) {
    profileAttributes.properties = { back_in_stock_product: productName };
  }

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', revision: '2024-10-15' },
    body: JSON.stringify({
      data: {
        type: 'subscription',
        attributes: {
          list_id: LIST_ID,
          profile: { data: { type: 'profile', attributes: profileAttributes } },
        },
      },
    }),
  });

  if (!res.ok && res.status !== 202) {
    return NextResponse.json({ error: 'Subscription failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
