import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * POST: 業者が対応可能日を送信し、ticket の scheduled_at と status を更新する。
 * body: { scheduled_at: "YYYY-MM-DD" or ISO string }
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: ticketId } = await params;
    const body = await request.json().catch(() => ({}));
    const raw = body.scheduled_at ?? body.scheduledAt ?? null;
    const scheduledAt = raw ? new Date(raw).toISOString() : null;

    if (!scheduledAt) {
      return NextResponse.json(
        { error: "対応可能日（scheduled_at）を指定してください" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    const { error } = await supabase
      .from("tickets")
      .update({
        scheduled_at: scheduledAt,
        status: "scheduled",
        updated_at: new Date().toISOString(),
      })
      .eq("id", ticketId);

    if (error) {
      return NextResponse.json(
        { error: "更新に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[tickets/schedule]", e);
    return NextResponse.json(
      { error: "リクエストが不正です" },
      { status: 400 }
    );
  }
}
