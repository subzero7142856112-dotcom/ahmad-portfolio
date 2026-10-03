export interface EducationEntry {
  id: string;
  degree: string;
  university: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  graduationProject: {
    title: string;
    description: string;
    supervisor?: string | null;
    link?: string | null;
  };
}

export const education: EducationEntry[] = [
  {
    id: "hu-bsc",
    degree: "B.Sc. in Computer Engineering",
    university: "The Hashemite University",
    period: "2019 – 2023",
    location: "Zarqa, Jordan",
    summary:
      "Graduated with good standing. Focused on software development, artificial intelligence, and computer systems.",
    highlights: [
      "Software Development",
      "Artificial Intelligence",
      "Computer Systems",
      "Networking",
    ],
    graduationProject: {
      title: "Phishing Email / URL Detection",
      description:
        "A graduation project building a detection system for phishing emails and malicious URLs using natural language processing and machine learning.",
      supervisor: null,
      link: null,
    },
  },
];
