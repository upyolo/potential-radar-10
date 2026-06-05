import { CheckCircle2, Sparkles, XCircle } from "lucide-react";
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
  selected,
}: {
  c: Candidate;
  status: CandidateStatus;
  recommendation?: Recommendation;
  index: number;
  onClick: () => void;
  selected?: boolean;
}) {
  const isRediscovered = status === "rediscovered";
  const pct = Math.round((c.keywordHits / c.keywordTotal) * 100);

  return (
    <button
      onClick={onClick}
      style={{ animationDelay: `${index * 60}ms` }}
      className={`group relative w-full animate-fade-up overflow-hidden rounded-2xl border bg-card p-4 text-left transition hover:-translate-y-0.5 ${
        selected
          ? "border-primary ring-2 ring-primary/30 shadow-elegant"
          : isRediscovered
            ? "border-accent/50 shadow-glow animate-glow-pulse"
            : status === "missed"
              ? "border-border opacity-75 hover:opacity-100"
              : status === "hit"
                ? "border-success/40"
                : "border-border shadow-elegant"
      }`}
    >
      {isRediscovered && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
          <Sparkles className="h-3 w-3" /> AI 找回
        </span>
      )}
      {status === "hit" && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
          <CheckCircle2 className="h-3 w-3" /> 通过
        </span>
      )}
      {status === "missed" && (
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          <XCircle className="h-3 w-3" /> 漏筛
        </span>
      )}

      <div className="flex items-center gap-3">
        <div
          className={`grid h-10 w-10 place-items-center rounded-xl text-sm font-semibold ${
            initialColors[index % initialColors.length]
          }`}
        >
          {c.alias.slice(-2)}
        </div>
        <div className="min-w-0">
          <div className="font-mono text-[11px] text-muted-foreground">{c.alias}</div>
          <div className="truncate text-sm font-semibold text-foreground">{c.name}</div>
        </div>
      </div>

      <div className="mt-2.5 space-y-0.5 text-[11px] text-muted-foreground">
        <div className="truncate">{c.school} · {c.major}</div>
        <div className="truncate">{c.grade}</div>
      </div>

      <div className="mt-3 border-t border-border/60 pt-2.5">
        <div className="mb-1 flex items-center justify-between text-[10px]">
          <span className="text-muted-foreground">关键词命中</span>
          <span className="tabular-nums font-semibold text-foreground">
            {c.keywordHits}<span className="text-muted-foreground"> / {c.keywordTotal}</span>
          </span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full transition-all ${
              status === "hit"
                ? "bg-success"
                : isRediscovered
                  ? "bg-accent"
                  : "bg-primary/40"
            }`}
            style={{ width: `${Math.max(pct, 4)}%` }}
          />
        </div>
      </div>

      {isRediscovered && recommendation && (
        <div className="mt-2 inline-flex items-center rounded-md bg-accent-soft px-1.5 py-0.5 text-[10px] font-semibold text-accent-foreground">
          推荐等级：{recommendation === "high" ? "高" : recommendation === "medium" ? "中" : "低"}
        </div>
      )}
    </button>
  );
}