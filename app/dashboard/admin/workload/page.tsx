import { supabase } from "@/app/lib/supabase";
import React from "react";

export default async function Workload() {
  const { data: assignments, error } = await supabase.from("course_assignments")
    .select(`
      lecturers (
        id,
        full_name
      ),
      courses (
        id,
        course_title,
        course_code,
        enrollment (
          id,
          results ( score )
        )
      )
    `);

  if (error) {
    console.log("Error fetching workload:", error);
    return <p>Failed to load workload data.</p>;
  }

  // Add this temporarily to see what's coming back from Supabase
  // console.log("Raw assignments:", JSON.stringify(assignments, null, 2));

  // Group assignments by lecturer
  const lecturerMap: Record<
    string,
    {
      id: string;
      full_name: string;
      courses: {
        course_title: string;
        course_code: string;
        enrollment: { results: { score: number }[] }[];
      }[];
    }
  > = {};

  assignments?.forEach((assignment) => {
    // Fix: Supabase returns joined rows as array, so grab index [0]
    const lecturer = Array.isArray(assignment.lecturers)
      ? assignment.lecturers[0]
      : assignment.lecturers;

    const course = Array.isArray(assignment.courses)
      ? assignment.courses[0]
      : assignment.courses;

    if (!lecturer || !course) return;

    const lecturerId = lecturer.id as string;
    const lecturerName = lecturer.full_name as string;

    if (!lecturerMap[lecturerId]) {
      lecturerMap[lecturerId] = {
        id: lecturerId,
        full_name: lecturerName,
        courses: [],
      };
    }

    lecturerMap[lecturerId].courses.push(course as any);
  });

  const lecturers = Object.values(lecturerMap);
  console.log("Grouped lecturers:", lecturers.length); // should show 13

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Lecturer Workload</h1>

      {lecturers.length === 0 && (
        <p className="text-gray-500">No workload data found.</p>
      )}

      {lecturers.map((lecturer) => {
        const totalCourses = lecturer.courses.length;

        const totalStudents = lecturer.courses.reduce((acc, course) => {
          const count = Array.isArray(course.enrollment)
            ? course.enrollment.length
            : 0;
          return acc + count;
        }, 0);

        const allResults = lecturer.courses.flatMap((course) =>
          course.enrollment?.flatMap((e) => e.results),
        );

        const pass = allResults.filter((r) => r?.score >= 50).length;

        const passRate =
          allResults.length > 0
            ? ((pass / allResults.length) * 100).toFixed(1)
            : "N/A";

        const avgStudents =
          totalCourses > 0 ? Math.round(totalStudents / totalCourses) : 0;

        return (
          <div
            key={lecturer.id}
            className="bg-white text-black p-6 rounded-xl shadow"
          >
            <h2 className="text-lg font-semibold">{lecturer.full_name}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <Card title="Courses" value={totalCourses} />
              <Card title="Total Students" value={totalStudents} />
              <Card
                title="Pass Rate"
                value={passRate === "N/A" ? "N/A" : `${passRate}%`}
              />
              <Card title="Avg Students/Course" value={avgStudents} />
            </div>

            {/* Course breakdown */}
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Courses Assigned:</p>
              <div className="flex flex-wrap gap-2">
                {lecturer.courses.map((course) => (
                  <span
                    key={course.course_code}
                    className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full"
                  >
                    {course.course_code} — {course.course_title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}
