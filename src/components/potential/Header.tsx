import { Radar, Wifi } from "lucide-react";

export function Header({ mode }: { mode: "live" | "cached" | "offline" }) {
  const modeText =
    mode === "live" ? "在线模型" : mode === "cached" ? "缓存兜底" : "Offline Demo";
  const modeColor =
    mode === "live"
      ? "bg-success/15 text-success border-success/30"
      : mode === "cached"
        ? "bg-warning/15 text-warning border-warning/40"
        : "bg-muted text-muted-foreground border-border";

  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground shadow-elegant">
            <Radar className="h-5 w-5" />
            <span className="absolute inset-0 rounded-xl ring-1 ring-primary-glow/40" />
          </div>
          <div className="leading-tight">
            <div className="flex items-baseline gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-foreground">璞见</h1>
              <span className="text-xs text-muted-foreground">Potential Radar</span>
            </div>
            <p className="text-xs text-muted-foreground">看见关键词之外的真实潜力</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${modeColor}`}
          >
            <Wifi className="h-3 w-3" />
            {modeText}
          </span>
        </div>
      </div>
    </header>
  );
}