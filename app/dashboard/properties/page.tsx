import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function PropertiesPage() {
  const supabase = createSupabaseServerClient();
  const { data: properties, error } = await supabase
    .from("properties")
    .select("id, name, address, twilio_phone_number, created_at")
    .order("created_at", { ascending: false });

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
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-ink">物件一覧</h2>
        <Link
          href="/dashboard/properties/new"
          className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-ink/90 transition-colors"
        >
          新規追加
        </Link>
      </div>
      <p className="mt-1 text-sm text-ink-sub">
        本番電話番号（Twilio）を紐付けた物件を管理します。
      </p>
      {!properties?.length ? (
        <div className="mt-8 rounded-lg border border-cream-alt bg-cream-alt/50 p-8 text-center text-ink-sub">
          まだ物件がありません。「新規追加」から登録してください。
        </div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-lg border border-cream-alt bg-white">
          <table className="min-w-full divide-y divide-cream-alt">
            <thead className="bg-cream-alt/50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  名前
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  住所
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-ink-sub">
                  電話番号
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-ink-sub">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-alt bg-cream">
              {properties.map((p) => (
                <tr key={p.id}>
                  <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-ink">
                    {p.name ?? "—"}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 text-sm text-ink-sub">
                    {p.address ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-sm text-ink">
                    {p.twilio_phone_number ?? "—"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-right text-sm">
                    <Link
                      href={`/dashboard/properties/${p.id}/edit`}
                      className="text-cta hover:underline"
                    >
                      編集
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
