import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping & Delivery — Thavare',
  description:
    'Information on Thavare shipping zones, delivery timelines, free shipping thresholds, and order tracking.',
};

const SHIPPING_TIERS = [
  {
    method: 'Standard Shipping',
    timeline: '3–5 business days',
    cost: '₹79',
    notes: 'Pan-India. Free on orders ₹499+',
  },
  {
    method: 'Free Shipping',
    timeline: '3–5 business days',
    cost: 'Free',
    notes: 'All orders ₹499 and above',
  },
  {
    method: 'Express Shipping',
    timeline: '1–2 business days',
    cost: '₹149',
    notes: 'Select pincodes only',
  },
];

export default function ShippingPage() {
  return (
    <div className="bg-cream min-h-screen px-4 md:px-10 lg:px-20 py-14 md:py-24">
      <div className="max-w-[800px] mx-auto">

        <AnimatedSection>
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-3">
            Help
          </div>
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-medium text-navy leading-[1.1] mb-3">
            Shipping &amp; Delivery
          </h1>
          <p className="text-[14px] leading-[1.75] text-text-2">
            We want your Thavare order to reach you quickly and safely. Below is everything you need to
            know about our delivery options, timelines, and costs.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Delivery Zones */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Delivery Zones
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            We currently ship to all serviceable pincodes across India. Our logistics partners cover
            metro cities, Tier-2 and Tier-3 cities, and most rural areas. If your pincode is not
            currently serviceable, we will notify you at checkout.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            International shipping is coming soon. To be among the first to know when we ship to your
            country, join our{' '}
            <a href="/circle" className="text-terracotta underline underline-offset-2">
              Circle
            </a>
            .
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Shipping Tiers Table */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-5">
            Shipping Options
          </h2>
          <div className="overflow-x-auto rounded-xl border border-[#E5DDD0]">
            <table className="w-full text-[13px] text-text-2">
              <thead>
                <tr className="bg-ivory border-b border-[#E5DDD0]">
                  <th className="text-left px-5 py-3.5 font-semibold text-navy text-[11px] tracking-[1.5px] uppercase">
                    Method
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-navy text-[11px] tracking-[1.5px] uppercase">
                    Timeline
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-navy text-[11px] tracking-[1.5px] uppercase">
                    Cost
                  </th>
                  <th className="text-left px-5 py-3.5 font-semibold text-navy text-[11px] tracking-[1.5px] uppercase hidden sm:table-cell">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                {SHIPPING_TIERS.map((row, i) => (
                  <tr
                    key={row.method}
                    className={i < SHIPPING_TIERS.length - 1 ? 'border-b border-[#E5DDD0]' : ''}
                  >
                    <td className="px-5 py-4 font-medium text-navy">{row.method}</td>
                    <td className="px-5 py-4">{row.timeline}</td>
                    <td className="px-5 py-4 font-semibold text-terracotta">{row.cost}</td>
                    <td className="px-5 py-4 text-text-3 hidden sm:table-cell">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Standard Shipping */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Standard Shipping
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Standard shipping is available Pan-India at a flat rate of ₹79. Estimated delivery time
            is 3–5 business days from dispatch. Deliveries are made Monday through Saturday, excluding
            public holidays. For remote or difficult-to-access pincodes, delivery may take an additional
            1–2 business days.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Free Shipping */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Free Shipping
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Enjoy free standard shipping on all orders worth ₹499 or more. The free shipping
            threshold is applied to your order subtotal before any promo codes or discounts. Free
            shipping follows the same 3–5 business day timeline as standard shipping.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Express Shipping */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Express Shipping
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Need it faster? Express shipping is available for select pincodes at ₹149 per order.
            Express orders placed before 12 PM IST on business days are typically dispatched the same
            day, with delivery in 1–2 business days. Express availability will be indicated at checkout
            based on your delivery pincode.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Order Processing */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Order Processing
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            All orders are processed within 1–2 business days of payment confirmation. Orders placed
            on Sundays or public holidays will begin processing on the next working business day.
            During sale periods or high-demand launches, processing times may be slightly extended —
            we&rsquo;ll always keep you informed via email.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            You will receive an order confirmation email immediately after purchase, followed by a
            separate shipping confirmation email with your tracking details once your order has been
            dispatched.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Tracking */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Tracking Your Order
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            Once your order is dispatched, you will receive a shipping confirmation email containing
            a tracking link and your consignment number. You can use this link to track your
            delivery in real time on our courier partner&rsquo;s website.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            You can also track your order using our{' '}
            <a href="/track-order" className="text-terracotta underline underline-offset-2">
              Track Order
            </a>{' '}
            page. If you have not received a tracking update within 3 business days of your shipping
            confirmation, please contact us at{' '}
            <a href="mailto:support@thavare.com" className="text-terracotta underline underline-offset-2">
              support@thavare.com
            </a>
            .
          </p>
        </AnimatedSection>

      </div>
    </div>
  );
}
