import Link from "next/link";
import { DAYS } from "@/lib/study-data";
import { DayProgressDot } from "@/components/progress/DayProgressDot";

interface DayTimelineProps {
  current?: string;
}

export function DayTimeline({ current }: DayTimelineProps) {
  return (
    <aside className="hidden lg:block w-64 shrink-0 border-r border-hairline h-screen sticky top-0 overflow-y-auto">
      <div className="px-6 py-8">
        <Link href="/" className="block mb-8">
          <span className="text-xs uppercase tracking-[0.2em] text-muted">AI Engineer</span>
          <span className="block text-lg font-semibold text-ink mt-1 leading-tight">
            2 Tuần<br />Cấp Tốc
          </span>
        </Link>

        <nav aria-label="14-day timeline">
          <ol className="space-y-0.5 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-px before:bg-hairline">
            {DAYS.map((day) => {
              const isActive = current === day.slug;
              return (
                <li key={day.slug} className="relative pl-8 py-1.5">
                  {/* Dot */}
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                    <DayProgressDot slug={day.slug} isActive={isActive} />
                  </span>

                  <Link
                    href={`/day/${day.slug}`}
                    className={`block text-sm transition-colors ${
                      isActive
                        ? "text-accent font-semibold"
                        : "text-muted hover:text-ink"
                    }`}
                  >
                    <span className="text-xs font-mono tabular-nums mr-2">
                      {String(day.dayNumber).padStart(2, "0")}
                    </span>
                    {day.title.length > 32
                      ? day.title.slice(0, 32) + "…"
                      : day.title}
                  </Link>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </aside>
  );
}
