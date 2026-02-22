import React from "react";
type CardComponent = {
  title: string;
  value: string;
};

const Features = () => {
  return (
    <div className="grid md:grid-cols-3 grid-cols-1 grid-rows-2 gap-4 md:px-0 px-4">
      <CardComponent
        title="Student Analytics"
        value="  Track active vs inactive students, level distribution, and department breakdown."
      />

      <CardComponent
        title="Enrollment Trends"
        value=" Visualize enrollment per semester, year, and course, with growth insights."
      />

      <CardComponent
        title="Performance Insights"
        value=" View average scores, pass/fail rates, and course difficulty comparisons."
      />

      <CardComponent
        title="Lecturer Workload"
        value=" Quickly see assigned courses, students per lecturer, and overloaded staff"
      />
    </div>
  );
};

export default Features;

function CardComponent({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white text-black py-20 md:mx-0 mx-3  md:py-10 md:px-5 rounded-2xl text-center space-y-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p>{value}</p>
    </div>
  );
}
