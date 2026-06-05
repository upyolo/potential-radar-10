import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Filter, Radar, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/potential/Header";
import { FlowIndicator } from "@/components/potential/FlowIndicator";
import { SummaryBanner } from "@/components/potential/SummaryBanner";
import { JDCard } from "@/components/potential/JDCard";
import { CandidateCard } from "@/components/potential/CandidateCard";
import { CapabilityProfileBar } from "@/components/potential/CapabilityProfileBar";
import { ExplanationPanel } from "@/components/potential/ExplanationPanel";
import { AnalyzingOverlay } from "@/components/potential/AnalyzingOverlay";
import { sampleJD, sampleCandidates, cachedAnalysis } from "@/data/sample";
import type { AnalysisResult, CandidateStatus } from "@/components/potential/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "璞见 TruePotential — See People, Not Just Keywords." },
      {
        name: "description",
        content:
          "璞见 TruePotential：从 JD 反推能力画像，从简历中寻找证据，找回被关键词漏筛的高潜候选人。",
      },
      { property: "og:title", content: "璞见 TruePotential" },
      { property: "og:description", content: "See People, Not Just Keywords. 看见关键词之外的真实潜力。" },
    ],
  }),
  component: Index,
});

function Index() {
  // stage: 0 idle, 1 loaded, 2 keyword filter done, 3 AI radar done
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(1);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
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
        (analysis?.rediscovered_candidates ?? []).map((r) => [
          r.candidate_id,
          r.recommendation_level,
        ]),
      ),
    [analysis],
  );

  const statusOf = (id: string): CandidateStatus => {
    if (rediscoveredIds.includes(id)) return "rediscovered";
    if (stage >= 2) {
      if (passedIds.includes(id)) return "hit";
      if (filteredIds.includes(id)) return "missed";
    }
    return "pending";
  };

  const runBaseline = () => {
    setAnalysis({
      ...cachedAnalysis,
      rediscovered_candidates: [],
    } as AnalysisResult);
    setStage(2);
    toast.success(
      `关键词筛选完成 · 通过 ${cachedAnalysis.baseline_filter.passed_candidate_ids.length} / 漏筛 ${cachedAnalysis.baseline_filter.filtered_candidate_ids.length}`,
    );
  };

  const runRadar = async () => {
    setAnalyzing(true);
    await new Promise((r) => setTimeout(r, 2400));
    setAnalysis(cachedAnalysis);
    setStage(3);
    setAnalyzing(false);
    toast.success(
      `潜力雷达完成 · 找回 ${cachedAnalysis.rediscovered_candidates.length} 位高潜候选人`,
    );
  };

  const reset = () => {
    setStage(1);
    setAnalysis(null);
    setOpenId(null);
  };

  // Auto-select first rediscovered candidate when analysis completes
  useEffect(() => {
    if (stage === 3 && analysis && !openId && analysis.rediscovered_candidates.length > 0) {
      setOpenId(analysis.rediscovered_candidates[0].candidate_id);
    }
  }, [stage, analysis, openId]);

  const selectedCandidate = openId ? candidatesById[openId] ?? null : null;
  const selectedAnalysis =
    analysis?.rediscovered_candidates.find((r) => r.candidate_id === openId) ?? null;

  const passedCount = passedIds.length || 3;
  const filteredCount = filteredIds.length || 7;
  const rediscoveredCount = rediscoveredIds.length;

  // Main action button: changes by stage
  const actions = (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={reset}
        className="text-xs text-muted-foreground"
      >
        <RotateCcw className="mr-1 h-3.5 w-3.5" />
        重新演示
      </Button>
      {stage < 2 ? (
        <Button
          size="sm"
          onClick={runBaseline}
          className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <Filter className="mr-1 h-3.5 w-3.5" />
          运行关键词筛选
        </Button>
      ) : stage < 3 ? (
        <Button
          size="sm"
          onClick={runRadar}
          disabled={analyzing}
          className="bg-primary text-primary-foreground shadow-glow hover:bg-primary/90"
        >
          <Radar className="mr-1 h-3.5 w-3.5" />
          {analyzing ? "雷达扫描中…" : "启动潜力雷达 AI 分析"}
        </Button>
      ) : (
        <Button
          size="sm"
          variant="outline"
          onClick={reset}
          className="border-primary/30 text-primary"
        >
          <RotateCcw className="mr-1 h-3.5 w-3.5" />
          再演示一次
        </Button>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header
        flow={<FlowIndicator stage={Math.min(stage, 3) as 0 | 1 | 2 | 3} />}
        actions={actions}
      />

      <main className="mx-auto max-w-[1400px] space-y-5 px-6 py-6">
        {/* Summary banner */}
        <SummaryBanner
          total={sampleCandidates.length}
          filteredCount={stage >= 2 ? filteredCount : 0}
          rediscoveredCount={stage >= 3 ? rediscoveredCount : 0}
          active={stage === 3}
        />

        {/* Capability profile bar (collapsible) */}
        {stage === 3 && analysis && <CapabilityProfileBar profile={analysis.job_profile} />}

        {/* 3-column equal width */}
        <div className="grid gap-5 lg:grid-cols-3">
          {/* Column 1: JD + keyword rules */}
          <section>
            <SectionLabel>① 岗位与筛选规则</SectionLabel>
            <JDCard jd={sampleJD} />
          </section>

          {/* Column 2: candidate pool */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <SectionLabel className="mb-0">② 候选人池</SectionLabel>
              {stage >= 2 && (
                <span className="text-[11px] text-muted-foreground tabular-nums">
                  通过 <b className="text-success">{passedCount}</b> · 漏筛{" "}
                  <b className="text-muted-foreground">{filteredCount}</b>
                  {stage === 3 && (
                    <>
                      {" "}
                      · AI 找回 <b className="text-accent-foreground">{rediscoveredCount}</b>
                    </>
                  )}
                </span>
              )}
            </div>
            <div className="space-y-3">
              {sampleCandidates.map((c, i) => (
                <CandidateCard
                  key={c.id}
                  c={c}
                  index={i}
                  status={statusOf(c.id)}
                  recommendation={recommendationById[c.id]}
                  selected={openId === c.id}
                  onClick={() => setOpenId(c.id)}
                />
              ))}
            </div>
          </section>

          {/* Column 3: AI explanation panel (fixed, not drawer) */}
          <section className="relative">
            <SectionLabel>③ AI 解释卡</SectionLabel>
            <div className="sticky top-[88px]">
              {analyzing ? (
                <div className="flex h-[640px] items-center justify-center overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
                  <AnalyzingOverlay active />
                </div>
              ) : (
                <ExplanationPanel
                  candidate={selectedCandidate}
                  analysis={selectedAnalysis}
                  stage={stage}
                  onJoin={(id) => {
                    toast.success(`已将 ${id} 加入面试池`);
                  }}
                  onSkip={() => {
                    toast("已跳过该候选人");
                  }}
                />
              )}
            </div>
          </section>
        </div>

        <footer className="border-t border-border/60 pt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
          璞见 TruePotential 的 AI 分析仅作为<b className="text-foreground/80">辅助复核</b>，
          不能替代真实面试与背景核实，
          <b className="text-foreground/80">不应作为唯一录用依据</b>。
        </footer>
      </main>
    </div>
  );
}

function SectionLabel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[11px] font-semibold uppercase tracking-wider text-muted-foreground ${className || "mb-2"}`}
    >
      {children}
    </h2>
  );
}