import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, Github } from "lucide-react";
import { caseStudies, type CaseStudy } from "@/data/caseStudies";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
        {label}
      </p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{value}</p>
    </div>
  );
}

function CaseStudyCard({ study, index }: { study: CaseStudy; index: number }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const panelId = `case-study-${study.id}`;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article className="surface-card group flex h-full flex-col overflow-hidden !p-0">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={study.image}
            alt={`${study.title} preview`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 to-transparent"
          />
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-lg font-semibold text-foreground">{study.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {study.summary}
          </p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {study.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-border bg-card/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-6">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls={panelId}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              {open ? "Hide Case Study" : "View Case Study"}
              <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <ChevronDown className="size-4" aria-hidden="true" />
              </motion.span>
            </button>
          </div>

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                id={panelId}
                key="panel"
                initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="mt-6 grid gap-4 border-t border-border pt-6">
                  <DetailBlock label="Problem" value={study.problem} />
                  <DetailBlock label="Approach" value={study.approach} />
                  <DetailBlock
                    label="Technologies"
                    value={study.technologies.join(" · ")}
                  />
                  <DetailBlock label="Solution" value={study.solution} />
                  <DetailBlock label="Result" value={study.result} />

                  <div className="mt-2 flex flex-wrap gap-3">
                    <a
                      href={study.liveDemo}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
                      style={{ backgroundImage: "var(--gradient-signal)" }}
                    >
                      Live Demo
                      <ArrowUpRight className="size-4" aria-hidden="true" />
                    </a>
                    <a
                      href={study.github}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-4 py-2.5 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
                    >
                      <Github className="size-4" aria-hidden="true" />
                      View GitHub
                    </a>
                  </div>
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </article>
    </Reveal>
  );
}

export function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        eyebrow="Case Studies"
        title="A closer look at how I solve problems"
        description="Selected projects broken down from problem to result — the thinking, the stack and the outcome."
      />

      <div className="mt-12 grid items-start gap-5 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={study.id} study={study} index={index} />
        ))}
      </div>
    </section>
  );
}
