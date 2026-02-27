// app/lecturer/page.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

export default async function LecturerOverview() {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser) redirect("/api/auth/login");

  // Step 1: get lecturer record linked to this logged-in user
  const { data: user } = await supabase
    .from("users")
    .select("email")
    .eq("kinde_id", kindeUser.id)
    .single();

  const { data: lecturer } = await supabase
    .from("lecturers")
    .select("id, full_name, department_id")
    .eq("email", user?.email) // assumes lecturers table has email column, see note below
    .single();

  if (!lecturer) return <p>Lecturer profile not found.</p>;

  // Step 2: get their assignments
  const { data: assignments } = await supabase
    .from("course_assignments")
    .select(
      `
      courses (
        id,
        course_title,
        course_code,
        enrollment ( id, results ( score ) )
      )
    `,
    )
    .eq("lecturer_id", lecturer.id);

  const courses = assignments?.map((a) => a.courses).filter(Boolean) ?? [];

  const totalCourses = courses.length;
  const totalStudents = courses.reduce(
    (acc, c: any) => acc + (c.enrollment?.length ?? 0),
    0,
  );
  const allResults = courses.flatMap(
    (c: any) => c.enrollment?.flatMap((e: any) => e.results ?? []) ?? [],
  );
  const passRate =
    allResults.length > 0
      ? (
          (allResults.filter((r: any) => r.score >= 50).length /
            allResults.length) *
          100
        ).toFixed(1)
      : "N/A";

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {lecturer.full_name}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Courses Assigned" value={totalCourses} />
        <Card title="Total Students" value={totalStudents} />
        <Card
          title="Pass Rate"
          value={passRate === "N/A" ? "N/A" : `${passRate}%`}
        />
        <Card
          title="Avg Students/Course"
          value={
            totalCourses > 0 ? Math.round(totalStudents / totalCourses) : 0
          }
        />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl shadow p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}
