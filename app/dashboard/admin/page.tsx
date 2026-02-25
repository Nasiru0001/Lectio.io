"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import DashboardCharts from "./DashboardCharts/page";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    students: 0,
    departments: 0,
    courses: 0,
    lecturers: 0,
    average: 0,
    enrollment: 0,
    passRate: 0,
  });

  useEffect(() => {
    fetchStats();
    async function fetchStats() {
      const { count: students } = await supabase
        .from("students")
        .select("*", { count: "exact", head: true });

      const { count: enrollment } = await supabase
        .from("enrollment")
        .select("*", { count: "exact", head: true });

      const { count: departments } = await supabase
        .from("departments")
        .select("*", { count: "exact", head: true });

      const { count: courses } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true });

      const { count: lecturers } = await supabase
        .from("lecturers")
        .select("*", { count: "exact", head: true });

      const { data: results } = await supabase.from("results").select("score");

      const average = results
        ? results.reduce((acc, curr) => acc + curr.score, 0) / results.length
        : 0;

      const { count: total } = await supabase
        .from("results")
        .select("*", { count: "exact", head: true });

      const { count: passCount } = await supabase
        .from("results")
        .select("*", { count: "exact", head: true })
        .gte("score", 50);

      const passRate = total && passCount ? (passCount / total) * 100 : 0;

      setStats({
        students: students || 0,
        departments: departments || 0,
        courses: courses || 0,
        lecturers: lecturers || 0,
        average: average || 0,
        enrollment: enrollment || 0,
        passRate: passRate || 0,
      });
    }
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card title="Total Students" value={stats.students} />
        <Card title="Lecturers" value={stats.lecturers} />
        <Card title="Courses" value={stats.courses} />
        <Card title="Enrollment" value={stats.enrollment} />
        <Card title="Departments" value={stats.departments} />
        <Card title="Average Score" value={`${stats.average.toFixed(0)}%`} />
        <Card title="Pass Rate" value={`${stats.passRate.toFixed(1)}%`} />
      </div>

      <DashboardCharts />
    </div>
  );
}

function Card({ title, value }: { title: string; value: number | string }) {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-black">{title}</h2>
      <p className="text-3xl text-black font-bold mt-2">{value}</p>
    </div>
  );
}
// "use client";
// import { useState } from "react";
// import { supabase } from "@/app/lib/supabase";

// export default function AdminPage() {
//   const [name, setName] = useState("");
//   const [faculty, setFaculty] = useState("");
//   const [message, setMessage] = useState("");

//   async function addDepartment() {
//     const { data, error } = await supabase
//       .from("departments")
//       .insert([{ name, faculty }]);
//     if (error) setMessage("Error: " + error.message);
//     else setMessage("Department  added successfully");
//   }

//   return (
//     <div className="p-8 max-w-lg mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Add Department</h1>
//       <input
//         type="text"
//         placeholder="Department Name"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         className="border p-2 rounded w-full mb-2"
//       />
//       <input
//         type="text"
//         placeholder="Faculty"
//         value={faculty}
//         onChange={(e) => setFaculty(e.target.value)}
//         className="border p-2 rounded w-full mb-2"
//       />
//       <button
//         onClick={addDepartment}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Add Department
//       </button>
//       {message && <p className="mt-2">{message}</p>}
//     </div>
//   );
// }
