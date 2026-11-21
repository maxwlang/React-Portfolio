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
          alt=""
          aria-hidden="true"
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
      <div ref={scrollChevronContainer} className="relative z-10">
        <div className="text-center mt-6 animate-bounce text-white">
          <FontAwesomeIcon icon={faChevronDown} className="fa-2x" />
        </div>
      </div>

      <div className="relative z-10">
        <div id="about" className="max-w-2xl text-white">
          <h2 className="animated-content text-4xl md:text-5xl lg:text-6xl mr-20 font-bold">
            Hey there!
          </h2>
          <h3 className="animated-content text-gray-200 text-2xl md:text-3xl lg:text-4xl mt-1 md:mt-2 ml-2 font-light">
            &mdash; I&apos;m Max, a senior software engineer.
          </h3>
          <p className="px-2 animated-content text-justify text-lg md:text-xl lg:text-2xl mt-4">
            I build production systems in{" "}
            <span className="font-semibold">TypeScript</span> and{" "}
            <span className="font-semibold">Node.js</span>, with{" "}
            <span className="font-semibold">React</span> and{" "}
            <span className="font-semibold">Next.js</span> on the front end.
            I&apos;ve owned and contributed to{" "}
            <span className="font-semibold">175+ microservices</span> moving
            over a billion messages a year on{" "}
            <span className="font-semibold">Kafka</span> and{" "}
            <span className="font-semibold">Kubernetes</span>.
          </p>
          <p className="px-2 animated-content text-justify text-base md:text-lg lg:text-xl mt-4 text-gray-100">
            Self-taught, intern to senior engineer in under four years. I care
            about reliable software, clean APIs, and tools other engineers
            actually want to use &mdash; like the org-wide error-handling
            framework I built that ten teams adopted.
          </p>
          <p className="px-2 animated-content text-justify text-base md:text-lg lg:text-xl mt-3 text-gray-200">
            Based in Minneapolis, available remote. Outside work I&apos;m on a{" "}
            <span className="font-semibold">homelab</span>, behind a{" "}
            <span className="font-semibold">camera</span>, at a{" "}
            <span className="font-semibold">3D printer</span>, or on the road.
          </p>
          {/* <div ref={contentContainer} className="block" /> */}
        </div>
      </div>
    </Section>
  );
};

export default About;
