import { PropertyForm } from "@/components/dashboard/PropertyForm";

export default function NewPropertyPage() {
  return (
    <div>
      <h2 className="text-xl font-bold text-ink">物件を追加</h2>
      <p className="mt-1 text-sm text-ink-sub">
        名前・住所・Twilio 電話番号を入力してください。
      </p>
      <PropertyForm className="mt-6" action="/api/properties" method="POST" />
    </div>
  );
}
