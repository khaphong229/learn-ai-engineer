---
phase: 4
title: Progress Tracking & Interactive Features
status: completed
effort: ''
priority: P2
dependencies:
  - 3
---

# Phase 4: Progress Tracking & Interactive Features

## Overview

Thêm interactive features: checklist tương tác (check hoàn thành), progress bar
tổng quan, flashcard viewer, và lưu trạng thái học qua localStorage.
Đây là phase tạo sự khác biệt giữa "đọc markdown" và "học tương tác".

## Requirements

- **Functional:** Checklist mỗi ngày check được, progress bar cập nhật real-time,
  flashcard flip interaction, localStorage persistence
- **Non-functional:** State sync nhanh, không mất dữ liệu khi refresh, dark mode
  tương thích với tất cả component

## Implementation Steps

### Step 1: ProgressProvider (React Context)

File: `src/components/progress/ProgressProvider.tsx`

```typescript
'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loadProgress, saveProgress, createEmptyProgress } from '@/lib/progress';
import type { StudyProgress, DayProgress } from '@/lib/progress';

interface ProgressContextType {
  progress: StudyProgress;
  toggleChecklistItem: (daySlug: string, itemIndex: number) => void;
  toggleDaySection: (daySlug: string, section: 'theoryRead' | 'practiceDone' | 'reviewDone') => void;
  getDayProgress: (daySlug: string) => DayProgress;
  getOverallProgress: () => { completed: number; total: number; percentage: number };
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType>(null!);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<StudyProgress>(createEmptyProgress());

  // Hydrate từ localStorage
  useEffect(() => {
    const saved = loadProgress();
    if (saved) setProgress(saved);
  }, []);

  // Persist mỗi khi thay đổi
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const toggleChecklistItem = useCallback((daySlug: string, itemIndex: number) => {
    setProgress(prev => {
      const day = { ...prev.days[daySlug] };
      const checklist = { ...day.checklist };
      checklist[itemIndex] = !checklist[itemIndex];
      day.checklist = checklist;
      day.completed = Object.values(checklist).every(Boolean);
      if (day.completed) day.completedAt = new Date().toISOString();
      return { ...prev, days: { ...prev.days, [daySlug]: day }, lastUpdated: new Date().toISOString() };
    });
  }, []);

  // ... similar for toggleDaySection, getDayProgress, getOverallProgress

  return (
    <ProgressContext.Provider value={{ progress, toggleChecklistItem, toggleDaySection, getDayProgress, getOverallProgress, resetProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
```

### Step 2: localStorage Helpers

File: `src/lib/progress.ts`

```typescript
const STORAGE_KEY = 'study-plan-progress-v1';

export interface StudyProgress {
  version: 1;
  days: Record<string, DayProgress>;
  lastUpdated: string;
}

export interface DayProgress {
  completed: boolean;
  theoryRead: boolean;
  practiceDone: boolean;
  reviewDone: boolean;
  checklist: Record<number, boolean>;
  completedAt: string | null;
}

export function createEmptyProgress(): StudyProgress {
  const days: Record<string, DayProgress> = {};
  for (let i = 1; i <= 14; i++) {
    const slug = `day-${String(i).padStart(2, '0')}`;
    days[slug] = {
      completed: false,
      theoryRead: false,
      practiceDone: false,
      reviewDone: false,
      checklist: {},
      completedAt: null,
    };
  }
  return { version: 1, days, lastUpdated: new Date().toISOString() };
}

export function loadProgress(): StudyProgress | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function saveProgress(progress: StudyProgress): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}
```

### Step 3: DayChecklist Component

File: `src/components/progress/DayChecklist.tsx`

```tsx
'use client';

import { useProgress } from './ProgressProvider';

export function DayChecklist({ slug }: { slug: string }) {
  const { progress, toggleChecklistItem } = useProgress();
  const day = progress.days[slug];
  if (!day) return null;

  // Parse checklist từ markdown content hoặc dùng default từ DAYS metadata
  const items = getChecklistItems(slug); // từ study-data.ts

  return (
    <section className="mt-12 p-6 bg-paper-panel rounded-sm">
      <h3 className="text-lg font-semibold mb-4">✅ Checklist</h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={day.checklist[i] ?? false}
              onChange={() => toggleChecklistItem(slug, i)}
              className="mt-0.5 w-5 h-5 accent-accent cursor-pointer"
            />
            <span className={day.checklist[i] ? 'line-through text-muted' : ''}>
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

### Step 4: ProgressBar + ProgressOverview

File: `src/components/progress/ProgressBar.tsx`

```tsx
'use client';

import { useProgress } from './ProgressProvider';

export function ProgressBar() {
  const { getOverallProgress } = useProgress();
  const { completed, total, percentage } = getOverallProgress();

  return (
    <div className="mb-12">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-muted">Tiến độ</span>
        <span className="text-sm font-semibold">{completed}/{total} ngày · {percentage}%</span>
      </div>
      <div className="h-2 bg-paper-panel rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
```

File: `src/components/progress/ProgressOverview.tsx` — Hiển thị trên landing page: progress bar + danh sách ngày đã hoàn thành + streak.

### Step 5: FlashCard Component

File: `src/components/ui/FlashCard.tsx`

```tsx
'use client';

import { useState } from 'react';

export function FlashCard({ front, back }: { front: string; back: string }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onClick={() => setFlipped(!flipped)}
      className="cursor-pointer select-none p-6 bg-paper-panel border border-hairline"
      style={{ minHeight: '120px', perspective: '1000px' }}
    >
      <div className={`transition-all duration-300 ${flipped ? 'opacity-0' : ''}`}>
        <p className="text-sm text-muted uppercase tracking-wider mb-2">Mặt trước</p>
        <p className="font-semibold">{front}</p>
      </div>
      {flipped && (
        <div className="animate-fadeIn">
          <p className="text-sm text-accent uppercase tracking-wider mb-2">Mặt sau</p>
          <p>{back}</p>
        </div>
      )}
    </div>
  );
}
```

### Step 6: FlashCardDeck Component

File: `src/components/ui/FlashCardDeck.tsx`

Parse bảng flashcard từ markdown (section "### Flashcards") và hiển thị dưới dạng deck tương tác với nút flip + next/prev.

## Related Code Files

- **Create:** `src/components/progress/ProgressProvider.tsx`, `ProgressBar.tsx`, `DayChecklist.tsx`, `ProgressOverview.tsx`; `src/components/ui/FlashCard.tsx`, `FlashCardDeck.tsx`; `src/lib/progress.ts`
- **Modify:** `src/app/layout.tsx` (đã bọc ProgressProvider ở Phase 2), `src/app/page.tsx` (thêm ProgressOverview), `src/app/day/[slug]/page.tsx` (thêm DayChecklist)

## Success Criteria

- [ ] Checkbox check → lưu localStorage → refresh không mất
- [ ] Progress bar cập nhật real-time khi check item
- [ ] Flashcard flip animation mượt
- [ ] Progress tổng hiển thị đúng: completed/total + %
- [ ] Reset progress hoạt động
- [ ] Dark mode tương thích tất cả component

## Risk Assessment

| Risk | Mitigation |
|------|------------|
| localStorage quota exceeded | Chỉ lưu ~2KB data, không lo |
| Checklist item index không khớp giữa markdown và code | Dùng text hash thay vì index, hoặc định nghĩa checklist trong study-data.ts |
| Flashcard parse từ markdown phức tạp | Fallback: hardcode flashcards trong study-data.ts nếu parse thất bại |
