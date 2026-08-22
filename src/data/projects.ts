import weatherImg from "@/assets/projects/weather.jpg";
import tasksImg from "@/assets/projects/tasks.jpg";
import collegeImg from "@/assets/projects/college.jpg";
import chatImg from "@/assets/projects/chat.jpg";
import currencyImg from "@/assets/projects/currency.jpg";
import fullstackImg from "@/assets/projects/fullstack.jpg";

export type ProjectCategory = "Frontend" | "Backend" | "Full Stack";

export type Project = {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveDemo: string;
  github: string;
  featured: boolean;
  category: ProjectCategory;
};

/**
 * Everything about the Projects section lives here.
 * Swap `image` for your own file (put it in src/assets/projects and import it,
 * or use a "/my-image.png" path from the public folder).
 */
export const projects: Project[] = [
  {
    title: "Weather Intelligence App",
    description:
      "A responsive weather application using APIs to display real-time weather information.",
    image: weatherImg,
    technologies: ["JavaScript", "HTML", "CSS", "REST API"],
    liveDemo: "https://example.com/weather-app",
    github: "https://github.com/yourusername/weather-app",
    featured: true,
    category: "Frontend",
  },
  {
    title: "Task Management App",
    description:
      "A modern productivity application for creating, managing and tracking tasks.",
    image: tasksImg,
    technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB"],
    liveDemo: "https://example.com/task-manager",
    github: "https://github.com/yourusername/task-manager",
    featured: false,
    category: "Full Stack",
  },
  {
    title: "College Directory",
    description:
      "A web application that searches and displays university information using an API.",
    image: collegeImg,
    technologies: ["JavaScript", "API", "HTML", "CSS"],
    liveDemo: "https://example.com/college-directory",
    github: "https://github.com/yourusername/college-directory",
    featured: false,
    category: "Frontend",
  },
  {
    title: "Chat Application",
    description:
      "A backend-powered chat application using Node.js, Express and MongoDB.",
    image: chatImg,
    technologies: ["Node.js", "Express.js", "MongoDB", "EJS"],
    liveDemo: "https://example.com/chat-app",
    github: "https://github.com/yourusername/chat-app",
    featured: false,
    category: "Backend",
  },
  {
    title: "Currency Converter",
    description:
      "A responsive currency conversion application using a real-time exchange-rate API.",
    image: currencyImg,
    technologies: ["JavaScript", "API", "HTML", "CSS"],
    liveDemo: "https://example.com/currency-converter",
    github: "https://github.com/yourusername/currency-converter",
    featured: false,
    category: "Frontend",
  },
  {
    title: "Portfolio / Full Stack Project",
    description:
      "A full-stack web application demonstrating frontend, backend and database integration.",
    image: fullstackImg,
    technologies: ["JavaScript", "Node.js", "Express.js", "MongoDB"],
    liveDemo: "https://example.com/fullstack-project",
    github: "https://github.com/yourusername/fullstack-project",
    featured: false,
    category: "Full Stack",
  },
];

export const projectCategories: Array<"All" | ProjectCategory> = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
];
