"use client";

import { DAYS } from "@/lib/study-data";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MobileNav() {
  const pathname = usePathname();
  const currentSlug = pathname.split("/day/")[1] ?? "";
  const currentIdx = DAYS.findIndex((d) => d.slug === currentSlug);

  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-paper border-t border-hairline z-50">
      <div className="flex items-center justify-between px-4 py-2 max-w-lg mx-auto">
        <Link
          href={currentIdx > 0 ? `/day/${DAYS[currentIdx - 1].slug}` : "/"}
          className="text-xs text-muted hover:text-ink transition-colors py-2 px-1"
        >
          ← Prev
        </Link>

        <Link href="/" className="text-xs font-semibold text-ink py-2 px-2">
          {currentSlug
            ? `Ngày ${currentSlug.replace("day-", "").replace(/^0/, "")}/14`
            : "Tổng quan"}
        </Link>

        <Link
          href={
            currentIdx >= 0 && currentIdx < DAYS.length - 1
              ? `/day/${DAYS[currentIdx + 1].slug}`
              : currentIdx === DAYS.length - 1
                ? "/"
                : "/day/day-01"
          }
          className="text-xs text-muted hover:text-ink transition-colors py-2 px-1"
        >
          Next →
        </Link>
      </div>
    </nav>
  );
}
