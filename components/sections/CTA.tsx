import { cta } from "@/content/copy";
import { Button } from "@/components/ui/Button";

interface CTAProps {
  /** デモ用電話番号（E.164形式）。指定時は「AIに電話してみる」のリンク先になる */
  demoPhoneNumber?: string;
}

export function CTA({ demoPhoneNumber }: CTAProps) {
  const primaryHref = demoPhoneNumber
    ? `tel:${demoPhoneNumber}`
    : cta.primaryHref;

  return (
    <section id="cta" className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">
          {cta.title}
        </h2>
        <p className="mt-6 text-ink-sub">{cta.body}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button href={primaryHref} variant="primary" className="text-lg px-8 py-4">
            {cta.primary}
          </Button>
          <Button href={cta.secondaryHref} variant="outline" className="text-lg px-8 py-4">
            {cta.secondary}
          </Button>
        </div>
      </div>
    </section>
  );
}
