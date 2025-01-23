"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

interface HashScrollerProps {
  offsetY?: number;
  delay?: number;
}

const HashScroller: React.FC<HashScrollerProps> = ({
  offsetY = 0,
  delay = 0.5,
}) => {
  useEffect(() => {
    const handlePageLoad = () => {
      const urlHash = window.location.href.split("#")[1];
      if (urlHash) {
        const scrollElem = document.querySelector(`#${urlHash}`);
        if (scrollElem) {
          gsap.to(window, {
            scrollTo: { y: scrollElem, offsetY },
            duration: 1,
            delay,
          });
        }
      }
    };

    window.addEventListener("load", handlePageLoad);

    return () => {
      window.removeEventListener("load", handlePageLoad);
    };
  }, [offsetY, delay]);

  return null;
};

export default HashScroller;
