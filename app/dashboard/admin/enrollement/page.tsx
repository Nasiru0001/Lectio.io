"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

export default function EnrollmentGrowth() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      const { data, error } = await supabase
        .from("enrollment ")
        .select("session_year");

      console.log("data:", data);
      console.log("error:", error);

      const grouped: any = {};

      data?.forEach((item) => {
        grouped[item.session_year] = (grouped[item.session_year] || 0) + 1;
      });

      const labels = Object.keys(grouped);
      const counts = Object.values(grouped);

      setChartData({
        labels,
        datasets: [
          {
            label: "Enrollments Per Year",
            data: counts,
          },
        ],
      });
    }
  }, []);

  if (!chartData) return <p>Loading...</p>;

  return <Line data={chartData} />;
}
