import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import heroPhoto from "@/assets/hero-dev.png";
import { profile } from "./data";
import { SocialRow } from "./SocialBar";

const roles = ["Full Stack Developer", "Laravel Engineer", "API Builder", "Problem Solver"];

function useTypedRole() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[index]!;
    const delay = deleting ? 45 : text === full ? 1600 : 80;
    const t = setTimeout(() => {
      if (!deleting && text === full) return setDeleting(true);
      if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
        return;
      }
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, index]);

  return text;
}

export function Hero() {
  const typed = useTypedRole();

  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 grid-lines opacity-[0.14]" />
      <div className="absolute -right-24 top-24 size-72 animate-pulse-glow rounded-full bg-primary/25 blur-3xl" />
      <div className="absolute left-1/4 bottom-0 size-56 animate-float rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr] lg:px-16">
        <div>
          <p
            className="animate-fade-up text-xs font-semibold uppercase tracking-[0.4em] text-primary"
            style={{ animationDelay: "120ms" }}
          >
            {profile.location}
          </p>
          <h1
            className="animate-reveal mt-5 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ animationDelay: "220ms" }}
          >
            Hi, I&apos;m <span className="text-gradient">{profile.name}</span>
          </h1>
          <p
            className="animate-fade-up mt-4 font-display text-xl font-semibold text-foreground sm:text-2xl md:text-3xl"
            style={{ animationDelay: "420ms" }}
          >
            <span className="text-primary">{typed}</span>
            <span className="ml-0.5 inline-block h-6 w-0.5 translate-y-0.5 animate-pulse bg-primary align-middle md:h-8" />
          </p>
          <p
            className="animate-fade-up mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base"
            style={{ animationDelay: "560ms" }}
          >
            {profile.tagline}
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "680ms" }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:-translate-y-1"
            >
              View My Work
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary hover:text-primary"
            >
              Contact Me
            </a>
          </div>

          <div
            className="animate-fade-up mt-10 lg:hidden"
            style={{ animationDelay: "800ms" }}
          >
            <SocialRow />
          </div>
        </div>

        <div className="relative animate-fade-up" style={{ animationDelay: "340ms" }}>
          <div className="absolute inset-x-6 bottom-6 top-10 rounded-[3rem] bg-primary/20 blur-2xl" />
          <div className="absolute inset-0 m-auto aspect-square max-w-sm animate-spin-slow rounded-full border border-dashed border-primary/30" />
          <img
            src={heroPhoto}
            alt={`${profile.name}, ${profile.role}`}
            width={912}
            height={1104}
            className="relative mx-auto w-full max-w-sm drop-shadow-[0_30px_60px_oklch(0_0_0/0.7)] lg:max-w-md"
          />
          <div className="absolute bottom-6 left-0 animate-float rounded-2xl border border-border bg-surface/90 px-4 py-3 backdrop-blur-md">
            <p className="font-display text-xl font-bold text-primary">3+</p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Years exp.
            </p>
          </div>
          <div
            className="absolute right-0 top-10 animate-float rounded-2xl border border-border bg-surface/90 px-4 py-3 backdrop-blur-md"
            style={{ animationDelay: "1.5s" }}
          >
            <p className="font-display text-xl font-bold text-primary">Laravel</p>
            <p className="text-[11px] uppercase tracking-widest text-muted-foreground">
              Main stack
            </p>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="relative mx-auto mt-14 flex w-fit flex-col items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-muted-foreground transition-colors hover:text-primary"
      >
        Scroll
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
