# Devender Singh — Developer Portfolio

A premium, single-page developer portfolio with a dark/light theme, subtle glass and glow accents, an interactive 3D developer scene in the hero, and a working contact form that emails you.

## Sections (in order)

1. Sticky glass navbar — Home, About, Skills, Projects, Experience, Contact + "Let's Talk" button, active-section indicator, animated mobile hamburger menu, theme toggle.
2. Hero — "Hi, I'm Devender Singh", Typed.js role cycling (Full Stack Web Developer, JavaScript Developer, Backend Developer, Problem Solver, Future Software Engineer), intro line, "View My Projects" / "Contact Me" buttons, social icons.
3. Interactive 3D scene — a lightweight stylized developer-at-desk scene built in code with React Three Fiber: idle float, subtle mouse-follow tilt, smooth camera easing, loading skeleton, and a 2D illustrated fallback if WebGL is unavailable. Loads only on the client and lazily. Structured so a `/public/models/devender.glb` can be dropped in later (documented in the README).
4. About — "Who I Am" copy, technology list, growth areas, and a 4-stat strip (Projects Built, Technologies Learned, Problems Solved, Learning Journey) with editable placeholder values.
5. Skills — categorized cards: Frontend, Backend, Database, Programming/DSA, Tools, with hover lift and badge animations.
6. Projects — featured project highlight, All / Frontend / Backend / Full Stack filter, 6 demo projects, tech badges, Live Demo + GitHub buttons, subtle image zoom on hover.
7. Experience — vertical timeline (2025, 2025–2026, 2026, Present).
8. Education — B.Tech CSE, Global Institute of Technology, Jaipur, in a clean card.
9. Contact — Name / Email / Subject / Message form with validation, success and error states, plus email and social links.
10. Footer — name, tagline, socials, © 2026.

Extras: scroll progress bar, back-to-top button, subtle desktop-only custom cursor, section reveal animations on scroll (restrained, not on every element).

## Contact form (Lovable Cloud + Resend)

- Enable Lovable Cloud (database + secure server-side code).
- A `contact_messages` table stores every submission so nothing is lost, with row-level security that allows public inserts only — nobody can read the messages from the browser.
- A server function validates input, saves the row, then sends the email to singhdevender0079@gmail.com via Resend. The API key lives in a server-side secret, never in browser code.
- Success message: "Message sent successfully! I'll get back to you soon." Failures show a clear, specific error.
- I'll ask you for a Resend API key when I build this step. Note: Resend only delivers to your own address until you verify a domain — I'll cover that in the README.

## Customization files

- `src/data/profile.ts` — name, headline, intro, email, social URLs (placeholders for GitHub/LinkedIn/X), stats.
- `src/data/projects.ts` — title, description, image, technologies, liveDemo, github, featured, category.
- `src/data/skills.ts`, `src/data/experience.ts`, `src/data/education.ts`.

Editing these changes the whole site; no component edits needed.

## Technical notes

- Stack is React + TypeScript + Tailwind v4 + Framer Motion on TanStack Start (this project's fixed router/framework). Three.js via React Three Fiber, Typed.js for the hero.
- Design tokens (dark-first palette, gradients, glow shadows, radii, display + body fonts) defined in `src/styles.css`; no hardcoded colors in components. Theme toggle persists to localStorage with a no-flash inline script.
- 3D scene and heavy sections are code-split and lazily mounted; motion respects `prefers-reduced-motion`.
- SEO: title "Devender Singh | Full Stack Web Developer", meta description, Open Graph and Twitter tags, JSON-LD Person schema, semantic landmarks, single H1, alt text, keyboard focus states, ARIA labels on icon buttons.
- Project images generated as lightweight placeholder screenshots under `src/assets/`, swappable via the data file.
- `.env.example` and a README covering install, run, build, replacing project links, swapping the 3D model, configuring email, changing social links, and deploying. Full source is exportable via GitHub / download from the Lovable project.

## Build order

1. Design tokens, fonts, theme toggle, layout shell + navbar + footer.
2. Data files, hero + Typed.js, 3D scene with fallback.
3. About, Skills, Projects (filtering), Experience, Education.
4. Enable Cloud, contact table + server function + Resend, wire the form.
5. Micro-interactions, responsive pass, accessibility/console/build check, README + `.env.example`.
