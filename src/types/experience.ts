export type ExperienceKind = "work" | "education";

export type ExperienceHighlight = {
  value: string;
  detail: string;
};

export type ExperienceItem = {
  id: string;
  kind: ExperienceKind;
  dates: string;
  title: string;
  company: string;
  location: string | null;
  summary: string;
  highlights: ExperienceHighlight[];
  logo: string;
  live?: boolean;
};
