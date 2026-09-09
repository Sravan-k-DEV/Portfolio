import type { Project } from "@/types/project";

const IMG = {
  rag: "https://images.unsplash.com/photo-1760670399462-f5e479452c27?auto=format&fit=crop&w=1200&q=80",
  agents:
    "https://images.unsplash.com/photo-1681949215173-fe0d15c790c1?auto=format&fit=crop&w=1200&q=80",
  data: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
  docs: "https://images.unsplash.com/photo-1644088379091-d574269d422f?auto=format&fit=crop&w=1200&q=80",
  deck: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1200&q=80",
} as const;

export const agenticRagPlatform: Project = {
  slug: "agentic-rag-platform",
  title: "Enterprise Agentic RAG Platform",
  summary:
    "Enterprise-scale Agentic RAG platform processing 17K+ documents with LangChain, Azure OpenAI, PostgreSQL/PGVector, and multi-agent orchestration.",
  summaryShort:
    "Agentic RAG over 17K+ enterprise documents with multi-agent orchestration on Azure.",
  role: "AI Engineer",
  metric: "17K+ documents · 90% faster responses",
  tags: ["RAG", "LangChain", "Azure OpenAI", "PGVector"],
  category: "GenAI",
  featured: true,
  coverImage: IMG.rag,
  coverAlt: "Code and systems interface",
  order: 1,
  caseStudy: {
    badge: "GenAI - Agentic RAG",
    subtitle:
      "Production RAG for enterprise knowledge — ingestion, retrieval, evaluation, and multi-agent orchestration on Azure.",
    timeline: "Ongoing · Accellor",
    stackSummary: "Python, LangChain, Azure OpenAI, PGVector, FastAPI",
    toc: [
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Solution" },
      { id: "architecture", label: "Architecture" },
      { id: "contribution", label: "Contribution" },
      { id: "stack", label: "Stack" },
      { id: "results", label: "Results" },
      { id: "learnings", label: "Learnings" },
    ],
    sections: [
      {
        id: "problem",
        heading: "Problem",
        body: "Enterprise knowledge was scattered across SharePoint and related stores. Teams needed grounded answers at scale without sacrificing auditability or latency.",
      },
      {
        id: "solution",
        heading: "Solution",
        body: "I designed and deployed an Agentic RAG platform that ingests enterprise documents, embeds them into PostgreSQL/PGVector, and serves multi-agent retrieval workflows on Azure OpenAI with evaluation and caching.",
      },
      {
        id: "architecture",
        heading: "Architecture",
        body: "Ingestion jobs, vector store, retrieval/generation services, and evaluation run as independently deployable pieces on Azure Container Apps.",
      },
      {
        id: "contribution",
        heading: "My Contribution",
        body: "Owned platform design and delivery: multi-agent orchestration, ingestion with delta/retry processing, FastAPI microservices, CI/CD, private networking, and RAG evaluation that drove latency and relevance improvements.",
      },
      { id: "stack", heading: "Technology Stack" },
      {
        id: "results",
        heading: "Results / Impact",
        metrics: [
          { value: "17K+", label: "enterprise documents processed" },
          { value: "90%", label: "reduction in response time" },
          { value: "Azure", label: "private, VNET-secured deployment" },
        ],
      },
      {
        id: "learnings",
        heading: "Learnings",
        body: "Chunking strategy, caching, and evaluation metrics moved the needle more than swapping models. Grounding and observability kept the system trustworthy for enterprise use.",
      },
    ],
    architecture: {
      caption:
        "Document sources flow through ingestion jobs into PGVector, then retrieval and agent orchestration serve grounded answers.",
      steps: [
        "Enterprise Docs (SharePoint / Blob)",
        "Ingestion & Embedding Jobs",
        "PostgreSQL / PGVector",
        "Retrieval + Re-ranking",
        "Multi-Agent Orchestration",
        "Azure OpenAI Generation",
        "Evaluation & Caching Layer",
      ],
    },
    howItWorks: [
      "Documents are ingested on a schedule with delta and retry handling.",
      "Embeddings land in PostgreSQL/PGVector for hybrid retrieval.",
      "Agents coordinate retrieval and answer generation with grounding.",
      "Evaluation metrics and caching keep relevance high and latency low.",
    ],
    stack: [
      "Python",
      "LangChain",
      "Azure OpenAI",
      "PostgreSQL",
      "PGVector",
      "FastAPI",
      "Docker",
      "Azure Container Apps",
      "GitHub Actions",
    ],
  },
};

export const rfpMultiAgentPlatform: Project = {
  slug: "rfp-multi-agent-platform",
  title: "Multi-Agentic RFP Proposal Platform",
  summary:
    "Enterprise multi-agent platform that turns RFP documents into AI-generated proposal drafts with Service Bus orchestration and human-in-the-loop review.",
  summaryShort:
    "Multi-agent RFP-to-proposal drafts with HITL review and Service Bus jobs.",
  role: "AI Engineer",
  metric: "Faster proposal turnaround",
  tags: ["Multi-Agent", "FastAPI", "Azure", "HITL"],
  category: "GenAI",
  featured: true,
  coverImage: IMG.agents,
  coverAlt: "Team collaboration and workflow planning",
  order: 2,
  caseStudy: {
    badge: "GenAI - Multi-Agent",
    subtitle:
      "RFP documents in, grounded proposal drafts out — with expert review when requirements are ambiguous.",
    timeline: "Accellor",
    stackSummary: "FastAPI, Service Bus, Multi-Agent AI, Azure",
    toc: [
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Solution" },
      { id: "contribution", label: "Contribution" },
      { id: "stack", label: "Stack" },
      { id: "results", label: "Results" },
      { id: "learnings", label: "Learnings" },
    ],
    sections: [
      {
        id: "problem",
        heading: "Problem",
        body: "Responding to RFPs was slow and manual. Requirements had to be extracted, mapped to evidence, and drafted into proposals with compliance accuracy.",
      },
      {
        id: "solution",
        heading: "Solution",
        body: "A multi-agent platform orchestrates extraction, grounding, and draft generation on FastAPI with Azure Service Bus jobs, plus a human-in-the-loop path for ambiguous requirements.",
      },
      {
        id: "contribution",
        heading: "My Contribution",
        body: "Architected the multi-agent flow, job orchestration, Hybrid RAG grounding across SharePoint/Salesforce/internal sources, and the SME review workflow that resumes automation after clarification.",
      },
      { id: "stack", heading: "Technology Stack" },
      {
        id: "results",
        heading: "Results / Impact",
        metrics: [
          { value: "HITL", label: "expert review for ambiguous reqs" },
          { value: "Grounded", label: "evidence-backed compliance answers" },
          { value: "Faster", label: "proposal draft turnaround" },
        ],
      },
      {
        id: "learnings",
        heading: "Learnings",
        body: "Full automation is the wrong goal for high-stakes proposals. Routing ambiguity to humans and resuming the agent graph is what made the system usable.",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "Azure Service Bus",
      "LangChain",
      "Multi-Agent Orchestration",
      "SharePoint",
      "Salesforce",
    ],
  },
};

export const documentIngestionPipeline: Project = {
  slug: "document-ingestion-pipeline",
  title: "Document Ingestion & Embedding Pipeline",
  summary:
    "Automated ingestion from SharePoint, ADI, and Blob Storage with Container App Jobs for embedding generation and delta/retry processing.",
  role: "AI Engineer",
  metric: "Delta + retry resilient jobs",
  tags: ["Azure", "Data", "Embeddings", "Docker"],
  category: "Cloud",
  featured: false,
  coverImage: IMG.data,
  coverAlt: "Data center infrastructure",
  order: 3,
  caseStudy: {
    badge: "Cloud - Data Pipeline",
    subtitle:
      "Reliable document ingestion and embedding generation for enterprise RAG.",
    timeline: "Accellor",
    stackSummary: "Azure Container Apps, Blob Storage, SharePoint",
    toc: [
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Solution" },
      { id: "stack", label: "Stack" },
      { id: "learnings", label: "Learnings" },
    ],
    sections: [
      {
        id: "problem",
        heading: "Problem",
        body: "Enterprise corpora change constantly. Ingestion had to stay current without reprocessing everything, and failures needed safe retries.",
      },
      {
        id: "solution",
        heading: "Solution",
        body: "Scheduled Container App Jobs pull from SharePoint, ADI, and Blob Storage, generate embeddings, and apply delta/retry logic for resilient updates.",
      },
      { id: "stack", heading: "Technology Stack" },
      {
        id: "learnings",
        heading: "Learnings",
        body: "Delta detection and retry semantics matter as much as the embedding model when the corpus is large and continuously changing.",
      },
    ],
    stack: [
      "Azure Container Apps",
      "Azure Blob Storage",
      "SharePoint",
      "Python",
      "Docker",
      "GitHub Actions",
    ],
  },
};

export const hybridRagCompliance: Project = {
  slug: "hybrid-rag-compliance",
  title: "Hybrid RAG Compliance Knowledge Base",
  summary:
    "Hybrid RAG unifying SharePoint, Salesforce, and internal knowledge bases so every compliance answer is grounded in verified sources.",
  role: "AI Engineer",
  metric: "Audit-ready grounding",
  tags: ["Hybrid Search", "RAG", "Compliance"],
  category: "AI/ML",
  featured: false,
  coverImage: IMG.docs,
  coverAlt: "Abstract network knowledge graph",
  order: 4,
  caseStudy: {
    badge: "AI/ML - Hybrid RAG",
    subtitle:
      "Unified retrieval across enterprise systems with evidence-backed answers.",
    timeline: "Accellor",
    stackSummary: "Hybrid Search, SharePoint, Salesforce, Vector DB",
    toc: [
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Solution" },
      { id: "stack", label: "Stack" },
      { id: "learnings", label: "Learnings" },
    ],
    sections: [
      {
        id: "problem",
        heading: "Problem",
        body: "Compliance answers pulled from a single store missed critical context living in Salesforce and internal wikis.",
      },
      {
        id: "solution",
        heading: "Solution",
        body: "A Hybrid RAG pipeline retrieves and ranks evidence across SharePoint, Salesforce, and internal knowledge bases so responses stay grounded and auditable.",
      },
      { id: "stack", heading: "Technology Stack" },
      {
        id: "learnings",
        heading: "Learnings",
        body: "For compliance, citations and source evidence are the product. Hybrid retrieval beats a single vector index when systems of record differ.",
      },
    ],
    stack: [
      "Hybrid Search",
      "Semantic Search",
      "SharePoint",
      "Salesforce",
      "Vector Databases",
      "LangChain",
    ],
  },
};

export const deckPilot: Project = {
  slug: "deckpilot",
  title: "DeckPilot — AI-Powered Deck Generator",
  summary:
    "End-to-end pipeline that turns text or PDF into a branded PowerPoint deck using LLM structuring and dynamic slide design.",
  summaryShort:
    "Text/PDF to branded PowerPoint decks — 80% less manual effort.",
  role: "Personal Project",
  metric: "80% less manual deck effort",
  tags: ["LLMs", "Python", "Automation"],
  category: "GenAI",
  featured: false,
  coverImage: IMG.deck,
  coverAlt: "Writing desk and presentation materials",
  order: 5,
  caseStudy: {
    badge: "GenAI - Personal Project",
    subtitle:
      "From source document to branded slides in minutes instead of hours.",
    timeline: "2026",
    stackSummary: "LLMs, content structuring, PowerPoint generation",
    toc: [
      { id: "problem", label: "Problem" },
      { id: "solution", label: "Solution" },
      { id: "stack", label: "Stack" },
      { id: "results", label: "Results" },
      { id: "learnings", label: "Learnings" },
    ],
    sections: [
      {
        id: "problem",
        heading: "Problem",
        body: "Building presentation decks from long documents meant hours of summarization and manual formatting into a company template.",
      },
      {
        id: "solution",
        heading: "Solution",
        body: "DeckPilot accepts text or PDF, uses LLMs to structure narratives, and auto-populates a branded PowerPoint template with layout-aware slide generation.",
      },
      { id: "stack", heading: "Technology Stack" },
      {
        id: "results",
        heading: "Results / Impact",
        metrics: [
          { value: "80%", label: "less manual deck-creation effort" },
          { value: "Minutes", label: "instead of hours per deck" },
        ],
      },
      {
        id: "learnings",
        heading: "Learnings",
        body: "Template constraints and narrative structure matter more than raw generation quality. Slide-ready output needs layout rules, not just summaries.",
      },
    ],
    stack: ["Python", "LLMs", "Prompt Engineering", "PowerPoint Automation"],
  },
};
