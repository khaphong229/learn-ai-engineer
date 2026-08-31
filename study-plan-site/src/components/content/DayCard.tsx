import type { DayMeta } from "@/lib/study-data";
import { getStageColor } from "@/lib/study-data";

interface DayCardProps {
  day: DayMeta;
}

export function DayCard({ day }: DayCardProps) {
  return (
    <div className="p-5 border border-hairline rounded-sm hover:border-accent/30 transition-colors bg-paper h-full">
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl font-bold font-mono tabular-nums text-accent">
          {String(day.dayNumber).padStart(2, "0")}
        </span>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider ${getStageColor(day.stage)}`}>
          {day.stage}
        </span>
      </div>
      <h3 className="font-semibold text-sm leading-snug mb-2 group-hover:text-accent transition-colors">
        {day.title}
      </h3>
      <div className="flex items-center gap-3 text-xs text-muted">
        <span>{day.duration}</span>
        <span aria-hidden="true">·</span>
        <span>{day.topics.length} chủ đề</span>
      </div>
    </div>
  );
}
