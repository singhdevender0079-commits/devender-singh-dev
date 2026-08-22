import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { profile } from "@/data/profile";

const links = [
  { label: "GitHub", href: profile.socials.github, Icon: Github },
  { label: "LinkedIn", href: profile.socials.linkedin, Icon: Linkedin },
  { label: "Twitter / X", href: profile.socials.twitter, Icon: Twitter },
  { label: "Email", href: `mailto:${profile.email}`, Icon: Mail },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <ul className={`flex items-center gap-2 ${className}`}>
      {links.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            aria-label={label}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noreferrer noopener"
            className="group inline-flex size-11 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          >
            <Icon className="size-[18px] transition-transform duration-300 group-hover:scale-110" />
          </a>
        </li>
      ))}
    </ul>
  );
}
