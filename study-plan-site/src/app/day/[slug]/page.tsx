import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { DAYS, TOTAL_DAYS } from "@/lib/study-data";
import { getDayContent, getAllDaySlugs } from "@/lib/markdown";
import { MarkdownRenderer } from "@/components/content/MarkdownRenderer";
import { DayTimeline } from "@/components/navigation/DayTimeline";
import { MobileNav } from "@/components/navigation/MobileNav";
import { PrevNextNav } from "@/components/navigation/PrevNextNav";
import { DayHeader } from "@/components/content/DayHeader";
import { DayChecklist } from "@/components/progress/DayChecklist";

interface DayPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllDaySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: DayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = DAYS.find((d) => d.slug === slug);
  if (!meta) return { title: "Not Found" };

  return {
    title: `Ngày ${meta.dayNumber}: ${meta.title}`,
    description: `${meta.stage} · ${meta.duration} · ${meta.topics.join(", ")}`,
  };
}

export default async function DayPage({ params }: DayPageProps) {
  const { slug } = await params;

  // Validate slug
  if (!slug.match(/^day-\d{2}$/)) notFound();

  const meta = DAYS.find((d) => d.slug === slug);
  if (!meta) notFound();

  const content = getDayContent(slug);

  const currentIndex = DAYS.findIndex((d) => d.slug === slug);
  const prev = currentIndex > 0 ? DAYS[currentIndex - 1] : null;
  const next = currentIndex < TOTAL_DAYS - 1 ? DAYS[currentIndex + 1] : null;

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <DayTimeline current={slug} />

      {/* Main content */}
      <main className="flex-1 min-w-0 max-w-3xl mx-auto px-6 py-12 pb-24 lg:pb-12">
        <DayHeader meta={meta} currentIndex={currentIndex} />
        <MarkdownRenderer content={content} />
        <DayChecklist slug={slug} />
        <PrevNextNav prev={prev} next={next} />
      </main>

      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
