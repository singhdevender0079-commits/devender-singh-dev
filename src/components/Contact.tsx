import { useState, type FormEvent } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Send } from "lucide-react";
import { profile } from "@/data/profile";
import { contactSchema, sendContactMessage } from "@/lib/contact.functions";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks } from "./SocialLinks";

type Status = "idle" | "sending" | "success" | "error";

const fields = [
  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
  { name: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { name: "subject", label: "Subject", type: "text", placeholder: "What's this about?" },
] as const;

export function Contact() {
  const submit = useServerFn(sendContactMessage);
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setStatus("error");
      setFeedback("Please fix the highlighted fields and try again.");
      return;
    }

    setErrors({});
    setStatus("sending");
    setFeedback("");

    try {
      await submit({ data: parsed.data });
      setStatus("success");
      setFeedback("Message sent successfully! I'll get back to you soon.");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong. Please email me directly instead.",
      );
    }
  }

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 border-t border-border bg-surface/50 py-20 lg:py-28"
    >
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="05 / Contact"
          title="Let's build something together"
          description="Have an internship, project or opportunity in mind? Send a message and I'll reply as soon as I can."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="surface-card flex h-full flex-col gap-6 p-7">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Reach me directly</h3>
                <a
                  href={`mailto:${profile.email}`}
                  className="mt-4 inline-flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  <span className="break-all">{profile.email}</span>
                </a>
                <p className="mt-3 flex items-start gap-3 text-sm text-muted-foreground">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                  {profile.location}
                </p>
              </div>

              <div className="mt-auto">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Elsewhere
                </p>
                <SocialLinks className="mt-3" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form onSubmit={onSubmit} noValidate className="surface-card p-7 sm:p-8">
              <div className="grid gap-5 sm:grid-cols-2">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className={field.name === "subject" ? "sm:col-span-2" : ""}
                  >
                    <label
                      htmlFor={field.name}
                      className="text-sm font-medium text-foreground"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      aria-invalid={Boolean(errors[field.name])}
                      aria-describedby={
                        errors[field.name] ? `${field.name}-error` : undefined
                      }
                      className="mt-2 w-full rounded-xl border border-input bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                    />
                    {errors[field.name] ? (
                      <p
                        id={`${field.name}-error`}
                        className="mt-1.5 text-xs text-destructive"
                      >
                        {errors[field.name]}
                      </p>
                    ) : null}
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about the role, project or idea…"
                    aria-invalid={Boolean(errors["message"])}
                    aria-describedby={errors["message"] ? "message-error" : undefined}
                    className="mt-2 w-full resize-y rounded-xl border border-input bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                  />
                  {errors["message"] ? (
                    <p id="message-error" className="mt-1.5 text-xs text-destructive">
                      {errors["message"]}
                    </p>
                  ) : null}
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                style={{ backgroundImage: "var(--gradient-signal)" }}
              >
                {status === "sending" ? (
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Send className="size-4" aria-hidden="true" />
                )}
                {status === "sending" ? "Sending…" : "Send Message"}
              </button>

              <div aria-live="polite" className="mt-4 min-h-[1.5rem]">
                {feedback ? (
                  <p
                    className={`flex items-start gap-2 text-sm ${
                      status === "success" ? "text-primary" : "text-destructive"
                    }`}
                  >
                    {status === "success" ? (
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    ) : (
                      <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    )}
                    {feedback}
                  </p>
                ) : null}
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
