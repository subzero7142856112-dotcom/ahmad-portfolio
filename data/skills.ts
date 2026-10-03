export type SkillGroup =
  | "Programming"
  | "AI / ML"
  | "Web"
  | "Mobile"
  | "Cybersecurity"
  | "Tools";

export type SkillFilterKey =
  | "All"
  | "Programming"
  | "AI / ML"
  | "Web & Mobile"
  | "Cybersecurity"
  | "Tools";

export interface Skill {
  name: string;
  group: SkillGroup;
  /** Short monogram shown in the tile. */
  mark: string;
  /** Brand-inspired accent color. */
  color: string;
}

export const skillFilters: SkillFilterKey[] = [
  "All",
  "Programming",
  "AI / ML",
  "Web & Mobile",
  "Cybersecurity",
  "Tools",
];

export const filterGroupMap: Record<SkillFilterKey, SkillGroup[]> = {
  All: ["Programming", "AI / ML", "Web", "Mobile", "Cybersecurity", "Tools"],
  Programming: ["Programming"],
  "AI / ML": ["AI / ML"],
  "Web & Mobile": ["Web", "Mobile"],
  Cybersecurity: ["Cybersecurity"],
  Tools: ["Tools"],
};

export const skills: Skill[] = [
  // Programming
  { name: "Python", group: "Programming", mark: "Py", color: "#4B8BBE" },
  { name: "C++", group: "Programming", mark: "C++", color: "#00599C" },
  { name: "Dart", group: "Programming", mark: "Dt", color: "#0175C2" },
  { name: "JavaScript", group: "Programming", mark: "JS", color: "#E8C547" },
  { name: "TypeScript", group: "Programming", mark: "TS", color: "#3178C6" },

  // AI / ML
  { name: "Machine Learning", group: "AI / ML", mark: "ML", color: "#4f7dff" },
  { name: "NLP", group: "AI / ML", mark: "NLP", color: "#7c6bff" },
  { name: "PyTorch", group: "AI / ML", mark: "Pt", color: "#EE4C2C" },
  { name: "TensorFlow", group: "AI / ML", mark: "Tf", color: "#FF8F00" },
  { name: "Scikit-learn", group: "AI / ML", mark: "Sk", color: "#F7931E" },
  { name: "Transformers", group: "AI / ML", mark: "Hf", color: "#FFD21E" },
  { name: "BERT", group: "AI / ML", mark: "B", color: "#68A063" },
  { name: "DeBERTa", group: "AI / ML", mark: "D", color: "#22d3ee" },
  { name: "XGBoost", group: "AI / ML", mark: "Xgb", color: "#1F77B4" },
  { name: "TF-IDF", group: "AI / ML", mark: "Tf", color: "#94a3b8" },

  // Web
  { name: "HTML", group: "Web", mark: "H5", color: "#E34F26" },
  { name: "CSS", group: "Web", mark: "C3", color: "#1572B6" },
  { name: "JavaScript", group: "Web", mark: "JS", color: "#E8C547" },
  { name: "React", group: "Web", mark: "Re", color: "#61DAFB" },
  { name: "Next.js", group: "Web", mark: "N", color: "#E5E7EB" },
  { name: "Tailwind CSS", group: "Web", mark: "Tw", color: "#38BDF8" },
  { name: "REST APIs", group: "Web", mark: "API", color: "#4f7dff" },

  // Mobile
  { name: "Flutter", group: "Mobile", mark: "Fl", color: "#3DDC84" },
  { name: "Android", group: "Mobile", mark: "An", color: "#3DDC84" },
  { name: "Responsive UI", group: "Mobile", mark: "UI", color: "#7c6bff" },
  { name: "Local Storage", group: "Mobile", mark: "DB", color: "#94a3b8" },

  // Cybersecurity
  { name: "Phishing Detection", group: "Cybersecurity", mark: "Ph", color: "#4f7dff" },
  { name: "Threat Detection", group: "Cybersecurity", mark: "Td", color: "#f87171" },
  { name: "URL Analysis", group: "Cybersecurity", mark: "Url", color: "#22d3ee" },
  { name: "Network Security Concepts", group: "Cybersecurity", mark: "Ns", color: "#7c6bff" },
  { name: "OSPF", group: "Cybersecurity", mark: "O", color: "#60a5fa" },
  { name: "RIP", group: "Cybersecurity", mark: "R", color: "#60a5fa" },
  { name: "CCNA Concepts", group: "Cybersecurity", mark: "Cc", color: "#18a0ae" },

  // Tools
  { name: "Git", group: "Tools", mark: "Git", color: "#F05032" },
  { name: "GitHub", group: "Tools", mark: "Gh", color: "#EDEDED" },
  { name: "VS Code", group: "Tools", mark: "VS", color: "#22A6F3" },
  { name: "Postman", group: "Tools", mark: "Pm", color: "#FF6C37" },
  { name: "Figma", group: "Tools", mark: "Fg", color: "#F24E1E" },
  { name: "Linux", group: "Tools", mark: "Ln", color: "#FCC624" },
  { name: "Android Studio", group: "Tools", mark: "As", color: "#3DDC84" },
];
