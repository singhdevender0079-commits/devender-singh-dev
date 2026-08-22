import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { faqs } from "@/data/faq";
import { profile } from "@/data/profile";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function FAQ() {
  const reduced = useReducedMotion();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="mx-auto w-full max-w-3xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything clients usually want to know before starting a project."
        align="center"
      />

      <div className="mt-12 grid gap-3">
        {faqs.map((faq, index) => {
          const open = openIndex === index;
          const panelId = `faq-panel-${index}`;
          return (
            <Reveal key={faq.question} delay={index * 0.04}>
              <div className="surface-card !p-0 overflow-hidden">
                <h3>
                  <button
                    onClick={() => setOpenIndex(open ? null : index)}
                    aria-expanded={open}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-foreground transition-colors duration-300 hover:text-primary sm:text-base"
                  >
                    {faq.question}
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary ring-1 ring-primary/25"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      id={panelId}
                      initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-10" delay={0.1}>
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() =>
              document
                .getElementById("contact")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
            style={{ backgroundImage: "var(--gradient-signal)" }}
          >
            Contact Me
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <a
            href={profile.socials.fiverr}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            View Fiverr Profile
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
