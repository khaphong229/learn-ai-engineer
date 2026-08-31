const STORAGE_KEY = "study-plan-progress-v1";

export interface DayProgress {
  completed: boolean;
  theoryRead: boolean;
  practiceDone: boolean;
  reviewDone: boolean;
  checklist: Record<number, boolean>;
  completedAt: string | null;
}

export interface StudyProgress {
  version: 1;
  days: Record<string, DayProgress>;
  lastUpdated: string;
}

export function createEmptyProgress(): StudyProgress {
  const days: Record<string, DayProgress> = {};
  for (let i = 1; i <= 14; i++) {
    const slug = `day-${String(i).padStart(2, "0")}`;
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
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveProgress(progress: StudyProgress): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // localStorage full or unavailable — silently ignore
  }
}
