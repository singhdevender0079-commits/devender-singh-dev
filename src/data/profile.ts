/**
 * Central profile configuration.
 * Edit anything here to update the whole site — no component changes needed.
 */

export const profile = {
  name: "Devender Singh",
  headline: "Full Stack Web Developer | JavaScript Developer | Future Software Engineer",
  roles: [
    "Full Stack Web Developer",
    "Freelance Web Developer",
    "Portfolio Website Developer",
    "Full Stack Application Developer",
    "JavaScript Developer",
  ],
  intro:
    "Full stack web developer and freelancer building modern, responsive, and scalable web applications — from developer portfolios to full-stack platforms with clean UI, powerful backends, and practical problem-solving.",
  about:
    "I am a BTech Computer Science student and developer passionate about web development, backend development and problem solving.",
  tagline: "Building ideas into modern digital experiences.",
  location: "Jaipur, India",
  availability: "Open to internships & SDE opportunities",
  email: "singhdevender0079@gmail.com",
  // Replace these placeholder URLs with your real profiles.
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://x.com/yourusername",
    // Centralized Fiverr profile URL — replace "yourusername" with your real Fiverr username.
    fiverr: "https://www.fiverr.com/yourusername",
  },
} as const;

export const stats = [
  { label: "Projects Built", value: "12+" },
  { label: "Technologies Learned", value: "15+" },
  { label: "Problems Solved", value: "250+" },
  { label: "Learning Journey", value: "2+ yrs" },
] as const;

export const focusAreas = [
  "Data Structures & Algorithms",
  "Full Stack Development",
  "Backend Development",
  "Software Engineering",
] as const;

export const coreStack = [
  "HTML",
  "CSS",
  "JavaScript",
  "Node.js",
  "Express.js",
  "EJS",
  "MongoDB",
  "MySQL",
  "Git",
  "GitHub",
] as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;
