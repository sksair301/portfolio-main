import { skills } from "./data";
import { Reveal, SectionHeading } from "./Reveal";
import { useReveal } from "@/hooks/use-reveal";

function SkillBar({ name, level, delay }: { name: string; level: number; delay: number }) {
  const { ref, visible } = useReveal(0.4);
  return (
    <div ref={ref} className="group">
      <div className="flex items-baseline justify-between gap-3">
        <span className="min-w-0 truncate font-display text-sm font-semibold text-foreground sm:text-base">
          {name}
        </span>
        <span className="shrink-0 text-xs font-semibold text-primary">{level}%</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-1000 ease-out group-hover:shadow-glow"
          style={{ width: visible ? `${level}%` : "0%", transitionDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative border-t border-border py-24 md:py-32">
      <div className="absolute inset-0 grid-lines opacity-[0.08]" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="My Skills"
          title="The stack I reach for"
          description="Backend-leaning full stack: Laravel and MySQL at the core, modern front-end around it."
        />

        <div className="mt-14 grid gap-x-12 gap-y-7 md:grid-cols-2">
          {skills.map((s, i) => (
            <SkillBar key={s.name} name={s.name} level={s.level} delay={i * 60} />
          ))}
        </div>

        <Reveal className="mt-14 overflow-hidden rounded-xl border border-border bg-surface py-4">
          <div className="flex w-max animate-marquee gap-10 pr-10">
            {[...Array(2)].map((_, dup) => (
              <div key={dup} className="flex gap-10">
                {["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind", "REST API", "Git", "Livewire", "Alpine.js"].map(
                  (t) => (
                    <span
                      key={t + dup}
                      className="font-display text-lg font-semibold uppercase tracking-widest text-muted-foreground"
                    >
                      {t} <span className="text-primary">•</span>
                    </span>
                  ),
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
