"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function DemoRequestPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch("/api/demo/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        preferred_date: preferredDate || null,
        notes: notes || null,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "送信に失敗しました。");
      return;
    }
    setSuccess(true);
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-ink">送信完了</h1>
        <p className="mt-4 text-ink-sub">
          デモのご予約リクエストを受け付けました。担当者よりご連絡いたします。
        </p>
        <Link
          href="/"
          className="mt-8 inline-block text-cta hover:underline"
        >
          トップへ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-6 py-16">
      <h1 className="text-2xl font-bold text-ink">オンラインデモを予約する</h1>
      <p className="mt-2 text-ink-sub">
        ご希望日時などをご記入ください。担当者よりご連絡いたします。
      </p>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-ink">
            お名前 <span className="text-red-600">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
            placeholder="山田 太郎"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-ink">
            メールアドレス <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="preferred_date" className="block text-sm font-medium text-ink">
            希望日時
          </label>
          <input
            id="preferred_date"
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
          />
        </div>
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-ink">
            備考
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
            placeholder="ご質問やご要望があればご記入ください"
          />
        </div>
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "送信中..." : "送信する"}
        </Button>
      </form>
      <p className="mt-6 text-center">
        <Link href="/" className="text-sm text-ink-sub hover:underline">
          トップへ戻る
        </Link>
      </p>
    </div>
  );
}
