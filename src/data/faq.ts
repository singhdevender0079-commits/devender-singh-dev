/**
 * FAQ content for potential freelance clients.
 */

export type FaqItem = {
  question: string;
  answer: string;
};

export const faqs: FaqItem[] = [
  {
    question: "How long does it take to build a website?",
    answer:
      "The timeline depends on the project's size and requirements. A basic portfolio can usually be completed much faster than a custom full-stack application. I'll provide an estimated timeline after understanding your requirements.",
  },
  {
    question: "Do you build responsive websites?",
    answer:
      "Yes. I build responsive websites that work across desktop, tablet and mobile devices.",
  },
  {
    question: "Can you build a full-stack web application?",
    answer:
      "Yes. I can build full-stack applications with frontend, backend, APIs and databases using technologies such as JavaScript, Node.js, Express.js, MongoDB and MySQL.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. I can redesign an outdated website with a modern UI, responsive layout and improved user experience.",
  },
  {
    question: "Do you provide deployment?",
    answer:
      "Yes. Deployment assistance can be included depending on the project requirements.",
  },
  {
    question: "Can you add a database and authentication?",
    answer:
      "Yes. Database integration and authentication can be added to full-stack projects when required.",
  },
  {
    question: "How can I hire you?",
    answer:
      "You can contact me through the contact form or hire me through my Fiverr profile.",
  },
];
