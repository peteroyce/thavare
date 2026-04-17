import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs — Thavare',
  description:
    'Find answers to the most common questions about Thavare orders, shipping, returns, and our Ayurvedic skincare products.',
};

type FaqItem = { q: string; a: string };
type FaqCategory = { category: string; items: FaqItem[] };

const FAQ_CATEGORIES: FaqCategory[] = [
  {
    category: 'Orders & Payment',
    items: [
      {
        q: 'How do I place an order?',
        a: "Placing an order is simple. Browse our shop, select your products, and add them to your cart. When you're ready, proceed to checkout. We use Shopify's secure checkout — you can pay via UPI, credit/debit card, net banking, or other supported methods. You'll receive an order confirmation email as soon as payment is successful.",
      },
      {
        q: 'Can I modify or cancel my order after placing it?',
        a: 'Orders can be modified or cancelled within 2 hours of placement, provided they have not yet been dispatched. Please write to us immediately at support@thavare.com with your order number. Once an order has been handed over to our courier partner, we are unable to make changes.',
      },
      {
        q: 'My payment failed but the amount was debited. What should I do?',
        a: 'In the rare event of a payment failure with a debit to your account, please do not retry the payment immediately. Amounts debited for failed transactions are automatically reversed to your source account within 5\u20137 business days by your bank or payment provider. If the reversal does not appear after 7 business days, contact us at support@thavare.com with your transaction reference.',
      },
      {
        q: 'Is it safe to pay on Thavare?',
        a: "Yes, completely. All payments on Thavare are processed through Shopify's PCI-DSS compliant payment infrastructure. We do not store or have access to your card or UPI details at any point.",
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    items: [
      {
        q: 'How long does delivery take?',
        a: "Standard delivery across India takes 3\u20135 business days after dispatch. Express delivery (available for select pincodes) takes 1\u20132 business days. Orders are typically processed and dispatched within 1\u20132 business days of placement. You'll receive a shipping confirmation email with your tracking link as soon as your order is on its way.",
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer free standard shipping on all orders of \u20b9499 or more. For orders below \u20b9499, a flat shipping fee of \u20b979 applies. Express shipping is available at \u20b9149 for eligible pincodes, regardless of order value.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, Thavare ships across India only. We are actively working on expanding to international markets. To be notified when international shipping launches in your country, join our Circle community or follow us on Instagram.',
      },
    ],
  },
  {
    category: 'Returns & Refunds',
    items: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 7-day return window from the date of delivery for eligible products. To be eligible for a return, the product must be unused and in its original, sealed packaging. Due to hygiene regulations and the nature of skincare products, we are unable to accept returns on opened or used items.',
      },
      {
        q: 'How do I initiate a return?',
        a: 'To start a return, email us at support@thavare.com within 7 days of receiving your order. Include your order number, the product(s) you wish to return, and the reason for return. Our team will review your request within 1\u20132 business days and send you a return authorisation along with pickup instructions.',
      },
      {
        q: 'When will I receive my refund?',
        a: 'Once we receive and inspect the returned product, your refund will be processed within 2\u20133 business days. The amount will be credited back to your original payment method within 5\u20137 business days from the date of processing. You will receive an email confirmation once the refund has been initiated.',
      },
    ],
  },
  {
    category: 'Products',
    items: [
      {
        q: 'Are Thavare products really Ayurvedic?',
        a: 'Yes. All Thavare formulations are rooted in Ayurvedic principles \u2014 each ingredient is chosen for its traditional role in skin wellness and is backed by modern clinical research. We do not use harsh chemicals, synthetic fragrances, or parabens. Our products are specifically formulated for active skin \u2014 skin that sweats, moves, and faces environmental stressors daily.',
      },
      {
        q: 'Are your products suitable for sensitive skin?',
        a: 'Our formulations use naturally derived, clinically validated actives and are designed to be gentle on all skin types. However, if you have a known skin condition, allergy, or are currently under dermatological treatment, we recommend doing a patch test before full application and consulting your dermatologist. Ingredients are clearly listed on each product page.',
      },
      {
        q: 'How should I store Thavare products?',
        a: 'Store all Thavare products in a cool, dry place away from direct sunlight and heat. Avoid leaving products in your car or near humid areas such as bathrooms with poor ventilation. Once opened, most products have a shelf life of 6\u201312 months \u2014 the PAO (period-after-opening) symbol on each pack indicates the recommended use-by period.',
      },
      {
        q: 'Are your products cruelty-free?',
        a: 'Absolutely. Thavare is proudly cruelty-free. We do not test on animals at any stage of product development, and we only partner with ingredient suppliers who share this commitment. We are working towards full vegan certification across our range.',
      },
    ],
  },
];

function FaqItem({ q, a }: FaqItem) {
  return (
    <details className="border-b border-[#E5DDD0] py-4 group cursor-pointer">
      <summary className="font-semibold text-[14px] text-navy list-none flex justify-between items-center">
        <span>{q}</span>
        <span
          className="ml-4 flex-shrink-0 w-5 h-5 rounded-full border border-navy/20 flex items-center justify-center text-navy/50 text-[11px] transition-transform duration-200 group-open:rotate-45"
          aria-hidden="true"
        >
          +
        </span>
      </summary>
      <p className="text-[14px] leading-[1.75] text-text-2 mt-3 pr-8">{a}</p>
    </details>
  );
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_CATEGORIES.flatMap((cat) =>
    cat.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    }))
  ),
};

export default function FAQsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="bg-cream min-h-screen px-4 md:px-10 lg:px-20 py-14 md:py-24">
      <div className="max-w-[800px] mx-auto">

        <AnimatedSection>
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
            Help
          </div>
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-medium text-navy leading-[1.1] mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Everything you need to know about ordering, shipping, returns, and our products.
            Can&rsquo;t find your answer?{' '}
            <a href="mailto:support@thavare.com" className="text-teal underline underline-offset-2">
              Write to us
            </a>{' '}
            and we&rsquo;ll get back to you within one business day.
          </p>
        </AnimatedSection>

        {FAQ_CATEGORIES.map((section, si) => (
          <div key={section.category}>
            <div className="border-t border-[#E5DDD0] my-8" />

            <AnimatedSection delay={(si % 3 + 1) as 1 | 2 | 3}>
              <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-5">
                {section.category}
              </div>

              <div>
                {section.items.map((item) => (
                  <FaqItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </AnimatedSection>
          </div>
        ))}

        <div className="border-t border-[#E5DDD0] my-8" />

        <AnimatedSection delay={1}>
          <div className="bg-ivory rounded-xl px-7 py-7 border border-[#E5DDD0]">
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-2">
              Still need help?
            </div>
            <p className="text-[14px] leading-[1.75] text-text-2 mb-1">
              Our team is available Monday to Saturday, 10 AM &ndash; 6 PM IST.
            </p>
            <p className="text-[14px] leading-[1.75] text-text-2">
              Email us at{' '}
              <a href="mailto:support@thavare.com" className="text-teal underline underline-offset-2">
                support@thavare.com
              </a>
            </p>
          </div>
        </AnimatedSection>

      </div>
    </div>
    </>
  );
}
