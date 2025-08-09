import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Download,
  Moon,
  Sun,
  ExternalLink,
  ArrowRight,
  Code,
  Shield,
  Zap,
  Cloud,
  TerminalSquare,
} from "lucide-react";
import {
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Button } from "./components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";

const Container = ({ children, className = "" }) => (
    <div className={`mx-auto w-full max-w-7xl px-4 md:px-6 ${className}`}>
      {children}
    </div>
);

const Section = ({ id, title, subtitle, children }) => (
    <section id={id} className="scroll-mt-24 py-10 md:py-16">
      <Container>
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {subtitle && (
              <p className="mt-2 text-muted-foreground max-w-2xl">{subtitle}</p>
          )}
          <div className="mt-6">{children}</div>
        </motion.div>
      </Container>
    </section>
);

const PROFILE = {
  name: "Vedant Vinayak Bodhe",
  role: "Security Engineer • Analyst • Software Engineer (DevOps)",
  summary:
      "Dedicated Applied Computer Science student with a passion for software development, IT security, and engineering. I strive to develop innovative and sustainable software solutions and design secure, efficient IT infrastructures that optimally support business processes.",
  location: "Fulda, Germany",
  email: "vedantbodhe@gmail.com",
  // phone: "+49 000 0000000", // optional — if set, the Phone card will show
  links: {
    github: "https://github.com/vedantbodhe",
    linkedin: "https://www.linkedin.com/in/vedant-bodhe/",
    portfolio: "#projects",
  },
};

const SKILLS_RADAR = [
  { subject: "Programming", A: 85 },
  { subject: "Security Engineering", A: 85 },
  { subject: "Network Administration", A: 80 },
  { subject: "Cloud Computing", A: 70 },
  { subject: "Project Planning and Consulting", A: 70 },
  { subject: "AI", A: 70 },
];

const AngleTick = ({ payload, x, y, textAnchor }) => {
  const words = String(payload?.value ?? "").split(" ");
  return (
      <text x={x} y={y} textAnchor={textAnchor} fontSize={11} fill="currentColor">
        {words.map((w, i) => (
            <tspan key={i} x={x} dy={i === 0 ? 0 : 12}>{w}</tspan>
        ))}
      </text>
  );
};


const EXPERIENCE = [
  {
    role: "Internship : Security & Quality Engineering",
    company: "Deutsche Bahn InfraGO",
    period: "April 2025 – October 2025",
    bullets: [
      "Implementation of an automated Policy-as-Code engine (Open Policy Agent) for automatic compliance validation facilitation in DB InfraGO’s SSDLC (Secure Software Development LifeCycle)",
      "Development of a Docker/Podman based Image Compliance Scanner app with a React-TypeScript frontend and a Python FastAPI backend",
      "Application of DevSecOps principles in CI/CD pipelines: Vulnerability scans, Policy Management, and Quality Assurance processes",
      "Advising development teams on the optimization of their SSDLC",
      "Writing Python automation scripts to scan and harden container images and registries according to the CIS Docker Benchmarks using Trivy, Grype and Syft",
    ],
    tags: ["Policy-as-Code", "GitLab CI/CD", "Security Engineering", "Python"],
  },
  {
    role: "Working Student IT – SAP S/4HANA Data-Migration",
    company: "Deutsche Bahn InfraGO",
    period: "March 2024 – March 2025",
    bullets: [
      "Assisted in migrating the SAP database application FIMA (Financial Management) from SAP R3K to S/4HANA",
      "Programmed scripts in R and Python for data analysis and migration between SAP systems",
      "Supported SAP authorizations and workplace roles with a focus on data access management",
    ],
    tags: ["Python", "R", "SAP", "Data Quality"],
  },
  {
    role: "Werkstudent – Partner Ecosystems Success",
    company: "SAP SE",
    period: "May 2022 – Oct 2022",
    bullets: [
      "Reporting & analysis for software partner solutions.",
      "Worked in an international, English-speaking team.",
    ],
    tags: ["Data", "Analytics", "Communication"],
  },
];

const PROJECTS = [
  {
    title: "Strong Password Generator standalone App",
    description:
        "A sleek desktop password generator with cryptographically secure randomness and a built‑in encrypted vault (AES‑GCM) to save generated passwords locally.",
    link: "https://github.com/vedantbodhe/StrongPasswordGenerator",
    tags: ["Python", "Cryptography", "Tkinter", "Scripting"],
  },
  {
    title: "Java based Secure Code Playground ",
    description:
        "A full-stack web application for real-time Java static code analysis using PMD to detect security issues, code smells, and best-practice violations.",
    link: "https://github.com/vedantbodhe/secure-code-playground",
    tags: ["Java", "Spring Boot", "Secure Programming"],
  },
  {
    title: "Report my Damage!",
    description:
        "Python FastAPI + OpenAI Vision API + AWS prototype to triage and email damaged packet incident reports.",
    link: "https://github.com/vedantbodhe/damage-report-app",
    tags: ["Python FastAPI", "OpenAI", "AWS"],
  },
];

/* === New data: Education, Papers, Skills, Soft Skills, Languages === */
const EDUCATION = [
  {
    degree: "B.Sc. International Science and Engineering",
    detail: "Specialization: Applied Computer Science",
    period: "Oct 2021 – Oct 2025 (planned graduation end of Sep 2025)",
    school: "Hochschule Fulda",
    location: "Fulda, Germany",
  },
  {
    degree: "B.A. Journalism and Mass Communication",
    detail: "Specialization: Sound Engineering",
    period: "Jun 2017 – Aug 2020",
    school: "Tilak Maharashtra Vidyapeeth",
    location: "Pune, India",
  },
];

const PAPERS = [
  {
    title:
        "Evaluation of User Understanding of Privacy and Security Risks in Consent Banners: The Role of Dark Patterns",
    period: "2024–2025",
    org: "Hochschule Fulda (Academic Paper)",
    location: "Fulda, Germany",
  },
  {
    title:
        "Facilitating Shift-Left Security using Policy-as-Code in the SSDLC: A Deutsche Bahn InfraGO Case Study",
    period: "2025 (Bachelor Thesis)",
    org: "DB InfraGO & Hochschule Fulda",
    location: "Frankfurt am Main & Fulda, Germany",
  },
];

const TECH_SKILLS = [
  { k: "Programming", v: "Python, Java, JavaScript, TypeScript, Rego, Go, R" },
  { k: "Frontend", v: "React, React Native, Angular, Vue, Vaadin" },
  {
    k: "Backend",
    v: "Node.js, npm, Express, Next.js, Django, Flask, FastAPI, Spring Boot, Hibernate",
  },
  {
    k: "DevOps",
    v: "CI/CD (GitLab/GitHub/Jenkins/Bitbucket), Ansible, Helm, Docker & Kubernetes, Security Scans (Trivy, Grype, SAST, DAST, DefectDojo)",
  },
  { k: "Databases", v: "MySQL, PostgreSQL, SQLAlchemy, MongoDB, SAP S/4HANA" },
  {
    k: "Tools",
    v: "Git, WSL (Ubuntu), VS Code, IntelliJ, Eclipse, JIRA, Confluence, Docker, Podman, OpenShift, Azure, MS 365",
  },
  {
    k: "Cloud & IaC",
    v: "Terraform, AWS (EC2, Elastic Beanstalk, Route 53, S3, Lambda, IAM), Azure (ARM, Functions), Kubernetes, GitLab CI/CD, FinOps",
  },
  { k: "Policy-as-Code", v: "Open Policy Agent, Kyverno" },
  { k: "Observability", v: "Prometheus, Grafana, ELK (Elasticsearch, Logstash, Kibana)" },
  { k: "AI Platforms", v: "OpenAI Vision/API, Google Vertex AI, Gemini API, TensorFlow Lite" },
  { k: "ML", v: "NumPy, pandas, scikit-learn, Matplotlib, Jupyter, PyTorch" },
  {
    k: "Compliance",
    v: "ISO/IEC 27001, DB RAIS, BSI IT-Grundschutz, GDPR (ethical application throughout lifecycle)",
  },
];

const SOFT_SKILLS = {
  soft: [
    "Self-driven initiative",
    "Communicative in team processes",
    "Multilingual proficiency",
    "Rapid adaptability in agile teams",
  ],
  hobbies: [
    "Learning new programming languages & technologies",
    "Board & video games",
    "Music production",
    "Travelling",
  ],
  sports: ["Fitness", "Badminton", "Football", "Bike-riding", "Hiking"],
};

const LANGUAGES = [
  { name: "German (DSH-2 / C1)", level: "Fluent" },
  { name: "English (IELTS 8.0)", level: "Fluent / near-native" },
  { name: "Marathi", level: "Native" },
  { name: "Hindi", level: "Native" },
];

const useTheme = () => {
  const [dark, setDark] = useState(true);
  React.useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
};

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function App() {
  const { dark, setDark } = useTheme();

  const heroIcons = useMemo(
      () => [
        { Icon: Shield, label: "Security" },
        { Icon: Cloud, label: "Cloud" },
        { Icon: Code, label: "Dev" },
        { Icon: TerminalSquare, label: "DevOps" },
      ],
      []
  );

  return (
      <div className="min-h-screen bg-background text-foreground">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b bg-background/80 dark:bg-white/80 backdrop-blur">
          <Container className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-2xl bg-primary/15 grid place-items-center">
                <Shield className="h-5 w-5"/>
              </div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-900">
        {PROFILE.name}
      </span>
            </div>

            <nav className="hidden md:flex items-center gap-1">
              {[
                ["About", "about"],
                ["Profile at a Glance", "profile"],
                ["Skills", "skills"],
                ["Experience", "experience"],
                ["Projects", "projects"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                  <Button
                      key={id}
                      variant="ghost"
                      className="px-3 text-zinc-900 dark:text-zinc-900"
                      onClick={() => scrollToId(id)}
                  >
                    {label}
                  </Button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Button
                  variant="outline"
                  onClick={() => setDark((d) => !d)}
                  aria-label="Toggle theme"
              >
                {dark ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
              </Button>

              <a href={`mailto:${PROFILE.email}`}>
                <Button>
                  <Mail className="mr-2 h-4 w-4"/> Get in touch!
                </Button>
              </a>
            </div>
          </Container>
        </header>


        {/* Hero */}
        <section className="relative overflow-hidden border-b">
          <Container>
            <div className="grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
              {/* Left column */}
              <motion.div
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.6}}
              >
                <div
                    className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                  <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"/>{" "}
                  Open to work from Nov 2025
                </div>
                <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                  {PROFILE.name}
                </h1>
                <p className="mt-2 text-xl text-muted-foreground">{PROFILE.role}</p>
                <p className="mt-4 max-w-prose leading-relaxed text-muted-foreground">
                  {PROFILE.summary}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
                    <Button variant="outline">
                      <Github className="mr-2 h-4 w-4"/>
                      GitHub
                    </Button>
                  </a>
                  <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                    <Button variant="outline">
                      <Linkedin className="mr-2 h-4 w-4"/>
                      LinkedIn
                    </Button>
                  </a>
                  <Button onClick={() => scrollToId("contact")}>
                    Contact <ArrowRight className="ml-2 h-4 w-4"/>
                  </Button>
                </div>
                <div className="mt-4 text-sm text-muted-foreground">
                  <span className="mr-3">{PROFILE.location}</span>•
                  <span className="ml-3">{PROFILE.email}</span>
                </div>
              </motion.div>

              {/* Right column — Avatar + What I do */}
              <motion.div
                  className="relative flex flex-col items-center gap-6"
                  initial={{opacity: 0, y: 12}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.6, delay: 0.1}}
              >
                {/* Avatar */}
                <img
                    src="/profilepic.jpeg" // put your image in /public
                    alt={PROFILE.name}
                    className="w-48 h-48 rounded-full object-cover border-4 border-background shadow-lg"
                />

                {/* What I do */}
                <Card className="relative w-full overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg">What I do</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Icon grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {heroIcons.map(({Icon, label}, idx) => (
                          <motion.div
                              key={label}
                              className="rounded-2xl border p-4 grid place-items-center text-center"
                              initial={{opacity: 0, y: 8}}
                              whileInView={{opacity: 1, y: 0}}
                              viewport={{once: true}}
                              transition={{delay: idx * 0.05}}
                          >
                            <Icon className="h-6 w-6 mb-2"/>
                            <div className="text-sm font-medium">{label}</div>
                          </motion.div>
                      ))}
                    </div>

                    {/* Quick facts */}
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {k: "Experience", v: "DevSecOps, AppSec, Cloud"},
                        {k: "Strength", v: "Policy-as-Code & CI/CD"},
                        {k: "Currently", v: "Open from Nov ’25"},
                      ].map((item) => (
                          <div
                              key={item.k}
                              className="rounded-xl border px-3 py-2 text-sm"
                          >
                            <div className="font-medium">{item.k}</div>
                            <div className="text-muted-foreground">{item.v}</div>
                          </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </Container>
        </section>

        {/* About */}
        <Section id="about" title="About" subtitle="Quick snapshot of who I am and how I work.">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Principles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>Security-by-default • Infrastructure-as-Code • Everything tests.</p>
                <p>Automate the boring parts. Measure, iterate, improve.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Engineered secure, scalable software solutions by integrating Policy-as-Code into the SSDLC.</li>
                  <li>Enhanced container security through automated compliance checks and vulnerability remediation.
                  </li>
                  <li>Combined development and security expertise to deliver tools for continuous monitoring and risk
                    reduction.
                  </li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Stack</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "Python",
                  "Java",
                  "Go",
                  "React",
                  "FastAPI",
                  "OPA/Rego",
                  "AWS",
                  "Kubernetes",
                  "GitLab CI",
                ].map((t) => (
                    <Badge key={t} variant="secondary" className="px-2 py-1 text-xs">
                      {t}
                    </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Profile at a glance */}
        {/* Profile at a glance (stacked like Experience) */}
        <Section
            id="profile"
            title="Profile at a glance"
            subtitle="Education, publications, skills, and languages."
        >
          <div className="space-y-6">
            {/* Education */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight">Education</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                {EDUCATION.map((e, i) => (
                    <div
                        key={i}
                        className={i !== 0 ? "pt-4 mt-4 border-t border-border" : ""}
                    >
                      <div className="font-semibold text-base text-foreground">{e.degree}</div>
                      <div className="text-muted-foreground">{e.detail}</div>
                      <div className="italic text-muted-foreground">{e.period}</div>
                      <div className="text-xs uppercase tracking-wide text-primary">
                        {e.school} — {e.location}
                      </div>
                    </div>
                ))}
              </CardContent>
            </Card>

            {/* Scientific Papers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight">Scientific Papers</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4">
                {PAPERS.map((p, i) => (
                    <div
                        key={i}
                        className={i !== 0 ? "pt-4 mt-4 border-t border-border" : ""}
                    >
                      <div className="font-semibold text-base text-foreground">{p.title}</div>
                      <div className="italic text-muted-foreground">{p.period}</div>
                      <div className="text-xs uppercase tracking-wide text-primary">
                        {p.org} — {p.location}
                      </div>
                    </div>
                ))}
              </CardContent>
            </Card>

            {/* Technical Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight text-black dark:text-white">
                  Technical Skills
                </CardTitle>
              </CardHeader>

              <CardContent className="relative">
                {(() => {
                  // ---- grouped data (edit freely) ----
                  const GROUPS = [
                    { k: "Programming", v: "Python, Java, JavaScript, TypeScript, Rego, Go, R" },
                    { k: "Frontend", v: "React, React Native, Angular, Vue, Vaadin" },
                    { k: "Backend", v: "Node.js, npm, Express, Next.js, Django, Flask, FastAPI, Spring Boot, Hibernate" },
                    { k: "DevOps", v: "CI/CD (GitLab, GitHub, Jenkins, Bitbucket), Ansible, Helm, Docker, Kubernetes, Security Scans (Trivy, Grype, SAST, DAST, DefectDojo)" },
                    { k: "Databases", v: "MySQL, PostgreSQL, SQLAlchemy, MongoDB, SAP S4/HANA" },
                    { k: "Cloud & IaC", v: "Terraform, AWS (EC2, Route 53, S3, Lambda, IAM), Azure (ARM, Functions), Kubernetes, FinOps" },
                    { k: "Policy-as-Code", v: "Open Policy Agent, Kyverno" },
                    { k: "Observability", v: "Prometheus, Grafana, ELK Stack" },
                    { k: "AI & ML", v: "OpenAI API, Google Vertex AI, Gemini API, TensorFlow Lite, NumPy, pandas, scikit-learn, Matplotlib, Jupyter, PyTorch" },
                    { k: "Compliance", v: "ISO/IEC 27001, DB RAIS, BSI IT-Grundschutz, GDPR" },
                  ];

                  // ---- split only on commas OUTSIDE parentheses ----
                  function splitSkills(str) {
                    const res = [];
                    let cur = "", depth = 0;
                    for (let ch of str) {
                      if (ch === "(") depth++;
                      if (ch === ")") depth--;
                      if (ch === "," && depth === 0) {
                        if (cur.trim()) res.push(cur.trim());
                        cur = "";
                      } else {
                        cur += ch;
                      }
                    }
                    if (cur.trim()) res.push(cur.trim());
                    return res;
                  }

                  const all = GROUPS.flatMap((g) => splitSkills(g.v));

                  // ---- typewriter state ----
                  const [idx, setIdx] = React.useState(0);
                  const [phase, setPhase] = React.useState("typing"); // typing | pause | deleting
                  const [cursor, setCursor] = React.useState(true);
                  const current = all[idx % all.length] || "";
                  const [shown, setShown] = React.useState("");

                  React.useEffect(() => {
                    const blink = setInterval(() => setCursor((c) => !c), 500);
                    return () => clearInterval(blink);
                  }, []);

                  React.useEffect(() => {
                    let t;
                    if (phase === "typing") {
                      t = setTimeout(() => {
                        if (shown.length < current.length) setShown(current.slice(0, shown.length + 1));
                        else setPhase("pause");
                      }, 45);
                    } else if (phase === "pause") {
                      t = setTimeout(() => setPhase("deleting"), 800);
                    } else {
                      t = setTimeout(() => {
                        if (shown.length > 0) setShown(current.slice(0, shown.length - 1));
                        else {
                          setPhase("typing");
                          setIdx((i) => i + 1);
                        }
                      }, 25);
                    }
                    return () => clearTimeout(t);
                  }, [shown, phase, current]);

                  // ---- visuals ----
                  const bgDots =
                      "bg-[radial-gradient(circle_at_1px_1px,theme(colors.zinc.300)_1px,transparent_1px)] dark:bg-[radial-gradient(circle_at_1px_1px,theme(colors.zinc.700)_1px,transparent_1px)] bg-[length:18px_18px] rounded-2xl p-4 md:p-6 border";

                  const sizeFor = (tag) =>
                      tag.length <= 4 ? "text-xl md:text-2xl"
                          : tag.length <= 8 ? "text-lg"
                              : "text-base";

                  return (
                      <div className={bgDots}>
                        {/* Typewriter */}
                        <div className="mb-6">
                          <div className="text-sm uppercase tracking-wider text-muted-foreground mb-2">
                            I have experience with ...
                          </div>
                          <div className="font-mono text-lg md:text-xl border rounded-xl px-3 py-2 bg-background/70 backdrop-blur flex items-center">
                            <span className="text-foreground">{">"}</span>
                            <span className="ml-2">{shown}</span>
                            <span className={`ml-1 w-2 ${cursor ? "opacity-100" : "opacity-0"}`}>|</span>
                          </div>
                        </div>

                        {/* Categorised cloud */}
                        <div className="space-y-6">
                          {GROUPS.map((g, gi) => (
                              <div key={gi}>
                                {/* Category title: PURE black/white via theme */}
                                <div className="mb-2 text-sm font-semibold tracking-wide text-black dark:text-white">
                                  {g.k}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {splitSkills(g.v).map((tag, ti) => {
                                    const isActive = tag === current;
                                    return (
                                        <span
                                            key={ti}
                                            className={[
                                              "inline-flex select-none items-center rounded-xl border px-3 py-1.5 transition-all shadow-sm",
                                              sizeFor(tag),
                                              isActive
                                                  ? "bg-foreground/5 border-foreground/30 text-foreground scale-[1.03]"
                                                  : "bg-background text-foreground hover:scale-105",
                                            ].join(" ")}
                                        >
                        {tag}
                      </span>
                                    );
                                  })}
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>
                  );
                })()}
              </CardContent>
            </Card>



            {/* Soft Skills */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight">Soft Skills</CardTitle>
              </CardHeader>

              <CardContent className="text-sm">
                {(() => {
                  const CORE = [
                    { label: "Self-driven initiative", icon: "🚀" },
                    { label: "Team communication", icon: "💬" },
                    { label: "Multilingual proficiency", icon: "🌍" },
                    { label: "Adaptability (agile)", icon: "⚡" },
                  ];

                  const HOBBIES = [
                    { label: "Learning new tech", icon: "💻" },
                    { label: "Board & video games", icon: "🎮" },
                    { label: "Music production", icon: "🎵" },
                    { label: "Travelling", icon: "✈️" },
                  ];

                  const SPORTS = [
                    { label: "Fitness", icon: "🏋️‍♂️" },
                    { label: "Badminton", icon: "🏸" },
                    { label: "Football", icon: "⚽" },
                    { label: "Bike-riding", icon: "🚴‍♂️" },
                    { label: "Hiking", icon: "🥾" },
                  ];

                  const Chip = ({ text, icon }) => (
                      <span className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 bg-background text-foreground">
          <span aria-hidden>{icon}</span> {text}
        </span>
                  );

                  const Section = ({ title, items }) => (
                      <div>
                        <div className="mb-2 font-medium text-foreground">{title}</div>
                        <div className="flex flex-wrap gap-2">
                          {items.map((item, i) => (
                              <Chip key={i} text={item.label} icon={item.icon} />
                          ))}
                        </div>
                      </div>
                  );

                  return (
                      <div className="space-y-6">
                        <Section title="Core" items={CORE} />
                        <Section title="Hobbies" items={HOBBIES} />
                        <Section title="Sports" items={SPORTS} />
                      </div>
                  );
                })()}
              </CardContent>
            </Card>



            {/* Languages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight">Languages</CardTitle>
              </CardHeader>

              <CardContent>
                {(() => {
                  // Define levels (0–100) + flag emoji
                  const LANG = [
                    { name: "German (DSH-2 / C1)", level: 85, flag: "🇩🇪", label: "Fluent" },
                    { name: "English (IELTS 8.0)", level: 95, flag: "🇬🇧", label: "Near-native" },
                    { name: "Marathi", level: 100, flag: "🇮🇳", label: "Native" },
                    { name: "Hindi", level: 100, flag: "🇮🇳", label: "Native" },
                  ];

                  // Simple circular progress (SVG)
                  const Ring = ({ pct = 80 }) => {
                    const R = 28; // radius
                    const C = 2 * Math.PI * R;
                    const dash = Math.max(0, Math.min(C, (pct / 100) * C));
                    return (
                        <svg width="72" height="72" viewBox="0 0 72 72" className="shrink-0">
                          <circle cx="36" cy="36" r={R} stroke="currentColor" strokeOpacity="0.15" strokeWidth="6" fill="none" />
                          <circle
                              cx="36"
                              cy="36"
                              r={R}
                              stroke="currentColor"
                              strokeWidth="6"
                              fill="none"
                              strokeDasharray={`${dash} ${C - dash}`}
                              strokeLinecap="round"
                              style={{ transform: "rotate(-90deg)", transformOrigin: "36px 36px" }}
                          />
                        </svg>
                    );
                  };

                  return (
                      <div className="grid gap-4 sm:grid-cols-2">
                        {LANG.map((l, i) => (
                            <div
                                key={l.name + i}
                                className="flex items-center gap-4 rounded-xl border p-3 md:p-4 bg-background hover:shadow-sm transition"
                            >
                              <div className="relative">
                                <Ring pct={l.level} />
                                <div className="absolute inset-0 grid place-items-center">
                                  <span className="text-2xl" aria-hidden>{l.flag}</span>
                                </div>
                              </div>
                              <div className="min-w-0">
                                <div className="font-medium text-foreground truncate">{l.name}</div>
                                <div className="text-xs text-muted-foreground">{l.label}</div>
                              </div>
                              <div className="ml-auto text-sm text-muted-foreground">{l.level}%</div>
                            </div>
                        ))}
                      </div>
                  );
                })()}
              </CardContent>
            </Card>

          </div>
        </Section>


        {/* Skills */}
        <Section
            id="skills"
            title="Skills"
            subtitle="A visual snapshot of my current strengths."
        >
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Core Competencies</CardTitle>
              </CardHeader>
              <CardContent className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={SKILLS_RADAR} cx="50%" cy="50%" outerRadius="75%">
                    {/* Softer, circular grid */}
                    <PolarGrid gridType="circle"/>
                    {/* Wrap long labels; no tick line */}
                    <PolarAngleAxis dataKey="subject" tick={<AngleTick/>} tickLine={false}/>
                    {/* Hide numbers (radius ticks) and axis line */}
                    <PolarRadiusAxis tick={false} axisLine={false} tickCount={5}/>
                    {/* Cleaner radar style */}
                    <Radar
                        dataKey="A"
                        stroke="currentColor"
                        strokeWidth={2}
                        fill="currentColor"
                        fillOpacity={0.15}
                        isAnimationActive
                    />
                    <Tooltip contentStyle={{borderRadius: 12}}/>
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Keywords & Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Policy-as-Code",
                    "SSDLC",
                    "SBOM",
                    "Trivy",
                    "Grype",
                    "Syft",
                    "DefectDojo",
                    "Terraform",
                    "Helm",
                    "Prometheus",
                    "Grafana",
                    "Git",
                    "Linux",
                  ].map((t) => (
                      <Badge key={t} className="px-2 py-1 text-xs">
                        {t}
                      </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Experience */}
        <Section
            id="experience"
            title="Experience"
            subtitle="Roles, responsibilities, and impact."
        >
          <div className="space-y-6">
            {EXPERIENCE.map((exp, i) => (
                <motion.div
                    key={exp.company + i}
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                >
                  <Card>
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl">
                          {exp.role} · {exp.company}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground">{exp.period}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((t) => (
                            <Badge key={t} variant="secondary" className="text-xs">
                              {t}
                            </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                        {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section
            id="projects"
            title="Featured Projects"
            subtitle="Some of my featured projects. More on my Github!"
        >
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
                <Card
                    key={p.title}
                    className="group overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5"
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground min-h-[54px]">
                      {p.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                          <Badge key={t} variant="secondary" className="text-xs">
                            {t}
                          </Badge>
                      ))}
                    </div>
                    <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center text-sm"
                    >
                      Visit <ExternalLink className="ml-1 h-4 w-4"/>
                    </a>
                  </CardContent>
                </Card>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section
            id="contact"
            title="Get in touch"
            subtitle="Happy to connect about software engineering, security engineering, DevOps, or AI development topics."
        >
          <Card>
            <CardContent className="pt-6">
              <div className="grid gap-4 md:grid-cols-3">
                <a
                    className="rounded-2xl border p-4 hover:bg-muted"
                    href={`mailto:${PROFILE.email}`}
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5"/>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted-foreground">
                        {PROFILE.email}
                      </div>
                    </div>
                  </div>
                </a>
                <a
                    className="rounded-2xl border p-4 hover:bg-muted"
                    href={PROFILE.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                >
                  <div className="flex items-center gap-3">
                    <Linkedin className="h-5 w-5"/>
                    <div>
                      <div className="font-medium">LinkedIn</div>
                      <div className="text-sm text-muted-foreground">
                        /vedant-bodhe
                      </div>
                    </div>
                  </div>
                </a>

                {PROFILE.phone && (
                    <div className="rounded-2xl border p-4">
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5"/>
                        <div>
                          <div className="font-medium">Phone</div>
                          <div className="text-sm text-muted-foreground">
                            {PROFILE.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                )}
              </div>
              <div className="mt-6 text-xs text-muted-foreground">
                Prefer email first contact. Full CV available on request.
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Footer */}
        <footer className="border-t py-8">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
              <div>
                © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
              </div>
              <div className="flex items-center gap-3">
                <a
                    href={PROFILE.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1"
                >
                  <Github className="h-4 w-4"/>
                  GitHub
                </a>
                <a
                    href={PROFILE.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1"
                >
                  <Linkedin className="h-4 w-4"/>
                  LinkedIn
                </a>
                <a href="#projects" className="inline-flex items-center gap-1">
                  Projects
                </a>
              </div>
            </div>
          </Container>
        </footer>

        {/* Print Styles */}
        <style>{`
        @media print {
          header, footer, nav, .no-print { display: none !important; }
          section { page-break-inside: avoid; }
          .scroll-mt-24 { scroll-margin-top: 0; }
          .rounded-2xl, .rounded-2xl * { box-shadow: none !important; }
        }
      `}</style>
      </div>
  );
}
