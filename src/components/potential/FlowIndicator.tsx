import { Check, FileStack, Filter, Radar, Sparkles } from "lucide-react";

export type FlowStage = 0 | 1 | 2 | 3;

const steps = [
  { label: "载入简历", icon: FileStack },
  { label: "关键词筛选", icon: Filter },
  { label: "AI 分析", icon: Radar },
  { label: "完成", icon: Sparkles },
] as const;

export function FlowIndicator({ stage }: { stage: FlowStage }) {
  return (
    <ol className="flex items-center justify-center gap-1.5 sm:gap-2">
      {steps.map((s, i) => {
        const done = i < stage;
        const active = i === stage;
        const Icon = s.icon;
        return (
          <li key={s.label} className="flex items-center gap-1.5 sm:gap-2">
            <div
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                active
                  ? "border-primary bg-primary/10 text-primary shadow-glow"
                  : done
                    ? "border-primary/40 bg-primary/5 text-primary"
                    : "border-border bg-card text-muted-foreground"
              }`}
            >
              <span
                className={`grid h-4 w-4 place-items-center rounded-full ${
                  done
                    ? "bg-primary text-primary-foreground"
                    : active
                      ? "bg-primary text-primary-foreground animate-pulse"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-2.5 w-2.5" /> : <Icon className="h-2.5 w-2.5" />}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <span
                className={`h-px w-4 sm:w-6 ${
                  done ? "bg-primary/60" : "bg-border"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}