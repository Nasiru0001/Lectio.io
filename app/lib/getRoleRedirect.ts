import { supabase } from "@/app/lib/supabase";

export async function getRoleRedirect(kindeId: string): Promise<string> {
  const { data: user } = await supabase
    .from("users")
    .select("role")
    .eq("kinde_id", kindeId)
    .single();

  switch (user?.role) {
    case "admin":
      return "/dashboard/admin";
    case "lecturer":
      return "/dashboard/lecturer";
    case "student":
      return "/dashboard/student";
    default:
      return "/";
  }
}
