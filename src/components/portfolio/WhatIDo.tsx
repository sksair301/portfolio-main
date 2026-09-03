import { PenTool, Code2, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { services } from "./data";
import { SectionHeading } from "./Reveal";
import { useScrollProgress } from "@/hooks/use-reveal";

const icons = [PenTool, Code2, Rocket];

export function WhatIDo() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();
  const activeIndex = Math.min(services.length - 1, Math.floor(progress * services.length * 0.99));

  return (
    <section id="services" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="What I Do"
          title="Design → Develop → Deploy"
          description="Scroll through the path — each stage takes over as you move down the page."
        />

        <div ref={ref} className="relative mt-16">
          {/* dotted connecting path */}
          <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 border-l-2 border-dotted border-border md:block" />
          <div
            className="pointer-events-none absolute left-1/2 top-0 hidden w-px -translate-x-1/2 bg-primary md:block"
            style={{ height: `${progress * 100}%` }}
          />

          <div className="flex flex-col gap-8 md:gap-14">
            {services.map((service, i) => {
              const Icon = icons[i]!;
              const isActive = i === activeIndex;
              return (
                <div
                  key={service.id}
                  className={cn(
                    "md:w-[calc(50%-3rem)]",
                    i % 2 === 1 ? "md:ml-auto" : "",
                    i === 1 ? "md:mt-4" : "",
                  )}
                >
                  <article
                    className={cn(
                      "group relative overflow-hidden rounded-2xl border p-7 transition-all duration-500",
                      isActive
                        ? "-translate-y-1.5 border-primary bg-primary text-primary-foreground shadow-glow"
                        : "border-border bg-surface text-foreground hover:-translate-y-1 hover:border-primary/50",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute -right-4 -top-6 font-display text-7xl font-bold transition-opacity duration-500",
                        isActive ? "opacity-20" : "opacity-[0.07]",
                      )}
                    >
                      {service.kicker}
                    </span>
                    <div
                      className={cn(
                        "grid size-12 place-items-center rounded-xl transition-colors duration-500",
                        isActive ? "bg-primary-foreground/15" : "bg-primary/12 text-primary",
                      )}
                    >
                      <Icon className="size-6" />
                    </div>
                    <h3 className="mt-5 text-2xl font-bold">{service.title}</h3>
                    <p
                      className={cn(
                        "mt-3 text-sm leading-relaxed",
                        isActive ? "text-primary-foreground/85" : "text-muted-foreground",
                      )}
                    >
                      {service.body}
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {service.points.map((p) => (
                        <li
                          key={p}
                          className={cn(
                            "rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-500",
                            isActive
                              ? "border-primary-foreground/40 text-primary-foreground"
                              : "border-border text-muted-foreground",
                          )}
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
