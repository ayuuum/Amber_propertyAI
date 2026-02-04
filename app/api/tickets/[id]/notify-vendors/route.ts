import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * POST: 案件の業者に一斉連絡し、status を vendor_contacted に更新する。
 * 実際のメール/SMS 送信は SENDGRID_API_KEY や Twilio 設定時に実装する。
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: ticketId } = await params;
    const supabase = createSupabaseServerClient();

    const { data: ticket, error: ticketError } = await supabase
      .from("tickets")
      .select("id, property_id, subject, status")
      .eq("id", ticketId)
      .single();

    if (ticketError || !ticket) {
      return NextResponse.json({ error: "案件が見つかりません" }, { status: 404 });
    }

    const { data: vendors } = await supabase.from("vendors").select("id, name, email, phone");

    if (vendors?.length && process.env.SENDGRID_API_KEY) {
      const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
      const respondUrl = `${baseUrl}/vendor/respond?ticket_id=${ticketId}`;
      for (const v of vendors) {
        if (v.email) {
          try {
            await fetch("https://api.sendgrid.com/v3/mail/send", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
              },
              body: JSON.stringify({
                personalizations: [{ to: [{ email: v.email }] }],
                from: { email: process.env.SENDGRID_FROM_EMAIL ?? "noreply@example.com", name: "SUMIKA" },
                subject: `【SUMIKA】案件のご依頼: ${(ticket.subject ?? "修繕対応").toString().slice(0, 50)}`,
                content: [{ type: "text/plain", value: `案件概要: ${ticket.subject ?? "（なし）"}\n返信: ${respondUrl}` }],
              }),
            }).catch(() => {});
          } catch {
            /* noop */
          }
        }
      }
    }

    await supabase
      .from("tickets")
      .update({ status: "vendor_contacted", updated_at: new Date().toISOString() })
      .eq("id", ticketId);

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[notify-vendors]", e);
    return NextResponse.json(
      { error: "送信に失敗しました" },
      { status: 500 }
    );
  }
}
