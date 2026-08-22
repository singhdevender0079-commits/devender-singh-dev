export type EducationEntry = {
  degree: string;
  institution: string;
  period: string;
  location: string;
  details: string[];
};

export const education: EducationEntry[] = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    institution: "Global Institute of Technology, Jaipur",
    period: "2023 – 2027",
    location: "Jaipur, Rajasthan",
    details: [
      "Core coursework in Data Structures, Algorithms, DBMS and Operating Systems",
      "Building full stack projects alongside the curriculum",
      "Consistent practice in competitive problem solving",
    ],
  },
];
