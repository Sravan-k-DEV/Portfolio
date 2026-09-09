export type SiteConfig = {
  name: string;
  shortName: string;
  title: string;
  description: string;
  url: string;
  email: string;
  locale: string;
  resumePath: string;
};

export type SocialLink = {
  label: string;
  href: string;
  handle?: string;
};

export type NavItem = {
  label: string;
  href: string;
  section?: string;
};
