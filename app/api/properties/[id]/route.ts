import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * PATCH: 物件を更新
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const { error } = await supabase
      .from("properties")
      .update({
        name: name.trim(),
        address: address && typeof address === "string" ? address.trim() : null,
        twilio_phone_number:
          twilio_phone_number && typeof twilio_phone_number === "string"
            ? twilio_phone_number.trim()
            : null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message ?? "更新に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[api/properties PATCH]", e);
    return NextResponse.json(
      { error: "リクエストが不正です" },
      { status: 400 }
    );
  }
}
