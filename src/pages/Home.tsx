import { useMemo, useRef, useState, type FormEvent } from 'react';
import {
  concerns,
  IMG,
  journal,
  money,
  press,
  products,
  reviews,
  ritualCompareAt,
  ritualProducts,
  ritualBundlePrice,
  alwaysIn,
  neverIn,
  findProduct,
} from '../data';
import { useStore } from '../store';
import {
  ArrowRight,
  ArrowUpRight,
  AsterIcon,
  BagIcon,
  BeforeAfter,
  CheckIcon,
  ChevronDown,
  Counter,
  DropIcon,
  Marquee,
  PlusIcon,
  ProductCard,
  Reveal,
  SectionHead,
  Stars,
  XIcon,
} from '../ui';

/* ================= HERO ================= */

function Hero() {
  const { navigate, addToCart, setCartOpen } = useStore();
  const cream = findProduct('cream')!;

  return (
    <section className="relative overflow-hidden">
      {/* layered ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 right-[-12%] h-[560px] w-[560px] rounded-full border border-foam/80" />
        <div className="animate-drift absolute -top-16 right-[6%] h-[300px] w-[300px] rounded-full bg-foam/40 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-120px] h-[420px] w-[420px] rounded-full bg-aqua/10 blur-3xl" />
        <svg className="absolute left-0 top-24 h-40 w-40 text-foam/70" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          {Array.from({ length: 36 }).map((_, i) => (
            <circle key={i} cx={(i % 6) * 18 + 6} cy={Math.floor(i / 6) * 18 + 6} r="1.1" />
          ))}
        </svg>
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-16 pt-12 sm:px-8 lg:grid-cols-12 lg:gap-8 lg:pb-24 lg:pt-16">
        <div className="lg:col-span-6">
          <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.26em] text-aqua">
            <DropIcon className="w-4 h-4" />
            For dry, reactive &amp; eczema-prone skin
          </p>

          <h1 className="mt-6 font-display text-[clamp(2.9rem,7vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.01em] text-ink">
            <span className="hero-line" style={{ '--d': '80ms' } as React.CSSProperties}>
              <span>Skin that finally</span>
            </span>
            <span className="hero-line" style={{ '--d': '220ms' } as React.CSSProperties}>
              <span>
                feels <em className="font-light italic text-aqua">at home.</em>
              </span>
            </span>
          </h1>

          <p className="mt-7 max-w-md text-[17px] leading-relaxed text-ink/70">
            Calma rebuilds your moisture barrier with skin-identical ceramides, colloidal oat and squalane —
            fragrance-free formulas that calm flare-ups in days, not months.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-5">
            <button
              className="btn-press group flex items-center gap-3 rounded-full bg-ink py-4 pl-7 pr-5 text-[12px] font-bold uppercase tracking-[0.2em] text-ice hover:bg-aqua"
              onClick={() => navigate('shop')}
            >
              Shop bestsellers
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <button
              className="btn-press group flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-ink/75 hover:text-aqua"
              onClick={() => document.getElementById('ritual')?.scrollIntoView({ behavior: 'smooth' })}
            >
              The 3-step ritual
              <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="flex items-center gap-2">
              <Stars rating={4.9} />
              <span className="text-sm font-semibold text-ink">4.9</span>
              <span className="text-sm text-ink/55">· 3,214 verified reviews</span>
            </span>
            <span className="hidden h-4 w-px bg-foam sm:block" />
            <span className="flex items-center gap-2 text-sm text-ink/55">
              <CheckIcon className="w-4 h-4 text-aqua" /> 60-day happy-skin guarantee
            </span>
          </div>
        </div>

        {/* right: arch portrait + floating chips */}
        <div className="relative lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-[8px] border border-foam/80 bg-mist shadow-[0_30px_80px_rgba(12,37,48,0.18)]">
              <img
                src={IMG.lifestyle}
                alt="Woman with calm, hydrated skin in soft water mist"
                className="animate-kenburns aspect-[4/5] w-full object-cover"
              />
            </div>

            {/* rotating badge */}
            <div className="absolute -left-7 bottom-16 hidden h-32 w-32 sm:block lg:-left-14">
              <svg viewBox="0 0 120 120" className="animate-spin-slow h-full w-full" aria-hidden="true">
                <defs>
                  <path id="badge-circle" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
                </defs>
                <text className="fill-ink" style={{ fontSize: '10.5px', letterSpacing: '2.6px', fontWeight: 700 }}>
                  <textPath href="#badge-circle">DERMATOLOGIST FORMULATED · CLINICALLY TESTED ·</textPath>
                </text>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center">
                <DropIcon className="w-7 h-7 text-aqua" />
              </span>
            </div>

            {/* floating product chip */}
            <div className="animate-floaty absolute -right-3 top-14 flex items-center gap-3 rounded-[4px] border border-foam/70 bg-cloud/95 p-2.5 pr-3.5 shadow-[0_18px_44px_rgba(12,37,48,0.16)] backdrop-blur-sm sm:-right-8">
              <img src={cream.image} alt="" className="h-14 w-11 rounded-[3px] object-cover" />
              <div>
                <p className="text-[13px] font-bold leading-tight text-ink">Hydra Veil Cream</p>
                <p className="mt-0.5 text-xs text-ink/55">{money(cream.price)} · Bestseller</p>
              </div>
              <button
                className="btn-press flex h-9 w-9 items-center justify-center rounded-full bg-ink text-ice hover:bg-aqua"
                onClick={() => {
                  addToCart('cream');
                  setCartOpen(true);
                }}
                aria-label="Add Hydra Veil Cream to bag"
              >
                <PlusIcon className="w-4 h-4" />
              </button>
            </div>

            {/* clinical stat chip */}
            <div className="absolute -bottom-6 right-6 rounded-[4px] bg-deep px-5 py-4 text-ice shadow-[0_18px_44px_rgba(12,37,48,0.3)]">
              <p className="font-display text-3xl font-semibold text-aqua">
                <Counter to={92} suffix="%" />
              </p>
              <p className="mt-0.5 max-w-[150px] text-[11px] leading-snug text-foam/80">saw calmer skin within 14 days*</p>
            </div>
          </div>
        </div>
      </div>

      {/* press strip */}
      <div className="relative border-y border-foam/80 bg-cloud/70">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 sm:justify-between sm:px-8">
          <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-ink/45">As featured in</span>
          {press.map((p) => (
            <span key={p} className="font-display text-lg font-semibold tracking-[0.14em] text-ink/35 transition-colors hover:text-ink/70">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= INGREDIENT MARQUEE ================= */

function IngredientBand() {
  const words = ['Ceramides', 'Colloidal oat', 'Squalane', 'Panthenol B5', 'Hyaluronic', 'Niacinamide', 'Ectoin', 'Zinc PCA'];
  return (
    <section className="bg-aqua text-ice">
      <Marquee duration={32} className="py-4">
        {words.map((w) => (
          <span key={w} className="flex items-center">
            <span className="px-7 font-display text-xl italic tracking-wide whitespace-nowrap sm:text-2xl">{w}</span>
            <AsterIcon className="w-4 h-4 text-deep/60" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ================= SHOP BY CONCERN ================= */

function Concerns() {
  const { navigate } = useStore();
  const counts = (name: string) => products.filter((p) => p.concerns.includes(name)).length;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHead
        eyebrow="Shop by concern"
        title={
          <>
            Tell us what hurts. <em className="italic text-aqua">We’ll do the rest.</em>
          </>
        }
        copy="Every formula starts from a symptom — not a trend. Find the routine your barrier has been asking for."
      />
      <div className="grid gap-4 md:grid-cols-12">
        {concerns.map((c, i) => (
          <Reveal
            key={c.name}
            delay={i * 90}
            className={c.size === 'large' ? 'md:col-span-7' : 'md:col-span-5'}
          >
            <button
              className="btn-press group relative block h-64 w-full overflow-hidden rounded-[4px] text-left sm:h-80"
              onClick={() => navigate('shop', { filter: c.name, filterType: 'concern' })}
            >
              <img
                src={c.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep/85 via-deep/25 to-transparent transition-opacity duration-500 group-hover:from-deep/95" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-foam/70">
                  Concern 0{i + 1} · {counts(c.name)} products
                </p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <h3 className="font-display text-3xl font-medium text-ice sm:text-4xl">{c.name}</h3>
                    <p className="mt-1.5 max-w-xs text-sm text-foam/80">{c.note}</p>
                  </div>
                  <span className="mb-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-foam/40 text-ice transition-all duration-400 group-hover:border-aqua group-hover:bg-aqua">
                    <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ================= BESTSELLERS ================= */

function Bestsellers() {
  const { navigate } = useStore();
  const featured = useMemo(() => [...products].sort((a, b) => b.reviews - a.reviews).slice(0, 4), []);

  return (
    <section className="bg-mist/70 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="The edit"
          title={
            <>
              Bestsellers, <em className="italic text-aqua">back in stock.</em>
            </>
          }
          copy="The four formulas our customers reorder before they run out — and the reason our waitlist exists."
          action={
            <button
              className="btn-press group flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-ink hover:text-aqua"
              onClick={() => navigate('shop')}
            >
              View all six <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          }
        />
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <ProductCard product={p} onOpen={(id) => navigate('product', { slug: id })} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= CLINICAL PROOF ================= */

function Proof() {
  const stats = [
    { value: 92, suffix: '%', label: 'saw visibly calmer skin in 14 days*' },
    { value: 48, suffix: 'h', label: 'of continuous, measured hydration*' },
    { value: 0, suffix: '', label: 'fragrance, dyes, steroids — ever', decimals: 0 },
    { value: 3.2, suffix: 'k', label: 'five-star reviews and counting', decimals: 1 },
  ];

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <BeforeAfter before={IMG.before} after={IMG.after} beforeLabel="Week 0" afterLabel="Week 4" />
          <p className="mt-4 flex items-center gap-2 text-xs text-ink/50">
            <AsterIcon className="w-3 h-3 text-aqua" />
            Drag to compare — average result from a 28-day consumer study, Hydra Veil Cream used twice daily.
          </p>
        </Reveal>
        <div>
          <SectionHead
            eyebrow="Clinically measured"
            title={
              <>
                Proof you can feel <em className="italic text-aqua">in days.</em>
              </>
            }
            copy="We don’t do “instant glow” marketing. We do corneometer readings, dermatologist grading and studies you can actually read — because calm skin is measurable."
          />
          <div className="grid grid-cols-2 gap-x-8 gap-y-10">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100}>
                <p className="font-display text-5xl font-medium text-ink sm:text-6xl">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-2 max-w-[200px] text-sm leading-snug text-ink/60">{s.label}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 text-[11px] text-ink/40">*Consumer &amp; instrumental studies, 112 participants, 2025. Full reports available on request.</p>
        </div>
      </div>
    </section>
  );
}

/* ================= FORMULA (dark) ================= */

function FormulaStandards() {
  const { navigate } = useStore();
  return (
    <section className="relative overflow-hidden bg-deep py-20 text-ice lg:py-28">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-foam/10" />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="relative lg:col-span-5">
          <div className="overflow-hidden rounded-[4px]">
            <img
              src={IMG.texture}
              alt="Macro swirl of Hydra Veil Cream texture"
              loading="lazy"
              className="aspect-[8/5] w-full object-cover transition-transform duration-700 hover:scale-[1.04]"
            />
          </div>
          <span className="absolute -bottom-5 left-6 rounded-[4px] bg-aqua px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ice shadow-lg">
            pH 5.2 — matched to skin
          </span>
        </Reveal>
        <div className="lg:col-span-7">
          <SectionHead
            tone="dark"
            eyebrow="Inside every formula"
            title={
              <>
                Boring labels. <em className="italic text-aqua">On purpose.</em>
              </>
            }
            copy="Short INCI lists you can read out loud. Every ingredient earns its place or gets cut — that’s why our formulas average 14 ingredients, not 40."
          />
          <div className="flex flex-wrap gap-2.5">
            {alwaysIn.map((ing) => (
              <span
                key={ing}
                className="rounded-full border border-foam/25 px-4 py-2 text-[13px] font-semibold text-foam transition-colors duration-300 hover:border-aqua hover:text-aqua"
              >
                {ing}
              </span>
            ))}
          </div>
          <div className="mt-10 border-t border-foam/15 pt-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-foam/50">Never in the bottle</p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
              {neverIn.map((n) => (
                <li key={n} className="flex items-center gap-2.5 text-sm text-foam/75">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-peach/20 text-peach">
                    <XIcon className="w-3 h-3" />
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
          <button
            className="btn-press group mt-10 flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-aqua hover:text-ice"
            onClick={() => navigate('about', { slug: 'ingredients' })}
          >
            Meet the ingredient index
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================= RITUAL (sticky two-column) ================= */

function Ritual() {
  const { navigate, addMany, addToCart, setCartOpen } = useStore();
  const steps = ritualProducts.map((id) => findProduct(id)!);

  return (
    <section id="ritual" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-20 sm:px-8 lg:py-28">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHead
            eyebrow="The ritual"
            title={
              <>
                Three steps. <em className="italic text-aqua">Zero guesswork.</em>
              </>
            }
            copy="Cleanse, treat, seal. Sixty seconds morning and night — designed by dermatologists, sequenced so each layer makes the next one work harder."
          />
          <Reveal delay={120}>
            <div className="rounded-[6px] border border-foam bg-cloud p-6 shadow-[0_18px_50px_rgba(12,37,48,0.08)]">
              <div className="flex items-center gap-3">
                {steps.map((s) => (
                  <img key={s.id} src={s.image} alt="" className="h-16 w-13 rounded-[3px] object-cover" style={{ width: 52, height: 64 }} />
                ))}
                <div className="ml-2">
                  <p className="font-display text-xl font-medium text-ink">The Full Ritual</p>
                  <p className="text-sm text-ink/55">
                    <span className="font-bold text-ink">{money(ritualBundlePrice)}</span>{' '}
                    <span className="line-through">{money(ritualCompareAt)}</span> · save {money(ritualCompareAt - ritualBundlePrice)}
                  </p>
                </div>
              </div>
              <button
                className="btn-press mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-ice hover:bg-aqua"
                onClick={() => {
                  addMany([...ritualProducts]);
                  setCartOpen(true);
                }}
              >
                <BagIcon className="w-4 h-4" /> Add the ritual — {money(ritualBundlePrice)}
              </button>
              <p className="mt-3 text-center text-[11px] uppercase tracking-[0.14em] text-ink/45">Free shipping included</p>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8">
          {steps.map((p, i) => (
            <Reveal key={p.id} delay={i * 110}>
              <article className="group grid grid-cols-[110px_1fr] gap-5 rounded-[6px] border border-foam bg-cloud p-5 transition-all duration-500 hover:-translate-y-1 hover:border-aqua/50 hover:shadow-[0_22px_60px_rgba(12,37,48,0.12)] sm:grid-cols-[160px_1fr] sm:gap-7 sm:p-7">
                <div className="overflow-hidden rounded-[4px] bg-mist">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="aspect-[4/5] h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-display text-5xl font-light text-foam sm:text-6xl">0{i + 1}</p>
                  <div className="mt-2 flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">{p.name}</h3>
                    <p className="shrink-0 text-sm font-bold text-ink">{money(p.price)}</p>
                  </div>
                  <p className="mt-1 text-sm text-ink/60">{p.tagline}</p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {p.claims.slice(0, 2).map((c) => (
                      <li key={c} className="flex items-center gap-2 text-[13px] text-ink/70">
                        <CheckIcon className="w-3.5 h-3.5 text-aqua" /> {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex items-center gap-5 pt-4">
                    <button
                      className="btn-press rounded-full bg-ink px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ice hover:bg-aqua"
                      onClick={() => addToCart(p.id)}
                    >
                      Add — {money(p.price)}
                    </button>
                    <button
                      className="link-line btn-press text-[11px] font-bold uppercase tracking-[0.16em] text-ink/60 hover:text-ink"
                      onClick={() => navigate('product', { slug: p.id })}
                    >
                      Details
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================= REVIEWS ================= */

function ReviewsRail() {
  const rail = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    rail.current?.scrollBy({ left: dir * 360, behavior: 'smooth' });
  };

  const bars = [
    { stars: 5, pct: 84 },
    { stars: 4, pct: 11 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];

  return (
    <section className="bg-mist/70 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead
          eyebrow="Loved loudly"
          title={
            <>
              3,214 reviews. <em className="italic text-aqua">4.9 stars.</em>
            </>
          }
          action={
            <div className="flex gap-2.5">
              <button
                className="btn-press flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-aqua hover:bg-aqua hover:text-ice"
                onClick={() => scroll(-1)}
                aria-label="Previous reviews"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
              </button>
              <button
                className="btn-press flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink hover:border-aqua hover:bg-aqua hover:text-ice"
                onClick={() => scroll(1)}
                aria-label="Next reviews"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          }
        />
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
          <Reveal>
            <div className="rounded-[6px] bg-deep p-7 text-ice lg:sticky lg:top-28">
              <p className="font-display text-6xl font-medium">
                4.9<span className="text-2xl text-foam/50">/5</span>
              </p>
              <div className="mt-2">
                <Stars rating={5} />
              </div>
              <p className="mt-2 text-sm text-foam/70">From 3,214 verified buyers</p>
              <div className="mt-6 flex flex-col gap-2.5">
                {bars.map((b) => (
                  <div key={b.stars} className="flex items-center gap-3 text-xs text-foam/70">
                    <span className="w-3 tabular-nums">{b.stars}</span>
                    <StarGlyph />
                    <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-foam/15">
                      <div className="h-full rounded-full bg-aqua" style={{ width: `${b.pct}%` }} />
                    </div>
                    <span className="w-8 text-right tabular-nums">{b.pct}%</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-foam/15 pt-5 text-xs leading-relaxed text-foam/60">
                96% would recommend Calma to a friend with dry, reactive skin.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div ref={rail} className="no-scrollbar -mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-2">
              {reviews.map((r) => (
                <article
                  key={r.name}
                  className="flex w-[300px] shrink-0 snap-start flex-col rounded-[6px] border border-foam bg-cloud p-6 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_60px_rgba(12,37,48,0.12)] sm:w-[340px]"
                >
                  <div className="flex items-center justify-between">
                    <Stars rating={r.rating} />
                    <span className="rounded-full bg-mist px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60">
                      {r.skin}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-medium leading-snug text-ink">“{r.title}”</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{r.body}</p>
                  <div className="mt-5 flex items-center justify-between border-t border-foam pt-4">
                    <p className="text-sm font-bold text-ink">{r.name}</p>
                    <p className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.1em] text-aqua">
                      <CheckIcon className="w-3.5 h-3.5" /> Verified buyer · {r.date}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StarGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3 fill-peach" aria-hidden="true">
      <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.6z" />
    </svg>
  );
}

/* ================= SKIN SCHOOL ================= */

function SkinSchool() {
  const { notify } = useStore();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
      <SectionHead
        eyebrow="Skin school"
        title={
          <>
            Read your skin <em className="italic text-aqua">like a derm.</em>
          </>
        }
        copy="Short, honest science from our formulation team. No fear-mongering, no 40-step routines."
      />
      <div className="grid gap-5 md:grid-cols-12">
        {journal.map((j, i) => (
          <Reveal
            key={j.title}
            delay={i * 100}
            className={i === 0 ? 'md:col-span-7' : 'md:col-span-5'}
          >
            <article
              className={`group flex h-full cursor-pointer flex-col overflow-hidden rounded-[6px] border border-foam bg-cloud transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_60px_rgba(12,37,48,0.12)] ${
                i === 0 ? '' : 'sm:flex-row'
              }`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className={`overflow-hidden ${i === 0 ? 'aspect-[16/8]' : 'aspect-[16/9] sm:aspect-auto sm:w-44 sm:shrink-0'}`}>
                <img
                  src={j.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </div>
              <div className={`flex flex-1 flex-col p-6 ${i === 0 ? 'sm:p-8' : ''}`}>
                <p className="flex items-center justify-between text-[10px] font-bold uppercase tracking-[0.2em] text-aqua">
                  {j.category} <span className="text-ink/40">{j.read}</span>
                </p>
                <h3 className="mt-3 font-display text-xl font-medium leading-snug text-ink sm:text-2xl">{j.title}</h3>
                <div
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ gridTemplateRows: open === i ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="pt-3 text-sm leading-relaxed text-ink/65">{j.excerpt}</p>
                  </div>
                </div>
                <p className="mt-auto flex items-center gap-2 pt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55 group-hover:text-aqua">
                  {open === i ? 'Close excerpt' : 'Read excerpt'}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-400 ${open === i ? 'rotate-180' : ''}`} />
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-ink/45">Full articles land in The Calm List newsletter — join from the footer.</p>
    </section>
  );
}

/* ================= NEWSLETTER BAND ================= */

function Newsletter() {
  const { notify } = useStore();
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      notify('Please enter a valid email address');
      return;
    }
    setDone(true);
  };

  return (
    <section className="relative overflow-hidden bg-aqua py-16 text-ice lg:py-20">
      <div className="pointer-events-none absolute -left-24 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full border border-ice/20" />
      <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-aquadeep/40 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal>
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.26em] text-ice/70">
            <DropIcon className="w-4 h-4" /> The Calm List
          </p>
          <h2 className="mt-4 font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
            15% off your first order, <em className="italic text-deep">plus skin science</em> that respects you.
          </h2>
        </Reveal>
        <Reveal delay={130}>
          {done ? (
            <div className="flex items-center gap-4 rounded-[6px] border border-ice/30 bg-deep/25 px-6 py-6 backdrop-blur-sm">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ice text-aqua">
                <CheckIcon className="w-6 h-6" />
              </span>
              <div>
                <p className="font-display text-xl font-medium">Welcome to the calm side.</p>
                <p className="mt-1 text-sm text-ice/80">Code <strong>CALM15</strong> is on its way to {email}.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                className="w-full rounded-full border border-ice/35 bg-deep/20 px-6 py-4 text-ice placeholder:text-ice/50 backdrop-blur-sm focus:border-ice focus:outline-none"
              />
              <button
                type="submit"
                className="btn-press shrink-0 rounded-full bg-deep px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-ice hover:bg-ink"
              >
                Get 15% off
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-ice/60">One thoughtful email a week. Unsubscribe whenever — no hard feelings.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= PAGE ================= */

export default function Home() {
  return (
    <>
      <Hero />
      <IngredientBand />
      <Concerns />
      <Bestsellers />
      <Proof />
      <FormulaStandards />
      <Ritual />
      <ReviewsRail />
      <SkinSchool />
      <Newsletter />
    </>
  );
}
