import { features } from "@/content/copy";
import { Card } from "@/components/ui/Card";

export function Features() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">
          {features.title}
        </h2>
        <div className="mt-10 space-y-6">
          {features.items.map((item) => (
            <Card key={item.title}>
              <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
              <ul className="mt-3 space-y-1 text-sm text-ink-sub">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="shrink-0">・</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
