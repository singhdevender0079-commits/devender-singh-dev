export type TimelineEntry = {
  period: string;
  title: string;
  description: string;
  highlights?: string[];
};

export const experience: TimelineEntry[] = [
  {
    period: "2025",
    title: "Started Web Development",
    description:
      "Began the journey into web development, building the first static pages and understanding how the web works.",
    highlights: ["Web fundamentals", "First projects"],
  },
  {
    period: "2025 – 2026",
    title: "Learned HTML, CSS and JavaScript",
    description:
      "Focused on the core frontend triad — semantic markup, responsive layouts and JavaScript logic with the DOM and APIs.",
    highlights: ["HTML", "CSS", "JavaScript", "Responsive Design"],
  },
  {
    period: "2026",
    title: "Started Backend Development",
    description:
      "Moved into server-side engineering and data: Node.js → Express.js → MongoDB → MySQL.",
    highlights: ["Node.js", "Express.js", "MongoDB", "MySQL"],
  },
  {
    period: "Present",
    title: "Building Full Stack Projects",
    description:
      "Shipping full stack applications end to end while sharpening Data Structures & Algorithms every day.",
    highlights: ["Full Stack", "DSA", "System thinking"],
  },
];
