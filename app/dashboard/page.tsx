import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { supabase } from "@/app/lib/supabase";

export default async function Dashboard() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // Fetch students directly from Supabase — no need for the API route here
  const { data: students } = await supabase.from("students").select("*");

  return (
    <div>
      <h1>Welcome to Dashboard, {user?.given_name}</h1>
    </div>
  );
}
