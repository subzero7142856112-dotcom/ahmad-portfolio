/**
 * Central identity content.
 * Every value here is configurable �?" no facts are invented beyond what is supplied.
 */
import { asset } from "@/lib/paths";

export const personal = {
  firstName: "Ahmad",
  lastName: "Al-Zawahrah",
  fullName: "Ahmad Al-Zawahrah",
  initials: "AZ",
  role: "Support, Networking & Software Developer",
  headline: ["Support, Networking", "& Software Developer"],
  availability: "Available for opportunities",
  tagline: "Building intelligent systems and modern digital experiences.",
  heroDescription:
    "I build intelligent systems, secure applications, and modern digital experiences that solve real-world problems.",
  about: [
    "I am a Computer Engineering graduate with a strong interest in Artificial Intelligence, Cybersecurity, Software Development, and building practical digital products.",
    "My work combines machine learning, NLP, secure systems, modern web technologies, and mobile development.",
  ],
  aboutHighlight:
    "I enjoy turning ideas into practical solutions, whether that means machine learning models, secure systems, mobile apps, or modern web experiences.",
  location: "Amman, Jordan",
  email: "zawahrahceo@gmail.com",
  /**
   * Web3Forms access key — safe to expose in the client bundle (the service
   * is designed for it; submissions route to `email` above).
   * Get one free at https://web3forms.com
   */
  web3FormsAccessKey: "aed043b7-08ec-42df-88eb-8b627ba6a906",
  /** Drop the real PDF at this path (see /public/cv/README.md). */
  cvPath: asset("/cv/Ahmad-Al-Zawahrah-CV.pdf"),
  degree: "B.Sc. in Computer Engineering",
  university: "The Hashemite University",
} as const;

export const site = {
  name: `${personal.fullName} — Portfolio`,
  title: `${personal.fullName} | ${personal.role}`,
  description:
    "Portfolio of Ahmad Al-Zawahrah, a Support, Networking & Software Developer based in Amman, Jordan. Projects in machine learning, NLP, cybersecurity, web and mobile development.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  keywords: [
    "Ahmad Al-Zawahrah",
    "IT Support",
    "Networking",
    "Software Developer",
    "Machine Learning",
    "NLP",
    "Cybersecurity",
    "Portfolio",
    "Amman Jordan",
  ],
} as const;
