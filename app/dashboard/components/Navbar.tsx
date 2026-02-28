import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!,
);

export default async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) return null;

  const { data } = await supabase
    .from("users")
    .select("role")
    .eq("kinde_id", user.id)
    .single();

  // console.log("User role:", data?.role);
  // console.log("Kinde ID:", user.id);

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="font-bold text-2xl">LECTIO.IO</h1>

      <div className="flex items-center gap-4">
        <span>
          Welcome,{" "}
          {data?.role?.split("")[0].toUpperCase() +
            data?.role?.split("").slice(1).join("")}{" "}
          {user.given_name}
        </span>
      </div>
    </div>
  );
}
