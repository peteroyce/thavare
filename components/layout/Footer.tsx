import Link from 'next/link';

const COLS = [
  { title: 'Shop',    links: ['Pre-Sport','During Activity','Recovery','Daily Essentials','Bestsellers','New Arrivals'] },
  { title: 'Company', links: ["About Thavare","Founder's Story","The Circle","Our Ingredients","Clinical Research","Contact Us"] },
  { title: 'Help',    links: ['FAQs','Shipping & Delivery','Returns & Refunds','Track Order','Privacy Policy','Terms of Service'] },
];

export function Footer() {
  return (
    <footer className="bg-navy-deep px-20 pt-16 pb-8">
      <div className="grid grid-cols-4 gap-12 pb-12 border-b border-white/10 mb-7">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-full border border-camel/50 flex items-center justify-center text-camel">◎</div>
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
            {['IG', 'FB', 'YT', 'X'].map((icon, i) => (
              <div key={i} className="w-[34px] h-[34px] rounded-full border border-white/10 flex items-center justify-center text-[11px] text-cream/50 hover:border-white/30 hover:text-cream/80 transition-all duration-200 cursor-none">
                {icon}
              </div>
            ))}
          </div>
        </div>
        {/* Link columns */}
        {COLS.map(col => (
          <div key={col.title}>
            <h4 className="text-[9px] font-semibold tracking-[3px] uppercase text-cream/30 mb-4">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map(link => (
                <li key={link}>
                  <Link href="#" className="text-[13px] text-cream/45 hover:text-cream/85 transition-colors duration-200">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-cream/25">© 2026 Thavare Health Sciences Pvt. Ltd. All rights reserved.</span>
        <div className="flex gap-6">
          {['Privacy','Terms','Sitemap'].map(label => (
            <Link key={label} href="#" className="text-[12px] text-cream/30 hover:text-cream/60 transition-colors">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
