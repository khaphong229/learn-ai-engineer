import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";
import { FlashCardGrid } from "@/components/ui/FlashCard";

// ---------------------------------------------------------------------------
// Flashcard table detection
// Matches tables with "Mặt trước" | "Mặt sau" header row and extracts card
// data, replacing them with <div data-flashcards="..."> markers that the
// custom div component renders as FlipCard grids.
// ---------------------------------------------------------------------------
const FLASHCARD_RE =
  /\| *Mặt trước *\| *Mặt sau *\|\n\|[-| :]+\|\n((?:\|[^|]+\|[^|]+\|\n?)+)/g;

function transformFlashcardTables(markdown: string): string {
  // Reset lastIndex (global regex carries state)
  FLASHCARD_RE.lastIndex = 0;

  return markdown.replace(FLASHCARD_RE, (_match, bodyBlock: string) => {
    const rows = bodyBlock.trim().split("\n");
    const cards: { front: string; back: string }[] = [];

    for (const row of rows) {
      // Split by pipe, drop leading/trailing empties
      const cols = row
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean);
      if (cols.length >= 2 && cols[0] && cols[1]) {
        cards.push({ front: cols[0], back: cols[1] });
      }
    }

    if (cards.length === 0) return _match; // safety: leave original if empty

    const encoded = JSON.stringify(cards).replace(/"/g, "&quot;");
    return `<div data-flashcards="${encoded}"></div>\n\n`;
  });
}

// ---------------------------------------------------------------------------
// Custom markdown components
// ---------------------------------------------------------------------------
const components: Components = {
  // Tables — render normally unless caught by flashcard transform above
  table: ({ children }) => (
    <div className="overflow-x-auto my-6 border border-hairline rounded">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-paper-panel">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-hairline px-4 py-3 text-left font-semibold text-xs uppercase tracking-wider text-muted">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-hairline px-4 py-3 align-top leading-relaxed">
      {children}
    </td>
  ),

  // div — intercept flashcard placeholder divs injected by the pre-processor
  div: ({ children, ...props }) => {
    const raw = (props as Record<string, unknown>)["data-flashcards"];
    if (typeof raw === "string") {
      try {
        const cards = JSON.parse(raw);
        if (Array.isArray(cards) && cards.length > 0) {
          return <FlashCardGrid cards={cards} />;
        }
      } catch {
        // fall through to default div
      }
    }
    return <div {...props}>{children}</div>;
  },

  // Code
  code: ({ className, children, ...props }) => {
    const isInline = !className;
    if (isInline) {
      return (
        <code
          className="bg-paper-panel px-1.5 py-0.5 rounded text-sm font-mono text-accent"
          {...props}
        >
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children }) => (
    <pre className="bg-paper-panel border border-hairline rounded p-4 my-6 overflow-x-auto text-sm font-mono leading-relaxed">
      {children}
    </pre>
  ),

  // Headings
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-12 mb-6 text-ink">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-xl font-semibold mt-10 mb-4 pb-2 border-b border-hairline text-ink">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-8 mb-3 text-ink">{children}</h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-base font-semibold mt-6 mb-2 text-ink">{children}</h4>
  ),

  // Text
  p: ({ children }) => (
    <p className="my-4 leading-relaxed">{children}</p>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent pl-4 my-6 italic text-muted">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-ink">{children}</strong>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-accent hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
    >
      {children}
    </a>
  ),

  // Lists
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-6 my-4 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-6 my-4 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">{children}</li>
  ),

  // Horizontal rule
  hr: () => <hr className="my-10 border-hairline" />,

  // Details/Summary (for quiz answers)
  details: ({ children }) => (
    <details className="my-4 border border-hairline rounded p-4 bg-paper-panel cursor-pointer">
      {children}
    </details>
  ),
  summary: ({ children }) => (
    <summary className="font-semibold text-accent select-none">{children}</summary>
  ),

  // Images
  img: ({ src, alt }) => (
    <img src={src} alt={alt} className="max-w-full rounded my-6" loading="lazy" />
  ),
};

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------
interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Replace flashcard tables with <div data-flashcards="..."> markers
  const processed = transformFlashcardTables(content);

  return (
    <article>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {processed}
      </ReactMarkdown>
    </article>
  );
}
