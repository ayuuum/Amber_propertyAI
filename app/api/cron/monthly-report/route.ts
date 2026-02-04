import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * 月次レポート: 先月の案件数を集計し、オプションでメール送信する。
 * Vercel Cron から呼び出す想定。CRON_SECRET で保護する。
 * 設定: vercel.json の cron で "0 0 1 * *"（毎月1日 0:00 UTC）など。
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const supabase = createSupabaseServerClient();
    const now = new Date();
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const lastMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);
    const from = lastMonthStart.toISOString();
    const to = lastMonthEnd.toISOString();

    const { count: lastMonthCount } = await supabase
      .from("tickets")
      .select("id", { count: "exact", head: true })
      .gte("created_at", from)
      .lte("created_at", to);

    const { count: lastMonthCompleted } = await supabase
      .from("tickets")
      .select("id", { count: "exact", head: true })
      .eq("status", "completed")
      .gte("updated_at", from)
      .lte("updated_at", to);

    const year = lastMonthStart.getFullYear();
    const month = lastMonthStart.getMonth() + 1;
    const report = {
      period: `${year}年${month}月`,
      from,
      to,
      newTickets: lastMonthCount ?? 0,
      completedTickets: lastMonthCompleted ?? 0,
    };

    const toEmail = process.env.MONTHLY_REPORT_EMAIL;
    if (toEmail && process.env.SENDGRID_API_KEY) {
      const subject = `【SUMIKA】月次レポート ${report.period}`;
      const body = [
        `SUMIKA 月次レポート（${report.period}）`,
        "",
        `新規案件数: ${report.newTickets}`,
        `完了件数: ${report.completedTickets}`,
        "",
        `集計期間: ${from} ～ ${to}`,
      ].join("\n");

      await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: toEmail }] }],
          from: {
            email: process.env.SENDGRID_FROM_EMAIL ?? "noreply@example.com",
            name: "SUMIKA",
          },
          subject,
          content: [{ type: "text/plain", value: body }],
        }),
      }).catch((e) => console.error("[monthly-report] SendGrid error", e));
    }

    return NextResponse.json({ ok: true, report });
  } catch (e) {
    console.error("[monthly-report]", e);
    return NextResponse.json(
      { error: "Report generation failed" },
      { status: 500 }
    );
  }
}
