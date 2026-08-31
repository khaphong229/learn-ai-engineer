---
phase: 1
title: Research & Architecture
status: completed
effort: ''
priority: P1
dependencies: []
---

# Phase 1: Research & Architecture

## Overview

Xác định chính xác tech stack, kiến trúc component, data flow, và thiết kế UI/UX
trước khi code. Phase này output ra bản thiết kế chi tiết để các phase sau thực thi.

## Requirements

- **Functional:** Xác định cách render 14 file markdown thành web page, navigation flow,
  progress tracking data model
- **Non-functional:** Performance (SSG), responsive design, dark/light mode, accessibility

## Kiến trúc dữ liệu

### Markdown → HTML Pipeline

```
File .md (day-01.md)
    ↓ [next.config.ts: webpack raw-loader hoặc fs read]
Raw markdown string
    ↓ [lib/markdown.ts: parseMarkdown()]
AST (mdast)
    ↓ [react-markdown + remark-gfm + rehype-pretty-code]
React Component Tree
    ↓ [MarkdownRenderer.tsx]
Rendered HTML
```

### Progress Data Model (localStorage)

```typescript
// Key: "study-plan-progress-v1"
interface StudyProgress {
  version: 1;
  days: Record<string, DayProgress>;  // "day-01" → DayProgress
  lastUpdated: string;                 // ISO date
}

interface DayProgress {
  completed: boolean;                  // Toàn bộ checklist done
  theoryRead: boolean;                 // Đã đọc phần lý thuyết
  practiceDone: boolean;               // Đã làm phần thực hành
  reviewDone: boolean;                 // Đã làm phần củng cố
  checklist: Record<string, boolean>;  // Từng checkbox item
  completedAt: string | null;          // ISO date khi hoàn thành
}
```

## Component Tree

```
RootLayout
├── ThemeProvider (dark/light)
│   ├── ProgressProvider (React Context)
│   │   ├── Landing Page (/)
│   │   │   ├── HeroSection
│   │   │   ├── ProgressOverview (tổng % + visual)
│   │   │   ├── DayGrid (14 cards)
│   │   │   └── StudyMethodSection
│   │   │
│   │   └── Day Page (/day/[slug])
│   │       ├── DayTimeline (sidebar, desktop)
│   │       ├── MobileNav (bottom, mobile)
│   │       ├── DayHeader (title, duration, stage, goals)
│   │       ├── MarkdownRenderer
│   │       │   ├── SectionCard (📖 Lý thuyết)
│   │       │   ├── SectionCard (💻 Thực hành)
│   │       │   └── SectionCard (📝 Củng cố)
│   │       ├── DayChecklist (interactive checkboxes)
│   │       ├── FlashCardDeck (flashcards nếu có)
│   │       └── PrevNextNav (day-01 ← → day-02)
```

## Route Design

| Route | Page | Method |
|-------|------|--------|
| `/` | Landing — tổng quan 14 ngày + progress | SSG |
| `/day/[slug]` | Nội dung từng ngày (day-01 → day-14) | `generateStaticParams` SSG |

## Design Tokens (Editorial Theme)

```css
:root {
  --paper: #faf7f2;
  --paper-panel: #f0ebe1;
  --ink: #0a0a0a;
  --muted: #6b6258;
  --accent: #b8232c;
  --hairline: #d4cfc6;
  --font-serif: 'Be Vietnam Pro', serif;
  --font-mono: 'JetBrains Mono', monospace;
  --font-body: 'Be Vietnam Pro', sans-serif;
}

[data-theme="dark"] {
  --paper: #1a1a18;
  --paper-panel: #252522;
  --ink: #e8e4dd;
  --muted: #9c9488;
  --accent: #d44a52;
  --hairline: #3a3834;
}
```

## Implementation Steps

1. Đọc toàn bộ 14 file day-*.md — catalog pattern, xác định edge cases (HTML trong MD, bảng lồng, details/summary)
2. Thiết kế component tree + props interface
3. Chọn thư viện: `react-markdown` vs `next-mdx-remote` — quyết định dựa trên độ phức tạp thực tế của file .md
4. Xác định data flow: build-time SSG vs runtime fetch
5. Thiết kế responsive breakpoints + navigation pattern
6. Output: architecture doc + component spec

## Success Criteria

- [ ] Toàn bộ 14 file .md đã được catalog (pattern, edge cases, HTML tags đặc biệt)
- [ ] Component tree + props interface đã thiết kế xong
- [ ] Data flow (SSG) đã xác định
- [ ] Design tokens + theme đã định nghĩa
- [ ] Thư viện markdown đã chọn và test thử với 1 file
- [ ] Responsive breakpoints + nav pattern đã xác định

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Markdown có HTML lồng (`<details>`, `<summary>`) | Dùng `rehype-raw` + test trước |
| File .md reference local path không hợp lệ trong project mới | Map lại link trong quá trình render |
| Design quá phức tạp, mất thời gian | Bám sát editorial tokens, không sáng tạo thêm |
