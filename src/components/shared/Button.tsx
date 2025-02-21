import React from "react";

export interface ButtonProps {
  text: string | React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger";
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  variant = "primary",
  type = "button",
  disabled = false,
  className,
}) => {
  const baseStyles = `inline-flex items-center px-4 py-2 font-semibold text-sm rounded focus:outline-none focus:ring transition-all ease-in-out duration-200 ${className}`;
  const variants = {
    primary:
      "bg-background text-foreground dark:text-white hover:bg-foreground hover:text-background focus:ring-blue-300",
    secondary:
      "border border-background dark:bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-300",
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
