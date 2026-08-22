/**
 * "How I Work" process steps.
 * Edit here to update the process timeline — no component changes needed.
 */

export type ProcessStep = {
  number: string;
  icon: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    icon: "MessagesSquare",
    title: "Discuss",
    description:
      "We discuss your idea, requirements, goals and the features you need.",
  },
  {
    number: "02",
    icon: "ClipboardList",
    title: "Plan",
    description:
      "I create the project structure, user flow and technical plan before development begins.",
  },
  {
    number: "03",
    icon: "Code2",
    title: "Develop",
    description:
      "I build the website or web application with a focus on clean code, responsive design, performance and user experience.",
  },
  {
    number: "04",
    icon: "Rocket",
    title: "Deliver",
    description:
      "After testing and optimization, I deploy the project and provide the final website/application.",
  },
];
