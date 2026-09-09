/** Medium RSS stores tags as slug-like categories (e.g. retrieval-evaluation). */

const TAG_ALIASES: Record<string, string> = {
  // Typo on one Medium post's category
  "agnetic-ai": "agentic-ai",
};

export function normalizeTag(raw: string): string {
  const normalized = raw
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .trim()
    .replace(/^#/, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return TAG_ALIASES[normalized] ?? normalized;
}

/** Display like Medium UI: "retrieval-evaluation" → "Retrieval Evaluation" */
export function formatMediumTagLabel(tag: string): string {
  const cleaned = tag.replace(/^#/, "").trim();
  if (!cleaned) return cleaned;

  return cleaned
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((word) => {
      if (word.toLowerCase() === "ai") return "Ai";
      if (word.toLowerCase() === "rag") return "Rag";
      if (word.toLowerCase() === "llm") return "Llm";
      if (word.toLowerCase() === "mlops") return "Mlops";
      if (word.toLowerCase() === "genai") return "Genai";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function collectUniqueTags(tagLists: string[][]): string[] {
  const tags = new Set<string>();
  tagLists.forEach((list) => {
    list.forEach((tag) => {
      const normalized = normalizeTag(tag);
      if (normalized) tags.add(normalized);
    });
  });
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}
