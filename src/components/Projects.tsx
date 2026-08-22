import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Star } from "lucide-react";
import { projectCategories, projects, type Project } from "@/data/projects";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function TechBadges({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-2">
      {items.map((tech) => (
        <li
          key={tech}
          className="rounded-md border border-border bg-background/70 px-2 py-1 font-mono text-[11px] text-muted-foreground"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <a
        href={project.liveDemo}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
      >
        <ExternalLink className="size-3.5" aria-hidden="true" />
        Live Demo
      </a>
      <a
        href={project.github}
        target="_blank"
        rel="noreferrer noopener"
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
      >
        <Github className="size-3.5" aria-hidden="true" />
        GitHub
      </a>
    </div>
  );
}

function FeaturedProject({ project }: { project: Project }) {
  return (
    <Reveal>
      <article className="surface-card group grid overflow-hidden lg:grid-cols-2">
        <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full">
          <img
            src={project.image}
            alt={`${project.title} interface preview`}
            width={1024}
            height={640}
            loading="lazy"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-background/85 px-3 py-1.5 font-mono text-[11px] font-medium text-primary backdrop-blur">
            <Star className="size-3.5 fill-current" aria-hidden="true" />
            Featured
          </span>
        </div>
        <div className="flex flex-col justify-center p-7 sm:p-9">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            {project.category}
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-foreground">{project.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <TechBadges items={project.technologies} />
          <ProjectLinks project={project} />
        </div>
      </article>
    </Reveal>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="surface-card group flex h-full flex-col overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} interface preview`}
          width={1024}
          height={640}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
          {project.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold text-foreground">{project.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <div className="mt-auto">
          <TechBadges items={project.technologies} />
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<(typeof projectCategories)[number]>("All");
  const featured = useMemo(() => projects.find((p) => p.featured), []);
  const rest = useMemo(() => projects.filter((p) => p !== featured), [featured]);
  const visible = useMemo(
    () => (filter === "All" ? rest : rest.filter((p) => p.category === filter)),
    [filter, rest],
  );

  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-20 sm:px-6 lg:py-28"
    >
      <SectionHeading
        eyebrow="03 / Projects"
        title="Things I've built"
        description="Applications built to solve real problems — from API-driven interfaces to full stack systems."
      />

      {featured ? (
        <div className="mt-12">
          <FeaturedProject project={featured} />
        </div>
      ) : null}

      <Reveal className="mt-10">
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="flex flex-wrap gap-2"
        >
          {projectCategories.map((category) => (
            <button
              key={category}
              role="tab"
              aria-selected={filter === category}
              onClick={() => setFilter(category)}
              className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                filter === category
                  ? "border-primary/60 bg-primary/12 text-primary"
                  : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">
          No projects in this category yet.
        </p>
      ) : null}
    </section>
  );
}
