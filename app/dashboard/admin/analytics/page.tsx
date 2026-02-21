"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function StudentsAnalytics() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const { data } = await supabase
        .from("departments")
        .select("name, students(count)");

      console.log(data);

      const labels = data?.map((d) => d.name);
      const counts = data?.map((d) => d.students.length);

      console.log("labels:", labels);
      console.log(counts);

      setChartData({
        labels,
        datasets: [
          {
            label: "Students per Department",
            data: counts,
            borderWidth: 1,
          },
        ],
      });
    }
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Students Per Department</h1>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
            },
          },
        }}
      />
    </div>
  );
}
