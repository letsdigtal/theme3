import { useMemo, useState } from 'react';
import {
  money,
  products,
  ritualBundlePrice,
  ritualCompareAt,
  ritualProducts,
  type Product,
} from '../data';
import { useStore, type Route } from '../store';
import { BagIcon, ProductCard, Reveal, SearchIcon, XIcon } from '../ui';

const CATEGORIES = ['All', 'Cleanse', 'Treat', 'Seal', 'Body'];
const CONCERN_FILTERS = ['All concerns', 'Dryness', 'Redness', 'Tightness', 'Eczema-prone'];
const SORTS = ['Featured', 'Price: low to high', 'Price: high to low', 'Top rated'];

export default function Shop({ initialFilter, initialFilterType }: { initialFilter?: string; initialFilterType?: Route['filterType'] }) {
  const { navigate, addMany, setCartOpen } = useStore();

  const [category, setCategory] = useState(() => (initialFilterType === 'category' && initialFilter && initialFilter !== 'Bestseller' ? initialFilter : 'All'));
  const [bestsellersOnly, setBestsellersOnly] = useState(() => initialFilter === 'Bestseller');
  const [concern, setConcern] = useState(() => (initialFilterType === 'concern' && initialFilter ? initialFilter : 'All concerns'));
  const [sort, setSort] = useState('Featured');
  const [query, setQuery] = useState('');

  const list = useMemo(() => {
    let items: Product[] = [...products];
    if (bestsellersOnly) items = items.filter((p) => p.badge === 'Bestseller');
    if (category !== 'All') items = items.filter((p) => p.category === category);
    if (concern !== 'All concerns') items = items.filter((p) => p.concerns.includes(concern));
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter((p) => `${p.name} ${p.tagline} ${p.concerns.join(' ')}`.toLowerCase().includes(q));
    }
    switch (sort) {
      case 'Price: low to high':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'Price: high to low':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'Top rated':
        items.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      default:
        items.sort((a, b) => b.reviews - a.reviews);
    }
    return items;
  }, [category, concern, sort, query, bestsellersOnly]);

  const hasFilters = category !== 'All' || concern !== 'All concerns' || query.trim() !== '' || bestsellersOnly;

  const clearAll = () => {
    setCategory('All');
    setConcern('All concerns');
    setSort('Featured');
    setQuery('');
    setBestsellersOnly(false);
  };

  return (
    <>
      {/* page header */}
      <section className="relative overflow-hidden border-b border-foam bg-mist/80">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-foam" />
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-18">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-ink/50">
            <button className="btn-press hover:text-aqua" onClick={() => navigate('home')}>
              Home
            </button>{' '}
            / Shop
          </p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-5xl font-medium leading-[1.02] text-ink sm:text-6xl">
                The <em className="italic text-aqua">collection.</em>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink/65">
                Six formulas, one barrier-first system. Everything is fragrance-free, dermatologist-formulated and
                covered by our 60-day happy-skin guarantee.
              </p>
            </div>
            <p className="font-display text-lg text-ink/60">
              {list.length} {list.length === 1 ? 'formula' : 'formulas'}
            </p>
          </div>
        </div>
      </section>

      {/* toolbar */}
      <div className="sticky top-16 z-30 border-b border-foam bg-ice/90 backdrop-blur-md lg:top-[72px]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-5 py-4 sm:px-8">
          <div className="no-scrollbar flex flex-1 gap-2 overflow-x-auto">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`btn-press shrink-0 rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors ${
                  category === c && !bestsellersOnly
                    ? 'border-ink bg-ink text-ice'
                    : 'border-foam bg-cloud text-ink/65 hover:border-ink/40 hover:text-ink'
                }`}
                onClick={() => {
                  setCategory(c);
                  setBestsellersOnly(false);
                }}
              >
                {c}
              </button>
            ))}
            <button
              className={`btn-press shrink-0 rounded-full border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors ${
                bestsellersOnly ? 'border-aqua bg-aqua text-ice' : 'border-foam bg-cloud text-ink/65 hover:border-aqua hover:text-aqua'
              }`}
              onClick={() => {
                setBestsellersOnly((v) => !v);
                setCategory('All');
              }}
            >
              ★ Bestsellers
            </button>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 w-4 h-4 -translate-y-1/2 text-ink/40" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search formulas…"
                aria-label="Search products"
                className="w-40 rounded-full border border-foam bg-cloud py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink/40 focus:border-aqua focus:outline-none sm:w-52"
              />
              {query && (
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink" onClick={() => setQuery('')} aria-label="Clear search">
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>
            <select
              value={concern}
              onChange={(e) => setConcern(e.target.value)}
              aria-label="Filter by concern"
              className="cursor-pointer rounded-full border border-foam bg-cloud px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] text-ink/70 focus:border-aqua focus:outline-none"
            >
              {CONCERN_FILTERS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort products"
              className="cursor-pointer rounded-full border border-foam bg-cloud px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.08em] text-ink/70 focus:border-aqua focus:outline-none"
            >
              {SORTS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* grid */}
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
        {hasFilters && (
          <button className="btn-press mb-8 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-ink/55 hover:text-aqua" onClick={clearAll}>
            <XIcon className="w-3.5 h-3.5" /> Clear all filters
          </button>
        )}

        {list.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-ink/45">
              <SearchIcon className="w-7 h-7" />
            </span>
            <p className="mt-5 font-display text-2xl font-medium text-ink">Nothing matches that filter</p>
            <p className="mt-2 max-w-sm text-sm text-ink/60">
              Try a broader concern or category — or browse the full six-formula collection.
            </p>
            <button className="btn-press mt-6 rounded-full bg-ink px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-ice hover:bg-aqua" onClick={clearAll}>
              Reset filters
            </button>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <Reveal key={p.id} delay={(i % 3) * 90}>
                <ProductCard product={p} onOpen={(id) => navigate('product', { slug: id })} />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* bundle banner */}
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:pb-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-[6px] bg-deep px-7 py-10 text-ice sm:px-12 lg:py-14">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-foam/15" />
            <div className="flex flex-wrap items-center justify-between gap-8">
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex -space-x-3">
                  {ritualProducts.map((id) => {
                    const p = products.find((x) => x.id === id)!;
                    return <img key={id} src={p.image} alt="" className="h-20 w-16 rounded-[4px] border-2 border-deep object-cover" />;
                  })}
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-foam/60">Bundle &amp; save</p>
                  <h2 className="mt-2 font-display text-3xl font-medium sm:text-4xl">
                    The Full Ritual — <span className="text-aqua">{money(ritualBundlePrice)}</span>{' '}
                    <span className="text-xl text-foam/45 line-through">{money(ritualCompareAt)}</span>
                  </h2>
                  <p className="mt-2 max-w-lg text-sm text-foam/75">
                    Cleanse, treat, seal. The complete three-step system at 11% off, with free shipping included.
                  </p>
                </div>
              </div>
              <button
                className="btn-press flex items-center gap-3 rounded-full bg-aqua px-8 py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-ice hover:bg-ice hover:text-deep"
                onClick={() => {
                  addMany([...ritualProducts]);
                  setCartOpen(true);
                }}
              >
                <BagIcon className="w-4 h-4" /> Add the ritual
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
