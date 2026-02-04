import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { TicketsFilters } from "@/components/dashboard/TicketsFilters";
import type { TicketStatus } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const statusLabels: Record<TicketStatus, string> = {
  received: "受付",
  vendor_contacted: "業者連絡済",
  scheduled: "日程確定",
  completed: "完了",
};

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; from?: string; to?: string }>;
}) {
  const { status: statusFilter, from, to } = await searchParams;
  const supabase = createSupabaseServerClient();

  let query = supabase
    .from("tickets")
    .select(
      "id, subject, status, priority, scheduled_at, created_at, properties(name)"
    )
    .order("created_at", { ascending: false });

  if (statusFilter && ["received", "vendor_contacted", "scheduled", "completed"].includes(statusFilter)) {
    query = query.eq("status", statusFilter);
  }
  if (from) {
    query = query.gte("created_at", `${from}T00:00:00.000Z`);
  }
  if (to) {
    query = query.lte("created_at", `${to}T23:59:59.999Z`);
  }

  const { data: tickets, error } = await query;

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p className="font-medium">データの取得に失敗しました</p>
        <p className="mt-1 text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-ink">案件一覧</h2>
      <p className="mt-1 text-sm text-ink-sub">
        ステータス・日付で絞り込めます。詳細から業者手配が可能です。
      </p>
      <TicketsFilters
        className="mt-4"
        currentStatus={statusFilter}
        currentFrom={from}
        currentTo={to}
      />
      {!tickets?.length ? (
        <div className="mt-8 rounded-lg border border-cream-alt bg-cream-alt/50 p-8 text-center text-ink-sub">
          該当する案件がありません。
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-cream-alt bg-white">
          <table className="min-w-full divide-y divide-cream-alt">
            <thead className="bg-cream-alt/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  日時
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  物件
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  件名
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  ステータス
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  対応予定日
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-ink-sub">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-alt bg-cream">
              {tickets.map((t) => {
                const property = Array.isArray(t.properties) ? t.properties[0] : t.properties;
                return (
                  <tr key={t.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">
                      {formatDate(t.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-ink-sub">
                      {(property as { name?: string } | null)?.name ?? "—"}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-sm text-ink">
                      {t.subject ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : t.status === "scheduled"
                              ? "bg-blue-100 text-blue-800"
                              : t.status === "vendor_contacted"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-cream-alt text-ink-sub"
                        }`}
                      >
                        {statusLabels[t.status as TicketStatus]}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">
                      {t.scheduled_at ? formatDate(t.scheduled_at) : "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                      <Link
                        href={`/dashboard/tickets/${t.id}`}
                        className="text-cta hover:underline"
                      >
                        詳細
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
