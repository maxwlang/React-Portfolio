import React from "react";
import Section from "@/components/shared/Section";
import hobbiesAndInterests from "@/data/hobbiesAndInterests";
import HobbyGrid from "@/components/home/HobbyGrid";

const HobbiesAndInterests: React.FC = () => {
  return (
    <Section className="bg-gray-200 dark:bg-slate-900" id="hobbies">
      <h2 className="text-4xl font-bold text-center mb-12">
        Hobbies &amp; Interests
      </h2>

      <div className="mb-12">
        <HobbyGrid hobbies={hobbiesAndInterests} />
      </div>
    </Section>
  );
};

export default HobbiesAndInterests;
