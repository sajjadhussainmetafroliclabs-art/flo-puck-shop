import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { byId, products, type Product } from "./flo-data";

export type ScreenName =
  | "splash"
  | "welcome"
  | "login"
  | "signup"
  | "home"
  | "categories"
  | "category"
  | "search"
  | "results"
  | "sale"
  | "new"
  | "listing"
  | "product"
  | "gallery"
  | "reviews"
  | "cart"
  | "wishlist"
  | "address"
  | "delivery"
  | "payment"
  | "review"
  | "success"
  | "profile"
  | "orders"
  | "addresses"
  | "payments"
  | "notifications"
  | "settings";

export type Params = { id?: string; category?: string; query?: string; title?: string };

export type CartLine = {
  key: string;
  product: Product;
  size: string;
  color: string;
  qty: number;
};

type Ctx = {
  screen: ScreenName;
  params: Params;
  go: (s: ScreenName, p?: Params) => void;
  back: () => void;
  tab: "home" | "shop" | "cart" | "wishlist" | "profile";
  setTab: (t: Ctx["tab"]) => void;
  cart: CartLine[];
  addToCart: (p: Product, size: string, color: string) => void;
  setQty: (key: string, qty: number) => void;
  removeLine: (key: string) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWish: (id: string) => void;
  subtotal: number;
  count: number;
  filters: { sort: string; max: number; category: string };
  setFilters: (f: Ctx["filters"]) => void;
  modal: null | { type: "added"; line: CartLine };
  setModal: (m: Ctx["modal"]) => void;
};

const FloContext = createContext<Ctx | null>(null);

export function FloProvider({ children }: { children: ReactNode }) {
  const [stack, setStack] = useState<{ screen: ScreenName; params: Params }[]>([
    { screen: "splash", params: {} },
  ]);
  const [tab, setTab] = useState<Ctx["tab"]>("home");
  const [cart, setCart] = useState<CartLine[]>([
    { key: "seed", product: byId("fh-skate-01"), size: "9", color: "Onyx", qty: 1 },
  ]);
  const [wishlist, setWishlist] = useState<string[]>(["fh-jersey-01", "fh-stick-01"]);
  const [filters, setFilters] = useState({ sort: "Featured", max: 500, category: "All" });
  const [modal, setModal] = useState<Ctx["modal"]>(null);

  const go = useCallback((screen: ScreenName, params: Params = {}) => {
    setStack((s) => [...s, { screen, params }]);
    if (screen === "home") setTab("home");
    if (screen === "cart") setTab("cart");
    if (screen === "wishlist") setTab("wishlist");
    if (screen === "profile") setTab("profile");
    if (["categories", "listing", "search", "sale", "new", "results"].includes(screen)) setTab("shop");
  }, []);

  const back = useCallback(() => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)), []);

  const addToCart = useCallback((p: Product, size: string, color: string) => {
    const key = `${p.id}-${size}-${color}`;
    let line: CartLine = { key, product: p, size, color, qty: 1 };
    setCart((c) => {
      const found = c.find((l) => l.key === key);
      if (found) {
        line = { ...found, qty: found.qty + 1 };
        return c.map((l) => (l.key === key ? line : l));
      }
      return [...c, line];
    });
    setModal({ type: "added", line });
  }, []);

  const current = stack[stack.length - 1]!;
  const subtotal = cart.reduce((s, l) => s + l.product.price * l.qty, 0);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const value = useMemo<Ctx>(
    () => ({
      screen: current.screen,
      params: current.params,
      go,
      back,
      tab,
      setTab,
      cart,
      addToCart,
      setQty: (key, qty) =>
        setCart((c) => c.map((l) => (l.key === key ? { ...l, qty: Math.max(1, qty) } : l))),
      removeLine: (key) => setCart((c) => c.filter((l) => l.key !== key)),
      clearCart: () => setCart([]),
      wishlist,
      toggleWish: (id) =>
        setWishlist((w) => (w.includes(id) ? w.filter((x) => x !== id) : [...w, id])),
      subtotal,
      count,
      filters,
      setFilters,
      modal,
      setModal,
    }),
    [current, go, back, tab, cart, addToCart, wishlist, subtotal, count, filters, modal],
  );

  return <FloContext.Provider value={value}>{children}</FloContext.Provider>;
}

export function useFlo() {
  const ctx = useContext(FloContext);
  if (!ctx) throw new Error("useFlo must be used inside FloProvider");
  return ctx;
}

export function filterProducts(opts: {
  category?: string;
  query?: string;
  tag?: "new" | "best" | "sale" | "featured";
  sort?: string;
  max?: number;
}) {
  let list = [...products];
  if (opts.category && opts.category !== "All")
    list = list.filter((p) => p.category === opts.category);
  if (opts.query)
    list = list.filter((p) =>
      (p.name + p.brand + p.category).toLowerCase().includes(opts.query!.toLowerCase()),
    );
  if (opts.tag) list = list.filter((p) => p.tags.includes(opts.tag!));
  if (opts.max) list = list.filter((p) => p.price <= opts.max!);
  if (opts.sort === "Price: Low to High") list.sort((a, b) => a.price - b.price);
  if (opts.sort === "Price: High to Low") list.sort((a, b) => b.price - a.price);
  if (opts.sort === "Top Rated") list.sort((a, b) => b.rating - a.rating);
  return list;
}
