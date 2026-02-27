// app/lecturer/courses/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default async function LecturerCourses() {
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
      session_year,
      semester,
      courses (
        id,
        course_code,
        course_title,
        credit_unit,
        enrollment ( id )
      )
    `,
    )
    .eq("lecturer_id", lecturer?.id);

  console.log("1. Logged in user:", user);
  console.log("2. Lecturer found:", lecturer);
  console.log("3. Assignments:", assignments);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Courses</h1>

      <div className="grid gap-4">
        {assignments?.map((a, i) => {
          const course = a.courses as any;
          return (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-5 flex justify-between items-center"
            >
              <div>
                <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-mono">
                  {course.course_code}
                </span>
                <h2 className="text-lg font-semibold mt-1">
                  {course.course_title}
                </h2>
                <p className="text-sm text-gray-500">
                  {a.session_year} · {a.semester} semester ·{" "}
                  {course.credit_unit} credit units
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">
                  {course.enrollment?.length ?? 0}
                </p>
                <p className="text-sm text-gray-500">students</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
