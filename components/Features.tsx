import React from "react";
import { GraduationCap } from "lucide-react";
import { UserPlus } from "lucide-react";
import { TrendingUp } from "lucide-react";
import { BookOpenText } from "lucide-react";
type CardComponent = {
  title: string;
  value: string;
};

const Features = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto text-center mb-16 space-y-5">
        <p className=" text-4xl text-indigo-600 font-extrabold uppercase tracking-wide">
          Platform Capabilities
        </p>

        <h2 className="text-4xl font-bold mt-4">
          Powerful Tools for Smarter Academic Management
        </h2>

        <p className="text-gray-300 text-xl mt-4 max-w-2xl mx-auto">
          Lectico.io gives administrators, lecturers, and institutions real-time
          visibility into academic performance, workload distribution, and
          enrollment intelligence.
        </p>
      </div>

      {/* <h2 className="tmd:text-5xl text-4xl font-bold uppercase text-center mb-12 ">
        Powerful Analytics, Simplified
      </h2> */}

      <div className="grid md:grid-cols-3 grid-cols-1 grid-rows-2 gap-4 md:px-0 px-4">
        <CardComponent
          title="Student Analytics"
          value="  Track active vs inactive students, level distribution, and department breakdown."
          svg={
            <GraduationCap size={48} className="bg-blue-700 p-1 rounded-xl" />
          }
        />
        <CardComponent
          title="Enrollment Trends"
          value=" Visualize enrollment per semester, year, and course, with growth insights."
          svg={<UserPlus size={48} className="bg-green-700 p-1 rounded-xl" />}
        />
        <CardComponent
          title="Performance Insights"
          value=" View average scores, pass/fail rates, and course difficulty comparisons."
          svg={
            <TrendingUp size={48} className="bg-purple-700 p-1 rounded-xl" />
          }
        />
        <CardComponent
          title="Lecturer Workload"
          value=" Quickly see assigned courses, students per lecturer, and overloaded staff"
          svg={
            <BookOpenText size={48} className="bg-orange-700 p-1 rounded-xl" />
          }
        />
      </div>
    </div>
  );
};

export default Features;

function CardComponent({
  title,
  value,
  svg,
}: {
  title: string;
  value: string;
  svg?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col bg-white text-black py-20 md:mx-0 mx-3 md:pt-10 md:pb-10 px-10 rounded-2xl w-100 space-y-3">
      {svg}
      <h1 className="text-2xl font-bold">{title}</h1>

      <p>{value}</p>
    </div>
  );
}
