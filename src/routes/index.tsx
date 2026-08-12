import { Moon, Sun } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "@/lib/use-theme";
import { FloApp } from "@/components/flo/FloApp";
import type { Params, ScreenName } from "@/lib/flo-app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flo Hockey — All Screens" },
      {
        name: "description",
        content:
          "Every screen of the Flo Hockey mobile store on one page: onboarding, shop, product, checkout and profile flows.",
      },
      { property: "og:title", content: "Flo Hockey — All Screens" },
      {
        property: "og:description",
        content:
          "The complete Flo Hockey mobile app UI kit — 30 screens across onboarding, shopping, product, checkout and profile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Frame = { screen: ScreenName; label: string; params?: Params };

const sections: { title: string; frames: Frame[] }[] = [
  {
    title: "Onboarding",
    frames: [
      { screen: "splash", label: "Splash" },
      { screen: "welcome", label: "Welcome" },
      { screen: "login", label: "Log in" },
      { screen: "signup", label: "Sign up" },
      { screen: "forgot", label: "Forgot password" },
      { screen: "verify", label: "Verify code" },
      { screen: "reset", label: "New password" },
    ],
  },
  {
    title: "Shop",
    frames: [
      { screen: "home", label: "Home" },
      { screen: "categories", label: "Categories" },
      { screen: "category", label: "Category", params: { category: "Sticks" } },
      { screen: "listing", label: "Listing", params: { title: "All Gear" } },
      { screen: "search", label: "Search" },
      { screen: "results", label: "Results", params: { query: "stick" } },
      { screen: "sale", label: "Sale" },
      { screen: "new", label: "New arrivals" },
    ],
  },
  {
    title: "Product",
    frames: [
      { screen: "product", label: "Product detail", params: { id: "fh-stick-01" } },
      { screen: "gallery", label: "Gallery", params: { id: "fh-stick-01" } },
      { screen: "reviews", label: "Reviews", params: { id: "fh-stick-01" } },
    ],
  },
  {
    title: "Cart & checkout",
    frames: [
      { screen: "cart", label: "Cart" },
      { screen: "wishlist", label: "Wishlist" },
      { screen: "address", label: "Address" },
      { screen: "delivery", label: "Delivery" },
      { screen: "payment", label: "Payment" },
      { screen: "review", label: "Review order" },
      { screen: "success", label: "Order success" },
    ],
  },
  {
    title: "Profile",
    frames: [
      { screen: "profile", label: "Profile" },
      { screen: "editProfile", label: "Edit profile" },
      { screen: "orders", label: "Orders" },
      { screen: "addresses", label: "Addresses" },
      { screen: "payments", label: "Payment methods" },
      { screen: "notifications", label: "Notifications" },
      { screen: "settings", label: "Settings" },
    ],
  },
];

function Phone({ frame }: { frame: Frame }) {
  return (
    <figure className="flex flex-col items-center gap-3">
      <div
        className="relative overflow-hidden rounded-[30px] bg-background shadow-float ring-[6px] ring-ink/90"
        style={{ width: 301, height: 652 }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: 430, height: 932, transform: "scale(0.7)" }}
        >
          <FloApp
            initialScreen={frame.screen}
            {...(frame.params ? { initialParams: frame.params } : {})}
            frozen
          />
        </div>
      </div>
      <figcaption className="font-display text-sm font-semibold text-ink">{frame.label}</figcaption>
    </figure>
  );
}

function Index() {
  const { dark, toggle } = useTheme();
  return (
    <main className="min-h-screen w-full bg-surface px-5 py-12 sm:px-10">
      <header className="mx-auto flex max-w-6xl items-start justify-between gap-6">
        <div>
        <p className="font-display text-xs font-semibold tracking-[0.3em] text-brand">
          FLO HOCKEY — UI OVERVIEW
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-ink">All screens, one page</h1>
        <p className="mt-2 max-w-xl text-sm text-ink-soft">
          Every screen of the mobile store, live and interactive. Tap inside any frame to explore
          that flow.
        </p>
        </div>
        <button
          onClick={toggle}
          className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2.5 font-display text-sm font-semibold text-ink"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <div className="mx-auto mt-12 max-w-6xl space-y-16">
        {sections.map((s) => (
          <section key={s.title}>
            <h2 className="font-display text-xl font-bold text-ink">{s.title}</h2>
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-10">
              {s.frames.map((f) => (
                <Phone key={f.screen + (f.label ?? "")} frame={f} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
