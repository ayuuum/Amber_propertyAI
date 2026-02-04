"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { ticketId: string };

export function NotifyVendorsButton({ ticketId }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch(`/api/tickets/${ticketId}/notify-vendors`, {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        router.refresh();
      } else {
        alert(data.error ?? "送信に失敗しました");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="rounded-lg bg-ink px-4 py-2 text-sm font-medium text-cream hover:bg-ink/90 disabled:opacity-60 transition-colors"
    >
      {loading ? "送信中..." : "業者に一斉連絡"}
    </button>
  );
}
