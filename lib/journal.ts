export type JournalArticle = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'skincare' | 'ayurveda' | 'sport' | 'wellness';
  readTime: number;
  publishedAt: string;
  coverImage: string;
};

export const ARTICLES: JournalArticle[] = [
  {
    slug: 'why-active-skin-needs-different-care',
    title: 'Why Active Skin Needs Different Care',
    excerpt:
      'Sweat, sustained UV exposure, and constant friction create a skin environment that standard formulations were never designed to handle. Here is why athletes and active movers need a fundamentally different approach.',
    content: `When you move — whether that means a morning run, a cycling session, a weekend hike, or two hours on the mat — your skin takes on a role most people never consider. It becomes your body's first line of defence and its most active cooling system simultaneously. Standard skincare was designed for sedentary skin. Active skin is an entirely different challenge.

The primary issue is sweat. In moderate-intensity exercise, the average person produces between 0.5 and 1.5 litres of sweat per hour. That sweat carries salt, urea, lactic acid, and trace electrolytes to the surface. When it sits on the skin — particularly in areas of friction like the inner thighs, underarms, and shoulders — it disrupts the acid mantle, the skin's natural pH barrier. A compromised acid mantle means bacteria can proliferate more easily, and the inflammatory response that follows shows up as heat rash, breakouts, or a dull, congested complexion.

Sustained UV exposure compounds this. Active people, by definition, spend more time outdoors. Sweat also washes away standard sunscreens within 20 to 30 minutes, leaving skin exposed during the exact window when UV intensity is highest. Conventional SPF products were not formulated to be sweat-resistant, and most break down under the friction of clothing or equipment.

Friction is the third pressure. Repeated mechanical abrasion — from compression wear, straps, helmets, and repeated movement — strips the stratum corneum faster than it can regenerate. Over time this leads to chronic dryness, micro-tears, and post-inflammatory hyperpigmentation along friction lines.

Ayurveda addresses these challenges through the concept of 'bala' — building the inherent strength and resilience of the skin rather than simply treating symptoms after they appear. Herbs like neem and turmeric manage microbial balance, while ingredients such as Kumkumadi tailam support cell regeneration and barrier repair. Adaptogens like ashwagandha reduce cortisol-linked inflammation that spikes during hard training sessions.

The principle is not to fight what the body does — sweating and moving are healthy — but to support the skin so it can recover rapidly and maintain its integrity through repeated physical stress. That is what makes Ayurvedic sport skincare categorically different from conventional formulations.`,
    category: 'sport',
    readTime: 5,
    publishedAt: '2026-03-10',
    coverImage: '/images/cat-presport-sky.jpg',
  },
  {
    slug: 'the-ancient-secret-of-kumkumadi',
    title: 'The Ancient Secret of Kumkumadi',
    excerpt:
      'Kumkumadi tailam has been central to Ayurvedic skin practice for over a thousand years. Understanding why it works reveals how ancient physicians intuited what modern dermatology is only now confirming.',
    content: `Kumkumadi tailam — sometimes called the golden elixir of Ayurveda — appears in classical texts including the Ashtanga Hridayam, one of the foundational treatises of Ayurvedic medicine. The formulation is attributed to the eighth-century scholar Vagbhata, though its roots likely stretch further still, into a tradition of oral knowledge that predates written Sanskrit medicine by centuries.

The name derives from kumkuma, the Sanskrit term for saffron (Crocus sativus), which forms the cornerstone ingredient. True Kumkumadi tailam contains between 20 and 26 ingredients — all infused into a base of sesame oil through a slow-heat extraction process called 'taila paka' that can take several days. The process matters: heat-cycling draws fat-soluble compounds out of the plant material and into the oil, creating a far more bioavailable complex than any cold extraction can achieve.

Saffron itself is a remarkable skin active. Its primary carotenoid compounds — crocin and crocetin — are potent antioxidants that inhibit melanin synthesis by down-regulating tyrosinase, the enzyme responsible for pigmentation. Clinical trials have found measurable improvements in uneven skin tone, fine lines, and luminosity with consistent saffron application over 8 to 12 weeks.

Other key ingredients in the traditional formulation include sandalwood (Santalum album), which is anti-inflammatory and supports wound healing; lotus extract (Nelumbo nucifera), rich in flavonoids that brighten and protect; licorice root (Glycyrrhiza glabra), a proven hyperpigmentation inhibitor; and turmeric (Curcuma longa), whose curcumin compound has been extensively studied for its anti-inflammatory and antimicrobial properties.

For active skin specifically, Kumkumadi addresses the post-sport recovery phase. After training, the skin is in a mild inflammatory state — elevated cortisol, disrupted barrier, oxidative stress from free radical accumulation. The antioxidant load in Kumkumadi tailam supports rapid cellular recovery. Applied at night, the oil penetrates the stratum corneum and delivers active compounds to the living layers of the epidermis while the body's natural repair cycle is at its peak.

Modern extraction technology now allows Thavare to capture the full bioactive spectrum of Kumkumadi in stable, non-greasy formulations that were not possible with traditional methods alone. The science is new. The wisdom behind it is ancient.`,
    category: 'ayurveda',
    readTime: 6,
    publishedAt: '2026-03-22',
    coverImage: '/images/cat-recovery-kumkumadi.jpg',
  },
  {
    slug: 'pre-and-post-workout-skincare-complete-guide',
    title: 'Pre and Post Workout Skincare: A Complete Guide',
    excerpt:
      'Most people know to cleanse after a workout, but the steps before and the window immediately after exercise are where real skin protection and recovery happen.',
    content: `The single biggest skincare mistake active people make is treating their routine as an afterthought — something to rush through before heading out or collapsing after a session. The reality is that a structured approach to pre and post workout skincare makes a measurable difference not just in how your skin looks, but in how well it recovers and how much slower it ages under the repeated stress of physical activity.

Pre-workout: protect the barrier first. The goal before exercise is to create a physical and biochemical defence layer, not to apply heavy moisturisers that will clog pores and trap heat. Begin with a gentle cleanse to remove overnight product residue and surface oils. Next, apply a lightweight antioxidant serum — vitamin C or a plant-derived equivalent — to neutralise free radicals generated by UV exposure and metabolic activity during your session. Follow with a broad-spectrum, sweat-resistant SPF. From an Ayurvedic perspective, sandalwood-based formulations are ideal pre-sport because sandalwood has proven cooling properties that reduce heat-related inflammation in the skin.

Avoid heavy face oils, thick creams, or pore-occluding products in the pre-workout step. These trap heat during exercise, expand pores, and can accelerate bacterial growth in the presence of sweat.

During activity: where possible, avoid touching your face. Hands carry bacteria, and skin that is warm, slightly compromised, and moist from sweat is highly susceptible to transfer. If you need to wipe sweat, use a clean cloth with a gentle dabbing motion rather than dragging across the skin.

Post-workout: the 20-minute window matters. Skin temperature remains elevated for 15 to 20 minutes after activity. During this window, the increased blood flow and slightly open pores create an optimal environment for active ingredient absorption. Cleanse with a pH-balanced, non-stripping wash immediately after exercise. Neem-based cleansers are ideal here — antibacterial without being harsh. Immediately follow with a lightweight hydrating toner or essence to replenish moisture lost through sweat.

Once skin has cooled, apply a targeted repair product — a Kumkumadi-based oil works well for the face, while a body lotion with turmeric and ashwagandha soothes inflammation in larger muscle zones. The evening routine should include a restorative oil or barrier cream to support overnight recovery.

Consistency is everything. A two-step rushed routine done reliably after every session outperforms the most sophisticated protocol applied sporadically.`,
    category: 'skincare',
    readTime: 6,
    publishedAt: '2026-04-01',
    coverImage: '/images/editorial-kumkumadi-hand.jpg',
  },
  {
    slug: 'neem-natures-most-powerful-antibacterial',
    title: "Neem: Nature's Most Powerful Antibacterial",
    excerpt:
      "Neem has been used in Ayurvedic medicine for over 4,000 years. For sweat-prone, active skin, its antibacterial and anti-inflammatory properties are more relevant today than ever.",
    content: `Neem (Azadirachta indica) occupies a unique position in the Ayurvedic pharmacopoeia. Known in Sanskrit as 'sarva roga nivarini' — the universal healer of all ailments — neem has been used in Indian traditional medicine for skin conditions, immune support, and antimicrobial protection since at least 2000 BCE. Archaeological evidence from the Indus Valley civilisation suggests neem was in active use even earlier, embedded in a culture of preventive botanical medicine that predates most known medical traditions.

The antibacterial activity of neem is now comprehensively documented in peer-reviewed literature. The primary active compounds — nimbidin, nimbidol, nimbolide, and gedunin — work through multiple mechanisms simultaneously. They disrupt bacterial cell membrane integrity, inhibit bacterial enzyme activity, and block the adhesion proteins that allow pathogens to bind to skin tissue. This multi-pathway action is why bacteria have a significantly harder time developing resistance to neem than they do to single-compound synthetic antibiotics.

For active skin, the relevance is direct. Sweat itself is sterile — it is the interaction between sweat and the skin microbiome that creates the conditions for bacterial overgrowth. Staphylococcus aureus and Cutibacterium acnes (formerly Propionibacterium acnes) are the two species most commonly associated with post-workout breakouts and folliculitis. Clinical studies have confirmed neem's efficacy against both. One 2021 study found neem leaf extract inhibited S. aureus biofilm formation by over 80% at concentrations achievable in topical formulations.

Beyond antibacterial action, neem is strongly anti-inflammatory. Nimbolide in particular has been shown to inhibit NFkB, a central regulatory protein in the inflammatory cascade. For athletes dealing with heat rash, folliculitis, or friction-induced dermatitis, this mechanism provides targeted relief without the side effects associated with prolonged corticosteroid use.

From an Ayurvedic constitutional perspective, neem is classified as tikta (bitter) and cooling in nature, making it particularly suited for Pitta-type skin — which tends to be reactive, heat-prone, and inflammation-susceptible. Coincidentally, this profile maps almost exactly onto the physiological state of skin under sustained athletic stress.

At Thavare, neem is used in cleansing formulations because the post-workout cleansing step is where its properties are most precisely needed — immediately after sweat exposure, on warm, open-pored skin, at the peak of microbial vulnerability.`,
    category: 'ayurveda',
    readTime: 5,
    publishedAt: '2026-04-08',
    coverImage: '/images/editorial-bodywash-seeds.jpg',
  },
  {
    slug: 'how-to-build-a-3-step-sport-skincare-routine',
    title: 'How to Build a 3-Step Sport Skincare Routine',
    excerpt:
      'You do not need a 10-step regimen. For active people with limited time, three well-chosen steps — done consistently — deliver better results than a complex routine skipped half the time.',
    content: `The wellness industry has a habit of overcomplicating skincare. Endless serums, layering protocols, and multi-step regimens that take 20 minutes to execute are impractical for anyone with a training schedule, a job, and a life. The good news is that from a clinical perspective, the marginal benefit of steps four through ten is small compared to consistently executing three core actions.

Here is the minimalist framework.

Step One: Cleanse with intent (morning + post-workout). Choose a gentle, pH-balanced face wash with antibacterial actives. Neem-based formulations work well because they manage the post-sweat microbial environment without over-stripping the skin's natural oils. Hot water is not your ally here — lukewarm water preserves more of the acid mantle. This step should take 60 to 90 seconds. Do not rush it, but do not overcomplicate it. Morning cleansing removes overnight product residue and prepares skin for SPF. Post-workout cleansing is the most important application of this step: you are removing sweat, bacteria, and environmental particulate before they can settle into open pores.

Step Two: Protect in the morning. This means SPF, every single day. For active people, sport-formula SPF — sweat-resistant, non-comedogenic, broad-spectrum UVA and UVB — is non-negotiable. Apply it as the final step before you leave the house or begin outdoor training. Ayurvedic formulations built on a base of sandalwood or aloe vera alongside SPF actives offer the added benefit of skin-cooling and anti-inflammatory properties that generic SPF lacks. Reapply every 90 minutes of outdoor activity.

Step Three: Recover at night. The overnight window is when skin completes the majority of its cellular repair cycle, governed by growth hormone release during deep sleep. This is the right time for a restorative oil or richer barrier treatment. Kumkumadi-based products are ideal — their antioxidant load supports the natural repair process, and the saffron and sandalwood complex addresses hyperpigmentation and inflammation simultaneously. Two to three drops warmed between the palms and pressed gently into clean skin is sufficient. You do not need to massage extensively; absorption is primarily passive.

The broader principle is this: Ayurveda does not pursue complexity for its own sake. It pursues precision — the right ingredient, at the right time, in the right concentration. Three steps, done with intention after every session, will outperform the most elaborate routine applied inconsistently.`,
    category: 'wellness',
    readTime: 5,
    publishedAt: '2026-04-10',
    coverImage: '/images/cat-daily-sunblock-wall.jpg',
  },
];
