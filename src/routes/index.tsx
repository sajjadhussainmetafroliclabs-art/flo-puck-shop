import { Moon, Sun } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "@/lib/use-theme";
import { FloApp } from "@/components/flo/FloApp";

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


function Index() {
  const { dark, toggle } = useTheme();
  return (
    <main className="flex min-h-screen w-full flex-col items-center bg-surface px-5 py-10">
      <header className="flex w-full max-w-3xl items-start justify-between gap-6">
        <div>
          <p className="font-display text-xs font-semibold tracking-[0.3em] text-brand">
            FLO HOCKEY
          </p>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-ink">
            All screens, one phone
          </h1>
          <p className="mt-2 max-w-md text-sm text-ink-soft">
            The complete app running live in a single device frame — tap through onboarding,
            shopping, checkout and profile.
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

      <div className="mt-10 flex flex-col items-center gap-4">
        <div
          className="relative overflow-hidden rounded-[46px] bg-background shadow-float ring-[9px] ring-ink/90"
          style={{ width: 387, height: 839 }}
        >
          <div
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: 430, height: 932, transform: "scale(0.9)" }}
          >
            <FloApp />
          </div>
        </div>
      </div>
    </main>
  );
}

