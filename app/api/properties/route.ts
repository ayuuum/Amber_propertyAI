import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * POST: 物件を新規作成
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const name = body.name ?? null;
    const address = body.address ?? null;
    const twilio_phone_number = body.twilio_phone_number ?? null;

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { error: "名前は必須です" },
        { status: 400 }
      );
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("properties")
      .insert({
        name: name.trim(),
        address: address && typeof address === "string" ? address.trim() : null,
        twilio_phone_number:
          twilio_phone_number && typeof twilio_phone_number === "string"
            ? twilio_phone_number.trim()
            : null,
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
    console.error("[api/properties POST]", e);
    return NextResponse.json(
      { error: "リクエストが不正です" },
      { status: 400 }
    );
  }
}
