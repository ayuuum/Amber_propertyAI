import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Vapi Webhook: 通話終了時に呼ばれ、demo_calls に保存する。
 * Vapi Dashboard で Assistant または Phone Number の Server URL に
 * デプロイ後の URL を設定してください。例: https://your-domain.com/api/webhooks/vapi
 * serverMessages に "end-of-call-report" を含めてください。
 */

/** GET: 疎通確認用。ブラウザや curl で URL にアクセスすると 200 とメッセージを返す。 */
export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Vapi webhook endpoint. POST end-of-call-report to save demo_calls.",
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const message = body?.message;
    if (!message) return NextResponse.json({ ok: true });

    const supabase = createSupabaseServerClient();

    if (message.type === "end-of-call-report") {
      const call = message.call ?? {};
      const artifact = message.artifact ?? {};
      const recording = artifact.recording ?? {};
      const phoneNumber =
        call.customer?.number ??
        call.phoneNumber?.number ??
        message.phoneNumber ??
        null;
      const startedAt = call.startedAt ?? call.createdAt ?? null;
      const endedAt = call.endedAt ?? null;
      const recordingUrl =
        recording.url ??
        recording.publicRecordingUrl ??
        (typeof recording === "string" ? recording : null) ??
        null;
      const transcript = artifact.transcript ?? null;

      const { error } = await supabase.from("demo_calls").insert({
        phone_number: phoneNumber,
        started_at: startedAt,
        ended_at: endedAt,
        recording_url: recordingUrl,
        summary: transcript,
      });
      if (error) {
        console.error("[vapi-webhook] demo_calls insert error:", error);
        return NextResponse.json(
          { error: "Failed to save demo call" },
          { status: 500 }
        );
      }

      const propertyId =
        call.customData?.property_id ??
        call.customData?.propertyId ??
        body.property_id ??
        body.propertyId ??
        null;
      if (propertyId) {
        await supabase.from("tickets").insert({
          property_id: propertyId,
          subject: transcript ? transcript.slice(0, 500) : "通話から作成",
          status: "received",
          priority: "normal",
          recording_url: recordingUrl,
          summary: transcript,
        });
      }
      return NextResponse.json({ ok: true });
    }

    if (message.type === "tool-calls") {
      const toolCallList = message.toolCallList ?? message.tool_call_list ?? [];
      for (const tc of toolCallList) {
        if (
          (tc.name === "create_ticket" || tc.name === "createTicket") &&
          tc.parameters
        ) {
          const p = typeof tc.parameters === "string" ? JSON.parse(tc.parameters || "{}") : tc.parameters;
          const propertyId = p.property_id ?? p.propertyId ?? null;
          if (!propertyId) continue;
          await supabase.from("tickets").insert({
            property_id: propertyId,
            subject: p.subject ?? p.issue ?? "AIから作成",
            status: "received",
            priority: p.priority === "urgent" ? "urgent" : "normal",
            summary: p.summary ?? null,
          });
        }
      }
      return NextResponse.json({ ok: true });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[vapi-webhook]", e);
    return NextResponse.json(
      { error: "Invalid request" },
      { status: 400 }
    );
  }
}
