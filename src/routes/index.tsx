import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Radar, RotateCcw, Sparkles, Filter } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/potential/Header";
import { ResumeIntakePanel } from "@/components/potential/ResumeIntakePanel";
import { JDCard } from "@/components/potential/JDCard";
import { ProgressSteps } from "@/components/potential/ProgressSteps";
import { CandidateCard } from "@/components/potential/CandidateCard";
import { CapabilityRadar } from "@/components/potential/CapabilityRadar";
import { ComparisonPanel } from "@/components/potential/ComparisonPanel";
import { RediscoveredList } from "@/components/potential/RediscoveredList";
import { RiskCard } from "@/components/potential/RiskCard";
import { CandidateDrawer } from "@/components/potential/CandidateDrawer";
import { AnalyzingOverlay } from "@/components/potential/AnalyzingOverlay";
import {
  demoBrand,
  demoFlow,
  demoResumeBatch,
  defaultJob,
  defaultCandidates,
  defaultAnalysis,
} from "@/data/mockData";
import type { AnalysisResult, CandidateStatus } from "@/components/potential/types";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${demoBrand.name} · ${demoBrand.tagline}` },
      {
        name: "description",
        content: "璞见前端 Demo：上传/输入简历，完成岗位匹配、潜力分析与推荐理由展示。",
      },
      { property: "og:title", content: `${demoBrand.name} · ${demoBrand.product}` },
      { property: "og:description", content: demoBrand.tagline },
    ],
  }),
  component: Index,
});

function Index() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
  const [resumeInput, setResumeInput] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [mode, setMode] = useState<"live" | "cached" | "offline">("offline");
  const [openId, setOpenId] = useState<string | null>(null);

  const hasResumes = stage >= 1;
  const visibleCandidates = hasResumes ? defaultCandidates : [];

  const candidatesById = useMemo(
    () => Object.fromEntries(defaultCandidates.map((c) => [c.id, c])),
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
      // baseline computed locally if no analysis yet
    }
    return "pending";
  };

  const loadMockResumes = () => {
    setResumeInput(demoResumeBatch.sampleInput);
    setAnalysis(null);
    setOpenId(null);
    setStage(1);
    setMode("offline");
    toast.success(`已导入 ${demoResumeBatch.resumes.length} 份 Mock 简历`);
  };

  const runBaseline = () => {
    if (!hasResumes) {
      loadMockResumes();
      return;
    }
    setAnalysis({
      ...defaultAnalysis,
      rediscovered_candidates: [], // not yet
    } as AnalysisResult);
    setStage(2);
    toast.success(
      `岗位匹配完成 · 通过 ${defaultAnalysis.baseline_filter.passed_candidate_ids.length} / 待复核 ${defaultAnalysis.baseline_filter.filtered_candidate_ids.length}`,
    );
  };

  const runRadar = async () => {
    setAnalyzing(true);
    setStage(3);
    await new Promise((r) => setTimeout(r, 2400));
    setAnalysis(defaultAnalysis);
    setMode("cached");
    setStage(4);
    setAnalyzing(false);
    toast.success(
      `推荐理由生成完成 · 找回 ${defaultAnalysis.rediscovered_candidates.length} 位高潜候选人`,
    );
  };

  const reset = () => {
    setStage(0);
    setAnalysis(null);
    setOpenId(null);
    setResumeInput("");
    setMode("offline");
    setAnalyzing(false);
  };

  const selectedCandidate = openId ? (candidatesById[openId] ?? null) : null;
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
            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="text-xs text-muted-foreground"
            >
              <RotateCcw className="mr-1 h-3.5 w-3.5" />
              重新演示
            </Button>
            {stage < 1 ? (
              <Button
                size="sm"
                onClick={loadMockResumes}
                className="bg-primary text-primary-foreground shadow-glow hover:bg-primary/90"
              >
                载入 Mock 简历
              </Button>
            ) : stage < 2 ? (
              <Button
                size="sm"
                onClick={runBaseline}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
              >
                <Filter className="mr-1 h-3.5 w-3.5" />
                运行岗位匹配
              </Button>
            ) : stage < 4 ? (
              <Button
                size="sm"
                onClick={runRadar}
                disabled={analyzing || stage < 2}
                className="relative bg-primary text-primary-foreground shadow-glow hover:bg-primary/90"
              >
                <Radar className="mr-1 h-3.5 w-3.5" />
                {analyzing ? "潜力分析中…" : "生成推荐理由"}
              </Button>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                <Sparkles className="h-3.5 w-3.5" />
                分析完成
              </span>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-6 py-8">
        <section className="mb-6 rounded-2xl border border-border bg-card/70 p-5 shadow-elegant">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                {demoBrand.demoLabel}
              </div>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
                {demoBrand.name} · {demoBrand.tagline}
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                一个用于黑客松展示的前端闭环：从简历导入开始，展示传统关键词筛选如何漏掉高潜候选人，再由潜力雷达给出可复核的推荐理由。
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2 lg:w-[420px]">
              {demoFlow.map((item, index) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-border bg-background/70 p-3"
                >
                  <div className="font-mono text-[10px] text-primary">0{index + 1}</div>
                  <div className="mt-1 text-xs font-semibold text-foreground">{item.title}</div>
                  <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: JD */}
          <div className="space-y-4 lg:col-span-4">
            <ResumeIntakePanel
              batch={demoResumeBatch}
              value={resumeInput}
              loaded={hasResumes}
              onChange={setResumeInput}
              onLoadDemo={loadMockResumes}
            />
            <JDCard jd={defaultJob} />
            <RiskCard />
          </div>

          {/* Middle: candidate pool */}
          <div className="lg:col-span-5">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-foreground">候选人池</h2>
              <span className="text-xs text-muted-foreground tabular-nums">
                {hasResumes ? `共 ${defaultCandidates.length} 位` : "等待导入"}
              </span>
            </div>
            {hasResumes ? (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {visibleCandidates.map((c, i) => (
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
            ) : (
              <div className="grid min-h-[360px] place-items-center rounded-2xl border border-dashed border-border bg-card/50 p-8 text-center">
                <div>
                  <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                    <Filter className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">先导入候选人简历</h3>
                  <p className="mt-1 max-w-xs text-xs leading-relaxed text-muted-foreground">
                    导入后这里会展示候选人池，并进入岗位匹配流程。
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Right: AI results */}
          <div className="space-y-4 lg:col-span-3">
            {analyzing && <AnalyzingOverlay active />}

            {!analyzing && stage < 4 && (
              <div className="rounded-2xl border border-dashed border-border bg-card/50 p-6 text-center">
                <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
                  <Radar className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">等待推荐理由生成</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {stage < 1
                    ? "先上传或载入 Mock 简历，开始完整演示流程。"
                    : stage < 2
                      ? "运行岗位匹配，看看关键词规则会漏掉哪些人。"
                      : "现在让潜力雷达反推岗位能力画像，找回被漏筛的高潜候选人。"}
                </p>
              </div>
            )}

            {!analyzing && stage === 4 && analysis && (
              <div className="space-y-4 animate-fade-up">
                <CapabilityRadar profile={analysis.job_profile} />
                <ComparisonPanel result={analysis} totalCandidates={defaultCandidates.length} />
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
          {demoBrand.name} · {demoBrand.tagline} · 前端 Demo · AI 辅助复核，非唯一录用依据
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
