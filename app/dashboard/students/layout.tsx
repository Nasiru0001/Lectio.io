// app/dashboard/student/layout.tsx
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/app/lib/supabase";

import Navbar from "@/app/dashboard/components/Navbar";
import StudentSidebar from "../components/StudentSidebar";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getUser } = getKindeServerSession();
  const kindeUser = await getUser();
  if (!kindeUser) redirect("/api/auth/login");

  const { data: user } = await supabase
    .from("users")
    .select("role, email")
    .eq("kinde_id", kindeUser.id)
    .single();

  if (!user || user.role !== "student") redirect("/dashboard");

  // Get student profile
  //   const { data: student } = await supabase
  //     .from("students")
  //     .select("student_id, level, status, departments(name)")
  //     .eq("email", user.email)
  //     .single();

  return (
    <div>
      {/* Sidebar
      <aside className="w-64 bg-white border-r px-4 py-6 space-y-1">
        <div className="mb-6 px-4">
          <h1 className="text-xl font-bold text-blue-600">Student Portal</h1>
          {student && (
            <div className="mt-3 space-y-1">
              <p className="text-sm font-medium text-gray-800">
                {student.student_id}
              </p>
              <p className="text-xs text-gray-500">
                {(student.departments as any)?.name}
              </p>
              <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                Level {student.level}
              </span>
            </div>
          )}
        </div>

        <NavLink href="/dashboard/student">🏠 Overview</NavLink>
        <NavLink href="/dashboard/student/courses">📚 My Courses</NavLink>
        <NavLink href="/dashboard/student/results">📊 My Results</NavLink>
      </aside> */}

      <Navbar />

      <StudentSidebar>{children}</StudentSidebar>
    </div>
  );
}
