"use client";

import { useProgress } from "./ProgressProvider";

interface DayProgressDotProps {
  slug: string;
  isActive: boolean;
}

export function DayProgressDot({ slug, isActive }: DayProgressDotProps) {
  const { getDayProgress } = useProgress();
  const day = getDayProgress(slug);

  if (day.completed) {
    return (
      <span className="block w-2.5 h-2.5 rounded-full bg-emerald-500 border border-emerald-500">
        <svg
          viewBox="0 0 10 10"
          className="w-full h-full text-white"
          fill="currentColor"
        >
          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" fill="none" />
        </svg>
      </span>
    );
  }

  return (
    <span
      className={`block w-2.5 h-2.5 rounded-full border transition-colors ${
        isActive
          ? "bg-accent border-accent"
          : "bg-paper border-hairline"
      }`}
    />
  );
}
