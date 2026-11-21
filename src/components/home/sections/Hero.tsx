"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image, { StaticImageData } from "next/image";
import images from "@/images";
import TypingText from "@/components/shared/TypingText";
import phrases from "@/data/homeHeroPhrases";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faKey } from "@fortawesome/free-solid-svg-icons";
import PgpKeyModal from "@/components/home/PgpKeyModal";
import { pgpFingerprint } from "@/data/pgpKey";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  id?: string;
  backgroundImage: StaticImageData; // Image source for parallax effect
}

export const Hero: React.FC<HeroProps> = ({ id, backgroundImage }) => {
  const container = useRef<HTMLDivElement>(null);
  const parallaxBackground = useRef<HTMLDivElement>(null);
  const profilePictureContainer = useRef<HTMLDivElement>(null);
  const textContentContainer = useRef<HTMLDivElement>(null);
  const foregroundContainer = useRef<HTMLDivElement>(null);
  const scrollChevronContainer = useRef<HTMLDivElement>(null);
  const [pgpOpen, setPgpOpen] = useState(false);

  useGSAP(
    () => {
      // Move background image up by 10% slower than scroll
      gsap.to(parallaxBackground.current, {
        yPercent: -10,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // Resize picture
      timeline.fromTo(
        profilePictureContainer.current,
        {
          width: () => profilePictureContainer.current?.offsetWidth || 16,
          height: () => profilePictureContainer.current?.offsetHeight || 16,
        },
        {
          width: () => (profilePictureContainer.current?.offsetWidth || 8) / 2,
          height: () => profilePictureContainer.current?.offsetHeight || 16,
          duration: 0.5,
          ease: "power1.out",
        }
      );

      // Hide scroll chevron
      timeline.to(scrollChevronContainer.current, {
        duration: 1,
        opacity: 0,
        ease: "power1.out",
      });

      // Fade up and out content
      timeline.to(foregroundContainer.current, {
        opacity: 0,
        y: "-20%",
        duration: 1,
        ease: "power1.out",
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
      className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-white-100 dark:bg-slate-600"
    >
      {/* Background for Parallax Effect */}
      <div
        ref={parallaxBackground}
        className="absolute top-0 left-0 w-full h-[110%] pointer-events-none"
      >
        <Image
          src={backgroundImage}
          alt="Parallax Background"
          fill
          sizes="100vw"
          style={{ objectFit: "cover" }}
          quality={80}
          priority
        />
      </div>

      {/* Overlay for Background */}
      <div className="absolute inset-0 bg-black opacity-20 dark:opacity-50" />

      {/* Foreground Content */}
      <div ref={foregroundContainer} className="relative z-10">
        <div className="flex justify-center items-center flex-col">
          <div
            ref={profilePictureContainer}
            className="mb-6 relative h-48 w-48 md:h-64 md:w-64 rounded-full overflow-hidden"
          >
            <Image
              src={images.profile}
              alt="Maxwell Lang"
              fill
              sizes="(max-width: 768px) 192px, 256px"
              style={{ objectFit: "cover" }}
              quality={75}
              priority
            />
          </div>
          <div ref={textContentContainer} className="text-white">
            <h1 className="text-4xl md:mb-2 md:text-6xl font-bold text-center">
              Maxwell Lang
            </h1>
            <p className="text-center leading-tight font-light text-2xl md:text-4xl">
              <span className="block">
                <TypingText phrases={phrases} waitTime={2000} />
                for
              </span>
              <span className="block">
                {new Date().getFullYear() - 2018} years and counting.
              </span>
            </p>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setPgpOpen(true)}
                className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm backdrop-blur-md transition-all hover:border-emerald-300/70 hover:bg-emerald-400/10 hover:shadow-[0_0_20px_rgba(110,231,183,0.45)] focus:outline-none focus:ring focus:ring-emerald-300/50"
              >
                <FontAwesomeIcon
                  icon={faKey}
                  className="transition-transform duration-300 group-hover:-rotate-45 group-hover:text-emerald-300"
                />
                <span className="font-semibold">PGP Key</span>
                <span className="font-mono text-xs text-white/60 group-hover:text-emerald-200">
                  {pgpFingerprint.split(/\s+/).slice(-2).join(" ")}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollChevronContainer} className="relative z-10">
        <div className="text-center mt-6 animate-bounce text-white">
          <FontAwesomeIcon icon={faChevronDown} className="fa-2x" />
        </div>
      </div>

      <PgpKeyModal open={pgpOpen} onClose={() => setPgpOpen(false)} />
    </section>
  );
};

export default Hero;
