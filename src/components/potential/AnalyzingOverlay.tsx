import { useEffect, useState } from "react";
import { Radar } from "lucide-react";

const messages = [
  "正在拆解 JD 核心任务…",
  "正在反推岗位能力画像…",
  "正在从简历中抽取能力证据…",
  "正在交叉比对关键词漏筛人群…",
  "正在生成面试追问…",
];

export function AnalyzingOverlay({ active }: { active: boolean }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!active) return;
    setIdx(0);
    const t = setInterval(() => setIdx((i) => (i + 1) % messages.length), 900);
    return () => clearInterval(t);
  }, [active]);
  if (!active) return null;
  return (
    <div className="rounded-2xl border border-primary/30 bg-card p-8 shadow-elegant">
      <div className="flex items-center gap-4">
        <div className="relative grid h-14 w-14 place-items-center rounded-full bg-primary/10">
          <div className="absolute inset-0 rounded-full border border-primary/40" />
          <div className="absolute inset-2 animate-radar-sweep origin-center rounded-full border-t-2 border-primary-glow" />
          <Radar className="h-6 w-6 text-primary" />
        </div>
        <div>
          <div className="text-sm font-semibold text-foreground">潜力雷达扫描中</div>
          <div className="mt-1 h-4 overflow-hidden text-xs text-muted-foreground">
            <div key={idx} className="animate-fade-up">
              {messages[idx]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
