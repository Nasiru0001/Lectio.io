"use client";
import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { supabase } from "@/app/lib/supabase";

export default function PerformanceAnalytics() {
  const [performanceData, setPerformanceData] = useState<
    { grade: string; count: number }[]
  >([]);
  const [totalResults, setTotalResults] = useState(0);
  const [averageScore, setAverageScore] = useState(0);

  useEffect(() => {
    async function fetchPerformance() {
      const { data: results } = await supabase
        .from("results")
        .select("score, grade");
      if (!results) return;

      const counts: Record<string, number> = {};
      let sum = 0;
      results.forEach((r) => {
        const grade = r.grade || "F";
        counts[grade] = (counts[grade] || 0) + 1;
        sum += r.score || 0;
      });

      setPerformanceData(
        Object.entries(counts).map(([grade, count]) => ({ grade, count })),
      );
      setTotalResults(results.length);
      setAverageScore(results.length ? Math.round(sum / results.length) : 0);
    }

    fetchPerformance();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-xl font-bold mb-2">Performance Analytics</h2>
      <p className="text-gray-600 mb-4">
        Total Results: <span className="font-semibold">{totalResults}</span> |
        Average Score: <span className="font-semibold">{averageScore}</span>
      </p>
      <Chart
        type="bar"
        height={300}
        series={[
          { name: "Students", data: performanceData.map((d) => d.count) },
        ]}
        options={{
          chart: { id: "performance-bar", toolbar: { show: false } },
          xaxis: { categories: performanceData.map((d) => d.grade) },
          plotOptions: { bar: { columnWidth: "50%" } },
          colors: ["#10B981"],
          dataLabels: { enabled: false },
        }}
      />
      <p className="text-gray-500 mt-2 text-sm">
        This chart shows the distribution of grades among students.
      </p>
    </div>
  );
}
