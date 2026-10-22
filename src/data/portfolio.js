export const projects = [
  {
    id: 1,
    title: "PettyCash",
    subtitle: "Hackathon 2nd place · Multi-tenant OMS",
    desc: "Cross-company office hackathon — 2nd place. Multi-tenant Operations Management System (A Maze Venture, mYnt Connect, Braincount) — Django REST + JWT, row-level data isolation, approval delegation engine, role-scoped audit log, PDF disbursement vouchers.",
    link: "http://20.219.32.255",
    repo: "https://github.com/Zauwad/PettyCash",
    role: "Full-stack",
    images: [
      "/assets/PettyCash1.png",
      "/assets/PettyCash2.png",
      "/assets/PettyCash3.png",
      "/assets/PettyCash4.png",
      "/assets/PettyCash5.png",
    ],
    stack: ["React", "Django REST", "JWT", "SQLite", "Docker", "Azure VM", "GSAP"],
    difficulty:
      "Architecting row-level multi-tenancy on a shared SQLite database while keeping the auth + query layer strictly isolated between three sister companies.",
    futurePlan:
      "Add per-company analytics dashboards, scheduled export jobs, and a webhooks layer for ERP integration.",
    architecture: {
      category: "Multi-Tenant Enterprise Operations System",
      highlights: [
        {
          title: "Row-Level Multi-Tenancy Middleware",
          description:
            "Custom Django middleware inspects JWT claims and dynamically scopes all ORM querysets by company context. Employees and accountants only see vouchers originating within their assigned corporate silo, preventing cross-tenant data leaks.",
        },
        {
          title: "5-Stage Approval Finite State Machine",
          description:
            "Implemented using django-fsm: Draft → Submitted → Dept Head Approved → Accounts Verified → Disbursed. State transitions are atomic, validated against caller roles, and automatically rolled back on validation error.",
        },
        {
          title: "Out-of-Office (OOO) Dynamic Delegation",
          description:
            "Built an automated delegation fallback matrix. When department heads enable OOO status, voucher approval authority dynamically transfers to their pre-assigned proxy without stalling pending financial approvals.",
        },
        {
          title: "Thread-Based Asynchronous PDF Generation",
          description:
            "Disbursement vouchers and accounting receipts are generated as cryptographically-verified PDFs using background worker threads, returning immediate HTTP 200 responses without blocking the client.",
        },
        {
          title: "Azure Cloud Production Infrastructure",
          description:
            "Dockerized deployment hosted on an Azure Virtual Machine (20.219.32.255) behind Nginx reverse proxy with volume persistence and health monitoring.",
        },
      ],
      stackLayers: [
        { layer: "Frontend Layer", tech: "React 19, Tailwind CSS v4, DaisyUI, Zustand 5, TanStack Query v5, Recharts, GSAP" },
        { layer: "API & Business Logic", tech: "Django 4.2 LTS, Django REST Framework 3.14, django-fsm state machine" },
        { layer: "Multi-Tenancy & Auth", tech: "Custom tenant isolation middleware, stateless JWT, granular RBAC" },
        { layer: "Data & Persistence", tech: "Relational schema with company_id indexing, row-level security constraints" },
        { layer: "Cloud & DevOps", tech: "Docker, Nginx Reverse Proxy, Azure VM (20.219.32.255)" },
      ],
    },
    buildNotes: [
      {
        title: "Resolving SQLite Concurrency Locks under Multi-Tenant Loads",
        takeaway:
          "During concurrent stress testing across all three corporate tenants, SQLite database write locks caused intermittent HTTP 500 timeouts. Enabled Write-Ahead Logging (WAL mode) and tuned transaction isolation with atomic rollback contexts, eliminating thread contention.",
      },
      {
        title: "Preventing Approval Deadlocks via Dynamic OOO Proxy Matrix",
        takeaway:
          "Vouchers stalled whenever department managers took unexpected leave. Engineered an automated delegation handler in Django that checks user presence flags and dynamically proxies approval authority to secondary signers with full audit trail logging.",
      },
      {
        title: "Non-Blocking ReportLab PDF Generation via Worker Threads",
        takeaway:
          "Rendering printable disbursement vouchers inside synchronous request/response loops caused noticeable client latency. Offloaded ReportLab canvas rendering and cryptographic watermark stamping to a background thread pool with client polling.",
      },
    ],
  },
  {
    id: 2,
    title: "FitTrack Pro",
    subtitle: "Fitness platform with subscriptions",
    desc: "A complete fitness ecosystem built with the MERN stack — members track progress, book trainers, join classes, and engage with a community. Features role-based access control (Admin, Trainer, Member dashboards), Stripe recurring subscriptions, and JWT-authenticated routes.",
    link: "https://fitness-tracker-d03b6.web.app/",
    repo: "https://github.com/Zauwad/Project-12-FitTracker-client-side",
    serverRepo: "https://github.com/Zauwad/Project-12-FitTracker-server-side",
    role: "Full-stack",
    images: [
      "/assets/fitnessTracker.png",
      "/assets/fitnessTracker1.png",
      "/assets/fitnessTracker2.png",
    ],
    stack: ["React", "Express.js", "MongoDB", "Stripe", "Firebase Auth", "JWT", "Tailwind"],
    difficulty:
      "Architecting granular Role-Based Access Control across three disparate dashboards while managing Stripe checkout webhooks and real-time class booking schedules.",
    futurePlan:
      "Add AI-based fitness recommendations and community social progress feeds.",
    architecture: {
      category: "Full-Stack Fitness & Subscription Platform",
      highlights: [
        {
          title: "Tri-Tier Role-Based Access Control (RBAC)",
          description:
            "Strict authorization barriers across Admins (financial stats, trainer approval), Trainers (slot management, member booking tracking), and Members (custom workouts, community feed).",
        },
        {
          title: "Stripe Recurring Subscription Webhooks",
          description:
            "Integrated Stripe Checkout with automated webhook reconciliation handling subscription creation, invoice payment confirmations, and tier downgrades on cancellation.",
        },
        {
          title: "Atomic Booking & Concurrency Control",
          description:
            "Implemented atomic decrement operations in MongoDB to eliminate race conditions when multiple members book the final seat in a trainer's limited class slot.",
        },
      ],
      stackLayers: [
        { layer: "Frontend Layer", tech: "React, Tailwind CSS, TanStack Query, React Hook Form, Lucide" },
        { layer: "Backend API", tech: "Node.js, Express.js REST API with rate limiting and CORS policies" },
        { layer: "Payments & Webhooks", tech: "Stripe SDK, customer portal session generation, webhook signing" },
        { layer: "Auth & Security", tech: "Firebase Auth, JWT token cookies, bcrypt password hashing" },
        { layer: "Database", tech: "MongoDB Atlas with compound index optimization on booking collections" },
      ],
    },
    buildNotes: [
      {
        title: "Eliminating Double-Booking via Atomic MongoDB Query Operators",
        takeaway:
          "To prevent overbooking when multiple members simultaneously reserve the final slot in a popular class, replaced standard check-and-save logic with atomic $inc updates conditioned on $gte capacity thresholds.",
      },
      {
        title: "Stripe Webhook Idempotency & Lifecycle Reconciliation",
        takeaway:
          "Payment webhook retries occasionally duplicated subscription renewal records. Implemented an idempotency event registry tracking Stripe event IDs with time-to-live indexes to prevent replay errors.",
      },
      {
        title: "Granular Dashboard Authorization Guards",
        takeaway:
          "Decoupled navigation and API endpoints into isolated role silos, verifying JWT claims server-side before serving sensitive trainer schedules or financial metrics.",
      },
    ],
  },
  {
    id: 3,
    title: "x-AI",
    subtitle: "Intelligence workspace prototype",
    desc: "Interactive intelligence workspace — GLSL particle hero, natural-language query surface, scroll-pinned pipeline, hand-rolled dashboard with animated KPIs, automations grid, R3F icosahedron signature. ⌘K command palette.",
    link: "https://xai-psi.vercel.app/",
    repo: "https://github.com/Zauwad/xAI-Frontend",
    role: "Frontend",
    images: [
      "/assets/x-AI1.png",
      "/assets/x-AI2.png",
      "/assets/x-AI3.png",
      "/assets/x-AI4.png",
      "/assets/x-AI5.png",
      "/assets/x-AI6.png",
    ],
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "React Three Fiber", "Three.js", "GLSL"],
    difficulty:
      "Keeping a 1,500-point custom GLSL particle shader at 60 fps while morphing into a 12-node icosahedral constellation — every animation tied to scroll, pointer, or a real render metric, no chart libraries or UI kits.",
    futurePlan:
      "Add a real ingestion pipeline behind the AskXai surface, replace mock data with live sources, and ship the workflow editor.",
    architecture: {
      category: "Interactive Intelligence Workspace Prototype",
      highlights: [
        {
          title: "Custom 1,500-Point GLSL Particle Shader",
          description:
            "Engineered bespoke vertex and fragment shaders in GLSL that dynamically recalculate coordinate offsets on the GPU, morphing smoothly between random star dust and a geometric icosahedron based on scroll progress.",
        },
        {
          title: "Keyboard-First ⌘K Command Engine",
          description:
            "Bespoke command palette modal featuring instant fuzzy filtering, keyboard navigation shortcuts, and route jumping with zero bundle bloat.",
        },
        {
          title: "Hand-Crafted Performance Visualizations",
          description:
            "All telemetry widgets, sparklines, and metric cards are built with direct SVG paths and canvas calculations rather than bloated chart packages, maintaining sub-100ms first input delay.",
        },
      ],
      stackLayers: [
        { layer: "Framework", tech: "Next.js 14 (App Router), React Server Components, TypeScript" },
        { layer: "Graphics & 3D", tech: "Three.js, React Three Fiber, custom GLSL shader programs" },
        { layer: "Motion & UI", tech: "Tailwind CSS, Framer Motion springs, GSAP timeline triggers" },
        { layer: "Edge Hosting", tech: "Vercel Edge Network with automatic static asset caching" },
      ],
    },
    buildNotes: [
      {
        title: "60 FPS GPU Execution via Typed Float32Array Buffers",
        takeaway:
          "Iterating over 1,500 Vector3 objects in JS caused garbage collector frame drops. Restructured the particle geometry as raw Float32Array buffer attributes, mutating coordinates exclusively within GPU vertex shaders.",
      },
      {
        title: "Trigonometric Constellation Morphing in GLSL",
        takeaway:
          "Formulated spherical coordinate transformation math to smoothly blend random star dust coordinates into the exact 12 vertices of an icosahedron keyed directly to window scroll progress.",
      },
      {
        title: "Lightweight Telemetry Rendering without Chart Kits",
        takeaway:
          "Avoided the 200kB bundle cost of external chart libraries by generating dynamic SVG polyline strings and gradient fills mathematically, keeping the initial client JS bundle under budget.",
      },
    ],
  },
  {
    id: 4,
    title: "Plant Pal",
    subtitle: "Plant care tracker",
    desc: "A gentle, focused tool for plant people — track daily care, set reminders, and keep health records for every plant in your collection. Cloud-synced data with a UI designed to feel calm, not cluttered.",
    link: "https://plant-track-4558e.web.app/",
    repo: "https://github.com/Zauwad/Project-10-Plant-Care-Tracker",
    role: "Frontend · Backend",
    images: [
      "/assets/Plant-Track.png",
      "/assets/Plant-Track2.png",
      "/assets/Plant-Track3.png",
    ],
    stack: ["React", "Firebase", "Tailwind", "MongoDB"],
    difficulty:
      "Wiring reliable CRUD with cloud sync while keeping the UI fast on low-end devices.",
    futurePlan:
      "Introduce IoT integration for live soil moisture tracking and watering automation.",
    architecture: {
      category: "Personal Utility & Cloud Sync Platform",
      highlights: [
        {
          title: "Real-Time Cloud Synchronization",
          description: "Utilizes Firebase Firestore real-time snapshot listeners for instant synchronization across mobile and desktop browser clients.",
        },
        {
          title: "Care Scheduling & Notification Trigger",
          description: "Calculates dynamic watering intervals based on plant species characteristics, seasonal humidity, and user-recorded soil conditions.",
        },
      ],
      stackLayers: [
        { layer: "Frontend", tech: "React 18, Tailwind CSS, Lucide Icons, Date-fns" },
        { layer: "Backend & Persistence", tech: "Firebase Firestore, Firebase Auth, Express.js" },
      ],
    },
    buildNotes: [
      {
        title: "Offline Firestore Snapshot Caching",
        takeaway:
          "Enabled IndexedDB offline persistence so urban gardeners can view care schedules and log waterings even in basements without cellular reception, syncing automatically upon reconnection.",
      },
      {
        title: "Dynamic Interval Calculations by Pot Size & Soil Type",
        takeaway:
          "Wrote custom scheduling algorithms that adjust watering countdowns based on pot diameter and seasonal humidity rather than static calendar timers.",
      },
    ],
  },
  {
    id: 5,
    title: "DocTalk BD",
    subtitle: "Healthcare consultations, simplified",
    desc: "A responsive healthcare platform connecting patients with doctors for quick online consultations. Secure authentication, appointment scheduling, and a clean medical UI that doesn't get in the way.",
    link: "https://doc-talk-bd-by-zawad.netlify.app/home",
    repo: "https://github.com/Zauwad/Project-6-Hospital-Website",
    serverRepo: "https://github.com/Zauwad/Project-6-Hospital-Website-server-side",
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
    architecture: {
      category: "Telehealth & Healthcare Scheduling Portal",
      highlights: [
        {
          title: "Dynamic Slot Availability Engine",
          description: "Queries doctor availability matrices in real time to prevent scheduling collisions and manage holiday hours.",
        },
        {
          title: "Secure Health Profile Privacy",
          description: "Token-authenticated patient records accessible strictly by the attending medical officer and the patient.",
        },
      ],
      stackLayers: [
        { layer: "Frontend", tech: "React, Tailwind CSS, React Router, SweetAlert2" },
        { layer: "Backend API", tech: "Node.js, Express.js REST API with CORS headers" },
        { layer: "Database & Auth", tech: "Firebase Authentication, MongoDB database" },
      ],
    },
    buildNotes: [
      {
        title: "Conflict-Free Multi-Doctor Booking Locks",
        takeaway:
          "Engineered reservation validation that factors in 15-minute consultation buffer windows and prevents double-booking across concurrent browser sessions.",
      },
      {
        title: "Restricted Medical Record Boundaries",
        takeaway:
          "Structured MongoDB access control rules ensuring prescription histories and symptom notes are strictly isolated between the patient and the licensed attending practitioner.",
      },
    ],
  },
  {
    id: 6,
    title: "English Janala",
    subtitle: "Interactive English lessons",
    desc: "Practice grammar, listening, and speaking through structured lessons and quizzes. Vocabulary tracking with progressive difficulty so learners always know where they stand.",
    link: "https://english-janala-by-zawad.netlify.app/",
    repo: "https://github.com/Zauwad/Project-5-English-Janala-",
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
    architecture: {
      category: "Interactive Language Education Platform",
      highlights: [
        {
          title: "Progressive Difficulty Engine",
          description: "Adaptive quiz engine that elevates vocabulary difficulty based on historic user response accuracy and streak metrics.",
        },
        {
          title: "Interactive Pronunciation & Listening Modules",
          description: "Web Speech API integration for real-time auditory pronunciation feedback and listening comprehension tests.",
        },
      ],
      stackLayers: [
        { layer: "Frontend", tech: "React, Tailwind CSS, Web Speech API" },
        { layer: "Cloud Services", tech: "Firebase Auth, Firestore database" },
      ],
    },
    buildNotes: [
      {
        title: "Spaced Repetition Error Queues",
        takeaway:
          "Implemented an adaptive quiz algorithm that caches incorrectly answered vocabulary words and re-inserts them into the active lesson deck at progressive intervals.",
      },
      {
        title: "Web Speech API Audio Synthesis Management",
        takeaway:
          "Managed browser-native speech synthesis queues to prevent voice overlaps and memory accumulation during high-speed quiz sessions.",
      },
    ],
  },
  {
    id: 7,
    title: "NextGenBlog",
    subtitle: "Modern full-stack blogging",
    desc: "A user-friendly blogging platform with secure auth, real-time wishlist and commenting, and full-text search with category filtering — the whole loop from publish to discover.",
    link: "https://blog-e084f.web.app/",
    repo: "https://github.com/Zauwad/Project-11-NextGenBlog-client-side",
    serverRepo: "https://github.com/Zauwad/Project-11-NextGenBlog-server-side",
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
    architecture: {
      category: "Content Publishing & Community Platform",
      highlights: [
        {
          title: "Full-Text MongoDB Search Indexing",
          description: "Configured compound text indexes across blog titles and bodies with weighted scoring for instant, typo-tolerant search results.",
        },
        {
          title: "JWT Token-Protected Author Portal",
          description: "Dedicated dashboard for content creators with draft persistence, analytics on article reads, and interactive comment moderation.",
        },
      ],
      stackLayers: [
        { layer: "Frontend", tech: "React, Tailwind CSS, TanStack Query, React Quill" },
        { layer: "API Services", tech: "Node.js, Express.js REST API with JWT verification" },
        { layer: "Data Layer", tech: "MongoDB with text search indexing and aggregation pipelines" },
      ],
    },
    buildNotes: [
      {
        title: "Weighted Full-Text Indexing Optimization",
        takeaway:
          "Tuned MongoDB compound text indexes with field weights (Title: 10, Tags: 5, Content: 1), ensuring lightning-fast search queries without requiring third-party search infrastructure.",
      },
      {
        title: "HTML Sanitization & XSS Safeguards",
        takeaway:
          "Secured rich-text blog publishing by sanitizing markdown output via DOMPurify before rendering, blocking script injections while preserving formatting.",
      },
    ],
  },
];


export const skills = {
  frontend: [
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Framer Motion",
    "GSAP",
    "Tailwind CSS",
    "ShadCN UI",
  ],
  backend: [
    "Node.js",
    "Express.js",
    "Python",
    "Django (DRF & Ninja)",
    "WebSockets",
    "RAG",
    "RBAC"
  ],
  data: [
    "Redis",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Django ORM"
  ],
  tools: [
    "Git",
    "Shopify",
    "Azure",
    "DigitalOcean",
    "Vercel",
    "Firebase Hosting",
    "Postman",
    "AI-first IDEs",
    "MCP",
    "Spec-Driven Development"
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
    when: "Current · In Production",
    points: [
      "Build full-stack web platforms alongside the team — backend, frontend, and the parts in between.",
      "Designing and managing databases.",
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