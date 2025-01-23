import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface ScrollToBottomProps {
  children: React.ReactNode;
  scrollToTopText?: string;
  scrollToBottomText?: string;
  showIcons?: boolean;
}

const ScrollToBottom: React.FC<ScrollToBottomProps> = ({
  children,
  scrollToBottomText = "To Bottom",
  showIcons = true,
}) => {
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const contentElement = contentRef.current;

    if (!contentElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setShowButton(entry.isIntersecting));
      },
      { root: null, threshold: 0.1 }
    );

    observer.observe(contentElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const scrollToBottom = () => {
    const contentElement = contentRef.current;
    contentElement?.scrollIntoView({ behavior: "smooth", block: "end" });
  };

  // TODO: Implement scrollToTop when user has scrolled to the bottom but the button is still briefly visible
  // const scrollToTop = () => {
  //   const contentElement = contentRef.current;
  //   contentElement?.scrollIntoView({ behavior: "smooth", block: "start" });
  // };

  return (
    <div ref={contentRef} className="relative">
      {children}
      {showButton && (
        <button
          className="fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded shadow-md hover:bg-blue-600 focus:outline-none"
          onClick={scrollToBottom}
        >
          {showIcons && <FontAwesomeIcon icon={faArrowDown} className="mr-2" />}
          {scrollToBottomText}
        </button>
      )}
    </div>
  );
};

export default ScrollToBottom;
