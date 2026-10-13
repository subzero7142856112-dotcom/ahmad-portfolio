import { asset } from "@/lib/paths";

export type ProjectFilterKey =
  | "All"
  | "AI / ML"
  | "Cybersecurity"
  | "Web"
  | "Mobile"
  | "Other";

export const projectFilters: ProjectFilterKey[] = [
  "All",
  "AI / ML",
  "Cybersecurity",
  "Web",
  "Mobile",
  "Other",
];

export interface Metric {
  label: string;
  /** Leave null until a verified value exists — renders as "TBD". */
  value: string | null;
  hint?: string;
}

export interface FlowStage {
  label: string;
  detail?: string[];
  emphasis?: boolean;
}

export interface DatasetEntry {
  name: string;
  type: string;
  note: string;
  /**
   * true = confirmed used in the final pipeline.
   * Keep false unless the dataset has actually been verified as used.
   */
  verified: boolean;
}

export interface ApproachStep {
  index: string;
  title: string;
  body: string;
}

export interface CaseStudy {
  summary: string;
  overview: string[];
  features: string[];
  problem: { title: string; body: string }[];
  approach: ApproachStep[];
  architecture: FlowStage[];
  datasets: DatasetEntry[];
  results: Metric[];
  challenges: { title: string; body: string }[];
  lessons: string[];
}

export interface Project {
  slug: string;
  title: string;
  /** Badge shown on the card image. */
  category: string;
  /** Display line, e.g. "AI / ML · NLP · Cybersecurity". */
  categoryLine: string;
  filters: ProjectFilterKey[];
  description: string;
  longDescription: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  year: string;
  featured: boolean;
  /** Optional hero treatment in the projects grid (spans full width, elevated design). */
  highlight?: "hero";
  /** Repository URL. null = falls back to the GitHub profile link. */
  github: string | null;
  demo: string | null;
  /** Optional downloadable project documentation (e.g. .docx) served from /files. */
  document?: string | null;
  caseStudy: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "shieldai",
    title: "ShieldAI",
    category: "AI / ML",
    categoryLine: "AI / ML · NLP · Cybersecurity",
    filters: ["AI / ML", "Cybersecurity"],
    description:
      "An AI-powered phishing email detection system built on three fine-tuned ModernBERT experts fused by XGBoost — scoring phishing risk, cyber context, and attacker intent into one explainable verdict.",
    longDescription:
      "ShieldAI is the graduation project behind an AI-powered phishing email detection system that uses a ModernBERT multi-expert architecture. Three separately fine-tuned ModernBERT-base models specialise in binary phishing risk, 12-label cyber context, and 22-class attacker intent; their calibrated outputs feed an XGBoost fusion layer that produces a 0–100 risk score, a Safe / Suspicious / Dangerous verdict, and highlighted evidence. The system ships as a full product stack: a FastAPI backend with 18 REST endpoints, a dark-themed web app, a Chrome extension, deep-scan integrations for Gmail and Outlook, a Telegram bot, and an optional Windows Sandbox for live URL inspection. It was trained on ~90k consolidated samples from 13 public datasets and validated end-to-end on a curated 46-email set — 95.7% accuracy, 31/31 phishing detected, zero false positives on legitimate mail, and ~1.4s average GPU response.",
    technologies: [
      "Python",
      "PyTorch",
      "ModernBERT",
      "Hugging Face",
      "XGBoost",
      "FastAPI",
      "scikit-learn",
      "OAuth 2.0",
      "Chrome Extension",
      "Gmail API",
      "Microsoft Graph",
      "Telegram Bot",
    ],
    image: asset("/general images/phishing attack detection platform.png"),
    imageAlt:
      "Concept art for an AI phishing email detection platform: a glowing shield containing a brain and the words 'AI Phishing Email Detection' at the centre, a red phishing email hanging from a fish hook on the left, an inbox with green shield checkmarks on the right, and feature panels for Email Analysis, ModernBERT Multi-Expert AI, URL & Domain Intelligence, and Header & Authentication Checks.",
    year: "2026",
    featured: true,
    highlight: "hero",
    github: null,
    demo: null,
    document: asset("/files/Final Project.docx"),
    caseStudy: {
      summary:
        "A graduation project: an AI-powered phishing email detection system built on three fine-tuned ModernBERT experts fused by XGBoost, delivered across a web app, Chrome extension, Gmail/Outlook deep scan, and Telegram bot.",
      overview: [
        "ShieldAI is the academic title for an AI-powered phishing email detection system that uses a ModernBERT multi-expert architecture. It was completed at The Hashemite University, Faculty of Engineering, Computer Engineering Department, in Jordan during the 2026 academic year under the supervision of Dr. Mohammad Al-Hammouri, as a team graduation project.",
        "The core of the system is three separately fine-tuned ModernBERT-base experts. A Binary Phishing Risk expert classifies each email as legitimate or phishing; a Cyber Context expert performs 12-label multilabel classification of the security categories present; and an Intent Context expert performs 22-class multiclass classification of attacker goals and legitimate purposes.",
        "Their calibrated outputs feed an XGBoost fusion layer trained on 25 engineered features, which produces a single risk score mapped to a 0–100 scale with Safe, Suspicious, and Dangerous thresholds. A documented rule-based fusion formula backs the learned layer, and auxiliary analyzers cover SPF/DKIM/DMARC header authentication, hidden-URL and anchor-href mismatch detection, domain reputation, external threat intelligence, and optional Windows Sandbox detonation.",
        "The same scoring core is exposed through every surface a user actually reads mail on: a dark-themed web interface, a Chrome extension, Gmail and Outlook deep scans, and a Telegram bot.",
      ],
      features: [
        "Three separately fine-tuned ModernBERT-base experts (binary, cyber context, intent)",
        "XGBoost fusion layer over 25 engineered features",
        "0–100 risk score with Safe / Suspicious / Dangerous thresholds",
        "Rule-based fusion fallback with documented weights",
        "Trusted Domain Override (Tranco top-100k, free providers excluded)",
        "SPF / DKIM / DMARC header authentication",
        "Hidden URL and anchor-href mismatch detection (100% detection in validation)",
        "Domain reputation, typosquatting, and 175k+ indicator blacklist",
        "External threat intel: Google Safe Browsing, URLScan.io, VirusTotal",
        "Optional Windows Sandbox detonation for risky links",
        "FastAPI backend with 18 REST endpoints",
        "Chrome extension, Gmail/Outlook deep scan, and Telegram bot delivery",
      ],
      problem: [
        {
          title: "Phishing is contextual, not just lexical",
          body: "Modern phishing reuses legitimate wording and impersonates trusted brands, so keyword and pattern matching miss the social-engineering structure that makes an email malicious.",
        },
        {
          title: "Malicious URLs hide in the HTML",
          body: "Anchor-href mismatches, hidden links behind legitimate-looking text, and shortened destinations all defeat plain-text scanning — the raw HTML structure has to be analysed.",
        },
        {
          title: "One model cannot do everything",
          body: "Binary detection, multilabel cyber categorisation, and fine-grained intent classification are different tasks; forcing a single model to cover all of them blurs every decision boundary.",
        },
        {
          title: "Verdicts must be explainable and actionable",
          body: "A security tool that only outputs a label is unusable — users need the risk score, the exact reasons behind it, and a clear recommended action before they trust it.",
        },
        {
          title: "Privacy and integration constraints",
          body: "Mail deep scans require OAuth scopes that users hesitate to grant, and the Chrome extension cannot read raw authentication headers from the DOM — so each surface needed a designed capability tier.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Dataset consolidation",
          body: "Merge 13 public phishing and legitimate email sources into three aligned corpora: a binary dataset of 89,855 samples, a 12-label cyber-context dataset, and a 22-class intent dataset.",
        },
        {
          index: "02",
          title: "Text cleaning pipeline",
          body: "Apply a 10-step pipeline — Unicode NFKC normalisation, BeautifulSoup HTML removal, placeholder tokens for URLs/emails/domains, smart 500-word truncation (first 250 + last 250), and deduplication.",
        },
        {
          index: "03",
          title: "Expert fine-tuning",
          body: "Fine-tune three ModernBERT-base models at 1,024-token sequence length on an RTX 5060: binary cross-entropy for phishing risk, multi-label BCE with sigmoid for cyber context, and 22-class cross-entropy with softmax for intent.",
        },
        {
          index: "04",
          title: "Probability calibration",
          body: "Calibrate each expert's raw scores so their confidences are comparable before fusion — without calibration the fusion layer cannot trust the inputs.",
        },
        {
          index: "05",
          title: "Fusion layer",
          body: "Train XGBoost on 25 engineered features derived from the calibrated probabilities and auxiliary signals, with a documented rule-based formula as a deterministic fallback.",
        },
        {
          index: "06",
          title: "Auxiliary analyzers",
          body: "Add SPF/DKIM/DMARC header checks, structural hidden-URL detection, domain age and typosquat checks, blacklist lookups over 175k+ indicators, and external intel from Google Safe Browsing, URLScan.io, and VirusTotal.",
        },
        {
          index: "07",
          title: "Multi-surface delivery",
          body: "Expose the pipeline through a FastAPI backend with 18 REST endpoints, then wire it to the web interface, a Chrome extension, Gmail and Outlook deep scans, a Telegram bot, and optional Windows Sandbox detonation.",
        },
        {
          index: "08",
          title: "End-to-end validation",
          body: "Evaluate on a curated 46-email set (31 phishing, 13 legitimate, 2 borderline) covering phishing detection, false positives, security alerts, hidden-URL detection, and response time.",
        },
      ],
      architecture: [
        {
          label: "Email Input",
          detail: ["Web app", "Chrome extension", "Gmail / Outlook", "Telegram"],
        },
        {
          label: "AI Analysis",
          detail: [
            "Binary Phishing Risk",
            "Cyber Context (12 labels)",
            "Intent Context (22 classes)",
          ],
          emphasis: true,
        },
        {
          label: "Auxiliary Signals",
          detail: ["SPF / DKIM / DMARC", "Hidden URLs", "Domain reputation", "Threat intel"],
        },
        {
          label: "XGBoost Fusion",
          detail: ["25 engineered features", "Rule-based fallback", "Trusted Domain Override"],
        },
        {
          label: "Explainable Verdict",
          detail: ["0–100 risk score", "Action recommendation", "Highlighted evidence"],
        },
      ],
      datasets: [
        {
          name: "binary_ULTIMATE.csv",
          type: "Binary classification corpus",
          note: "89,855 samples (41,981 legitimate / 47,874 phishing), ~121 MB, consolidated from multiple public sources for the phishing risk expert.",
          verified: true,
        },
        {
          name: "cyber_context_MASTER_FINAL.csv",
          type: "Multilabel corpus",
          note: "~23 MB, 12-label cyber-context annotations for the context expert.",
          verified: true,
        },
        {
          name: "intent_context_MASTER_FINAL.csv",
          type: "Multiclass corpus",
          note: "~10.6 MB, 22 intent classes (10 attack / 11 legitimate / 1 neutral) for the intent expert.",
          verified: true,
        },
        {
          name: "Curated validation set",
          type: "End-to-end evaluation set",
          note: "46 emails — 31 phishing, 13 legitimate, 2 borderline — used for the final system-level evaluation.",
          verified: true,
        },
        {
          name: "Tranco top-100k domains",
          type: "Trusted domain ranking",
          note: "Powers the Trusted Domain Override; free email providers are excluded from exact-match overrides.",
          verified: true,
        },
        {
          name: "Threat indicator blacklist",
          type: "Indicator database",
          note: "175k+ domain and URL indicators with O(1) hash-set lookups.",
          verified: true,
        },
      ],
      results: [
        {
          label: "Binary Expert F1",
          value: "99.39%",
          hint: "Precision 99.32% · Recall 99.46% · ROC-AUC 99.98%.",
        },
        {
          label: "Cyber Context Macro-F1",
          value: "97.87%",
          hint: "12-label multilabel classification.",
        },
        {
          label: "Intent Context F1",
          value: "96.65%",
          hint: "22-class multiclass classification.",
        },
        {
          label: "System Accuracy",
          value: "95.7%",
          hint: "XGBoost fusion on the 46-email validation set.",
        },
        { label: "Phishing Detected", value: "31 / 31", hint: "All phishing emails flagged." },
        {
          label: "False Positive Rate",
          value: "0%",
          hint: "Zero legitimate emails flagged.",
        },
        { label: "Security Alerts", value: "8 / 8", hint: "Correct high-risk alerts." },
        {
          label: "Hidden URL Detection",
          value: "100%",
          hint: "Anchor-href mismatch detection rate.",
        },
        { label: "Response Time", value: "~1.4s", hint: "Average GPU inference per email." },
      ],
      challenges: [
        {
          title: "Catastrophic forgetting vs. one giant model",
          body: "A single large transformer covering all three tasks risks blurring decision boundaries; splitting into three specialised experts preserved each task's accuracy while a fusion layer kept the system unified.",
        },
        {
          title: "Structured URL evasion",
          body: "Hidden links and anchor-href mismatches defeated plain-text scanning; solving it required parsing the raw HTML and comparing visible text against actual hrefs, which then reached 100% detection in validation.",
        },
        {
          title: "Calibration across experts",
          body: "Raw softmax outputs from separately trained models are not directly comparable — temperature scaling was required before the fusion layer could trust their probabilities.",
        },
        {
          title: "End-to-end vs. expert accuracy",
          body: "Individual experts scored 96–99% on their test sets, but the deployed system faces full emails with headers and HTML; the 46-email curated set exposed that gap and drove the fusion and override rules.",
        },
        {
          title: "Surface capability differences",
          body: "The Chrome extension cannot read raw authentication headers from the DOM, so deep header checks live only in the Gmail and Outlook integrations — every surface needed a clearly designed capability tier.",
        },
      ],
      lessons: [
        "Specialise, then fuse — three narrow experts plus a lightweight fusion layer outperform a single model trying to be everything, and stay interpretable.",
        "Structural analysis beats pattern matching — parsing the raw HTML for hidden URLs catches attacks no amount of text-level feature engineering would flag.",
        "Calibrate before you fuse — probability calibration is not optional when a downstream model consumes multiple models' confidence scores.",
        "Build override rules from real misses — the Trusted Domain Override and header-auth weighting came directly from edge cases in validation, not from theory.",
        "Ship the explanation with the verdict — highlighting evidence phrases and per-signal contributions turns a classifier into a tool people can act on.",
        "One core, many surfaces — keeping the pipeline behind a single API contract means the web app, extension, bots, and mail integrations all stay in sync with one deployment.",
      ],
    },
  },
  {
    slug: "workout-tracker",
    title: "Workout Tracker",
    category: "Mobile",
    categoryLine: "Flutter · Mobile",
    filters: ["Mobile"],
    description:
      "A local-first workout tracking application designed for structured exercise plans, progress tracking, reminders, and daily completion.",
    longDescription:
      "A Flutter application for organising training plans and recording sessions on-device. It focuses on a fast logging flow, clear progress feedback and reminders that support daily consistency — all without requiring an account or network connection.",
    technologies: ["Flutter", "Dart", "Local Storage", "Responsive UI"],
    image: asset("/images/projects/workout-tracker.png"),
    imageAlt:
      "WorkTraker fitness app showcase — “Build Better Habits, A Stronger You” — three phones showing a 30-day plan, a Day 3/30 progress ring, and an exercise library, with feature highlights for plans, progress tracking, reminders and a personal profile in a blue theme.",
    year: "2024",
    featured: true,
    github: null,
    demo: null,
    caseStudy: {
      summary:
        "A local-first Flutter app for structured training plans, progress tracking and daily completion.",
      overview: [
        "Workout Tracker keeps training data on the device: plans, sessions and streaks are stored locally, so the app works offline and holds no user account.",
        "The interface is built around a short logging flow — open the app, record the session, see progress — rather than a feature-heavy dashboard.",
      ],
      features: [
        "Structured workout plans",
        "Session logging and history",
        "Progress and streak tracking",
        "Daily completion reminders",
        "Offline, local-first storage",
        "Responsive layouts across screen sizes",
      ],
      problem: [
        {
          title: "Logging has to be frictionless",
          body: "Training apps fail when recording a set takes too many taps, especially right after a workout.",
        },
        {
          title: "Data should not depend on a server",
          body: "A personal tracker does not need accounts or connectivity, and local storage removes both latency and privacy concerns.",
        },
        {
          title: "Progress must stay visible",
          body: "Users need immediate feedback on consistency to keep using the app over weeks, not days.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Requirements and data model",
          body: "Define the core entities — plan, exercise, session, completion — and how they relate before writing UI code.",
        },
        {
          index: "02",
          title: "Local storage schema",
          body: "Design a persistent local schema with migrations so plan and session history survives app updates.",
        },
        {
          index: "03",
          title: "State management",
          body: "Structure app state so screens read from a single source of truth and writes stay predictable.",
        },
        {
          index: "04",
          title: "UI and navigation",
          body: "Build the plan, session and history screens with a consistent component set and touch-friendly controls.",
        },
        {
          index: "05",
          title: "Reminders",
          body: "Add local notifications for daily completion prompts that work without a backend.",
        },
        {
          index: "06",
          title: "Responsive polish",
          body: "Tune spacing, typography and layout for small and large screens, then refine transitions and empty states.",
        },
      ],
      architecture: [
        { label: "App UI", detail: ["Plan", "Session", "History"] },
        { label: "State Layer", detail: ["Controllers", "Derived progress"] },
        { label: "Local Storage", detail: ["Persistence", "Migrations"] },
        { label: "Feedback", detail: ["Progress rings", "Reminders"], emphasis: true },
      ],
      datasets: [],
      results: [],
      challenges: [
        {
          title: "Consistent persistence",
          body: "Keeping the local database consistent across interrupted sessions and app restarts required explicit write and migration handling.",
        },
        {
          title: "Responsive density",
          body: "Plan and session screens carry a lot of information; reflowing them cleanly for small phones without truncation took several layout iterations.",
        },
        {
          title: "Reliable reminders",
          body: "Local notifications behave differently across Android versions, so scheduling needed defensive handling.",
        },
      ],
      lessons: [
        "Modelling the data before the screens removed most structural rework later.",
        "Local-first design keeps the app fast and removes entire classes of account and sync bugs.",
        "Empty and error states deserve as much design attention as the happy path.",
      ],
    },
  },
  {
    slug: "mafia-social-deduction",
    title: "Mafia Local Multiplayer Game",
    category: "Mobile",
    categoryLine: "Flutter · Local Multiplayer · Mobile",
    filters: ["Mobile", "Other"],
    description:
      "A Flutter-based local multiplayer Mafia game for 4–10 Android phones in the same room: one device hosts, the rest discover and join automatically over the local network — no Internet, backend or accounts.",
    longDescription:
      "Mafia Local Multiplayer Game is a Flutter/Dart Android application that turns a group of people physically together into a social-deduction game of Mafia. One smartphone becomes the Host: it creates the room, keeps the authoritative game state and synchronizes events. Nearby devices act as Clients — they discover the room automatically, join with one tap (no IP or port entry) and receive only the private information their role allows. The system targets roughly 4–10 devices, runs entirely on the local network without Internet, cloud services, Firebase or user accounts, and is distributed as a single release APK installed manually on each device. The networking layer is deliberately independent of Mafia's rules, so the same Host/Client foundation can later support other social or party games.",
    technologies: [
      "Flutter",
      "Dart",
      "Android",
      "Local Networking",
      "Host/Client Architecture",
      "Service Discovery",
      "Real-Time Sync",
      "Offline-First",
      "UI/UX Design",
    ],
    image: asset("/general images/Mafia Night_ Local Multiplayer Gathering.png"),
    imageAlt:
      "Cinematic Mafia night scene: players around a lantern-lit table holding smartphones, one central Host phone with a Start Game screen and four Client phones showing a Join Game screen with automatic discovery, connected by Wi-Fi signals, with Mafia, Doctor and Citizen role cards on the table.",
    year: "2024",
    featured: true,
    github: null,
    demo: null,
    document: asset("/files/Mafia_Local_Multiplayer_Game_Project_Documentation.docx"),
    caseStudy: {
      summary:
        "A Flutter-based local multiplayer Mafia game for 4–10 Android phones in the same physical space: a Host-authoritative architecture with automatic local discovery, real-time state synchronization and one-tap joining — with no Internet, backend, accounts or manual IP configuration.",
      overview: [
        "Mafia is a social-deduction game in which players receive hidden roles and move through night and day phases, trying to identify the opposing faction while protecting their own. This project turns that experience into a coordinated mobile game where every participant has a private screen while the group still plays together in the same room.",
        "One smartphone acts as the Host. It creates the local game room, advertises it on the nearby network, accepts connections, maintains the player list, assigns roles privately, and holds the single authoritative game state. The remaining smartphones act as Clients: they search for nearby rooms, list them with name and player count, and join with one tap — no IP address or port is ever typed.",
        "Gameplay never touches the Internet. Communication runs over the local network (or a Host-created hotspot), so the game stays fully usable with no router, no cloud service, no Firebase, no remote database and no user accounts. Distribution is a single Flutter release APK installed manually on every participating device; the Host vs Client role is chosen at runtime, not by separate builds.",
        "The architecture is intentionally game-agnostic. The networking, discovery, session and synchronization layers do not hard-code Mafia's rules, so the same Host/Client foundation can later carry additional Mafia roles, alternative social-deduction modes or entirely different party games. This page documents the designed system and its specification; it does not claim Google Play publication or cloud infrastructure.",
      ],
      features: [
        "Host-created local room with automatic advertisement on the nearby network",
        "One-tap joining: rooms appear in a discovery list, no IP or port entry",
        "Targeted at approximately 4–10 nearby Android devices",
        "Host-authoritative game state — clients send intent, never overwrite state",
        "Private role assignment (Mafia, Citizen, Doctor, extensible roles)",
        "Phase-driven game loop: setup → night → day discussion → voting → elimination",
        "Real-time synchronization of actions, phase changes and timers",
        "Lobby with player list, readiness state and host-controlled start",
        "Explicit connection states: searching, connecting, playing, reconnecting, room full",
        "Fully offline: no Internet, backend, accounts or cloud dependency",
        "Single release APK for all devices; role chosen at runtime",
        "Networking layer reusable for other local social/party games",
      ],
      problem: [
        {
          title: "Classic Mafia needs a moderator",
          body: "Traditional Mafia requires one person to narrate and manage a shared deck of role cards, which pulls someone out of the game and makes every night phase depend on manual bookkeeping.",
        },
        {
          title: "Online multiplayer infrastructure is the wrong fit",
          body: "Most mobile multiplayer solutions assume accounts, cloud servers, matchmaking and Internet access — heavy requirements for a group of friends already sitting at the same table.",
        },
        {
          title: "Manual networking breaks the experience",
          body: "Requiring players to enter IP addresses, open ports or configure hotspots puts a technical barrier in front of what should be a five-second join.",
        },
        {
          title: "Hidden information must stay hidden",
          body: "Every player needs a private screen, but roles, night actions and dead-player identity must never leak through synchronization or shared state.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Host-authoritative design",
          body: "Model one device as the source of truth. Clients send intended actions; the Host validates them against the current phase and player, updates the state and broadcasts the result — minimizing divergence and keeping the rules in one place.",
        },
        {
          index: "02",
          title: "Automatic local discovery",
          body: "Hide networking from the user: opening Join Game starts a search, nearby rooms appear with name and player count, and connecting happens automatically — no IP addresses, no ports, no manual setup.",
        },
        {
          index: "03",
          title: "Layered Flutter architecture",
          body: "Separate presentation, game rules, networking, session and platform concerns into distinct layers (core, game, networking, features) so the engine, protocol and UI can evolve independently.",
        },
        {
          index: "04",
          title: "Structured message protocol",
          body: "Define explicit message types — discover/advertise, join request/accepted/rejected, player joined/left/ready, start, role assignment, game state, action, action result, phase changed, timer, game over, heartbeat and error — instead of ad-hoc strings.",
        },
        {
          index: "05",
          title: "Private role and phase engine",
          body: "Assign roles on the Host and deliver each player only their private role card, then drive night, day, voting and elimination through an explicit state machine with guarded transitions.",
        },
        {
          index: "06",
          title: "Connection and failure handling",
          body: "Track an explicit state per client (searching, room found, connecting, connected, waiting, playing, reconnecting, disconnected, host unavailable, room full, game started) and treat Host disconnection as a first-class case.",
        },
        {
          index: "07",
          title: "Offline-first UX",
          body: "No login, no cloud, no Internet. Ship one release APK (flutter build apk --release) installed manually on every device, and keep technical networking details out of the player-facing interface.",
        },
        {
          index: "08",
          title: "Device-scale testing strategy",
          body: "Validate on physical Android hardware: Host creation, single join, then 4, 6, 8 and ~10 devices; local networks without Internet; Host hotspot mode; repeated join/leave; simultaneous actions; host/client disconnection; room-full and permission flows.",
        },
      ],
      architecture: [
        { label: "Host Room", detail: ["Create game", "Advertise room"] },
        { label: "Discovery", detail: ["Auto search", "Room list"], emphasis: true },
        { label: "Lobby", detail: ["Players", "Readiness", "One-tap join"] },
        {
          label: "Game Engine",
          detail: ["Role assignment", "Night / Day / Vote"],
          emphasis: true,
        },
        { label: "Sync", detail: ["Validate on Host", "Broadcast state"] },
        { label: "Result", detail: ["Elimination", "Win check", "New round"] },
      ],
      datasets: [],
      results: [
        { label: "Player target", value: "4–10", hint: "Nearby Android devices per room" },
        { label: "Internet", value: "None", hint: "Local network / hotspot only" },
        { label: "Backend", value: "None", hint: "No cloud, Firebase or database" },
        { label: "Accounts", value: "None", hint: "No login for local gameplay" },
        { label: "Distribution", value: "1 APK", hint: "Manually installed; role chosen at runtime" },
        { label: "Join flow", value: "1 tap", hint: "Automatic discovery, no IP/port entry" },
        { label: "Play publication", value: null, hint: "Not claimed — manual APK install" },
        { label: "Device test results", value: null, hint: "Pending verified multi-device evaluation" },
      ],
      challenges: [
        {
          title: "Discovery without assuming a network",
          body: "Wi-Fi being enabled does not mean a usable network exists. The design must support shared local networks, a Host-created hotspot and peer-to-peer options, and pick the transport only after real-device validation.",
        },
        {
          title: "Keeping state single-sourced",
          body: "Every important decision — votes, night actions, eliminations — must be finalized only on the Host. Clients render received state, so invalid or out-of-phase actions have to be rejected cleanly without desynchronizing the room.",
        },
        {
          title: "Privacy of hidden roles",
          body: "Role assignment and night actions are private by rule, so the synchronization layer must address messages per player instead of broadcasting a full global state.",
        },
        {
          title: "Host failure and disconnects",
          body: "If the Host disappears, the whole room depends on it. Clients must detect the loss, surface a clear message and terminate predictably; host migration is deferred rather than added for complexity.",
        },
        {
          title: "Android platform variance",
          body: "Discovery and local networking behave differently across Android versions and permission flows, so only necessary permissions are requested and each version-specific behavior is handled explicitly.",
        },
      ],
      lessons: [
        "Host-authoritative state eliminates most multiplayer desync bugs: clients express intent, the server of the room decides.",
        "Hiding networking behind automatic discovery and one-tap join is what makes a technically complex product feel simple at the table.",
        "Defining a structured message protocol up front (join, ready, role, action, phase, heartbeat, error) prevents the ad-hoc string spaghetti that kills local multiplayer projects.",
        "Designing the networking layer to be game-agnostic turns a Mafia app into a reusable local party-game engine.",
        "Offline-first is a product decision, not a technical one: no accounts, no Internet and manual APK distribution keep the focus on the people in the room.",
        "Multi-device behavior must be validated on physical hardware at the real player counts (4, 6, 8, ~10) — emulators cannot prove discovery or latency.",
      ],
    },
  },
  {
    slug: "english-learning-planner",
    title: "English Learning Planner & Vocabulary Tracker",
    category: "Mobile",
    categoryLine: "Mobile · Flutter · Language Learning",
    filters: ["Mobile", "Other"],
    description:
      "A local-first Flutter app for organizing an English-learning routine, tracking daily study progress, and building vocabulary through a structured 1,000-word reference library.",
    longDescription:
      "A personal English-learning planner built with Flutter to organize an intensive daily study routine and make progress easy to track. The app combines an 8-week learning plan, daily activity tracking, grammar progress, and a structured vocabulary library powered by a local JSON dataset. It is designed to work offline, keep user progress locally, and turn a broad language-learning goal into a clear, measurable workflow.",
    technologies: ["Flutter", "Dart", "JSON", "Local Storage", "Material Design", "Responsive UI"],
    image: asset("/images/projects/english-learning-planner.png"),
    imageAlt:
      "Dark-mode Flutter English-learning planner with study progress, vocabulary tracking, and an English vocabulary detail card.",
    year: "2026",
    featured: true,
    github: null,
    demo: null,
    caseStudy: {
      summary:
        "A local-first Flutter application that organizes an 8-week English-learning plan and tracks daily study, grammar, vocabulary, and overall progress.",
      overview: [
        "A personal English-learning planner built with Flutter to organize an intensive daily study routine and make progress easy to track.",
        "It combines an 8-week learning plan, daily activity tracking, grammar progress, and a structured vocabulary library powered by a local JSON dataset.",
        "The app is local-first: it works offline and keeps user progress on the device, turning a broad language-learning goal into a clear, measurable workflow. No backend or live demo is currently specified.",
      ],
      features: [
        "8-week structured English-learning plan",
        "120-minute daily study organization",
        "Vocabulary library powered by local JSON data",
        "English words with Arabic meanings, examples, and common phrases",
        "Local vocabulary progress and review states",
        "Grammar and daily activity tracking",
        "Progress dashboard with dynamically calculated statistics",
        "Permanent dark-mode mobile UI based on approved design references",
      ],
      problem: [
        {
          title: "A broad goal without a daily plan",
          body: "A goal such as learning English is hard to act on when it is not broken into a daily routine with measurable steps, so the app starts from a fixed 8-week plan with a 120-minute daily structure.",
        },
        {
          title: "Vocabulary scattered across sources",
          body: "Words, Arabic meanings, examples and common phrases stay reviewable only when they live in one structured place, so the library is held in a local JSON dataset instead of loose notes.",
        },
        {
          title: "Progress lost between sessions",
          body: "Study minutes, grammar progress and review states have to survive restarts without a server, so all state is persisted locally on the device.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Reference design",
          body: "Approved design references are treated as visual specifications and recreated as functional Flutter components.",
        },
        {
          index: "02",
          title: "Screens and local state",
          body: "Planner, vocabulary and progress screens are wired to local state so the interface updates instantly without a network round trip.",
        },
        {
          index: "03",
          title: "Vocabulary data layer",
          body: "The JSON asset is parsed into strongly typed models and exposed through a vocabulary repository that handles search and review states.",
        },
        {
          index: "04",
          title: "Progress and persistence",
          body: "Daily activity, grammar progress and review states are calculated dynamically from stored data and written to local storage.",
        },
        {
          index: "05",
          title: "Dashboard output",
          body: "The dashboard reads those stored values to present plan completion, study time and vocabulary progress.",
        },
      ],
      architecture: [
        { label: "UI Reference Design", detail: ["Approved mockups"] },
        { label: "Flutter UI", detail: ["Planner", "Vocabulary", "Progress"] },
        { label: "Local State", detail: ["Daily plan", "Review states"] },
        { label: "Vocabulary Data", detail: ["JSON asset", "Typed model", "Repository", "Search"] },
        { label: "Local Persistence", detail: ["Progress", "Activity"] },
        { label: "User Output", detail: ["Dashboard", "Library"], emphasis: true },
      ],
      datasets: [
        {
          name: "english_words_first_1000_deep_reviewed.json",
          type: "Vocabulary JSON",
          note: "Local dataset containing English vocabulary entries with Arabic meanings, examples, and common phrases.",
          verified: true,
        },
      ],
      results: [
        { label: "Vocabulary entries", value: "1000", hint: "Verified against the local dataset" },
        { label: "Daily study plan", value: "120 minutes", hint: "Structured daily routine" },
        { label: "Learning plan", value: "8 weeks", hint: "Structured English-learning roadmap" },
        { label: "Offline operation", value: "Yes", hint: "Local-first application architecture" },
      ],
      challenges: [
        {
          title: "Local-only state management",
          body: "Without a backend, persistence, state updates and data integrity all have to be handled on the device, which makes the data layer the core of the app.",
        },
        {
          title: "Making progress measurable",
          body: "Dashboard numbers are derived from stored activity rather than hardcoded, so the calculations must stay consistent across the planner, grammar and vocabulary views.",
        },
        {
          title: "Recreating the reference design",
          body: "Each screen started as a static mockup and had to be rebuilt as a real component while keeping the same spacing, type scale and permanent dark-mode styling.",
        },
      ],
      lessons: [
        "Separating content data from user-generated progress makes the vocabulary system easier to maintain and extend.",
        "Local-first architecture is sufficient for a personal learning tracker and keeps the core workflow available offline.",
        "Strongly typed models and a dedicated repository make JSON-based vocabulary data safer to consume from Flutter UI.",
        "Dynamic progress calculations are more reliable than hardcoded dashboard values.",
        "UI reference images are most useful when treated as visual specifications and recreated as functional components.",
      ],
    },
  },
  {
    slug: "local-services-platform",
    title: "Local Services Platform",
    category: "Mobile",
    categoryLine: "Mobile · Arabic RTL · Product & UX",
    filters: ["Mobile", "Other"],
    description:
      "A mobile-first, fully Arabic (RTL) platform for Jordan that connects customers with trusted local service providers — designed to make existing habits easier, not replace them.",
    longDescription:
      "Local Services Platform is a mobile-first Arabic product concept for the Jordanian market that connects citizens with electricians, plumbers, AC technicians, carpenters, movers and other skilled workers. Instead of forcing people through a marketplace workflow, it wraps a simple digital layer around how they already find workers: contact a known provider directly, or discover a new one when needed. The project is currently at the field-research and UX-design stage, ahead of the proposed MVP.",
    technologies: [
      "Mobile-first UX",
      "Arabic RTL",
      "UX Research",
      "Field Interviews",
      "User Flows",
      "Product Design",
      "Trust & Safety",
    ],
    image: asset("/general images/Connecting Amman Homes with Trusted Services.png"),
    imageAlt:
      "Connecting Amman homes with trusted services: two phones showing an Arabic RTL home-services app — a customer booking a service and a verified worker profile — with a customer at home, a worker in Amman, and trust, location and availability icons.",
    year: "2026",
    featured: true,
    github: null,
    demo: null,
    caseStudy: {
      summary:
        "A mobile-first Arabic (RTL) service-connection app for Jordan, presented as a research- and UX-driven product concept: problem framing, field interviews, behavioural insights, user flows and a proposed MVP — not a commercially validated product.",
      overview: [
        "Local Services Platform connects customers with local service providers — electricians, plumbers, AC technicians, carpenters, painters, movers and cleaners — in a fully Arabic, mobile-first experience built for the Jordanian market.",
        "Its core UX philosophy is “do not replace existing habits; make them easier.” A customer who already knows a worker can contact that person directly, while a customer who does not know anyone gets a simple discovery path through the marketplace.",
        "The project is at the research and design stage: recorded field interviews (conducted with consent) are transcribed, structured and analysed before any MVP code is written. There is no production implementation and no validated business results yet — the sections below separate design decisions, research hypotheses and targets from anything actually measured.",
      ],
      features: [
        "Fully Arabic RTL interface, light theme primary with optional dark mode",
        "Role selection: customer or service provider",
        "Phone + password signup with OTP verification",
        "Home screen that prioritises known and previously used providers",
        "Direct contact with a known provider, bypassing the marketplace flow",
        "Marketplace discovery by service category, problem, location and time",
        "Provider profiles with verification, ratings, experience and completed jobs",
        "Chat and calling between customer and provider",
        "Request status tracking: Accepted → On the Way → Arrived → Completed",
        "Ratings tied to completed services rather than open reviews",
        "Simplified provider home screen with an Available / Unavailable state",
        "Basic admin layer for verification, users and requests",
      ],
      problem: [
        {
          title: "Finding a provider relies on personal networks",
          body: "People usually find workers through personal connections, saved phone numbers and WhatsApp — which breaks down the moment the user does not already know someone suitable.",
        },
        {
          title: "Trust is invisible before hiring",
          body: "It is often unclear how trustworthy, experienced or reliable a provider is before the job starts, and unrestricted reviews do not prove that real work was completed.",
        },
        {
          title: "Requests are hard to organise",
          body: "Calls, appointments and conversations scatter across different apps, so both sides lose track of what was agreed, what is pending and what happened.",
        },
        {
          title: "Existing platforms feel too complex",
          body: "Marketplace-style flows can feel unnecessarily complicated, especially for users with limited digital experience who simply want to contact someone they already trust.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Field research before code",
          body: "Recorded interviews with service providers, customers and local businesses — conducted with consent, then transcribed and structured — are gathered before building the MVP, so features trace back to observed behaviour instead of developer assumptions.",
        },
        {
          index: "02",
          title: "Structured interview analysis",
          body: "Each interview receives a unique ID with structured metadata, transcript, quotes, pain points, needs, observations and potential opportunities, so participants can be compared consistently.",
        },
        {
          index: "03",
          title: "Behavioural insights",
          body: "Once enough interviews are collected, recurring patterns are identified across pain points, needs, current behaviours, trust factors, direct quotes, objections and feature opportunities.",
        },
        {
          index: "04",
          title: "UX principles",
          body: "Insights become concrete rules: one clear decision per screen, large touch targets, short text, minimal registration, and never a forced request flow when the customer simply wants to call someone they know.",
        },
        {
          index: "05",
          title: "User flows",
          body: "Onboarding (role → signup → phone verification), the known-provider fast path, the marketplace discovery path, and the provider job flow: Accepted → On the Way → Arrived → Completed.",
        },
        {
          index: "06",
          title: "Interface design",
          body: "A clean, friendly Arabic RTL interface: blue as the primary colour to signal trust, light backgrounds, green availability states, simple cards, large buttons and first-use comprehension without a tutorial.",
        },
        {
          index: "07",
          title: "Proposed MVP scope",
          body: "Authentication and verification, provider profiles, saved known providers, service discovery and search, chat and calling, request tracking with status, post-service ratings, a simplified provider dashboard and a basic admin layer.",
        },
        {
          index: "08",
          title: "Validation plan",
          body: "Launch in one focused geographic area, recruit providers through field outreach, local shops and referrals, then measure completion, cancellation, disputes, repeat usage and provider activity — targeting 100–500 reliable completed transactions rather than downloads.",
        },
      ],
      architecture: [
        { label: "Welcome", detail: ["Get Started", "Choose role"] },
        { label: "Authentication", detail: ["Phone + password", "OTP verification"] },
        { label: "Customer Home", detail: ["Known providers", "Direct contact"], emphasis: true },
        { label: "Marketplace", detail: ["Category", "Problem", "Location", "Time"] },
        { label: "Provider Matching", detail: ["Ratings", "Distance", "Availability"] },
        { label: "Job Flow", detail: ["Accepted", "On the Way", "Arrived", "Completed"] },
        { label: "Feedback", detail: ["Chat & call", "Rating after completion"] },
      ],
      datasets: [
        {
          name: "Field interview study (recorded with consent)",
          type: "Qualitative research data",
          note: "Structured transcripts with unique IDs, metadata, quotes, pain points, needs and opportunities across service providers, customers and local businesses.",
          verified: false,
        },
      ],
      results: [
        { label: "Stage", value: "Research & design", hint: "Pre-MVP product concept" },
        { label: "Primary users", value: "3 roles", hint: "Customers, service providers, local businesses" },
        { label: "Launch strategy", value: "Amman first", hint: "Focused area before wider rollout" },
        { label: "Validation milestone", value: null, hint: "100–500 reliable completed transactions (target)" },
        { label: "Interviews analysed", value: null, hint: "Field research ongoing" },
      ],
      challenges: [
        {
          title: "Research before code",
          body: "Resisting the urge to build first is its own discipline: the process commits to recorded interviews and structured analysis before writing MVP code, so every feature has to be justified by observed behaviour rather than assumptions.",
        },
        {
          title: "Two audiences, different complexity budgets",
          body: "The provider experience must be even simpler than the customer experience — availability, requests, status and communication — while still carrying trust features such as verification, ratings and job history.",
        },
        {
          title: "Trust without becoming a review platform",
          body: "Phone verification, identity and profession checks, ratings tied to completed services and a service record have to raise trust while staying legally applicable and manageable for a small early team.",
        },
        {
          title: "Simplicity for limited digital experience",
          body: "One decision per screen, large touch targets and no tutorial means every flow has to remain understandable on first use by people who are not comfortable with apps.",
        },
      ],
      lessons: [
        "Preserving existing habits — direct contact with a known worker — beats forcing every user through a marketplace workflow.",
        "Writing interview guides around fixed topics (acquisition, pricing, trust, willingness to pay) keeps qualitative data comparable across participants.",
        "Giving every interview a stable ID and structured fields turns conversation into data that patterns can actually be extracted from.",
        "Ratings tied to completed services are far more trustworthy than unrestricted reviews.",
        "Launching in one focused area and measuring completed, reliable transactions — not downloads — keeps early validation honest.",
        "A pricing model such as a low monthly subscription stays a hypothesis until customers and providers confirm the value.",
      ],
    },
  },
  {
    slug: "taskflow",
    title: "TaskFlow",
    category: "Mobile",
    categoryLine: "Mobile · Flutter · Productivity",
    filters: ["Mobile"],
    description:
      "A modern local-first task management app built with Flutter that helps users capture, organize, schedule, complete, and review tasks — private and on-device.",
    longDescription:
      "TaskFlow is a local-first personal productivity application designed around a simple idea: task management should be fast, clear, and private. Built for mobile with Flutter, the app lets users create and organize tasks, assign priorities and categories, schedule due dates and local reminders, manage subtasks, track completion, review productivity statistics, customize the experience, and back up their local data. The product requires no account and no cloud service for its core workflow, giving the user a focused offline-first experience.",
    technologies: [
      "Flutter",
      "Dart",
      "Offline-first",
      "Local Storage",
      "Local Notifications",
      "JSON Backup",
      "Light / Dark Themes",
    ],
    image: asset("/general images/TaskFlow Productivity App Showcase.png"),
    imageAlt:
      "TaskFlow productivity app showcase — “Organize Today, Build Tomorrow” — with three phone screens showing today's tasks, a statistics dashboard with a completion chart, and feature highlights for staying on schedule, tracking progress, dark themes, and local & private data.",
    year: "2026",
    featured: true,
    github: null,
    demo: null,
    caseStudy: {
      summary:
        "A local-first Flutter task manager with no accounts and no cloud: capture, organize, schedule, complete and review personal tasks using on-device storage, local reminders, statistics, themes, and validated JSON backup.",
      overview: [
        "TaskFlow is a polished personal task-management application built around a local-first philosophy. The user installs the app on a phone and can immediately use it without creating an account — tasks, categories, reminders, preferences, statistics and backup data are all handled on the device.",
        "The product focuses on five core activities: capturing a new task, organizing tasks by category/priority/status, scheduling tasks with dates and reminders, completing tasks, and reviewing productivity through statistics.",
        "Its product principles are local-first storage, no authentication, offline by default, fast capture, clear hierarchy, safe destructive actions, an accessible UI, and a consistent design system. This page documents the Version 1 scope defined in the project specification — it does not claim cloud sync, multi-user collaboration, or any usage metrics.",
      ],
      features: [
        "No login, sign-up, or account — open the app and start capturing tasks",
        "Fast task capture: title, description, due date/time, category, priority, reminder and subtasks",
        "Categories: Work, Personal, Study, Health, Shopping, Other, plus custom categories",
        "Priorities (Low / Medium / High) and statuses (Pending / In Progress / Completed)",
        "Local search with filters for status, category, priority, due date and completion state",
        "Sorting by due date, creation date, priority and alphabetical order",
        "Calendar with date indicators and date-based task planning",
        "Local reminders through platform notifications — no server required",
        "Subtask checklists with ordering",
        "Statistics: time-range summaries, completion chart, completion rate, category distribution and insight",
        "Light and dark themes with configurable appearance and task density",
        "Versioned local JSON backup and restore with validation",
        "Bottom navigation: Home, Tasks, Add, Calendar, Profile",
      ],
      problem: [
        {
          title: "Task apps demand an account first",
          body: "Most task managers ask for an email, password or social login before the first task can be written, which adds friction and creates a data trail for a tool that is fundamentally personal.",
        },
        {
          title: "Cloud-first products break offline",
          body: "When core workflows depend on a server, poor connectivity turns everyday capture and completion into error states instead of normal operation.",
        },
        {
          title: "Capture becomes a form",
          body: "Over-structured creation flows slow people down at exactly the moment they need to write something down quickly, so the essential fields have to stay minimal.",
        },
        {
          title: "Progress stays invisible",
          body: "Without a review step, completed work disappears into history and the user gets no sense of consistency, completion rate, or where effort actually went.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Product principles first",
          body: "Fix the constraints before screens: local-first data, no authentication, offline by default, fast capture, clear hierarchy, safe destructive actions and an accessible, consistent UI.",
        },
        {
          index: "02",
          title: "Domain model",
          body: "Define the task domain explicitly: Task, Subtask, Category, Reminder and Preferences entities with stable IDs, timestamps, ordering and completion state.",
        },
        {
          index: "03",
          title: "Layered architecture",
          body: "Presentation (screens, widgets, navigation, theme, state), Application (use cases, controllers, validation, business rules), Domain (entities and repository contracts), Data (local persistence, repository implementations, JSON backup, mappers).",
        },
        {
          index: "04",
          title: "Feature-oriented slices",
          body: "Organise the app by feature areas — splash, onboarding, dashboard, tasks, calendar, categories, reminders, statistics, profile, settings — backed by shared services for storage, notifications and backup.",
        },
        {
          index: "05",
          title: "Task lifecycle",
          body: "Completion is a state machine, not a checkbox: status changes, completedAt is recorded, future reminders are cancelled, dashboard counters and statistics update, and the task remains in history.",
        },
        {
          index: "06",
          title: "Planning surfaces",
          body: "Calendar dates show task indicators and filter the day's list; search and filters run entirely locally; filter state is preserved when returning from task details where practical.",
        },
        {
          index: "07",
          title: "Local reminders",
          body: "Reminders use the platform's local notification mechanism with no server: disabled reminders stay stored but unscheduled, and completing a task cancels its future reminders.",
        },
        {
          index: "08",
          title: "Backup and validation",
          body: "A versioned local JSON export carries exportedAt metadata, tasks, categories and preferences; import validates the version and safely rejects malformed data without uploading anything.",
        },
      ],
      architecture: [
        { label: "Splash", detail: ["Local init", "Load preferences"] },
        { label: "Onboarding", detail: ["First launch only"], },
        { label: "Home Dashboard", detail: ["Today & upcoming", "Summary cards"], emphasis: true },
        { label: "Task Management", detail: ["Capture", "Categories", "Priority", "Subtasks"] },
        { label: "Planning", detail: ["Calendar", "Local reminders", "Search & filters"] },
        { label: "Review", detail: ["Statistics", "Completion rate", "Insights"] },
        { label: "Local Persistence", detail: ["On-device storage", "JSON backup & restore"] },
      ],
      datasets: [
        {
          name: "Local task store",
          type: "On-device structured data",
          note: "Tasks, subtasks, categories, reminders and preferences held on the device; the specification lists Isar, Drift/SQLite and Hive as candidate storage options.",
          verified: false,
        },
        {
          name: "Versioned JSON backup",
          type: "Local export file",
          note: "Exported tasks, categories and preferences with exportedAt metadata; validated on import and never uploaded to a server.",
          verified: false,
        },
      ],
      results: [
        { label: "Product model", value: "Local-first", hint: "Task data stays on the device" },
        { label: "Authentication", value: "None", hint: "No login or sign-up in Version 1" },
        { label: "Backend", value: "Not required", hint: "Offline by default for core features" },
        { label: "Core activities", value: "5", hint: "Capture, organize, schedule, complete, review" },
        { label: "Documented screens", value: "19", hint: "From Splash to Backup & Restore in the screen inventory" },
        { label: "Production metrics", value: null, hint: "No downloads, revenue or usage figures claimed" },
      ],
      challenges: [
        {
          title: "Data integrity without a server",
          body: "There is no backend to reconcile or repair state: persistence, validation, migrations and backup integrity all have to hold up entirely on the device.",
        },
        {
          title: "Reliable reminders with no infrastructure",
          body: "Scheduling, disabling, and cancelling local notifications — especially cancelling future reminders the moment a task completes — is the trickiest edge of an offline product.",
        },
        {
          title: "Fast capture that still captures structure",
          body: "The creation flow must stay minimal while still collecting enough structure (category, priority, date, subtasks) for the rest of the product to be useful.",
        },
        {
          title: "Safe import of user data",
          body: "Backup restore overwrites local state, so versioning and malformed-data rejection have to be strict enough to protect the user without making legitimate restores fail.",
        },
      ],
      lessons: [
        "Removing authentication removes an entire class of failure states — and forces the privacy story to be designed, not just promised.",
        "Local-first architecture means normal operation never produces an internet-error experience.",
        "Keeping task rules in a domain layer independent of widgets makes the lifecycle testable.",
        "Destructive actions should earn confirmation or undo before they are given speed.",
        "Versioning turns a risky import into a validated, recoverable operation.",
        "A consistent spacing and token scale is what makes a large screen inventory feel like one product.",
      ],
    },
  },
  {
    slug: "securechat",
    title: "SecureChat",
    category: "Mobile",
    categoryLine: "Mobile · Flutter · Secure Messaging",
    filters: ["Mobile", "Cybersecurity"],
    description:
      "A privacy-focused Flutter messenger for a small trusted group — Firebase Authentication, real-time Firestore messaging, participant-based security rules, and an application-layer encryption architecture.",
    longDescription:
      "SecureChat is a private, security-focused mobile messaging application designed for a small trusted group of approximately ten users. It provides a familiar chat experience while making privacy and security part of the underlying architecture instead of something users have to manage: cryptographic operations happen in the background, private keys stay on the device, and access is limited to conversation participants. The project combines a premium dark UI with Firebase Authentication, real-time Cloud Firestore messaging, emulator-based development and automated testing, and a planned voice-only WebRTC calling layer.",
    technologies: [
      "Flutter",
      "Dart",
      "Firebase",
      "Cloud Firestore",
      "Firebase Auth",
      "Emulator Suite",
      "FCM",
      "WebRTC",
    ],
    image: asset("/general images/SecureChat_app.png"),
    imageAlt:
      "SecureChat showcase in dark navy and neon purple: a shield-and-lock logo, a phone showing the chat list, and badges for End-to-End Encrypted, Your Privacy Matters and Fast & Secure, captioned “Private conversations for a safer tomorrow.”",
    year: "2026",
    featured: true,
    github: null,
    demo: null,
    caseStudy: {
      summary:
        "A privacy-focused Flutter messaging app for a small trusted group (~10 users) with Firebase Authentication, real-time Firestore messaging, participant-based security rules and an application-layer encryption architecture — with implemented features kept clearly separate from planned ones.",
      overview: [
        "SecureChat is a private messaging application for a small trusted group of roughly ten users. It keeps the normal flow simple — register, find a person, open a chat, send messages — while making security largely invisible to everyday users: no manual key creation, copying or sharing, and optional Security Code / QR verification for those who want it.",
        "Implemented and configured today: a runnable Flutter project connected to a Firebase project through FlutterFire, Firebase Authentication with email/password and phone verification, Cloud Firestore in Production mode, a feature-oriented Flutter architecture, local Firebase Emulator smoke testing, and 23 unit tests reported passing at the current checkpoint. Text messaging is the core implementation target.",
        "Planned or deferred by design: Cloud Storage is not enabled while the Firebase project remains on Spark, so media and voice-message uploads are deferred; voice calling exists as a voice-only WebRTC architecture (no video calling, which is out of scope); and a production-grade E2EE claim depends on the final implementation actually using and verifying a vetted cryptographic protocol.",
      ],
      features: [
        "Firebase Authentication with email/password and phone (SMS) verification",
        "Real-time one-to-one text messaging built on Cloud Firestore listeners",
        "Unread counts, last-message previews, timestamps and pagination for older history",
        "Participant-based Firestore security rules — no reading conversations you are not part of",
        "Four-screen onboarding using the supplied SecureChat artwork",
        "Dark navy/black visual system with neon purple accents and controlled glow",
        "Firebase Emulator Suite development and smoke testing, isolated from production quota",
        "23 unit tests reported passing at the current checkpoint",
        "Planned: application-layer message encryption before content is written to Firestore",
        "Planned: voice-only WebRTC calls with FCM call notifications and STUN/TURN connectivity",
        "Planned: encrypted media upload flow (local encryption → upload → download → decrypt) once Cloud Storage is enabled",
        "Designed: disappearing messages, device management, group chat and Security Code / QR verification",
      ],
      problem: [
        {
          title: "Privacy that users cannot feel",
          body: "Security features that force ordinary people to create, copy and share keys scare them away from the product, so cryptographic operations have to happen in the background while the visible flow stays register → discover → chat.",
        },
        {
          title: "Small groups still leak through the backend",
          body: "A trusted group of ten people still sends its content through servers: plaintext stored in Firestore or carried in notification payloads exposes every conversation to anyone with database, log or payload access.",
        },
        {
          title: "Authentication is not authorization",
          body: "Proving who a user is does not stop an authenticated account from reading conversations it does not belong to, so participant-level access control has to live in the security rules themselves.",
        },
        {
          title: "Development must not burn production",
          body: "The production Firestore project hit an HTTP 429 RESOURCE_EXHAUSTED write-quota condition during development, which can mask real defects — dev and test flows need their own environment.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Security-first product philosophy",
          body: "Keep cryptographic complexity off the user: no Contacts or Discover tabs, new conversations start from a single + button, Security Code / QR verification stays optional, and the app handles keys in the background.",
        },
        {
          index: "02",
          title: "Premium dark design system",
          body: "Deep navy/black surfaces, purple accent for actions, rounded cards with subtle borders and controlled glow — with interactive controls built as real Flutter widgets layered over the supplied background artwork rather than redrawn decorations.",
        },
        {
          index: "03",
          title: "Feature-oriented Flutter architecture",
          body: "A layered lib/ structure — core (theme, services, security, errors), data (models, repositories, datasources), and feature modules for auth, chat, calls, profile and settings — with Riverpod preferred as the single state-management solution.",
        },
        {
          index: "04",
          title: "Identity, authorization and rules",
          body: "Firebase Authentication owns identity (email/password, phone, password reset), while Firestore Security Rules enforce participant-only access, protect profile fields from cross-user edits, never allow private keys to be written, and are tested with the Emulator Suite — never left as open production rules.",
        },
        {
          index: "05",
          title: "Real-time messaging core",
          body: "Conversation creation, message send/receive with timestamps and status states, unread counts, pagination for history, and explicit loading, empty, offline and error states — all driven by efficient Firestore listeners instead of polling.",
        },
        {
          index: "06",
          title: "Encryption architecture",
          body: "Message content is encrypted on the device before it reaches Firestore; private keys never leave secure device storage or enter Firestore, SharedPreferences, logs and ordinary files; FCM carries only generic payloads; and the critical test is to send a message and inspect Firestore for plaintext.",
        },
        {
          index: "07",
          title: "Emulator-driven development and testing",
          body: "Local Auth and Firestore emulators absorb smoke testing so production quota stays untouched, supported by flutter analyze, flutter test, two-account messaging tests, authorization tests and authentication edge-case coverage.",
        },
        {
          index: "08",
          title: "Planned media and voice layers",
          body: "Cloud Storage stays deferred without forcing billing: text messaging must remain fully functional, image/file flows are designed as encrypt → upload → download → decrypt, and voice calling is scoped to voice-only WebRTC with Opus audio, DTLS-SRTP media encryption and STUN/TURN (coturn or equivalent).",
        },
      ],
      architecture: [
        { label: "Firebase Auth", detail: ["Email/Password", "Phone + SMS", "Password reset"] },
        { label: "Firestore Rules", detail: ["Participants only", "Profile write limits", "No private keys"], emphasis: true },
        { label: "App Layer", detail: ["Flutter features", "Repositories", "Real-time listeners"] },
        { label: "Application Crypto", detail: ["Encrypt on device", "Private keys stay local"] },
        { label: "Cloud Firestore", detail: ["users", "conversations", "messages"] },
        { label: "FCM", detail: ["Generic payloads", "No plaintext content"] },
        { label: "WebRTC (planned)", detail: ["Voice-only", "DTLS-SRTP", "STUN/TURN"] },
      ],
      datasets: [
        {
          name: "Cloud Firestore data model",
          type: "NoSQL collections (Production mode, me-central2)",
          note: "users/{uid}, conversations with participants and messages subcollections carrying ciphertext fields; exercised by local emulator smoke tests.",
          verified: true,
        },
        {
          name: "Firebase Emulator Suite fixtures",
          type: "Local development/test data",
          note: "Local Auth and Firestore emulator state used for smoke testing so development does not consume the production write quota.",
          verified: true,
        },
        {
          name: "Application ciphertext messages",
          type: "Encrypted message content",
          note: "Planned encryption of message content before every write; a production E2EE claim depends on verifying a vetted protocol in the final implementation.",
          verified: false,
        },
      ],
      results: [
        { label: "Target group", value: "~10 users", hint: "Small private trusted group" },
        { label: "Unit tests", value: "23 passing", hint: "Reported at the current checkpoint" },
        { label: "Backend", value: "Firebase", hint: "Auth + Firestore configured; Storage deferred" },
        { label: "E2EE status", value: "Architecture", hint: "Production claim depends on a vetted protocol" },
        { label: "Voice calls", value: "Planned", hint: "Voice-only WebRTC; video is out of scope" },
        { label: "Production metrics", value: null, hint: "No users, downloads or revenue claimed" },
      ],
      challenges: [
        {
          title: "Keeping encryption invisible",
          body: "The product must move keys and ciphertext through the background without ever asking a user to manage them — while still keeping private material on-device and out of Firestore, preferences, logs and files.",
        },
        {
          title: "Authorization beyond authentication",
          body: "Rules must limit every read and write to conversation participants, resist cross-user profile edits, and stay strict without open production permissions — which only becomes provable through emulator tests.",
        },
        {
          title: "Development quota exhaustion",
          body: "A production HTTP 429 RESOURCE_EXHAUSTED condition was diagnosed as a Firebase project quota limitation rather than a profile-creation defect, pushing all routine testing onto the local emulators.",
        },
        {
          title: "Building without billing",
          body: "Cloud Storage is unavailable on the Spark plan, so media, files and voice messages stay deferred: text must keep working, uploads must never be faked, and billing must not be enabled automatically.",
        },
      ],
      lessons: [
        "Security rules are the real access control — authentication only proves who someone is, not what they may read.",
        "Emulators separate development from production quotas and make authorization behaviour testable instead of assumed.",
        "Encryption claims are falsifiable: send a message, inspect the database, and confirm no plaintext is there.",
        "Cryptographic complexity belongs in the background, with optional verification for users who want to go further.",
        "Platform constraints like Spark-plan storage and write quotas should shape scope rather than be hidden with fake success states.",
        "Generic notification payloads keep the privacy promise intact all the way to the operating system layer.",
      ],
    },
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
