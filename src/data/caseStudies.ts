import weatherImg from "@/assets/projects/weather.jpg";
import chatImg from "@/assets/projects/chat.jpg";
import collegeImg from "@/assets/projects/college.jpg";

/**
 * Case studies content.
 * Links are placeholders — replace liveDemo / github with your real URLs.
 */

export type CaseStudy = {
  id: string;
  title: string;
  summary: string;
  image: string;
  technologies: string[];
  problem: string;
  approach: string;
  solution: string;
  result: string;
  liveDemo: string;
  github: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "weather-intelligence-app",
    title: "Weather Intelligence App",
    summary:
      "A responsive weather dashboard that fetches live conditions through a REST API.",
    image: weatherImg,
    technologies: ["HTML", "CSS", "JavaScript", "REST API"],
    problem:
      "Users need a simple and responsive way to quickly check current weather information.",
    approach:
      "Built a responsive weather application that retrieves weather information through an API and presents it through a clean interface.",
    solution:
      "Created a responsive weather dashboard with dynamic API data and user-friendly weather information.",
    result:
      "A fast and responsive weather application that works across desktop and mobile devices.",
    liveDemo: "https://example.com/weather-app",
    github: "https://github.com/yourusername/weather-app",
  },
  {
    id: "full-stack-chat-application",
    title: "Full Stack Chat Application",
    summary:
      "A backend-powered chat platform with server-side routing and database-backed messages.",
    image: chatImg,
    technologies: ["Node.js", "Express.js", "EJS", "MongoDB", "JavaScript"],
    problem: "Users need a simple web-based platform for sending and viewing messages.",
    approach:
      "Designed a backend-powered chat application using Node.js, Express.js and MongoDB.",
    solution:
      "Implemented server-side routing, database integration and message management.",
    result:
      "A functional full-stack chat application demonstrating frontend, backend and database integration.",
    liveDemo: "https://example.com/chat-app",
    github: "https://github.com/yourusername/chat-app",
  },
  {
    id: "college-directory",
    title: "College Directory",
    summary:
      "A university discovery app with live API search and responsive result cards.",
    image: collegeImg,
    technologies: ["HTML", "CSS", "JavaScript", "REST API"],
    problem: "Students need an easy way to search and explore university information.",
    approach:
      "Built a responsive interface that consumes a university API and dynamically displays search results.",
    solution:
      "Implemented API integration, search functionality and responsive result cards.",
    result: "A simple and responsive university discovery application.",
    liveDemo: "https://example.com/college-directory",
    github: "https://github.com/yourusername/college-directory",
  },
];
