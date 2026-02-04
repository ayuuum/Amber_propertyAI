import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const preferredDate = body.preferred_date
      ? (typeof body.preferred_date === "string" ? body.preferred_date : null)
      : null;
    const notes =
      typeof body.notes === "string" ? body.notes.trim() || null : null;

    if (!name || !email) {
      return NextResponse.json(
        { error: "名前とメールアドレスは必須です。" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    const { error } = await supabase.from("demo_requests").insert({
      name,
      email,
      preferred_date: preferredDate || null,
      notes,
    });

    if (error) {
      console.error("[demo/request] Supabase insert error:", error);
      return NextResponse.json(
        { error: "送信に失敗しました。しばらくしてからお試しください。" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "リクエストが不正です。" },
      { status: 400 }
    );
  }
}
