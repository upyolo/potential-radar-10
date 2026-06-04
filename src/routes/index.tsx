import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Radar, RotateCcw, Sparkles, Filter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/potential/Header";
import { JDCard } from "@/components/potential/JDCard";
import { ProgressSteps } from "@/components/potential/ProgressSteps";
import { CandidateCard } from "@/components/potential/CandidateCard";
import { CapabilityRadar } from "@/components/potential/CapabilityRadar";
import { ComparisonPanel } from "@/components/potential/ComparisonPanel";
import { RediscoveredList } from "@/components/potential/RediscoveredList";
import { RiskCard } from "@/components/potential/RiskCard";
import { CandidateDrawer } from "@/components/potential/CandidateDrawer";
import { AnalyzingOverlay } from "@/components/potential/AnalyzingOverlay";
import { sampleJD, sampleCandidates, cachedAnalysis } from "@/data/sample";
import type { AnalysisResult, CandidateStatus } from "@/components/potential/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "璞见 · Potential Radar — 看见关键词之外的真实潜力" },
      { name: "description", content: "从 JD 反推能力画像，从简历中寻找证据，找回被关键词漏筛的高潜候选人。" },
      { property: "og:title", content: "璞见 · 潜力雷达" },
      { property: "og:description", content: "AI 辅助招聘复核工作台，演示从 JD 到候选人证据的完整闭环。" },
    ],
  }),
  component: Index,
});

function Index() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(1); // sample loaded on entry
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [mode, setMode] = useState<"live" | "cached" | "offline">("offline");
  const [openId, setOpenId] = useState<string | null>(null);

  const candidatesById = useMemo(
    () => Object.fromEntries(sampleCandidates.map((c) => [c.id, c])),
    [],
  );

  const passedIds = analysis?.baseline_filter.passed_candidate_ids ?? [];
  const filteredIds = analysis?.baseline_filter.filtered_candidate_ids ?? [];
  const rediscoveredIds = analysis?.rediscovered_candidates.map((r) => r.candidate_id) ?? [];
  const recommendationById = useMemo(
    () =>
      Object.fromEntries(
        (analysis?.rediscovered_candidates ?? []).map((r) => [r.candidate_id, r.recommendation_level]),
      ),
    [analysis],
  );

  const statusOf = (id: string): CandidateStatus => {
    if (rediscoveredIds.includes(id)) return "rediscovered";
    if (stage >= 2) {
      if (passedIds.includes(id)) return "hit";
      if (filteredIds.includes(id)) return "missed";
      // baseline computed locally if no analysis yet
    }
    return "pending";
  };

  const runBaseline = () => {
    // simple local: use cached baseline split for the visual demo
    setAnalysis({
      ...cachedAnalysis,
      rediscovered_candidates: [], // not yet
    } as AnalysisResult);
    setStage(2);
    toast.success(`关键词筛选完成 · 通过 ${cachedAnalysis.baseline_filter.passed_candidate_ids.length} / 漏筛 ${cachedAnalysis.baseline_filter.filtered_candidate_ids.length}`);
  };

  const runRadar = async () => {
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 2400));
    setAnalysis(cachedAnalysis);
    setMode("cached");
    setStage(3);
    setAnalyzing(false);
    toast.success(`潜力雷达完成 · 找回 ${cachedAnalysis.rediscovered_candidates.length} 位高潜候选人`);
  };

  const reset = () => {
    setStage(1);
    setAnalysis(null);
    setOpenId(null);
    setMode("offline");
  };

  const selectedCandidate = openId ? candidatesById[openId] ?? null : null;
  const selectedAnalysis =
    analysis?.rediscovered_candidates.find((r) => r.candidate_id === openId) ?? null;

  return (
    <div className="min-h-screen text-foreground">
      <Header mode={mode} />

      {/* control bar */}
      <div className="sticky top-[73px] z-20 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-3">
          <ProgressSteps stage={stage} />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={reset} className="text-xs text-muted-foreground">
              <RotateCcw className="mr-1 h-3.5 w-3.5" />重新演示
            </Button>
            {stage < 2 ? (
              <Button
                size="sm"
                onClick={runBaseline}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                <Filter className="mr-1 h-3.5 w-3.5" />运行传统筛选
              </Button>
            ) : stage < 3 ? (
              <Button
                size="sm"
                onClick={runRadar}
                disabled={analyzing}
                className="relative bg-primary text-primary-foreground shadow-glow hover:bg-primary/90"
              >
                <Radar className="mr-1 h-3.5 w-3.5" />
                {analyzing ? "雷达扫描中…" : "启动潜力雷达"}
              </Button>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5" />分析完成
              </span>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: JD */}
          <div className="space-y-4 lg:col-span-4">
            <JDCard jd={sampleJD} />
            <RiskCard />
          </div>

          {/* Middle: candidate pool */}
          <div className="lg:col-span-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">候选人池</h2>
              <span className="text-xs text-muted-foreground tabular-nums">
                共 {sampleCandidates.length} 位
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {sampleCandidates.map((c, i) => (
                <CandidateCard
                  key={c.id}
                  c={c}
                  index={i}
                  status={statusOf(c.id)}
                  recommendation={recommendationById[c.id]}
                  onClick={() => setOpenId(c.id)}
                />
              ))}
            </div>
          </div>

          {/* Right: AI results */}
          <div className="space-y-4 lg:col-span-3">
            {analyzing && <AnalyzingOverlay active />}

            {!analyzing && stage < 3 && (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <Radar className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">等待启动潜力雷达</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stage < 2
                    ? "先运行传统筛选，看看关键词规则会漏掉哪些人。"
                    : "现在让 AI 反推岗位能力画像，找回被漏筛的高潜候选人。"}
                </p>
              </div>
            )}

            {!analyzing && stage === 3 && analysis && (
              <div className="space-y-4 animate-fade-up">
                <CapabilityRadar profile={analysis.job_profile} />
                <ComparisonPanel result={analysis} totalCandidates={sampleCandidates.length} />
                <RediscoveredList
                  items={analysis.rediscovered_candidates}
                  candidatesById={candidatesById}
                  onSelect={(id) => setOpenId(id)}
                />
              </div>
            )}
          </div>
        </div>

        <footer className="mt-12 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
          璞见 · Potential Radar · Demo Mode · AI 辅助复核，非唯一录用依据
        </footer>
      </main>

      <CandidateDrawer
        open={!!openId}
        onOpenChange={(v) => !v && setOpenId(null)}
        candidate={selectedCandidate}
        analysis={selectedAnalysis}
      />
    </div>
  );
}
