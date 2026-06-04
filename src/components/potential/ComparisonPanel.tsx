import { ArrowRight } from "lucide-react";
import type { AnalysisResult } from "./types";

export function ComparisonPanel({
  result,
  totalCandidates,
}: {
  result: AnalysisResult;
  totalCandidates: number;
}) {
  const passed = result.baseline_filter.passed_candidate_ids.length;
  const filtered = result.baseline_filter.filtered_candidate_ids.length;
  const recovered = result.rediscovered_candidates.length;

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-elegant">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">传统筛选 vs 潜力雷达</h3>
        <span className="text-[10px] text-muted-foreground">共 {totalCandidates} 位候选人</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat label="通过关键词" value={passed} tone="success" />
        <Stat label="被关键词漏筛" value={filtered} tone="muted" />
        <Stat label="AI 找回" value={recovered} tone="accent" />
      </div>

      <div className="mt-4 flex items-center gap-3 rounded-xl border border-accent/30 bg-accent-soft/60 p-3 text-xs text-accent-foreground">
        <ArrowRight className="h-4 w-4 shrink-0" />
        <span>
          被关键词漏筛的 <b className="tabular-nums">{filtered}</b> 位候选人中，
          <b className="tabular-nums"> {recovered} </b>位被 AI 标记为值得复核。
        </span>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "success" | "muted" | "accent";
}) {
  const toneCls =
    tone === "success"
      ? "border-success/30 bg-success/10 text-success"
      : tone === "accent"
        ? "border-accent/40 bg-accent-soft text-accent-foreground"
        : "border-border bg-muted/50 text-foreground";
  return (
    <div className={`rounded-xl border p-3 ${toneCls}`}>
      <div className="text-[10px] uppercase tracking-wider opacity-80">{label}</div>
      <div className="mt-1 text-2xl font-bold tabular-nums">{value}</div>
    </div>
  );
}
