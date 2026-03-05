"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "@/app/lib/supabase";

export default function DashboardCharts() {
  const [enrollmentData, setEnrollmentData] = useState<
    { year: string; count: number }[]
  >([]);
  const [performanceData, setPerformanceData] = useState<
    { grade: string; count: number }[]
  >([]);
  const [facultyData, setFacultyData] = useState<
    { faculty: string; count: number }[]
  >([]);

  // Fetch all necessary data
  useEffect(() => {
    async function fetchData() {
      // 1️⃣ Enrollment per year
      const { data: students } = await supabase
        .from("students")
        .select("admission_year");
      if (students) {
        const enrollmentCounts: Record<string, number> = {};
        students.forEach((s) => {
          const year = s.admission_year;
          enrollmentCounts[year] = (enrollmentCounts[year] || 0) + 1;
        });
        setEnrollmentData(
          Object.entries(enrollmentCounts).map(([year, count]) => ({
            year,
            count,
          })),
        );
      }

      // 2️⃣ Performance distribution (grades)
      const { data: results } = await supabase.from("results").select("grade");
      if (results) {
        const gradeCounts: Record<string, number> = {};
        results.forEach((r) => {
          const grade = r.grade || "F";
          gradeCounts[grade] = (gradeCounts[grade] || 0) + 1;
        });
        setPerformanceData(
          Object.entries(gradeCounts).map(([grade, count]) => ({
            grade,
            count,
          })),
        );
      }

      // 3️⃣ Faculty distribution (number of students per faculty)
      const { data: studentsWithFaculty, error } = await supabase
        .from("students")
        .select(
          "id, departments(faculty_id, name), departments:faculty_id(faculties(name))",
        )
        .returns<any[]>(); // adjust as per supabase typings

      console.log(
        "Students with faculty data:",
        studentsWithFaculty,
        "Error:",
        error,
      );

      if (studentsWithFaculty) {
        const facultyCounts: Record<string, number> = {};
        studentsWithFaculty.forEach((s) => {
          const facultyName = s.departments?.faculties?.name || "Unknown";
          facultyCounts[facultyName] = (facultyCounts[facultyName] || 0) + 1;
        });

        setFacultyData(
          Object.entries(facultyCounts).map(([faculty, count]) => ({
            faculty,
            count,
          })),
        );
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container py-4 space-y-4">
      {/* Top Row */}
      <div className="grid grid-cols-2 gap-4">
        {/* Enrollment Trend */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-2 text-2xl text-black">
            Enrollment Trend
          </h2>
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
              dataLabels: { enabled: false },
              colors: ["#4F46E5"],
            }}
          />
        </div>

        {/* Performance Distribution */}
        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-2 text-2xl text-black">
            Performance Distribution
          </h2>
          <Chart
            type="bar"
            height={300}
            series={[
              {
                name: "Students",
                data: performanceData.map((d) => d.count),
              },
            ]}
            options={{
              chart: { id: "performance", toolbar: { show: false } },
              xaxis: { categories: performanceData.map((d) => d.grade) },
              plotOptions: { bar: { columnWidth: "50%" } },
              dataLabels: { enabled: false },
              colors: ["#10B981"],
            }}
          />
        </div>
      </div>

      {/* Faculty Distribution */}
      <div className="bg-white rounded-xl shadow p-4">
        <h2 className="font-bold mb-2 text-black text-2xl">
          Faculty Distribution
        </h2>
        <Chart
          type="donut"
          height={400}
          series={facultyData.map((d) => d.count)}
          options={{
            labels: facultyData.map((d) => d.faculty),
            colors: ["#F59E0B", "#EF4444", "#3B82F6", "#A855F7", "#14B8A6"],
            legend: { position: "bottom" },
          }}
        />
      </div>
    </div>
  );
}
