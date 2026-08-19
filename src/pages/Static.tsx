import { useEffect } from 'react';
import { IMG, faqs, ingredientIndex, neverIn, alwaysIn } from '../data';
import { useStore } from '../store';
import {
  Accordion,
  ArrowRight,
  CheckIcon,
  Counter,
  DropIcon,
  FlaskIcon,
  LeafIcon,
  PulseIcon,
  RecycleIcon,
  Reveal,
  SectionHead,
  XIcon,
} from '../ui';

/* ================= ABOUT ================= */

export function About({ anchor }: { anchor?: string }) {
  const { navigate } = useStore();

  useEffect(() => {
    if (anchor) {
      const t = window.setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 120);
      return () => window.clearTimeout(t);
    }
  }, [anchor]);

  const values = [
    {
      icon: <FlaskIcon className="w-6 h-6" />,
      title: 'Clinically first',
      body: 'Every formula is graded by independent dermatologists and measured with instruments — corneometer, tewameter — before it ever gets a name.',
      tone: 'bg-deep text-ice',
    },
    {
      icon: <LeafIcon className="w-6 h-6" />,
      title: 'Fragrance-free, always',
      body: 'No parfum, no essential-oil blends, no “natural fragrance”. If it can’t help your barrier, it doesn’t get in the bottle.',
      tone: 'bg-aqua text-ice',
    },
    {
      icon: <PulseIcon className="w-6 h-6" />,
      title: 'Dermatologist-led',
      body: 'Calma was co-founded with practicing dermatologists who kept seeing the same story: over-treated skin and under-repaired barriers.',
      tone: 'bg-cloud text-ink',
    },
    {
      icon: <RecycleIcon className="w-6 h-6" />,
      title: 'Planet-considered',
      body: 'Refill pouches for every hero formula, glass over plastic wherever possible, and carbon-neutral shipping since day one.',
      tone: 'bg-mist text-ink',
    },
  ];

  return (
    <>
      {/* opener */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-foam/50 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
          <div className="lg:col-span-6">
            <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.26em] text-aqua">
              <DropIcon className="w-4 h-4" /> Our story
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.6rem,5.5vw,4.4rem)] font-medium leading-[1.02] text-ink">
              <span className="hero-line" style={{ '--d': '60ms' } as React.CSSProperties}>
                <span>Calm is a formula,</span>
              </span>
              <span className="hero-line" style={{ '--d': '200ms' } as React.CSSProperties}>
                <span>
                  not a <em className="italic text-aqua">feeling.</em>
                </span>
              </span>
            </h1>
            <p className="mt-7 max-w-lg text-[17px] leading-relaxed text-ink/70">
              Calma started in an exam room, not a boardroom. Our co-founder — a dermatologist — kept prescribing the
              same thing for dry, reactive skin: <strong className="font-semibold text-ink">stop adding, start repairing.</strong> So
              we built the line she wished existed: six formulas, short INCI lists, barrier lipids in the ratios skin
              actually uses.
            </p>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                { to: 6, suffix: '', label: 'formulas, nothing else' },
                { to: 14, suffix: '', label: 'avg. ingredients per formula' },
                { to: 112, suffix: '', label: 'study participants, 2025' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-4xl font-medium text-ink">
                    <Counter to={s.to} suffix={s.suffix} />
                  </p>
                  <p className="mt-1.5 text-xs leading-snug text-ink/55">{s.label}</p>
                </div>
              ))}
            </div>
            <button
              className="btn-press group mt-10 flex items-center gap-3 rounded-full bg-ink py-4 pl-7 pr-5 text-[12px] font-bold uppercase tracking-[0.2em] text-ice hover:bg-aqua"
              onClick={() => navigate('shop')}
            >
              Meet the formulas
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
          <div className="relative lg:col-span-6">
            <div className="overflow-hidden rounded-t-[999px] rounded-b-[8px] border border-foam/80 shadow-[0_30px_80px_rgba(12,37,48,0.16)]">
              <img src={IMG.lifestyle} alt="Calm, hydrated skin in soft water mist" className="animate-kenburns aspect-[4/5] w-full object-cover" />
            </div>
            <div className="absolute -bottom-5 left-6 rounded-[4px] bg-deep px-5 py-4 text-ice shadow-xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-foam/70">Est. 2019</p>
              <p className="mt-1 font-display text-lg font-medium">Portland, Oregon</p>
            </div>
          </div>
        </div>
      </section>

      {/* values mosaic */}
      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-24">
        <SectionHead
          eyebrow="What we stand on"
          title={
            <>
              Four rules we <em className="italic text-aqua">never break.</em>
            </>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={i * 90} className={i < 2 ? 'lg:col-span-7 first:lg:col-span-5' : 'lg:col-span-6'}>
              <div className={`group h-full rounded-[6px] p-8 transition-transform duration-500 hover:-translate-y-1.5 sm:p-10 ${v.tone}`}>
                <span className="flex h-13 w-13 items-center justify-center rounded-full border border-current/25 p-3.5 transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110" style={{ width: 52, height: 52 }}>
                  {v.icon}
                </span>
                <h3 className="mt-6 font-display text-2xl font-medium sm:text-3xl">{v.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed opacity-80">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* standards band */}
      <section id="standards" className="scroll-mt-24 bg-deep py-16 text-ice lg:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHead
            tone="dark"
            eyebrow="Our standards"
            title={
              <>
                The never list is <em className="italic text-aqua">the whole point.</em>
              </>
            }
            copy="Sensitive skin doesn’t need more — it needs fewer things to react to. Here’s exactly what you’ll never find in a Calma bottle."
          />
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-foam/50">Never in the bottle</p>
              <ul className="mt-5 flex flex-col gap-3">
                {neverIn.map((n) => (
                  <li key={n} className="flex items-center gap-3 rounded-[4px] border border-foam/15 bg-cloud/[0.03] px-5 py-3.5 text-[15px] text-foam/85">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-peach/20 text-peach">
                      <XIcon className="w-3.5 h-3.5" />
                    </span>
                    {n}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-foam/50">Always in the bottle</p>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {alwaysIn.map((ing) => (
                  <span key={ing} className="rounded-full border border-aqua/40 bg-aqua/10 px-5 py-2.5 text-sm font-semibold text-foam transition-colors hover:bg-aqua/25">
                    {ing}
                  </span>
                ))}
              </div>
              <blockquote className="mt-10 border-l-2 border-aqua pl-6">
                <p className="font-display text-2xl font-light italic leading-snug text-ice sm:text-3xl">
                  “Most of my patients don’t need a new miracle. They need their barrier back.”
                </p>
                <footer className="mt-4 text-sm text-foam/70">
                  <strong className="text-ice">Dr. Elena Marsh, MD</strong> — Co-founder &amp; Chief Dermatology Officer
                </footer>
              </blockquote>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ingredient index */}
      <section id="ingredients" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:py-24">
        <SectionHead
          eyebrow="Skin school · Ingredient index"
          title={
            <>
              Six workhorses, <em className="italic text-aqua">fully disclosed.</em>
            </>
          }
          copy="The actives doing the heavy lifting across the line — what they do and where they come from."
        />
        <Reveal>
          <div className="divide-y divide-foam border-y border-foam">
            {ingredientIndex.map((ing, i) => (
              <div
                key={ing.name}
                className="group grid grid-cols-[auto_1fr] items-baseline gap-x-5 gap-y-1 px-2 py-5 transition-colors duration-300 hover:bg-mist/60 sm:grid-cols-[60px_1.2fr_1fr_1fr] sm:items-center sm:px-4"
              >
                <span className="font-display text-lg text-foam transition-colors group-hover:text-aqua">0{i + 1}</span>
                <h3 className="font-display text-xl font-medium text-ink sm:text-2xl">{ing.name}</h3>
                <p className="col-start-2 text-sm text-ink/65 sm:col-start-3">{ing.role}</p>
                <p className="col-start-2 text-sm text-ink/45 sm:col-start-4">{ing.source}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[6px] bg-aqua px-8 py-14 text-center text-ice sm:py-18">
            <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full border border-ice/25" />
            <div className="pointer-events-none absolute -bottom-24 -right-16 h-72 w-72 rounded-full bg-aquadeep/50 blur-3xl" />
            <h2 className="relative mx-auto max-w-2xl font-display text-4xl font-medium leading-[1.05] sm:text-5xl">
              Your barrier has waited long enough.
            </h2>
            <p className="relative mx-auto mt-4 max-w-md text-[15px] text-ice/80">
              Start with the three-step ritual — cleanse, treat, seal — and feel the difference in days.
            </p>
            <button
              className="btn-press relative mt-8 rounded-full bg-deep px-9 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-ice hover:bg-ink"
              onClick={() => navigate('shop')}
            >
              Shop the collection
            </button>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* ================= FAQ ================= */

export function Faq() {
  const { notify } = useStore();
  const groups = ['Formulas', 'Orders & shipping', 'Skin concerns'];

  return (
    <>
      <section className="relative overflow-hidden border-b border-foam bg-mist/80">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-foam" />
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-18">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink/50">
            Help center
          </p>
          <h1 className="mt-4 font-display text-5xl font-medium leading-[1.02] text-ink sm:text-6xl">
            Asked, <em className="italic text-aqua">answered.</em>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65">
            Everything about our formulas, orders and the 60-day guarantee. If it’s not here, our skin team answers
            every email within one business day.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_340px] lg:gap-16">
          <div className="flex flex-col gap-14">
            {groups.map((g, gi) => (
              <Reveal key={g} delay={gi * 80}>
                <p className="mb-5 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-aqua">
                  <DropIcon className="w-3.5 h-3.5" /> {g}
                </p>
                <Accordion items={faqs.filter((f) => f.group === g)} />
              </Reveal>
            ))}
          </div>

          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <div className="rounded-[6px] bg-deep p-7 text-ice">
                <p className="font-display text-2xl font-medium">Still unsure?</p>
                <p className="mt-2 text-sm leading-relaxed text-foam/75">
                  Send us a photo of your current routine and our skin team will map it to Calma — free, no upsell.
                </p>
                <button
                  className="btn-press mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-aqua py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-ice hover:bg-aquadeep"
                  onClick={() => notify('hello@calma.skin — demo contact link')}
                >
                  hello@calma.skin
                </button>
                <ul className="mt-6 flex flex-col gap-3 border-t border-foam/15 pt-6 text-sm text-foam/75">
                  {[
                    'Replies within 1 business day',
                    'Mon–Fri, 9am–5pm PT',
                    'Real humans, real derms on rotation',
                  ].map((t) => (
                    <li key={t} className="flex items-center gap-2.5">
                      <CheckIcon className="w-4 h-4 text-aqua" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="mt-5 rounded-[6px] border border-foam bg-cloud p-7">
                <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-aqua">
                  <CheckIcon className="w-4 h-4" /> 60-day guarantee
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  Try anything for two full months. Not calmer? Full refund — keep the product, keep the peace.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
