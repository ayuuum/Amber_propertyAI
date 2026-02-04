import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * POST: 業者を新規作成
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = body.name ?? null;
    const email = body.email ?? null;
    const phone = body.phone ?? null;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "名前は必須です" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("vendors")
      .insert({
        name: name.trim(),
        email: email && typeof email === "string" ? email.trim() : null,
        phone: phone && typeof phone === "string" ? phone.trim() : null,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message ?? "登録に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ id: data?.id, ok: true });
  } catch (e) {
    console.error("[api/vendors POST]", e);
    return NextResponse.json(
      { error: "リクエストが不正です" },
      { status: 400 }
    );
  }
}
