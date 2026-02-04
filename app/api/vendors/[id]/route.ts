import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * PATCH: 業者を更新
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
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
    const { error } = await supabase
      .from("vendors")
      .update({
        name: name.trim(),
        email: email && typeof email === "string" ? email.trim() : null,
        phone: phone && typeof phone === "string" ? phone.trim() : null,
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
    console.error("[api/vendors PATCH]", e);
    return NextResponse.json(
      { error: "リクエストが不正です" },
      { status: 400 }
    );
  }
}
