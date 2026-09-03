import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems, profile } from "./data";
import { useActiveSection } from "@/hooks/use-reveal";

const ids = navItems.map((n) => n.id);

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:flex md:justify-between">
        <a
          href="#home"
          className="min-w-0 truncate font-display text-lg font-bold tracking-tight"
        >
          {profile.shortName}
          <span className="text-primary">.</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                active === item.id && "text-foreground",
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300",
                  active === item.id && "scale-x-100",
                )}
              />
            </a>
          ))}
          <a
            href="/resume.pdf"
            download="Sabir_Shaikh_Resume.pdf"
            className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-primary/50 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/20 hover:border-primary"
          >
            <Download className="size-3.5" />
            Resume
          </a>
          <a
            href="#contact"
            className="ml-2 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:-translate-y-0.5"
          >
            Hire Me
          </a>
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="shrink-0 rounded-md border border-border bg-surface p-2 text-foreground transition-colors hover:border-primary md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "grid overflow-hidden border-border bg-background/95 backdrop-blur-xl transition-all duration-400 md:hidden",
          open ? "max-h-96 border-t opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setOpen(false)}
              className={cn(
                "rounded-md px-3 py-3 text-base font-medium text-muted-foreground transition-colors",
                active === item.id && "bg-surface text-primary",
              )}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download="Sabir_Shaikh_Resume.pdf"
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-3 py-3 text-center text-base font-semibold text-primary"
          >
            <Download className="size-4" />
            Download Resume
          </a>
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-md bg-primary px-3 py-3 text-center text-base font-semibold text-primary-foreground"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
}
