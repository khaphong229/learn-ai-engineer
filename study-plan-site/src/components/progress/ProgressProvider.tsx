"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import {
  loadProgress,
  saveProgress,
  createEmptyProgress,
  type StudyProgress,
  type DayProgress,
} from "@/lib/progress";

interface ProgressContextType {
  progress: StudyProgress;
  toggleChecklistItem: (daySlug: string, itemIndex: number) => void;
  toggleDaySection: (
    daySlug: string,
    section: "theoryRead" | "practiceDone" | "reviewDone"
  ) => void;
  getDayProgress: (daySlug: string) => DayProgress;
  getOverallProgress: () => {
    completed: number;
    total: number;
    percentage: number;
  };
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType>(null!);

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<StudyProgress>(createEmptyProgress());
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage
  useEffect(() => {
    setMounted(true);
    const saved = loadProgress();
    if (saved) setProgress(saved);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!mounted) return;
    saveProgress(progress);
  }, [progress, mounted]);

  const toggleChecklistItem = useCallback(
    (daySlug: string, itemIndex: number) => {
      setProgress((prev) => {
        const day = { ...prev.days[daySlug] };
        const checklist = { ...day.checklist };
        checklist[itemIndex] = !checklist[itemIndex];
        day.checklist = checklist;
        day.completed = Object.values(checklist).every(Boolean);
        if (day.completed) day.completedAt = new Date().toISOString();
        return {
          ...prev,
          days: { ...prev.days, [daySlug]: day },
          lastUpdated: new Date().toISOString(),
        };
      });
    },
    []
  );

  const toggleDaySection = useCallback(
    (
      daySlug: string,
      section: "theoryRead" | "practiceDone" | "reviewDone"
    ) => {
      setProgress((prev) => {
        const day = { ...prev.days[daySlug] };
        day[section] = !day[section];
        return {
          ...prev,
          days: { ...prev.days, [daySlug]: day },
          lastUpdated: new Date().toISOString(),
        };
      });
    },
    []
  );

  const getDayProgress = useCallback(
    (daySlug: string): DayProgress => {
      return (
        progress.days[daySlug] ?? {
          completed: false,
          theoryRead: false,
          practiceDone: false,
          reviewDone: false,
          checklist: {},
          completedAt: null,
        }
      );
    },
    [progress]
  );

  const getOverallProgress = useCallback(() => {
    const total = Object.keys(progress.days).length;
    const completed = Object.values(progress.days).filter((d) => d.completed).length;
    return {
      completed,
      total,
      percentage: total > 0 ? Math.round((completed / total) * 100) : 0,
    };
  }, [progress]);

  const resetProgress = useCallback(() => {
    const fresh = createEmptyProgress();
    setProgress(fresh);
    saveProgress(fresh);
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        progress,
        toggleChecklistItem,
        toggleDaySection,
        getDayProgress,
        getOverallProgress,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  return useContext(ProgressContext);
}
