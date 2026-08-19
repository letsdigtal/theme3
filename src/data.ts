export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: 'Cleanse' | 'Treat' | 'Seal' | 'Body';
  price: number;
  compareAt?: number;
  size: string;
  altSize?: { label: string; price: number };
  rating: number;
  reviews: number;
  badge?: 'Bestseller' | 'New';
  concerns: string[];
  image: string;
  claims: string[];
  description: string;
  ingredients: string;
  howTo: string[];
};

export const IMG = {
  cleanser:
    'https://image.qwenlm.ai/generated-images/905e3c17-ed6d-4051-8c45-92be8b804c91/_result.png',
  serum:
    'https://image.qwenlm.ai/generated-images/07e2913c-0e12-47e5-8258-5a7e9eabeedb/_result.png',
  cream:
    'https://image.qwenlm.ai/generated-images/44d22a2e-e849-47ed-a50d-2e5b302fe8ef/_result.png',
  lotion:
    'https://image.qwenlm.ai/generated-images/31eea181-5df6-4ad8-8d5e-bd1445752cb6/_result.png',
  balm:
    'https://image.qwenlm.ai/generated-images/2a83562a-4377-449e-ab66-9d6e5c02bdba/_result.png',
  mist:
    'https://image.qwenlm.ai/generated-images/3015fc0f-565b-4805-8bb5-e03ad92a23de/_result.png',
  texture:
    'https://image.qwenlm.ai/generated-images/cc6a31f8-140f-49ad-95da-c23aab7ecea9/_result.png',
  lifestyle:
    'https://image.qwenlm.ai/generated-images/5d7d536d-27b2-496b-86b1-79529fb354f8/_result.png',
  before:
    'https://image.qwenlm.ai/generated-images/51eba972-ef53-480b-9095-ff9cde81e8cb/_result.png',
  after:
    'https://image.qwenlm.ai/generated-images/6473e149-23ff-4e6d-a243-3b6ad8a48abd/_result.png',
};

export const products: Product[] = [
  {
    id: 'cleanser',
    name: 'Oat Milk Cream Cleanser',
    tagline: 'A cushiony cleanse that never squeaks',
    category: 'Cleanse',
    price: 28,
    size: '5 fl oz / 150 ml',
    altSize: { label: '8.5 fl oz / 250 ml', price: 39 },
    rating: 4.8,
    reviews: 412,
    badge: 'Bestseller',
    concerns: ['Dryness', 'Tightness'],
    image: IMG.cleanser,
    claims: ['pH-balanced at 5.2', 'Soap- & sulfate-free', 'Preserves natural ceramides'],
    description:
      'A milky, cushion-soft cleanser that dissolves the day — SPF, city film, makeup — while leaving your barrier exactly where it should be. Colloidal oat calms on contact; a triple-ceramide complex cleans without ever stripping.',
    ingredients:
      'Water, Colloidal Oatmeal (2%), Glycerin, Caprylic/Capric Triglyceride, Ceramide NP, Ceramide AP, Ceramide EOP, Squalane, Panthenol, Sodium Hyaluronate, Xanthan Gum, Phytosphingosine, Cholesterol, Sodium Lauroyl Lactylate, Carbomer, Ethylhexylglycerin.',
    howTo: [
      'Massage a coin-sized amount onto damp skin for 30–60 seconds.',
      'Rinse with lukewarm water — never hot.',
      'Follow with Barrier Reset Serum on still-damp skin.',
    ],
  },
  {
    id: 'serum',
    name: 'Barrier Reset Serum',
    tagline: '5 ceramides + multi-weight hyaluronic',
    category: 'Treat',
    price: 42,
    size: '1 fl oz / 30 ml',
    rating: 4.9,
    reviews: 967,
    badge: 'Bestseller',
    concerns: ['Redness', 'Dryness', 'Eczema-prone'],
    image: IMG.serum,
    claims: ['Rebuilds lipid barrier in 14 days', '3 weights of hyaluronic acid', 'Fragrance- & silicone-free'],
    description:
      'The repair step. A liquid-gel serum that layers skin-identical ceramides 1, 3 and 6-II with cholesterol and fatty acids in the exact 3:1:1 ratio your barrier craves — plus multi-weight hyaluronic acid that hydrates every layer of the surface.',
    ingredients:
      'Water, Glycerin, Propanediol, Ceramide NP, Ceramide AP, Ceramide EOP, Ceramide NS, Ceramide EOS, Cholesterol, Oleic Acid, Sodium Hyaluronate, Sodium Hyaluronate Crosspolymer, Panthenol, Allantoin, Caprylyl Glycol, Citric Acid.',
    howTo: [
      'Press 3–4 drops into damp skin after cleansing.',
      'Wait ~60 seconds before layering your cream.',
      'Use morning and night — consistency beats intensity.',
    ],
  },
  {
    id: 'cream',
    name: 'Hydra Veil Cream',
    tagline: '48-hour moisture, weightless finish',
    category: 'Seal',
    price: 38,
    compareAt: 44,
    size: '1.7 fl oz / 50 ml',
    altSize: { label: '3.4 fl oz / 100 ml', price: 62 },
    rating: 4.9,
    reviews: 1284,
    badge: 'Bestseller',
    concerns: ['Dryness', 'Tightness', 'Redness'],
    image: IMG.cream,
    claims: ['48h clinically-measured hydration', 'Squalane + shea, zero grease', 'Safe for face, folds & flare zones'],
    description:
      'Our most-loved formula. A cloud-dense cream that melts into a breathable veil — squalane and shea lock water in for a full 48 hours while colloidal oat quietly turns down the itch-and-scratch cycle.',
    ingredients:
      'Water, Squalane (10%), Butyrospermum Parkii (Shea) Butter, Glycerin, Colloidal Oatmeal (1%), Cetearyl Alcohol, Ceramide NP, Panthenol, Sodium PCA, Bisabolol, Tocopherol, Glyceryl Stearate, Sodium Stearoyl Glutamate, Xanthan Gum, Ethylhexylglycerin.',
    howTo: [
      'Warm a pearl-sized amount between fingertips.',
      'Press — don’t rub — over face and neck as the final step.',
      'In flare zones, apply a second thin layer at night.',
    ],
  },
  {
    id: 'lotion',
    name: 'Calm Cloud Body Lotion',
    tagline: 'Head-to-toe barrier care',
    category: 'Body',
    price: 32,
    size: '8 fl oz / 236 ml',
    rating: 4.7,
    reviews: 388,
    concerns: ['Dryness', 'Eczema-prone'],
    image: IMG.lotion,
    claims: ['Absorbs in under 60 seconds', 'Fragrance-free, dye-free', 'Derm-tested on eczema-prone skin'],
    description:
      'Everything your face gets, scaled for the rest of you. A fast-absorbing daily lotion with the same oat–ceramide core, made for tight shins, rough elbows and the 3 p.m. full-body itch.',
    ingredients:
      'Water, Glycerin, Squalane, Colloidal Oatmeal (1%), Caprylic/Capric Triglyceride, Cetearyl Alcohol, Ceramide NP, Panthenol, Allantoin, Tocopherol, Glyceryl Stearate, Xanthan Gum, Ethylhexylglycerin, Citric Acid.',
    howTo: [
      'Apply within 3 minutes of showering, on towel-blotted skin.',
      'Use downward strokes toward the heart for rough patches.',
      'Reapply to flare zones as often as needed.',
    ],
  },
  {
    id: 'balm',
    name: 'Rescue Repair Balm',
    tagline: 'Spot-treat flare-ups overnight',
    category: 'Seal',
    price: 26,
    size: '0.5 oz / 15 g',
    rating: 4.8,
    reviews: 203,
    badge: 'New',
    concerns: ['Redness', 'Eczema-prone'],
    image: IMG.balm,
    claims: ['Occlusive oat + zinc oxide shield', 'Water-resistant for 4 hours', 'Tiny tin, travels anywhere'],
    description:
      'The emergency exit. A waterless, occlusive balm that seals cracked corners, wind-burned cheeks and overnight flare zones with colloidal oat, zinc oxide and a cushion of plant waxes — no sting, no steroids.',
    ingredients:
      'Helianthus Annuus (Sunflower) Seed Oil, Beeswax, Zinc Oxide (5%), Colloidal Oatmeal (3%), Butyrospermum Parkii (Shea) Butter, Calendula Officinalis Flower Extract, Bisabolol, Tocopherol.',
    howTo: [
      'Warm a rice-grain amount until it turns to oil.',
      'Pat onto dry, irritated zones as the very last step.',
      'Reapply over makeup during the day if needed.',
    ],
  },
  {
    id: 'mist',
    name: 'Dew Reset Mist',
    tagline: 'Instant comfort, anywhere',
    category: 'Treat',
    price: 24,
    size: '3.4 fl oz / 100 ml',
    rating: 4.6,
    reviews: 154,
    concerns: ['Tightness', 'Redness'],
    image: IMG.mist,
    claims: ['Ultra-fine continuous spray', 'Panthenol + ectoin comfort complex', 'Use over or under makeup'],
    description:
      'A cloud in a bottle. An ultra-fine mist of panthenol, ectoin and trace minerals that resets tight, overheated skin in one spritz — at your desk, post-flight, mid-retinol-week.',
    ingredients:
      'Water, Panthenol (2%), Ectoin (1%), Glycerin, Sodium PCA, Magnesium PCA, Zinc PCA, Polyglyceryl-4 Caprate, Citric Acid, Ethylhexylglycerin.',
    howTo: [
      'Hold 20 cm from face, eyes closed, and mist twice.',
      'Press in with palms or let air-dry.',
      'Layer under cream to trap the extra water.',
    ],
  },
];

export const ritualProducts = ['cleanser', 'serum', 'cream'] as const;
export const ritualBundlePrice = 96;
export const ritualCompareAt = 108;

export const FREE_SHIPPING_THRESHOLD = 50;

export type Review = {
  name: string;
  skin: string;
  rating: number;
  title: string;
  body: string;
  productId: string;
  date: string;
};

export const reviews: Review[] = [
  {
    name: 'Maya R.',
    skin: 'Eczema-prone',
    rating: 5,
    title: 'First winter in years without the face-flakes',
    body: 'I’ve rotated through every “gentle” line on the market. Two weeks on the ritual and the tight, papery patches around my mouth are just… gone. Nothing stung, nothing smelled like anything. Bliss.',
    productId: 'cream',
    date: 'Jan 2026',
  },
  {
    name: 'Jonah P.',
    skin: 'Very dry',
    rating: 5,
    title: 'My derm asked what I changed',
    body: 'Bought the serum on a whim after a flare. My dermatologist literally asked at my next appointment what I’d switched to. The 3:1:1 ceramide ratio isn’t marketing — my barrier feels like new drywall.',
    productId: 'serum',
    date: 'Dec 2025',
  },
  {
    name: 'Priya S.',
    skin: 'Reactive / rosacea',
    rating: 5,
    title: 'Zero sting. Zero. Sting.',
    body: 'Almost everything burns my rosacea skin — even “for sensitive skin” stuff. The cleanser and mist are the first products in a decade that feel like nothing at all, in the best way.',
    productId: 'cleanser',
    date: 'Jan 2026',
  },
  {
    name: 'Ellen K.',
    skin: 'Mature, dry',
    rating: 4,
    title: 'Cloud is the right word',
    body: 'Calm Cloud is the only body lotion my itchy shins have accepted since my 20s. Docking one star only because I wish the tube were bigger — I’m going through it fast.',
    productId: 'lotion',
    date: 'Nov 2025',
  },
  {
    name: 'Tomás V.',
    skin: 'Dry, bearded',
    rating: 5,
    title: 'The balm lives in my coat pocket now',
    body: 'Windburn under the beard line used to crack every January. A rice-grain of the Rescue Balm at night and it seals like nothing I’ve tried. Tin is tiny but you need so little.',
    productId: 'balm',
    date: 'Jan 2026',
  },
  {
    name: 'Aisha B.',
    skin: 'Combo-dehydrated',
    rating: 5,
    title: 'Desk essential, honestly',
    body: 'The mist is finer than any I’ve used — it actually lands as dew, not droplets. One spritz over makeup at 3 p.m. and my skin stops feeling like parchment. Bought a second for the bathroom.',
    productId: 'mist',
    date: 'Dec 2025',
  },
];

export const concerns = [
  {
    name: 'Dryness',
    note: 'Flaking, rough patches, makeup that sits badly',
    image: IMG.texture,
    size: 'large',
  },
  {
    name: 'Redness',
    note: 'Flushing, reactive heat, post-flare marks',
    image: IMG.serum,
    size: 'small',
  },
  {
    name: 'Tightness',
    note: 'That 3 p.m. stretched, papery feeling',
    image: IMG.mist,
    size: 'small',
  },
  {
    name: 'Eczema-prone',
    note: 'Itch–scratch cycles and flare zones',
    image: IMG.balm,
    size: 'large',
  },
];

export const faqs = [
  {
    group: 'Formulas',
    q: 'Are your products fragrance-free?',
    a: '100% — no synthetic fragrance, no “parfum”, no essential-oil blends masquerading as fragrance. Every formula is also dye-free, paraben-free, sulfate-free and steroid-free.',
  },
  {
    group: 'Formulas',
    q: 'I have eczema. Is this line safe for me?',
    a: 'Our formulas are dermatologist-formulated and tested on eczema-prone panels, and we avoid the most common trigger ingredients. That said, eczema is deeply personal — patch-test on the inner arm for 48 hours and loop in your dermatologist for anything beyond mild, occasional flares.',
  },
  {
    group: 'Formulas',
    q: 'Can I use Calma alongside retinol or exfoliating acids?',
    a: 'Yes — that’s what we’re for. Use your active in the evening, then layer Barrier Reset Serum and Hydra Veil Cream over it to buffer irritation. On retinol weeks, many customers pause acids entirely and lean on the oat cleanser.',
  },
  {
    group: 'Formulas',
    q: 'Is everything vegan and cruelty-free?',
    a: 'Everything is cruelty-free (Leaping Bunny certified). Five of six formulas are vegan; the Rescue Repair Balm contains sustainably sourced beeswax, which we keep for its unmatched occlusive seal.',
  },
  {
    group: 'Orders & shipping',
    q: 'How fast do orders ship?',
    a: 'Orders placed before 2 p.m. ET on weekdays leave our Portland warehouse the same day. Standard delivery takes 2–4 business days; expedited 1–2 day options are available at checkout.',
  },
  {
    group: 'Orders & shipping',
    q: 'When is shipping free?',
    a: 'Standard U.S. shipping is free on every order over $50 — you’ll see a live progress bar in your bag. Orders under $50 ship flat-rate at $5.95.',
  },
  {
    group: 'Orders & shipping',
    q: 'What is the 60-day guarantee?',
    a: 'Use any product for up to 60 days. If your skin isn’t happier, email us and we’ll refund the full price — no return label, no restocking fee, no interrogation. Keep the jar or pass it to a friend.',
  },
  {
    group: 'Skin concerns',
    q: 'How long until I see results?',
    a: 'Comfort is immediate — most people feel less tightness after the very first cleanse. Measurable barrier repair takes longer: in our 28-day consumer study, 92% of participants reported visibly calmer skin by day 14 with twice-daily ritual use.',
  },
  {
    group: 'Skin concerns',
    q: 'Can I use Calma while pregnant?',
    a: 'Our formulas avoid retinoids, salicylic acid and essential oils, and are generally considered pregnancy-friendly. Always confirm with your OB or midwife, since every pregnancy is different.',
  },
  {
    group: 'Skin concerns',
    q: 'My skin feels worse in week one. Normal?',
    a: 'Occasionally, yes. When a damaged barrier starts absorbing real lipids again, some skin briefly “purges” dryness from deeper layers. It typically settles within 7–10 days of consistent use. If irritation persists past two weeks, our skin team will help you adjust.',
  },
];

export const journal = [
  {
    category: 'Ingredient science',
    title: 'Ceramides, explained like your skin depends on it',
    excerpt:
      'Your barrier is a brick wall: skin cells are the bricks, and ceramides are the mortar — roughly 50% of it by weight. When mortar crumbles, water escapes (that tight feeling) and irritants walk straight in (that red feeling). Topical ceramides work best in a 3:1:1 ratio with cholesterol and fatty acids, which is exactly why we built Barrier Reset Serum that way.',
    read: '6 min read',
    image: IMG.serum,
  },
  {
    category: 'Routines',
    title: 'The 60-second rule for reactive skin',
    excerpt:
      'Most “sensitive skin” is actually rushed skin. Sixty seconds of lukewarm — not hot — cleansing, serum pressed into damp skin within one minute, cream sealed on top before the dampness evaporates. That single habit outperforms most product switches we see.',
    read: '4 min read',
    image: IMG.cleanser,
  },
  {
    category: 'Skin school',
    title: 'Why your moisturizer stops working in winter',
    excerpt:
      'Cold air outside and furnace air inside drop ambient humidity below 30% — desert levels. Humectants like hyaluronic acid have less water to grab, so formulas that felt rich in July feel thin in January. The fix isn’t a heavier cream; it’s adding an occlusive layer and misting water back in.',
    read: '5 min read',
    image: IMG.texture,
  },
];

export const press = ['ALLURE', 'VOGUE', 'BYRDIE', 'SELF', 'HEALTHLINE', 'GOOP'];

export const alwaysIn = [
  'Ceramide complex 1·3·6-II',
  'Colloidal oat',
  'Squalane (olive)',
  'Panthenol B5',
  'Multi-weight hyaluronic',
  'Niacinamide',
  'Ectoin',
  'Zinc PCA',
];

export const neverIn = ['Fragrance', 'Essential oils', 'Dyes', 'Parabens', 'Sulfates', 'Steroids', 'Drying alcohols'];

export const ingredientIndex = [
  { name: 'Ceramides 1, 3, 6-II', role: 'Barrier mortar', source: 'Plant-fermented, skin-identical' },
  { name: 'Colloidal oat', role: 'Itch & redness calmer', source: 'FDA-recognized skin protectant' },
  { name: 'Squalane', role: 'Weightless seal', source: 'Olive-derived, 100% traceable' },
  { name: 'Panthenol (B5)', role: 'Repair accelerator', source: '2% in every leave-on formula' },
  { name: 'Multi-weight HA', role: 'Layer-by-layer hydration', source: 'Three molecular weights' },
  { name: 'Ectoin', role: 'Heat & stress shield', source: 'Fermented extremophile amino acid' },
];

export const findProduct = (id: string) => products.find((p) => p.id === id);

export const money = (n: number) => `$${n.toFixed(n % 1 === 0 ? 0 : 2)}`;
