"use client";

import { useProgress } from "./ProgressProvider";
import { DAY_CHECKLISTS } from "@/lib/study-data";

interface DayChecklistProps {
  slug: string;
}

export function DayChecklist({ slug }: DayChecklistProps) {
  const { progress, toggleChecklistItem } = useProgress();
  const day = progress.days[slug];
  const items = DAY_CHECKLISTS[slug];

  if (!items || items.length === 0) return null;

  return (
    <section className="mt-12 p-6 bg-paper-panel rounded-sm border border-hairline">
      <h3 className="text-lg font-semibold mb-4 text-ink">
        ✅ Checklist Ngày {slug.replace("day-", "").replace(/^0/, "")}
      </h3>
      <ul className="space-y-2.5">
        {items.map((item, i) => {
          const checked = day?.checklist[i] ?? false;
          return (
            <li key={i}>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleChecklistItem(slug, i)}
                  className="mt-0.5 w-4 h-4 rounded border-hairline accent-accent cursor-pointer shrink-0"
                />
                <span
                  className={`text-sm leading-relaxed transition-colors select-none ${
                    checked
                      ? "line-through text-muted/60"
                      : "text-ink group-hover:text-ink"
                  }`}
                >
                  {item}
                </span>
              </label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
