import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import SidebarLayout from "../components/page";
import Navbar from "@/app/dashboard/components/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
  );

  // 🔥 UPSERT USER (this fixes everything)

  const { error } = await supabase.from("users").upsert({
    kinde_id: user.id,
    email: user.email,
    role: user.email === "adamunasiru935@gmail.com" ? "admin" : "student",
  });

  console.log(error);

  if (!user) {
    redirect("/api/auth/login");
  }

  // Get role from database
  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("kinde_id", user.id)
    .single();

  // 🚨 If NOT admin → block access
  if (data?.role !== "admin") {
    redirect("/not-authorized"); // send them back
  }

  return (
    <div className="overflow-hidden">
      <Navbar />
      <SidebarLayout>{children}</SidebarLayout>
    </div>
  );
}
