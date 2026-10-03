export interface Service {
  id: string;
  icon: "brain" | "code" | "shield" | "puzzle";
  title: string;
  description: string;
  items: string[];
}

export const services: Service[] = [
  {
    id: "ai-ml",
    icon: "brain",
    title: "AI & Machine Learning",
    description:
      "Classification and detection systems built on NLP models, evaluated against real corpora and practical constraints.",
    items: [
      "NLP",
      "Text Classification",
      "Phishing Detection",
      "Model Training",
      "Model Evaluation",
      "Explainable AI",
    ],
  },
  {
    id: "software",
    icon: "code",
    title: "Software Development",
    description:
      "Web and mobile applications built with modern frameworks, clean state management and well-structured APIs.",
    items: [
      "Flutter",
      "React",
      "Next.js",
      "Web Development",
      "APIs",
      "Full-stack applications",
    ],
  },
  {
    id: "security",
    icon: "shield",
    title: "Cybersecurity",
    description:
      "Threat and phishing detection work combining URL intelligence, rule-based signals and machine learning analysis.",
    items: [
      "Threat Detection",
      "Phishing Detection",
      "Security Analysis",
      "URL Intelligence",
      "Network Concepts",
      "Secure Application Design",
    ],
  },
  {
    id: "problem-solving",
    icon: "puzzle",
    title: "Problem Solving",
    description:
      "Breaking ambiguous requirements into testable components, then shipping reliable, maintainable implementations.",
    items: [
      "System Design",
      "Debugging",
      "Automation",
      "Data Processing",
      "Technical Research",
      "Practical Engineering",
    ],
  },
];
