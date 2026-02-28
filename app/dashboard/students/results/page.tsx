// app/dashboard/student/results/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default async function StudentResults() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser) redirect("/api/auth/login");

  const { data: user } = await supabase
    .from("users")
    .select("email")
    .eq("kinde_id", kindeUser.id)
    .single();

  const { data: student } = await supabase
    .from("students")
    .select("id")
    .eq("email", user?.email)
    .single();

  const { data: enrollments } = await supabase
    .from("enrollment")
    .select(
      `
      session_year,
      semester,
      courses ( course_code, course_title, credit_unit ),
      results ( score, grade )
    `,
    )
    .eq("student_id", student?.id)
    .order("session_year", { ascending: false });

  // ---- Overall GPA ----
  const allResults = enrollments?.flatMap((e) => e.results ?? []) ?? [];
  const overallAvg =
    allResults.length > 0
      ? (
          allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length
        ).toFixed(1)
      : null;

  const passed = allResults.filter((r) => r.score >= 50).length;
  const failed = allResults.length - passed;

  // Group by session
  const grouped = enrollments?.reduce(
    (acc, e) => {
      const key = `${e.session_year} — ${e.semester} semester`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(e);
      return acc;
    },
    {} as Record<string, typeof enrollments>,
  );

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">My Results</h1>

      {/* Overall Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          title="Overall Average"
          value={overallAvg ? `${overallAvg}%` : "N/A"}
        />
        <Card title="Total Courses" value={allResults.length} />
        <Card title="Passed" value={passed} color="text-green-600" />
        <Card title="Failed" value={failed} color="text-red-500" />
      </div>

      {/* Results by semester */}
      {!grouped || Object.keys(grouped).length === 0 ? (
        <p className="text-gray-400">No results available yet.</p>
      ) : (
        Object.entries(grouped).map(([session, entries]) => {
          const sessionResults = entries?.flatMap((e) => e.results ?? []) ?? [];
          const sessionAvg =
            sessionResults.length > 0
              ? (
                  sessionResults.reduce((s, r) => s + r.score, 0) /
                  sessionResults.length
                ).toFixed(1)
              : "N/A";

          return (
            <div key={session} className="bg-white rounded-xl shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg">{session}</h2>
                <span className="text-sm text-gray-500">
                  Semester avg:{" "}
                  <strong className="text-blue-600">{sessionAvg}%</strong>
                </span>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b text-xs uppercase">
                    <th className="pb-2">Course</th>
                    <th className="pb-2">Title</th>
                    <th className="pb-2">Units</th>
                    <th className="pb-2">Score</th>
                    <th className="pb-2">Grade</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {entries?.map((e, i) => {
                    const course = e.courses as any;
                    const result = (e.results as any[])?.[0];
                    return (
                      <tr
                        key={i}
                        className="border-b last:border-0 hover:bg-gray-50"
                      >
                        <td className="py-3 font-mono text-xs text-blue-600">
                          {course?.course_code}
                        </td>
                        <td className="py-3">{course?.course_title}</td>
                        <td className="py-3">{course?.credit_unit}</td>
                        <td className="py-3 font-semibold">
                          {result?.score ?? "—"}
                        </td>
                        <td className="py-3 font-bold">
                          {result?.grade ?? "—"}
                        </td>
                        <td className="py-3">
                          {result ? (
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${
                                result.score >= 50
                                  ? "bg-green-100 text-green-600"
                                  : "bg-red-100 text-red-500"
                              }`}
                            >
                              {result.score >= 50 ? "Pass" : "Fail"}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-400">
                              Pending
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })
      )}
    </div>
  );
}

function Card({
  title,
  value,
  color = "text-gray-800",
}: {
  title: string;
  value: string | number;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-xs text-gray-500">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
  );
}
