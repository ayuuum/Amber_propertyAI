import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PropertyForm } from "@/components/dashboard/PropertyForm";

export const dynamic = "force-dynamic";

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();
  const { data: property, error } = await supabase
    .from("properties")
    .select("id, name, address, twilio_phone_number")
    .eq("id", id)
    .single();

  if (error || !property) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-ink">物件を編集</h2>
      <p className="mt-1 text-sm text-ink-sub">
        名前・住所・Twilio 電話番号を変更できます。
      </p>
      <PropertyForm
        className="mt-6"
        action={`/api/properties/${property.id}`}
        method="PATCH"
        defaultValues={{
          name: property.name ?? "",
          address: property.address ?? "",
          twilio_phone_number: property.twilio_phone_number ?? "",
        }}
      />
      <p className="mt-4">
        <Link href="/dashboard/properties" className="text-sm text-cta hover:underline">
          ← 物件一覧に戻る
        </Link>
      </p>
    </div>
  );
}
