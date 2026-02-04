import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const supabase = createSupabaseServerClient();

  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
  const from = thisMonthStart.toISOString();
  const to = thisMonthEnd.toISOString();

  const { count: totalTickets } = await supabase
    .from("tickets")
    .select("id", { count: "exact", head: true });

  const { count: thisMonthCount } = await supabase
    .from("tickets")
    .select("id", { count: "exact", head: true })
    .gte("created_at", from)
    .lte("created_at", to);

  const { count: completedCount } = await supabase
    .from("tickets")
    .select("id", { count: "exact", head: true })
    .eq("status", "completed");

  const { count: receivedCount } = await supabase
    .from("tickets")
    .select("id", { count: "exact", head: true })
    .eq("status", "received");

  const { count: scheduledCount } = await supabase
    .from("tickets")
    .select("id", { count: "exact", head: true })
    .eq("status", "scheduled");

  const { data: ticketsForStatus } = await supabase
    .from("tickets")
    .select("status");
  const byStatus: Record<string, number> = {};
  (ticketsForStatus ?? []).forEach((r) => {
    const s = r.status ?? "unknown";
    byStatus[s] = (byStatus[s] ?? 0) + 1;
  });

  const statusLabels: Record<string, string> = {
    received: "受付",
    vendor_contacted: "業者連絡済",
    scheduled: "日程確定",
    completed: "完了",
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-ink">簡易レポート</h2>
      <p className="mt-1 text-sm text-ink-sub">
        今月の案件数・ステータス別件数などを集計しています。
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-cream-alt bg-white p-6">
          <h3 className="text-sm font-medium text-ink-sub">案件総数</h3>
          <p className="mt-2 text-2xl font-bold text-ink">{totalTickets ?? 0}</p>
        </div>
        <div className="rounded-lg border border-cream-alt bg-white p-6">
          <h3 className="text-sm font-medium text-ink-sub">
            今月の新規案件（{now.getFullYear()}/{now.getMonth() + 1}）
          </h3>
          <p className="mt-2 text-2xl font-bold text-ink">{thisMonthCount ?? 0}</p>
        </div>
        <div className="rounded-lg border border-cream-alt bg-white p-6">
          <h3 className="text-sm font-medium text-ink-sub">対応待ち（受付）</h3>
          <p className="mt-2 text-2xl font-bold text-ink">{receivedCount ?? 0}</p>
        </div>
        <div className="rounded-lg border border-cream-alt bg-white p-6">
          <h3 className="text-sm font-medium text-ink-sub">日程確定</h3>
          <p className="mt-2 text-2xl font-bold text-ink">{scheduledCount ?? 0}</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-cream-alt bg-white p-6">
        <h3 className="text-sm font-medium text-ink-sub">ステータス別件数</h3>
        <ul className="mt-4 space-y-2">
          {Object.entries(byStatus ?? {}).map(([status, count]) => (
            <li key={status} className="flex items-center justify-between text-ink">
              <span>{statusLabels[status] ?? status}</span>
              <span className="font-medium">{count}</span>
            </li>
          ))}
          {(!byStatus || Object.keys(byStatus).length === 0) && (
            <li className="text-ink-sub">データがありません</li>
          )}
        </ul>
      </div>

      <div className="mt-6 rounded-lg border border-cream-alt bg-white p-6">
        <h3 className="text-sm font-medium text-ink-sub">完了件数</h3>
        <p className="mt-2 text-2xl font-bold text-ink">{completedCount ?? 0}</p>
      </div>
    </div>
  );
}
