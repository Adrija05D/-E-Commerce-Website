// ==========================================================================
// NovaCraft Digital - Catalog Data & Digital Goods Knowledge Base
// ==========================================================================

const PRODUCTS_DATA = [
  {
    id: "nc-soft-01",
    title: "ApexSaaS - Next.js 15 & Tailwind Boilerplate",
    category: "software",
    categoryLabel: "Software & Boilerplates",
    format: "ZIP / GitHub Repo",
    fileSize: "48.2 MB",
    version: "v3.2.0",
    license: "Extended Commercial License",
    badge: "Bestseller",
    rating: 4.9,
    reviewsCount: 142,
    price: 49.00,
    originalPrice: 89.00,
    shortDescription: "Complete production-ready SaaS boilerplate with Auth, Stripe billing, PostgreSQL, and multi-tenant teams.",
    fullDescription: "ApexSaaS is a modern, enterprise-grade Next.js boilerplate engineered for developers and indie hackers wanting to launch profitable SaaS applications in days rather than months. Includes fully configured NextAuth v5, Supabase & Prisma ORM, Stripe webhook subscriptions, transactional emails via Resend, and 40+ polished UI dashboard components.",
    features: [
      "Next.js 15 App Router & React 19 Server Components",
      "Stripe Customer Portal & Automated Recurring Invoicing",
      "Tailwind CSS v4 with dark mode & accessible Radix primitives",
      "Role-Based Access Control (RBAC) & Team Workspaces",
      "Comprehensive TypeScript typing and 90%+ unit test coverage"
    ],
    downloadsCount: 1840,
    downloadFilename: "ApexSaaS-Nextjs-v3.2.0.zip",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=700&auto=format&fit=crop&q=80",
    demoUrl: "https://apex-saas-demo.example.com",
    reviews: [
      { author: "Alex Chen", role: "Senior Full-Stack Dev", rating: 5, date: "Oct 12, 2026", text: "Saved me at least 120 hours of setup time on my micro-SaaS. Cleanest architecture I've seen in any boilerplate." },
      { author: "Sarah Jenkins", role: "Startup Founder", rating: 5, date: "Sep 28, 2026", text: "Stripe integration worked out of the box. Launched our MVP in 48 hours and made our first paying sale!" },
      { author: "Marcus Vance", role: "Indie Hacker", rating: 4.8, date: "Aug 15, 2026", text: "High quality documentation and clean commit history. Definitely worth every dollar." }
    ]
  },
  {
    id: "nc-soft-02",
    title: "HyperNode - Cloud Infrastructure CLI & Automation Kit",
    category: "software",
    categoryLabel: "Software & Boilerplates",
    format: "NPM Binary / Docker Image",
    fileSize: "12.8 MB",
    version: "v2.1.4",
    license: "MIT Commercial",
    badge: "Trending",
    rating: 4.8,
    reviewsCount: 88,
    price: 35.00,
    originalPrice: 60.00,
    shortDescription: "CLI toolkit and Terraform templates to provision scalable Kubernetes clusters and microservices in 1-click.",
    fullDescription: "HyperNode simplifies modern cloud infrastructure. Deploy zero-downtime microservices across AWS, GCP, and DigitalOcean using unified declarative configurations. Features automated SSL renewal, Prometheus metrics, and automated disaster recovery failover scripts.",
    features: [
      "Terraform & OpenTofu infrastructure-as-code modules",
      "Kubernetes Helm charts for high availability deployments",
      "Integrated CI/CD GitHub Actions pipelines",
      "Automated cost optimization & orphan resource cleanup"
    ],
    downloadsCount: 920,
    downloadFilename: "HyperNode-CloudKit-v2.1.4.tar.gz",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=700&auto=format&fit=crop&q=80",
    reviews: [
      { author: "David Kim", role: "DevOps Engineer", rating: 5, date: "Oct 05, 2026", text: "Saved our engineering team weeks of writing boilerplate Terraform scripts. Brilliant CLI." },
      { author: "Elena Rostova", role: "Cloud Architect", rating: 4.7, date: "Sep 19, 2026", text: "The automated Helm charts are production-ready. Very impressed with the security hardening." }
    ]
  },
  {
    id: "nc-design-01",
    title: "NeoGlass Pro - Figma Design System & UI Kit",
    category: "design",
    categoryLabel: "UI/UX & Design Assets",
    format: ".FIG (Figma File) + Tokens JSON",
    fileSize: "185.0 MB",
    version: "v4.0.0",
    license: "Unlimited Project License",
    badge: "Staff Pick",
    rating: 5.0,
    reviewsCount: 310,
    price: 39.00,
    originalPrice: 79.00,
    shortDescription: "Over 2,400+ sleek glassmorphic UI components, typography scales, light/dark themes, and 60+ pre-built mobile & desktop screens.",
    fullDescription: "NeoGlass Pro is the world's most comprehensive modern Figma UI kit built around modern glassmorphism, fluid typography, and multi-brand design tokens. Designed specifically for fintech, crypto, AI platforms, and dashboard applications with auto-layout 5.0 and variable support.",
    features: [
      "2,400+ Auto-Layout 5.0 master components with variants",
      "60+ Full application screen templates (Desktop & Mobile)",
      "Syncable W3C Design Tokens exportable to CSS/Tailwind",
      "Interactive component states (Default, Hover, Active, Disabled, Loading)",
      "Free lifetime updates as Figma releases new features"
    ],
    downloadsCount: 3410,
    downloadFilename: "NeoGlass-Pro-Design-System-v4.fig",
    image: "https://images.unsplash.com/photo-1581291518655-9523c932deda?w=700&auto=format&fit=crop&q=80",
    reviews: [
      { author: "Jessica Miller", role: "Lead Product Designer", rating: 5, date: "Oct 18, 2026", text: "The token system in this Figma kit is flawless. We integrated it into our design sprint seamlessly." },
      { author: "Thomas Wright", role: "UI/UX Freelancer", rating: 5, date: "Sep 30, 2026", text: "Clients literally drool over the glassmorphic aesthetics. Worth 10x its current price." },
      { author: "Priya Nair", role: "Design Director", rating: 5, date: "Sep 11, 2026", text: "Auto-layout components are super responsive and clean. Huge productivity booster." }
    ]
  },
  {
    id: "nc-design-02",
    title: "VividVector - 850+ 3D Isometric Tech & AI Icons",
    category: "design",
    categoryLabel: "UI/UX & Design Assets",
    format: "PNG / BLEND / SVG / GLTF",
    fileSize: "640 MB",
    version: "v1.8",
    license: "Commercial Royalty-Free",
    badge: "Popular",
    rating: 4.9,
    reviewsCount: 175,
    price: 24.00,
    originalPrice: 45.00,
    shortDescription: "High-resolution 3D rendered isometric illustrations and icons tailored for modern SaaS hero banners and landing pages.",
    fullDescription: "Elevate your web and mobile apps with hand-crafted 3D isometric assets. Rendered in high-resolution 4096x4096px transparent PNGs alongside fully editable Blender source files. Ideal for showcasing AI features, cloud computing, cybersecurity, and blockchain tech.",
    features: [
      "850+ High-definition isometric 3D renders with transparency",
      "Source Blender (.blend) files with configured materials and lighting",
      "Optimized lightweight GLTF formats for three.js web animations",
      "Categorized by AI, Fintech, DevOps, Cyber Defense, and Analytics"
    ],
    downloadsCount: 1540,
    downloadFilename: "VividVector-3D-Tech-Icons-v1.8.zip",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=700&auto=format&fit=crop&q=80",
    reviews: [
      { author: "Lucas Santos", role: "Web Developer", rating: 5, date: "Oct 01, 2026", text: "The transparent PNG renders look crisp even on 4K displays. Our landing page conversion spiked 35%." },
      { author: "Chloe Martin", role: "Graphic Artist", rating: 4.8, date: "Sep 14, 2026", text: "Having the original .blend files lets me tweak lighting to match client brand colors effortlessly." }
    ]
  },
  {
    id: "nc-book-01",
    title: "Distributed Systems Architecture Handbook (2026 Edition)",
    category: "ebooks",
    categoryLabel: "E-Books & Developer Guides",
    format: "PDF + EPUB + Interactive Notion Doc",
    fileSize: "32.5 MB",
    version: "4th Edition",
    license: "Single-Reader Personal & Team License",
    badge: "Top Rated",
    rating: 5.0,
    reviewsCount: 420,
    price: 29.00,
    originalPrice: 55.00,
    shortDescription: "Comprehensive deep-dive into scalable microservices, event-driven streaming, consensus algorithms, and database sharding.",
    fullDescription: "Written by ex-principal infrastructure engineers from Big Tech, this handbook deconstructs the hardest challenges in software engineering. Spanning 450 pages with 150+ full-color architectural blueprints, it provides concrete code implementations for Raft consensus, distributed caching, Kafka event streaming, and multi-region database replication.",
    features: [
      "450 Pages of in-depth architectural patterns & anti-patterns",
      "Real-world case studies: Netflix, Uber, Stripe, and Discord",
      "Code implementations in Go, Python, and TypeScript",
      "Full digital rights: Instant download in PDF, EPUB, and Kindle MOBI formats",
      "Includes editable Notion Architecture Template workspace"
    ],
    downloadsCount: 4890,
    downloadFilename: "Distributed-Systems-Architecture-Handbook-2026.pdf",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=700&auto=format&fit=crop&q=80",
    reviews: [
      { author: "Robert Zhao", role: "Staff Architect", rating: 5, date: "Oct 15, 2026", text: "The best practical book on distributed systems since Designing Data-Intensive Applications. Highly recommended." },
      { author: "Amina Al-Mansoor", role: "Backend Engineer", rating: 5, date: "Sep 22, 2026", text: "Helped me ace my System Design interviews for L6 engineering roles. Clear, diagram-rich explanations." },
      { author: "Daniel Scott", role: "Engineering Manager", rating: 5, date: "Aug 29, 2026", text: "We purchased team licenses for all 25 engineers on our platform team. Masterclass in print." }
    ]
  },
  {
    id: "nc-book-02",
    title: "The Zero-to-One Indie Hacker Playbook",
    category: "ebooks",
    categoryLabel: "E-Books & Developer Guides",
    format: "PDF + Audio MP3 + Notion Workbook",
    fileSize: "145 MB",
    version: "v2.0",
    license: "Personal Reader License",
    badge: "Creator Favorite",
    rating: 4.8,
    reviewsCount: 195,
    price: 19.00,
    originalPrice: 38.00,
    shortDescription: "Actionable roadmap to validating micro-SaaS ideas, building MVPs, acquiring first 1,000 users, and scaling to $10k MRR.",
    fullDescription: "Learn how solo founders build lean, automated, high-margin software businesses. Includes real revenue teardowns, customer interview scripts, SEO content strategies, and conversion rate optimization teardowns.",
    features: [
      "220-Page actionable e-book filled with tactical frameworks",
      "3-Hour professionally narrated audio edition (MP3)",
      "Financial projection spreadsheet & pricing calculator models",
      "Cold outreach email templates with proven 40%+ open rates"
    ],
    downloadsCount: 2180,
    downloadFilename: "Indie-Hacker-Playbook-Complete-Kit.zip",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=700&auto=format&fit=crop&q=80",
    reviews: [
      { author: "Simon Taylor", role: "Solo Bootstrapper", rating: 5, date: "Oct 08, 2026", text: "No fluff, just pure tactical execution advice. Replaced my scattered notes with a cohesive strategy." },
      { author: "Rachel Lee", role: "Founder", rating: 4.7, date: "Sep 03, 2026", text: "The pricing models chapter alone saved me from underpricing my B2B SaaS tool." }
    ]
  },
  {
    id: "nc-course-01",
    title: "AI Engineering & Agentic Workflow Masterclass",
    category: "courses",
    categoryLabel: "Online Courses & Masterclasses",
    format: "Video Stream (4K) + GitHub Repo + Discord Access",
    fileSize: "Stream / 4.8 GB Source",
    version: "Updated Oct 2026",
    license: "Lifetime Student Access",
    badge: "Flagship Course",
    rating: 4.95,
    reviewsCount: 520,
    price: 69.00,
    originalPrice: 149.00,
    shortDescription: "18-Hour comprehensive masterclass covering LLM orchestration, RAG pipelines, autonomous agents, and tool-calling systems.",
    fullDescription: "Master the frontier of modern software engineering. Build production-ready multi-agent systems using LangChain, LlamaIndex, OpenAI, and Claude APIs. You will implement autonomous research agents, vector database indexing with Qdrant, evaluation frameworks, and guardrails for production deployment.",
    features: [
      "18 Hours of 4K ultra-HD on-demand video lectures with subtitle tracks",
      "12 End-to-end full repository code walkthroughs",
      "Private VIP Discord community with weekly live instructor Q&A",
      "Certificate of Completion and portfolio-ready capstone project",
      "Lifetime access including all future module updates"
    ],
    downloadsCount: 5120,
    downloadFilename: "AI-Engineering-Course-Curriculum-And-Key.pdf",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=700&auto=format&fit=crop&q=80",
    reviews: [
      { author: "Vikram Malhotra", role: "Machine Learning Specialist", rating: 5, date: "Oct 17, 2026", text: "The best AI agent course on the market. The RAG evaluation module solved production issues we had at work." },
      { author: "Emily Watson", role: "Software Consultant", rating: 5, date: "Oct 04, 2026", text: "Super hands-on. I transitioned from traditional frontend to building AI copilots thanks to this masterclass." },
      { author: "Antoine Dubois", role: "Senior Developer", rating: 4.9, date: "Sep 25, 2026", text: "Instructor explains complex agent loops and memory retention with unparalleled clarity." }
    ]
  },
  {
    id: "nc-course-02",
    title: "UI/UX Micro-Interactions & Motion Design Workshop",
    category: "courses",
    categoryLabel: "Online Courses & Masterclasses",
    format: "Video Stream + Code Sandbox + Figma Files",
    fileSize: "Stream / 2.2 GB Assets",
    version: "v3.0",
    license: "Lifetime Access",
    badge: "Interactive",
    rating: 4.85,
    reviewsCount: 160,
    price: 45.00,
    originalPrice: 85.00,
    shortDescription: "Learn how to build jaw-dropping, fluid micro-interactions using Framer Motion, GSAP, CSS shaders, and modern canvas.",
    fullDescription: "Elevate your web apps from standard to breathtaking. In this interactive course, you'll learn timing curves, spring physics, layout animations, scroll-driven storytelling, and 3D hover effects that captivate users and boost product retention.",
    features: [
      "8 Hours of hands-on interactive coding tutorials",
      "35 Pre-built interactive animation components for React/Vue/HTML",
      "Complete Framer Motion & GSAP source code with live sandboxes",
      "Design-to-code workflow from Figma smart animate to production"
    ],
    downloadsCount: 1890,
    downloadFilename: "Motion-Design-Workshop-Assets.zip",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=700&auto=format&fit=crop&q=80",
    reviews: [
      { author: "Hannah Baker", role: "Frontend Designer", rating: 5, date: "Oct 11, 2026", text: "My portfolio and client landing pages look 10x more polished. The spring physics module is gold." },
      { author: "Kenji Sato", role: "Creative Technologist", rating: 4.8, date: "Sep 18, 2026", text: "Clear breakdown of performance bottlenecks and GPU layer promotion. Exceptional tutorial." }
    ]
  },
  {
    id: "nc-media-01",
    title: "CyberSynth - Cyberpunk Audio FX & Synthwave OST Library",
    category: "media",
    categoryLabel: "3D & Audio Assets",
    format: "WAV (24-bit 96kHz) + FLAC + Stems",
    fileSize: "1.85 GB",
    version: "v2.0",
    license: "Commercial Game & Media Royalty-Free",
    badge: "Creator Pick",
    rating: 4.9,
    reviewsCount: 85,
    price: 25.00,
    originalPrice: 50.00,
    shortDescription: "Over 450+ analog synth loops, UI sound effects, laser sweeps, atmospheric pads, and full game audio stems.",
    fullDescription: "Crafted on vintage Moog and Prophet analog synthesizers, CyberSynth is the definitive audio package for futuristic sci-fi games, cinematic trailers, YouTube videos, and mobile app UI haptics. 100% royalty-free across commercial and broadcast projects.",
    features: [
      "450+ Studio-mastered lossless audio samples (24-bit / 96kHz)",
      "12 Full modular soundtrack themes with separated multi-track stems",
      "80+ Futuristic UI interface sound effects (clicks, confirmations, alerts)",
      "Pre-mapped soundbanks for Ableton, FL Studio, and Logic Pro"
    ],
    downloadsCount: 1140,
    downloadFilename: "CyberSynth-Audio-Library-Master.zip",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=700&auto=format&fit=crop&q=80",
    reviews: [
      { author: "Liam O'Connor", role: "Indie Game Developer", rating: 5, date: "Oct 09, 2026", text: "The UI audio feedback sounds elevated our sci-fi game demo immediately. Supreme audio quality." },
      { author: "Zoe Chen", role: "Video Producer", rating: 4.8, date: "Sep 07, 2026", text: "Rich warm analog textures. The stems make editing to music transitions an absolute joy." }
    ]
  }
];

// Promotional Coupons
const PROMO_CODES = {
  "DIGITAL20": { discountPercent: 20, description: "20% Off All Digital Goods" },
  "CREATOR10": { discountPercent: 10, description: "10% Creator Community Discount" },
  "SRUTI50": { discountPercent: 50, description: "50% Academic Assignment VIP Discount" }
};

// Company Information for Assignment Guidelines
const COMPANY_INFO = {
  name: "NovaCraft Digital Marketplace",
  legalName: "NovaCraft Digital Technologies Pvt. Ltd.",
  tagline: "Empowering Next-Gen Creators with Instant Digital Goods & Tools",
  founded: "2024",
  headquarters: "Bengaluru Tech Corridor, Karnataka, India / Global Cloud Operation",
  natureOfBusiness: "Pure-Play Digital E-Commerce Marketplace & Electronic Distribution Platform",
  mission: "To eliminate friction in digital goods trade by connecting world-class developers, designers, and educators with global buyers through instantaneous electronic fulfillment, verified quality curation, and fair creator monetization.",
  targetAudience: [
    "Software Developers & DevOps Engineers seeking production-ready boilerplates and infrastructure tools",
    "UI/UX Product Designers looking for modular Figma design systems and 3D assets",
    "Self-Taught Engineers & Students leveling up via high-level architecture e-books and video masterclasses",
    "Digital Content Creators and Indie Hackers building automated micro-SaaS ventures"
  ],
  businessModel: {
    primary: "Hybrid B2C (Business-to-Consumer) and C2C (Creator Marketplace) Platform",
    revenueStreams: [
      "Platform Commission: 15% transaction fee on verified third-party creator sales",
      "Direct Catalog Revenue: 100% margin on NovaCraft first-party proprietary digital goods",
      "Extended Enterprise Commercial Licenses for corporate design systems and software",
      "Promoted Creator Product Listings & Sponsored Category Spotlights"
    ]
  }
};
