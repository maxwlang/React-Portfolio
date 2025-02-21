import Hero from "@/components/home/sections/Hero";
import About from "@/components/home/sections/About";
// import Skills from "@/components/home/sections/Skills";
import Projects from "@/components/home/sections/Projects";
// import Certifications from "@/components/home/sections/Certifications";
import Hobbies from "@/components/home/sections/HobbiesAndInterests";
import images from "@/images";

export default function Home() {
  return (
    <>
      <Hero id="hero" backgroundImage={images.photoSanFrancisco} />
      <About />
      {/* <Skills /> */}
      <Projects />
      {/* <Certifications /> */}
      <Hobbies />
    </>
  );
}
