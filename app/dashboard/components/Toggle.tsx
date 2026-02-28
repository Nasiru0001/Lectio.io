"use client";
import React, { useState } from "react";

const Toggle = () => {
  const [toggle, setToggle] = useState("black");

  function toggled() {
    setToggle((c) => (c === "black" ? "white" : "black"));
    console.log("coolllllll");
  }

  return (
    <div>
      <p style={{ color: toggle }}>Yoooooooo</p>
      <button onClick={toggled}>Click</button>
    </div>
  );
};

export default Toggle;
