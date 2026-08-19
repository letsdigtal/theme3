import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { findProduct, products } from './data';

export type Route = {
  page: 'home' | 'shop' | 'product' | 'about' | 'faq';
  slug?: string;
  filter?: string;
  filterType?: 'concern' | 'category';
};

export type CartLine = { id: string; qty: number };

type StoreValue = {
  route: Route;
  navigate: (page: Route['page'], opts?: Partial<Omit<Route, 'page'>>) => void;
  cart: CartLine[];
  addToCart: (id: string, qty?: number, silent?: boolean) => void;
  addMany: (ids: string[], silent?: boolean) => void;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  toast: string | null;
  notify: (msg: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [route, setRoute] = useState<Route>({ page: 'home' });
  const [cart, setCart] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem('calma-cart');
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        return parsed.filter((l) => findProduct(l.id));
      }
    } catch {
      /* ignore */
    }
    return [];
  });
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem('calma-cart', JSON.stringify(cart));
    } catch {
      /* ignore */
    }
  }, [cart]);

  const navigate = useCallback((page: Route['page'], opts?: Partial<Omit<Route, 'page'>>) => {
    setRoute({ page, ...opts });
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const notify = useCallback((msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 2600);
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1, silent = false) => {
      setCart((prev) => {
        const existing = prev.find((l) => l.id === id);
        if (existing) {
          return prev.map((l) => (l.id === id ? { ...l, qty: Math.min(9, l.qty + qty) } : l));
        }
        return [...prev, { id, qty }];
      });
      if (!silent) {
        const p = findProduct(id);
        notify(p ? `${p.name} added to your bag` : 'Added to your bag');
      }
    },
    [notify]
  );

  const addMany = useCallback(
    (ids: string[], silent = false) => {
      setCart((prev) => {
        let next = prev;
        for (const id of ids) {
          const existing = next.find((l) => l.id === id);
          next = existing
            ? next.map((l) => (l.id === id ? { ...l, qty: Math.min(9, l.qty + 1) } : l))
            : [...next, { id, qty: 1 }];
        }
        return next;
      });
      if (!silent) notify('The Full Ritual added to your bag');
    },
    [notify]
  );

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty: Math.min(9, qty) } : l))
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.id !== id));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const count = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const subtotal = useMemo(
    () => cart.reduce((s, l) => s + (findProduct(l.id)?.price ?? 0) * l.qty, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      route,
      navigate,
      cart,
      addToCart,
      addMany,
      setQty,
      removeLine,
      clearCart,
      count,
      subtotal,
      cartOpen,
      setCartOpen,
      toast,
      notify,
    }),
    [route, navigate, cart, addToCart, addMany, setQty, removeLine, clearCart, count, subtotal, cartOpen, toast, notify]
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used within StoreProvider');
  return ctx;
}

export { products };
