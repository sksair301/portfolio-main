import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { profile } from "./data";

export function Loader() {
  const [progress, setProgress] = useState(8);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tick = setInterval(() => {
      setProgress((p) => (p >= 100 ? 100 : Math.min(100, p + Math.random() * 22 + 8)));
    }, 160);
    return () => clearInterval(tick);
  }, []);

  useEffect(() => {
    if (progress < 100) return;
    const t = setTimeout(() => setDone(true), 520);
    return () => clearTimeout(t);
  }, [progress]);

  if (done) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex flex-col items-center justify-center bg-background transition-opacity duration-500",
        progress >= 100 && "pointer-events-none opacity-0",
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-hero-glow opacity-50" />
      <div className="relative flex flex-col items-center gap-6">
        <div className="relative grid h-24 w-24 place-items-center">
          <span className="absolute inset-0 animate-spin-slow rounded-full border border-dashed border-primary/60" />
          <span className="absolute inset-3 animate-pulse-glow rounded-full bg-primary/25 blur-md" />
          <span className="font-display text-2xl font-bold text-primary">
            {profile.shortName.slice(0, 2)}
          </span>
        </div>
        <div className="h-px w-56 overflow-hidden bg-border">
          <div
            className="h-full bg-primary transition-[width] duration-200 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.42em] text-muted-foreground">
          Loading {Math.round(Math.min(progress, 100))}%
        </p>
      </div>
    </div>
  );
}
