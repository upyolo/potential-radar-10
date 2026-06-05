import type { ReactNode } from "react";
import { Radar } from "lucide-react";

export function Header({
  flow,
  actions,
}: {
  flow?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="relative grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-elegant">
            <Radar className="h-5 w-5" />
            <span className="absolute inset-0 rounded-2xl ring-1 ring-primary-glow/40" />
          </div>
          <div className="leading-tight">
            <div className="flex items-baseline gap-2">
              <h1 className="text-lg font-semibold tracking-tight text-foreground">璞见</h1>
              <span className="text-xs font-medium text-muted-foreground">TruePotential</span>
            </div>
            <p className="text-[11px] font-medium text-primary">See People, Not Just Keywords.</p>
          </div>
        </div>

        {flow && <div className="order-3 w-full md:order-2 md:w-auto md:flex-1 md:px-6">{flow}</div>}

        <div className="order-2 flex items-center gap-2 md:order-3">{actions}</div>
      </div>
    </header>
  );
}