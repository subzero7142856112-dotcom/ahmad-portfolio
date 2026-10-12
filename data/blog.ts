import { asset } from "@/lib/paths";

export type PostStatus = "published" | "draft";

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  /** ISO date used for metadata and sorting. */
  isoDate: string;
  readingTime: string;
  excerpt: string;
  image: string;
  status: PostStatus;
  /** Article body paragraphs. Leave empty while the post is a draft. */
  body?: string[];
}

/**
 * Placeholder article list — replace with real posts when they exist.
 * Draft entries render as "Coming soon" instead of a dead link.
 */
export const posts: BlogPost[] = [
  {
    slug: "introduction-to-nlp-for-cybersecurity",
    title: "Introduction to NLP for Cybersecurity",
    category: "NLP",
    date: "Jan 15, 2024",
    isoDate: "2024-01-15",
    readingTime: "7 min read",
    excerpt:
      "How text representations such as TF-IDF and transformer embeddings are used to detect phishing and malicious content.",
    image: asset("/images/blog/nlp-cybersecurity.svg"),
    status: "draft",
  },
  {
    slug: "building-a-flutter-app-from-scratch",
    title: "Building a Flutter App from Scratch",
    category: "Mobile",
    date: "Dec 10, 2023",
    isoDate: "2023-12-10",
    readingTime: "9 min read",
    excerpt:
      "A practical walkthrough of structuring a Flutter project, managing local state, and shipping a local-first application.",
    image: asset("/images/blog/flutter-app.svg"),
    status: "draft",
  },
  {
    slug: "how-i-built-shieldai",
    title: "How I Built ShieldAI",
    category: "Case Study",
    date: "Nov 5, 2023",
    isoDate: "2023-11-05",
    readingTime: "11 min read",
    excerpt:
      "Design decisions, model selection lessons and engineering trade-offs behind a phishing detection system.",
    image: asset("/images/blog/shieldai-build.svg"),
    status: "draft",
  },
  {
    slug: "machine-learning-for-phishing-detection",
    title: "Machine Learning for Phishing Detection",
    category: "Machine Learning",
    date: "Oct 2, 2023",
    isoDate: "2023-10-02",
    readingTime: "8 min read",
    excerpt:
      "Comparing classical baselines and transformer models for email and URL classification tasks.",
    image: asset("/images/blog/ml-phishing.svg"),
    status: "draft",
  },
];
