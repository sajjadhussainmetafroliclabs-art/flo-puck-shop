import { createFileRoute } from "@tanstack/react-router";
import { FloApp } from "@/components/flo/FloApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flo Hockey — Speed. Style. Flow." },
      {
        name: "description",
        content:
          "Shop premium hockey sticks, skates, helmets, gloves and jerseys in the Flo Hockey mobile store. Florida hockey culture, built for speed.",
      },
      { property: "og:title", content: "Flo Hockey — Speed. Style. Flow." },
      {
        property: "og:description",
        content:
          "Premium hockey gear for players who never slow down. Sticks, skates, helmets, jerseys and training kit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-surface p-0 sm:p-8">
      <h1 className="sr-only">Flo Hockey mobile store</h1>
      <div
        className="relative h-[932px] w-[430px] max-h-screen max-w-full overflow-hidden bg-background sm:rounded-[46px] sm:shadow-float sm:ring-8 sm:ring-ink/90"
        style={{ height: "min(932px, 100dvh)" }}
      >
        <FloApp />
      </div>
    </main>
  );
}
