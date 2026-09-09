export const skillsSection = {
  eyebrow: "The Toolkit",
  heading: "Skills",
  subheading: "What I reach for in production AI systems.",
} as const;

export const skillCategories = [
  {
    id: "languages",
    name: "Languages & Frameworks",
    shortName: "Languages",
    blurb: "What I write in day to day.",
    skills: ["Python", "SQL", "Bash", "FastAPI", "REST APIs"],
  },
  {
    id: "cloud",
    name: "Cloud Platforms",
    shortName: "Cloud",
    blurb: "Where systems run in production.",
    skills: [
      "Microsoft Azure",
      "Azure OpenAI",
      "Azure AI Services",
      "Azure Blob Storage",
      "AWS",
    ],
  },
  {
    id: "databases",
    name: "Databases",
    shortName: "Databases",
    blurb: "Where knowledge and state live.",
    skills: [
      "PostgreSQL",
      "PGVector",
      "MongoDB",
      "DynamoDB",
      "Pinecone",
      "FAISS",
      "ChromaDB",
    ],
  },
  {
    id: "ai",
    name: "AI & Automation",
    shortName: "AI & Automation",
    blurb: "How I design and ship agent systems.",
    skills: [
      "RAG",
      "Multi-Agentic RAG",
      "LLMs",
      "SLMs",
      "LangChain",
      "LangGraph",
      "LangSmith",
      "LangFuse",
      "Agno",
      "Crew AI",
      "Prompt Engineering",
      "Semantic Search",
      "Hybrid Search",
      "Hugging Face",
    ],
  },
  {
    id: "devops",
    name: "DevOps & Best Practices",
    shortName: "DevOps",
    blurb: "How work ships and stays reliable.",
    skills: [
      "Git",
      "GitHub Actions",
      "Docker",
      "CI/CD",
      "JWT Authentication",
      "High Availability Design",
      "Secure Coding",
      "Async Processing",
    ],
  },
] as const;

export const defaultSkillCategoryId = "ai" as const;

export type SkillCategoryId = (typeof skillCategories)[number]["id"];
