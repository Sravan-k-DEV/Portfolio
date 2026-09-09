export type Certificate = {
  slug: string;
  title: string;
  issuer: string;
  year: string;
  href: string;
  summary: string;
};

export const certificatesSection = {
  eyebrow: "Credentials",
  heading: "Certifications",
  subheading: "Verified credentials that back the work.",
  viewCredentialLabel: "View Credential",
} as const;

export const certificates: Certificate[] = [
  {
    slug: "databricks-data-engineer-associate",
    title: "Databricks Certified Data Engineer Associate",
    issuer: "Databricks",
    year: "2025",
    href: "https://credentials.databricks.com/648f2cb0-dfee-4704-9403-cbb4f6e65fa4#acc.lbAKYTDg",
    summary:
      "Certification covering data engineering on the Databricks Lakehouse platform.",
  },
  {
    slug: "udacity-foundations-generative-ai",
    title: "Foundations of Generative AI",
    issuer: "Udacity",
    year: "2025",
    href: "https://www.udacity.com/certificate/e/f0335940-b7bc-11ef-a424-ffa290aa0ffc",
    summary:
      "Foundations program covering generative AI concepts, prompting, and applied workflows.",
  },
];
