import { Reveal, SectionHeading } from "./Reveal";
import { profile, stats } from "./data";

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="About Me"
          title="Turning ideas into shipped products"
          description={`${profile.role} focused on clean architecture, fast pages and interfaces that feel considered.`}
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal className="space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              I started with small PHP scripts and grew into building complete Laravel
              applications — auth, roles, payments, reporting and everything in between. I
              like owning a feature from database schema to the last hover state.
            </p>
            <p>
              My day-to-day is Laravel and MySQL on the back end, with JavaScript and
              Tailwind on the front. I care about readable code, sensible migrations and
              interfaces that stay quick on a mid-range Android phone.
            </p>
            <p>
              Outside client work I explore animation, performance budgets and better
              deployment habits — because a good product is one that keeps working after
              launch.
            </p>
            <div className="grid gap-3 pt-2 sm:grid-cols-2">
              {["Available for freelance", "Remote friendly", "Fast responder", "Long-term support"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground"
                  >
                    <span className="size-2 rounded-full bg-primary shadow-glow" />
                    {item}
                  </div>
                ),
              )}
            </div>
          </Reveal>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 110}>
                <div className="group h-full rounded-xl border border-border bg-surface p-6 transition-all duration-400 hover:-translate-y-1.5 hover:border-primary/60 hover:shadow-card">
                  <p className="font-display text-3xl font-bold text-primary transition-transform duration-400 group-hover:scale-105 sm:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-muted-foreground sm:text-sm">
                    {s.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
