import { AnimatedSection } from '@/components/ui/AnimatedSection';

// Placeholder UGC items — real IG embed would replace these in production
const UGC_POSTS = [
  { id: 1, username: '@fitwithananya',   caption: 'Post-run skin feels incredible ✨',                  bg: '#F5EFE7' },
  { id: 2, username: '@yogawithriya',    caption: 'Finally found Ayurveda that works for active skin', bg: '#EDE3D8' },
  { id: 3, username: '@runnerssoul',     caption: "The sunscreen doesn't feel heavy at all!",           bg: '#F0E8DD' },
  { id: 4, username: '@dailymovements',  caption: "Recovery lotion is the best I've tried",             bg: '#E8DDD0' },
  { id: 5, username: '@sweatandshine',   caption: 'Body wash + body lotion = complete game changer',   bg: '#F5EFE7' },
  { id: 6, username: '@thrive_movement', caption: 'Ancient wisdom, modern athlete needs',               bg: '#EDE3D8' },
];

export function UGCSection() {
  return (
    <section className="bg-cream py-14 md:py-24 px-4 md:px-10 lg:px-20">
      <AnimatedSection>
        <p className="text-teal text-[11px] font-semibold uppercase tracking-[0.18em] mb-2 text-center">
          The Community
        </p>
        <h2 className="font-serif text-navy text-[28px] md:text-[38px] font-medium text-center mb-3">
          Real People, Real Movement
        </h2>
        <p className="text-center text-text-2 text-[13px] mb-10 tracking-wide">
          Share your story — tag{' '}
          <span className="text-teal font-medium">@thavare_ayurveda</span>
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {UGC_POSTS.map(({ id, username, caption, bg }) => (
            <div
              key={id}
              className="aspect-square rounded-xl flex flex-col items-center justify-between p-5"
              style={{ backgroundColor: bg }}
            >
              <span className="text-camel text-[30px] leading-none mt-2 select-none">◎</span>
              <p className="text-navy text-[13px] text-center leading-snug font-medium px-2">
                {caption}
              </p>
              <span className="text-teal text-[11px] font-semibold tracking-wide mb-1">
                {username}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-center">
          <a
            href="https://www.instagram.com/thavare_ayurveda"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-none inline-flex items-center gap-2 px-7 py-3 rounded-full border border-navy text-navy text-[13px] font-semibold tracking-wide hover:bg-navy hover:text-cream transition-all duration-200"
          >
            Follow @thavare_ayurveda on Instagram
          </a>
        </div>
      </AnimatedSection>
    </section>
  );
}
