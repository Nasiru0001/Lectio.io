import About from "@/components/About";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import React from "react";

const page = () => {
  return (
    <div>
      <div className="h-screen">
        <HeroSection />
      </div>
      <Features />
      <About />
    </div>
  );
};

export default page;
