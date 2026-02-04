import { flow } from "@/content/copy";

export function Flow() {
  return (
    <section className="bg-cream-alt py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">
          {flow.title}
        </h2>
        <div className="mt-10 space-y-6">
          {flow.steps.map((step) => (
            <div
              key={step.step}
              className="flex gap-6 rounded-xl border border-cream-alt/80 bg-white p-6"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta text-sm font-bold text-white">
                {step.step}
              </span>
              <div>
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm text-ink-sub">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
