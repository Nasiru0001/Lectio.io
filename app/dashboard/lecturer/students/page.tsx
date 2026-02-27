// app/lecturer/students/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default async function LecturerStudents() {
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
          students ( student_id, level, gender, status ),
          results ( score, grade )
        )
      )
    `,
    )
    .eq("lecturer_id", lecturer?.id);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">My Students</h1>

      {assignments?.map((a, i) => {
        const course = a.courses as any;
        const enrollments = course?.enrollment ?? [];

        return (
          <div key={i} className="bg-white rounded-xl shadow p-5">
            <h2 className="text-lg font-semibold mb-4">
              {course.course_code} — {course.course_title}
              <span className="ml-2 text-sm text-gray-400">
                ({enrollments.length} students)
              </span>
            </h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="pb-2">Student ID</th>
                  <th className="pb-2">Level</th>
                  <th className="pb-2">Gender</th>
                  <th className="pb-2">Status</th>
                  <th className="pb-2">Score</th>
                  <th className="pb-2">Grade</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((e: any, j: number) => (
                  <tr
                    key={j}
                    className="border-b last:border-0 hover:bg-gray-50"
                  >
                    <td className="py-2">{e.students?.student_id ?? "—"}</td>
                    <td className="py-2">{e.students?.level ?? "—"}</td>
                    <td className="py-2">{e.students?.gender ?? "—"}</td>
                    <td className="py-2">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs ${
                          e.students?.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {e.students?.status ?? "—"}
                      </span>
                    </td>
                    <td className="py-2">{e.results?.[0]?.score ?? "—"}</td>
                    <td className="py-2 font-medium">
                      {e.results?.[0]?.grade ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
