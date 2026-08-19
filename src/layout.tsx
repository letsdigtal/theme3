import { useEffect, useRef, useState, type FormEvent } from 'react';
import { FREE_SHIPPING_THRESHOLD, money, findProduct } from './data';
import { useStore, type Route } from './store';
import {
  ArrowRight,
  AsterIcon,
  BagIcon,
  CheckIcon,
  DropIcon,
  InstagramIcon,
  Marquee,
  MenuIcon,
  QtyStepper,
  SearchIcon,
  Spinner,
  TikTokIcon,
  XIcon,
  YoutubeIcon,
} from './ui';

/* ---------------- announcement bar ---------------- */

export function AnnouncementBar() {
  const items = [
    'Free U.S. shipping over $50',
    'Dermatologist formulated',
    '60-day happy-skin guarantee',
    'Fragrance-free, always',
    'New: Rescue Repair Balm',
  ];
  return (
    <div className="relative z-50 bg-deep text-ice">
      <Marquee duration={30} className="py-2.5">
        {items.map((item) => (
          <span key={item} className="flex items-center">
            <span className="px-6 text-[11px] font-bold uppercase tracking-[0.22em] whitespace-nowrap">{item}</span>
            <AsterIcon className="w-3 h-3 text-aqua" />
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ---------------- header ---------------- */

export function Header() {
  const { route, navigate, count, setCartOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const nav: { label: string; page: Route['page']; opts?: Partial<Omit<Route, 'page'>> }[] = [
    { label: 'Shop', page: 'shop' },
    { label: 'Bestsellers', page: 'shop', opts: { filter: 'Bestseller', filterType: 'category' } },
    { label: 'Our story', page: 'about' },
    { label: 'Skin school', page: 'about', opts: { slug: 'ingredients' } },
    { label: 'FAQ', page: 'faq' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled ? 'border-b border-foam bg-ice/85 shadow-[0_8px_30px_rgba(12,37,48,0.06)] backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:h-[72px]">
          <div className="flex items-center gap-3">
            <button
              className="btn-press -ml-1 p-1.5 text-ink lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
            <button className="btn-press flex items-baseline gap-1" onClick={() => navigate('home')} aria-label="Calma home">
              <span className="font-display text-[26px] font-semibold tracking-[0.14em] text-ink">CALMA</span>
              <DropIcon className="w-3.5 h-3.5 self-center text-aqua" />
            </button>
          </div>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <button
                key={item.label}
                className="link-line btn-press text-[12px] font-bold uppercase tracking-[0.2em] text-ink/75 hover:text-ink"
                aria-current={route.page === item.page && !item.opts?.filter}
                onClick={() => navigate(item.page, item.opts)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              className="btn-press hidden p-2.5 text-ink/75 hover:text-aqua sm:block"
              onClick={() => navigate('shop')}
              aria-label="Search products"
            >
              <SearchIcon className="w-[21px] h-[21px]" />
            </button>
            <button
              className="btn-press relative p-2.5 text-ink hover:text-aqua"
              onClick={() => setCartOpen(true)}
              aria-label={`Open bag, ${count} items`}
            >
              <BagIcon className="w-[22px] h-[22px]" />
              {count > 0 && (
                <span
                  key={count}
                  className="animate-pop absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-aqua px-1 text-[10px] font-bold text-ice"
                >
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          className={`absolute inset-0 bg-deep/60 transition-opacity duration-400 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-ice transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            menuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-foam px-6 py-5">
            <span className="font-display text-xl font-semibold tracking-[0.14em] text-ink">CALMA</span>
            <button className="btn-press p-1.5 text-ink" onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <XIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex flex-col gap-1 px-6 py-6" aria-label="Mobile">
            {[
              { label: 'Home', page: 'home' as const },
              { label: 'Shop all', page: 'shop' as const },
              { label: 'Our story', page: 'about' as const },
              { label: 'FAQ', page: 'faq' as const },
            ].map((item, i) => (
              <button
                key={item.label}
                className="btn-press flex items-center justify-between border-b border-foam/70 py-4 text-left"
                style={{ transitionDelay: `${i * 40}ms` }}
                onClick={() => {
                  setMenuOpen(false);
                  navigate(item.page);
                }}
              >
                <span className="font-display text-2xl font-medium text-ink">{item.label}</span>
                <ArrowRight className="w-5 h-5 text-aqua" />
              </button>
            ))}
          </nav>
          <div className="mt-auto px-6 pb-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-ink/50">Free shipping over {money(FREE_SHIPPING_THRESHOLD)}</p>
            <p className="mt-1 text-sm text-ink/60">60-day happy-skin guarantee on every order.</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- cart drawer ---------------- */

export function CartDrawer() {
  const { cartOpen, setCartOpen, cart, setQty, removeLine, subtotal, count, clearCart, navigate } = useStore();
  const [phase, setPhase] = useState<'cart' | 'processing' | 'done'>('cart');
  const [orderId, setOrderId] = useState('');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    document.body.style.overflow = cartOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [cartOpen]);

  useEffect(() => {
    if (!cartOpen && phase === 'done') {
      const t = window.setTimeout(() => setPhase('cart'), 400);
      return () => window.clearTimeout(t);
    }
  }, [cartOpen, phase]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const checkout = () => {
    setPhase('processing');
    timer.current = window.setTimeout(() => {
      setOrderId(`CLM-${Math.floor(1000 + Math.random() * 9000)}`);
      setPhase('done');
      clearCart();
    }, 1400);
  };

  return (
    <div className={`fixed inset-0 z-[60] ${cartOpen ? '' : 'pointer-events-none'}`} aria-hidden={!cartOpen}>
      <div
        className={`absolute inset-0 bg-deep/55 transition-opacity duration-500 ${cartOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setCartOpen(false)}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cloud shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Shopping bag"
      >
        {phase === 'done' ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-aqua/15 text-aqua">
              <CheckIcon className="w-8 h-8" />
            </span>
            <h3 className="mt-6 font-display text-3xl font-medium text-ink">Order confirmed</h3>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-aqua">{orderId}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/65">
              This is a demo storefront, so no payment was processed — but your skin wishes it were real.
            </p>
            <button
              className="btn-press mt-8 rounded-full bg-ink px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-ice hover:bg-aqua"
              onClick={() => {
                setCartOpen(false);
                navigate('shop');
              }}
            >
              Keep shopping
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-foam px-6 py-5">
              <h2 className="font-display text-2xl font-medium text-ink">
                Your bag <span className="text-ink/45">({count})</span>
              </h2>
              <button className="btn-press p-1.5 text-ink" onClick={() => setCartOpen(false)} aria-label="Close bag">
                <XIcon className="w-6 h-6" />
              </button>
            </div>

            {/* free shipping meter */}
            <div className="border-b border-foam bg-mist/60 px-6 py-4">
              {remaining > 0 ? (
                <p className="text-[13px] text-ink/75">
                  You’re <strong className="text-ink">{money(remaining)}</strong> away from free shipping
                </p>
              ) : (
                <p className="flex items-center gap-2 text-[13px] font-semibold text-aquadeep">
                  <CheckIcon className="w-4 h-4" /> Free shipping unlocked
                </p>
              )}
              <div className="mt-2.5 h-1.5 overflow-hidden rounded-full bg-foam">
                <div
                  className="h-full rounded-full bg-aqua transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {cart.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-mist text-ink/50">
                  <BagIcon className="w-7 h-7" />
                </span>
                <p className="mt-5 font-display text-2xl font-medium text-ink">Your bag is empty</p>
                <p className="mt-2 text-sm text-ink/60">Your barrier deserves better. Start with a bestseller.</p>
                <button
                  className="btn-press mt-6 rounded-full bg-ink px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.18em] text-ice hover:bg-aqua"
                  onClick={() => {
                    setCartOpen(false);
                    navigate('shop');
                  }}
                >
                  Shop the collection
                </button>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto px-6 py-5">
                <ul className="flex flex-col gap-6">
                  {cart.map((line) => {
                    const p = findProduct(line.id);
                    if (!p) return null;
                    return (
                      <li key={line.id} className="flex gap-4">
                        <div className="h-24 w-20 shrink-0 overflow-hidden rounded-sm bg-mist">
                          <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-3">
                            <p className="font-display text-[15px] font-medium leading-snug text-ink">{p.name}</p>
                            <button
                              className="btn-press -mr-1 -mt-1 p-1 text-ink/40 hover:text-ink"
                              onClick={() => removeLine(line.id)}
                              aria-label={`Remove ${p.name}`}
                            >
                              <XIcon className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="mt-0.5 text-xs text-ink/50">{p.size}</p>
                          <div className="mt-auto flex items-center justify-between pt-2">
                            <QtyStepper small qty={line.qty} onChange={(q) => setQty(line.id, q)} />
                            <p className="text-sm font-bold text-ink tabular-nums">{money(p.price * line.qty)}</p>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {cart.length > 0 && (
              <div className="border-t border-foam px-6 py-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-ink/65">Subtotal</span>
                  <span className="font-display text-xl font-semibold text-ink tabular-nums">{money(subtotal)}</span>
                </div>
                <p className="mt-1 text-xs text-ink/50">Shipping & taxes calculated at checkout.</p>
                <button
                  className="btn-press mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-[12px] font-bold uppercase tracking-[0.2em] text-ice hover:bg-aqua disabled:opacity-60"
                  onClick={checkout}
                  disabled={phase === 'processing'}
                >
                  {phase === 'processing' ? (
                    <>
                      <Spinner className="w-4 h-4" /> Processing…
                    </>
                  ) : (
                    <>Checkout — {money(subtotal)}</>
                  )}
                </button>
                <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-ink/45">
                  <CheckIcon className="w-3.5 h-3.5 text-aqua" /> 60-day guarantee · Free returns
                </p>
              </div>
            )}
          </>
        )}
      </aside>
    </div>
  );
}

/* ---------------- toast ---------------- */

export function Toast() {
  const { toast, setCartOpen } = useStore();
  if (!toast) return null;
  return (
    <div className="animate-toast fixed bottom-6 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-3 rounded-full bg-ink py-3 pl-4 pr-3 text-ice shadow-2xl">
      <CheckIcon className="w-4 h-4 text-aqua" />
      <span className="text-sm font-semibold whitespace-nowrap">{toast}</span>
      <button
        className="btn-press ml-2 rounded-full bg-foam/15 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] hover:bg-aqua"
        onClick={() => setCartOpen(true)}
      >
        View bag
      </button>
    </div>
  );
}

/* ---------------- footer ---------------- */

export function Footer() {
  const { navigate, notify } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      notify('Please enter a valid email address');
      return;
    }
    setSubscribed(true);
  };

  const col = 'flex flex-col items-start gap-3';
  const link =
    'btn-press text-left text-sm text-foam/75 transition-colors hover:text-ice';

  return (
    <footer className="relative overflow-hidden bg-deep text-ice">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <button className="btn-press flex items-baseline gap-1" onClick={() => navigate('home')} aria-label="Calma home">
              <span className="font-display text-2xl font-semibold tracking-[0.14em]">CALMA</span>
              <DropIcon className="w-3.5 h-3.5 self-center text-aqua" />
            </button>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-foam/75">
              Dermatologist-formulated skincare for dry, reactive and eczema-prone skin. Fewer ingredients, better
              barriers, calmer days.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {[
                { icon: <InstagramIcon className="w-4 h-4" />, label: 'Instagram' },
                { icon: <TikTokIcon className="w-4 h-4" />, label: 'TikTok' },
                { icon: <YoutubeIcon className="w-4 h-4" />, label: 'YouTube' },
              ].map((s) => (
                <button
                  key={s.label}
                  className="btn-press flex h-10 w-10 items-center justify-center rounded-full border border-foam/25 text-foam/80 transition-colors hover:border-aqua hover:text-aqua"
                  aria-label={s.label}
                  onClick={() => notify(`${s.label} — @calma.skin (demo link)`)}
                >
                  {s.icon}
                </button>
              ))}
            </div>
          </div>

          <div className={col + ' lg:col-span-2'}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foam/50">Shop</p>
            <button className={link} onClick={() => navigate('shop')}>All products</button>
            <button className={link} onClick={() => navigate('shop', { filter: 'Bestseller', filterType: 'category' })}>Bestsellers</button>
            <button className={link} onClick={() => navigate('product', { slug: 'cream' })}>Hydra Veil Cream</button>
            <button className={link} onClick={() => navigate('shop', { filter: 'Body', filterType: 'category' })}>Body care</button>
          </div>

          <div className={col + ' lg:col-span-2'}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foam/50">Learn</p>
            <button className={link} onClick={() => navigate('about')}>Our story</button>
            <button className={link} onClick={() => navigate('about', { slug: 'ingredients' })}>Ingredient index</button>
            <button className={link} onClick={() => navigate('faq')}>FAQ</button>
            <button className={link} onClick={() => navigate('about', { slug: 'standards' })}>Our standards</button>
          </div>

          <div className={col + ' lg:col-span-4'}>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-foam/50">The Calm List</p>
            <p className="text-sm text-foam/75">Skin-science notes, early drops and 15% off your first order.</p>
            {subscribed ? (
              <p className="mt-2 flex items-center gap-2 rounded-sm border border-aqua/40 bg-aqua/10 px-4 py-3 text-sm text-foam">
                <CheckIcon className="w-4 h-4 text-aqua" /> Welcome in — code CALM15 is headed to your inbox.
              </p>
            ) : (
              <form className="mt-2 flex w-full max-w-sm" onSubmit={submit}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-l-full border border-foam/25 bg-transparent px-5 py-3 text-sm text-ice placeholder:text-foam/40 focus:border-aqua focus:outline-none"
                  aria-label="Email address"
                />
                <button
                  type="submit"
                  className="btn-press -ml-px rounded-r-full bg-aqua px-5 text-[11px] font-bold uppercase tracking-[0.16em] text-ice hover:bg-aquadeep"
                >
                  Join
                </button>
              </form>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
              {['VISA', 'MC', 'AMEX', 'PAYPAL', 'APPLE PAY'].map((p) => (
                <span key={p} className="rounded-sm border border-foam/20 px-2.5 py-1 text-[10px] font-bold tracking-[0.1em] text-foam/55">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-foam/15 py-6 sm:flex-row">
          <p className="text-xs text-foam/50">© 2026 Calma Labs, Inc. — Portland, OR. Demo storefront for design purposes.</p>
          <div className="flex gap-6">
            {['Terms', 'Privacy', 'Accessibility'].map((t) => (
              <button key={t} className="link-line text-xs text-foam/60 hover:text-ice" onClick={() => notify(`${t} page — demo link`)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="text-hollow pointer-events-none select-none text-center font-display text-[21vw] leading-[0.78] font-semibold tracking-[0.08em] lg:text-[17vw]"
      >
        CALMA
      </p>
    </footer>
  );
}
