"use client";

import skills from "@/data/skills";
import React from "react";
import Section from "@/components/shared/Section";

const Skills: React.FC = () => {
  return (
    <Section id="skills">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((skill, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-xl p-6 flex flex-col min-h-[250px] w-full max-w-[300px] sm:min-w-[350px] transform transition-transform hover:scale-105 hover:rotate-1 hover:shadow-2xl animate-fadeIn`}
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">
              {skill.category}
            </h3>
            <ul className="space-y-2">
              {skill.items.map((item, i) => (
                <li key={i} className="text-gray-600 text-sm flex items-center">
                  <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
