import ParallaxHomeHero from "@/components/home/ParallaxHomeHero";
import Projects from "@/components/home/sections/Projects";
import About from "@/components/home/sections/About";
import images from "@/images";
import Skills from "@/components/home/sections/Skills";
import Certifications from "@/components/home/sections/Certifications";
import Hobbies from "@/components/home/sections/HobbiesAndInterests";

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
