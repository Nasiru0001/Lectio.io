"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function ExecutiveCards() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [enrollmentGrowth, setEnrollmentGrowth] = useState(0);
  const [passRate, setPassRate] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [overloadedLecturers, setOverloadedLecturers] = useState(0);

  useEffect(() => {
    fetchKPIs();
  }, []);

  async function fetchKPIs() {
    // 1️⃣ Total Active Students
    const { data: students } = await supabase
      .from("students")
      .select("id")
      .eq("status", "active");
    setTotalStudents(students?.length || 0);

    // 2️⃣ Enrollment Growth (compare last 2 years)
    const { data: enrollments } = await supabase
      .from("enrollments")
      .select("session_year");

    console.log("Enrollments data:", enrollments); // Debug log
    if (enrollments) {
      const years: Record<string, number> = {};
      enrollments.forEach((e) => {
        years[e.session_year] = (years[e.session_year] || 0) + 1;
      });
      const sortedYears = Object.keys(years).sort();
      if (sortedYears.length >= 2) {
        const lastYear = sortedYears[sortedYears.length - 2];
        const currentYear = sortedYears[sortedYears.length - 1];
        const growth =
          ((years[currentYear] - years[lastYear]) / years[lastYear]) * 100;
        setEnrollmentGrowth(Math.round(growth));
      }
    }

    // 3️⃣ Pass Rate
    const { data: results } = await supabase.from("results").select("grade");
    if (results) {
      const total = results.length;
      const pass = results.filter((r) => r.grade !== "F").length;
      setPassRate(Math.round((pass / total) * 100));
      const avgScore = results.reduce((sum, r) => sum + r.score, 0) / total;
      setAverageScore(Math.round(avgScore));
    }

    // 4️⃣ Overloaded Lecturers
    const { data: lecturers } = await supabase
      .from("lecturers")
      .select("id, courses:course_assignments(*)");
    if (lecturers) {
      let count = 0;
      lecturers.forEach((l) => {
        const courseCount = l.courses.length;
        const studentCount = l.courses.reduce(
          (s, c) => s + (c.students?.length || 0),
          0,
        );
        if (courseCount > 3 || studentCount > 250) count++;
      });
      setOverloadedLecturers(count);
    }
  }

  const cardClass = "bg-white shadow p-4 rounded flex-1 text-center";

  return (
    <div className="flex gap-4 mb-6">
      <div className={cardClass}>
        <h2 className="font-bold text-gray-500">Total Students</h2>
        <p className="text-2xl text-black">{totalStudents}</p>
      </div>
      <div className={cardClass}>
        <h2 className="font-bold text-gray-500">Enrollment Growth</h2>
        <p className="text-2xl text-black">{enrollmentGrowth}%</p>
      </div>
      <div className={cardClass}>
        <h2 className="font-bold text-gray-500">Pass Rate</h2>
        <p className="text-2xl text-black">{passRate}%</p>
      </div>
      <div className={cardClass}>
        <h2 className="font-bold text-gray-500">Average Score</h2>
        <p className="text-2xl text-black">{averageScore}</p>
      </div>
      <div className={cardClass}>
        <h2 className="font-bold text-gray-500">Overloaded Lecturers</h2>
        <p className="text-2xl text-black">{overloadedLecturers}</p>
      </div>
    </div>
  );
}
