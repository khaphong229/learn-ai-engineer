"use client";

import { useProgress } from "./ProgressProvider";

export function ProgressBar() {
  const { getOverallProgress } = useProgress();
  const { completed, total, percentage } = getOverallProgress();

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-xs uppercase tracking-wider text-muted">
          Tiến độ
        </span>
        <span className="text-xs font-semibold font-mono tabular-nums">
          {completed}/{total} ngày · {percentage}%
        </span>
      </div>
      <div className="h-1.5 bg-paper-panel rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
