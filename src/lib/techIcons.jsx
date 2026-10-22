/**
 * Crisp SVG Brand Icons & Color Tokens for Developer Technologies
 */
export const TECH_ICONS = {
  // Frontend
  React: {
    color: "#61DAFB",
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" className="h-5 w-5" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  "Next.js": {
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 180 180" className="h-5 w-5" fill="none">
        <mask height="180" id="next-mask" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
          <circle cx="90" cy="90" fill="black" r="90" />
        </mask>
        <g mask="url(#next-mask)">
          <circle cx="90" cy="90" data-theme="dark" fill="black" r="90" stroke="currentColor" strokeWidth="6" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="url(#next-paint0)" />
          <rect fill="url(#next-paint1)" height="72" width="12" x="115" y="54" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="next-paint0" x1="109" x2="144.5" y1="116.5" y2="160.5">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" id="next-paint1" x1="121" x2="120.799" y1="54" y2="106.875">
            <stop stopColor="white" />
            <stop offset="1" stopColor="white" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  JavaScript: {
    color: "#F7DF1E",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="#F7DF1E" />
        <path d="M12.44 19.46a4.8 4.8 0 0 1-4.7-3.2l2.3-1.4a2.5 2.5 0 0 0 2.4 1.8c1.1 0 1.8-.5 1.8-1.5 0-1-.8-1.4-2.2-2-2.1-.9-3.5-1.9-3.5-4.1 0-2 1.6-3.6 4-3.6a4.4 4.4 0 0 1 4.2 2.6l-2.2 1.4a2.2 2.2 0 0 0-2-1.3c-1 0-1.6.5-1.6 1.2 0 .9.7 1.3 2 1.8 2.4 1 3.8 2 3.8 4.3 0 2.4-1.9 4-4 4zm-7.6-.2a3.8 3.8 0 0 1-3.8-3.7l2.4-.6c.2 1.1.7 1.7 1.4 1.7.8 0 1.3-.4 1.3-1.9V5.5h2.5v9.3c0 3-1.6 4.4-3.8 4.4z" fill="#000" />
      </svg>
    ),
  },
  TypeScript: {
    color: "#3178C6",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <rect width="24" height="24" rx="3" fill="#3178C6" />
        <path d="M14.7 19.5a4.7 4.7 0 0 1-4.5-3.1l2.2-1.3a2.4 2.4 0 0 0 2.3 1.7c1.1 0 1.8-.5 1.8-1.5 0-1-.7-1.4-2.1-2-2-.9-3.4-1.9-3.4-4 0-2 1.6-3.7 4-3.7a4.3 4.3 0 0 1 4.1 2.6l-2.1 1.4a2.2 2.2 0 0 0-2-1.3c-1 0-1.6.5-1.6 1.2 0 .8.7 1.3 2 1.8 2.3 1 3.7 2 3.7 4.2 0 2.4-1.8 4.1-4.4 4.1zm-8.8-.2V7.7H2.8V5.6h9.1v2.1H8.8v11.6H5.9z" fill="#fff" />
      </svg>
    ),
  },
  "Framer Motion": {
    color: "#0055FF",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" fill="#0055FF" />
      </svg>
    ),
  },
  GSAP: {
    color: "#0AE448",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#0AE448" />
        <path d="M8 12l8-5v10z" fill="#000" />
      </svg>
    ),
  },
  "Tailwind CSS": {
    color: "#38BDF8",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="#38BDF8" />
      </svg>
    ),
  },
  "ShadCN UI": {
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 256 256" className="h-5 w-5" fill="none">
        <path d="M208 128l-80 80M192 40L40 192" stroke="currentColor" strokeWidth="24" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },

  // Backend
  "Node.js": {
    color: "#5FA04E",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L5 8.3v7.4l7 4 7-4V8.3l-7-4z" fill="#5FA04E" />
        <circle cx="12" cy="12" r="3" fill="#5FA04E" />
      </svg>
    ),
  },
  "Express.js": {
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 12h8m-4-6l6 12m-6 0l6-12" strokeLinecap="round" />
        <circle cx="18" cy="12" r="2.5" fill="currentColor" />
      </svg>
    ),
  },
  Python: {
    color: "#3776AB",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M11.9 2C8.8 2 8.9 3.3 8.9 3.3V5h6.2v1.8H5.9S3.5 6.6 3.5 10.3c0 3.7 2.1 3.6 2.1 3.6H7v-1.9s-.1-2.2 2.2-2.2h6.2c2.1 0 2.1-2 2.1-2V3.4S15 2 11.9 2zm-1.8 1.4a.8.8 0 1 1 0 1.6.8.8 0 0 1 0-1.6zm2 18.6c3.1 0 3-1.3 3-1.3V19H8.9v-1.8h9.2s2.4.2 2.4-3.5c0-3.7-2.1-3.6-2.1-3.6H17v1.9s.1 2.2-2.2 2.2H8.6c-2.1 0-2.1 2-2.1 2v4.4s.6 1.4 3.6 1.4zm1.8-1.4a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6z" fill="#3776AB" />
      </svg>
    ),
  },
  "Django (DRF & Ninja)": {
    color: "#092E20",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <rect width="24" height="24" rx="4" fill="#092E20" />
        <path d="M11.5 5.5v7.8c-.8.4-1.6.6-2.4.6-2.1 0-3.1-1.3-3.1-3.4 0-2.2 1.3-3.7 3.4-3.7.8 0 1.5.2 2.1.5v-1.8zm4 0v13h-2.2v-1.5c-.7.9-1.7 1.6-3 1.6-2.8 0-4.6-2.2-4.6-5.5 0-3.5 2-5.7 4.8-5.7 1.1 0 2 .4 2.8 1.1V5.5h2.2z" fill="#44B78B" />
      </svg>
    ),
  },
  RAG: {
    color: "#A855F7",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" fill="#A855F7" />
        <circle cx="5" cy="6" r="2" />
        <circle cx="19" cy="6" r="2" />
        <circle cx="5" cy="18" r="2" />
        <circle cx="19" cy="18" r="2" />
        <path d="M7 7l3 3m4 4l3 3m-10 0l3-3m4-4l3-3" strokeLinecap="round" />
      </svg>
    ),
  },
  RBAC: {
    color: "#EAB308",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l8 4v6c0 5.5-3.5 10-8 12-4.5-2-8-6.5-8-12V6l8-4z" stroke="#EAB308" />
        <circle cx="12" cy="11" r="2" fill="#EAB308" />
        <path d="M12 13v3" stroke="#EAB308" strokeLinecap="round" />
      </svg>
    ),
  },
  WebSockets: {
    color: "#EA580C",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v6m0 8v6M2 12h6m8 0h6" stroke="#EA580C" />
        <circle cx="12" cy="12" r="3" fill="#EA580C" stroke="#EA580C" />
      </svg>
    ),
  },

  // Data
  Redis: {
    color: "#DC382D",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M22.5 15.5l-9.5 5.5-9.5-5.5 2.5-1.5 7 4 7-4 2.5 1.5zm0-4.5l-9.5 5.5-9.5-5.5 2.5-1.5 7 4 7-4 2.5 1.5zm-9.5-8.5l9.5 5.5-9.5 5.5-9.5-5.5 9.5-5.5z" fill="#DC382D" />
      </svg>
    ),
  },
  MySQL: {
    color: "#00758F",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="8" ry="3" fill="#00758F" opacity="0.3" stroke="#00758F" />
        <path d="M4 5v7c0 1.66 3.58 3 8 3s8-1.34 8-3V5" stroke="#00758F" />
        <path d="M4 12v7c0 1.66 3.58 3 8 3s8-1.34 8-3v-7" stroke="#00758F" />
      </svg>
    ),
  },
  PostgreSQL: {
    color: "#336791",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.5v-2.1c1.5-.2 2.7-.9 3.5-1.9l1.6 1.4c-1.3 1.5-3.1 2.4-5.1 2.6zm-2-12.9c.7 0 1.4.1 2 .4v2.2c-.6-.4-1.3-.6-2-.6-2 0-3.5 1.5-3.5 3.5s1.5 3.5 3.5 3.5c.7 0 1.4-.2 2-.6v2.2c-.6.3-1.3.4-2 .4-3.2 0-5.8-2.6-5.8-5.8s2.6-5.8 5.8-5.8z" fill="#336791" />
      </svg>
    ),
  },
  MongoDB: {
    color: "#47A248",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C11.5 2.5 7 8 7 13.5c0 4.1 2.5 7.5 5 8.5 2.5-1 5-4.4 5-8.5C17 8 12.5 2.5 12 2zm.1 18.5V3.5s3.4 4.5 3.4 10c0 3.2-1.8 6-3.4 7z" fill="#47A248" />
      </svg>
    ),
  },
  "Django ORM": {
    color: "#0C4B33",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="6" rx="2" stroke="#44B78B" />
        <rect x="3" y="15" width="18" height="6" rx="2" stroke="#44B78B" />
        <path d="M7 9v6m10-6v6" stroke="#44B78B" strokeDasharray="2 2" />
      </svg>
    ),
  },

  // Tools & Ops
  Git: {
    color: "#F05032",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M21.6 10.9L13.1 2.4c-.6-.6-1.5-.6-2.1 0L8.8 4.6l3.3 3.3c.6-.2 1.4-.1 1.9.5.6.6.6 1.4.3 2.1l3.2 3.2c.7-.3 1.5-.3 2.1.3.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.6-.6-.7-1.5-.4-2.2l-3-3v5.8c.2.2.4.4.5.7.8.8.8 2.1 0 2.9s-2.1.8-2.9 0c-.8-.8-.8-2.1 0-2.9.3-.3.8-.6 1.3-.6V8.6c-.5 0-1-.3-1.3-.6-.6-.6-.7-1.5-.4-2.2L7.3 3.2 2.4 8.1c-.6.6-.6 1.5 0 2.1l8.5 8.5c.6.6 1.5.6 2.1 0l8.5-8.5c.7-.6.7-1.6.1-2.3z" fill="#F05032" />
      </svg>
    ),
  },
  Azure: {
    color: "#0078D4",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M5.4 19.5L13.2 3l4.5 8.2-8.4 8.3H5.4zm9.3-5.2l-3-5.8 4.4-4.8 5.7 15.8h-7.1z" fill="#0078D4" />
      </svg>
    ),
  },
  DigitalOcean: {
    color: "#0080FF",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.5 2 2 6.5 2 12c0 4.1 2.5 7.6 6 9.1V17c-1.7-.8-3-2.6-3-5 0-2.8 2.2-5 5-5s5 2.2 5 5c0 2.4-1.3 4.2-3 5v4.1c5.1-1.1 9-5.6 9-11.1C22 6.5 17.5 2 12 2z" fill="#0080FF" />
      </svg>
    ),
  },
  Vercel: {
    color: "#ffffff",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2l10 18H2L12 2z" />
      </svg>
    ),
  },
  "Firebase Hosting": {
    color: "#FFCA28",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M4.5 17.5l2.4-15 4.3 8.3-6.7 6.7zm15 0l-3.3-12.7-4.4 8.5 7.7 4.2zm-15 0L12 22l7.5-4.5L12 15 4.5 17.5z" fill="#FFA000" />
      </svg>
    ),
  },
  Postman: {
    color: "#FF6C37",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <circle cx="12" cy="12" r="10" fill="#FF6C37" />
        <path d="M8 12h8m-4-4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  "AI-first IDEs": {
    color: "#8B5CF6",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3z" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity="0.2" />
      </svg>
    ),
  },
  MCP: {
    color: "#10B981",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="4" y="4" width="16" height="16" rx="3" stroke="#10B981" />
        <circle cx="9" cy="9" r="1.5" fill="#10B981" />
        <circle cx="15" cy="9" r="1.5" fill="#10B981" />
        <path d="M9 15h6" stroke="#10B981" strokeLinecap="round" />
      </svg>
    ),
  },
  "Spec-Driven Development": {
    color: "#EC4899",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#EC4899" />
      </svg>
    ),
  },
  Shopify: {
    color: "#96BF48",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M19.9 6.2c-.1-.3-.3-.4-.5-.4h-1.9c-.1-.7-.5-2.9-2-4.3C14.2.3 13 0 11.9 0c-.2 0-.4 0-.5.1C9.7.3 8.7 1.4 8.2 3.1c-.9.3-1.6.5-1.7.5-.5.2-.6.4-.7.8L3.2 19.3l11.4 4.7 9.4-2.8L19.9 6.2zm-6.7-3.9c.7.7 1.1 1.9 1.3 3.3l-4.5 1.4C10.5 4.9 11.6 3 13.2 2.3zm-1.8 17.5l-6-2.5 2.1-10.2 4.1 1.2-.2 11.5z" fill="#96BF48" />
      </svg>
    ),
  },
  Docker: {
    color: "#2496ED",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H5.136a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m21.737 1.777c-.365-1.782-1.89-2.34-1.89-2.34-.848-.373-1.815-.224-2.502.261-.318-.21-.703-.326-1.127-.326H1.127a.93.93 0 00-.927.93v2.808c0 3.82 2.793 6.945 6.46 7.464 1.18.167 2.408.204 3.66.104 3.754-.303 7.02-2.827 8.136-6.425.295-.948.444-1.956.444-2.986v-.49z" fill="#2496ED" />
      </svg>
    ),
  },
  Stripe: {
    color: "#635BFF",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.4 12.836.4 7.228.4 3.376 3.328 3.376 8.358c0 5.483 4.887 6.643 7.828 7.747 2.128.806 3.018 1.487 3.018 2.45 0 .973-.836 1.44-2.228 1.44-2.073 0-4.912-.996-6.84-2.086l-.92 5.564c1.78.85 4.778 1.47 7.76 1.47 5.86 0 9.87-2.85 9.87-8.083 0-5.328-4.788-6.68-7.89-7.72z" fill="#635BFF" />
      </svg>
    ),
  },
  Firebase: {
    color: "#FFCA28",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M3.89 15.672L6.255.461a.54.54 0 011.008-.135l3.297 6.183-6.67 9.163zm16.275-.027l-2.046-12.84a.54.54 0 00-.936-.289L3.486 16.593l7.989 4.502a1.082 1.082 0 001.05 0l7.64-4.45zm-8.83-8.815a.54.54 0 00-.979-.176L7.498 11.58l3.837-4.75z" fill="#FFA000" />
      </svg>
    ),
  },
  SQLite: {
    color: "#003B57",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="6" rx="8" ry="3" stroke="#003B57" fill="#003B57" fillOpacity="0.2" />
        <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" stroke="#003B57" />
        <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" stroke="#003B57" />
      </svg>
    ),
  },
  JWT: {
    color: "#D63AFF",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm4 0h-2V7h2v10z" fill="#D63AFF" />
      </svg>
    ),
  },
  "Three.js": {
    color: "#000000",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9L4 7.2v8.5l8 4.3 8-4.3V7.2L12 11z" />
      </svg>
    ),
  },
  "React Three Fiber": {
    color: "#61DAFB",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" stroke="#61DAFB" />
        <line x1="12" y1="22" x2="12" y2="12" stroke="#61DAFB" />
        <line x1="2" y1="8.5" x2="12" y2="12" stroke="#61DAFB" />
        <line x1="22" y1="8.5" x2="12" y2="12" stroke="#61DAFB" />
      </svg>
    ),
  },
  GLSL: {
    color: "#5586A4",
    svg: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" stroke="#5586A4" strokeDasharray="3 3" />
        <path d="M12 7v10M7 12h10" stroke="#5586A4" strokeLinecap="round" />
      </svg>
    ),
  },
};

const TECH_ALIASES = {
  "Next.js 14": "Next.js",
  "Tailwind": "Tailwind CSS",
  "TailwindCSS": "Tailwind CSS",
  "Django REST": "Django (DRF & Ninja)",
  Django: "Django (DRF & Ninja)",
  "Firebase Auth": "Firebase",
  "Firebase Hosting": "Firebase",
  "Azure VM": "Azure",
  Express: "Express.js",
};

export function getTechIcon(name) {
  if (!name) return null;
  const resolved = TECH_ALIASES[name] || name;
  return TECH_ICONS[resolved] || null;
}

