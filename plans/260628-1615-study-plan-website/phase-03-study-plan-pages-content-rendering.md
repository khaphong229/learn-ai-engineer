---
phase: 3
title: Study Plan Pages & Content Rendering
status: completed
effort: ''
priority: P1
dependencies:
  - 2
---

# Phase 3: Study Plan Pages & Content Rendering

## Overview

Xây dựng landing page và 14 trang day/[slug] hiển thị nội dung markdown.
Đây là phase cốt lõi — toàn bộ nội dung học tập được render từ file .md
thành HTML với định dạng đẹp, dễ đọc.

## Requirements

- **Functional:** Landing page hiển thị tổng quan 14 ngày. Mỗi day page render
  đầy đủ: header, nội dung markdown (bảng, code, checklist, callout, details/summary),
  và prev/next navigation.
- **Non-functional:** SSG cho tất cả 14 trang, build time < 30s, page load < 2s

## Implementation Steps

### Step 1: Markdown Parser

File: `src/lib/markdown.ts`

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface DayFrontmatter {
  title: string;
  duration: string;
  stage: string;
  goals: string;
}

export function getDayContent(slug: string): {
  frontmatter: DayFrontmatter;
  content: string;
} {
  const filePath = path.join(
    process.cwd(),
    'src/content/2-week-intensive',
    `${slug}.md`
  );
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  return { frontmatter: data as DayFrontmatter, content };
}

export function getAllDaySlugs(): string[] {
  const dir = path.join(process.cwd(), 'src/content/2-week-intensive');
  return fs.readdirSync(dir)
    .filter(f => f.startsWith('day-') && f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
    .sort();
}
```

> **Note:** Nếu file .md không có YAML frontmatter (như hiện tại), dùng regex
> để extract metadata từ heading đầu tiên (`# Ngày X: ...`).

### Step 2: MarkdownRenderer Component

File: `src/components/content/MarkdownRenderer.tsx`

```tsx
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypePrettyCode from 'rehype-pretty-code';
import { Callout } from '@/components/ui/Callout';
import { SectionCard } from '@/components/content/SectionCard';

// Custom components map — override default HTML elements
const components = {
  // Override <table> để thêm responsive wrapper
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  // Style cho td/th
  th: ({ children }) => (
    <th className="border border-hairline px-4 py-2 text-left font-semibold bg-paper-panel">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-hairline px-4 py-2">{children}</td>
  ),
  // Override code blocks
  code: ({ className, children, ...props }) => {
    // Inline code vs code block
    const isInline = !className;
    return isInline
      ? <code className="bg-paper-panel px-1.5 py-0.5 rounded text-sm font-mono" {...props}>{children}</code>
      : <code className={className} {...props}>{children}</code>;
  },
  // Checkbox lists → interactive (nếu trong checklist section)
  input: ({ type, checked, ...props }) => {
    if (type === 'checkbox') {
      return <input type="checkbox" checked={checked} readOnly className="mr-2" {...props} />;
    }
    return <input type={type} {...props} />;
  },
};

export function MarkdownRenderer({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, [rehypePrettyCode, { theme: 'github-light' }]]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}
```

### Step 3: DayHeader Component

File: `src/components/content/DayHeader.tsx`

```tsx
export function DayHeader({ meta }: { meta: DayMeta }) {
  return (
    <header className="mb-12">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-5xl font-bold text-accent font-serif">
          {String(meta.dayNumber).padStart(2, '0')}
        </span>
        <div>
          <p className="text-muted text-sm uppercase tracking-widest">
            Ngày {meta.dayNumber} · {meta.duration}
          </p>
          <h1 className="text-3xl font-semibold text-ink mt-1">
            {meta.title}
          </h1>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <Badge>{meta.stage}</Badge>
        {meta.topics.map(t => <Badge key={t} variant="outline">{t}</Badge>)}
      </div>
      <hr className="mt-8 border-hairline" />
    </header>
  );
}
```

### Step 4: Landing Page

File: `src/app/page.tsx`

```tsx
import { DAYS, TOTAL_DAYS } from '@/lib/study-data';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-20">
        <p className="text-muted text-sm uppercase tracking-widest">AI Application Engineer</p>
        <h1 className="text-5xl font-bold mt-2 mb-6 leading-tight">
          Lộ trình 2 tuần<br />
          <span className="text-accent italic">cấp tốc</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl">
          14 ngày · 1-2 giờ/ngày · 6 giai đoạn · Từ nền tảng đến production
        </p>
      </section>

      {/* Progress Overview */}
      <ProgressOverview />

      {/* Day Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-8">14 Ngày Học</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DAYS.map(day => (
            <Link key={day.slug} href={`/day/${day.slug}`}>
              <DayCard day={day} />
            </Link>
          ))}
        </div>
      </section>

      {/* Study Method */}
      <StudyMethodSection />
    </main>
  );
}
```

### Step 5: Day Dynamic Route

File: `src/app/day/[slug]/page.tsx`

```typescript
export async function generateStaticParams() {
  return DAYS.map(day => ({ slug: day.slug }));
}

export default async function DayPage({ params }: { params: { slug: string } }) {
  const { content } = getDayContent(params.slug);
  const meta = DAYS.find(d => d.slug === params.slug)!;
  const currentIndex = DAYS.findIndex(d => d.slug === params.slug);
  const prev = currentIndex > 0 ? DAYS[currentIndex - 1] : null;
  const next = currentIndex < TOTAL_DAYS - 1 ? DAYS[currentIndex + 1] : null;

  return (
    <div className="flex">
      <DayTimeline days={DAYS} current={params.slug} />
      <main className="flex-1 max-w-3xl mx-auto px-6 py-12">
        <DayHeader meta={meta} />
        <MarkdownRenderer content={content} />
        <DayChecklist slug={params.slug} />
        <PrevNextNav prev={prev} next={next} />
      </main>
    </div>
  );
}
```

### Step 6: DayCard Component

File: `src/components/content/DayCard.tsx`

Card cho landing page grid — hiển thị: số ngày, tiêu đề, stage, duration, trạng thái (completed/in-progress/pending), mini progress indicator.

## Related Code Files

- **Create:** `src/app/page.tsx`, `src/app/day/[slug]/page.tsx`, `src/components/content/MarkdownRenderer.tsx`, `src/components/content/DayHeader.tsx`, `src/components/content/DayCard.tsx`, `src/lib/markdown.ts`, `src/lib/study-data.ts`
- **Copy:** `src/content/2-week-intensive/` (14 files .md)

## Success Criteria

- [ ] Landing page hiển thị đúng 14 cards + progress overview
- [ ] `/day/day-01` → `/day/day-14` render đầy đủ nội dung markdown
- [ ] Bảng render đẹp (responsive, scroll ngang trên mobile)
- [ ] Code blocks có syntax highlighting
- [ ] Checkbox lists render đúng (read-only trong markdown)
- [ ] `<details>/<summary>` hoạt động (collapsible sections)
- [ ] Prev/Next nav điều hướng đúng trình tự
- [ ] `generateStaticParams` build thành công, không lỗi
- [ ] Page load < 2s (kiểm tra Lighthouse)

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| File .md không có YAML frontmatter → metadata missing | Extract từ heading regex: `/# 📅 Ngày (\d+): (.+)/` |
| `rehype-raw` có thể gây XSS nếu HTML không an toàn | Markdown source là local file trusted, không cần sanitize |
| Một số file .md có syntax đặc biệt (diagram ASCII, emoji) | Test từng file, điều chỉnh plugin nếu cần |
