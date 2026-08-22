import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Check,
  Globe,
  Layers,
  RefreshCw,
  type LucideIcon,
} from "lucide-react";
import { profile } from "@/data/profile";
import { services, type Service } from "@/data/services";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Layers,
  Briefcase,
  RefreshCw,
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const reduced = useReducedMotion();
  const Icon = iconMap[service.icon] ?? Globe;

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <Reveal delay={index * 0.08}>
      <motion.article
        whileHover={reduced ? undefined : { y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="surface-card group flex h-full flex-col"
      >
        <div className="flex items-center gap-3">
          <span className="grid size-12 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25 transition-colors duration-300 group-hover:bg-primary/20">
            <Icon className="size-6" aria-hidden="true" />
          </span>
          <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {service.description}
        </p>

        <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-2 font-mono text-[12px] text-muted-foreground"
            >
              <Check className="size-3.5 shrink-0 text-primary" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <button
            onClick={() => scrollTo("contact")}
            className="group/btn inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            Get Started
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

export function Services() {
  return (
    <section
      id="services"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        eyebrow="03 / Services"
        title="Freelance services I offer"
        description="From developer portfolios to full-stack platforms — I build modern, responsive, and professional web experiences tailored to your idea."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>

      {/* Freelance CTA */}
      <Reveal className="mt-14">
        <div className="glass-panel relative overflow-hidden rounded-3xl border border-primary/20 p-8 sm:p-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--primary) 35%, transparent), transparent 70%)",
            }}
          />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h3 className="text-2xl font-semibold text-foreground sm:text-3xl">
                Need a Website? Let's Build It.
              </h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Have an idea for a website or web application? I can turn your idea into a
                modern, responsive and professional digital experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundImage: "var(--gradient-signal)" }}
              >
                Start a Project
                <ArrowRight className="size-4" aria-hidden="true" />
              </button>
              <a
                href={profile.socials.fiverr}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
              >
                Hire Me on Fiverr
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Fiverr card */}
      <Reveal className="mt-6" delay={0.1}>
        <div className="surface-card flex flex-col items-start gap-6 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary ring-1 ring-primary/25">
              <Briefcase className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
                Available for Freelance Projects
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                I also offer professional web development services through Fiverr. You can
                hire me to build portfolio websites, business websites and full-stack web
                applications.
              </p>
            </div>
          </div>
          <a
            href={profile.socials.fiverr}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5"
            style={{ backgroundImage: "var(--gradient-signal)" }}
          >
            View My Fiverr Profile
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
