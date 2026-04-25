// lib/shopify-admin.ts — Shopify Admin REST API helper for creating orders after Razorpay payment

const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN!;
const API_VERSION = '2025-01';

type LineItem = {
  variant_id: number;
  quantity: number;
};

type CreateOrderPayload = {
  email: string;
  lineItems: LineItem[];
  razorpayPaymentId: string;
  razorpayOrderId: string;
};

type ShopifyOrderResponse = {
  order: {
    id: number;
    order_number: number;
    name: string; // e.g. "#1001"
  };
};

/**
 * Extract numeric ID from a Shopify GID like "gid://shopify/ProductVariant/12345"
 */
export function extractNumericId(gid: string): number {
  const match = gid.match(/(\d+)$/);
  if (!match) throw new Error(`Invalid Shopify GID: ${gid}`);
  return parseInt(match[1], 10);
}

/**
 * Create a paid order in Shopify after successful Razorpay payment.
 * Uses POST /admin/api/2025-01/orders.json
 */
export async function createShopifyOrder({
  email,
  lineItems,
  razorpayPaymentId,
  razorpayOrderId,
}: CreateOrderPayload): Promise<{ orderNumber: number; orderName: string }> {
  const url = `https://${SHOPIFY_DOMAIN}/admin/api/${API_VERSION}/orders.json`;

  const body = {
    order: {
      email,
      financial_status: 'paid',
      send_receipt: true,
      line_items: lineItems.map(li => ({
        variant_id: li.variant_id,
        quantity: li.quantity,
      })),
      note: `Razorpay Payment ID: ${razorpayPaymentId}\nRazorpay Order ID: ${razorpayOrderId}`,
      tags: 'razorpay',
    },
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': ADMIN_TOKEN,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error('Shopify Admin API error:', res.status, text);
    throw new Error(`Shopify order creation failed (${res.status})`);
  }

  const data: ShopifyOrderResponse = await res.json();
  return {
    orderNumber: data.order.order_number,
    orderName: data.order.name,
  };
}
