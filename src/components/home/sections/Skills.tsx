"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Section from "@/components/shared/Section";
import TextPill from "@/components/shared/TextPill";
import skills from "@/data/skills";

const Skills: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = gsap.utils.toArray<HTMLElement>(".skill-card");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 80%",
            end: "bottom top",
          },
        }
      );
    },
    { scope: container }
  );

  return (
    <Section id="skills">
      <div ref={container} className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">Skills</h2>
        <p className="text-center text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-12">
          The tools, languages, and practices I use to ship reliable software.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((group) => (
            <div
              key={group.category}
              className="skill-card bg-foreground dark:bg-slate-900 dark:text-foreground rounded-lg shadow-xl dark:shadow-lg p-6 flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <TextPill key={item} text={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Skills;
