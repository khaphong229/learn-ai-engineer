import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ProgressProvider } from "@/components/progress/ProgressProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import "./globals.css";

const beVietnamPro = Be_Vietnam_Pro({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["vietnamese", "latin"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | AI Engineer 2 Tuần",
    default: "AI Application Engineer — Lộ Trình 2 Tuần Cấp Tốc",
  },
  description:
    "Lộ trình học AI Application Engineer 14 ngày, từ nền tảng LLM đến production. Học qua markdown tương tác, có checklist và progress tracking.",
  openGraph: {
    type: "website",
    locale: "vi_VN",
    siteName: "AI Engineer Learning",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-paper text-ink font-sans">
        <ThemeProvider>
          <ProgressProvider>
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            {children}
          </ProgressProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
