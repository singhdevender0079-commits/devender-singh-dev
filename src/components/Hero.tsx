import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import Typed from "typed.js";
import { profile } from "@/data/profile";
import { CharacterStage } from "./CharacterStage";
import { SocialLinks } from "./SocialLinks";

function useTyped(target: React.RefObject<HTMLSpanElement | null>) {
  useEffect(() => {
    if (!target.current) return;
    const typed = new Typed(target.current, {
      strings: [...profile.roles],
      typeSpeed: 55,
      backSpeed: 28,
      backDelay: 1600,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, [target]);
}

export function Hero() {
  const typedRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  useTyped(typedRef);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <section id="home" className="relative overflow-hidden pt-28 lg:pt-32">
      <div aria-hidden="true" className="grid-backdrop pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 35%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-28">
        <motion.div
          initial={reduced ? { opacity: 0 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 font-mono text-xs text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {profile.availability}
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] text-foreground sm:text-5xl lg:text-6xl">
            Hi, I&apos;m <span className="text-gradient">Devender Singh</span>
          </h1>

          <p
            className="mt-4 flex min-h-[2.25rem] items-center font-mono text-lg text-muted-foreground sm:text-xl"
            aria-label={profile.headline}
          >
            <span className="mr-2 text-primary" aria-hidden="true">
              &gt;
            </span>
            <span ref={typedRef} aria-hidden="true" />
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.intro}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => scrollTo("projects")}
              className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundImage: "var(--gradient-signal)" }}
            >
              View My Projects
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
            >
              Contact Me
            </button>
          </div>

          <SocialLinks className="mt-8" />
        </motion.div>

      </div>

      <button
        onClick={() => scrollTo("about")}
        className="mx-auto mb-10 hidden items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-primary lg:flex"
        aria-label="Scroll to about section"
      >
        Scroll <ArrowDown className="size-3.5 animate-bounce" />
      </button>
    </section>
  );
}
