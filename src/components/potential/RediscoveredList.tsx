import { Sparkles, ArrowUpRight } from "lucide-react";
import type { Candidate, RediscoveredCandidate } from "./types";

const levelMap = {
  high: { label: "高", cls: "bg-accent text-accent-foreground" },
  medium: { label: "中", cls: "bg-warning/20 text-warning" },
  low: { label: "低", cls: "bg-muted text-muted-foreground" },
};

export function RediscoveredList({
  items,
  candidatesById,
  onSelect,
}: {
  items: RediscoveredCandidate[];
  candidatesById: Record<string, Candidate>;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-elegant">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <Sparkles className="h-4 w-4 text-accent" />
          被找回的高潜候选人
        </h3>
        <span className="text-[10px] text-muted-foreground">按推荐等级排序</span>
      </div>

      <div className="space-y-2">
        {items.map((r) => {
          const c = candidatesById[r.candidate_id];
          if (!c) return null;
          const lvl = levelMap[r.recommendation_level];
          return (
            <button
              key={r.candidate_id}
              onClick={() => onSelect(r.candidate_id)}
              className="group flex w-full items-start gap-3 rounded-xl border border-border bg-background/60 p-3 text-left transition hover:border-accent/50 hover:bg-accent-soft/40"
            >
              <span className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-semibold ${lvl.cls}`}>
                {lvl.label}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-xs text-muted-foreground">{c.alias}</span>
                  <span className="text-sm font-semibold text-foreground">{c.name}</span>
                  <span className="truncate text-[11px] text-muted-foreground">
                    · {c.school} {c.major}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-foreground/75">
                  {r.recommendation_reason}
                </p>
                <span className="mt-1.5 inline-block rounded bg-muted/60 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                  漏筛原因：{r.why_missed_by_keywords.split("；")[0].slice(0, 32)}…
                </span>
              </div>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-accent" />
            </button>
          );
        })}
      </div>
    </div>
  );
}