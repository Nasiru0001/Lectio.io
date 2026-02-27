// app/lecturer/results/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default async function LecturerResults() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser) redirect("/api/auth/login");

  const { data: user } = await supabase
    .from("users")
    .select("email")
    .eq("kinde_id", kindeUser.id)
    .single();

  const { data: lecturer } = await supabase
    .from("lecturers")
    .select("id")
    .eq("email", user?.email)
    .single();

  const { data: assignments } = await supabase
    .from("course_assignments")
    .select(
      `
      courses (
        course_code,
        course_title,
        enrollment (
          results ( score, grade )
        )
      )
    `,
    )
    .eq("lecturer_id", lecturer?.id);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Results Overview</h1>

      {assignments?.map((a, i) => {
        const course = a.courses as any;
        const allResults =
          course?.enrollment?.flatMap((e: any) => e.results ?? []) ?? [];
        const avg =
          allResults.length > 0
            ? (
                allResults.reduce((s: number, r: any) => s + r.score, 0) /
                allResults.length
              ).toFixed(1)
            : "N/A";
        const pass = allResults.filter((r: any) => r.score >= 50).length;
        const fail = allResults.length - pass;

        return (
          <div key={i} className="bg-white rounded-xl shadow p-5">
            <h2 className="font-semibold text-lg">
              {course.course_code} — {course.course_title}
            </h2>

            <div className="grid grid-cols-4 gap-4 mt-4">
              <Stat label="Total Results" value={allResults.length} />
              <Stat label="Average Score" value={avg} />
              <Stat label="Passed" value={pass} color="text-green-600" />
              <Stat label="Failed" value={fail} color="text-red-500" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Stat({
  label,
  value,
  color = "text-gray-800",
}: {
  label: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
