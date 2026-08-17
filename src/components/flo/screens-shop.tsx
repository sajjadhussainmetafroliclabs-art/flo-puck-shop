import { useState } from "react";
import { Bell, SlidersHorizontal, X, LayoutGrid, List, ArrowRight } from "lucide-react";
import logo from "@/assets/flo-logo.png.asset.json";
import { brands, categories, img, money, products } from "@/lib/flo-data";
import { filterProducts, useFlo } from "@/lib/flo-app";
import {
  Btn,
  Chip,
  Header,
  ProductCard,
  ProductRow,
  Screen,
  SearchBar,
  SectionTitle,
} from "./ui";

export function HomeScreen() {
  const { go } = useFlo();
  const best = filterProducts({ tag: "best" });
  const fresh = filterProducts({ tag: "new" });
  const featured = filterProducts({ tag: "featured" });

  return (
    <Screen>
      <div className="flex items-center gap-3 px-5 pt-4">
        <img src={logo.url} alt="Flo Hockey" className="h-9 w-auto object-contain" />
        <div className="flex-1">
          <p className="text-[11px] text-ink-soft">Good morning, Mason</p>
          <p className="font-display text-[15px] font-semibold">Ready for the rink?</p>
        </div>
        <button
          onClick={() => go("notifications")}
          className="relative flex h-10 w-10 items-center justify-center rounded-full bg-surface"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-flame" />
        </button>
      </div>

      <div className="px-5 pt-4">
        <SearchBar onClick={() => go("search")} />
      </div>

      <div className="px-5 pt-5">
        <button
          onClick={() => go("new")}
          className="relative block w-full overflow-hidden rounded-[28px] text-left"
        >
          <img
            src={img.hero}
            alt="Hockey player skating at sunset"
            width={860}
            height={1000}
            className="h-[230px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center p-6">
            <span className="w-fit rounded-full bg-brand px-3 py-1 font-display text-[10px] font-semibold text-brand-foreground">
              NEW SEASON
            </span>
            <h2 className="mt-3 max-w-[190px] font-display text-[26px] leading-tight font-extrabold text-white">
              Sunset Series Drop
            </h2>
            <p className="mt-1 text-xs text-white/70">Up to 30% off select gear</p>
            <span className="mt-4 flex w-fit items-center gap-1.5 rounded-full bg-white px-4 py-2 font-display text-[13px] font-semibold text-night">
              Shop now <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </button>
      </div>

      <div className="pt-7">
        <SectionTitle title="Categories" action={() => go("categories")} />
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5">
          {categories.map((c) => (
            <button
              key={c.name}
              onClick={() => go("category", { category: c.name })}
              className="w-[86px] shrink-0"
            >
              <div className="overflow-hidden rounded-2xl bg-surface">
                <img src={c.image} alt={c.name} loading="lazy" className="h-[86px] w-full object-cover" />
              </div>
              <p className="mt-2 font-display text-xs font-medium">{c.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-7">
        <SectionTitle title="Featured" action={() => go("listing", { title: "Featured" })} />
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar px-5">
          {featured.map((p) => (
            <ProductCard key={p.id} p={p} wide />
          ))}
        </div>
      </div>

      <div className="px-5 pt-7">
        <button
          onClick={() => go("sale")}
          className="relative block w-full overflow-hidden rounded-3xl text-left"
        >
          <img src={img.promo} alt="Ice spray" loading="lazy" className="h-[130px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-flame/95 to-flame/20" />
          <div className="absolute inset-0 flex flex-col justify-center px-6">
            <p className="font-display text-xl font-extrabold text-white">Mid-Season Sale</p>
            <p className="text-xs text-white/85">Up to 40% off sticks & helmets</p>
          </div>
        </button>
      </div>

      <div className="pt-7">
        <SectionTitle title="Best Sellers" action={() => go("listing", { title: "Best Sellers" })} />
        <div className="space-y-3 px-5">
          {best.slice(0, 3).map((p) => (
            <ProductRow key={p.id} p={p} />
          ))}
        </div>
      </div>

      <div className="pt-7">
        <SectionTitle title="New Arrivals" action={() => go("new")} />
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar px-5">
          {fresh.map((p) => (
            <ProductCard key={p.id} p={p} wide />
          ))}
        </div>
      </div>

      <div className="pt-7">
        <SectionTitle title="Popular Brands" />
        <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-5">
          {brands.map((b) => (
            <div
              key={b}
              className="shrink-0 rounded-2xl border border-border px-5 py-4 font-display text-sm font-semibold text-ink-soft"
            >
              {b}
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}

export function CategoriesScreen() {
  const { go } = useFlo();
  return (
    <Screen>
      <Header title="Shop by category" />
      <div className="px-5 pt-1">
        <SearchBar onClick={() => go("search")} />
      </div>
      <div className="grid grid-cols-2 gap-3.5 px-5 pt-5">
        {categories.map((c) => (
          <button
            key={c.name}
            onClick={() => go("category", { category: c.name })}
            className="overflow-hidden rounded-3xl bg-surface text-left"
          >
            <img src={c.image} alt={c.name} loading="lazy" className="h-[130px] w-full object-cover" />
            <div className="p-3.5">
              <p className="font-display text-sm font-semibold">{c.name}</p>
              <p className="text-xs text-ink-soft">{c.count} items</p>
            </div>
          </button>
        ))}
      </div>
    </Screen>
  );
}

export function CategoryScreen() {
  const { params, go } = useFlo();
  const cat = params.category ?? "Sticks";
  const list = filterProducts({ category: cat });
  const meta = categories.find((c) => c.name === cat);
  return (
    <Screen>
      <div className="relative">
        <img src={meta?.image} alt={cat} className="h-[190px] w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10" />
        <div className="absolute inset-x-0 top-0">
          <Header transparent />
        </div>
        <div className="absolute bottom-5 left-5">
          <h1 className="font-display text-3xl font-extrabold text-white">{cat}</h1>
          <p className="text-xs text-white/75">{list.length} products available</p>
        </div>
      </div>
      <div className="flex items-center gap-2 px-5 pt-4">
        <Chip active>All</Chip>
        <Chip onClick={() => go("new")}>New</Chip>
        <Chip onClick={() => go("sale")}>Sale</Chip>
        <button
          onClick={() => go("listing", { title: cat, category: cat })}
          className="ml-auto flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 font-display text-[13px] font-medium"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3.5 px-5 pt-5">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </Screen>
  );
}

const recent = ["carbon stick", "goalie gloves", "youth skates"];

export function SearchScreen() {
  const { go } = useFlo();
  const [q, setQ] = useState("");
  return (
    <Screen>
      <Header title="Search" />
      <div className="px-5">
        <div className="flex items-center gap-2 rounded-2xl bg-surface px-4 py-3.5">
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sticks, skates, jerseys…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-soft"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Clear">
              <X className="h-4 w-4 text-ink-soft" />
            </button>
          )}
        </div>
        <Btn full className="mt-3" onClick={() => go("results", { query: q })}>
          Search
        </Btn>

        <p className="mt-7 font-display text-sm font-semibold">Recent searches</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {recent.map((r) => (
            <Chip key={r} onClick={() => go("results", { query: r })}>
              {r}
            </Chip>
          ))}
        </div>

        <p className="mt-7 font-display text-sm font-semibold">Trending now</p>
        <div className="mt-3 space-y-3">
          {products.slice(0, 3).map((p) => (
            <ProductRow key={p.id} p={p} />
          ))}
        </div>
      </div>
    </Screen>
  );
}

export function ResultsScreen() {
  const { params, go } = useFlo();
  const list = filterProducts({ query: params.query });
  return (
    <Screen>
      <Header title={`"${params.query ?? ""}"`} />
      <div className="flex items-center justify-between px-5">
        <p className="text-sm text-ink-soft">{list.length} results</p>
        <button
          onClick={() => go("listing", { title: "Filter & Sort", query: params.query })}
          className="flex items-center gap-1.5 rounded-full bg-surface px-4 py-2 font-display text-[13px] font-medium"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filter & sort
        </button>
      </div>
      {list.length === 0 ? (
        <div className="px-10 pt-24 text-center">
          <p className="font-display text-lg font-bold">No matches</p>
          <p className="mt-1 text-sm text-ink-soft">Try a different keyword or browse categories.</p>
          <Btn className="mt-5" onClick={() => go("categories")}>
            Browse categories
          </Btn>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 px-5 pt-4">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </Screen>
  );
}

export function SaleScreen() {
  const list = filterProducts({ tag: "sale" });
  return (
    <Screen>
      <Header title="Sale Collection" />
      <div className="px-5">
        <div className="relative overflow-hidden rounded-3xl bg-flame p-6">
          <p className="font-display text-[11px] font-semibold tracking-[0.25em] text-white/80">
            LIMITED TIME
          </p>
          <p className="mt-2 font-display text-3xl font-extrabold text-white">Up to 40% off</p>
          <p className="mt-1 text-xs text-white/85">Ends Sunday at midnight</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3.5 px-5 pt-5">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </Screen>
  );
}

export function NewArrivalsScreen() {
  const list = filterProducts({ tag: "new" });
  return (
    <Screen>
      <Header title="New Arrivals" />
      <div className="px-5 pb-1">
        <p className="text-sm text-ink-soft">Fresh drops from the Sunset Series and beyond.</p>
      </div>
      <div className="grid grid-cols-2 gap-3.5 px-5 pt-4">
        {list.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </Screen>
  );
}

const sorts = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated"];

export function ListingScreen() {
  const { params, filters, setFilters } = useFlo();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sheet, setSheet] = useState(false);
  const list = filterProducts({
    category: params.category ?? filters.category,
    query: params.query,
    sort: filters.sort,
    max: filters.max,
  });

  return (
    <Screen>
      <Header
        title={params.title ?? "Products"}
        right={
          <div className="flex items-center gap-1 rounded-full bg-surface p-1">
            <button
              onClick={() => setView("grid")}
              aria-label="Grid view"
              className={`rounded-full p-2 ${view === "grid" ? "bg-background shadow-soft" : ""}`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              aria-label="List view"
              className={`rounded-full p-2 ${view === "list" ? "bg-background shadow-soft" : ""}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        }
      />
      <div className="flex items-center justify-between px-5">
        <p className="text-sm text-ink-soft">{list.length} products</p>
        <button
          onClick={() => setSheet(true)}
          className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-display text-[13px] font-medium text-background"
        >
          <SlidersHorizontal className="h-3.5 w-3.5" /> Filter & sort
        </button>
      </div>

      {view === "grid" ? (
        <div className="grid grid-cols-2 gap-3.5 px-5 pt-4">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      ) : (
        <div className="space-y-3 px-5 pt-4">
          {list.map((p) => (
            <ProductRow key={p.id} p={p} />
          ))}
        </div>
      )}

      {sheet && (
        <div className="absolute inset-0 z-40 flex flex-col justify-end">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setSheet(false)}
            aria-label="Close filters"
          />
          <div className="sheet-rise relative rounded-t-[28px] bg-background p-6 pb-8">
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />
            <h3 className="font-display text-lg font-bold">Filter & Sort</h3>

            <p className="mt-5 text-xs font-medium text-ink-soft">SORT BY</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {sorts.map((s) => (
                <Chip
                  key={s}
                  active={filters.sort === s}
                  onClick={() => setFilters({ ...filters, sort: s })}
                >
                  {s}
                </Chip>
              ))}
            </div>

            <p className="mt-6 text-xs font-medium text-ink-soft">CATEGORY</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {["All", ...categories.map((c) => c.name)].map((c) => (
                <Chip
                  key={c}
                  active={filters.category === c}
                  onClick={() => setFilters({ ...filters, category: c })}
                >
                  {c}
                </Chip>
              ))}
            </div>

            <p className="mt-6 text-xs font-medium text-ink-soft">
              MAX PRICE — {money(filters.max)}
            </p>
            <input
              type="range"
              min={50}
              max={500}
              step={10}
              value={filters.max}
              onChange={(e) => setFilters({ ...filters, max: Number(e.target.value) })}
              className="mt-3 w-full accent-[oklch(0.76_0.245_141.5)]"
            />

            <div className="mt-7 flex gap-3">
              <Btn
                variant="ghost"
                className="flex-1"
                onClick={() => setFilters({ sort: "Featured", max: 500, category: "All" })}
              >
                Reset
              </Btn>
              <Btn className="flex-1" onClick={() => setSheet(false)}>
                Show {list.length} results
              </Btn>
            </div>
          </div>
        </div>
      )}
    </Screen>
  );
}
