import React from "react";

export interface LinkButtonProps {
  text: string;
  href?: string;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  href,
  variant = "primary",
}) => {
  const baseStyles =
    "px-4 py-2 font-semibold text-sm rounded focus:outline-none focus:ring";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  };

  return (
    <a
      href={href}
      target="_blank"
      className={`${baseStyles} ${variants[variant]}`}
    >
      {text}
    </a>
  );
};

export default LinkButton;
