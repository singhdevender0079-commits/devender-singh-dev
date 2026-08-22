import { Reveal } from "./Reveal";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, description, align = "left" }: Props) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-semibold text-foreground sm:text-4xl">{title}</h2>
      {description ? (
        <p
          className={`mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
