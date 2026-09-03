import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { profile } from "./data";

const icons = { github: Github, linkedin: Linkedin, instagram: Instagram, mail: Mail } as const;

export function SocialBar() {
  return (
    <div className="pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <ul className="pointer-events-auto flex flex-col items-center gap-4">
        {profile.socials.map((s, i) => {
          const Icon = icons[s.icon as keyof typeof icons];
          return (
            <li key={s.label} style={{ animationDelay: `${900 + i * 120}ms` }} className="animate-fade-up">
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-glow"
              >
                <Icon className="size-4" />
              </a>
            </li>
          );
        })}
        <li className="mt-2 h-20 w-px bg-gradient-to-b from-primary to-transparent" />
      </ul>
    </div>
  );
}

export function SocialRow() {
  return (
    <ul className="flex items-center gap-3">
      {profile.socials.map((s) => {
        const Icon = icons[s.icon as keyof typeof icons];
        return (
          <li key={s.label}>
            <a
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={s.label}
              className="grid size-11 place-items-center rounded-full border border-border bg-surface text-muted-foreground transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <Icon className="size-4" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
