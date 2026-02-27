"use client";
import { supabase } from "@/app/lib/supabase";
import React, { useEffect, useState } from "react";

export default function CoursesPage() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    getCourses();
    async function getCourses() {
      const { data, error } = await supabase.from("courses").select("*");

      console.log(data);

      if (error) console.log(error);
      else setCourses(data || []);
    }
  }, []);

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Courses</h1>
        <p className="text-gray-500">
          Manage courses offered across departments
        </p>
      </div>
      <div>
        {/* <AddCourseModal /> */}

        <table className="w-full text-sm border-2">
          <thead>
            <tr className="text-left">
              <th>Course Code</th>
              <th>Course Title</th>
              <th>Credit Unit</th>
            </tr>
          </thead>

          <tbody>
            {courses?.map((course) => (
              <tr key={course.id}>
                <td>{course.course_code}</td>
                <td>{course.course_title}</td>
                <td>{course.credit_unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
