import type { NavItem } from "@/types/site";

export const homeNavItems: NavItem[] = [
  { label: "Home", href: "/", section: "home" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Experience", href: "/#experience", section: "experience" },
  { label: "Skills", href: "/#skills", section: "skills" },
  { label: "Projects", href: "/#projects", section: "projects" },
  { label: "Certificates", href: "/#certificates", section: "certificates" },
  { label: "Blogs", href: "/#blogs", section: "blogs" },
  { label: "Contact", href: "/#contact", section: "contact" },
];

export const pageNavItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/#contact" },
];
