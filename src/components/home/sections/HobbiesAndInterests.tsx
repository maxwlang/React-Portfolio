import React from "react";
import Section from "@/components/shared/Section";
import hobbiesAndInterests from "@/data/hobbiesAndInterests";
import HobbyGrid from "@/components/home/HobbyGrid";

const HobbiesAndInterests: React.FC = () => {
  return (
    <Section id="hobbies">
      <h2 className="text-4xl font-bold text-center mb-12">
        Hobbies &amp; Interests
      </h2>

      <HobbyGrid hobbies={hobbiesAndInterests} />
    </Section>
  );
};

export default HobbiesAndInterests;
