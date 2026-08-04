import type { ReactNode } from "react";
import {
  ChevronLeft,
  Heart,
  Home,
  Search,
  ShoppingBag,
  Star,
  User,
  Grid2x2,
} from "lucide-react";
import { money, type Product } from "@/lib/flo-data";
import { useFlo } from "@/lib/flo-app";
import { cn } from "@/lib/utils";

export function Btn({
  children,
  onClick,
  variant = "primary",
  className,
  full,
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "flame" | "dark" | "ghost" | "outline";
  className?: string;
  full?: boolean;
}) {
  const styles = {
    primary: "bg-brand text-brand-foreground shadow-[0_8px_24px_rgba(24,214,27,0.35)]",
    flame: "bg-flame text-flame-foreground shadow-[0_8px_24px_rgba(245,106,18,0.3)]",
    dark: "bg-ink text-background",
    ghost: "bg-surface text-ink",
    outline: "border border-border bg-background text-ink",
  }[variant];
  return (
    <button
      onClick={onClick}
      className={cn(
        "font-display text-[15px] font-semibold rounded-2xl px-5 py-3.5 active:scale-[0.97] transition-transform",
        styles,
        full && "w-full",
        className,
      )}
    >
      {children}
    </button>
  );
}

export function Header({
  title,
  right,
  transparent,
}: {
  title?: string;
  right?: ReactNode;
  transparent?: boolean;
}) {
  const { back } = useFlo();
  return (
    <div
      className={cn(
        "sticky top-0 z-20 flex items-center gap-3 px-5 pt-3 pb-3",
        transparent ? "bg-transparent" : "bg-background/90 backdrop-blur-xl",
      )}
    >
      <button
        onClick={back}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-ink"
        aria-label="Back"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      {title && <h2 className="flex-1 text-[17px] font-display font-semibold">{title}</h2>}
      <div className="ml-auto flex items-center gap-2">{right}</div>
    </div>
  );
}

export function Rating({ value, count, small }: { value: number; count?: number; small?: boolean }) {
  return (
    <div className="flex items-center gap-1">
      <Star className={cn("fill-flame text-flame", small ? "h-3.5 w-3.5" : "h-4 w-4")} />
      <span className={cn("font-medium text-ink", small ? "text-xs" : "text-sm")}>
        {value.toFixed(1)}
      </span>
      {count !== undefined && <span className="text-xs text-ink-soft">({count})</span>}
    </div>
  );
}

export function SectionTitle({ title, action }: { title: string; action?: () => void }) {
  return (
    <div className="mb-3 flex items-end justify-between px-5">
      <h3 className="text-[19px] font-display font-bold">{title}</h3>
      {action && (
        <button onClick={action} className="text-[13px] font-medium text-brand">
          See all
        </button>
      )}
    </div>
  );
}

export function WishButton({ id, className }: { id: string; className?: string }) {
  const { wishlist, toggleWish } = useFlo();
  const active = wishlist.includes(id);
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleWish(id);
      }}
      aria-label="Toggle wishlist"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-background/90 shadow-soft backdrop-blur",
        className,
      )}
    >
      <Heart className={cn("h-4 w-4", active ? "fill-flame text-flame" : "text-ink-soft")} />
    </button>
  );
}

export function ProductCard({ p, wide }: { p: Product; wide?: boolean }) {
  const { go } = useFlo();
  return (
    <button
      onClick={() => go("product", { id: p.id })}
      className={cn("text-left", wide ? "w-[170px] shrink-0" : "w-full")}
    >
      <div className="relative overflow-hidden rounded-3xl bg-surface">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="aspect-square w-full object-cover"
        />
        <WishButton id={p.id} className="absolute right-2.5 top-2.5" />
        {p.compareAt && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-flame px-2.5 py-1 text-[10px] font-display font-semibold text-flame-foreground">
            SALE
          </span>
        )}
      </div>
      <div className="mt-2.5 px-0.5">
        <p className="text-[11px] uppercase tracking-wide text-ink-soft">{p.brand}</p>
        <p className="mt-0.5 line-clamp-1 text-sm font-display font-semibold text-ink">{p.name}</p>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-display font-bold text-ink">{money(p.price)}</span>
          {p.compareAt && (
            <span className="text-xs text-ink-soft line-through">{money(p.compareAt)}</span>
          )}
        </div>
      </div>
    </button>
  );
}

export function ProductRow({ p }: { p: Product }) {
  const { go } = useFlo();
  return (
    <button
      onClick={() => go("product", { id: p.id })}
      className="flex w-full items-center gap-3 rounded-3xl bg-background p-3 text-left shadow-soft"
    >
      <img
        src={p.image}
        alt={p.name}
        loading="lazy"
        className="h-20 w-20 rounded-2xl bg-surface object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="text-[11px] uppercase tracking-wide text-ink-soft">{p.brand}</p>
        <p className="line-clamp-1 text-sm font-display font-semibold">{p.name}</p>
        <div className="mt-1">
          <Rating value={p.rating} count={p.reviews} small />
        </div>
      </div>
      <div className="text-right">
        <p className="font-display text-sm font-bold">{money(p.price)}</p>
        {p.compareAt && <p className="text-xs text-ink-soft line-through">{money(p.compareAt)}</p>}
      </div>
    </button>
  );
}

export function SearchBar({ onClick, value }: { onClick?: () => void; value?: string }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-2xl bg-surface px-4 py-3.5 text-left"
    >
      <Search className="h-4.5 w-4.5 text-ink-soft" />
      <span className={cn("text-sm", value ? "text-ink" : "text-ink-soft")}>
        {value || "Search sticks, skates, jerseys…"}
      </span>
    </button>
  );
}

export function Field({
  label,
  placeholder,
  type = "text",
  defaultValue,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  defaultValue?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-ink-soft">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-border bg-background px-4 py-3.5 text-sm outline-none placeholder:text-ink-soft focus:border-brand"
      />
    </label>
  );
}

export function BottomNav() {
  const { tab, go, count } = useFlo();
  const items = [
    { id: "home", label: "Home", icon: Home, screen: "home" as const },
    { id: "shop", label: "Shop", icon: Grid2x2, screen: "categories" as const },
    { id: "cart", label: "Cart", icon: ShoppingBag, screen: "cart" as const },
    { id: "wishlist", label: "Wishlist", icon: Heart, screen: "wishlist" as const },
    { id: "profile", label: "Profile", icon: User, screen: "profile" as const },
  ];
  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-2 pb-5 pt-2 backdrop-blur-xl">
      <div className="flex items-center justify-between">
        {items.map((it) => {
          const active = tab === it.id;
          const Icon = it.icon;
          return (
            <button
              key={it.id}
              onClick={() => go(it.screen)}
              className="relative flex flex-1 flex-col items-center gap-1 py-1"
            >
              <Icon
                className={cn("h-[22px] w-[22px]", active ? "text-brand" : "text-ink-soft")}
                strokeWidth={active ? 2.4 : 1.8}
              />
              {it.id === "cart" && count > 0 && (
                <span className="absolute right-[22%] top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-flame px-1 text-[9px] font-display font-semibold text-flame-foreground">
                  {count}
                </span>
              )}
              <span
                className={cn(
                  "font-display text-[10px] font-medium",
                  active ? "text-ink" : "text-ink-soft",
                )}
              >
                {it.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export function Screen({
  children,
  nav = true,
  className,
}: {
  children: ReactNode;
  nav?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("screen-fade h-full overflow-y-auto no-scrollbar bg-background", className)}>
      <div className={nav ? "pb-28" : "pb-6"}>{children}</div>
    </div>
  );
}

export function Chip({
  children,
  active,
  onClick,
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full px-4 py-2 font-display text-[13px] font-medium transition-colors",
        active ? "bg-ink text-background" : "bg-surface text-ink-soft",
      )}
    >
      {children}
    </button>
  );
}
