"use client";

import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { HobbyAndInterest } from "@/data/hobbiesAndInterests";

gsap.registerPlugin(ScrollTrigger);

interface HobbyGridProps {
  hobbies: HobbyAndInterest[];
}

const HobbyGrid: React.FC<HobbyGridProps> = ({ hobbies }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cards = gsap.utils.toArray(".hobby-grid-card");

    gsap.fromTo(
      cards,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container.current,
          start: "top 80%", // When the top of the container is 80% down the viewport
          end: "bottom top",
        },
      }
    );
  }, []);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };

  const handleBackClick = () => {
    setActiveIndex(null);
  };

  return (
    <div ref={container} className="w-full max-w-screen-sm mx-auto relative">
      <div className="grid grid-cols-3 gap-4">
        {hobbies.map((hobby, index) => (
          <HobbyGridCard
            key={index}
            index={index}
            hobby={hobby}
            activeIndex={activeIndex}
            onClick={() => handleItemClick(index)}
          />
        ))}
      </div>

      {activeIndex !== null && (
        <HobbyCard
          hobbies={hobbies}
          activeIndex={activeIndex}
          onClose={() => handleBackClick()}
        />
      )}
    </div>
  );
};

interface HobbyGridCardProps {
  index: number;
  hobby: HobbyAndInterest;
  activeIndex: number | null;
  onClick: () => void;
}

const HobbyGridCard: React.FC<HobbyGridCardProps> = ({
  index,
  hobby,
  activeIndex,
  onClick,
}) => {
  return (
    <motion.div
      key={index}
      layoutId={`card-${index}`}
      onClick={() => onClick()}
      className={`hobby-grid-card aspect-square relative shadow-2xl rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer ${
        activeIndex !== null && activeIndex !== index ? "opacity-50" : ""
      }`}
      initial={{ opacity: 1 }}
      animate={{
        opacity: activeIndex !== null && activeIndex !== index ? 0 : 1,
      }}
      transition={{ duration: 0.2 }}
      whileHover={{
        scale: 1.05,
      }}
    >
      <Image
        src={hobby.image}
        alt={hobby.title}
        layout="fill"
        objectFit="cover"
        quality={95}
        priority
      />

      <div className="absolute bg-black bg-opacity-10 dark:bg-opacity-20 inset-0" />

      <div className="absolute inset-0 flex justify-center items-center">
        <h3 className="text-white font-extrabold sm:text-2xl md:text-3xl text-center">
          {hobby.title}
        </h3>
      </div>
    </motion.div>
  );
};

interface HobbyCardProps {
  hobbies: HobbyAndInterest[];
  activeIndex: number;
  onClose: () => void;
}

const HobbyCard: React.FC<HobbyCardProps> = ({
  hobbies,
  activeIndex,
  onClose,
}) => {
  const hobby = hobbies[activeIndex];

  return (
    <motion.div
      layoutId={`card-${activeIndex}`}
      className="absolute inset-0 flex items-center justify-center"
      initial={{ zIndex: 1 }}
      animate={{ zIndex: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="aspect-square w-full bg-black rounded-3xl shadow-md relative overflow-hidden">
        <Image
          src={hobby.image}
          alt={hobby.title}
          layout="fill"
          objectFit="cover"
          quality={95}
          priority
        />

        <div className="absolute bg-black bg-opacity-10 dark:bg-opacity-20 inset-0" />

        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-6">
          <h3 className="text-white font-extrabold text-4xl sm:text-7xl mb-2">
            {hobby.title}
          </h3>
          <p className="text-white font-semibold text-lg sm:text-3xl">
            {hobby.description}
          </p>
        </div>
      </div>

      <button
        className="absolute top-4 right-4 bg-black px-2 py-1 rounded-xl hover:bg-white text-gray-100 hover:text-black transition-colors hover:scale-105 transition-transform"
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} className="fa-2x" />
      </button>
    </motion.div>
  );
};

export default HobbyGrid;
