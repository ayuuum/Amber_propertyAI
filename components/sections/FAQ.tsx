import { faq } from "@/content/copy";
import { Accordion } from "@/components/ui/Accordion";

export function FAQ() {
  const items = faq.items.map((item, i) => ({
    id: `faq-${i}`,
    question: item.q,
    answer: item.a,
  }));

  return (
    <section className="bg-cream-alt py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">
          {faq.title}
        </h2>
        <div className="mt-10">
          <Accordion items={items} />
        </div>
      </div>
    </section>
  );
}
