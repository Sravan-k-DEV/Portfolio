import type { ExperienceItem } from "@/types/experience";

export const experienceSection = {
  eyebrow: "The Journey",
  heading: "Experience",
  subheading: "The work I am in now, and the path that led here.",
} as const;

export const experience: ExperienceItem[] = [
  {
    id: "accellor",
    kind: "work",
    live: true,
    logo: "/images/logos/accellor.svg",
    dates: "Jul 2024 – Present",
    title: "AI/ML Engineer",
    company: "Accellor Software Pvt. Ltd.",
    location: "Hyderabad",
    summary:
      "Build and ship production AI for enterprise clients — search, document work, and systems people can actually trust.",
    highlights: [
      {
        value: "17K+",
        detail:
          "Enterprise documents searchable with grounded answers, so teams stop digging through files by hand.",
      },
      {
        value: "90%",
        detail:
          "Faster RAG responses from better retrieval and caching — less wait for users, lower cost for the business.",
      },
    ],
  },
  {
    id: "sastra",
    kind: "education",
    logo: "/images/logos/sastra.svg",
    dates: "2019 – 2023",
    title: "B.Tech, Mechatronics Engineering",
    company: "Sastra University",
    location: "Thanjavur",
    summary:
      "Four years of machines, control systems, and learning how a whole system fits together. That way of thinking still shows up in the AI I ship.",
    highlights: [
      {
        value: "7.9",
        detail: "CGPA across the degree, 2019 to 2023.",
      },
    ],
  },
];
