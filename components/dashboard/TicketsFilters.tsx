"use client";

import { useRouter, useSearchParams } from "next/navigation";

type Props = {
  className?: string;
  currentStatus?: string;
  currentFrom?: string;
  currentTo?: string;
};

const statusOptions = [
  { value: "", label: "すべて" },
  { value: "received", label: "受付" },
  { value: "vendor_contacted", label: "業者連絡済" },
  { value: "scheduled", label: "日程確定" },
  { value: "completed", label: "完了" },
];

export function TicketsFilters({
  className = "",
  currentStatus = "",
  currentFrom = "",
  currentTo = "",
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleChange(e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) {
    const name = e.target.name;
    const value = e.target.value;
    const next = new URLSearchParams(searchParams.toString());
    if (value) next.set(name, value);
    else next.delete(name);
    router.push(`/dashboard/tickets?${next.toString()}`);
  }

  return (
    <form className={`flex flex-wrap items-end gap-4 ${className}`}>
      <div>
        <label htmlFor="filter-status" className="block text-xs font-medium text-ink-sub">
          ステータス
        </label>
        <select
          id="filter-status"
          name="status"
          value={currentStatus}
          onChange={handleChange}
          className="mt-1 rounded-lg border border-ink/20 bg-cream px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
        >
          {statusOptions.map((o) => (
            <option key={o.value || "all"} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="filter-from" className="block text-xs font-medium text-ink-sub">
          作成日（から）
        </label>
        <input
          id="filter-from"
          name="from"
          type="date"
          value={currentFrom}
          onChange={handleChange}
          className="mt-1 rounded-lg border border-ink/20 bg-cream px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
        />
      </div>
      <div>
        <label htmlFor="filter-to" className="block text-xs font-medium text-ink-sub">
          作成日（まで）
        </label>
        <input
          id="filter-to"
          name="to"
          type="date"
          value={currentTo}
          onChange={handleChange}
          className="mt-1 rounded-lg border border-ink/20 bg-cream px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink/20"
        />
      </div>
    </form>
  );
}
