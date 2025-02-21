"use client";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/shared/Section";
import { useGSAP } from "@gsap/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import images from "@/images";

const About: React.FC = () => {
  const animatedSection = useRef<HTMLDivElement>(null);
  const parallaxBackground = useRef<HTMLDivElement>(null);
  const scrollChevronContainer = useRef<HTMLDivElement>(null);
  // const contentContainer = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);
    const animatedContent = gsap.utils.toArray(".animated-content");

    // Move background image up by 10% slower than scroll
    gsap.to(parallaxBackground.current, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: animatedSection.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: animatedSection.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: true,
        // onEnter: () => {
        //   gsap.to(window, {
        //     duration: 1,
        //     scrollTo: { y: contentContainer.current, offsetY: -200 },
        //     ease: "power2.inOut",
        //   });
        // },
      },
    });

    timeline.fromTo(
      scrollChevronContainer.current,
      {
        position: "absolute",
        top: "5%",
        fontSize: "1.5rem",
      },
      {
        position: "absolute",
        top: "70%",
        fontSize: "1.25rem",
        duration: 1.5,
        ease: "power1.out",
      }
    );

    timeline.fromTo(
      animatedContent,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 1,
      }
    );
  }, []);

  return (
    <Section
      id="about-section" // Hack to allow jumping to content when it is visible, change is reflected in navbar config.
      ref={animatedSection}
      className="h-screen flex flex-col justify-center items-center relative overflow-hidden"
    >
      {/* Background for Parallax Effect */}
      <div
        ref={parallaxBackground}
        className="absolute top-0 left-0 w-full h-[115%] pointer-events-none"
      >
        <Image
          src={images.photoWharfWheel}
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
      <div ref={scrollChevronContainer} className="relative z-10">
        <div className="text-center mt-6 animate-bounce text-white">
          <FontAwesomeIcon icon={faChevronDown} className="fa-2x" />
        </div>
      </div>

      <div className="relative z-10">
        <div id="about" className="max-w-xl text-white">
          <h2 className="animated-content text-4xl md:text-5xl lg:text-6xl mr-20 font-bold">
            Hey There!
          </h2>
          <h3 className="animated-content text-gray-200 text-2xl md:text-3xl lg:text-4xl mt-1 md:mt-2 ml-2 font-light">
            &mdash; I&apos;m Max, nice to meet you!
          </h3>
          <p className="px-2 animated-content text-justify text-lg md:text-xl lg:text-2xl mt-4">
            I&apos;m an experienced software engineer that specializes in{" "}
            <span className="font-semibold">TypeScript</span>,{" "}
            <span className="font-semibold">React</span>, and{" "}
            <span className="font-semibold">RESTFul APIs</span>. I channel my
            creativity into <span className="font-semibold">photography</span>,{" "}
            <span className="font-semibold">cooking</span>, and{" "}
            <span className="font-semibold">music</span>, while indulging my
            curiosity through <span className="font-semibold">travel</span>,{" "}
            <span className="font-semibold">reverse engineering</span>,{" "}
            <span className="font-semibold">CAD &amp; 3D Printing</span>, and{" "}
            <span className="font-semibold">homelab projects</span>.
          </p>
          {/* <div ref={contentContainer} className="block" /> */}
        </div>
      </div>
    </Section>
  );
};

export default About;
