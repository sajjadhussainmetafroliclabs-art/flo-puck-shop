import {
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  LogOut,
  MapPin,
  Package,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { byId, money } from "@/lib/flo-data";
import { useFlo, type ScreenName } from "@/lib/flo-app";
import { Btn, Header, Screen } from "./ui";

const orders = [
  { id: "FH-20482", date: "Aug 2, 2026", status: "In transit", total: 429, product: "fh-skate-01" },
  { id: "FH-19934", date: "Jul 14, 2026", status: "Delivered", total: 289, product: "fh-stick-01" },
  { id: "FH-19110", date: "Jun 28, 2026", status: "Delivered", total: 119, product: "fh-jersey-01" },
];

export function ProfileScreen() {
  const { go, wishlist, count } = useFlo();
  const rows: { icon: typeof Package; label: string; sub: string; screen: ScreenName }[] = [
    { icon: Package, label: "My Orders", sub: `${orders.length} orders`, screen: "orders" },
    { icon: Heart, label: "Wishlist", sub: `${wishlist.length} saved`, screen: "wishlist" },
    { icon: MapPin, label: "Addresses", sub: "2 saved", screen: "addresses" },
    { icon: CreditCard, label: "Payment Methods", sub: "Visa •••• 4821", screen: "payments" },
    { icon: Bell, label: "Notifications", sub: "3 unread", screen: "notifications" },
    { icon: Settings, label: "Settings", sub: "Account & preferences", screen: "settings" },
  ];
  return (
    <Screen>
      <div className="px-5 pt-5">
        <h1 className="text-[26px] font-extrabold">Profile</h1>
        <div className="mt-4 flex items-center gap-4 rounded-3xl bg-ink p-5">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand font-display text-lg font-extrabold text-brand-foreground">
            MR
          </span>
          <div className="flex-1">
            <p className="font-display text-base font-semibold text-background">Mason Reyes</p>
            <p className="text-xs text-background/60">mason@flohockey.com</p>
          </div>
          <span className="rounded-full bg-brand/20 px-3 py-1 font-display text-[10px] font-semibold text-brand">
            FLO+ MEMBER
          </span>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { k: "Orders", v: orders.length },
            { k: "Wishlist", v: wishlist.length },
            { k: "In cart", v: count },
          ].map((s) => (
            <div key={s.k} className="rounded-3xl bg-surface p-4 text-center">
              <p className="font-display text-xl font-extrabold">{s.v}</p>
              <p className="text-[11px] text-ink-soft">{s.k}</p>
            </div>
          ))}
        </div>

        <div className="mt-5 divide-y divide-border overflow-hidden rounded-3xl border border-border">
          {rows.map((r) => {
            const Icon = r.icon;
            return (
              <button
                key={r.label}
                onClick={() => go(r.screen)}
                className="flex w-full items-center gap-3.5 p-4 text-left"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
                  <Icon className="h-4.5 w-4.5 text-ink" />
                </span>
                <div className="flex-1">
                  <p className="font-display text-sm font-semibold">{r.label}</p>
                  <p className="text-xs text-ink-soft">{r.sub}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-ink-soft" />
              </button>
            );
          })}
        </div>

        <Btn full variant="ghost" className="mt-5" onClick={() => go("welcome")}>
          <span className="flex items-center justify-center gap-2">
            <LogOut className="h-4 w-4" /> Log out
          </span>
        </Btn>
      </div>
    </Screen>
  );
}

export function OrdersScreen() {
  return (
    <Screen>
      <Header title="My Orders" />
      <div className="space-y-3 px-5">
        {orders.map((o) => {
          const p = byId(o.product);
          return (
            <div key={o.id} className="rounded-3xl border border-border p-4">
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-semibold">{o.id}</p>
                <span
                  className={`rounded-full px-2.5 py-1 font-display text-[10px] font-semibold ${
                    o.status === "Delivered"
                      ? "bg-brand/12 text-brand"
                      : "bg-flame/12 text-flame"
                  }`}
                >
                  {o.status}
                </span>
              </div>
              <p className="text-xs text-ink-soft">{o.date}</p>
              <div className="mt-3 flex items-center gap-3">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-14 w-14 rounded-xl bg-surface object-cover"
                />
                <p className="flex-1 line-clamp-1 text-[13px] font-medium">{p.name}</p>
                <span className="font-display text-sm font-bold">{money(o.total)}</span>
              </div>
            </div>
          );
        })}
      </div>
    </Screen>
  );
}

export function AddressesScreen() {
  return (
    <Screen>
      <Header title="Addresses" />
      <div className="space-y-3 px-5">
        {[
          { label: "Home", line: "482 Palm Bay Dr, Tampa, FL 33602", def: true },
          { label: "Rink", line: "1 Flo Arena Way, Sunrise, FL 33323", def: false },
        ].map((a) => (
          <div key={a.label} className="flex items-start gap-3 rounded-3xl border border-border p-4">
            <MapPin className="mt-0.5 h-5 w-5 text-brand" />
            <div className="flex-1">
              <p className="font-display text-sm font-semibold">
                {a.label}
                {a.def && (
                  <span className="ml-2 rounded-full bg-brand/12 px-2 py-0.5 text-[10px] text-brand">
                    Default
                  </span>
                )}
              </p>
              <p className="text-xs text-ink-soft">{a.line}</p>
            </div>
            <button className="text-xs font-medium text-brand">Edit</button>
          </div>
        ))}
        <Btn full variant="outline">
          Add new address
        </Btn>
      </div>
    </Screen>
  );
}

export function PaymentsScreen() {
  return (
    <Screen>
      <Header title="Payment Methods" />
      <div className="space-y-3 px-5">
        {[
          { label: "Visa •••• 4821", sub: "Expires 04/29", def: true },
          { label: "Apple Pay", sub: "Touch ID enabled", def: false },
        ].map((m) => (
          <div key={m.label} className="flex items-center gap-3.5 rounded-3xl border border-border p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface">
              <CreditCard className="h-4.5 w-4.5" />
            </span>
            <div className="flex-1">
              <p className="font-display text-sm font-semibold">
                {m.label}
                {m.def && (
                  <span className="ml-2 rounded-full bg-brand/12 px-2 py-0.5 text-[10px] text-brand">
                    Default
                  </span>
                )}
              </p>
              <p className="text-xs text-ink-soft">{m.sub}</p>
            </div>
          </div>
        ))}
        <p className="flex items-center justify-center gap-1.5 pt-2 text-xs text-ink-soft">
          <ShieldCheck className="h-4 w-4 text-brand" /> Cards are stored with bank-level encryption
        </p>
        <Btn full variant="outline">
          Add payment method
        </Btn>
      </div>
    </Screen>
  );
}

export function NotificationsScreen() {
  const items = [
    { t: "Your order is out for delivery", s: "FH-20482 arrives today by 6pm", n: true },
    { t: "Sunset Series just dropped", s: "New sticks and jerseys in green & orange", n: true },
    { t: "Price drop on your wishlist", s: "Flo Club Home Jersey is now $119", n: true },
    { t: "Welcome to FLO+", s: "Free shipping on every order over $100", n: false },
  ];
  return (
    <Screen>
      <Header title="Notifications" />
      <div className="space-y-3 px-5">
        {items.map((i) => (
          <div
            key={i.t}
            className={`rounded-3xl p-4 ${i.n ? "bg-brand/6 border border-brand/25" : "bg-surface"}`}
          >
            <div className="flex items-start gap-3">
              <Bell className="mt-0.5 h-4.5 w-4.5 text-brand" />
              <div>
                <p className="font-display text-[13px] font-semibold">{i.t}</p>
                <p className="text-xs text-ink-soft">{i.s}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Screen>
  );
}

export function SettingsScreen() {
  const toggles = ["Push notifications", "Email offers", "Order updates by SMS", "Face ID login"];
  return (
    <Screen>
      <Header title="Settings" />
      <div className="px-5">
        <div className="divide-y divide-border overflow-hidden rounded-3xl border border-border">
          {toggles.map((t, i) => (
            <label key={t} className="flex cursor-pointer items-center justify-between p-4">
              <span className="text-sm">{t}</span>
              <input type="checkbox" defaultChecked={i < 3} className="peer sr-only" />
              <span className="relative h-6 w-11 rounded-full bg-border transition-colors peer-checked:bg-brand after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-transform peer-checked:after:translate-x-5" />
            </label>
          ))}
        </div>
        <div className="mt-4 divide-y divide-border overflow-hidden rounded-3xl border border-border">
          {["Account details", "Shipping preferences", "Help center", "Privacy policy"].map((r) => (
            <button key={r} className="flex w-full items-center justify-between p-4 text-left">
              <span className="text-sm">{r}</span>
              <ChevronRight className="h-4 w-4 text-ink-soft" />
            </button>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink-soft">Flo Hockey · Version 1.0.0</p>
      </div>
    </Screen>
  );
}
