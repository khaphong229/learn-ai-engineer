import Link from "next/link";
import { DAYS, TOTAL_DAYS } from "@/lib/study-data";
import { ProgressBar } from "@/components/progress/ProgressBar";
import { DayCard } from "@/components/content/DayCard";

export default function LandingPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <section className="mb-20">
        <p className="text-xs uppercase tracking-[0.2em] text-muted mb-4">
          AI Application Engineer
        </p>
        <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Lộ trình 2 tuần{" "}
          <span className="text-accent italic">cấp tốc</span>
        </h1>
        <p className="text-xl text-muted max-w-2xl leading-relaxed">
          14 ngày · 1-2 giờ/ngày · 6 giai đoạn · Từ nền tảng LLM đến production
        </p>
      </section>

      {/* Progress */}
      <section className="mb-16 max-w-md">
        <ProgressBar />
      </section>

      {/* Day Grid */}
      <section>
        <h2 className="text-2xl font-semibold mb-2">14 Ngày Học</h2>
        <p className="text-muted text-sm mb-8">
          Mỗi ngày: 📖 Lý thuyết → 💻 Thực hành → 📝 Củng cố
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {DAYS.map((day) => (
            <Link key={day.slug} href={`/day/${day.slug}`} className="group">
              <DayCard day={day} />
            </Link>
          ))}
        </div>
      </section>

      {/* Study Method */}
      <section className="mt-20 pt-12 border-t border-hairline">
        <h2 className="text-2xl font-semibold mb-6">Phương Pháp Học</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-paper-panel rounded-sm">
            <span className="text-2xl mb-3 block">📖</span>
            <h3 className="font-semibold mb-2">Lý thuyết</h3>
            <p className="text-sm text-muted leading-relaxed">
              Đọc docs + ghi chú từ khóa. Mỗi ngày có danh sách kiến thức cần
              nắm và link tới tài liệu chi tiết.
            </p>
            <span className="text-xs text-muted mt-3 block">30-40 phút</span>
          </div>
          <div className="p-6 bg-paper-panel rounded-sm">
            <span className="text-2xl mb-3 block">💻</span>
            <h3 className="font-semibold mb-2">Thực hành</h3>
            <p className="text-sm text-muted leading-relaxed">
              Chạy demo trên FE/BE, đọc source code, làm bài tập thực hành với
              API thật.
            </p>
            <span className="text-xs text-muted mt-3 block">40-60 phút</span>
          </div>
          <div className="p-6 bg-paper-panel rounded-sm">
            <span className="text-2xl mb-3 block">📝</span>
            <h3 className="font-semibold mb-2">Củng cố</h3>
            <p className="text-sm text-muted leading-relaxed">
              Flashcards + tự giải thích bằng phương pháp Feynman. Check
              checklist để theo dõi tiến độ.
            </p>
            <span className="text-xs text-muted mt-3 block">15-20 phút</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-hairline text-center">
        <p className="text-xs text-muted">
          AI Application Engineer · Study Plan · {TOTAL_DAYS} ngày
        </p>
      </footer>
    </main>
  );
}
