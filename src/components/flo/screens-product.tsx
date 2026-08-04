import { useState } from "react";
import { Check, ChevronRight, Minus, Plus, Share2, Star, Truck, X, ZoomIn } from "lucide-react";
import { byId, money, products, reviewList } from "@/lib/flo-data";
import { useFlo } from "@/lib/flo-app";
import { Btn, Header, ProductCard, Rating, Screen, SectionTitle, WishButton } from "./ui";

export function ProductScreen() {
  const { params, go, addToCart } = useFlo();
  const p = byId(params.id ?? "fh-stick-01");
  const [size, setSize] = useState(p.sizes[0]!);
  const [color, setColor] = useState(p.colors[0]!.name);
  const [active, setActive] = useState(0);
  const related = products.filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <div className="relative h-full">
      <Screen>
        <div className="relative bg-surface">
          <img
            src={p.gallery[active]}
            alt={p.name}
            className="h-[380px] w-full object-cover"
            onClick={() => go("gallery", { id: p.id })}
          />
          <div className="absolute inset-x-0 top-0">
            <Header
              transparent
              right={
                <>
                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-background/90 shadow-soft">
                    <Share2 className="h-4.5 w-4.5" />
                  </button>
                  <WishButton id={p.id} className="!h-10 !w-10" />
                </>
              }
            />
          </div>
          <button
            onClick={() => go("gallery", { id: p.id })}
            className="absolute bottom-4 right-5 flex items-center gap-1.5 rounded-full bg-background/90 px-3.5 py-2 font-display text-xs font-semibold shadow-soft backdrop-blur"
          >
            <ZoomIn className="h-3.5 w-3.5" /> Zoom gallery
          </button>
          <div className="absolute bottom-4 left-5 flex gap-2">
            {p.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Image ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === active ? "w-6 bg-ink" : "w-2 bg-ink/25"}`}
              />
            ))}
          </div>
        </div>

        <div className="px-5 pt-5">
          <p className="text-[11px] uppercase tracking-wide text-ink-soft">
            {p.brand} · {p.category}
          </p>
          <h1 className="mt-1 text-[24px] font-extrabold leading-tight">{p.name}</h1>
          <div className="mt-2 flex items-center gap-3">
            <button onClick={() => go("reviews", { id: p.id })}>
              <Rating value={p.rating} count={p.reviews} />
            </button>
            <span className="text-xs text-brand">In stock</span>
          </div>
          <div className="mt-3 flex items-end gap-2.5">
            <span className="font-display text-[26px] font-extrabold">{money(p.price)}</span>
            {p.compareAt && (
              <span className="pb-1 text-sm text-ink-soft line-through">{money(p.compareAt)}</span>
            )}
            {p.compareAt && (
              <span className="mb-1.5 rounded-full bg-flame/10 px-2 py-0.5 font-display text-[11px] font-semibold text-flame">
                Save {money(p.compareAt - p.price)}
              </span>
            )}
          </div>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">{p.description}</p>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold">Colour</p>
              <span className="text-xs text-ink-soft">{color}</span>
            </div>
            <div className="mt-3 flex gap-3">
              {p.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${color === c.name ? "border-brand" : "border-border"}`}
                >
                  <span
                    className="h-7 w-7 rounded-full border border-border"
                    style={{ backgroundColor: c.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold">Size</p>
              <button className="text-xs font-medium text-brand">Size guide</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {p.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`min-w-[62px] rounded-2xl border px-4 py-3 font-display text-[13px] font-semibold ${
                    size === s ? "border-ink bg-ink text-background" : "border-border text-ink"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 rounded-3xl bg-surface p-4">
            <Truck className="h-5 w-5 text-brand" />
            <div>
              <p className="font-display text-[13px] font-semibold">Free 2-day shipping</p>
              <p className="text-xs text-ink-soft">On orders over $100. Free returns for 30 days.</p>
            </div>
          </div>

          <button
            onClick={() => go("reviews", { id: p.id })}
            className="mt-4 flex w-full items-center justify-between rounded-3xl border border-border p-4"
          >
            <div className="text-left">
              <p className="font-display text-[13px] font-semibold">Ratings & Reviews</p>
              <p className="text-xs text-ink-soft">{p.reviews} verified reviews</p>
            </div>
            <ChevronRight className="h-4 w-4 text-ink-soft" />
          </button>
        </div>

        <div className="pt-8">
          <SectionTitle title="You might also like" />
          <div className="flex gap-3.5 overflow-x-auto no-scrollbar px-5">
            {related.map((r) => (
              <ProductCard key={r.id} p={r} wide />
            ))}
          </div>
        </div>
      </Screen>

      <div className="absolute inset-x-0 bottom-0 z-30 flex gap-3 border-t border-border bg-background/95 px-5 pb-6 pt-3.5 backdrop-blur-xl">
        <Btn variant="ghost" className="flex-1" onClick={() => addToCart(p, size, color)}>
          Add to cart
        </Btn>
        <Btn
          className="flex-1"
          onClick={() => {
            addToCart(p, size, color);
            go("address");
          }}
        >
          Buy now
        </Btn>
      </div>
    </div>
  );
}

export function GalleryScreen() {
  const { params, back } = useFlo();
  const p = byId(params.id ?? "fh-stick-01");
  const [i, setI] = useState(0);
  const [zoom, setZoom] = useState(false);
  return (
    <div className="screen-fade flex h-full flex-col bg-ink">
      <div className="flex items-center justify-between px-5 pt-4">
        <p className="font-display text-sm font-medium text-background">
          {i + 1} / {p.gallery.length}
        </p>
        <button
          onClick={back}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-background"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="flex flex-1 items-center justify-center overflow-hidden px-4">
        <img
          src={p.gallery[i]}
          alt={p.name}
          onClick={() => setZoom((z) => !z)}
          className={`w-full rounded-3xl object-cover transition-transform duration-300 ${zoom ? "scale-150" : "scale-100"}`}
        />
      </div>
      <p className="pb-3 text-center text-xs text-background/60">
        Tap image to {zoom ? "zoom out" : "zoom in"}
      </p>
      <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-8">
        {p.gallery.map((g, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 ${idx === i ? "border-brand" : "border-transparent"}`}
          >
            <img src={g} alt="" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}

export function ReviewsScreen() {
  const { params } = useFlo();
  const p = byId(params.id ?? "fh-stick-01");
  const bars = [78, 15, 4, 2, 1];
  return (
    <Screen>
      <Header title="Ratings & Reviews" />
      <div className="px-5">
        <div className="flex items-center gap-6 rounded-3xl bg-surface p-5">
          <div className="text-center">
            <p className="font-display text-4xl font-extrabold">{p.rating.toFixed(1)}</p>
            <div className="mt-1 flex justify-center gap-0.5">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-3.5 w-3.5 fill-flame text-flame" />
              ))}
            </div>
            <p className="mt-1 text-xs text-ink-soft">{p.reviews} reviews</p>
          </div>
          <div className="flex-1 space-y-1.5">
            {bars.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-3 text-[11px] text-ink-soft">{5 - i}</span>
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                  <div className="h-full rounded-full bg-brand" style={{ width: `${b}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {reviewList.map((r) => (
            <div key={r.name} className="rounded-3xl border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold">{r.name}</p>
                <span className="text-xs text-ink-soft">{r.date}</span>
              </div>
              <div className="mt-1 flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-flame text-flame" />
                ))}
              </div>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{r.text}</p>
              <p className="mt-2 flex items-center gap-1 text-[11px] text-brand">
                <Check className="h-3 w-3" /> Verified purchase
              </p>
            </div>
          ))}
        </div>
        <Btn full variant="outline" className="mt-5">
          Write a review
        </Btn>
      </div>
    </Screen>
  );
}

export function AddedModal() {
  const { modal, setModal, go, count, subtotal } = useFlo();
  if (!modal) return null;
  const { line } = modal;
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        className="absolute inset-0 bg-black/40"
        onClick={() => setModal(null)}
        aria-label="Close"
      />
      <div className="sheet-rise relative rounded-t-[28px] bg-background p-6 pb-8">
        <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border" />
        <div className="flex items-center gap-2 text-brand">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
            <Check className="h-3.5 w-3.5" />
          </span>
          <p className="font-display text-sm font-semibold">Added to cart</p>
        </div>
        <div className="mt-4 flex items-center gap-3.5">
          <img
            src={line.product.image}
            alt={line.product.name}
            className="h-20 w-20 rounded-2xl bg-surface object-cover"
          />
          <div className="flex-1">
            <p className="font-display text-sm font-semibold">{line.product.name}</p>
            <p className="text-xs text-ink-soft">
              {line.color} · Size {line.size} · Qty {line.qty}
            </p>
            <p className="mt-1 font-display text-sm font-bold">{money(line.product.price)}</p>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-surface px-4 py-3 text-sm">
          <span className="text-ink-soft">Subtotal ({count} items)</span>
          <span className="font-display font-bold">{money(subtotal)}</span>
        </div>
        <div className="mt-5 flex gap-3">
          <Btn variant="ghost" className="flex-1" onClick={() => setModal(null)}>
            Keep shopping
          </Btn>
          <Btn
            className="flex-1"
            onClick={() => {
              setModal(null);
              go("cart");
            }}
          >
            View cart
          </Btn>
        </div>
      </div>
    </div>
  );
}

export function QtyStepper({
  qty,
  onChange,
}: {
  qty: number;
  onChange: (q: number) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-full bg-surface px-2 py-1.5">
      <button onClick={() => onChange(qty - 1)} aria-label="Decrease">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-4 text-center font-display text-[13px] font-semibold">{qty}</span>
      <button onClick={() => onChange(qty + 1)} aria-label="Increase">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
