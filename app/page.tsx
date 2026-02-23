import About from "@/components/About";
import CTA from "@/components/CTA";
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
      <CTA />
    </div>
  );
};

export default page;
