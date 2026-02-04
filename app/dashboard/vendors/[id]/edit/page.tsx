import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { VendorForm } from "@/components/dashboard/VendorForm";

export const dynamic = "force-dynamic";

export default async function EditVendorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createSupabaseServerClient();
  const { data: vendor, error } = await supabase
    .from("vendors")
    .select("id, name, email, phone")
    .eq("id", id)
    .single();

  if (error || !vendor) {
    notFound();
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-ink">業者を編集</h2>
      <p className="mt-1 text-sm text-ink-sub">
        名前・メール・電話を変更できます。
      </p>
      <VendorForm
        className="mt-6"
        action={`/api/vendors/${vendor.id}`}
        method="PATCH"
        defaultValues={{
          name: vendor.name ?? "",
          email: vendor.email ?? "",
          phone: vendor.phone ?? "",
        }}
      />
      <p className="mt-4">
        <Link href="/dashboard/vendors" className="text-sm text-cta hover:underline">
          ← 業者一覧に戻る
        </Link>
      </p>
    </div>
  );
}
