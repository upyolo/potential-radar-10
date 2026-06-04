import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { AnalysisResult } from "./types";

export function CapabilityRadar({ profile }: { profile: AnalysisResult["job_profile"] }) {
  const data = profile.required_capabilities.map((c) => ({
    capability: c.name,
    weight: Math.round(c.weight * 100),
  }));
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-elegant">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">岗位能力画像</h3>
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
          AI 推断
        </span>
      </div>

      <div className="relative h-56 radar-bg rounded-xl">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} outerRadius="72%">
            <PolarGrid stroke="oklch(0.38 0.14 255 / 0.25)" />
            <PolarAngleAxis
              dataKey="capability"
              tick={{ fill: "oklch(0.3 0.05 250)", fontSize: 11 }}
            />
            <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 100]} />
            <Radar
              dataKey="weight"
              stroke="oklch(0.38 0.14 255)"
              fill="oklch(0.72 0.16 215)"
              fillOpacity={0.35}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4">
        <h4 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          核心任务
        </h4>
        <ul className="space-y-1 text-xs text-foreground/80">
          {profile.core_tasks.map((t) => (
            <li key={t} className="flex gap-2">
              <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-primary" /> {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <h4 className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          证据关键词
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {profile.evidence_keywords.map((k) => (
            <span
              key={k}
              className="rounded-md border border-primary/20 bg-primary/5 px-2 py-0.5 text-[11px] text-primary"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
