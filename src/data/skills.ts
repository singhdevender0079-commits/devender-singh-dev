export type SkillCategory = {
  id: string;
  title: string;
  blurb: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Interfaces that stay fast, accessible and responsive.",
    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Responsive Design",
      "Tailwind CSS",
      "Bootstrap",
      "DOM Manipulation",
      "APIs",
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "Server logic, routing and REST services.",
    skills: ["Node.js", "Express.js", "REST APIs", "EJS"],
  },
  {
    id: "database",
    title: "Database",
    blurb: "Modelling and querying data reliably.",
    skills: ["MongoDB", "MySQL", "SQL"],
  },
  {
    id: "dsa",
    title: "Programming / DSA",
    blurb: "Core problem solving and language fundamentals.",
    skills: ["Java", "C", "C++", "Data Structures", "Algorithms"],
  },
  {
    id: "tools",
    title: "Tools",
    blurb: "The daily workflow that ships code.",
    skills: ["Git", "GitHub", "VS Code", "Postman", "npm"],
  },
];
