---
phase: 5
title: Polish & Deploy
status: completed
effort: ''
priority: P2
dependencies:
  - 4
---

# Phase 5: Polish & Deploy

## Overview

Hoàn thiện UI/UX, tối ưu performance, kiểm tra responsive, accessibility,
và deploy lên Vercel. Đây là phase cuối — output là website hoạt động hoàn chỉnh.

## Requirements

- **Functional:** Website hoạt động trên production URL, tối ưu SEO, analytics (optional)
- **Non-functional:** Lighthouse score ≥ 90 (Performance, Accessibility, Best Practices, SEO)

## Implementation Steps

### Step 1: UI Polish

- [ ] **Typography:** Kiểm tra line-height, spacing, font size hierarchy trên tất cả trang
- [ ] **Color contrast:** Đảm bảo WCAG AA (≥4.5:1 cho text, ≥3:1 cho large text)
- [ ] **Focus states:** Thêm visible focus ring cho tất cả interactive elements
- [ ] **Transitions:** Thêm subtle transition cho hover, page transition
- [ ] **Paper texture:** CSS `background-image` noise nhẹ trên `.bg-paper`
- [ ] **Print styles:** Ẩn nav, hiển thị full content khi in

### Step 2: Responsive Testing

| Breakpoint | Layout |
|------------|--------|
| **≥1024px** | Sidebar timeline left + content center |
| **768-1023px** | Sidebar collapse → top horizontal scroll |
| **<768px** | Full width content + bottom mobile nav |

- [ ] Test trên iPhone SE, iPhone 14, iPad, 13" laptop, 27" desktop
- [ ] Table responsive: horizontal scroll với sticky column đầu tiên
- [ ] Code blocks: wrap hoặc scroll ngang
- [ ] Touch targets ≥ 44px cho mobile

### Step 3: Performance Optimization

- [ ] **SSG:** Tất cả 14 day pages build static (`generateStaticParams`)
- [ ] **Font:** `next/font` với subset Vietnamese + `display: swap`
- [ ] **Image:** Nếu có ảnh minh họa, dùng `next/image` + WebP
- [ ] **Bundle:** Analyze với `@next/bundle-analyzer`, đảm bảo < 150KB first load JS
- [ ] **Caching:** Set `Cache-Control` header cho static assets

### Step 4: SEO + Metadata

File: `src/app/layout.tsx` (metadata)

```typescript
export const metadata: Metadata = {
  title: {
    template: '%s | AI Engineer 2 Tuần',
    default: 'AI Application Engineer — Lộ Trình 2 Tuần Cấp Tốc',
  },
  description: 'Lộ trình học AI Application Engineer 14 ngày, từ nền tảng LLM đến production. Học qua markdown tương tác, có checklist và progress tracking.',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    siteName: 'AI Engineer Learning',
  },
};
```

File: `src/app/day/[slug]/page.tsx` (dynamic metadata)

```typescript
export async function generateMetadata({ params }) {
  const meta = DAYS.find(d => d.slug === params.slug);
  return {
    title: `Ngày ${meta.dayNumber}: ${meta.title}`,
    description: `${meta.stage} · ${meta.duration} · ${meta.topics.join(', ')}`,
  };
}
```

### Step 5: Deploy to Vercel

```bash
cd study-plan-site
git init
git add .
git commit -m "feat: study plan learning website — 14-day AI engineer track"

# Deploy
npx vercel --prod
```

Hoặc connect GitHub repo → Vercel auto-deploy.

Cấu hình Vercel:
- Framework: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Root Directory: `study-plan-site/` (nếu là monorepo)

### Step 6: Post-Deploy Verification

- [ ] Tất cả 14 route hoạt động (crawl bằng script hoặc manual)
- [ ] Internal links không bị broken
- [ ] Dark mode hoạt động trên production
- [ ] localStorage progress hoạt động trên production domain
- [ ] Lighthouse audit trên production URL
- [ ] Test trên mobile thực (điện thoại)

## Related Code Files

- **Modify:** `src/app/layout.tsx`, `src/app/day/[slug]/page.tsx`, `src/app/globals.css`
- **Create:** `.github/workflows/deploy.yml` (optional CI/CD)

## Success Criteria

- [ ] Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90
- [ ] Responsive đẹp trên 5 breakpoints chính
- [ ] Dark mode không lỗi visual (contrast đủ, không flash)
- [ ] Deploy thành công lên Vercel với URL public
- [ ] Tất cả 14 internal links hoạt động
- [ ] Checklist + progress hoạt động trên production

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| Vercel deploy lỗi do path file .md | Kiểm tra `process.cwd()` path trong `getDayContent` khi build trên Vercel |
| Font tiếng Việt nặng (~200KB) | Subset Vietnamese + Latin, dùng `display: swap` |
| localStorage không hoạt động trên Vercel preview domain | Test trên production domain (cùng origin) |
