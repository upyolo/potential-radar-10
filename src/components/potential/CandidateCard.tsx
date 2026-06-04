import { Sparkles } from "lucide-react";
import type { Candidate, CandidateStatus, Recommendation } from "./types";

const initialColors = [
  "bg-[oklch(0.85_0.09_215)] text-[oklch(0.25_0.1_240)]",
  "bg-[oklch(0.9_0.08_85)] text-[oklch(0.32_0.1_60)]",
  "bg-[oklch(0.88_0.09_155)] text-[oklch(0.3_0.1_155)]",
  "bg-[oklch(0.88_0.09_330)] text-[oklch(0.3_0.12_330)]",
];

export function CandidateCard({
  c,
  status,
  recommendation,
  index,
  onClick,
}: {
  c: Candidate;
  status: CandidateStatus;
  recommendation?: Recommendation;
  index: number;
  onClick: () => void;
}) {
  const isRediscovered = status === "rediscovered";

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${index * 60}ms` }}
      className={`group relative animate-fade-up overflow-hidden rounded-xl border bg-card p-4 text-left transition hover:-translate-y-0.5 ${
        isRediscovered
          ? "border-accent/40 shadow-glow animate-glow-pulse"
          : status === "missed"
            ? "border-border opacity-70 hover:opacity-100"
            : status === "hit"
              ? "border-success/30"
              : "border-border shadow-elegant"
      }`}
    >
      {isRediscovered && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
          <Sparkles className="h-3 w-3" /> AI 建议复核
        </span>
      )}
      {status === "hit" && (
        <span className="absolute right-3 top-3 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
          通过关键词
        </span>
      )}
      {status === "missed" && (
        <span className="absolute right-3 top-3 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          被关键词筛掉
        </span>
      )}

      <div className="flex items-center gap-3">
        <div
          className={`grid h-11 w-11 place-items-center rounded-lg text-sm font-semibold ${
            initialColors[index % initialColors.length]
          }`}
        >
          {c.alias.slice(-2)}
        </div>
        <div className="min-w-0">
          <div className="font-mono text-xs text-muted-foreground">{c.alias}</div>
          <div className="truncate text-sm font-semibold text-foreground">{c.name}</div>
        </div>
      </div>

      <div className="mt-3 space-y-1 text-xs text-muted-foreground">
        <div className="truncate">
          {c.school} · {c.major}
        </div>
        <div>
          {c.grade} · 期望：{c.target}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3">
        <span className="text-[11px] text-muted-foreground">关键词命中</span>
        <span className="tabular-nums text-sm font-semibold text-foreground">
          {c.keywordHits}
          <span className="text-muted-foreground"> / {c.keywordTotal}</span>
        </span>
      </div>

      {isRediscovered && recommendation && (
        <div className="mt-3 rounded-lg bg-accent-soft px-2.5 py-1.5 text-[11px] font-medium text-accent-foreground">
          推荐等级：{recommendation === "high" ? "高" : recommendation === "medium" ? "中" : "低"}
        </div>
      )}
    </button>
  );
}
