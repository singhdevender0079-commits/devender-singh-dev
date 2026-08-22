/**
 * Freelance services configuration.
 * Edit anything here to update the Services section — no component changes needed.
 */

export type Service = {
  icon: string;
  title: string;
  description: string;
  features: string[];
};

export const services: Service[] = [
  {
    icon: "Globe",
    title: "Portfolio Website",
    description:
      "Professional personal and developer portfolios that showcase your work with a fast, modern, and memorable online presence.",
    features: [
      "Responsive design",
      "Modern animations",
      "Contact forms",
      "SEO-friendly structure",
    ],
  },
  {
    icon: "Layers",
    title: "Full Stack Website / Web Application",
    description:
      "End-to-end web applications covering frontend, backend, and database — built to scale and tailored to your idea.",
    features: [
      "React / JavaScript",
      "Node.js + Express.js",
      "MongoDB / MySQL",
      "REST APIs",
    ],
  },
  {
    icon: "Briefcase",
    title: "Business Website",
    description:
      "Modern business websites, landing pages, and service pages that convert visitors into customers.",
    features: [
      "Landing & service pages",
      "Contact forms",
      "Mobile responsive design",
      "Clean, modern UI",
    ],
  },
  {
    icon: "RefreshCw",
    title: "Website Redesign",
    description:
      "Modernize old websites — improve UI/UX, make them responsive, and add smooth, modern interactions.",
    features: [
      "Modernize old websites",
      "Improve UI/UX",
      "Make responsive",
      "Modern animations & interactions",
    ],
  },
];
