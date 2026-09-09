import type { ExperienceItem } from "@/types/experience";

export const experienceSection = {
  eyebrow: "The Journey",
  heading: "Experience",
  subheading: "Enterprise AI work measured by outcomes, not tooling.",
} as const;

export const experience: ExperienceItem[] = [
  {
    dates: "Jul 2024 – Present",
    title: "AI/ML Engineer",
    company: "Accellor Software Pvt. Ltd.",
    location: "Hyderabad",
    summary:
      "Build and ship AI systems for enterprise clients — helping teams find answers faster, automate heavy document work, and keep outputs grounded and reviewable.",
    bullets: [
      "Shipped an enterprise AI search and Q&A platform across 17K+ business documents, so teams can find reliable answers without digging through files by hand",
      "Cut AI response time by over 90% through better retrieval design and caching — faster answers for users, lower wait cost for the business",
      "Automated RFP-to-proposal drafting with multi-agent AI, turning long document review into structured first drafts instead of blank-page effort",
      "Added human review for uncertain cases, so experts stay in control where the AI should not decide alone",
      "Delivered these systems on Azure for production use — secure, reliable, and ready for real client workloads",
    ],
  },
];
