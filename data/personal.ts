/**
 * Central identity content.
 * Every value here is configurable — no facts are invented beyond what is supplied.
 */
export const personal = {
  firstName: "Ahmad",
  lastName: "Al-Zawahrah",
  fullName: "Ahmad Al-Zawahrah",
  initials: "AZ",
  role: "AI Engineer & Software Developer",
  headline: ["AI Engineer", "& Software Developer"],
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
  /** Drop the real PDF at this path (see /public/cv/README.md). */
  cvPath: "/cv/Ahmad-Al-Zawahrah-CV.pdf",
  degree: "B.Sc. in Computer Engineering",
  university: "The Hashemite University",
} as const;

export const site = {
  name: `${personal.fullName} — Portfolio`,
  title: `${personal.fullName} | ${personal.role}`,
  description:
    "Portfolio of Ahmad Al-Zawahrah, an AI Engineer & Software Developer based in Amman, Jordan. Projects in machine learning, NLP, cybersecurity, web and mobile development.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  keywords: [
    "Ahmad Al-Zawahrah",
    "AI Engineer",
    "Software Developer",
    "Machine Learning",
    "NLP",
    "Cybersecurity",
    "Portfolio",
    "Amman Jordan",
  ],
} as const;
