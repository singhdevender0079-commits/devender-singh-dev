import { GraduationCap, MapPin } from "lucide-react";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Experience() {
  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        eyebrow="04 / Journey"
        title="How I got here"
        description="A short timeline of the path from first HTML page to full stack projects."
      />

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
        <ol className="relative space-y-8 border-l border-border pl-7">
          {experience.map((entry, index) => (
            <li key={entry.period} className="relative">
              <Reveal delay={index * 0.06}>
                <span
                  aria-hidden="true"
                  className="absolute -left-[35px] top-1.5 grid size-4 place-items-center rounded-full border border-primary/50 bg-background"
                >
                  <span className="size-1.5 rounded-full bg-primary" />
                </span>
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
                  {entry.period}
                </p>
                <h3 className="mt-2 text-lg font-semibold text-foreground">{entry.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {entry.description}
                </p>
                {entry.highlights ? (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="rounded-md border border-border bg-secondary/50 px-2 py-1 font-mono text-[11px] text-muted-foreground"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            </li>
          ))}
        </ol>

        <div id="education" className="scroll-mt-24 space-y-5">
          <Reveal>
            <h3 className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
              Education
            </h3>
          </Reveal>
          {education.map((entry, index) => (
            <Reveal key={entry.degree} delay={index * 0.08}>
              <article className="surface-card p-6">
                <div className="flex items-start gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                    <GraduationCap className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h4 className="text-base font-semibold text-foreground">{entry.degree}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{entry.institution}</p>
                    <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                      <span>{entry.period}</span>
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="size-3.5" aria-hidden="true" />
                        {entry.location}
                      </span>
                    </p>
                  </div>
                </div>
                <ul className="mt-5 space-y-2 border-t border-border pt-4 text-sm text-muted-foreground">
                  {entry.details.map((detail) => (
                    <li key={detail} className="flex gap-2">
                      <span className="text-primary" aria-hidden="true">
                        —
                      </span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
