// app/dashboard/student/courses/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default async function StudentCourses() {
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
      courses (
        id,
        course_code,
        course_title,
        credit_unit,
        course_assignments (
          lecturers ( full_name )
        )
      )
    `,
    )
    .eq("student_id", student?.id)
    .order("session_year", { ascending: false });

  // Group by session year
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
      <h1 className="text-2xl font-bold">My Courses</h1>

      {!grouped || Object.keys(grouped).length === 0 ? (
        <p className="text-gray-400">You have no enrolled courses yet.</p>
      ) : (
        Object.entries(grouped).map(([session, entries]) => (
          <div
            key={session}
            className="bg-white rounded-xl shadow p-6 text-black"
          >
            <h2 className="font-semibold text-lg mb-4 text-gray-700">
              {session}
            </h2>

            <div className="grid gap-3">
              {entries?.map((e, i) => {
                const course = e.courses as any;
                const lecturer =
                  course?.course_assignments?.[0]?.lecturers?.full_name ??
                  "Not assigned";

                return (
                  <div
                    key={i}
                    className="flex items-center justify-between border rounded-lg px-4 py-3 hover:bg-gray-50 text-black"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-mono bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
                        {course?.course_code}
                      </span>
                      <div>
                        <p className="text-sm font-medium">
                          {course?.course_title}
                        </p>
                        <p className="text-xs text-gray-400">👨‍🏫 {lecturer}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">
                        {course?.credit_unit} units
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-gray-400 mt-3">
              Total credit units:{" "}
              <strong>
                {entries?.reduce(
                  (sum, e) => sum + ((e.courses as any)?.credit_unit ?? 0),
                  0,
                )}
              </strong>
            </p>
          </div>
        ))
      )}
    </div>
  );
}
