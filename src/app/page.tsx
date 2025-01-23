import ParallaxHomeHero from "@/components/shared/ParallaxHomeHero";
import Projects from "@/components/sections/Projects";
import About from "@/components/sections/About";
import images from "@/images";
import Skills from "@/components/sections/Skills";
import Certifications from "@/components/sections/Certifications";
import Hobbies from "@/components/sections/HobbiesAndInterests";

export default function Home() {
  return (
    <>
      <ParallaxHomeHero id="hero" backgroundImage={images.photoSanFrancisco} />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Hobbies />
    </>
  );
}
