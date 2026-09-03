import { cn } from "@/lib/utils";
import { timeline } from "./data";
import { Reveal, SectionHeading } from "./Reveal";
import { useScrollProgress } from "@/hooks/use-reveal";

export function Timeline() {
  const { ref, progress } = useScrollProgress<HTMLDivElement>();

  return (
    <section id="experience" className="relative border-t border-border bg-background py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Experience & Education"
          title="The road so far"
          description="Roles, responsibilities and study — the line fills as you scroll."
        />

        <div ref={ref} className="relative mt-16 pl-10 md:pl-0">
          <div className="absolute left-3 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          <div
            className="absolute left-3 top-0 w-px bg-primary shadow-glow md:left-1/2 md:-translate-x-1/2"
            style={{ height: `${progress * 100}%` }}
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {timeline.map((item, i) => (
              <Reveal key={item.title + item.period} delay={60}>
                <div
                  className={cn(
                    "relative md:grid md:grid-cols-2 md:items-center md:gap-12",
                    i % 2 === 1 && "md:[&>*:first-child]:col-start-2",
                  )}
                >
                  <span className="absolute -left-[1.85rem] top-6 size-3.5 rounded-full border-2 border-primary bg-background shadow-glow md:left-1/2 md:-translate-x-1/2" />
                  <article
                    className={cn(
                      "group rounded-2xl border border-border bg-surface p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-card",
                      i % 2 === 1 ? "md:col-start-2" : "md:col-start-1 md:text-right",
                    )}
                  >
                    <span className="inline-block rounded-full bg-primary/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                      {item.kind}
                    </span>
                    <h3 className="mt-3 text-xl font-bold">{item.title}</h3>
                    <p className="mt-1 text-sm font-medium text-foreground">{item.org}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">
                      {item.period}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                  </article>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
