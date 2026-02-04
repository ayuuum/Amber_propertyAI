import { footer } from "@/content/copy";

export function Footer() {
  return (
    <footer className="border-t border-cream-alt/60 bg-cream-alt/50 py-12">
      <div className="mx-auto max-w-5xl px-6 text-center">
        <p className="text-ink-sub text-sm">{footer.catchphrase}</p>
      </div>
    </footer>
  );
}
