import { personal } from "@/data/personal";

/** Open Graph card shared by every route (see scripts/og-card.html → public/og.png). */
export const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${personal.fullName} — ${personal.role}`,
};
