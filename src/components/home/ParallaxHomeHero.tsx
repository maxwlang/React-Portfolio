"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import images from "@/images";
import TypingText from "../shared/TypingText";
import phrases from "@/data/parallaxHeroPhrases";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxHeroProps {
  id?: string;
  backgroundImage: StaticImageData; // Image source for parallax effect
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  id,
  backgroundImage,
}) => {
  const container = useRef<HTMLDivElement>(null);
  const parallaxBackground = useRef<HTMLDivElement>(null);
  const profilePictureContainer = useRef<HTMLDivElement>(null);
  const textContentContainer = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.to(parallaxBackground.current, {
        yPercent: -10, // Moves the background image up by 20% slower than scroll
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: "top",
        end: "bottom 60%",
        scrub: true,
        animation: gsap.fromTo(
          profilePictureContainer.current,
          {
            width: () => profilePictureContainer.current?.offsetWidth || 16,
            height: () => profilePictureContainer.current?.offsetHeight || 16,
          },
          {
            width: () =>
              (profilePictureContainer.current?.offsetWidth || 8) / 2,
            height: () => profilePictureContainer.current?.offsetHeight || 16,
            duration: 0.5,
            ease: "power1.out",
          }
        ),
      });

      ScrollTrigger.create({
        trigger: container.current,
        start: "top",
        end: "bottom 60%",
        scrub: true,
        animation: gsap.fromTo(
          textContentContainer.current,
          {
            opacity: 1,
          },
          {
            opacity: 0,
            y: "-20%",
            duration: 1,
            ease: "power1.out",
          }
        ),
      });
    },
    {
      scope: container,
      dependencies: [container],
    }
  );

  return (
    <section
      ref={container}
      id={id}
      className="relative h-screen flex justify-center items-center overflow-hidden bg-white-100 dark:bg-slate-600"
    >
      {/* Background for Parallax Effect */}
      <div
        ref={parallaxBackground}
        className="absolute top-0 left-0 w-full h-[110%] pointer-events-none"
      >
        <Image
          src={backgroundImage}
          alt="Parallax Background"
          layout="fill"
          objectFit="cover"
          quality={80}
          priority
        />
      </div>

      {/* Overlay for Background */}
      <div className="absolute inset-0 bg-black opacity-20 dark:opacity-50" />

      {/* Foreground Content */}
      <div className="relative z-10">
        <div className="flex justify-center items-center flex-col">
          <div
            ref={profilePictureContainer}
            className="mb-6 relative h-48 w-48 md:h-64 md:w-64 rounded-full overflow-hidden"
          >
            <Image
              src={images.profile}
              alt="Maxwell Lang"
              layout="fill"
              objectFit="cover"
              quality={75}
              priority
            />
          </div>
          <div ref={textContentContainer}>
            <h1 className="text-white text-4xl md:mb-2 md:text-6xl font-bold text-center">
              Maxwell Lang
            </h1>
            <p className="text-white text-center leading-tight font-light text-2xl md:text-4xl">
              <span className="block">
                <TypingText phrases={phrases} waitTime={2000} />
                for
              </span>
              <span className="block">
                {new Date().getFullYear() - 2018} years and counting.
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParallaxHero;
