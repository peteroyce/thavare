import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createShopifyOrder, extractNumericId } from '@/lib/shopify-admin';

type VerifyBody = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  email: string;
  items: Array<{
    variantId: string; // Shopify GID e.g. "gid://shopify/ProductVariant/12345"
    quantity: number;
    name: string;
    price: number;
  }>;
};

export async function POST(request: Request) {
  try {
    const body: VerifyBody = await request.json();

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      items,
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    if (!email || !items?.length) {
      return NextResponse.json({ error: 'Missing email or cart items' }, { status: 400 });
    }

    // Verify signature using HMAC SHA256
    const signatureBody = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(signatureBody)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Invalid payment signature' }, { status: 400 });
    }

    // Create order in Shopify
    let orderNumber: number | undefined;
    let orderName: string | undefined;
    try {
      const lineItems = items.map(item => ({
        variant_id: extractNumericId(item.variantId),
        quantity: item.quantity,
      }));

      const shopifyOrder = await createShopifyOrder({
        email,
        lineItems,
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
      });

      orderNumber = shopifyOrder.orderNumber;
      orderName = shopifyOrder.orderName;
    } catch (shopifyErr) {
      // Log but don't fail — payment was already collected
      console.error('Shopify order creation failed (payment still valid):', shopifyErr);
    }

    return NextResponse.json({
      verified: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      orderNumber,
      orderName,
    });
  } catch (err) {
    console.error('Razorpay verification failed:', err);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}
