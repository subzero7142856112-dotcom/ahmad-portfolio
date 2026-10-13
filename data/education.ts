import { asset } from "@/lib/paths";

export interface GraduationProject {
  title: string;
  description: string;
  supervisor?: string | null;
  link?: string | null;
}

export interface CertificateInfo {
  /** Public URL of the original certificate image. */
  image: string;
  imageAlt: string;
  issuedOn: string;
  duration: string;
  serial: string;
}

export interface EducationEntry {
  id: string;
  kind: "degree" | "diploma";
  degree: string;
  university: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  graduationProject?: GraduationProject;
  certificate?: CertificateInfo;
}

export const education: EducationEntry[] = [
  {
    id: "hu-bsc",
    kind: "degree",
    degree: "B.Sc. in Computer Engineering",
    university: "The Hashemite University",
    period: "2021 – 2026",
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
      title: "AI-Powered Phishing Email Detection",
      description:
        "A graduation project building an AI-powered phishing email detection system using a ModernBERT multi-expert architecture fused by XGBoost, delivered across a web app, Chrome extension, Gmail/Outlook deep scan, and Telegram bot.",
      supervisor: "Dr. Mohammad Al-Hammouri",
      link: null,
    },
  },
  {
    id: "traintrog-web-design",
    kind: "diploma",
    degree: "Diploma in Web Design",
    university: "USA TrainTrog Academy",
    period: "June 2023",
    summary:
      "Successfully completed the Web Design training program and passed the final examination — 100 hours of focused, hands-on training.",
    highlights: ["Web Design", "100 Training Hours", "Final Examination"],
    certificate: {
      image: asset("/general images/photo_2023-10-11_16-51-08.jpg"),
      imageAlt:
        "Certificate of Diploma in Web Design awarded to Ahmad Mahmoud Ahmad Al-Zawahrah by USA TrainTrog Academy for Training and Development, issued June 1, 2023, serial STC1369TPA.",
      issuedOn: "June 1, 2023",
      duration: "100 Hours",
      serial: "STC1369TPA",
    },
  },
];
