import { useState } from "react";
import { ChevronDown, MapPin, Users, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { JobDescription } from "./types";

export function JDCard({ jd }: { jd: JobDescription }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-elegant">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge className="mb-2 border-primary/20 bg-primary/10 text-primary hover:bg-primary/10">
            正在招聘
          </Badge>
          <h2 className="text-xl font-semibold text-foreground">{jd.title}</h2>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" />{jd.team}</span>
            <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{jd.location}</span>
            <span className="inline-flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" />{jd.type}</span>
          </div>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-foreground/80">{jd.summary}</p>

      {open && (
        <pre className="mt-3 max-h-72 overflow-auto whitespace-pre-wrap rounded-lg border border-border bg-muted/40 p-4 text-xs leading-relaxed text-foreground/80">
          {jd.fullJD}
        </pre>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
      >
        <ChevronDown className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`} />
        {open ? "收起完整 JD" : "查看完整 JD"}
      </button>

      <div className="mt-5 border-t border-border/60 pt-4">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            当前关键词筛选规则
          </h3>
          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
            编辑规则
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {jd.keywords.map((k) => (
            <span
              key={k}
              className="rounded-md border border-border bg-muted/50 px-2 py-1 text-xs text-foreground/70"
            >
              {k}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}