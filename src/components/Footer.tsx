import { profile, navItems } from "@/data/profile";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
  const go = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <footer className="border-t border-border bg-surface/60">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <p className="font-display text-xl font-semibold text-foreground">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{profile.tagline}</p>
          <SocialLinks className="mt-6" />
        </div>

        <nav aria-label="Footer" className="lg:justify-self-end">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Navigate
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => go(item.id)}
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 {profile.name}. All rights reserved.</p>
          <p className="font-mono">Built with React, TypeScript &amp; Three.js</p>
        </div>
      </div>
    </footer>
  );
}
