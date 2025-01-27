import React from "react";

interface SectionProps {
  id?: string;
  ref?: React.RefObject<HTMLDivElement | null>;
  className?: string; // Additional class names for customization
  children: React.ReactNode; // Content inside the section
}

const Section: React.FC<SectionProps> = ({ id, ref, className, children }) => {
  const baseClassNames =
    "bg-gradient-to-b from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 py-16 px-4 sm:px-8 lg:px-16";

  return (
    <section
      id={id}
      ref={ref}
      className={`${baseClassNames} ${className || ""}`}
    >
      {children}
    </section>
  );
};

export default Section;
