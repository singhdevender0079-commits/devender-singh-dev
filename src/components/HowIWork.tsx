import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ClipboardList,
  Code2,
  MessagesSquare,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { processSteps, type ProcessStep } from "@/data/process";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  MessagesSquare,
  ClipboardList,
  Code2,
  Rocket,
};

function StepCard({ step, index }: { step: ProcessStep; index: number }) {
  const reduced = useReducedMotion();
  const Icon = iconMap[step.icon] ?? Code2;

  return (
    <Reveal delay={index * 0.1} className="relative h-full">
      <motion.article
        {...(reduced ? {} : { whileHover: { y: -6 } as const })}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="surface-card group relative flex h-full flex-col"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-4 font-mono text-4xl font-bold text-primary/15 transition-colors duration-300 group-hover:text-primary/25"
        >
          {step.number}
        </span>
        <span className="grid size-12 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25 transition-colors duration-300 group-hover:bg-primary/20">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <p className="mt-5 font-mono text-xs uppercase tracking-[0.28em] text-accent">
          Step {step.number}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </motion.article>
    </Reveal>
  );
}

export function HowIWork() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 85%", "end 55%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const scaleX = useTransform(progress, (v) => (reduced ? 1 : v));
  const scaleY = scaleX;

  return (
    <section
      id="process"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        eyebrow="How I Work"
        title="A clear, structured development process"
        description="From the first conversation to final delivery — a simple process that keeps your project transparent, organized and on track."
      />

      <div ref={trackRef} className="relative mt-14">
        {/* Desktop horizontal progress line */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-6 hidden h-px bg-border lg:block"
        >
          <motion.div
            className="h-full origin-left"
            style={{ scaleX, backgroundImage: "var(--gradient-signal)" }}
          />
        </div>

        {/* Mobile vertical progress line */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-[7px] top-0 w-px bg-border lg:hidden"
        >
          <motion.div
            className="h-full w-full origin-top"
            style={{ scaleY, backgroundImage: "var(--gradient-signal)" }}
          />
        </div>

        <ol className="grid gap-6 pl-8 lg:grid-cols-4 lg:gap-5 lg:pl-0 lg:pt-14">
          {processSteps.map((step, index) => (
            <li key={step.number} className="relative">
              <span
                aria-hidden="true"
                className="absolute size-[15px] rounded-full border-2 border-primary bg-background max-lg:-left-8 max-lg:top-6 lg:left-0 lg:-top-10"
                style={{ boxShadow: "var(--shadow-glow)" }}
              />
              <StepCard step={step} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
