"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="border-b border-cream-alt/60 bg-cream-alt/50 px-6 py-4">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <h1 className="text-lg font-bold text-ink">SUMIKA ダッシュボード</h1>
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
