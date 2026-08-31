---
title: Study Plan Learning Website - 2 Week Intensive
description: >-
  Website học tập riêng biệt hiển thị lộ trình 14 ngày AI Engineer dưới dạng web
  tương tác, thiết kế editorial đẹp chuẩn Claude.
status: completed
priority: P1
branch: main
tags:
  - frontend
  - nextjs
  - learning-platform
  - markdown
blockedBy: []
blocks: []
created: '2026-06-28T09:22:45.893Z'
createdBy: 'ck:plan'
source: skill
---

# Study Plan Learning Website — 2 Week Intensive

## Overview

Xây dựng một **website học tập độc lập** (separate frontend) hiển thị toàn bộ lộ trình
[study-plans/2-week-intensive/](../../study-plans/2-week-intensive/) gồm 14 ngày học
AI Application Engineer. Website render markdown thành giao diện web đẹp, có navigation
day-by-day, progress tracking qua localStorage, và thiết kế editorial chuẩn Claude.

**Không sửa code frontend/backend hiện có.** Đây là project FE độc lập, deploy riêng.

## Nguồn dữ liệu

| Nguồn | Mô tả | Path |
|-------|-------|------|
| **Study Plan Overview** | Bảng tổng quan 14 ngày + mục tiêu | `study-plans/2-week-intensive/plan.md` |
| **Day files (×14)** | Nội dung từng ngày: Lý thuyết → Thực hành → Củng cố | `study-plans/2-week-intensive/day-01.md` → `day-14.md` |
| **Docs (reference)** | Tài liệu chi tiết từng chủ đề | `docs/00-overview/` → `docs/06-advanced/` |
| **Existing FE (reference)** | Các component exercise có sẵn để link tới | `frontend/src/app/` |

## Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| **Framework** | Next.js 16 (App Router) | SSG-friendly, cùng hệ sinh thái với project hiện tại |
| **Styling** | Tailwind CSS 4 | Nhẹ, utility-first, dễ tạo editorial design |
| **Markdown** | `next-mdx-remote` hoặc `react-markdown` + `remark-gfm` | Render MDX/markdown với GFM table, checklist |
| **Syntax** | `rehype-pretty-code` + `shiki` | Code highlighting cho code blocks |
| **Font** | Be Vietnam Pro (Google Fonts) | Font tiếng Việt chất lượng cao |
| **State** | React Context + localStorage | Progress tracking không cần backend |
| **Deploy** | Vercel (recommended) hoặc Cloudflare Pages | Static export hoặc SSR |

## Kiến trúc thư mục

```
study-plan-site/                ← NEW: separate FE project
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── public/
│   └── favicon.ico
└── src/
    ├── app/
    │   ├── layout.tsx           ← Root layout: font, metadata, theme provider
    │   ├── page.tsx             ← Landing: 14-day overview, progress summary
    │   ├── globals.css          ← Tailwind + design tokens (editorial theme)
    │   └── day/
    │       └── [slug]/
    │           └── page.tsx     ← Dynamic route: /day/day-01 → day-14
    ├── components/
    │   ├── navigation/
    │   │   ├── DayTimeline.tsx       ← Sidebar timeline 14 ngày
    │   │   └── MobileNav.tsx         ← Mobile bottom nav
    │   ├── content/
    │   │   ├── MarkdownRenderer.tsx  ← Markdown → HTML với GFM
    │   │   ├── DayHeader.tsx         ← Tiêu đề + metadata từng ngày
    │   │   └── SectionCard.tsx       ← Card cho mỗi phần (Lý thuyết/Thực hành/Củng cố)
    │   ├── progress/
    │   │   ├── ProgressProvider.tsx  ← React Context cho progress
    │   │   ├── ProgressBar.tsx       ← Thanh tiến độ tổng
    │   │   └── DayChecklist.tsx      ← Checklist tương tác từng ngày
    │   └── ui/
    │       ├── FlashCard.tsx         ← Component flip flashcard
    │       ├── Callout.tsx           ← Tip/Warning/Info boxes
    │       └── ThemeToggle.tsx       ← Dark/Light mode
    ├── lib/
    │   ├── markdown.ts              ← parseMarkdown, extractFrontmatter
    │   ├── progress.ts              ← localStorage read/write helpers
    │   ├── study-data.ts            ← Static data: 14-day metadata map
    │   └── constants.ts             ← Design tokens, day metadata
    └── content/                     ← Symlink hoặc copy từ ../study-plans/
        └── 2-week-intensive/
            ├── plan.md
            ├── day-01.md
            ├── ...
            └── day-14.md
```

## Design Direction

Phong cách **editorial magazine** — ấm áp, tập trung vào nội dung, đọc thoải mái:

- **Màu nền:** Paper warm (`#faf7f2`) / Dark mode: ink (`#1a1a1a`)
- **Typography:** Be Vietnam Pro, serif headings, sans body
- **Accent:** Muted red (`#b8232c`) cho link + progress indicators
- **Layout:** Asymmetric grid, generous whitespace, timeline sidebar
- **Không:** gradients, drop shadows, rounded cards, emoji-only icons
- **Có:** Hairline dividers, rule lines, subtle paper texture CSS

## Phases

| Phase | Name | Status | Priority | Depends On |
|-------|------|--------|----------|------------|
| 1 | [Research & Architecture](./phase-01-research-architecture.md) | Pending | P1 | Completed |
| 2 | [Frontend Scaffold & Core Components](./phase-02-frontend-scaffold-core-components.md) | Pending | P1 | Completed |
| 3 | [Study Plan Pages & Content Rendering](./phase-03-study-plan-pages-content-rendering.md) | Pending | P1 | Completed |
| 4 | [Progress Tracking & Interactive Features](./phase-04-progress-tracking-interactive-features.md) | Pending | P2 | Completed |
| 5 | [Polish & Deploy](./phase-05-polish-deploy.md) | Pending | P2 | Completed |

## Acceptance Criteria

- [ ] 14 ngày học hiển thị đầy đủ, đúng format (Lý thuyết → Thực hành → Củng cố)
- [ ] Navigation day-by-day mượt (timeline sidebar + prev/next)
- [ ] Markdown render đúng: bảng, checklist, code blocks với syntax highlight, callout
- [ ] Checklist tương tác — check hoàn thành, lưu localStorage
- [ ] Progress bar tổng quan 0-100% trên landing page
- [ ] Responsive: desktop sidebar timeline → mobile bottom nav
- [ ] Dark/Light mode toggle
- [ ] Design editorial chuẩn — ấm, sạch, dễ đọc
- [ ] Deploy thành công lên Vercel

## Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Markdown parsing phức tạp (bảng lồng, HTML trong MD) | Medium | Dùng `remark-gfm` + `rehype-raw`, test từng day file |
| File .md cần symlink/copy vào project mới | Low | Dùng script copy lúc build, hoặc import raw từ path tuyệt đối |
| Performance với 14 trang dài | Low | SSG với `generateStaticParams`, mỗi trang build sẵn |
