import { Check } from "lucide-react";

export function ProgressSteps({ stage }: { stage: 0 | 1 | 2 | 3 | 4 }) {
  const steps = ["上传/输入简历", "岗位匹配", "潜力分析", "推荐理由展示"];
  return (
    <div className="flex flex-wrap items-center gap-3">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = stage >= idx;
        const active = stage === idx - 1 || stage === idx;
        return (
          <div key={label} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div
                className={`grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition ${
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : active
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : idx}
              </div>
              <span
                className={`text-xs font-medium ${
                  done || active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-px w-8 ${done ? "bg-primary" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}
