import { type ReactNode } from "react";

type CalloutType = "tip" | "warning" | "info";

const styles: Record<CalloutType, { border: string; bg: string; icon: string }> = {
  tip: {
    border: "border-l-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-950/20",
    icon: "💡",
  },
  warning: {
    border: "border-l-amber-500",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    icon: "⚠️",
  },
  info: {
    border: "border-l-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    icon: "ℹ️",
  },
};

interface CalloutProps {
  type: CalloutType;
  children: ReactNode;
}

export function Callout({ type, children }: CalloutProps) {
  const s = styles[type];
  return (
    <div className={`border-l-4 ${s.border} ${s.bg} px-4 py-3 my-6 rounded-r`}>
      <div className="flex gap-2 items-start">
        <span className="text-sm mt-0.5">{s.icon}</span>
        <div className="text-sm leading-relaxed text-ink">{children}</div>
      </div>
    </div>
  );
}
