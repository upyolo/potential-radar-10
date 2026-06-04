import { ShieldAlert } from "lucide-react";

export function RiskCard() {
  return (
    <div className="rounded-2xl border border-warning/30 bg-warning/5 p-4">
      <div className="flex items-start gap-3">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-warning/20 text-warning">
          <ShieldAlert className="h-4 w-4" />
        </div>
        <div className="text-xs leading-relaxed text-foreground/80">
          <p className="font-semibold text-foreground">使用提示</p>
          <p className="mt-1">
            「璞见」AI 分析仅作为<b>辅助复核</b>，<b>不能</b>替代真实面试与背景核实，
            <b>不应作为唯一录用依据</b>。请结合面试追问与团队判断综合决策。
          </p>
        </div>
      </div>
    </div>
  );
}
