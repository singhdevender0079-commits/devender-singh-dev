import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { pricingPlans, type PricingPlan } from "@/data/pricing";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function scrollTo(id: string) {
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function PricingCard({ plan, index }: { plan: PricingPlan; index: number }) {
  const reduced = useReducedMotion();
  const isPopular = plan.badge.length > 0;

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <motion.article
        {...(reduced ? {} : { whileHover: { y: -6 } as const })}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={`surface-card relative flex h-full flex-col overflow-hidden p-7 sm:p-8 ${
          isPopular
            ? "border-primary/50 ring-1 ring-primary/30 shadow-[var(--shadow-glow)]"
            : "ring-1 ring-transparent"
        }`}
      >
        {/* Decorative glow for the popular plan */}
        {isPopular ? (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 38%, transparent), transparent 70%)",
            }}
          />
        ) : null}

        {/* Badge */}
        {isPopular ? (
          <span
            className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground"
            style={{ backgroundImage: "var(--gradient-signal)" }}
          >
            <Sparkles className="size-3.5" aria-hidden="true" />
            {plan.badge}
          </span>
        ) : null}

        <div className="relative">
          <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>
          <p className="mt-3 font-mono text-[12px] leading-relaxed text-muted-foreground/80">
            {plan.audience}
          </p>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              {plan.priceNote}
            </span>
            <span className="text-4xl font-bold tracking-tight text-foreground">
              {plan.price}
            </span>
          </div>

          {/* Features */}
          <ul className="mt-6 space-y-2.5">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 text-sm text-muted-foreground"
              >
                <span
                  className={`mt-0.5 grid size-4 shrink-0 place-items-center rounded-full ${
                    isPopular ? "bg-primary/20 text-primary" : "bg-primary/12 text-primary"
                  }`}
                >
                  <Check className="size-3" aria-hidden="true" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="mt-auto pt-7">
          <button
            onClick={() => scrollTo("contact")}
            className={`group/btn inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
              isPopular
                ? "text-primary-foreground shadow-[var(--shadow-glow)] hover:brightness-110"
                : "border border-border bg-card/60 text-foreground hover:border-primary/50 hover:text-primary"
            }`}
            {...(isPopular
              ? { style: { backgroundImage: "var(--gradient-signal)" } as const }
              : {})}
          >
            {plan.buttonText}
            <ArrowRight
              className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </motion.article>
    </Reveal>
  );
}

export function Pricing() {
  return (
    <section
      id="pricing"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        eyebrow="04 / Pricing"
        title="Pricing & packages"
        description="Transparent, flexible packages for portfolios, business websites and full-stack web applications. Pick a plan or request a custom quote."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:items-stretch">
        {pricingPlans.map((plan, index) => (
          <PricingCard key={plan.name} plan={plan} index={index} />
        ))}
      </div>

      {/* Custom project option */}
      <Reveal className="mt-8" delay={0.1}>
        <div className="glass-panel relative overflow-hidden rounded-3xl border border-primary/20 p-8 sm:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -left-20 -bottom-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 35%, transparent), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Need Something Custom?
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Every project is different. If your requirements don't fit these
                packages, contact me and I'll provide a custom quote based on your
                project requirements.
              </p>
            </div>
            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
              style={{ backgroundImage: "var(--gradient-signal)" }}
            >
              Get Custom Quote
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
