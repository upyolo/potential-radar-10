import { AlertTriangle, CheckCircle2, Copy, MessageSquareQuote, Radar, Sparkles, UserCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import type { Candidate, RediscoveredCandidate } from "./types";

const confMap = {
  high: { label: "高", cls: "bg-success/15 text-success border-success/30" },
  medium: { label: "中", cls: "bg-primary/10 text-primary border-primary/30" },
  low: { label: "低", cls: "bg-muted text-muted-foreground border-border" },
};

const recMap = {
  high: { label: "推荐等级：高", cls: "bg-accent text-accent-foreground" },
  medium: { label: "推荐等级：中", cls: "bg-accent-soft text-accent-foreground" },
  low: { label: "推荐等级：低", cls: "bg-muted text-muted-foreground" },
};

export function ExplanationPanel({
  candidate,
  analysis,
  stage,
  onJoin,
  onSkip,
}: {
  candidate: Candidate | null;
  analysis: RediscoveredCandidate | null;
  stage: 0 | 1 | 2 | 3;
  onJoin: (id: string) => void;
  onSkip: (id: string) => void;
}) {
  if (stage < 3) {
    return (
      <PanelShell>
        <EmptyState stage={stage} />
      </PanelShell>
    );
  }

  if (!candidate) {
    return (
      <PanelShell>
        <div className="grid h-full place-items-center px-6 py-10 text-center text-xs text-muted-foreground">
          点击中间任意候选人卡片，查看 AI 解释
        </div>
      </PanelShell>
    );
  }

  const copyAll = () => {
    if (!analysis) return;
    const text = `${candidate.alias} ${candidate.name}\n\n【为什么被关键词漏掉】\n${analysis.why_missed_by_keywords}\n\n【为什么值得复核】\n${analysis.recommendation_reason}\n\n【能力证据】\n${analysis.capability_evidence.map((e) => `- ${e.capability}（${e.confidence}）：${e.evidence_from_resume}`).join("\n")}\n\n【风险点】\n${analysis.risks.map((r) => `- ${r}`).join("\n")}\n\n【面试追问】\n${analysis.interview_questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    toast.success("已复制完整分析");
  };

  return (
    <PanelShell>
      <div className="flex h-full flex-col">
        {/* header */}
        <div className="border-b border-border/60 bg-card px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <UserCircle2 className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{candidate.alias}</span>
                <span className="truncate text-base font-semibold text-foreground">
                  {candidate.name}
                </span>
              </div>
              <p className="mt-0.5 truncate text-xs text-muted-foreground">
                {candidate.school} · {candidate.major} · {candidate.grade}
              </p>
            </div>
            {analysis && (
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${recMap[analysis.recommendation_level].cls}`}
              >
                {recMap[analysis.recommendation_level].label}
              </span>
            )}
          </div>
        </div>

        {/* scroll body */}
        <div className="flex-1 space-y-4 overflow-y-auto px-5 py-4">
          {!analysis ? (
            <div>
              <SectionTitle icon={CheckCircle2} tone="success">
                通过关键词筛选
              </SectionTitle>
              <p className="mt-2 rounded-xl border border-success/30 bg-success/5 p-3 text-xs leading-relaxed text-foreground/80">
                该候选人符合所有关键词规则。璞见不针对已通过的候选人输出 AI 解释，
                建议直接进入常规面试流程。
              </p>
              <div className="mt-4">
                <SectionTitle icon={MessageSquareQuote}>简历原文</SectionTitle>
                <pre className="mt-2 whitespace-pre-wrap rounded-xl border border-border bg-muted/40 p-3 text-xs leading-relaxed text-foreground/80">
                  {candidate.resume}
                </pre>
              </div>
            </div>
          ) : (
            <>
              <div>
                <SectionTitle icon={AlertTriangle} tone="muted">
                  为什么被关键词漏掉？
                </SectionTitle>
                <p className="mt-2 rounded-xl border border-border bg-muted/40 p-3 text-xs leading-relaxed text-foreground/80">
                  {analysis.why_missed_by_keywords}
                </p>
              </div>

              <div>
                <SectionTitle icon={Sparkles} tone="accent">
                  为什么值得复核？
                </SectionTitle>
                <p className="mt-2 rounded-xl border border-accent/30 bg-accent-soft/60 p-3 text-xs leading-relaxed text-foreground/80">
                  {analysis.recommendation_reason}
                </p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {analysis.capability_evidence
                    .filter((e) => e.confidence !== "low")
                    .map((e) => (
                      <li
                        key={e.capability}
                        className="inline-flex items-center gap-1 rounded-md bg-success/10 px-2 py-0.5 text-[11px] font-medium text-success"
                      >
                        <CheckCircle2 className="h-3 w-3" />
                        {e.capability}
                      </li>
                    ))}
                </ul>
              </div>

              <div>
                <SectionTitle icon={MessageSquareQuote}>能力证据</SectionTitle>
                <div className="mt-2 space-y-2">
                  {analysis.capability_evidence.map((e, i) => {
                    const c = confMap[e.confidence];
                    return (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-card p-3"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-semibold text-foreground">
                            {e.capability}
                          </span>
                          <span
                            className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${c.cls}`}
                          >
                            置信度 {c.label}
                          </span>
                        </div>
                        <blockquote className="mt-1.5 border-l-2 border-primary/40 bg-primary/[0.04] px-2.5 py-1.5 text-[11px] leading-relaxed text-foreground/80">
                          <mark className="bg-accent/30 px-0.5 text-foreground">
                            {e.evidence_from_resume}
                          </mark>
                        </blockquote>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <SectionTitle icon={AlertTriangle} tone="warning">
                  风险点
                </SectionTitle>
                <ul className="mt-2 space-y-1.5">
                  {analysis.risks.map((r, i) => (
                    <li
                      key={i}
                      className="flex gap-2 rounded-xl border border-warning/30 bg-warning/5 p-2.5 text-[11px] leading-relaxed text-foreground/80"
                    >
                      <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <SectionTitle icon={MessageSquareQuote}>面试追问</SectionTitle>
                <ol className="mt-2 space-y-2">
                  {analysis.interview_questions.map((q, i) => (
                    <li
                      key={i}
                      className="group flex items-start gap-2 rounded-xl border border-border bg-card p-2.5 text-[11px] leading-relaxed text-foreground"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-primary/10 font-mono text-[10px] font-semibold text-primary">
                        {i + 1}
                      </span>
                      <span className="flex-1">{q}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(q);
                          toast.success("追问已复制");
                        }}
                        className="opacity-50 transition hover:opacity-100"
                        aria-label="复制追问"
                      >
                        <Copy className="h-3 w-3 text-muted-foreground" />
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          )}
        </div>

        {/* footer actions */}
        <div className="border-t border-border/60 bg-card px-5 py-3">
          <div className="flex gap-2">
            <Button
              size="sm"
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => onJoin(candidate.id)}
            >
              加入面试池
            </Button>
            <Button size="sm" variant="outline" onClick={() => onSkip(candidate.id)}>
              跳过
            </Button>
            {analysis && (
              <Button size="sm" variant="outline" onClick={copyAll} aria-label="复制完整分析">
                <Copy className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </PanelShell>
  );
}

function PanelShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-[640px] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elegant">
      {children}
    </div>
  );
}

function EmptyState({ stage }: { stage: 0 | 1 | 2 | 3 }) {
  return (
    <div className="grid h-full place-items-center px-6 py-10 text-center">
      <div>
        <div className="mx-auto mb-3 grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
          <Radar className="h-5 w-5" />
        </div>
        <h3 className="text-sm font-semibold text-foreground">AI 解释卡</h3>
        <p className="mx-auto mt-1 max-w-[240px] text-xs text-muted-foreground">
          {stage < 2
            ? "先运行传统关键词筛选，看看哪些人会被规则漏掉。"
            : "现在启动潜力雷达，让 AI 反推岗位能力画像并找回被漏筛的高潜候选人。"}
        </p>
      </div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  children,
  tone = "primary",
}: {
  icon: typeof Sparkles;
  children: React.ReactNode;
  tone?: "primary" | "muted" | "warning" | "success" | "accent";
}) {
  const color =
    tone === "warning"
      ? "text-warning"
      : tone === "success"
        ? "text-success"
        : tone === "muted"
          ? "text-muted-foreground"
          : tone === "accent"
            ? "text-accent-foreground"
            : "text-primary";
  return (
    <h4 className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider ${color}`}>
      <Icon className="h-3.5 w-3.5" />
      {children}
    </h4>
  );
}