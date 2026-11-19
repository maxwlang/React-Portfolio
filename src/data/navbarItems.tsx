export interface NavPage {
  /**
   * Pathname this nav set applies to. Supports an exact path (`/blog`) or a
   * leading-prefix match flag for nested routes (e.g. `/blog/[slug]`).
   */
  path: string;
  /** When true, matches `pathname` and any nested route below `path`. */
  matchPrefix?: boolean;
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
  { id: "skills", label: "Skills", href: "#skills" },
  { id: "projects", label: "Projects", href: "#projects" },
  // { id: "certifications", label: "Certifications", href: "#certifications" },
  { id: "hobbies", label: "Hobbies & Interests", href: "#hobbies" },
  { id: "blog", label: "Blog", href: "/blog" },
];

const innerPageNavItems: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "projects-index", label: "Projects", href: "/projects" },
  { id: "blog-index", label: "Blog", href: "/blog" },
];

const navPages: NavPage[] = [
  {
    path: "/",
    items: homeNavItems,
  },
  {
    path: "/projects",
    matchPrefix: true,
    items: innerPageNavItems,
  },
  {
    path: "/blog",
    matchPrefix: true,
    items: innerPageNavItems,
  },
];

export default navPages;
