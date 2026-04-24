import { AnimatedSection } from '@/components/ui/AnimatedSection';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Thavare',
  description:
    'Understand how Thavare Health Sciences collects, uses, and protects your personal data in compliance with the Digital Personal Data Protection Act, 2023.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-cream min-h-screen px-4 md:px-10 lg:px-20 py-14 md:py-24">
      <div className="max-w-[800px] mx-auto">

        <AnimatedSection>
          <div className="text-[10px] font-medium tracking-[4px] uppercase text-terracotta mb-3">
            Legal
          </div>
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-medium text-navy leading-[1.1] mb-3">
            Privacy Policy
          </h1>
          <p className="text-[13px] text-text-3 mb-2">
            Effective Date: April 1, 2026
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Thavare Health Sciences Pvt. Ltd. (&ldquo;Thavare&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your personal data. This Privacy Policy explains how we collect, use, share, and retain information when you visit our website or purchase from us. This policy is compliant with the Digital Personal Data Protection Act, 2023 (&ldquo;DPDP Act&rdquo;) of India.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Information We Collect */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Information We Collect
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            We collect personal data that you voluntarily provide when you create an account, place an order, subscribe to our newsletter, or contact us. This includes your name, email address, phone number, shipping address, and payment information (processed securely via our payment partners — we do not store card details).
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            We also collect technical data automatically, including your IP address, browser type, device identifiers, pages visited, and referring URLs, through cookies and similar tracking technologies. This data helps us improve our website experience and personalise communications.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* How We Use Your Information */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            How We Use Your Information
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            Your personal data is used to process and fulfil your orders, send order confirmations and shipping updates, provide customer support, and manage your account. With your consent, we may also send you promotional emails, product recommendations, and wellness content.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            We use aggregated, anonymised data for analytics, improving our product range, and understanding customer preferences. We will always obtain your explicit consent before processing your data for purposes beyond those described here.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Sharing of Information */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Sharing of Information
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            We do not sell or rent your personal data to third parties. We share your information only with trusted service providers necessary to operate our business — including payment processors, logistics and courier partners, email service providers, and cloud hosting services — all bound by confidentiality obligations.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            We may disclose your data if required by law, to comply with a legal obligation, or to protect the rights and safety of Thavare, our customers, or others.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Cookies */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Cookies
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            Our website uses cookies and similar tracking technologies to enhance your browsing experience, remember your cart and preferences, and analyse site traffic. You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of the site.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Your Rights */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Your Rights
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-3">
            Under the DPDP Act, 2023, you have the right to access the personal data we hold about you, correct inaccurate information, withdraw your consent at any time, and request erasure of your data where it is no longer necessary for the purpose it was collected. You also have the right to nominate a person to exercise these rights on your behalf.
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            To exercise any of these rights, please write to us at <span className="text-terracotta">support@thavare.com</span>. We will respond within 30 days of receiving your request.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Data Retention */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Data Retention
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2">
            We retain your personal data for as long as necessary to provide our services and fulfil the purposes described in this policy, or as required by applicable law. Order records are retained for seven years in compliance with Indian tax and accounting regulations. You may request deletion of your account and associated data at any time, subject to any legal retention obligations.
          </p>
        </AnimatedSection>

        <div className="border-t border-[#E5DDD0] my-8" />

        {/* Contact Us */}
        <AnimatedSection delay={1}>
          <h2 className="font-serif text-[20px] font-medium text-navy mb-3">
            Contact Us
          </h2>
          <p className="text-[14px] leading-[1.75] text-text-2 mb-1">
            For any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact our Data Protection Officer:
          </p>
          <p className="text-[14px] leading-[1.75] text-text-2">
            <strong className="text-navy font-medium">Thavare Health Sciences Pvt. Ltd.</strong><br />
            4/A, &apos;RESHMA Building&apos;, First Floor, 80 Feet Road,<br />
            RMV 2nd Stage, Ashwath Nagar, Sanjayanagara,<br />
            Bengaluru, Karnataka – 560094<br />
            Email: <a href="mailto:support@thavare.com" className="text-terracotta hover:underline">support@thavare.com</a><br />
            Phone: <a href="tel:+919513971515" className="text-terracotta hover:underline">+91 95139 71515</a>
          </p>
          <p className="text-[13px] leading-[1.75] text-text-3 mt-5">
            We reserve the right to update this Privacy Policy from time to time. Any material changes will be notified to you via email or a prominent notice on our website. Continued use of our services after the effective date of any changes constitutes your acceptance of the revised policy.
          </p>
        </AnimatedSection>

      </div>
    </div>
  );
}
