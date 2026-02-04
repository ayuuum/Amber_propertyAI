"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "トップ" },
  { href: "/dashboard/properties", label: "物件" },
  { href: "/dashboard/tickets", label: "案件" },
  { href: "/dashboard/vendors", label: "業者" },
  { href: "/dashboard/reports", label: "レポート" },
];

export function DashboardHeader() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-cream-alt/60 bg-cream-alt/50 px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <h1 className="text-lg font-bold text-ink shrink-0">SUMIKA ダッシュボード</h1>
        <nav className="flex items-center gap-1">
          {navItems.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
                  ? "bg-ink/10 text-ink"
                  : "text-ink-sub hover:bg-cream-alt hover:text-ink"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg border border-ink/20 bg-cream px-4 py-2 text-sm font-medium text-ink hover:bg-cream-alt transition-colors"
        >
          ログアウト
        </button>
      </div>
    </header>
  );
}
