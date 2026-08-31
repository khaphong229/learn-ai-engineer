export interface DayMeta {
  slug: string;
  dayNumber: number;
  title: string;
  stage: string;
  duration: string;
  topics: string[];
}

export const DAYS: DayMeta[] = [
  {
    slug: "day-01",
    dayNumber: 1,
    title: "Tổng Quan + Context/Token/Hallucination",
    stage: "Nền tảng",
    duration: "1.5h",
    topics: ["Context Window", "Token", "Hallucination"],
  },
  {
    slug: "day-02",
    dayNumber: 2,
    title: "Prompt Engineering + Temperature",
    stage: "LLM Fundamentals",
    duration: "1.5h",
    topics: ["Prompt Engineering", "Temperature", "System Prompt"],
  },
  {
    slug: "day-03",
    dayNumber: 3,
    title: "Structured Output + Streaming",
    stage: "LLM Fundamentals",
    duration: "2h",
    topics: ["JSON Mode", "Function Calling", "SSE", "Structured Output"],
  },
  {
    slug: "day-04",
    dayNumber: 4,
    title: "Model Selection + Ôn tập GĐ1",
    stage: "LLM Fundamentals",
    duration: "1.5h",
    topics: ["Model Comparison", "Model Router", "Benchmarks"],
  },
  {
    slug: "day-05",
    dayNumber: 5,
    title: "Embeddings + Vector Database",
    stage: "RAG",
    duration: "2h",
    topics: ["Embeddings", "Vector DB", "Semantic Search", "Cosine Similarity"],
  },
  {
    slug: "day-06",
    dayNumber: 6,
    title: "Chunking Strategy + Pipeline + Knowledge Graph",
    stage: "RAG",
    duration: "2h",
    topics: ["Chunking", "RAG Pipeline", "Knowledge Graph", "Overlap"],
  },
  {
    slug: "day-07",
    dayNumber: 7,
    title: "Memory Management + Chains & Routing",
    stage: "Orchestration",
    duration: "2h",
    topics: ["Memory", "Sliding Window", "Summarization", "Chains", "Router"],
  },
  {
    slug: "day-08",
    dayNumber: 8,
    title: "Function Calling + ReAct Pattern",
    stage: "Agents",
    duration: "2h",
    topics: ["Function Calling", "ReAct", "Tool Use", "Agent Loop"],
  },
  {
    slug: "day-09",
    dayNumber: 9,
    title: "MCP + Ôn tập GĐ2-3-4",
    stage: "Agents",
    duration: "1.5h",
    topics: ["MCP", "Protocol", "USB-C Analogy", "Review"],
  },
  {
    slug: "day-10",
    dayNumber: 10,
    title: "Evaluation + Observability",
    stage: "Production",
    duration: "2h",
    topics: ["Golden Dataset", "Eval Metrics", "Observability", "Tracing"],
  },
  {
    slug: "day-11",
    dayNumber: 11,
    title: "Cost Optimization + Security",
    stage: "Production",
    duration: "2h",
    topics: ["Semantic Caching", "Model Routing", "Prompt Injection", "PII"],
  },
  {
    slug: "day-12",
    dayNumber: 12,
    title: "Error Handling + Retry + Circuit Breaker",
    stage: "Production",
    duration: "1.5h",
    topics: ["Retry", "Circuit Breaker", "Fallback", "Graceful Degradation"],
  },
  {
    slug: "day-13",
    dayNumber: 13,
    title: "Multi-modal + Fine-tuning + Local Models",
    stage: "Advanced",
    duration: "2h",
    topics: ["Multimodal", "Vision", "Fine-tuning", "Ollama", "Local LLM"],
  },
  {
    slug: "day-14",
    dayNumber: 14,
    title: "Tổng ôn + Project Planning + Final Quiz",
    stage: "Tổng kết",
    duration: "2h",
    topics: ["Review", "Final Quiz", "Knowledge Map", "Project Planning"],
  },
];

export const TOTAL_DAYS = DAYS.length;

/** Get day stage badge color class */
export function getStageColor(stage: string): string {
  const map: Record<string, string> = {
    "Nền tảng": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    "LLM Fundamentals": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300",
    "RAG": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    "Orchestration": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
    "Agents": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    "Production": "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
    "Advanced": "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
    "Tổng kết": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  };
  return map[stage] ?? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
}

/** Default checklist items for each day (extracted from markdown) */
export const DAY_CHECKLISTS: Record<string, string[]> = {
  "day-01": [
    "Đọc xong \"12 từ khóa AI\" và vẽ mindmap",
    "Hiểu 5 thành phần kiến trúc AI app",
    "Hiểu Context Window, Token, Max Output Token",
    "Hiểu Hallucination và 4 cách phòng tránh",
    "Chạy thành công FE + BE",
    "Duyệt qua giao diện và chọn sơ bộ Project Idea",
    "Hoàn thành 10 flashcards",
  ],
  "day-02": [
    "Hiểu 4 kỹ thuật Prompt Engineering",
    "Hiểu Temperature và cách chọn giá trị",
    "Hiểu System Prompt và vai trò của nó",
    "Viết được prompt có system + few-shot examples",
  ],
  "day-03": [
    "Hiểu Structured Output (JSON Mode vs Function Calling)",
    "Hiểu Streaming (SSE) và cách implement",
    "Chạy demo Structured Output + Streaming trên FE",
  ],
  "day-04": [
    "Hiểu cách so sánh và chọn model",
    "Hiểu Model Router pattern",
    "Hoàn thành bài tập chọn model cho 3 scenarios",
  ],
  "day-05": [
    "Hiểu Embeddings và cách tạo vector",
    "Hiểu Vector Database và semantic search",
    "Chạy demo Embeddings + Vector Search trên FE",
  ],
  "day-06": [
    "Hiểu Chunking Strategy (size, overlap)",
    "Hiểu RAG Pipeline hoàn chỉnh",
    "Hiểu Knowledge Graph và khác biệt với RAG",
  ],
  "day-07": [
    "Hiểu tại sao LLM cần Memory (stateless)",
    "Hiểu 3 memory strategies: Sliding Window, Summarization, Token-based",
    "Hiểu Chain pattern và Router pattern",
    "Chạy demo Memory + Chains trên FE",
    "Vẽ diagram Orchestration flow",
  ],
  "day-08": [
    "Hiểu Function Calling flow",
    "Hiểu ReAct Pattern (Reason → Act → Observe)",
    "Chạy demo Function Calling + ReAct trên FE",
  ],
  "day-09": [
    "Hiểu MCP và protocol chuẩn hóa",
    "Hiểu tại sao MCP được ví như USB-C",
    "Ôn tập Giai đoạn 2-3-4",
  ],
  "day-10": [
    "Hiểu Golden Dataset và evaluation metrics",
    "Hiểu Observability: prompt, context, tools, cost, latency",
    "Chạy demo Evaluation trên FE",
  ],
  "day-11": [
    "Hiểu 6 kỹ thuật giảm chi phí LLM",
    "Hiểu Prompt Injection và cách phòng chống",
    "Hiểu PII Detection và Content Moderation",
  ],
  "day-12": [
    "Hiểu Retry pattern với exponential backoff",
    "Hiểu Circuit Breaker (CLOSED → OPEN → HALF_OPEN)",
    "Hiểu Fallback và Graceful Degradation",
  ],
  "day-13": [
    "Hiểu 3 loại multi-modal input/output",
    "Hiểu khi nào nên fine-tune",
    "Hiểu ưu điểm của local models",
  ],
  "day-14": [
    "Đọc lại overview + 12 keywords",
    "Vẽ Knowledge Map hoàn chỉnh 6 giai đoạn",
    "Chọn Project Idea và mapping kiến thức",
    "Hoàn thành Final Quiz ≥ 80% (≥20/24)",
    "Ghi ra Next Steps cá nhân",
  ],
};
