import { useState } from "react";
import { ChevronDown, Radar as RadarIcon } from "lucide-react";
import { CapabilityRadar } from "./CapabilityRadar";
import type { AnalysisResult } from "./types";

export function CapabilityProfileBar({ profile }: { profile: AnalysisResult["job_profile"] }) {
  const [open, setOpen] = useState(false);
  const names = profile.required_capabilities.map((c) => c.name).join(" / ");
  return (
    <section className="rounded-2xl border border-border bg-card shadow-elegant">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 px-5 py-3 text-left"
      >
        <div className="flex min-w-0 items-center gap-2 text-xs">
          <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-primary/10 text-primary">
            <RadarIcon className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold text-foreground">岗位能力画像</span>
          <span className="hidden truncate text-muted-foreground sm:inline">
            岗位需要：{names}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="border-t border-border/60 p-5 animate-fade-up">
          <CapabilityRadar profile={profile} />
        </div>
      )}
    </section>
  );
}