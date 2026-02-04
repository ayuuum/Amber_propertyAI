import Link from "next/link";
import { site, hero } from "@/content/copy";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-cream-alt/60 bg-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-ink">
          {site.name}
          <span className="ml-1 text-sm font-normal text-ink-sub">
            {site.nameRuby}
          </span>
        </Link>
        <Button href={hero.ctaHref} variant="primary">
          {hero.cta}
        </Button>
      </div>
    </header>
  );
}
