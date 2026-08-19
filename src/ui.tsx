import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { money, type Product } from './data';
import { useStore } from './store';

/* ---------------- icons (hand-drawn inline SVG) ---------------- */

type IconProps = { className?: string };

const base = 'shrink-0';

export const DropIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path
      d="M12 2.8c3.6 4.4 6.4 7.9 6.4 11.2a6.4 6.4 0 1 1-12.8 0C5.6 10.7 8.4 7.2 12 2.8Z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path d="M9 14.5a3.2 3.2 0 0 0 2.4 3.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const StarIcon = ({ className = 'w-3.5 h-3.5' }: IconProps) => (
  <svg viewBox="0 0 24 24" className={`${base} ${className}`} fill="currentColor" aria-hidden="true">
    <path d="M12 2.6l2.9 5.9 6.5.95-4.7 4.6 1.1 6.5L12 17.5l-5.8 3.05 1.1-6.5-4.7-4.6 6.5-.95L12 2.6z" />
  </svg>
);

export const BagIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M5.5 8h13l-.9 11.2a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5.5 8Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="M8.8 10V6.8a3.2 3.2 0 0 1 6.4 0V10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const SearchIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="1.6" />
    <path d="m15.6 15.6 4.6 4.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const ArrowRight = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const ArrowUpRight = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M6.5 17.5 17.5 6.5M8.5 6.5h9v9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const PlusIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const MinusIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M5 12h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const XIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const CheckIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AsterIcon = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M12 3v18M3 12h18M5.8 5.8l12.4 12.4M18.2 5.8 5.8 18.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const FlaskIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M9.5 3h5M10.5 3v5.2L5.2 18a2.4 2.4 0 0 0 2.1 3.5h9.4a2.4 2.4 0 0 0 2.1-3.5L13.5 8.2V3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 14.5h8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const LeafIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M19.5 4.5C11 4.5 5.5 9 5.5 15.5c0 1.6.4 2.9 1 4 1.2-6 5.5-9.6 9.5-10.7-5 2.4-8.2 6-8.9 10.7.7.3 1.6.5 2.4.5 6.5 0 10-5.5 10-15.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

export const PulseIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M3 12h4l2.5-6.5L14 18l2.5-6H21" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const TruckIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M2.5 6h12v11h-12zM14.5 9.5H19l2.5 3.5v4h-7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <circle cx="6.5" cy="17.5" r="1.9" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="17.5" cy="17.5" r="1.9" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

export const RecycleIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M12 4.5 9 9.5h6L12 4.5ZM6.8 13.5 4 18.5h6l-3.2-5ZM17.2 13.5 14 18.5h6l-2.8-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M10.6 9.2 8.3 13M15.7 13l-2.3-3.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const ShieldIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M12 3 5 5.8v5.4c0 4.5 2.9 7.6 7 9.3 4.1-1.7 7-4.8 7-9.3V5.8L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    <path d="m9 11.6 2.2 2.2L15.4 9.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MenuIcon = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M4 7.5h16M4 12h16M4 16.5h10" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
  </svg>
);

export const ChevronDown = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="m6 9.5 6 6 6-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Spinner = ({ className = 'w-4 h-4' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} animate-spin ${className}`} aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.5" opacity="0.25" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const InstagramIcon = ({ className = 'w-4.5 h-4.5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
  </svg>
);

export const TikTokIcon = ({ className = 'w-4.5 h-4.5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <path d="M14.5 3.5v10.8a3.9 3.9 0 1 1-3.2-3.8M14.5 5.5c.6 2.4 2.3 4 5 4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const YoutubeIcon = ({ className = 'w-4.5 h-4.5' }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="none" className={`${base} ${className}`} aria-hidden="true">
    <rect x="3" y="6" width="18" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="m10.2 9.5 4.5 2.5-4.5 2.5v-5Z" fill="currentColor" />
  </svg>
);

/* ---------------- scroll reveal ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style: CSSProperties = {
    transitionDelay: `${delay}ms`,
    transform: shown ? 'none' : `translateY(${y}px)`,
    opacity: shown ? 1 : 0,
    transition: 'opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)',
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/* ---------------- marquee ---------------- */

export function Marquee({
  children,
  className = '',
  duration = 26,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="flex w-max animate-marquee" style={{ '--mq-duration': `${duration}s` } as CSSProperties}>
        <div className="flex items-center">{children}</div>
        <div className="flex items-center" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---------------- animated counter ---------------- */

export function Counter({
  to,
  decimals = 0,
  prefix = '',
  suffix = '',
  duration = 1500,
  className = '',
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVal(to);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          setVal(to * (1 - Math.pow(1 - p, 3)));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  );
}

/* ---------------- stars ---------------- */

export function Stars({ rating, className = 'w-3.5 h-3.5' }: { rating: number; className?: string }) {
  return (
    <span className="inline-flex items-center gap-0.5 text-peach" aria-label={`${rating} out of 5 stars`}>
      {[0, 1, 2, 3, 4].map((i) => (
        <StarIcon key={i} className={`${className} ${i < Math.round(rating) ? '' : 'opacity-25'}`} />
      ))}
    </span>
  );
}

/* ---------------- section heading ---------------- */

export function SectionHead({
  eyebrow,
  title,
  copy,
  action,
  tone = 'light',
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  action?: ReactNode;
  tone?: 'light' | 'dark';
}) {
  const isDark = tone === 'dark';
  return (
    <Reveal className="mb-10 lg:mb-14">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <p
            className={`flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] ${
              isDark ? 'text-foam/80' : 'text-aqua'
            }`}
          >
            <DropIcon className="w-3.5 h-3.5" />
            {eyebrow}
          </p>
          <h2
            className={`mt-4 font-display text-4xl sm:text-5xl leading-[1.05] font-medium ${
              isDark ? 'text-ice' : 'text-ink'
            }`}
          >
            {title}
          </h2>
          {copy && <p className={`mt-4 text-base leading-relaxed ${isDark ? 'text-foam/80' : 'text-ink/65'}`}>{copy}</p>}
        </div>
        {action}
      </div>
    </Reveal>
  );
}

/* ---------------- accordion ---------------- */

export function Accordion({
  items,
  tone = 'light',
  single = true,
}: {
  items: { q: string; a: string }[];
  tone?: 'light' | 'dark';
  single?: boolean;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const isDark = tone === 'dark';

  return (
    <div className={`divide-y ${isDark ? 'divide-foam/15 border-y border-foam/15' : 'divide-foam border-y border-foam'}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              className={`btn-press flex w-full items-center justify-between gap-6 py-5 text-left ${
                isDark ? 'text-ice' : 'text-ink'
              }`}
              onClick={() => setOpen(single ? (isOpen ? null : i) : isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg sm:text-xl font-medium">{item.q}</span>
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180 text-aqua' : isDark ? 'text-foam/60' : 'text-ink/50'}`}
              />
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className="overflow-hidden">
                <p className={`pb-6 pr-10 text-[15px] leading-relaxed ${isDark ? 'text-foam/85' : 'text-ink/70'}`}>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------------- before / after comparison slider ---------------- */

export function BeforeAfter({
  before,
  after,
  beforeLabel,
  afterLabel,
}: {
  before: string;
  after: string;
  beforeLabel: string;
  afterLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(58);
  const dragging = useRef(false);

  const move = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(95, Math.max(5, ((clientX - r.left) / r.width) * 100)));
  };

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    move(e.clientX);
  };

  return (
    <div
      ref={ref}
      className="group relative aspect-[4/3] w-full cursor-ew-resize touch-none overflow-hidden rounded-sm bg-mist select-none"
      onPointerDown={onDown}
      onPointerMove={(e) => dragging.current && move(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img src={after} alt={afterLabel} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      <img
        src={before}
        alt={beforeLabel}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
      />
      {/* divider */}
      <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-cloud shadow-[0_0_12px_rgba(12,37,48,0.35)]" />
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="absolute inset-0 rounded-full bg-cloud/60 animate-ring" />
          <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-cloud text-ink shadow-lg transition-transform duration-300 group-hover:scale-110">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
              <path d="M8.5 7.5 4 12l4.5 4.5M15.5 7.5 20 12l-4.5 4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
      <span className="absolute left-4 top-4 z-10 rounded-full bg-deep/80 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ice backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="absolute right-4 top-4 z-10 rounded-full bg-cloud/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-ink backdrop-blur-sm">
        {afterLabel}
      </span>
      {/* keyboard / screen-reader access */}
      <input
        type="range"
        min={5}
        max={95}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Compare before and after"
        className="ba-range absolute inset-0 h-full w-full opacity-0"
      />
    </div>
  );
}

/* ---------------- quantity stepper ---------------- */

export function QtyStepper({
  qty,
  onChange,
  small = false,
}: {
  qty: number;
  onChange: (q: number) => void;
  small?: boolean;
}) {
  const btn = `btn-press flex items-center justify-center ${small ? 'w-8 h-8' : 'w-10 h-11'} text-ink/70 hover:text-ink hover:bg-mist transition-colors`;
  return (
    <div className={`inline-flex items-center border ${small ? 'border-foam' : 'border-ink/20'} bg-cloud`}>
      <button className={btn} onClick={() => onChange(qty - 1)} aria-label="Decrease quantity">
        <MinusIcon className="w-3.5 h-3.5" />
      </button>
      <span className={`${small ? 'w-7 text-sm' : 'w-10'} text-center font-semibold tabular-nums`}>{qty}</span>
      <button className={btn} onClick={() => onChange(qty + 1)} aria-label="Increase quantity">
        <PlusIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ---------------- product card ---------------- */

export function ProductCard({ product, onOpen }: { product: Product; onOpen: (id: string) => void }) {
  const { addToCart } = useStore();

  return (
    <article className="group flex flex-col">
      <div
        className="relative cursor-pointer overflow-hidden rounded-sm bg-mist"
        onClick={() => onOpen(product.id)}
        role="link"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onOpen(product.id)}
      >
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        </div>
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] ${
              product.badge === 'New' ? 'bg-aqua text-ice' : 'bg-ink text-ice'
            }`}
          >
            {product.badge}
          </span>
        )}
        {product.compareAt && (
          <span className="absolute right-3 top-3 rounded-full bg-peach px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-deep">
            Save {money(product.compareAt - product.price)}
          </span>
        )}
        <button
          className="btn-press absolute inset-x-3 bottom-3 flex translate-y-0 items-center justify-center gap-2 bg-ink/90 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-ice backdrop-blur-sm transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-aqua lg:translate-y-[130%] lg:group-hover:translate-y-0"
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product.id);
          }}
        >
          <BagIcon className="w-4 h-4" />
          Add to bag — {money(product.price)}
        </button>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-xs text-ink/55">
            {product.rating} ({product.reviews.toLocaleString()})
          </span>
        </div>
        <button
          className="link-line mt-1.5 w-fit text-left font-display text-lg leading-snug font-medium text-ink"
          onClick={() => onOpen(product.id)}
        >
          {product.name}
        </button>
        <p className="mt-1 text-sm text-ink/60">{product.tagline}</p>
        <p className="mt-2 text-sm font-bold text-ink">
          {money(product.price)}
          {product.compareAt && <span className="ml-2 font-normal text-ink/40 line-through">{money(product.compareAt)}</span>}
        </p>
      </div>
    </article>
  );
}
