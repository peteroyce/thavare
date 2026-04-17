import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Thavare',
  description:
    'Read the Terms of Service governing your use of the Thavare website and purchase of Thavare products.',
};

export default function TermsPage() {
  return (
    <div className="bg-cream min-h-screen px-4 md:px-10 lg:px-20 py-14 md:py-24">
      <div className="max-w-[800px] mx-auto">

        <AnimatedSection>
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-teal mb-3">
            Legal
          </div>
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-medium text-navy leading-[1.1] mb-3">
            Terms of Service
          </h1>
          <p className="text-[13px] text-text-3 mb-2">
            Effective Date: April 1, 2026
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the Thavare website or purchasing any products. By accessing our website or placing an order, you agree to be bound by these Terms. These Terms govern the relationship between you and Thavare Health Sciences Pvt. Ltd., a company incorporated under the Companies Act, 2013, with its registered office in India.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Acceptance of Terms */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Acceptance of Terms
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            By accessing or using our website at thavare.com, you confirm that you are at least 18 years of age, have the legal capacity to enter into a binding agreement, and agree to comply with these Terms in full. If you do not agree with any part of these Terms, please do not use our website or services. We reserve the right to modify these Terms at any time; continued use of the website after changes are posted constitutes your acceptance.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Products and Pricing */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Products and Pricing
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            All prices displayed on the website are in Indian Rupees (INR) and are inclusive of applicable Goods and Services Tax (GST) unless otherwise stated. Prices are subject to change without notice. We make every effort to display accurate product information, including ingredients, descriptions, and images; however, slight variations in colour or appearance may occur due to display settings or natural product variation.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Thavare products are intended for external use only. Results may vary between individuals. Our products are not intended to diagnose, treat, cure, or prevent any medical condition. If you have a skin condition or allergy, please consult a dermatologist before use.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Orders and Payment */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Orders and Payment
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            When you place an order on our website, you are making an offer to purchase the selected products at the listed price. We reserve the right to accept or decline any order. Your order is confirmed only upon receipt of a confirmation email from us.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            We accept payments via credit/debit cards, UPI, net banking, and other methods supported by our payment gateway. All transactions are processed securely by our payment partners. Thavare does not store or have access to your payment card details. In the event of a payment failure, please do not retry until you have verified with your bank that no amount was debited.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Shipping */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Shipping
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            We ship to addresses across India. Delivery timelines are estimates and may vary due to logistics partner delays, public holidays, or events outside our control. Thavare is not liable for delays caused by courier partners or circumstances beyond our reasonable control. Title and risk of loss for all products pass to you upon dispatch. Please refer to our{' '}
            <a href="/shipping" className="text-teal underline underline-offset-2">
              Shipping &amp; Delivery
            </a>{' '}
            page for full details on delivery timelines, costs, and free shipping thresholds.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Returns */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Returns
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            We offer a 7-day return window from the date of delivery for eligible products. Due to the nature of skincare products and hygiene regulations, opened or used items cannot be returned. Products must be returned in their original, sealed packaging and in a resalable condition. Please refer to our{' '}
            <a href="/returns" className="text-teal underline underline-offset-2">
              Returns &amp; Refunds
            </a>{' '}
            page for full details on how to initiate a return and the refund process.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Intellectual Property */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Intellectual Property
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            All content on this website — including but not limited to text, images, graphics, logos, product names, formulations, and design elements — is the exclusive intellectual property of Thavare Health Sciences Pvt. Ltd. and is protected under applicable Indian and international intellectual property laws. You may not reproduce, distribute, modify, or use any content from this website without our prior written permission.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Limitation of Liability */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Limitation of Liability
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            To the fullest extent permitted by law, Thavare Health Sciences Pvt. Ltd. shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability for any claim arising out of or in connection with these Terms shall not exceed the amount paid by you for the specific product giving rise to the claim. Nothing in these Terms limits our liability for fraud, gross negligence, or any liability that cannot be excluded by law.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Governing Law */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Governing Law
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts in India.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            If you have any questions about these Terms, please contact us at{' '}
            <span className="text-teal">support@thavare.com</span>.
          </p>
        </AnimatedSection>

      </div>
    </div>
  );
}
