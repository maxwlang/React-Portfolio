import React from "react";

export interface TextPillProps {
  text: string;
}

const TextPill: React.FC<TextPillProps> = ({ text }) => {
  const baseStyles =
    "text-background border-background dark:bg-slate-900 dark:border-slate-800 border dark:text-foreground text-xs font-medium px-2 py-1 rounded-md";

  return <span className={`${baseStyles}`}>{text}</span>;
};

export default TextPill;
