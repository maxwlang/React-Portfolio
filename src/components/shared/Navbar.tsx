"use client";
"use client";

import { usePathname } from "next/navigation";
import navPages from "@/data/navbarItems";
import { NavItem } from "@/data/navbarItems";
import {
  faBars,
  faExternalLinkAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const Navbar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeItem, setActiveItem] = useState<NavItem>();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const navItems =
    navPages.find((navPage) => navPage.path == pathname)?.items ?? [];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = navItems.find((item) => item.id === entry.target.id);
          if (item) setActiveItem(item);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavigationClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    if (item.href.startsWith("#") && !item.newTab) {
      e.preventDefault();
      const targetElement = document.querySelector(item.href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background shadow-md">
      {/* Progress Bar */}
      <div
        className="h-1 bg-slate-200 shadow-2xl"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Navbar Content */}
      <div className="flex items-center justify-between mx-auto p-4">
        <a href="https://maxwlang.com/" className="flex items-center space-x-3">
          <div
            className={`transition-transform hover:scale-105 rounded-xl p-2 transition-colors ${
              activeItem?.highlightLogo ? "bg-slate-500" : "bg-slate-700"
            }`}
          >
            <div className="rounded-md bg-slate-800 px-2 py-1">
              <p
                className="text-2xl font-extrabold tracking-[-.23em] text-transparent bg-clip-text bg-gradient-to-br from-slate-200 to-slate-500 animate-gradient"
                style={{ backgroundSize: "200% 200%" }}
              >
                ML
              </p>
            </div>
          </div>
        </a>

        {/* Mobile Hamburger Menu */}
        <button
          className={`sm:hidden text-slate-200 p-2 rounded font-bold transition-colors ${
            !activeItem?.highlightLogo && "bg-slate-700"
          }`}
          onClick={() => setMobileMenuOpen(true)}
        >
          <FontAwesomeIcon icon={faBars} className="fa-2x" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-4 text-lg">
          {navItems
            .filter((item) => !item.hidden)
            .map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavigationClick(e, item)}
                target={item.newTab ? "_blank" : undefined}
                className={`transition-colors hover:text-slate-400 ${
                  activeItem?.id === item.id
                    ? "text-slate-200 font-bold"
                    : "text-slate-500"
                }`}
              >
                {item.label}{" "}
                {!item.href.startsWith("#") && (
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="text-xs"
                  />
                )}
              </a>
            ))}
        </div>
      </div>

      {/* Full-Screen Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900 bg-opacity-95 flex flex-col items-center justify-center space-y-6">
          <button
            className="absolute top-4 right-4 text-slate-200 font-bold text-2xl"
            onClick={() => setMobileMenuOpen(false)}
          >
            <FontAwesomeIcon icon={faTimes} className="fa-2x" />
          </button>
          {navItems
            .filter((item) => !item.hidden)
            .map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavigationClick(e, item)}
                target={item.newTab ? "_blank" : undefined}
                className={`text-slate-200 text-xl hover:underline ${
                  activeItem?.id === item.id ? "font-bold underline" : ""
                }`}
              >
                {item.label}{" "}
                {!item.href.startsWith("#") && (
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                    className="text-xs"
                  />
                )}
              </a>
            ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
