import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="py-20 px-6 bg-blue-600 text-white text-center my-12">
      <h2 className="md:text-4xl text-4xl font-bold uppercase mb-6">
        Turn Data Into Strategic Decisions
      </h2>
      <p className="mb-8 text-lg opacity-90">
        Stop viewing raw tables. Start understanding trends, performance, and
        growth.
      </p>

      <Link
        href="/api/auth/login"
        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
      >
        Access Dashboard
      </Link>
    </section>
  );
};

export default CTA;
