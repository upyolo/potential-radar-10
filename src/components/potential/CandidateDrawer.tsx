import { useState } from "react";
import { Copy, X, Sparkles, AlertTriangle, MessageSquare, FileText } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { Candidate, RediscoveredCandidate } from "./types";

type Tab = "evidence" | "reason" | "risks" | "questions";

const confidenceMap = {
  high: { label: "高", cls: "bg-success/15 text-success border-success/30" },
  medium: { label: "中", cls: "bg-primary/10 text-primary border-primary/30" },
  low: { label: "低", cls: "bg-muted text-muted-foreground border-border" },
};

export function CandidateDrawer({
  open,
  onOpenChange,
  candidate,
  analysis,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  candidate: Candidate | null;
  analysis: RediscoveredCandidate | null;
}) {
  const [tab, setTab] = useState<Tab>("evidence");

  if (!candidate) return null;

  const tabs: { id: Tab; label: string; icon: typeof FileText }[] = [
    { id: "evidence", label: "能力证据", icon: FileText },
    { id: "reason", label: "匹配理由", icon: Sparkles },
    { id: "risks", label: "风险提示", icon: AlertTriangle },
    { id: "questions", label: "面试追问", icon: MessageSquare },
  ];

  const copyAll = () => {
    if (!analysis) return;
    const text = `${candidate.alias} ${candidate.name}\n\n【匹配理由】\n${analysis.recommendation_reason}\n\n【漏筛原因】\n${analysis.why_missed_by_keywords}\n\n【能力证据】\n${analysis.capability_evidence.map((e) => `- ${e.capability}（${e.confidence}）：${e.evidence_from_resume}`).join("\n")}\n\n【风险】\n${analysis.risks.map((r) => `- ${r}`).join("\n")}\n\n【面试追问】\n${analysis.interview_questions.map((q, i) => `${i + 1}. ${q}`).join("\n")}`;
    navigator.clipboard.writeText(text);
    toast.success("已复制完整分析");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full overflow-y-auto p-0 sm:max-w-[560px]">
        <div className="sticky top-0 z-10 border-b border-border bg-background/85 px-6 py-4 backdrop-blur">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-muted-foreground">{candidate.alias}</span>
                <span className="text-base font-semibold text-foreground">{candidate.name}</span>
                {analysis && (
                  <span className="rounded-md bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">
                    AI 建议复核
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {candidate.school} · {candidate.major} · {candidate.grade}
              </p>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-md p-1 text-muted-foreground hover:bg-muted"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {analysis && (
            <div className="mt-4 flex gap-1 rounded-lg border border-border bg-muted/40 p-1">
              {tabs.map((t) => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition ${
                      active
                        ? "bg-card text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {t.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="px-6 py-5">
          {!analysis ? (
            <div>
              <h4 className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                简历原文
              </h4>
              <pre className="whitespace-pre-wrap rounded-xl border border-border bg-muted/40 p-4 text-xs leading-relaxed text-foreground/80">
                {candidate.resume}
              </pre>
            </div>
          ) : tab === "evidence" ? (
            <div className="space-y-3">
              {analysis.capability_evidence.map((e, i) => {
                const conf = confidenceMap[e.confidence];
                return (
                  <div
                    key={i}
                    className="rounded-xl border border-border bg-card p-3.5 shadow-elegant"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-semibold text-foreground">{e.capability}</span>
                      <span
                        className={`rounded-md border px-1.5 py-0.5 text-[10px] font-medium ${conf.cls}`}
                      >
                        置信度 {conf.label}
                      </span>
                    </div>
                    <blockquote className="mt-2 border-l-2 border-primary/40 bg-primary/[0.04] px-3 py-2 text-xs leading-relaxed text-foreground/80">
                      <mark className="bg-accent/30 px-0.5 text-foreground">
                        {e.evidence_from_resume}
                      </mark>
                    </blockquote>
                  </div>
                );
              })}
            </div>
          ) : tab === "reason" ? (
            <div className="space-y-3">
              <Block title="为什么 AI 建议复核">{analysis.recommendation_reason}</Block>
              <Block title="为什么被关键词漏筛" tone="muted">
                {analysis.why_missed_by_keywords}
              </Block>
            </div>
          ) : tab === "risks" ? (
            <ul className="space-y-2">
              {analysis.risks.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-2 rounded-xl border border-warning/30 bg-warning/5 p-3 text-xs text-foreground/80"
                >
                  <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                  {r}
                </li>
              ))}
            </ul>
          ) : (
            <ol className="space-y-2">
              {analysis.interview_questions.map((q, i) => (
                <li
                  key={i}
                  className="group flex items-start gap-3 rounded-xl border border-border bg-card p-3 text-xs text-foreground"
                >
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/10 font-mono text-[11px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  <span className="flex-1 leading-relaxed">{q}</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(q);
                      toast.success("追问已复制");
                    }}
                    className="opacity-60 transition hover:opacity-100"
                    aria-label="复制"
                  >
                    <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ol>
          )}
        </div>

        <div className="sticky bottom-0 flex gap-2 border-t border-border bg-background/85 px-6 py-3 backdrop-blur">
          <Button
            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => {
              toast.success(`已将 ${candidate.alias} 加入面试池`);
              onOpenChange(false);
            }}
          >
            加入面试池
          </Button>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            跳过
          </Button>
          {analysis && (
            <Button variant="outline" onClick={copyAll}>
              <Copy className="mr-1 h-3.5 w-3.5" />
              复制
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Block({
  title,
  children,
  tone = "primary",
}: {
  title: string;
  children: React.ReactNode;
  tone?: "primary" | "muted";
}) {
  return (
    <div
      className={`rounded-xl border p-3.5 ${
        tone === "primary" ? "border-primary/20 bg-primary/5" : "border-border bg-muted/40"
      }`}
    >
      <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
        {title}
      </div>
      <p className="text-xs leading-relaxed text-foreground/85">{children}</p>
    </div>
  );
}
