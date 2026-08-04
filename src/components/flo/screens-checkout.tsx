import { useState } from "react";
import {
  Check,
  ChevronRight,
  CreditCard,
  MapPin,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  Zap,
} from "lucide-react";
import { byId, money } from "@/lib/flo-data";
import { useFlo } from "@/lib/flo-app";
import { Btn, Field, Header, ProductCard, Screen } from "./ui";
import { QtyStepper } from "./screens-product";

const SHIP = { standard: 0, express: 14.95, sameday: 24.95 };

export function CartScreen() {
  const { cart, setQty, removeLine, subtotal, go } = useFlo();

  if (cart.length === 0) {
    return (
      <Screen>
        <Header title="Cart" />
        <div className="flex flex-col items-center px-10 pt-28 text-center">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface">
            <ShoppingBag className="h-8 w-8 text-ink-soft" />
          </span>
          <h2 className="mt-5 text-xl font-bold">Your cart is empty</h2>
          <p className="mt-1.5 text-sm text-ink-soft">
            Load up on gear and get back on the ice faster.
          </p>
          <Btn className="mt-6" onClick={() => go("categories")}>
            Start shopping
          </Btn>
        </div>
      </Screen>
    );
  }

  const shipping = subtotal > 100 ? 0 : 9.95;
  return (
    <div className="relative h-full">
      <Screen className="[&>div]:pb-52">
        <Header title={`Cart (${cart.length})`} />
        <div className="space-y-3 px-5">
          {cart.map((l) => (
            <div key={l.key} className="flex gap-3.5 rounded-3xl bg-surface p-3.5">
              <img
                src={l.product.image}
                alt={l.product.name}
                className="h-24 w-24 rounded-2xl bg-background object-cover"
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-start justify-between gap-2">
                  <p className="line-clamp-2 font-display text-sm font-semibold">{l.product.name}</p>
                  <button onClick={() => removeLine(l.key)} aria-label="Remove">
                    <Trash2 className="h-4 w-4 text-ink-soft" />
                  </button>
                </div>
                <p className="mt-0.5 text-xs text-ink-soft">
                  {l.color} · Size {l.size}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <span className="font-display text-sm font-bold">
                    {money(l.product.price * l.qty)}
                  </span>
                  <QtyStepper qty={l.qty} onChange={(q) => setQty(l.key, q)} />
                </div>
              </div>
            </div>
          ))}

          <div className="mt-2 flex gap-2.5">
            <input
              placeholder="Promo code"
              className="flex-1 rounded-2xl border border-border px-4 py-3.5 text-sm outline-none focus:border-brand"
            />
            <Btn variant="dark">Apply</Btn>
          </div>

          <div className="mt-3 space-y-2.5 rounded-3xl border border-border p-5 text-sm">
            <Row label="Subtotal" value={money(subtotal)} />
            <Row label="Shipping" value={shipping === 0 ? "Free" : money(shipping)} />
            <Row label="Estimated tax" value={money(subtotal * 0.07)} />
            <div className="mt-2 border-t border-border pt-3">
              <Row
                bold
                label="Total"
                value={money(subtotal + shipping + subtotal * 0.07)}
              />
            </div>
          </div>
        </div>
      </Screen>
      <div className="absolute inset-x-0 bottom-[84px] z-30 border-t border-border bg-background/95 px-5 pb-4 pt-3.5 backdrop-blur-xl">
        <Btn full onClick={() => go("address")}>
          Checkout · {money(subtotal + shipping + subtotal * 0.07)}
        </Btn>
      </div>
    </div>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={bold ? "font-display font-semibold" : "text-ink-soft"}>{label}</span>
      <span className={bold ? "font-display text-base font-extrabold" : "font-medium"}>{value}</span>
    </div>
  );
}

export function WishlistScreen() {
  const { wishlist, go } = useFlo();
  const items = wishlist.map(byId);
  return (
    <Screen>
      <Header title={`Wishlist (${items.length})`} />
      {items.length === 0 ? (
        <div className="px-10 pt-28 text-center">
          <h2 className="text-xl font-bold">Nothing saved yet</h2>
          <p className="mt-1.5 text-sm text-ink-soft">Tap the heart on any product to save it.</p>
          <Btn className="mt-6" onClick={() => go("categories")}>
            Explore gear
          </Btn>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3.5 px-5">
          {items.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </Screen>
  );
}

export function AddressScreen() {
  const { go } = useFlo();
  const [sel, setSel] = useState(0);
  const saved = [
    { label: "Home", line: "482 Palm Bay Dr, Tampa, FL 33602" },
    { label: "Rink", line: "1 Flo Arena Way, Sunrise, FL 33323" },
  ];
  return (
    <div className="relative h-full">
      <Screen>
        <Header title="Shipping address" />
        <Steps step={1} />
        <div className="space-y-3 px-5 pt-2">
          {saved.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setSel(i)}
              className={`flex w-full items-start gap-3 rounded-3xl border p-4 text-left ${
                sel === i ? "border-brand bg-brand/5" : "border-border"
              }`}
            >
              <MapPin className="mt-0.5 h-5 w-5 text-brand" />
              <div className="flex-1">
                <p className="font-display text-sm font-semibold">{s.label}</p>
                <p className="text-xs text-ink-soft">{s.line}</p>
              </div>
              {sel === i && <Check className="h-4 w-4 text-brand" />}
            </button>
          ))}
          <div className="mt-3 space-y-4 rounded-3xl border border-border p-5">
            <p className="font-display text-sm font-semibold">Add a new address</p>
            <Field label="Full name" placeholder="Mason Reyes" />
            <Field label="Street address" placeholder="482 Palm Bay Dr" />
            <div className="flex gap-3">
              <div className="flex-1">
                <Field label="City" placeholder="Tampa" />
              </div>
              <div className="w-28">
                <Field label="ZIP" placeholder="33602" />
              </div>
            </div>
          </div>
        </div>
      </Screen>
      <BottomBar label="Continue to delivery" onClick={() => go("delivery")} />
    </div>
  );
}

export function DeliveryScreen() {
  const { go } = useFlo();
  const [sel, setSel] = useState("standard");
  const opts = [
    { id: "standard", title: "Standard", sub: "3-5 business days", price: SHIP.standard, icon: Truck },
    { id: "express", title: "Express", sub: "2 business days", price: SHIP.express, icon: Zap },
    { id: "sameday", title: "Same-day (Tampa)", sub: "Today before 9pm", price: SHIP.sameday, icon: Zap },
  ];
  return (
    <div className="relative h-full">
      <Screen>
        <Header title="Delivery method" />
        <Steps step={2} />
        <div className="space-y-3 px-5 pt-2">
          {opts.map((o) => {
            const Icon = o.icon;
            return (
              <button
                key={o.id}
                onClick={() => setSel(o.id)}
                className={`flex w-full items-center gap-3.5 rounded-3xl border p-4 text-left ${
                  sel === o.id ? "border-brand bg-brand/5" : "border-border"
                }`}
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
                  <Icon className="h-4.5 w-4.5 text-brand" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-sm font-semibold">{o.title}</p>
                  <p className="text-xs text-ink-soft">{o.sub}</p>
                </div>
                <span className="font-display text-sm font-bold">
                  {o.price === 0 ? "Free" : money(o.price)}
                </span>
              </button>
            );
          })}
        </div>
      </Screen>
      <BottomBar label="Continue to payment" onClick={() => go("payment")} />
    </div>
  );
}

export function PaymentScreen() {
  const { go } = useFlo();
  const [sel, setSel] = useState("card");
  const methods = [
    { id: "card", label: "Visa •••• 4821", sub: "Expires 04/29" },
    { id: "apple", label: "Apple Pay", sub: "Fastest checkout" },
    { id: "paypal", label: "PayPal", sub: "mason@flohockey.com" },
  ];
  return (
    <div className="relative h-full">
      <Screen>
        <Header title="Payment method" />
        <Steps step={3} />
        <div className="space-y-3 px-5 pt-2">
          {methods.map((m) => (
            <button
              key={m.id}
              onClick={() => setSel(m.id)}
              className={`flex w-full items-center gap-3.5 rounded-3xl border p-4 text-left ${
                sel === m.id ? "border-brand bg-brand/5" : "border-border"
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
                <CreditCard className="h-4.5 w-4.5 text-brand" />
              </span>
              <div className="flex-1">
                <p className="font-display text-sm font-semibold">{m.label}</p>
                <p className="text-xs text-ink-soft">{m.sub}</p>
              </div>
              {sel === m.id && <Check className="h-4 w-4 text-brand" />}
            </button>
          ))}
          <div className="mt-3 space-y-4 rounded-3xl border border-border p-5">
            <p className="font-display text-sm font-semibold">Add new card</p>
            <Field label="Card number" placeholder="4242 4242 4242 4242" />
            <div className="flex gap-3">
              <div className="flex-1">
                <Field label="Expiry" placeholder="04/29" />
              </div>
              <div className="w-28">
                <Field label="CVC" placeholder="123" />
              </div>
            </div>
          </div>
          <p className="flex items-center justify-center gap-1.5 pt-2 text-xs text-ink-soft">
            <ShieldCheck className="h-4 w-4 text-brand" /> Secured with 256-bit encryption
          </p>
        </div>
      </Screen>
      <BottomBar label="Review order" onClick={() => go("review")} />
    </div>
  );
}

export function ReviewScreen() {
  const { cart, subtotal, go, clearCart } = useFlo();
  const tax = subtotal * 0.07;
  return (
    <div className="relative h-full">
      <Screen>
        <Header title="Order review" />
        <Steps step={4} />
        <div className="space-y-3 px-5 pt-2">
          <div className="rounded-3xl border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold">Shipping to</p>
              <button onClick={() => go("address")} className="text-xs font-medium text-brand">
                Change
              </button>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              Mason Reyes · 482 Palm Bay Dr, Tampa, FL 33602
            </p>
          </div>
          <div className="rounded-3xl border border-border p-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold">Payment</p>
              <button onClick={() => go("payment")} className="text-xs font-medium text-brand">
                Change
              </button>
            </div>
            <p className="mt-1 text-xs text-ink-soft">Visa •••• 4821 · Express delivery</p>
          </div>

          <div className="rounded-3xl bg-surface p-4">
            <p className="font-display text-sm font-semibold">Items ({cart.length})</p>
            <div className="mt-3 space-y-3">
              {cart.map((l) => (
                <div key={l.key} className="flex items-center gap-3">
                  <img
                    src={l.product.image}
                    alt={l.product.name}
                    className="h-14 w-14 rounded-xl bg-background object-cover"
                  />
                  <div className="flex-1">
                    <p className="line-clamp-1 text-[13px] font-medium">{l.product.name}</p>
                    <p className="text-xs text-ink-soft">
                      {l.color} · {l.size} · x{l.qty}
                    </p>
                  </div>
                  <span className="font-display text-[13px] font-bold">
                    {money(l.product.price * l.qty)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2.5 rounded-3xl border border-border p-5 text-sm">
            <Row label="Subtotal" value={money(subtotal)} />
            <Row label="Shipping" value="Free" />
            <Row label="Tax" value={money(tax)} />
            <div className="mt-2 border-t border-border pt-3">
              <Row bold label="Total" value={money(subtotal + tax)} />
            </div>
          </div>
        </div>
      </Screen>
      <BottomBar
        label={`Place order · ${money(subtotal + tax)}`}
        onClick={() => {
          clearCart();
          go("success");
        }}
      />
    </div>
  );
}

export function SuccessScreen() {
  const { go } = useFlo();
  return (
    <Screen nav={false}>
      <div className="flex flex-col items-center px-8 pt-32 text-center">
        <span className="flex h-24 w-24 items-center justify-center rounded-full bg-brand/12">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand">
            <Check className="h-8 w-8 text-brand-foreground" strokeWidth={3} />
          </span>
        </span>
        <h1 className="mt-7 text-[28px] font-extrabold">Order confirmed</h1>
        <p className="mt-2 text-sm text-ink-soft">
          Order #FH-20482 is on its way. We'll text you tracking updates.
        </p>
        <div className="mt-7 w-full rounded-3xl bg-surface p-5 text-left">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-brand" />
            <div>
              <p className="font-display text-sm font-semibold">Arriving Thursday</p>
              <p className="text-xs text-ink-soft">482 Palm Bay Dr, Tampa, FL</p>
            </div>
          </div>
        </div>
        <div className="mt-7 w-full space-y-3">
          <Btn full onClick={() => go("orders")}>
            Track order
          </Btn>
          <Btn full variant="ghost" onClick={() => go("home")}>
            Continue shopping
          </Btn>
        </div>
      </div>
    </Screen>
  );
}

function Steps({ step }: { step: number }) {
  const labels = ["Address", "Delivery", "Payment", "Review"];
  return (
    <div className="flex items-center gap-2 px-5 pb-4">
      {labels.map((l, i) => (
        <div key={l} className="flex flex-1 flex-col gap-1.5">
          <span
            className={`h-1 rounded-full ${i + 1 <= step ? "bg-brand" : "bg-border"}`}
          />
          <span
            className={`font-display text-[10px] ${i + 1 <= step ? "text-ink" : "text-ink-soft"}`}
          >
            {l}
          </span>
        </div>
      ))}
    </div>
  );
}

function BottomBar({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-30 border-t border-border bg-background/95 px-5 pb-6 pt-3.5 backdrop-blur-xl">
      <Btn full onClick={onClick}>
        {label}
      </Btn>
    </div>
  );
}

export { ChevronRight };
