export interface NavPage {
  path: string;
  items: NavItem[];
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  newTab?: boolean;
  highlightLogo?: boolean;
  hidden?: boolean;
}

const homeNavItems: NavItem[] = [
  {
    id: "hero",
    label: "Home",
    href: "#hero",
    highlightLogo: true,
    hidden: true,
  },
  { id: "about-section", label: "About", href: "#about" },
  // { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  // { id: "certifications", label: "Certifications", href: "#certifications" },
  { id: "hobbies", label: "Hobbies & Interests", href: "#hobbies" },
  // {
  //   id: "photoGallery",
  //   label: "Photo Gallery",
  //   href: "https://gallery.maxwlang.com",
  //   newTab: true,
  // },
];

const navPages: NavPage[] = [
  {
    path: "/", // Home
    items: homeNavItems,
  },
];

export default navPages;
