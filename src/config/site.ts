import type { SiteConfig } from "@/types/site";

export const siteConfig: SiteConfig = {
  name: "Sravan Kumar Yadav Gangi",
  shortName: "Sravan Kumar",
  title: "AI/ML Engineer",
  description:
    "AI Engineer designing and deploying production-grade RAG systems, multi-agent platforms, and Azure-based AI infrastructure.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "gangisravankumaryadav02@gmail.com",
  locale: "en_US",
  resumePath: "/resume/resume.pdf",
};

export const heroContent = {
  eyebrow: "Production AI Systems",
  headline: "I build AI systems that hold up in production.",
  body: "I'm Sravan Kumar Yadav, an AI/ML engineer. I build systems that work in production for real users, with clear thinking, solid engineering, and results that matter. Outside day-to-day delivery, I write about what I learn while building and evaluating these systems.",
  primaryCta: { label: "View Projects", href: "/#projects" },
  secondaryCta: { label: "Download Resume", href: siteConfig.resumePath },
  stats: [
    { value: "17K+", label: "Enterprise Documents Processed" },
    { value: "90%", label: "Faster RAG Response Time" },
    { value: "80%", label: "Less Manual Deck Effort" },
  ],
  portrait: {
    src: "/images/profile/profile_photo.jpg",
    alt: "Sravan Kumar Yadav Gangi",
  },
} as const;
