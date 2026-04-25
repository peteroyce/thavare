declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill?: { name?: string; email?: string; contact?: string };
  theme?: { color?: string };
  handler: (response: RazorpayResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
}

export interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

export type CartItemForCheckout = {
  variantId: string;
  name: string;
  quantity: number;
  price: number;
};

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay'));
    document.head.appendChild(script);
  });
}

export async function createRazorpayOrder(
  amount: number,
  items: Array<{ name: string; quantity: number; price: number }>
): Promise<{ orderId: string; amount: number; currency: string }> {
  const res = await fetch('/api/razorpay/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount, items }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? 'Failed to create order');
  }
  return res.json();
}

export async function verifyRazorpayPayment(
  response: RazorpayResponse,
  email: string,
  items: CartItemForCheckout[]
): Promise<{ verified: boolean; paymentId: string; orderId: string; orderNumber?: number; orderName?: string }> {
  const res = await fetch('/api/razorpay/verify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...response, email, items }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? 'Payment verification failed');
  }
  return res.json();
}

export async function openRazorpayCheckout(
  amount: number,
  items: Array<{ name: string; quantity: number; price: number }>,
  email?: string
): Promise<RazorpayResponse> {
  await loadRazorpayScript();

  const { orderId, amount: orderAmount, currency } = await createRazorpayOrder(amount, items);

  return new Promise((resolve, reject) => {
    const options: RazorpayOptions = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      amount: orderAmount,
      currency,
      name: 'Thavare',
      description: `${items.length} item${items.length > 1 ? 's' : ''} — Clinically Crafted Ayurveda`,
      order_id: orderId,
      prefill: email ? { email } : undefined,
      theme: { color: '#2C1810' }, // deep brown brand color
      handler: (response) => resolve(response),
      modal: { ondismiss: () => reject(new Error('Payment cancelled')) },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  });
}
