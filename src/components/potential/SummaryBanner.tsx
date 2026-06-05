import { ArrowRight, Sparkles } from "lucide-react";

export function SummaryBanner({
  total,
  filteredCount,
  rediscoveredCount,
  active,
}: {
  total: number;
  filteredCount: number;
  rediscoveredCount: number;
  active: boolean;
}) {
  return (
    <section
      className={`relative overflow-hidden rounded-2xl border p-5 transition ${
        active
          ? "border-primary/30 bg-[var(--gradient-card,linear-gradient(135deg,oklch(0.96_0.03_240),oklch(0.94_0.05_215)))] shadow-elegant"
          : "border-border bg-card"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-foreground">
          <Stat value={total} unit="份简历" />
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <Stat value={filteredCount} unit="人被关键词淘汰" tone="muted" />
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
          <Stat value={rediscoveredCount} unit="人被 AI 找回" tone="accent" />
        </div>
        {active && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow-glow">
            <Sparkles className="h-3.5 w-3.5" />
            潜力雷达已完成
          </span>
        )}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        传统规则只看关键词，璞见继续查看能力证据。
      </p>
    </section>
  );
}

function Stat({
  value,
  unit,
  tone = "primary",
}: {
  value: number;
  unit: string;
  tone?: "primary" | "muted" | "accent";
}) {
  const color =
    tone === "accent"
      ? "text-accent-foreground bg-accent/90"
      : tone === "muted"
        ? "text-muted-foreground bg-muted"
        : "text-primary-foreground bg-primary";
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span
        className={`grid min-w-[2.25rem] place-items-center rounded-lg px-2 py-0.5 text-2xl font-bold tabular-nums ${color}`}
      >
        {value}
      </span>
      <span className="text-sm font-medium text-foreground">{unit}</span>
    </span>
  );
}