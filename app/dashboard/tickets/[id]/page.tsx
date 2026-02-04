import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { NotifyVendorsButton } from "@/components/dashboard/NotifyVendorsButton";
import type { TicketStatus } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

const statusLabels: Record<TicketStatus, string> = {
  received: "受付",
  vendor_contacted: "業者連絡済",
  scheduled: "日程確定",
  completed: "完了",
};

export default async function TicketDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();

  const { data: ticket, error } = await supabase
    .from("tickets")
    .select(
      "id, subject, status, priority, scheduled_at, recording_url, summary, created_at, updated_at, properties(name, address), residents(name, phone, email), vendors(name)"
    )
    .eq("id", id)
    .single();

  if (error || !ticket) {
    notFound();
  }

  const property = Array.isArray(ticket.properties) ? ticket.properties[0] : ticket.properties;
  const resident = Array.isArray(ticket.residents) ? ticket.residents[0] : ticket.residents;
  const vendor = Array.isArray(ticket.vendors) ? ticket.vendors[0] : ticket.vendors;

  const canNotifyVendors =
    ticket.status === "received" || ticket.status === "vendor_contacted";

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink">案件詳細</h2>
        <Link
          href="/dashboard/tickets"
          className="text-sm text-cta hover:underline"
        >
          ← 案件一覧
        </Link>
      </div>

      <div className="space-y-6 rounded-lg border border-cream-alt bg-white p-6">
        <div>
          <h3 className="text-sm font-medium text-ink-sub">件名</h3>
          <p className="mt-1 text-ink">{ticket.subject ?? "—"}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-ink-sub">ステータス</h3>
            <p className="mt-1">
              <span
                className={`inline-flex rounded-full px-2 py-0.5 text-sm font-medium ${
                  ticket.status === "completed"
                    ? "bg-green-100 text-green-800"
                    : ticket.status === "scheduled"
                      ? "bg-blue-100 text-blue-800"
                      : ticket.status === "vendor_contacted"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-cream-alt text-ink-sub"
                }`}
              >
                {statusLabels[ticket.status as TicketStatus]}
              </span>
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-ink-sub">優先度</h3>
            <p className="mt-1 text-ink">
              {ticket.priority === "urgent" ? "緊急" : "通常"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-ink-sub">物件</h3>
            <p className="mt-1 text-ink">
              {(property as { name?: string } | null)?.name ?? "—"}
            </p>
            <p className="mt-0.5 text-sm text-ink-sub">
              {(property as { address?: string } | null)?.address ?? ""}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-ink-sub">入居者</h3>
            <p className="mt-1 text-ink">
              {(resident as { name?: string } | null)?.name ?? "—"}
            </p>
            <p className="mt-0.5 text-sm text-ink-sub">
              {(resident as { phone?: string } | null)?.phone ?? ""}
              {(resident as { email?: string } | null)?.email
                ? ` / ${(resident as { email?: string }).email}`
                : ""}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-ink-sub">対応予定日</h3>
            <p className="mt-1 text-ink">
              {ticket.scheduled_at
                ? formatDateTime(ticket.scheduled_at)
                : "—"}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-ink-sub">担当業者</h3>
            <p className="mt-1 text-ink">
              {(vendor as { name?: string } | null)?.name ?? "—"}
            </p>
          </div>
        </div>
        {ticket.summary && (
          <div>
            <h3 className="text-sm font-medium text-ink-sub">要約</h3>
            <p className="mt-1 whitespace-pre-wrap text-ink">{ticket.summary}</p>
          </div>
        )}
        {ticket.recording_url && (
          <div>
            <h3 className="text-sm font-medium text-ink-sub">録音</h3>
            <a
              href={ticket.recording_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block text-cta hover:underline"
            >
              再生
            </a>
          </div>
        )}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-cream-alt">
          {canNotifyVendors && (
            <NotifyVendorsButton ticketId={ticket.id} />
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-ink-sub">
        作成: {formatDateTime(ticket.created_at)} / 更新:{" "}
        {formatDateTime(ticket.updated_at)}
      </p>
    </div>
  );
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
