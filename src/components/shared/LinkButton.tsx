import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface LinkButtonProps {
  text: string;
  href?: string;
  variant?: "primary" | "secondary" | "danger";
  icon?: IconDefinition;
  iconPosition?: "left" | "right";
}

const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  href,
  variant = "primary",
  icon,
  iconPosition = "left",
}) => {
  const baseStyles =
    "inline-flex items-center px-4 py-2 font-semibold text-sm rounded focus:outline-none focus:ring transition-all";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]}`}
    >
      {icon && iconPosition === "left" && (
        <FontAwesomeIcon icon={icon} className="mr-2" />
      )}
      {text}
      {icon && iconPosition === "right" && (
        <FontAwesomeIcon icon={icon} className="ml-2" />
      )}
    </a>
  );
};

export default LinkButton;
