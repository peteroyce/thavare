const COMPANY_ID = process.env.NEXT_PUBLIC_KLAVIYO_PUBLIC_KEY!;
const LIST_ID = process.env.NEXT_PUBLIC_KLAVIYO_LIST_ID ?? 'TGt6Zc';
const ENDPOINT = `https://a.klaviyo.com/client/subscriptions/?company_id=${COMPANY_ID}`;

export async function subscribeToNewsletter(email: string): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'revision': '2024-10-15',
    },
    body: JSON.stringify({
      data: {
        type: 'subscription',
        attributes: {
          list_id: LIST_ID,
          profile: {
            data: {
              type: 'profile',
              attributes: { email },
            },
          },
        },
      },
    }),
  });
  if (!res.ok && res.status !== 202) {
    throw new Error(`Klaviyo error: ${res.status}`);
  }
}

export async function notifyBackInStock(email: string, productName: string): Promise<void> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'revision': '2024-10-15',
    },
    body: JSON.stringify({
      data: {
        type: 'subscription',
        attributes: {
          list_id: LIST_ID,
          profile: {
            data: {
              type: 'profile',
              attributes: {
                email,
                properties: { back_in_stock_product: productName },
              },
            },
          },
        },
      },
    }),
  });
  if (!res.ok && res.status !== 202) {
    throw new Error(`Klaviyo error: ${res.status}`);
  }
}
