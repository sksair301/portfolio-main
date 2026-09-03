import { useState } from "react";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { profile } from "./data";
import { Reveal, SectionHeading } from "./Reveal";
import { SocialRow } from "./SocialBar";

export function Contact() {
  const [sending, setSending] = useState(false);

  const details = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone}` },
    { icon: MapPin, label: "Location", value: profile.location, href: undefined },
  ];

  return (
    <section id="contact" className="relative border-t border-border py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-72 bg-hero-glow opacity-60" />
      <div className="relative mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact Me"
          title="Let's build something amazing together"
          description="Tell me about the project — I usually reply within a day."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal className="space-y-4">
            {details.map(({ icon: Icon, label, value, href }) => (
              <div
                key={label}
                className="flex items-start gap-4 rounded-xl border border-border bg-surface p-5 transition-colors duration-300 hover:border-primary/60"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                  <Icon className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      className="block truncate text-sm font-semibold text-foreground transition-colors hover:text-primary"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="truncate text-sm font-semibold text-foreground">{value}</p>
                  )}
                </div>
              </div>
            ))}
            <div className="pt-2">
              <SocialRow />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <form
              className="rounded-2xl border border-border bg-surface p-6 sm:p-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSending(true);
                const form = e.currentTarget;
                setTimeout(() => {
                  setSending(false);
                  form.reset();
                  toast.success("Message sent — thanks for reaching out!");
                }, 900);
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Name
                  </span>
                  <input
                    required
                    name="name"
                    placeholder="Your name"
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                </label>
                <label className="block sm:col-span-1">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Email
                  </span>
                  <input
                    required
                    type="email"
                    name="email"
                    placeholder="you@email.com"
                    className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Message
                  </span>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="What are we building?"
                    className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  />
                </label>
              </div>
              <button
                type="submit"
                disabled={sending}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-glow transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70 sm:w-auto"
              >
                {sending ? "Sending..." : "Send Message"}
                <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center">
        <p className="font-display text-sm font-bold">
          {profile.shortName}
          <span className="text-primary">.</span>
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. Built with care.
        </p>
      </div>
    </footer>
  );
}
