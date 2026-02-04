import { redirect } from "next/navigation";
import { createSupabaseServerClientForAuth } from "@/lib/supabase/server";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClientForAuth();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/dashboard");
  }

  return (
    <div className="min-h-screen bg-cream">
      <DashboardHeader />
      <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
    </div>
  );
}
