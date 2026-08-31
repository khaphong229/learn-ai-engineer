import type { DayMeta } from "@/lib/study-data";
import { getStageColor } from "@/lib/study-data";

interface DayHeaderProps {
  meta: DayMeta;
  currentIndex: number;
}

export function DayHeader({ meta, currentIndex }: DayHeaderProps) {
  return (
    <header className="mb-12">
      <div className="flex items-start gap-4 mb-6">
        <span className="text-6xl font-bold text-accent font-mono tabular-nums leading-none">
          {String(meta.dayNumber).padStart(2, "0")}
        </span>
        <div className="pt-1">
          <p className="text-xs text-muted uppercase tracking-widest mb-1">
            Ngày {meta.dayNumber}/{14} · {meta.duration}
          </p>
          <h1 className="text-2xl lg:text-3xl font-semibold text-ink leading-tight">
            {meta.title}
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${getStageColor(meta.stage)}`}
        >
          {meta.stage}
        </span>
        {meta.topics.map((t) => (
          <span
            key={t}
            className="text-xs px-3 py-1 rounded-full border border-hairline text-muted"
          >
            {t}
          </span>
        ))}
      </div>

      <hr className="border-hairline" />
    </header>
  );
}
