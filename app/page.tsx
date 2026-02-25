import About from "@/components/About";
import CTA from "@/components/CTA";
import Features from "@/components/Features";
import HeroSection from "@/components/HeroSection";
import React from "react";
import Navbar from "@/components/Navbar";

const page = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
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
