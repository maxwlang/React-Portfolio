import React from "react";
import Section from "@/components/shared/Section";
import hobbiesAndInterests from "@/data/hobbiesAndInterests";
import Image from "next/image";

const HobbiesAndInterests: React.FC = () => {
  return (
    <Section id="hobbies">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Hobbies
      </h2>
      <div className="max-w-5xl w-full">
        <div className="grid grid-cols-3 gap-4 mt-10">
          {hobbiesAndInterests.map((hobby, index) => (
            // TODO:
            // Tap Grid Box to expand to full screen?
            // Achieve this by adding a state to the component
            // and conditionally rendering a full single hobby box
            // with a close button.
            // Animate this.

            // TODO: Fix responsive design on bigger screens. This isnt
            // scaling properly.

            <div
              key={index}
              className="relative shadow-2xl h-28 w-28 rounded overflow-hidden"
            >
              <Image
                src={hobby.image}
                alt={hobby.title}
                layout="fill"
                objectFit="cover"
                quality={90}
                priority
              />
              <div className="absolute bg-black bg-opacity-10 inset-0" />

              <div className="absolute inset-0 flex justify-center items-center">
                <h3 className="text-white font-bold text-center">
                  {hobby.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default HobbiesAndInterests;
