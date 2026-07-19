export const projects = [
  {
    id: 1,
    title: "PettyCash",
    subtitle: "Hackathon 2nd place · Multi-tenant OMS",
    desc: "Cross-company office hackathon — 2nd place. Multi-tenant Operations Management System (A Maze Venture, mYnt Connect, Braincount) — Django REST + JWT, row-level data isolation, approval delegation engine, role-scoped audit log, PDF disbursement vouchers.",
    link: "http://20.219.32.255",
    repo: "https://github.com/Zauwad/PettyCash",
    year: "2026",
    role: "Full-stack",
    images: [
      "/assets/PettyCash1.png",
      "/assets/PettyCash2.png",
      "/assets/PettyCash3.png",
      "/assets/PettyCash4.png",
      "/assets/PettyCash5.png",
    ],
    stack: ["React", "Vite", "Tailwind v4", "DaisyUI", "GSAP", "Django REST", "JWT", "SQLite", "Docker", "Azure VM"],
    difficulty:
      "Architecting row-level multi-tenancy on a shared SQLite database while keeping the auth + query layer strictly isolated between three sister companies.",
    futurePlan:
      "Add per-company analytics dashboards, scheduled export jobs, and a webhooks layer for ERP integration.",
  },
  {
    id: 2,
    title: "FitTrack",
    subtitle: "Fitness platform with subscriptions",
    desc: "My flagship build — a complete fitness management platform. Members track progress, book trainers, join classes, and engage with a community. Subscriptions, role-based dashboards, and a clean member experience end-to-end.",
    link: "https://fitness-tracker-d03b6.web.app/",
    repo: null,
    year: "2025",
    role: "Full-stack",
    images: [
      "/assets/fitnessTracker.png",
      "/assets/fitnessTracker1.png",
      "/assets/fitnessTracker2.png",
    ],
    stack: ["MongoDB", "Express.js", "React", "Node.js", "Tailwind", "Stripe", "Firebase"],
    difficulty:
      "Designing role-based dashboards and integrating subscriptions alongside real-time class scheduling.",
    futurePlan:
      "Add AI-based fitness recommendations and a social feed for progress sharing.",
  },
  {
    id: 3,
    title: "x-AI",
    subtitle: "Intelligence workspace prototype",
    desc: "Interactive intelligence workspace — GLSL particle hero, natural-language query surface, scroll-pinned pipeline, hand-rolled dashboard with animated KPIs, automations grid, R3F icosahedron signature. ⌘K command palette.",
    link: "https://xai-psi.vercel.app/",
    repo: "https://github.com/Zauwad/xAI-Frontend",
    year: "2026",
    role: "Frontend",
    images: [
      "/assets/x-AI1.png",
      "/assets/x-AI2.png",
      "/assets/x-AI3.png",
      "/assets/x-AI4.png",
      "/assets/x-AI5.png",
      "/assets/x-AI6.png",
    ],
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "ScrollTrigger", "React Three Fiber", "Three.js", "GLSL", "Geist"],
    difficulty:
      "Keeping a 1,500-point custom GLSL particle shader at 60 fps while morphing into a 12-node icosahedral constellation — every animation tied to scroll, pointer, or a real render metric, no chart libraries or UI kits.",
    futurePlan:
      "Add a real ingestion pipeline behind the AskXai surface, replace mock data with live sources, and ship the workflow editor.",
  },
  {
    id: 4,
    title: "Plant Pal",
    subtitle: "Plant care tracker",
    desc: "A gentle, focused tool for plant people — track daily care, set reminders, and keep health records for every plant in your collection. Cloud-synced data with a UI designed to feel calm, not cluttered.",
    link: "https://plant-track-4558e.web.app/",
    repo: null,
    year: "2024",
    role: "Frontend · Backend",
    images: [
      "/assets/Plant-Track.png",
      "/assets/Plant-Track2.png",
      "/assets/Plant-Track3.png",
    ],
    stack: ["React", "Firebase", "Tailwind", "React Router"],
    difficulty:
      "Wiring reliable CRUD with cloud sync while keeping the UI fast on low-end devices.",
    futurePlan:
      "Introduce IoT integration for live soil moisture tracking and watering automation.",
  },
  {
    id: 5,
    title: "DocTalk BD",
    subtitle: "Healthcare consultations, simplified",
    desc: "A responsive healthcare platform connecting patients with doctors for quick online consultations. Secure authentication, appointment scheduling, and a clean medical UI that doesn't get in the way.",
    link: "https://doc-talk-bd-by-zawad.netlify.app/home",
    repo: null,
    year: "2024",
    role: "Full-stack",
    images: [
      "/assets/Doctor-phudu.jpg",
      "/assets/Doctor2.png",
      "/assets/Doctor3.png",
    ],
    stack: ["React", "Firebase", "Express", "Tailwind"],
    difficulty:
      "Implementing secure user authentication and managing dynamic appointment scheduling.",
    futurePlan: "Add video consultation features and an AI symptom checker.",
  },
  {
    id: 6,
    title: "English Janala",
    subtitle: "Interactive English lessons",
    desc: "Practice grammar, listening, and speaking through structured lessons and quizzes. Vocabulary tracking with progressive difficulty so learners always know where they stand.",
    link: "https://english-janala-by-zawad.netlify.app/",
    repo: null,
    year: "2024",
    role: "Frontend · Backend",
    images: [
      "/assets/EnglishJanala.png",
      "/assets/EnglishJanala2.png",
      "/assets/EnglishJanala3.png",
    ],
    stack: ["React", "Firebase", "Tailwind"],
    difficulty:
      "Designing quiz logic and progress tracking while keeping the UI smooth throughout.",
    futurePlan:
      "Add gamification, leaderboards, and personalized lesson recommendations.",
  },
  {
    id: 7,
    title: "NextGenBlog",
    subtitle: "Modern full-stack blogging",
    desc: "A user-friendly blogging platform with secure auth, real-time wishlist and commenting, and full-text search with category filtering — the whole loop from publish to discover.",
    link: "https://blog-e084f.web.app/",
    repo: null,
    year: "2025",
    role: "Full-stack",
    images: [
      "/assets/blog1.png",
      "/assets/blog2.png",
      "/assets/blog3.png",
    ],
    stack: ["React", "Firebase", "MongoDB", "Express", "JWT", "Tailwind"],
    difficulty:
      "Implementing secure token-based private routes and optimizing full-text search.",
    futurePlan:
      "Add AI-powered content recommendations and a rich-text editor.",
  },
];

export const skills = {
  frontend: [
    "React",
    "Next.js",
    "JavaScript (ES6+)",
    "TypeScript",
    "Tailwind CSS",
    "HTML5 / CSS3",
    "Framer Motion",
    "GSAP",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Django",
    "SQL",
    "REST APIs",
    "RAG",
    "MCP",
    "JWT Auth",
    "Stripe",
  ],
  data: ["MongoDB", "Mongoose", "Firebase Auth", "Firestore", "Realtime DB"],
  tools: [
    "Git",
    "GitLab",
    "VS Code",
    "Vite",
    "Vercel",
    "Netlify",
    "Azure",
    "DigitalOcean",
    "Firebase Hosting",
    "Postman",
    "AI-first IDEs (Cursor, Copilot)",
  ],
};

export const services = [
  {
    id: "plan",
    title: "Plan",
    subtitle: "Scope it tightly, then sequence it",
    points: [
      "Data model, contracts, and interface boundaries",
      "Milestones with what gets shipped first",
      "Risks called out before code is written",
    ],
  },
  {
    id: "build",
    title: "Build",
    subtitle: "Write it, end-to-end",
    points: [
      "Backend services, auth, persistence, and APIs",
      "Frontend wired to the system it sits on",
      "Continuous review and small commits",
    ],
  },
  {
    id: "ship",
    title: "Ship",
    subtitle: "Land it and keep it healthy",
    points: [
      "Deploys to staging, then production — not just once",
      "Performance, accessibility, and basic hygiene",
      "Maintain, monitor, and iterate after launch",
    ],
  },
];

export const experience = [
  {
    id: "amaze",
    role: "Associate Software Engineer",
    org: "Amaze Venture",
    when: "April 2026 → Present",
    points: [
      "Build full-stack web platforms alongside the team — backend, frontend, and the parts in between.",
      "Translate briefs into scoped, deployable work in collaboration with stakeholders.",
      "Care about the handoff — clean contracts, readable code, and things that don't break later.",
    ],
  },
  {
    id: "cs",
    role: "Computer Science",
    org: "ongoing",
    when: "Foundations → ongoing",
    points: [
      "Grounded in algorithms, data structures, and software engineering fundamentals.",
      "Continuously learning — AI tooling, retrieval patterns, and modern backend architecture.",
      "Treat every shipped project as a way to deepen the craft, not just close a ticket.",
    ],
  },
];