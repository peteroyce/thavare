import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Refunds — Thavare',
  description:
    'Thavare\'s return and refund policy — 7-day returns, eligible items, how to initiate a return, and refund timelines.',
};

const RETURN_STEPS = [
  {
    step: '01',
    title: 'Contact Us',
    desc: 'Email hello@thavare.com within 7 days of receiving your order. Include your order number, the item(s) you wish to return, and the reason for return.',
  },
  {
    step: '02',
    title: 'Await Authorisation',
    desc: 'Our team will review your request within 1\u20132 business days and send you a Return Authorisation (RA) number along with return pickup or drop-off instructions.',
  },
  {
    step: '03',
    title: 'Pack and Return',
    desc: 'Pack the item securely in its original, sealed packaging. Attach the RA number visibly on the parcel. Hand it over to our courier partner or drop it off at the specified location as instructed.',
  },
  {
    step: '04',
    title: 'Inspection',
    desc: 'Once we receive the returned product, our team will inspect it within 2\u20133 business days to confirm it meets return eligibility criteria.',
  },
  {
    step: '05',
    title: 'Refund Issued',
    desc: 'Upon successful inspection, your refund will be initiated within 2\u20133 business days. The amount will reflect in your original payment source within 5\u20137 business days.',
  },
];

export default function ReturnsPage() {
  return (
    <div className="bg-cream min-h-screen px-4 md:px-10 lg:px-20 py-14 md:py-24">
      <div className="max-w-[800px] mx-auto">

        <AnimatedSection>
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
            Help
          </div>
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-medium text-navy leading-[1.1] mb-3">
            Returns &amp; Refunds
          </h1>
          <p className="text-[14px] leading-[1.75] text-text-2">
            We stand behind the quality of every Thavare product. If something isn&rsquo;t right,
            we&rsquo;re here to help. Please read our policy carefully before initiating a return.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Return Policy */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Return Policy
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            We offer a <strong className="font-semibold text-navy">7-day return window</strong> from
            the date of delivery. If you are not satisfied with your purchase for any reason, you may
            request a return within this window, subject to the eligibility criteria below.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Returns must be initiated by emailing us at{' '}
            <a href="mailto:hello@thavare.com" className="text-teal underline underline-offset-2">
              hello@thavare.com
            </a>{' '}
            within 7 days of the delivery date noted in your shipping confirmation. Requests received
            after this window cannot be processed.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Eligible Items */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Eligible Items
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            A product is eligible for return if it meets all of the following conditions:
          </p>
          <ul className="space-y-2 mb-3">
            {[
              'The return is requested within 7 days of the delivery date.',
              'The product is unused and in its original, sealed, tamper-evident packaging.',
              'All seals, caps, and safety packaging are fully intact.',
              'The product was received damaged, defective, or incorrect (wrong item sent).',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-[14px] leading-[1.75] text-text-2">
                <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Non-Eligible Items */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Non-Eligible Items
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            Due to the nature of skincare products and hygiene regulations, the following items
            cannot be returned under any circumstances:
          </p>
          <ul className="space-y-2 mb-3">
            {[
              'Products that have been opened, used, or where the seal has been broken.',
              'Products with removed or damaged labels.',
              'Products returned after the 7-day return window.',
              'Items purchased during clearance or final sale events (marked as non-returnable at the time of purchase).',
              'Free gifts or promotional items.',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-[14px] leading-[1.75] text-text-2">
                <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-terracotta flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <p className="text-[13px] leading-[1.75] text-text-3 bg-ivory border border-[#E5DDD0] rounded-lg px-5 py-4">
            We take hygiene seriously. Once a skincare product is opened, it cannot be resold or
            restocked. This policy exists to protect every customer who receives a Thavare product
            from our warehouse.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Return Process */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-5">
            Return Process
          </h2>
          <div className="flex flex-col gap-5">
            {RETURN_STEPS.map((step) => (
              <div key={step.step} className="flex items-start gap-5">
                <div className="flex-shrink-0 w-9 h-9 rounded-full border border-teal/30 flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-teal tracking-wider">
                    {step.step}
                  </span>
                </div>
                <div>
                  <div className="font-serif text-[15px] font-medium text-navy mb-1">
                    {step.title}
                  </div>
                  <p className="text-[14px] leading-[1.75] text-text-2">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Refund Timeline */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Refund Timeline
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            Once the returned product has been received and inspected, refunds are processed within
            2–3 business days. The refunded amount is credited back to your original payment source:
          </p>
          <ul className="space-y-2 mb-3">
            {[
              'UPI / Net Banking: 3\u20135 business days',
              'Credit / Debit Card: 5\u20137 business days',
              'Wallets: 1\u20133 business days',
            ].map((point) => (
              <li key={point} className="flex items-start gap-3 text-[14px] leading-[1.75] text-text-2">
                <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Shipping charges are non-refundable unless the return is due to a Thavare error (wrong
            item, damaged, or defective product). You will receive an email confirmation once your
            refund has been initiated.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Exchange Policy */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Exchange Policy
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            We currently do not offer direct exchanges. If you wish to receive a different product,
            please initiate a return for the original item (if eligible) and place a fresh order for
            the item you want. This ensures the fastest and most reliable fulfilment for you.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            For damaged or incorrect items, we will arrange a priority replacement dispatch at no
            additional cost once the return is approved. Contact us at{' '}
            <a href="mailto:hello@thavare.com" className="text-teal underline underline-offset-2">
              hello@thavare.com
            </a>{' '}
            and include a photo of the damaged or incorrect item for fastest resolution.
          </p>
        </AnimatedSection>

      </div>
    </div>
  );
}
