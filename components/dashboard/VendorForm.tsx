"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  action: string;
  method: "POST" | "PATCH";
  className?: string;
  defaultValues?: {
    name: string;
    email: string;
    phone: string;
  };
};

export function VendorForm({ action, method, className = "", defaultValues }: Props) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [email, setEmail] = useState(defaultValues?.email ?? "");
  const [phone, setPhone] = useState(defaultValues?.phone ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch(action, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name || null,
        email: email || null,
        phone: phone || null,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "保存に失敗しました");
      return;
    }
    window.location.href = "/dashboard/vendors";
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-ink">
          名前 <span className="text-red-600">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
          placeholder="例: 〇〇修繕"
        />
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink">
          メール
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
          placeholder="example@example.com"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-ink">
          電話
        </label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
          placeholder="03-1234-5678"
        />
      </div>
      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-ink/90 disabled:opacity-60 transition-colors"
        >
          {loading ? "保存中..." : "保存"}
        </button>
        <Link
          href="/dashboard/vendors"
          className="rounded-lg border border-ink/20 px-4 py-2 text-sm font-medium text-ink hover:bg-cream-alt transition-colors"
        >
          キャンセル
        </Link>
      </div>
    </form>
  );
}
