// app/dashboard/student/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default async function StudentOverview() {
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
    .select("id, student_id, level, admission_year, status, departments(name)")
    .eq("email", user?.email)
    .single();

  if (!student)
    return (
      <p className="text-gray-500">Student profile not found. Contact admin.</p>
    );

  // Get all enrollments with results
  const { data: enrollments } = await supabase
    .from("enrollment")
    .select(
      `
      id,
      session_year,
      semester,
      courses ( course_title, course_code, credit_unit ),
      results ( score, grade )
    `,
    )
    .eq("student_id", student.id);

  // ---- Compute stats ----
  const allResults = enrollments?.flatMap((e) => e.results ?? []) ?? [];

  const avgScore =
    allResults.length > 0
      ? (
          allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length
        ).toFixed(1)
      : "N/A";

  const passed = allResults.filter((r) => r.score >= 50).length;
  const failed = allResults.length - passed;

  // Current semester enrollments (most recent session_year)
  const sessionYears = [...new Set(enrollments?.map((e) => e.session_year))]
    .sort()
    .reverse();
  const currentSession = sessionYears[0];
  const currentEnrollments =
    enrollments?.filter((e) => e.session_year === currentSession) ?? [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <p className="text-gray-500 text-sm mt-1">
          {(student.departments as any)?.name} · Level {student.level} ·{" "}
          <span
            className={`font-medium ${
              student.status === "active" ? "text-green-600" : "text-red-500"
            }`}
          >
            {student.status}
          </span>
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card
          title="Current Courses"
          value={currentEnrollments.length}
          sub={currentSession ?? "—"}
        />
        <Card
          title="Average Score"
          value={avgScore === "N/A" ? "N/A" : `${avgScore}%`}
        />
        <Card title="Passed" value={passed} color="text-green-600" />
        <Card title="Failed" value={failed} color="text-red-500" />
      </div>

      {/* Current semester courses */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="font-semibold text-lg mb-4">
          Current Semester Courses
          <span className="ml-2 text-sm text-gray-400">{currentSession}</span>
        </h2>

        {currentEnrollments.length === 0 ? (
          <p className="text-gray-400 text-sm">
            No enrollments found for this semester.
          </p>
        ) : (
          <div className="space-y-3">
            {currentEnrollments.map((e, i) => {
              const course = e.courses as any;
              const result = (e.results as any[])?.[0];
              return (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-3 last:border-0"
                >
                  <div>
                    <span className="text-xs font-mono bg-blue-50 text-blue-600 px-2 py-0.5 rounded">
                      {course?.course_code}
                    </span>
                    <p className="text-sm font-medium mt-1">
                      {course?.course_title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {course?.credit_unit} credit units
                    </p>
                  </div>
                  <div className="text-right">
                    {result ? (
                      <>
                        <p className="text-lg font-bold">{result.score}%</p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            result.score >= 50
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {result.score >= 50 ? "Pass" : "Fail"}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs text-gray-400">
                        No result yet
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  sub,
  color = "text-gray-800",
}: {
  title: string;
  value: string | number;
  sub?: string;
  color?: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-xs text-gray-500">{title}</p>
      <p className={`text-2xl font-bold mt-1 ${color}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  );
}
