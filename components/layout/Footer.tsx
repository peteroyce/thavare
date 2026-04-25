import Link from 'next/link';

const COMPANY_LINKS: { label: string; href: string }[] = [
  { label: "About Thavare",    href: '/about' },
  { label: "Founder's Story",  href: '/founders' },
  { label: "The Circle",       href: '/circle' },
  { label: "Our Ingredients",  href: '/ingredients' },
  { label: "Our Philosophy",   href: '/why-sport-active' },
  { label: "Journal",          href: '/journal' },
];

const SHOP_LINKS: { label: string; href: string }[] = [
  { label: 'All Products',     href: '/shop' },
  { label: 'Sport',            href: '/shop?category=sport' },
  { label: 'Sun Protection',   href: '/shop?category=sun-protection' },
  { label: 'Recovery',         href: '/shop?category=recovery' },
  { label: 'Daily Essentials', href: '/shop?category=daily-essentials' },
  { label: 'Skin Quiz',        href: '/quiz' },
];

const HELP_LINKS: { label: string; href: string }[] = [
  { label: 'FAQs',               href: '/faqs' },
  { label: 'Shipping & Delivery',href: '/shipping' },
  { label: 'Returns & Refunds',  href: '/returns' },
  { label: 'Track Order',        href: '/track-order' },
  { label: 'Privacy Policy',     href: '/privacy-policy' },
  { label: 'Terms of Service',   href: '/terms' },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep px-4 md:px-10 lg:px-20 pt-16 pb-8 grain">
      <div className="h-px bg-gradient-to-r from-transparent via-[#C4A882]/30 to-transparent -mt-16 mb-16" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-white/10 mb-7">
        {/* Brand */}
        <div className="md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="/images/thavare-icon.svg" alt="Thavare" className="w-9 h-9" />
            <div>
              <span className="block font-serif text-lg font-medium tracking-[5px] text-cream">THAVARE</span>
              <span className="block text-[8px] tracking-[2px] uppercase text-cream/40">Clinically Crafted Ayurveda</span>
            </div>
          </div>
          <p className="text-[13px] leading-relaxed text-cream/40 max-w-[250px] mb-4">
            Functional Ayurvedic skincare engineered for the precise tension between the apothecary and the laboratory.
          </p>
          <p className="font-serif italic text-[12px] text-camel/65">Move. Sweat. Heal.</p>
          <div className="flex gap-2.5 mt-5">
            <a
              href="https://www.instagram.com/thavare_ayurveda"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center text-[11px] text-cream/50 hover:border-white/30 hover:text-cream/80 transition-all duration-200"
              aria-label="Thavare on Instagram"
            >
              IG
            </a>
            <a
              href="https://www.facebook.com/thavare"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center text-[11px] text-cream/50 hover:border-white/30 hover:text-cream/80 transition-all duration-200"
              aria-label="Thavare on Facebook"
            >
              FB
            </a>
            <a
              href="https://www.youtube.com/@thavare"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center text-[11px] text-cream/50 hover:border-white/30 hover:text-cream/80 transition-all duration-200"
              aria-label="Thavare on YouTube"
            >
              YT
            </a>
            <a
              href="https://x.com/thavare"
              target="_blank"
              rel="noopener noreferrer"
              className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center text-[11px] text-cream/50 hover:border-white/30 hover:text-cream/80 transition-all duration-200"
              aria-label="Thavare on X"
            >
              X
            </a>
          </div>
        </div>
        {/* Shop column */}
        <div>
          <h3 className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/50 mb-4">Shop</h3>
          <ul className="flex flex-col gap-2.5">
            {SHOP_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-[13px] text-cream/65 hover:text-cream/85 transition-colors duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Company column — real routes */}
        <div>
          <h3 className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/50 mb-4">Company</h3>
          <ul className="flex flex-col gap-2.5">
            {COMPANY_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-[13px] text-cream/65 hover:text-cream/85 transition-colors duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Help column */}
        <div>
          <h3 className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/50 mb-4">Help</h3>
          <ul className="flex flex-col gap-2.5">
            {HELP_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} className="text-[13px] text-cream/65 hover:text-cream/85 transition-colors duration-200">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Contact column */}
        <div>
          <h3 className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/50 mb-4">Contact</h3>
          <div className="flex flex-col gap-4">
            <div>
              <div className="text-[10px] font-semibold tracking-[2px] uppercase text-cream/40 mb-1">Address</div>
              <p className="text-[12px] leading-[1.7] text-cream/65">
                4/A, &apos;RESHMA Building&apos;, First Floor,<br />
                80 Feet Road, RMV 2nd Stage,<br />
                Ashwath Nagar, Sanjayanagara,<br />
                Bengaluru, Karnataka – 560094
              </p>
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-[2px] uppercase text-cream/40 mb-1">Phone</div>
              <a href="tel:+919513971515" className="text-[13px] text-cream/65 hover:text-cream/85 transition-colors duration-200">
                +91 95139 71515
              </a>
            </div>
            <div>
              <div className="text-[10px] font-semibold tracking-[2px] uppercase text-cream/40 mb-1">Email</div>
              <a href="mailto:support@thavare.com" className="text-[13px] text-cream/65 hover:text-cream/85 transition-colors duration-200">
                support@thavare.com
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <span className="text-[12px] text-cream/40">© 2026 Thavare Health Sciences Pvt. Ltd. All rights reserved.</span>
        <div className="flex gap-6">
          <Link href="/privacy-policy" className="text-[12px] text-cream/50 hover:text-cream/60 transition-colors">Privacy</Link>
          <Link href="/terms" className="text-[12px] text-cream/50 hover:text-cream/60 transition-colors">Terms</Link>
          <Link href="/sitemap.xml" className="text-[12px] text-cream/50 hover:text-cream/60 transition-colors">Sitemap</Link>
        </div>
      </div>
    </footer>
  );
}
