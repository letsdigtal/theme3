import { useMemo, useState } from 'react';
import { IMG, findProduct, money, products, reviews } from '../data';
import { useStore } from '../store';
import {
  Accordion,
  BagIcon,
  CheckIcon,
  DropIcon,
  PlusIcon,
  QtyStepper,
  RecycleIcon,
  Reveal,
  ShieldIcon,
  Stars,
  TruckIcon,
} from '../ui';

export default function ProductPage({ slug }: { slug?: string }) {
  const { navigate, addToCart, setCartOpen } = useStore();
  const product = findProduct(slug ?? 'cream') ?? products[2];

  const [qty, setQtyState] = useState(1);
  const [useAlt, setUseAlt] = useState(false);
  const [thumb, setThumb] = useState(0);

  const thumbs = useMemo(() => [product.image, IMG.texture, IMG.lifestyle], [product]);
  const price = useAlt && product.altSize ? product.altSize.price : product.price;
  const sizeLabel = useAlt && product.altSize ? product.altSize.label : product.size;
  const productReviews = useMemo(() => {
    const own = reviews.filter((r) => r.productId === product.id);
    return own.length > 0 ? own : reviews.slice(0, 2);
  }, [product]);

  const pairs = useMemo(() => products.filter((p) => p.id !== product.id).slice(0, 3), [product]);

  const accordionItems = [
    { q: 'The formula', a: product.description },
    { q: 'Full ingredients (INCI)', a: product.ingredients },
    { q: 'How to use', a: product.howTo.map((s, i) => `${i + 1}. ${s}`).join('  ·  ') },
    {
      q: 'Shipping & returns',
      a: 'Orders over $50 ship free in the U.S. (2–4 business days). Every order is covered by our 60-day happy-skin guarantee — if your skin isn’t calmer, we refund you in full. No return label, no restocking fee.',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:py-14">
      {/* breadcrumb */}
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/50">
        <button className="btn-press hover:text-aqua" onClick={() => navigate('home')}>Home</button>
        {' / '}
        <button className="btn-press hover:text-aqua" onClick={() => navigate('shop')}>Shop</button>
        {' / '}
        <span className="text-ink">{product.name}</span>
      </p>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* gallery */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="group relative overflow-hidden rounded-[6px] bg-mist">
            <div className="aspect-[4/5] overflow-hidden">
              <img
                key={thumb}
                src={thumbs[thumb]}
                alt={`${product.name} — view ${thumb + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            {product.badge && (
              <span className={`absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${product.badge === 'New' ? 'bg-aqua text-ice' : 'bg-ink text-ice'}`}>
                {product.badge}
              </span>
            )}
          </div>
          <div className="mt-4 flex gap-3">
            {thumbs.map((t, i) => (
              <button
                key={t}
                className={`btn-press h-20 w-16 overflow-hidden rounded-[4px] border-2 transition-all ${thumb === i ? 'border-aqua' : 'border-transparent opacity-60 hover:opacity-100'}`}
                onClick={() => setThumb(i)}
                aria-label={`View image ${i + 1}`}
              >
                <img src={t} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* buy panel */}
        <div>
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-aqua">
            <DropIcon className="w-3.5 h-3.5" /> {product.category} · {product.concerns.join(' · ')}
          </p>
          <h1 className="mt-4 font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl">{product.name}</h1>
          <p className="mt-3 text-lg text-ink/65">{product.tagline}</p>

          <a
            href="#product-reviews"
            className="mt-4 inline-flex items-center gap-2 text-sm text-ink/60 hover:text-aqua"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('product-reviews')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Stars rating={product.rating} />
            <span className="font-semibold text-ink">{product.rating}</span> · {product.reviews.toLocaleString()} reviews
          </a>

          <p className="mt-6 font-display text-3xl font-semibold text-ink">
            {money(price)}
            {product.compareAt && !useAlt && (
              <span className="ml-3 text-xl font-normal text-ink/40 line-through">{money(product.compareAt)}</span>
            )}
          </p>

          {/* size */}
          <div className="mt-6">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/55">Size</p>
            <div className="mt-3 flex flex-wrap gap-2.5">
              <button
                className={`btn-press rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${!useAlt ? 'border-ink bg-ink text-ice' : 'border-foam bg-cloud text-ink/70 hover:border-ink/50'}`}
                onClick={() => setUseAlt(false)}
              >
                {product.size}
              </button>
              {product.altSize && (
                <button
                  className={`btn-press rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${useAlt ? 'border-ink bg-ink text-ice' : 'border-foam bg-cloud text-ink/70 hover:border-ink/50'}`}
                  onClick={() => setUseAlt(true)}
                >
                  {product.altSize.label} · {money(product.altSize.price)}
                </button>
              )}
            </div>
          </div>

          {/* claims */}
          <ul className="mt-7 flex flex-col gap-2.5 border-y border-foam py-6">
            {product.claims.map((c) => (
              <li key={c} className="flex items-center gap-3 text-[15px] text-ink/80">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-aqua/12 text-aqua">
                  <CheckIcon className="w-3.5 h-3.5" />
                </span>
                {c}
              </li>
            ))}
          </ul>

          {/* qty + CTA */}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <QtyStepper qty={qty} onChange={(q) => setQtyState(Math.max(1, q))} />
            <button
              className="btn-press flex flex-1 basis-56 items-center justify-center gap-3 rounded-full bg-ink py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-ice hover:bg-aqua"
              onClick={() => {
                addToCart(product.id, qty);
                setCartOpen(true);
              }}
            >
              <BagIcon className="w-4 h-4" /> Add to bag — {money(price * qty)}
            </button>
          </div>
          <p className="mt-3 text-xs text-ink/50">
            {sizeLabel} · In stock, ships within 24h from Portland, OR
          </p>

          {/* services */}
          <div className="mt-7 grid grid-cols-3 gap-3">
            {[
              { icon: <TruckIcon className="w-5 h-5" />, label: 'Free shipping over $50' },
              { icon: <ShieldIcon className="w-5 h-5" />, label: '60-day guarantee' },
              { icon: <RecycleIcon className="w-5 h-5" />, label: 'Recyclable packaging' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center gap-2 rounded-[4px] border border-foam bg-mist/60 px-2 py-4 text-center">
                <span className="text-aqua">{s.icon}</span>
                <span className="text-[11px] font-semibold leading-snug text-ink/70">{s.label}</span>
              </div>
            ))}
          </div>

          {/* accordion */}
          <div className="mt-9">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>

      {/* pairs well with */}
      <section className="mt-20 lg:mt-28">
        <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-aqua">Pairs well with</p>
            <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">Complete the ritual</h2>
          </div>
          <button className="link-line btn-press text-[12px] font-bold uppercase tracking-[0.2em] text-ink/70 hover:text-aqua" onClick={() => navigate('shop')}>
            Shop all six
          </button>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-3">
          {pairs.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <article className="group flex gap-4 rounded-[6px] border border-foam bg-cloud p-4 transition-all duration-500 hover:-translate-y-1 hover:border-aqua/50 hover:shadow-[0_22px_60px_rgba(12,37,48,0.1)]">
                <button className="h-28 w-22 shrink-0 overflow-hidden rounded-[4px] bg-mist" onClick={() => navigate('product', { slug: p.id })} style={{ width: 88 }}>
                  <img src={p.image} alt={p.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                </button>
                <div className="flex min-w-0 flex-1 flex-col">
                  <button className="link-line w-fit text-left font-display text-[17px] font-medium leading-snug text-ink" onClick={() => navigate('product', { slug: p.id })}>
                    {p.name}
                  </button>
                  <p className="mt-1 line-clamp-2 text-[13px] text-ink/55">{p.tagline}</p>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <p className="text-sm font-bold text-ink">{money(p.price)}</p>
                    <button
                      className="btn-press flex h-9 w-9 items-center justify-center rounded-full bg-ink text-ice hover:bg-aqua"
                      onClick={() => addToCart(p.id)}
                      aria-label={`Add ${p.name} to bag`}
                    >
                      <PlusIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* reviews */}
      <section id="product-reviews" className="mt-20 scroll-mt-28 lg:mt-28">
        <Reveal className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-aqua">Verified reviews</p>
          <h2 className="mt-3 font-display text-3xl font-medium text-ink sm:text-4xl">
            What {product.reviews.toLocaleString()} buyers say
          </h2>
        </Reveal>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {productReviews.map((r, i) => (
            <Reveal key={r.name} delay={i * 90}>
              <article className="flex h-full flex-col rounded-[6px] border border-foam bg-cloud p-6">
                <div className="flex items-center justify-between">
                  <Stars rating={r.rating} />
                  <span className="rounded-full bg-mist px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-ink/60">{r.skin}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-medium leading-snug text-ink">“{r.title}”</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/65">{r.body}</p>
                <p className="mt-5 flex items-center gap-2 border-t border-foam pt-4 text-sm">
                  <strong className="text-ink">{r.name}</strong>
                  <span className="flex items-center gap-1 text-[11px] uppercase tracking-[0.1em] text-aqua">
                    <CheckIcon className="w-3.5 h-3.5" /> Verified · {r.date}
                  </span>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
