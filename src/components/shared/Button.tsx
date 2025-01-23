import React from "react";

export interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
}) => {
  const baseStyles =
    "px-4 py-2 font-semibold text-sm rounded focus:outline-none focus:ring";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300",
    secondary: "bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
