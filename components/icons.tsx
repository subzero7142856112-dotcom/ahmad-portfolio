import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  const { className = "h-5 w-5", ...rest } = props;
  return {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false as const,
    ...rest,
  };
}

export function IconGitHub(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.37-3.37-1.37-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.57 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.55-1.14-4.55-5.05 0-1.12.39-2.03 1.03-2.74-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.3 9.3 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.71 1.03 1.62 1.03 2.74 0 3.92-2.34 4.79-4.57 5.04.36.32.68.94.68 1.9v2.82c0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" />
    </svg>
  );
}

export function IconLinkedIn(props: IconProps) {
  return (
    <svg {...base(props)} fill="currentColor" stroke="none">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.64h.05c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.36c0-1.28-.02-2.93-1.78-2.93-1.79 0-2.06 1.4-2.06 2.84V21h-4V9Z" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="m3.5 7.5 7.4 5.1a2 2 0 0 0 2.2 0l7.4-5.1" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s7-5.4 7-11a7 7 0 1 0-14 0c0 5.6 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconDownload(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3v12" />
      <path d="m7.5 10.5 4.5 4.5 4.5-4.5" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 12h16" />
      <path d="m14 6 6 6-6 6" />
    </svg>
  );
}

export function IconArrowUpRight(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20 12H4" />
      <path d="m10 6-6 6 6 6" />
    </svg>
  );
}

export function IconArrowUp(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 20V4" />
      <path d="m6 10 6-6 6 6" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function IconCheck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function IconSpark(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.5l-1.9-5.7L4.5 10.9 10.1 9 12 3.5Z" />
    </svg>
  );
}

export function IconBrain(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9.5 4.5A2.5 2.5 0 0 0 7 7v.3A2.6 2.6 0 0 0 5.5 9.6c0 .9.5 1.7 1.2 2.2-.7.5-1.2 1.3-1.2 2.2A2.6 2.6 0 0 0 8 16.6a2.5 2.5 0 0 0 4 .8V5.6a2.5 2.5 0 0 0-2.5-1.1Z" />
      <path d="M14.5 4.5A2.5 2.5 0 0 1 17 7v.3a2.6 2.6 0 0 1 1.5 2.3c0 .9-.5 1.7-1.2 2.2.7.5 1.2 1.3 1.2 2.2a2.6 2.6 0 0 1-1.5 2.3 2.5 2.5 0 0 1-4 .8" />
      <path d="M12 5.6v12.5" />
    </svg>
  );
}

export function IconCode(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m8.5 8-4 4 4 4" />
      <path d="m15.5 8 4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </svg>
  );
}

export function IconShield(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5 5 6v5.5c0 4.2 2.9 7.4 7 9 4.1-1.6 7-4.8 7-9V6l-7-2.5Z" />
      <path d="m9 12 2.2 2.2L15.5 10" />
    </svg>
  );
}

export function IconPuzzle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M9 4.5h6v2a1.8 1.8 0 1 0 3.5 0V4.5H21v5.5h-2a1.8 1.8 0 1 0 0 3.5h2V21h-5.5v-2a1.8 1.8 0 1 0-3.5 0v2H4v-5.5h2a1.8 1.8 0 1 0 0-3.5H4V4.5h5Z" />
    </svg>
  );
}

export function IconTerminal(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="m7.5 10 2.5 2.5L7.5 15" />
      <path d="M13 15h4" />
    </svg>
  );
}

export function IconGraduation(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 4 2.5 9 12 14l9.5-5L12 4Z" />
      <path d="M6.5 11.5V16c0 1.4 2.5 2.8 5.5 2.8s5.5-1.4 5.5-2.8v-4.5" />
      <path d="M21.5 9v5" />
    </svg>
  );
}

export function IconBriefcase(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="7" width="18" height="13" rx="2.5" />
      <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" />
      <path d="M3 12.5h18" />
    </svg>
  );
}

export function IconBook(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 5.5A2 2 0 0 1 6 3.5h5.5v16H6a2 2 0 0 0-2 2v-16Z" />
      <path d="M20 5.5a2 2 0 0 0-2-2h-5.5v16H18a2 2 0 0 1 2 2v-16Z" />
    </svg>
  );
}

export function IconLayers(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m12 3.5 8.5 4.3L12 12 3.5 7.8 12 3.5Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16.2 8 4 8-4" />
    </svg>
  );
}

export function IconCpu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6.5" y="6.5" width="11" height="11" rx="2" />
      <rect x="9.75" y="9.75" width="4.5" height="4.5" rx="1" />
      <path d="M10 3.5v3M14 3.5v3M10 17.5v3M14 17.5v3M3.5 10h3M3.5 14h3M17.5 10h3M17.5 14h3" />
    </svg>
  );
}

export function IconSend(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M20.5 3.5 3.5 10.2l6.6 2.7 2.7 6.6 7.7-16Z" />
      <path d="m10.1 12.9 4.6-4.6" />
    </svg>
  );
}

export function IconLoader(props: IconProps) {
  return (
    <svg {...base(props)} className={`${props.className ?? "h-5 w-5"} animate-spin`}>
      <path d="M12 3.5v3.2" />
      <path d="M12 17.3v3.2" opacity="0.35" />
      <path d="M20.5 12h-3.2" opacity="0.55" />
      <path d="M6.7 12H3.5" opacity="0.8" />
      <path d="m18 6-2.3 2.3" opacity="0.45" />
      <path d="M8.3 15.7 6 18" opacity="0.9" />
      <path d="m18 18-2.3-2.3" opacity="0.65" />
      <path d="M8.3 8.3 6 6" opacity="0.25" />
    </svg>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

export function IconExternalLink(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13.5 4.5H19.5v6" />
      <path d="M19.5 4.5 11 13" />
      <path d="M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2.5" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3" />
    </svg>
  );
}

export function IconDatabase(props: IconProps) {
  return (
    <svg {...base(props)}>
      <ellipse cx="12" cy="6.5" rx="7.5" ry="3" />
      <path d="M4.5 6.5v11c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3v-11" />
      <path d="M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3" />
    </svg>
  );
}

export function IconZap(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M13.5 3 5 13.5h6L10.5 21 19 10.5h-6L13.5 3Z" />
    </svg>
  );
}

export function IconGrid(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="4" y="4" width="7" height="7" rx="1.8" />
      <rect x="13" y="4" width="7" height="7" rx="1.8" />
      <rect x="4" y="13" width="7" height="7" rx="1.8" />
      <rect x="13" y="13" width="7" height="7" rx="1.8" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16.2 16.2 4.3 4.3" />
    </svg>
  );
}
