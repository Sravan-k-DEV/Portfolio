import type { SocialLink } from "@/types/site";
import { siteConfig } from "@/config/site";

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Sravan-k-DEV",
    handle: "/Sravan-k-DEV",
  },
  {
    label: "Medium",
    href: "https://medium.com/@sravankumaryadav",
    handle: "M",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sravan-kumar-yadav/",
    handle: "/in/sravan-kumar-yadav",
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    handle: siteConfig.email,
  },
];

export const mediumProfileUrl = "https://medium.com/@sravankumaryadav";
