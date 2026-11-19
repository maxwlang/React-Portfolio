import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";

export interface LinkButtonProps {
  text: string;
  href?: string;
  variant?: "primary" | "secondary" | "danger";
  icon?: IconDefinition;
  iconPosition?: "left" | "right";
  /**
   * When true (default), renders an `<a target="_blank">` for off-site links.
   * When false, renders a Next.js `<Link>` for in-app navigation that
   * preserves client-side routing and SEO-friendly anchor markup.
   */
  external?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  text,
  href,
  variant = "primary",
  icon,
  iconPosition = "left",
  external = true,
}) => {
  const baseStyles =
    "inline-flex items-center px-4 py-2 font-semibold text-sm rounded focus:outline-none focus:ring transition-all ease-in-out duration-200";
  const variants = {
    primary:
      "bg-background text-foreground dark:text-white hover:bg-foreground hover:text-background focus:ring-blue-300",
    secondary:
      "border border-background dark:bg-gray-200 text-black hover:bg-gray-300 focus:ring-gray-300",
    danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-300",
  };

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <FontAwesomeIcon icon={icon} className="mr-2" />
      )}
      {text}
      {icon && iconPosition === "right" && (
        <FontAwesomeIcon icon={icon} className="ml-2" />
      )}
    </>
  );

  const className = `${baseStyles} ${variants[variant]}`;

  if (!external && href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  );
};

export default LinkButton;
