"use client";

// import skills from "@/data/skills";
import React from "react";
import Section from "@/components/shared/Section";

const Skills: React.FC = () => {
  return (
    <Section id="skills">
      <h2 className="text-4xl font-bold text-center mb-12">Skills</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"></div>
    </Section>
  );
};

export default Skills;
