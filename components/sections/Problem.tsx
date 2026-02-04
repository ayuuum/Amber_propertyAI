import { problem } from "@/content/copy";
import {
  Droplets,
  Thermometer,
  Key,
  Phone,
  ClipboardList,
  Wrench,
  CheckCircle,
  User,
  Bot,
  Building2,
  Users,
} from "lucide-react";
import { Card } from "@/components/ui/Card";

const quoteIcons = { Droplets, Thermometer, Key } as const;
const flowIcons = {
  Phone,
  ClipboardList,
  Wrench,
  CheckCircle,
  User,
  Bot,
} as const;

export function Problem() {
  return (
    <section className="bg-cream-alt py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-2xl font-bold text-ink md:text-3xl">
          {problem.title}
        </h2>

        {/* 入居者の声：横並びカード */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {problem.quotes.map((q) => {
            const Icon = quoteIcons[q.icon as keyof typeof quoteIcons];
            return (
              <Card key={q.text} className="relative">
                <span className="absolute right-3 top-3 text-xs font-medium text-ink-sub">
                  {q.timeLabel}
                </span>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cta/10 text-cta">
                    {Icon && <Icon className="h-5 w-5" />}
                  </span>
                  <p className="text-base font-medium text-ink">「{q.text}」</p>
                </div>
              </Card>
            );
          })}
        </div>

        <p className="mt-10 text-base leading-relaxed text-ink md:text-lg">
          {problem.body}
        </p>
        <p className="mt-6 text-lg font-medium text-ink md:text-xl">
          {problem.question}
        </p>

        {/* Before / After フロー */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <Card>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-sub">
              今のやり方
            </h3>
            <div className="mt-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {problem.flowBefore.map((step, i) => {
                const Icon = flowIcons[step.icon as keyof typeof flowIcons];
                return (
                  <span key={step.label} className="flex items-center gap-1 sm:gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cream-alt text-ink sm:h-9 sm:w-9">
                      {Icon && <Icon className="h-4 w-4" />}
                    </span>
                    <span className="hidden text-sm text-ink sm:inline">{step.label}</span>
                    {i < problem.flowBefore.length - 1 && (
                      <span className="text-ink-sub" aria-hidden>→</span>
                    )}
                  </span>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-ink-sub sm:hidden">
              入居者連絡 → 受付 → 業者手配 → 進捗確認 → 報告
            </p>
          </Card>
          <Card className="border-cta/20 bg-cta/5">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-cta">
              SUMIKA導入後
            </h3>
            <div className="mt-4 flex flex-wrap items-center gap-1 sm:gap-2">
              {problem.flowAfter.map((step, i) => {
                const Icon = flowIcons[step.icon as keyof typeof flowIcons];
                return (
                  <span key={step.label} className="flex items-center gap-1 sm:gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cta/20 text-cta sm:h-9 sm:w-9">
                      {Icon && <Icon className="h-4 w-4" />}
                    </span>
                    <span className="hidden text-sm text-ink sm:inline">{step.label}</span>
                    {i < problem.flowAfter.length - 1 && (
                      <span className="text-ink-sub" aria-hidden>→</span>
                    )}
                  </span>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-ink-sub sm:hidden">
              入居者連絡 → AIが対応 → 完了報告
            </p>
          </Card>
        </div>

        {/* 管理戸数÷60 インフォグラフィック */}
        <div className="mt-12 rounded-xl border-2 border-ink/10 bg-white p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            <span className="flex items-center gap-2 text-xl font-bold text-ink md:text-2xl">
              <Building2 className="h-8 w-8 text-ink-sub" />
              60戸
            </span>
            <span className="text-2xl text-ink-sub">÷</span>
            <span className="text-xl font-bold text-ink md:text-2xl">60</span>
            <span className="text-2xl text-ink-sub">＝</span>
            <span className="flex items-center gap-2 text-xl font-bold text-ink md:text-2xl">
              <Users className="h-8 w-8 text-ink-sub" />
              1人
            </span>
            <span className="text-lg text-ink-sub">必要</span>
          </div>
          <p className="mt-4 text-center text-sm text-ink-sub">
            {problem.formulaNote}
          </p>
          <p className="mt-3 text-center font-medium text-ink">
            {problem.formulaCta}
          </p>
        </div>
      </div>
    </section>
  );
}
