"use client";

import { useState } from "react";
import Link from "next/link";

type Props = {
  action: string;
  method: "POST" | "PATCH";
  className?: string;
  defaultValues?: {
    name: string;
    address: string;
    twilio_phone_number: string;
  };
};

export function PropertyForm({ action, method, className = "", defaultValues }: Props) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [address, setAddress] = useState(defaultValues?.address ?? "");
  const [twilioPhoneNumber, setTwilioPhoneNumber] = useState(
    defaultValues?.twilio_phone_number ?? ""
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const url = method === "PATCH" ? action : action;
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name || null,
        address: address || null,
        twilio_phone_number: twilioPhoneNumber || null,
      }),
    });
    const data = await res.json().catch(() => ({}));
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? "保存に失敗しました");
      return;
    }
    window.location.href = "/dashboard/properties";
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
          placeholder="例: 〇〇マンション"
        />
      </div>
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-ink">
          住所
        </label>
        <input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
          placeholder="例: 東京都渋谷区..."
        />
      </div>
      <div>
        <label htmlFor="twilio_phone_number" className="block text-sm font-medium text-ink">
          Twilio 電話番号
        </label>
        <input
          id="twilio_phone_number"
          type="text"
          value={twilioPhoneNumber}
          onChange={(e) => setTwilioPhoneNumber(e.target.value)}
          className="mt-1 w-full rounded-lg border border-ink/20 bg-cream px-4 py-2 text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
          placeholder="例: +819012345678"
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
          href="/dashboard/properties"
          className="rounded-lg border border-ink/20 px-4 py-2 text-sm font-medium text-ink hover:bg-cream-alt transition-colors"
        >
          キャンセル
        </Link>
      </div>
    </form>
  );
}
