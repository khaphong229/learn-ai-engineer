import Link from "next/link";
import type { DayMeta } from "@/lib/study-data";

interface PrevNextNavProps {
  prev: DayMeta | null;
  next: DayMeta | null;
}

export function PrevNextNav({ prev, next }: PrevNextNavProps) {
  return (
    <nav className="mt-16 pt-8 border-t border-hairline flex justify-between items-center">
      {prev ? (
        <Link
          href={`/day/${prev.slug}`}
          className="group flex flex-col hover:text-accent transition-colors"
        >
          <span className="text-xs text-muted uppercase tracking-wider">
            ← Ngày trước
          </span>
          <span className="text-sm font-medium mt-1 group-hover:underline">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/day/${next.slug}`}
          className="group flex flex-col text-right hover:text-accent transition-colors"
        >
          <span className="text-xs text-muted uppercase tracking-wider">
            Ngày tiếp →
          </span>
          <span className="text-sm font-medium mt-1 group-hover:underline">
            {next.title}
          </span>
        </Link>
      ) : (
        <Link
          href="/"
          className="group flex flex-col text-right hover:text-accent transition-colors"
        >
          <span className="text-xs text-muted uppercase tracking-wider">
            Hoàn thành →
          </span>
          <span className="text-sm font-medium mt-1 group-hover:underline">
            Về trang chủ
          </span>
        </Link>
      )}
    </nav>
  );
}
