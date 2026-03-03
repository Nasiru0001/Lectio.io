import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-7 h-full">
      <div className="absolute top-20 left-10 w-40 h-40 bg-indigo-400 rounded-full blur-2xl opacity-30 animate-float"></div>
      <div className="absolute top-20 left-10 w-40 h-40 bg-indigo-400 rounded-full blur-2xl opacity-30 animate-float"></div>
      <div className="absolute bottom-10 right-20 w-56 h-56 bg-purple-400 rounded-full blur-2xl opacity-20 animate-float"></div>
      <h1 className=" md:text-6xl  text-3xl font-bold text-center leading-tight">
        Smarter Academic Management <br /> for Modern Universities
      </h1>
      <p className="text-xl text-center text-gray-200 leading-10">
        Lectico.io helps universities track Monitor student performance, track
        enrollment trends, <br /> and manage lecturer workload — all in one
        intelligent dashboard designed for decision-makers.
      </p>

      <div className="flex gap-4">
        <Link
          href="/api/auth/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-indigo-600/30 transition"
        >
          Get Started
        </Link>

        <Link
          href="/dashboard"
          className="border border-blue-600 text-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition"
        >
          View Demo
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-800">
//       {/* HERO SECTION */}
//       <section className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white">
//         <h1 className="text-4xl md:text-5xl font-bold mb-6">
//           University Analytics That Drives Smarter Decisions
//         </h1>
//         <p className="max-w-2xl text-lg text-gray-600 mb-8">
//           Monitor student performance, track enrollment trends, and manage
//           lecturer workload — all in one intelligent dashboard designed for
//           decision-makers.
//         </p>
//       </section>

//       {/* FEATURES SECTION */}
//       <section className="py-20 px-6 max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           Powerful Analytics, Simplified
//         </h2>

//         <div className="grid md:grid-cols-4 gap-8">
//           <FeatureCard
//             title="Student Analytics"
//             description="Track active vs inactive students, level distribution, and department performance at a glance."
//           />
//           <FeatureCard
//             title="Enrollment Trends"
//             description="Visualize enrollment growth per semester and year to detect trends and forecast admissions."
//           />
//           <FeatureCard
//             title="Performance Insights"
//             description="Analyze average scores, pass/fail rates, and identify difficult courses instantly."
//           />
//           <FeatureCard
//             title="Lecturer Workload"
//             description="Monitor assigned courses, students per lecturer, and detect overload risks early."
//           />
//         </div>
//       </section>

//       {/* WHO IT'S FOR */}
//       <section className="bg-white py-20 px-6">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-3xl font-bold mb-8">
//             Built For Academic Leaders
//           </h2>

//           <div className="space-y-4 text-lg text-gray-600">
//             <p>✔ University Administrators</p>
//             <p>✔ Department Heads & Deans</p>
//             <p>✔ Academic Analysts</p>
//             <p>✔ Institutional Decision-Makers</p>
//           </div>
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="py-20 px-6 bg-blue-600 text-white text-center">
//         <h2 className="text-3xl font-bold mb-6">
//           Turn Data Into Strategic Decisions
//         </h2>
//         <p className="mb-8 text-lg opacity-90">
//           Stop viewing raw tables. Start understanding trends, performance, and
//           growth.
//         </p>

//         <Link
//           href="/api/auth/login"
//           className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
//         >
//           Access Dashboard
//         </Link>
//       </section>

//       {/* FOOTER */}
//       <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
//         <p>University Analytics System © 2026</p>
//         <p className="mt-2">
//           Built with Next.js • Supabase • Tailwind • Kinde Auth
//         </p>
//       </footer>
//     </div>
//   );
// }

// function FeatureCard({
//   title,
//   description,
// }: {
//   title: string;
//   description: string;
// }) {
//   return (
//     <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition">
//       <h3 className="font-semibold text-lg mb-3">{title}</h3>
//       <p className="text-gray-600 text-sm">{description}</p>
//     </div>
//   );
// }
