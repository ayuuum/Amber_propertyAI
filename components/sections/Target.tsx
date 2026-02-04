import { target } from "@/content/copy";
import { Card } from "@/components/ui/Card";

export function Target() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <h3 className="text-lg font-semibold text-ink">
              {target.company.title}
            </h3>
            <p className="mt-1 text-sm text-ink-sub">{target.company.sub}</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-sub">
              {target.company.body}
            </p>
          </Card>
          <Card>
            <h3 className="text-lg font-semibold text-ink">
              {target.owner.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-ink-sub">
              {target.owner.body}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
}
