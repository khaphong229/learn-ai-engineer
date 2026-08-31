---
phase: 2
title: Frontend Scaffold & Core Components
status: completed
effort: ''
priority: P1
dependencies:
  - 1
---

# Phase 2: Frontend Scaffold & Core Components

## Overview

Khởi tạo project Next.js mới, cấu hình Tailwind, tạo layout gốc và các component
UI dùng chung. Kết thúc phase này, website có layout hoàn chỉnh với navigation
và các component cơ bản — sẵn sàng để render content.

## Requirements

- **Functional:** Next.js project chạy được, layout responsive, navigation hoạt động
- **Non-functional:** Font loading tối ưu, dark/light mode mượt, không flash

## Implementation Steps

### Step 1: Khởi tạo project

```bash
cd e:/Workspace/Project/learn-ai-engineer
npx create-next-app@latest study-plan-site --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --no-turbopack
cd study-plan-site
npm install react-markdown remark-gfm rehype-raw rehype-pretty-code rehype-slug
```

### Step 2: Cấu hình Tailwind + Design Tokens

File: `src/app/globals.css`

- Khai báo CSS custom properties cho editorial theme (light + dark)
- Cấu hình `tailwind.config.ts` extend colors từ design tokens
- Thêm font Be Vietnam Pro qua `next/font/google`
- CSS paper texture (subtle `background-image` noise)

### Step 3: Root Layout

File: `src/app/layout.tsx`

```tsx
import { Be_Vietnam_Pro } from 'next/font/google';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { ProgressProvider } from '@/components/progress/ProgressProvider';

const beVietnamPro = Be_Vietnam_Pro({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['vietnamese', 'latin'],
  variable: '--font-be-vietnam',
});

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${beVietnamPro.variable} font-sans bg-paper text-ink`}>
        <ThemeProvider>
          <ProgressProvider>
            {children}
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Step 4: Core UI Components

Tạo các component dùng chung:

| Component | File | Chức năng |
|-----------|------|-----------|
| **ThemeProvider** | `src/components/ui/ThemeProvider.tsx` | Dark/light mode toggle, lưu preference localStorage |
| **ThemeToggle** | `src/components/ui/ThemeToggle.tsx` | Nút toggle (sun/moon icon) |
| **Callout** | `src/components/ui/Callout.tsx` | Box tip/warning/info với icon + màu tương ứng |
| **SectionCard** | `src/components/content/SectionCard.tsx` | Card bọc mỗi phần (📖/💻/📝) với header + children |

### Step 5: Navigation Components

| Component | File | Chức năng |
|-----------|------|-----------|
| **DayTimeline** | `src/components/navigation/DayTimeline.tsx` | Sidebar desktop: 14 dots/numbers, active state, completed check |
| **MobileNav** | `src/components/navigation/MobileNav.tsx` | Mobile: bottom bar với prev/next + day selector |
| **PrevNextNav** | `src/components/navigation/PrevNextNav.tsx` | Nút prev/next ở cuối mỗi trang ngày |

### Step 6: Static Data

File: `src/lib/study-data.ts`

```typescript
export interface DayMeta {
  slug: string;
  dayNumber: number;
  title: string;
  stage: string;
  duration: string;
  topics: string[];
}

export const DAYS: DayMeta[] = [
  { slug: 'day-01', dayNumber: 1, title: 'Tổng Quan + Context/Token/Hallucination', stage: 'Nền tảng', duration: '1.5h', topics: ['Context Window', 'Token', 'Hallucination'] },
  // ... day-02 → day-14
];

export const TOTAL_DAYS = 14;
```

### Step 7: Copy/Link Content Files

Copy các file markdown từ `study-plans/2-week-intensive/` vào project:

```bash
cp -r ../../study-plans/2-week-intensive src/content/2-week-intensive/
```

Hoặc dùng symlink nếu Windows cho phép.

## Related Code Files

- **Create:** `study-plan-site/` (toàn bộ project mới)
- All files in `src/components/ui/`, `src/components/navigation/`, `src/lib/`

## Success Criteria

- [ ] `npm run dev` chạy thành công trên `localhost:3001`
- [ ] Layout hiển thị đúng font Be Vietnam Pro
- [ ] Dark/light mode toggle hoạt động, không flash
- [ ] DayTimeline sidebar hiển thị 14 ngày với đúng metadata
- [ ] Responsive: desktop sidebar → mobile bottom nav
- [ ] Callout component render đúng 3 loại (tip/warning/info)
- [ ] SectionCard render đúng với header + content

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Next.js 16 có breaking changes | Check migration guide sau `create-next-app` |
| Tailwind 4 config khác biệt | Dùng `@theme` directive thay vì `tailwind.config.ts` nếu cần |
| Font tiếng Việt load chậm | Dùng `subset: ['vietnamese']` + `display: swap` |
