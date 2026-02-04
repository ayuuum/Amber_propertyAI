import { VendorForm } from "@/components/dashboard/VendorForm";

export default function NewVendorPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-ink">業者を追加</h2>
      <p className="mt-1 text-sm text-ink-sub">
        名前・メール・電話を入力してください。
      </p>
      <VendorForm className="mt-6" action="/api/vendors" method="POST" />
    </div>
  );
}
