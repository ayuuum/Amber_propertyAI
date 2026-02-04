"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Button } from "@/components/ui/Button";

function VendorRespondForm() {
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("ticket_id");
  const [scheduledAt, setScheduledAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!ticketId) return;
    setError(null);
    setLoading(true);
    const res = await fetch(`/api/tickets/${ticketId}/schedule`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scheduled_at: scheduledAt }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "送信に失敗しました。");
      return;
    }
    setSuccess(true);
  }

  if (!ticketId) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center text-ink-sub">
        リンクが不正です。ticket_id が必要です。
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-xl font-bold text-ink">送信完了</h1>
        <p className="mt-4 text-ink-sub">
          対応可能日を登録しました。担当者よりご連絡いたします。
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-xl font-bold text-ink">対応可能日のご連絡</h1>
      <p className="mt-2 text-ink-sub">
        ご対応可能な日を選択のうえ、送信してください。
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label htmlFor="scheduled_at" className="block text-sm font-medium text-ink">
            対応可能日 <span className="text-red-600">*</span>
          </label>
          <input
            id="scheduled_at"
            type="date"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "送信中..." : "送信する"}
        </Button>
      </form>
    </div>
  );
}

export default function VendorRespondPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-lg px-6 py-16 text-center text-ink-sub">
          読み込み中...
        </div>
      }
    >
      <VendorRespondForm />
    </Suspense>
  );
}
