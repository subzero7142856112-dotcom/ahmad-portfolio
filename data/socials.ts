export type SocialPlatform = "github" | "linkedin" | "email" | "x";

export interface Social {
  platform: SocialPlatform;
  label: string;
  handle?: string;
  href: string;
}

/** Replace handles/links with the verified profiles before publishing. */
export const socials: Social[] = [
  {
    platform: "github",
    label: "GitHub",
    handle: "SUBZERO",
    href: "https://github.com/SUBZERO",
  },
  {
    platform: "linkedin",
    label: "LinkedIn",
    handle: "ahmad-zwahrah-89063229a",
    href: "https://jo.linkedin.com/in/ahmad-zwahrah-89063229a",
  },
  {
    platform: "email",
    label: "Email",
    handle: "zawahrahceo@gmail.com",
    href: "mailto:zawahrahceo@gmail.com",
  },
];

export const contactChannels = [
  {
    title: "Email",
    value: "zawahrahceo@gmail.com",
    description: "Best for project enquiries",
    href: "mailto:zawahrahceo@gmail.com",
    icon: "mail",
  },
  {
    title: "LinkedIn",
    value: "ahmad-zwahrah-89063229a",
    description: "Professional profile",
    href: "https://jo.linkedin.com/in/ahmad-zwahrah-89063229a",
    icon: "linkedin",
  },
  {
    title: "GitHub",
    value: "SUBZERO",
    description: "Code and open source",
    href: "https://github.com/SUBZERO",
    icon: "github",
  },
  {
    title: "Location",
    value: "Amman, Jordan",
    description: "Open to remote collaboration",
    href: null,
    icon: "pin",
  },
] as const;
