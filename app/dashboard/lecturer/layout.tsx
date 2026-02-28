// app/lecturer/layout.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";
import LecturerSidebar from "../components/LecturerSidebar";
import Navbar from "@/app/dashboard/components/Navbar";

export default async function LecturerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();

  if (!kindeUser) redirect("/api/auth/login");

  // Check role from your users table
  const { data: user } = await supabase
    .from("users")
    .select("role, email")
    .eq("kinde_id", kindeUser.id)
    .single();

  if (!user || user.role !== "lecturer") redirect("/dashboard");

  return (
    <div>
      <Navbar />
      <LecturerSidebar>{children}</LecturerSidebar>
    </div>
  );
}
