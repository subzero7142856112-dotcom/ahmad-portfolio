export interface ExperienceItem {
  id: string;
  role: string;
  organisation: string;
  period: string;
  location?: string;
  summary?: string;
  bullets: string[];
  tags: string[];
}

export const experience: ExperienceItem[] = [
  {
    id: "sana-computer",
    role: "Technical Support (Part-time)",
    organisation: "Sana Computer Center",
    period: "2023 – 2024",
    summary: "Hardware and software support in a hands-on retail and repair environment.",
    bullets: [
      "Provided technical support for hardware and software issues.",
      "Assisted with system setup, troubleshooting, and customer service.",
      "Gained hands-on experience with networking and computer systems.",
    ],
    tags: ["Technical Support", "Troubleshooting", "Networking", "Computer Systems"],
  },
  {
    id: "freelance",
    role: "Freelance & Personal Projects",
    organisation: "Independent",
    period: "2023 – Present",
    summary: "Web, mobile and AI projects built end to end, from design to deployment.",
    bullets: [
      "Built multiple personal and client projects across web, mobile and AI.",
      "Developed skills in Flutter, web development, and machine learning.",
      "Continuously learning and exploring new technologies through applied work.",
    ],
    tags: ["Web", "Mobile", "AI / ML", "Freelance"],
  },
];
