"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "@/app/lib/supabase";

export default function EnrollmentAnalytics() {
  const [enrollmentData, setEnrollmentData] = useState<
    { year: string; count: number }[]
  >([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [growth, setGrowth] = useState(0);

  useEffect(() => {
    async function fetchEnrollment() {
      const { data: students } = await supabase
        .from("students")
        .select("admission_year");
      if (!students) return;

      const counts: Record<string, number> = {};
      students.forEach((s) => {
        const year = s.admission_year;
        counts[year] = (counts[year] || 0) + 1;
      });

      const sortedYears = Object.keys(counts).sort();
      setEnrollmentData(
        sortedYears.map((year) => ({ year, count: counts[year] })),
      );

      const total = students.length;
      setTotalStudents(total);

      // Calculate growth between last two years
      if (sortedYears.length > 1) {
        const lastYear = counts[sortedYears[sortedYears.length - 1]];
        const prevYear = counts[sortedYears[sortedYears.length - 2]];
        setGrowth(Math.round(((lastYear - prevYear) / prevYear) * 100));
      }
    }

    fetchEnrollment();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-2">Enrollment Analytics</h2>
      <p className="text-gray-600 mb-4">
        Total Students: <span className="font-semibold">{totalStudents}</span> |
        Yearly Growth: <span className="font-semibold">{growth}%</span>
      </p>
      <Chart
        type="line"
        height={300}
        series={[
          {
            name: "Students Enrolled",
            data: enrollmentData.map((d) => d.count),
          },
        ]}
        options={{
          chart: { id: "enrollment-trend", toolbar: { show: false } },
          xaxis: { categories: enrollmentData.map((d) => d.year) },
          stroke: { curve: "smooth" },
          colors: ["#4F46E5"],
          dataLabels: { enabled: false },
        }}
      />
      <p className="text-gray-500 mt-2 text-sm">
        This chart shows the total number of students enrolled per year.
      </p>
    </div>
  );
}
