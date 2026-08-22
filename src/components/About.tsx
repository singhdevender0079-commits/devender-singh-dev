import { CheckCircle2 } from "lucide-react";
import { coreStack, focusAreas, profile, stats } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading
        eyebrow="01 / About"
        title="Who I Am"
        description={profile.about}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <Reveal className="surface-card p-7 sm:p-9">
          <h3 className="text-lg font-semibold text-foreground">Technologies I work with</h3>
          <ul className="mt-5 flex flex-wrap gap-2">
            {coreStack.map((tech) => (
              <li
                key={tech}
                className="rounded-lg border border-border bg-secondary/60 px-3 py-1.5 font-mono text-xs text-secondary-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {tech}
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-lg font-semibold text-foreground">
            Continuously improving
          </h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {focusAreas.map((area) => (
              <li key={area} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {area}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 0.08}>
              <div className="surface-card flex h-full flex-col justify-center p-6">
                <p className="font-display text-3xl font-semibold text-gradient sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
