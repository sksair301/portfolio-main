export const profile = {
  name: "Shaikh Sabir",
  shortName: "Sabir",
  role: "Backend Developer",
  tagline:
    "I build clean, scalable web applications and RESTful APIs using PHP, Laravel and MySQL.",
  location: "Mumbai, India",
  email: "sksair301@gmail.com",
  phone: "+91 8867374425",

  socials: [
    {
      label: "GitHub",
      href: "https://github.com",
      icon: "github",
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com",
      icon: "linkedin",
    },
    {
      label: "Instagram",
      href: "https://instagram.com",
      icon: "instagram",
    },
    {
      label: "Email",
      href: "mailto:sksair301@gmail.com",
      icon: "mail",
    },
  ],
};


export const stats = [
  {
    value: "1+",
    label: "Year of professional experience",
  },
  {
    value: "3",
    label: "Professional roles completed",
  },
  {
    value: "3",
    label: "Featured projects",
  },
  {
    value: "10+",
    label: "Core technologies & practices",
  },
];


export const services = [
  {
    id: "backend",
    title: "Backend Development",
    kicker: "01",
    body:
      "Building reliable backend systems using PHP and Laravel with clean architecture, maintainable code and scalable application logic.",
    points: [
      "PHP / Laravel",
      "CRUD Development",
      "Backend Modules",
    ],
  },

  {
    id: "api",
    title: "REST API Development",
    kicker: "02",
    body:
      "Designing and developing RESTful APIs for internal and client-facing applications, including third-party service integrations.",
    points: [
      "RESTful APIs",
      "API Integration",
      "Postman Testing",
    ],
  },

  {
    id: "database",
    title: "Database & Optimization",
    kicker: "03",
    body:
      "Designing MySQL databases, managing schemas and optimizing queries to improve application performance and reliability.",
    points: [
      "MySQL",
      "Database Design",
      "Query Optimization",
    ],
  },
];


export const skills = [
  {
    name: "PHP",
    level: 90,
  },
  {
    name: "Laravel",
    level: 92,
  },
  {
    name: "MySQL",
    level: 88,
  },
  {
    name: "REST API",
    level: 90,
  },
  {
    name: "JavaScript",
    level: 78,
  },
  {
    name: "HTML5",
    level: 85,
  },
  {
    name: "CSS3",
    level: 82,
  },
  {
    name: "Bootstrap",
    level: 80,
  },
  {
    name: "GitHub",
    level: 82,
  },
  {
    name: "Postman",
    level: 85,
  },
  {
    name: "Python",
    level: 65,
  },
  {
    name: "FastAPI",
    level: 60,
  },
];


export const timeline = [
  {
    kind: "Experience",
    title: "Backend Developer",
    org: "Kintree",
    period: "Nov 2025 — Present",
    body:
      "Develop and maintain backend modules using PHP and Laravel. Design and optimize RESTful APIs, manage MySQL databases, integrate third-party services, troubleshoot bugs and collaborate with frontend developers and project managers.",
  },

  {
    kind: "Experience",
    title: "Backend Developer Intern",
    org: "Kintree",
    period: "Aug 2025 — Oct 2025",
    body:
      "Assisted in developing Laravel-based web applications, built CRUD operations and REST API endpoints, supported MySQL database management and participated in testing and debugging.",
  },

  {
    kind: "Experience",
    title: "Summer Intern",
    org: "Kintree",
    period: "May 2025 — Aug 2025",
    body:
      "Gained hands-on experience with PHP, Laravel and relational databases while learning software development lifecycle practices, website maintenance and backend support.",
  },

  {
    kind: "Education",
    title: "Bachelor of Vocation",
    org: "BVoc — Software Development",
    period: "2022 — 2025",
    body:
      "Studied software development with a focus on programming, databases, application development and software engineering fundamentals.",
  },

  {
    kind: "Education",
    title: "Higher Secondary Certificate",
    org: "HSC — 12th",
    period: "",
    body:
      "Completed Higher Secondary Certificate education.",
  },

  {
    kind: "Education",
    title: "Secondary School Certificate",
    org: "SSC — 10th",
    period: "",
    body:
      "Completed Secondary School Certificate education.",
  },
];


export type Project = {
  title: string;
  index: string;
  summary: string;
  tags: string[];
  live: string;
  code: string;
};


export const projects: Project[] = [
  {
    title: "Food Recommendation System",
    index: "01",
    summary:
      "A recommendation system designed to suggest food items based on user preferences and available data patterns.",
    tags: [
      "Python",
      "Machine Learning",
      "Recommendation System",
    ],
    live: "#",
    code: "#",
  },

  {
    title: "Emotion-Aware Chatbot",
    index: "02",
    summary:
      "A chatbot project capable of detecting user emotions and adapting its conversational responses accordingly.",
    tags: [
      "Python",
      "Machine Learning",
      "Chatbot",
    ],
    live: "#",
    code: "#",
  },

  {
    title: "NEP Student Management System",
    index: "03",
    summary:
      "A student management system designed to manage student records and workflows aligned with the National Education Policy.",
    tags: [
      "PHP",
      "Database",
      "Student Management",
    ],
    live: "#",
    code: "#",
  },
];


export const navItems = [
  {
    id: "home",
    label: "Home",
  },
  {
    id: "about",
    label: "About",
  },
  {
    id: "skills",
    label: "Skills",
  },
  {
    id: "experience",
    label: "Experience",
  },
  {
    id: "projects",
    label: "Projects",
  },
  {
    id: "contact",
    label: "Contact",
  },
];

