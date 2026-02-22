import React from "react";

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-7 h-full">
      <h1 className=" md:text-5xl text-3xl font-bold text-center md:text-left">
        UNIVERSITY ANANLYTICS <br className="md:hidden block " /> SYSTEM
      </h1>
      <p className="text-xl text-center">
        Monitor student performance, enrollment trends, <br /> and lecturer
        workload — in one intelligent dashboard.
      </p>

      <button className="px-4 py-2 bg-blue-600 text-white rounded-full">
        Get Started
      </button>
    </div>
  );
};

export default HeroSection;
