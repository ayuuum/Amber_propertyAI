import { solution } from "@/content/copy";
import { Card } from "@/components/ui/Card";
import {
  Clock,
  Wrench,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";

const solutionIcons = {
  Clock,
  Wrench,
  MessageSquare,
  LayoutDashboard,
} as const;

export function Solution() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">
          {solution.title}
        </h2>
        <p className="mt-2 text-ink-sub">{solution.sub}</p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {solution.items.map((item) => {
            const Icon =
              solutionIcons[item.icon as keyof typeof solutionIcons];
            return (
              <Card key={item.title}>
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cta/10 text-cta">
                    {Icon && <Icon className="h-6 w-6" />}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-sub">
                      {item.body}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
