import { numbers } from "@/content/copy";
import { Clock, Zap, Users } from "lucide-react";

const numberIcons = { Clock, Zap, Users } as const;

export function Numbers() {
  return (
    <section className="bg-cream-alt py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">
          {numbers.title}
        </h2>
        <p className="mt-1 text-sm text-ink-sub">{numbers.note}</p>
        <div className="mt-8 overflow-hidden rounded-xl border border-cream-alt/80 bg-white shadow-sm">
          <table className="w-full">
            <tbody>
              {numbers.rows.map((row, i) => {
                const Icon =
                  numberIcons[row.icon as keyof typeof numberIcons];
                return (
                  <tr
                    key={row.label}
                    className={
                      i < numbers.rows.length - 1
                        ? "border-b border-cream-alt/60"
                        : ""
                    }
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3 font-medium text-ink">
                        {Icon && (
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-cta/10 text-cta">
                            <Icon className="h-4 w-4" />
                          </span>
                        )}
                        {row.label}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-ink-sub">
                      {row.value}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
