"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import DashboardCharts from "./DashboardCharts/page";
import {
  BookOpenText,
  TrendingUp,
  Building2,
  Percent,
  BookOpenCheck,
} from "lucide-react";

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
        <Card
          title="Total Students"
          value={stats.students}
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-users-icon lucide-users stroke-blue-500 bg-blue-200 p-2  w-10 h-10 rounded-xl"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <path d="M16 3.128a4 4 0 0 1 0 7.744" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          }
        />
        <Card
          title="Lecturers"
          value={stats.lecturers}
          svg={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-square-user-round-icon lucide-square-user-round stroke-green-500 bg-green-200 p-2  w-10 h-10 rounded-xl"
            >
              <path d="M18 21a6 6 0 0 0-12 0" />
              <circle cx="12" cy="11" r="4" />
              <rect width="18" height="18" x="3" y="3" rx="2" />
            </svg>
          }
        />
        <Card
          title="Courses"
          value={stats.courses}
          svg={
            <BookOpenText className=" p-2 w-10 h-10 bg-orange-500  rounded-xl " />
          }
        />
        <Card
          title="Enrollment"
          value={stats.enrollment}
          svg={
            <TrendingUp className=" p-2 w-10 h-10 bg-yellow-500  rounded-xl " />
          }
        />
        <Card
          title="Departments"
          value={stats.departments}
          svg={
            <Building2 className=" p-2 w-10 h-10 bg-yellow-500  rounded-xl " />
          }
        />
        <Card
          title="Average Score"
          value={`${stats.average.toFixed(0)}%`}
          svg={
            <Percent className=" p-2 w-10 h-10 bg-purple-500  rounded-xl " />
          }
        />
        <Card
          title="Pass Rate"
          value={`${stats.passRate.toFixed(1)}%`}
          svg={
            <BookOpenCheck className=" p-2 w-10 h-10 bg-red-500  rounded-xl " />
          }
        />
      </div>

      <DashboardCharts />
    </div>
  );
}

function Card({
  title,
  value,
  svg,
}: {
  title: string;
  value: number | string;
  svg?: React.ReactNode;
}) {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex flex-col items-start gap-2">
      {svg}
      <h2 className="text-black">{title}</h2>
      <p className="text-3xl text-black font-bold ">{value}</p>
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
