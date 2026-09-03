import { ExternalLink, Github } from "lucide-react";
import { projects } from "./data";
import { Reveal, SectionHeading } from "./Reveal";

const gradients = [
  "from-primary/30 via-primary/10 to-background",
  "from-primary/20 via-primary/5 to-background",
  "from-primary/25 via-primary/8 to-background",
];

const patterns = [
  "M10 10 L90 10 L90 90 L10 90 Z M30 30 L70 30 L70 70 L30 70 Z",
  "M50 10 L90 90 L10 90 Z",
  "M10 50 Q50 10 90 50 Q50 90 10 50 Z",
];

export function Projects() {
  return (
    <section id="projects" className="relative border-t border-border py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A few builds that show how I structure data, logic and interface."
        />

        <div className="mt-14 flex flex-col gap-8">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 80}>
              <article className="group grid overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-500 hover:border-primary/60 hover:shadow-card md:grid-cols-2">
                <div className={`relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br ${gradients[i % gradients.length]} md:h-auto ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  {/* Decorative SVG pattern */}
                  <svg className="absolute inset-0 h-full w-full opacity-10 transition-transform duration-700 ease-out group-hover:scale-110" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <path d={patterns[i % patterns.length]} fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
                    <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" className="text-primary" />
                    <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
                  </svg>
                  {/* Index badge + glow orb */}
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                      <span className="font-display text-2xl font-bold text-primary">{project.index}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface/80 via-transparent to-transparent" />
                  <span className="absolute left-5 top-5 rounded-full bg-primary px-3 py-1 font-display text-xs font-bold text-primary-foreground">
                    {project.index}
                  </span>
                </div>

                <div className="flex flex-col justify-center gap-4 p-7 md:p-10">
                  <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-primary md:text-3xl">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-1 flex flex-wrap gap-3">
                    <a
                      href={project.live}
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      <ExternalLink className="size-4" /> Live Demo
                    </a>
                    <a
                      href={project.code}
                      className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
                    >
                      <Github className="size-4" /> Code
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
