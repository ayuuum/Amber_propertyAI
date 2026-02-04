import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();
  const { data: calls, error } = await supabase
    .from("demo_calls")
    .select("id, phone_number, started_at, ended_at, recording_url, summary, created_at")
    .order("created_at", { ascending: false });

  const { data: requestsData } = await supabase
    .from("demo_requests")
    .select("id, name, email, preferred_date, notes, created_at")
    .order("created_at", { ascending: false });
  const requests = requestsData ?? [];
  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <p className="font-medium">データの取得に失敗しました</p>
        <p className="mt-1 text-sm">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>
      <h2 className="text-xl font-bold text-ink">デモ通話一覧</h2>
      <p className="mt-1 text-sm text-ink-sub">
        Vapi の通話終了 Webhook で記録されたデモ通話です。
      </p>
      {!calls?.length ? (
        <div className="mt-8 rounded-lg border border-cream-alt bg-cream-alt/50 p-8 text-center text-ink-sub">
          まだ通話記録がありません。デモ番号に電話して通話を終了すると、ここに表示されます。
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
                  発信元
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  要約
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  録音
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-alt bg-cream">
              {calls.map((call) => (
                <tr key={call.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">
                    {formatDateTime(call.created_at ?? call.started_at)}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">
                    {call.phone_number ?? "—"}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-sm text-ink-sub">
                    {call.summary ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm">
                    {call.recording_url ? (
                      <a
                        href={call.recording_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cta hover:underline"
                      >
                        再生
                      </a>
                    ) : (
                      <span className="text-ink-sub">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </div>

      <div>
        <h2 className="text-xl font-bold text-ink">予約申込一覧</h2>
        <p className="mt-1 text-sm text-ink-sub">
          「オンラインデモを予約する」フォームから送信された申込です。
        </p>
        {!requests?.length ? (
          <div className="mt-6 rounded-lg border border-cream-alt bg-cream-alt/50 p-8 text-center text-ink-sub">
            まだ申込がありません。
          </div>
        ) : (
          <div className="mt-6 overflow-hidden rounded-lg border border-cream-alt bg-white">
            <table className="min-w-full divide-y divide-cream-alt">
              <thead className="bg-cream-alt/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                    申込日時
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                    名前
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                    メール
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                    希望日
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                    備考
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-alt bg-cream">
                {requests.map((req) => (
                  <tr key={req.id}>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">
                      {formatDateTime(req.created_at)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">
                      {req.name ?? "—"}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">
                      <a href={`mailto:${req.email}`} className="text-cta hover:underline">
                        {req.email ?? "—"}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">
                      {req.preferred_date ?? "—"}
                    </td>
                    <td className="max-w-xs truncate px-4 py-3 text-sm text-ink-sub">
                      {req.notes ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function formatDateTime(iso: string | null): string {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
