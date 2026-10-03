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
  /** Repository URL. null = falls back to the GitHub profile link. */
  github: string | null;
  demo: string | null;
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
      "A two-stage phishing text classifier: a TF-IDF + Logistic Regression baseline filters easy cases and extracts hard samples, which a BERT-based second stage refines.",
    longDescription:
      "ShieldAI is a hierarchical text classification pipeline for phishing detection. A fast, interpretable baseline (TF-IDF + Logistic Regression) produces the first prediction and isolates the samples it gets wrong; only those hard samples are forwarded to BERT embeddings plus a second Logistic Regression classifier for semantic refinement. Residual errors after both stages are saved as a dedicated dataset for future RAG and LLM-based refinement.",
    technologies: [
      "Python",
      "NLP",
      "TF-IDF",
      "Logistic Regression",
      "BERT",
      "scikit-learn",
      "PyTorch",
      "Hugging Face",
    ],
    image: "/general images/ShieldAI Phishing Detection Workspace.png",
    imageAlt:
      "Laptop on a desk showing a ShieldAI phishing detection dashboard concept: an email analysis panel with a sample message, a red 'Phishing Detected' verdict with a confidence score, and an LLM + RAG explanation listing detected phishing indicators.",
    year: "2026",
    featured: true,
    github: null,
    demo: null,
    caseStudy: {
      summary:
        "A hierarchical two-stage phishing text classifier: a fast TF-IDF + Logistic Regression baseline filters easy samples while BERT + Logistic Regression refines the hard ones, with residual errors staged for future RAG and LLM work.",
      overview: [
        "ShieldAI is a two-stage text classification framework designed to balance efficiency and accuracy by progressively focusing computational effort on the samples that need it most.",
        "Stage one represents texts with TF-IDF and classifies them with Logistic Regression, producing a fast, interpretable baseline prediction while identifying hard samples — the texts the baseline fails to classify correctly. Stage two forwards only those hard samples to BERT embeddings plus a second Logistic Regression classifier, which produces the refined final output.",
        "Samples still misclassified after the second stage are isolated into a dedicated error dataset intended for analysis and for future RAG and LLM-based refinement.",
        "The accompanying academic report also documents a critical review of six external open-source phishing detection systems — spanning RAG + LLM integration, ML-based URL detection, real-time browser extensions and LLM-only approaches — used to position this design. Those systems were analysed, not built, as part of this project.",
      ],
      features: [
        "Stratified 70 / 10 / 20 train-validation-test split",
        "Text cleaning with standardised placeholders (URLs, emails, domains, years)",
        "TF-IDF unigram and bigram feature extraction",
        "Stage 1 baseline: Logistic Regression with validation-set tuning",
        "Hard-sample extraction from baseline errors",
        "Stage 2 refinement: BERT embeddings + Logistic Regression",
        "Residual error-set export for future RAG / LLM refinement",
        "Cached intermediate embeddings and checkpoints for faster iteration",
      ],
      problem: [
        {
          title: "Recent data is hard to come by",
          body: "Collecting recent, up-to-date phishing samples required significant effort, and the real-world data arrived with inconsistencies and noise that had to be reconciled before anything could be trained.",
        },
        {
          title: "Raw text is full of noise",
          body: "Links, email addresses, domain references and temporal expressions appear throughout the data and destabilise model behaviour unless they are normalised consistently.",
        },
        {
          title: "Transformer training is expensive",
          body: "Working with BERT embeddings made repeated training cycles costly on the available hardware, and saving trained state between runs was itself error-prone.",
        },
        {
          title: "One model leaves false negatives",
          body: "A single classifier was found insufficient to keep missed detections down, which is what motivated a cascade that spends deeper semantic processing only where the baseline fails.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Dataset collection",
          body: "Load labelled text samples from a structured CSV and remove invalid or incomplete entries so every row carries a consistent label.",
        },
        {
          index: "02",
          title: "Data cleaning",
          body: "Normalise text and replace noise — HTML tags, URLs, email addresses, domain names and standalone years — with standardised placeholders, then lowercase for consistent features.",
        },
        {
          index: "03",
          title: "Sampling and split",
          body: "Split the cleaned dataset into 70% training, 10% validation and 20% test using stratified sampling to preserve label distribution across all three subsets.",
        },
        {
          index: "04",
          title: "TF-IDF embedding",
          body: "Transform texts into numerical vectors with TF-IDF unigram and bigram features that capture surface-level lexical patterns and term importance.",
        },
        {
          index: "05",
          title: "Stage 1 classification",
          body: "Train a Logistic Regression classifier on the TF-IDF features, tune hyperparameters on the validation set, evaluate on the test set, and emit the baseline predictions.",
        },
        {
          index: "06",
          title: "Hard-sample extraction",
          body: "Extract the samples the baseline model misclassified — the hard set — representing cases that require deeper semantic understanding.",
        },
        {
          index: "07",
          title: "Stage 2 refinement",
          body: "Encode hard samples with BERT embeddings and train a second Logistic Regression classifier on top, tuning on the validation set to produce refined predictions.",
        },
        {
          index: "08",
          title: "Merge and error analysis",
          body: "Replace baseline predictions with refined ones for hard samples, then isolate whatever is still misclassified into a dedicated dataset for error analysis and future RAG or LLM refinement.",
        },
      ],
      architecture: [
        { label: "CSV Dataset", detail: ["Labelled text samples", "Invalid rows removed"] },
        { label: "Cleaning", detail: ["Placeholders", "Normalisation", "Lowercasing"] },
        { label: "Stratified Split", detail: ["Train 70%", "Validation 10%", "Test 20%"] },
        {
          label: "Stage 1 · Baseline",
          detail: ["TF-IDF (1–2 grams)", "Logistic Regression"],
        },
        { label: "Hard Samples", detail: ["Baseline errors isolated"] },
        {
          label: "Stage 2 · Refinement",
          detail: ["BERT embeddings", "Logistic Regression"],
          emphasis: true,
        },
        { label: "Final Output", detail: ["Merged predictions", "Residual error set"] },
      ],
      datasets: [
        {
          name: "Labelled phishing text CSV",
          type: "Supervised text corpus",
          note: "Structured CSV of text samples with phishing / legitimate labels, loaded at pipeline start; invalid rows removed.",
          verified: true,
        },
        {
          name: "Hard-sample error set",
          type: "Derived dataset",
          note: "Samples misclassified after both stages, saved for error analysis and future RAG / LLM refinement.",
          verified: true,
        },
        {
          name: "RAG knowledge base",
          type: "Future retrieval corpus",
          note: "Candidate source of phishing patterns and explanations for the planned LLM + RAG stage — not yet implemented.",
          verified: false,
        },
      ],
      results: [
        { label: "Train / Val / Test", value: "70 / 10 / 20", hint: "Stratified to preserve label distribution." },
        { label: "Stage 1 (baseline)", value: "TF-IDF + LR", hint: "Fast, interpretable first output." },
        { label: "Stage 2 (refinement)", value: "BERT + LR", hint: "Applied to hard samples only." },
        { label: "Accuracy", value: null },
        { label: "Precision", value: null },
        { label: "Recall", value: null },
        { label: "F1 Score", value: null },
      ],
      challenges: [
        {
          title: "Dataset construction and recency",
          body: "Collecting recent, up-to-date data took significant effort, and real-world sources arrived with inconsistencies and noise that had to be reconciled before training could be trusted.",
        },
        {
          title: "Cleaning noisy real-world text",
          body: "Multiple iterations were needed to handle links, emails, domain references and temporal expressions; this step proved critical for stabilising model behaviour and consistent inputs.",
        },
        {
          title: "Training time and saved state",
          body: "Transformer embeddings made repeated training cycles expensive, so intermediate results and model parameters were cached and reused — saving trained state between runs was itself difficult.",
        },
        {
          title: "False negatives with a single model",
          body: "A single-model approach was found insufficient to reduce false negatives, motivating the two-model cascade that prioritises recall while keeping computation selective.",
        },
      ],
      lessons: [
        "A simple baseline earns its keep twice — TF-IDF + Logistic Regression gives a fast, interpretable prediction and simultaneously tells you which samples need a heavier model.",
        "Spend compute where it matters: routing only hard samples to BERT keeps costs down while still delivering semantic depth on ambiguous cases.",
        "Cleaning is a first-class stage — placeholder substitution for URLs, emails, domains and years did more for stability than model tuning did.",
        "Keep the residual errors: isolating what both stages still miss turns failures into a dataset you can learn from.",
        "Caching embeddings and checkpoints is what made iteration affordable — without it, every experiment round cost a full retrain.",
        "A cascade leaves a natural attachment point: the reviewed reference systems show exactly how RAG and LLM layers can build on a hard-sample error set.",
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
    image: "/images/projects/workout-tracker.png",
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
    title: "Mafia Social Deduction Game",
    category: "Mobile",
    categoryLine: "Flutter · Game UI · Mobile",
    filters: ["Mobile", "Other"],
    description:
      "A social deduction game concept featuring configurable roles, voting mechanics, game phases, and a dark Emerald Noir visual identity.",
    longDescription:
      "A Flutter-based social deduction game built around a configurable role system and a phase-driven game loop. The visual identity — Emerald Noir — uses deep greens, layered surfaces and high-contrast typography to keep the game state readable at a glance.",
    technologies: ["Flutter", "Dart", "Local State", "UI/UX Design"],
    image: "/images/projects/mafia-game.svg",
    imageAlt:
      "Mafia game concept visual: playing card silhouettes with role symbols and a vote gauge in a dark emerald theme.",
    year: "2024",
    featured: true,
    github: null,
    demo: null,
    caseStudy: {
      summary:
        "A social deduction game with configurable roles, voting mechanics and a phase-driven state machine.",
      overview: [
        "The project explores how to run a complete social deduction game loop — setup, night phase, day discussion, voting and elimination — through a clear, well-typed state machine.",
        "Roles are configurable rather than hard-coded, so new roles with different abilities can be added without rewriting the game flow.",
      ],
      features: [
        "Configurable role set",
        "Night / day / voting phase engine",
        "Voting mechanics with tie handling",
        "Player and role management",
        "Emerald Noir visual identity",
        "Local state, no backend required",
      ],
      problem: [
        {
          title: "Game phases are easy to break",
          body: "Social deduction games depend on strict ordering — night actions resolve before discussion, discussion before voting — and a single invalid transition can corrupt the round.",
        },
        {
          title: "Roles need to be extensible",
          body: "Hard-coding abilities makes adding or balancing roles painful, so the role system had to be data-driven from the start.",
        },
        {
          title: "State must stay readable",
          body: "Players need to understand who is alive, what phase it is, and what just happened without reading a wall of text.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Role system design",
          body: "Define roles as data — team, abilities, reveal conditions — so the game engine never needs to know specific role names.",
        },
        {
          index: "02",
          title: "Phase state machine",
          body: "Model setup, night, day, voting and results as explicit states with guarded transitions between them.",
        },
        {
          index: "03",
          title: "Voting flow",
          body: "Implement vote collection, tallying, tie handling and elimination as a testable unit.",
        },
        {
          index: "04",
          title: "UI system",
          body: "Build the Emerald Noir component set — cards, badges, timelines — for consistent game screens.",
        },
        {
          index: "05",
          title: "Flow testing",
          body: "Walk through complete rounds with different role counts to verify transitions and win conditions.",
        },
      ],
      architecture: [
        { label: "Game Setup", detail: ["Players", "Role config"] },
        { label: "Role Assignment", detail: ["Balanced dealing", "Hidden identity"] },
        { label: "Phase Engine", detail: ["Night", "Day", "Vote"], emphasis: true },
        { label: "Round Result", detail: ["Elimination", "Win check"] },
      ],
      datasets: [],
      results: [],
      challenges: [
        {
          title: "Transition edge cases",
          body: "Dead players voting, no majority ties and eliminated-night-players required explicit handling in every transition.",
        },
        {
          title: "Information hierarchy",
          body: "Showing enough state to stay readable while hiding secret information drove most of the layout decisions.",
        },
        {
          title: "Balancing roles",
          body: "A configurable role system makes balancing a design problem rather than a code change, so defaults needed careful testing.",
        },
      ],
      lessons: [
        "A small, explicit state machine eliminates a large class of gameplay bugs.",
        "Data-driven role definitions turn feature work into configuration.",
        "A tight visual identity makes complex game state feel calm instead of noisy.",
      ],
    },
  },
  {
    slug: "shopify-anime-store",
    title: "Shopify Anime Store",
    category: "Web",
    categoryLine: "Web · E-commerce",
    filters: ["Web"],
    description:
      "A modern anime-focused e-commerce storefront concept with custom visual identity and product-focused UI.",
    longDescription:
      "An anime-oriented storefront concept built around a custom visual identity: bold typography, high-contrast product cards and a layout that keeps merchandise, collections and promotions legible without clutter.",
    technologies: ["Shopify", "HTML", "CSS", "JavaScript"],
    image: "/images/projects/shopify-store.svg",
    imageAlt:
      "Anime store concept visual: a browser window showing a product grid with stylised character artwork and a shopping cart.",
    year: "2024",
    featured: true,
    github: null,
    demo: null,
    caseStudy: {
      summary:
        "A product-focused anime e-commerce storefront with a custom visual identity and responsive layout.",
      overview: [
        "The project is a storefront concept: a themed Shopify build focused on visual identity, collection structure and product-page clarity.",
        "Custom HTML, CSS and JavaScript extend the base theme so the design language stays consistent from hero to checkout.",
      ],
      features: [
        "Custom visual identity",
        "Collection and product templates",
        "High-contrast product cards",
        "Responsive layout",
        "Promotional / hero sections",
        "Theme customisation via HTML, CSS and JS",
      ],
      problem: [
        {
          title: "Image-heavy pages get slow",
          body: "Anime merchandising relies on artwork, so layouts must stay performant with many large images.",
        },
        {
          title: "Density vs. clarity",
          body: "Storefronts need many products visible at once without turning into visual noise.",
        },
        {
          title: "Consistency across templates",
          body: "Hero, collection, product and cart templates must share one design language despite very different content.",
        },
      ],
      approach: [
        {
          index: "01",
          title: "Visual identity",
          body: "Define palette, type scale, card style and spacing rules that work on both artwork and UI chrome.",
        },
        {
          index: "02",
          title: "Layout system",
          body: "Build a responsive grid for collections with consistent card dimensions and clear price hierarchy.",
        },
        {
          index: "03",
          title: "Template extension",
          body: "Extend Shopify templates with custom HTML, CSS and JavaScript where the theme falls short.",
        },
        {
          index: "04",
          title: "Product page focus",
          body: "Design product pages around imagery, key details and a single primary call to action.",
        },
        {
          index: "05",
          title: "Performance pass",
          body: "Optimise image loading, defer scripts and trim unused styles to keep pages fast.",
        },
      ],
      architecture: [
        { label: "Catalog", detail: ["Products", "Collections"] },
        { label: "Storefront UI", detail: ["Hero", "Grid", "Product page"] },
        { label: "Cart", detail: ["Line items", "Totals"] },
        { label: "Checkout", detail: ["Shopify checkout"], emphasis: true },
      ],
      datasets: [],
      results: [],
      challenges: [
        {
          title: "Balancing artwork and UI",
          body: "Strong artwork competes with interface elements, so contrast and spacing rules had to be enforced carefully.",
        },
        {
          title: "Theme constraints",
          body: "Shopify templates impose structure; customisation happens inside that structure, which shapes what can be changed cleanly.",
        },
        {
          title: "Performance with many images",
          body: "Lazy loading and disciplined image sizing were necessary to keep collection pages responsive.",
        },
      ],
      lessons: [
        "A written design system prevents storefront templates from drifting apart.",
        "Product cards carry most of a store's UX — they deserve the most iteration.",
        "Performance budgets matter more on image-heavy pages than on any other template.",
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
    image: "/images/projects/english-learning-planner.png",
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
    image: "/general images/Connecting Amman Homes with Trusted Services.png",
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
    image: "/general images/TaskFlow Productivity App Showcase.png",
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
    image: "/general images/SecureChat_app.png",
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
