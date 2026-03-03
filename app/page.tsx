import About from "@/components/About";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import React from "react";
import Navbar from "@/components/Navbar";
import ProandCon from "@/components/ProblemandSolution";

const page = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <div className="h-screen">
        <HeroSection />
      </div>
      <ProandCon />
      <Features />
      <About />
      <CTA />
    </div>
  );
};

export default page;
