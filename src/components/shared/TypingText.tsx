import React, { useState, useEffect } from "react";

interface TypingTextProps {
  phrases: string[];
  waitTime?: number;
}

const TypingText: React.FC<TypingTextProps> = ({ phrases, waitTime }) => {
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = phrases[loopIndex % phrases.length];

      if (!isDeleting) {
        // Typing
        setCurrentPhrase(fullText.substring(0, currentPhrase.length + 1));
        setTypingSpeed(100);
      } else {
        // Deleting
        setCurrentPhrase(fullText.substring(0, currentPhrase.length - 1));
        setTypingSpeed(50);
      }

      if (!isDeleting && currentPhrase === fullText) {
        setTimeout(() => setIsDeleting(true), waitTime ?? 1500);
      } else if (isDeleting && currentPhrase === "") {
        setIsDeleting(false);
        setLoopIndex((prev) => prev + 1);
      }
    };

    const typingTimeout = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(typingTimeout);
  }, [currentPhrase, isDeleting, loopIndex, phrases, waitTime, typingSpeed]);

  return (
    <span>
      {currentPhrase}
      <span className="font-light tracking-[-.05em] animate-cursor">|</span>
    </span>
  );
};

export default TypingText;
