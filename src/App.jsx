import React, { useMemo, useState, useEffect } from "react";
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
  Cloud,
  TerminalSquare,
  Globe,
  UserCheck,
  Server,
  Database,
  Cpu,
  CheckCircle2,
  Lock,
  Activity
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

// --- THEME UTILS ---
const BackgroundGrid = () => (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020617]">
      {/* Deep Navy/Black Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-[0.1]"></div>
      {/* Glowing Orbs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
    </div>
);

const Container = ({ children, className = "" }) => (
    <div className={`mx-auto w-full max-w-7xl px-4 md:px-6 ${className}`}>
      {children}
    </div>
);

const Section = ({ id, title, subtitle, children }) => (
    <section id={id} className="scroll-mt-24 py-12 md:py-24 relative">
      <Container>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-10 bg-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">{title}</h2>
          </div>
          {subtitle && (
              <p className="mt-2 text-slate-400 max-w-2xl text-lg">{subtitle}</p>
          )}
          <div className="mt-10">{children}</div>
        </motion.div>
      </Container>
    </section>
);

// --- DATA ---
const PROFILE = {
  name: "Vedant Vinayak Bodhe",
  role: "IAM Engineer • Security Engineer • Software Engineer (DevOps)",
  summary:
      "Dedicated Applied Computer Science student with a passion for software development, IT security, and engineering. I strive to develop innovative and sustainable software solutions and design secure, efficient IT infrastructures that optimally support business processes.",
  location: "Fulda, Germany",
  email: "vedantbodhe@gmail.com",
  phone: "+49 000 0000000",
  links: {
    github: "https://github.com/vedantbodhe",
    linkedin: "https://www.linkedin.com/in/vedant-bodhe/",
    portfolio: "#projects",
  },
  avatarUrl: "/profilepic.jpeg"
};

const SKILLS_RADAR = [
  { subject: "IAM", A: 95, fullMark: 100 },
  { subject: "Security Eng.", A: 85, fullMark: 100 },
  { subject: "Programming", A: 80, fullMark: 100 },
  { subject: "Cloud Computing", A: 70, fullMark: 100 },
  { subject: "Consulting", A: 70, fullMark: 100 },
  { subject: "AI", A: 70, fullMark: 100 },
];

const EXPERIENCE = [
  {
    role: "Identity and Access Management (IAM) Engineer",
    company: "Hochschule Fulda",
    period: "Dec 2025 – Present",
    bullets: [
      "Designing, implementing, and continuously improving centralized Identity & Access Management solutions (OpenText Identity Manager, Microsoft Entra ID).",
      "Developing technical IAM concepts including role, entitlement, and provisioning models for on-premises and cloud services (M365).",
      "Operating, administering, and supporting Microsoft 365 and Entra ID environments.",
      "Developing and integrating custom Python-based interfaces and automation solutions for heterogeneous ICT systems."
    ],
    tags: ["Entra ID", "OpenText", "Python", "M365", "Identity Mgmt"],
  },
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
    role: "Working Student – Partner Ecosystems Success",
    company: "SAP SE",
    period: "May 2022 – Oct 2022",
    bullets: [
      "Worked in the SAP Partner Ecosystems Success team for MEE region.",
      "Part of an International and Multi-cultural motivated team based in Europe",
      "Daily/Weekly Production of Sales Pipeline Reports",
      "Gained quality experience and knowledge in SAP Analytical Tools and SAP based software solutions"
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

const EDUCATION = [
  {
    degree: "B.Sc. International Science and Engineering",
    detail: "Specialization: Applied Computer Science",
    thesis: "Thesis: Facilitating Shift-Left Security using Policy-as-Code in the SSDLC : A Deutsche Bahn InfraGO Case Study (Note/Grade: 1,0)",
    period: "Oct 2021 – Oct 2025",
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
    period: "2025",
    org: "Deutsche Bahn InfraGO & Hochschule Fulda (Bachelor Thesis)",
    location: "Frankfurt am Main & Fulda, Germany",
  },
];

const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function App() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

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
      <div className="min-h-screen bg-[#020617] text-slate-300 selection:bg-cyan-500/30 selection:text-cyan-300 font-sans">
        <BackgroundGrid />

        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
          <Container className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 rounded bg-gradient-to-br from-blue-600 to-cyan-500 grid place-items-center shadow-lg shadow-blue-500/20">
                <Shield className="h-4 w-4 text-white"/>
              </div>
              <span className="font-bold tracking-tight text-white">
                {PROFILE.name}
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              {[
                ["About", "about"],
                ["Skills", "skills"],
                ["Experience", "experience"],
                ["Projects", "projects"],
                ["Profile", "profile"],
                ["Contact", "contact"],
              ].map(([label, id]) => (
                  <Button
                      key={id}
                      variant="ghost"
                      className="text-sm font-medium text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-all"
                      onClick={() => scrollToId(id)}
                  >
                    {label}
                  </Button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button onClick={() => scrollToId("contact")} className="bg-blue-600 hover:bg-blue-500 text-white border-0">
                <Mail className="mr-2 h-4 w-4"/> Get in touch
              </Button>
            </div>
          </Container>
        </header>

        {/* Hero */}
        <section className="relative overflow-hidden pt-20 pb-32">
          <Container>
            <div className="grid items-center gap-16 md:grid-cols-2">
              <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.6}}>
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-4 py-1.5 text-xs font-medium text-cyan-400 mb-8 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75 animate-ping"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                  Currently: IAM Engineer @ Hochschule Fulda
                </div>

                <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white mb-6">
                  {PROFILE.name}
                </h1>
                <p className="text-xl text-cyan-400 font-medium mb-6">{PROFILE.role}</p>
                <p className="text-lg text-slate-400 leading-relaxed max-w-lg mb-8">
                  {PROFILE.summary}
                </p>

                <div className="flex flex-wrap gap-4">
                  <a href={PROFILE.links.github} target="_blank" rel="noreferrer">
                    <Button variant="outline" className="h-12 px-8 text-base border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all">
                      <Github className="mr-2 h-5 w-5"/> GitHub
                    </Button>
                  </a>
                  <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                    <Button className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-500 text-white border-0 shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-105">
                      <Linkedin className="mr-2 h-5 w-5"/> LinkedIn
                    </Button>
                  </a>
                </div>
                <div className="mt-8 text-sm text-slate-500">
                  <span className="mr-3">{PROFILE.location}</span>•
                  <span className="ml-3 font-mono">{PROFILE.email}</span>
                </div>
              </motion.div>

              <motion.div className="relative flex flex-col items-center gap-8" initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} transition={{duration: 0.6, delay: 0.1}}>
                <div className="relative h-48 w-48 rounded-full border-[3px] border-white/10 p-1 shadow-2xl bg-black">
                  <div className="h-full w-full rounded-full overflow-hidden relative">
                    <img
                        src={PROFILE.avatarUrl}
                        alt={PROFILE.name}
                        className="h-full w-full object-cover"
                        onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='grid'; }}
                    />
                    <div className="hidden h-full w-full bg-[#0f172a] place-items-center">
                      <UserCheck className="h-16 w-16 text-slate-500" />
                    </div>
                  </div>
                </div>

                <Card className="relative w-full overflow-hidden border-white/10 bg-[#0f172a]/80 backdrop-blur-xl shadow-2xl">
                  <CardHeader className="border-b border-white/5 pb-3">
                    <CardTitle className="text-sm font-mono text-cyan-500 uppercase tracking-wider">System Capabilities</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {heroIcons.map(({Icon, label}, idx) => (
                          <motion.div
                              key={label}
                              className="group rounded-xl border border-white/5 bg-white/5 p-4 flex flex-col items-center hover:border-cyan-500/30 hover:bg-cyan-950/30 transition-all duration-300"
                              initial={{opacity: 0, y: 8}}
                              whileInView={{opacity: 1, y: 0}}
                              viewport={{once: true}}
                              transition={{delay: idx * 0.05}}
                          >
                            <Icon className="h-6 w-6 mb-2 text-slate-400 group-hover:text-cyan-400 transition-colors"/>
                            <div className="text-sm font-medium text-slate-300 group-hover:text-white">{label}</div>
                          </motion.div>
                      ))}
                    </div>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {k: "Focus", v: "IAM, Cloud, AI"},
                        {k: "Strength", v: "Policy-as-Code"},
                        {k: "Status", v: "Employed"},
                      ].map((item) => (
                          <div
                              key={item.k}
                              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm"
                          >
                            <div className="font-medium text-slate-500">{item.k}</div>
                            <div className="text-cyan-300">{item.v}</div>
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
        <Section id="about" title="Philosophy" subtitle="Quick snapshot of who I am and how I work.">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="bg-[#0f172a]/50 border-white/5 hover:border-cyan-500/30 transition-all">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-blue-900/20 grid place-items-center mb-3 border border-blue-500/20">
                  <Shield className="h-5 w-5 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Principles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-400">
                <p>Security-by-default • Infrastructure-as-Code • Everything tests.</p>
                <p>Automate the boring parts. Measure, iterate, improve.</p>
              </CardContent>
            </Card>
            <Card className="bg-[#0f172a]/50 border-white/5 hover:border-cyan-500/30 transition-all">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-blue-900/20 grid place-items-center mb-3 border border-blue-500/20">
                  <TerminalSquare className="h-5 w-5 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-400">
                <ul className="list-disc pl-5 space-y-2 marker:text-cyan-500">
                  <li>Engineered secure, scalable software solutions by integrating Policy-as-Code into the SSDLC.</li>
                  <li>Enhanced container security through automated compliance checks.</li>
                  <li>Combined development and security expertise.</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-[#0f172a]/50 border-white/5 hover:border-cyan-500/30 transition-all">
              <CardHeader>
                <div className="h-10 w-10 rounded-lg bg-blue-900/20 grid place-items-center mb-3 border border-blue-500/20">
                  <Code className="h-5 w-5 text-cyan-400" />
                </div>
                <CardTitle className="text-white">Stack</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {[
                  "Python", "Java", "Go", "React", "FastAPI", "OPA/Rego", "AWS", "Kubernetes", "GitLab CI",
                ].map((t) => (
                    <Badge key={t} className="px-2 py-1 text-xs bg-blue-950/50 text-cyan-300 border-blue-800/50 hover:bg-cyan-950/50">
                      {t}
                    </Badge>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Skills */}
        <Section id="skills" title="Skills" subtitle="A visual snapshot of my current strengths.">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-[#0f172a]/50 border-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-200">Core Competencies</CardTitle>
              </CardHeader>
              <CardContent className="h-[340px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={SKILLS_RADAR} cx="50%" cy="50%" outerRadius="75%">
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <PolarRadiusAxis tick={false} axisLine={false} />
                    <Radar
                        dataKey="A"
                        stroke="#06b6d4"
                        strokeWidth={2}
                        fill="#06b6d4"
                        fillOpacity={0.2}
                    />
                    <Tooltip
                        contentStyle={{borderRadius: 8, border: '1px solid #1e293b', background: '#020617', color: '#fff'}}
                        itemStyle={{ color: '#22d3ee' }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-[#0f172a]/50 border-white/5 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-slate-200">Keywords & Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Python", "Java", "JavaScript", "Vulnerability Scanning", "Data Analysis", "Secure Programming",
                    "Cloud Computing", "Web Development", "DevOps", "DevSecOps", "AI", "Machine Learning", "Git", "Linux",
                  ].map((t) => (
                      <Badge key={t} className="px-2 py-1 text-xs bg-white/5 border-white/10 text-slate-300 hover:bg-white/10">
                        {t}
                      </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Experience */}
        <Section id="experience" title="Experience" subtitle="Roles, responsibilities, and impact.">
          <div className="relative border-l border-white/10 ml-3 space-y-12 pb-4">
            {EXPERIENCE.map((exp, i) => (
                <motion.div key={i} className="relative pl-8 md:pl-12" initial={{opacity: 0, x: -10}} whileInView={{opacity: 1, x: 0}} viewport={{once: true}}>
                  {/* Timeline dot */}
                  <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>

                  <Card className="bg-[#0f172a]/40 border-white/5 hover:border-cyan-500/30 transition-all">
                    <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <CardTitle className="text-xl text-white">
                          {exp.role}
                        </CardTitle>
                        <div className="text-lg text-cyan-400 font-medium">{exp.company}</div>
                      </div>
                      <div className="font-mono text-sm text-slate-400 bg-white/5 border border-white/5 px-2 py-1 rounded">
                        {exp.period}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-sm text-slate-400 marker:text-cyan-500">
                        {exp.bullets.map((b, idx) => (
                            <li key={idx}>{b}</li>
                        ))}
                      </ul>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {exp.tags.map((t) => (
                            <span key={t} className="text-xs text-slate-500 font-mono border border-white/5 px-2 py-1 rounded bg-[#000000]/40">
                                {t}
                             </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section id="projects" title="Featured Projects" subtitle="Some of my featured projects. More on my Github!">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
                <Card key={p.title} className="group flex flex-col overflow-hidden border-white/5 bg-[#0f172a]/40 backdrop-blur-sm transition-all hover:border-cyan-500/40 hover:bg-[#0f172a]/60 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors">{p.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-sm text-slate-400 mb-6">
                      {p.description}
                    </p>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                            <span key={t} className="text-[10px] font-mono border border-cyan-900/30 bg-cyan-950/20 text-cyan-200/70 px-1.5 py-0.5 rounded">
                                {t}
                            </span>
                        ))}
                      </div>
                      <a href={p.link} target="_blank" rel="noreferrer" className="block">
                        <Button variant="outline" className="w-full text-xs h-9 border-white/10 bg-transparent text-slate-300 hover:text-white hover:border-cyan-500/50 hover:bg-cyan-950/30">
                          Visit <ExternalLink className="ml-2 h-3 w-3"/>
                        </Button>
                      </a>
                    </div>
                  </CardContent>
                </Card>
            ))}
          </div>
        </Section>

        {/* Profile at a glance */}
        <Section id="profile" title="Profile at a glance" subtitle="Education, publications, skills, and languages.">
          <div className="space-y-6">
            {/* Education */}
            <Card className="bg-[#0f172a]/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight text-white">Education</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4 text-slate-400">
                {EDUCATION.map((e, i) => (
                    <div key={i} className={i !== 0 ? "pt-4 mt-4 border-t border-white/5" : ""}>
                      <div className="font-semibold text-base text-slate-200">{e.degree}</div>
                      <div className="text-slate-400">{e.detail}</div>
                      <div className="text-slate-400">{e.thesis}</div>
                      <div className="italic text-slate-500">{e.period}</div>
                      <div className="text-xs uppercase tracking-wide text-cyan-500 mt-1">
                        {e.school} — {e.location}
                      </div>
                    </div>
                ))}
              </CardContent>
            </Card>

            {/* Scientific Papers */}
            <Card className="bg-[#0f172a]/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight text-white">Scientific Papers</CardTitle>
              </CardHeader>
              <CardContent className="text-sm space-y-4 text-slate-400">
                {PAPERS.map((p, i) => (
                    <div key={i} className={i !== 0 ? "pt-4 mt-4 border-t border-white/5" : ""}>
                      <div className="font-semibold text-base text-slate-200">{p.title}</div>
                      <div className="italic text-slate-500">{p.period}</div>
                      <div className="text-xs uppercase tracking-wide text-cyan-500 mt-1">
                        {p.org} — {p.location}
                      </div>
                    </div>
                ))}
              </CardContent>
            </Card>

            {/* Technical Skills Typewriter Section */}
            <Card className="bg-[#0f172a]/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight text-white">
                  Technical Skills
                </CardTitle>
              </CardHeader>

              <CardContent className="relative">
                {(() => {
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

                  // Typewriter State
                  const [idx, setIdx] = React.useState(0);
                  const [phase, setPhase] = React.useState("typing");
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

                  return (
                      <div className="bg-white/5 rounded-2xl p-4 md:p-6 border border-white/5">
                        <div className="mb-6">
                          <div className="text-sm uppercase tracking-wider text-slate-500 mb-2">
                            I have experience with ...
                          </div>
                          <div className="font-mono text-lg md:text-xl border border-cyan-500/30 rounded-xl px-3 py-2 bg-[#020617] flex items-center shadow-[0_0_15px_rgba(6,182,212,0.1)]">
                            <span className="text-cyan-500 mr-2">{">"}</span>
                            <span className="text-cyan-100">{shown}</span>
                            <span className={`ml-1 w-2 text-cyan-500 ${cursor ? "opacity-100" : "opacity-0"}`}>|</span>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {GROUPS.map((g, gi) => (
                              <div key={gi}>
                                <div className="mb-2 text-sm font-semibold tracking-wide text-white">
                                  {g.k}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                  {splitSkills(g.v).map((tag, ti) => {
                                    const isActive = tag === current;
                                    return (
                                        <span
                                            key={ti}
                                            className={[
                                              "inline-flex select-none items-center rounded-md border px-2.5 py-1 text-xs transition-all",
                                              isActive
                                                  ? "bg-cyan-500/20 border-cyan-500/50 text-cyan-300 scale-105 shadow-[0_0_10px_rgba(6,182,212,0.3)]"
                                                  : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white",
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
            <Card className="bg-[#0f172a]/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight text-white">Soft Skills</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <div className="space-y-6">
                  <div>
                    <div className="mb-2 font-medium text-slate-300">Core</div>
                    <div className="flex flex-wrap gap-2">
                      {["Self-driven initiative", "Team communication", "Multilingual proficiency", "Adaptability (agile)"].map(t => (
                          <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 bg-white/5 text-slate-300">
                                   {t}
                               </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 font-medium text-slate-300">Hobbies</div>
                    <div className="flex flex-wrap gap-2">
                      {["Learning new tech", "Board & video games", "Music production", "Travelling"].map(t => (
                          <span key={t} className="inline-flex items-center gap-1 rounded-full border border-white/10 px-3 py-1.5 bg-white/5 text-slate-300">
                                   {t}
                               </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="bg-[#0f172a]/50 border-white/5">
              <CardHeader>
                <CardTitle className="text-lg font-bold tracking-tight text-white">Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {[
                    { name: "German (DSH-2 / C1)", level: 90, flag: "🇩🇪", label: "Fluent" },
                    { name: "English (IELTS 8.0)", level: 100, flag: "🇬🇧", label: "Near-native" },
                    { name: "Marathi", level: 100, flag: "🇮🇳", label: "Native" },
                    { name: "Hindi", level: 100, flag: "🇮🇳", label: "Native" },
                  ].map((l, i) => (
                      <div key={i} className="flex items-center gap-4 rounded-xl border border-white/5 p-4 bg-white/5 hover:border-cyan-500/30 transition">
                        <span className="text-2xl">{l.flag}</span>
                        <div>
                          <div className="font-medium text-slate-200">{l.name}</div>
                          <div className="text-xs text-slate-500">{l.label}</div>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>

        {/* Initialize Handshake Section */}
        <Section id="contact" title="Initialize Handshake" subtitle="Let's discuss how I can contribute to your identity and security posture.">
          <Card className="bg-gradient-to-br from-[#0f172a] to-blue-950/20 border-white/10 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>

            <CardContent className="pt-8">
              <div className="grid gap-12 md:grid-cols-2 items-center">
                {/* Left Side: Text & Links */}
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">Let's connect</h3>
                  <p className="text-slate-400 mb-6">
                    Reach out if you want to chat about <span className="text-cyan-400 font-mono">DevOps</span>, <span className="text-cyan-400 font-mono">Security</span>, or <span className="text-cyan-400 font-mono">IAM</span>.
                  </p>

                  <div className="flex flex-col gap-4">
                    <a className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all group" href={`mailto:${PROFILE.email}`}>
                      <div className="h-12 w-12 rounded-full bg-blue-500/10 grid place-items-center text-blue-400 group-hover:text-white group-hover:bg-blue-500 transition-colors">
                        <Mail className="h-5 w-5"/>
                      </div>
                      <div>
                        <div className="font-medium text-white">Email</div>
                        <div className="text-sm text-slate-400 font-mono group-hover:text-cyan-300">{PROFILE.email}</div>
                      </div>
                    </a>

                    <a className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-cyan-500/30 transition-all group" href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                      <div className="h-12 w-12 rounded-full bg-blue-600/10 grid place-items-center text-blue-600 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                        <Linkedin className="h-5 w-5"/>
                      </div>
                      <div>
                        <div className="font-medium text-white">LinkedIn</div>
                        <div className="text-sm text-slate-400 font-mono group-hover:text-cyan-300">Connect on LinkedIn</div>
                      </div>
                    </a>
                  </div>
                </div>

                {/* Right Side: Terminal Visual */}
                <div className="relative h-full min-h-[250px] rounded-xl bg-[#020617] border border-slate-800 p-6 font-mono text-sm text-cyan-400 overflow-hidden flex flex-col shadow-2xl">
                  <div className="absolute top-0 left-0 right-0 h-10 bg-[#0f172a] flex items-center px-4 gap-2 border-b border-slate-800">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <div className="ml-4 text-xs text-slate-500">vedant@fulda:~</div>
                  </div>

                  <div className="mt-8 space-y-2 font-medium">
                    <p><span className="text-blue-500">➜</span> <span className="text-purple-400">~</span> <span className="text-slate-400">./initiate_handshake.sh</span></p>
                    <p className="text-yellow-400">Target: <span className="text-white">Inquirer</span></p>
                    <p className="text-yellow-400">Establishing secure connection...</p>
                    <p><span className="text-green-500">✓</span> Connection established.</p>
                    <p className="mt-4">User: <span className="text-white">{PROFILE.name}</span></p>
                    <p>Role: <span className="text-cyan-300">IAM Engineer</span></p>
                    <p>Status: <span className="text-green-400">OPEN_TO_CHAT</span></p>
                    <p className="animate-pulse mt-2"><span className="text-blue-500">➜</span> <span className="text-purple-400">~</span> <span className="w-2 h-4 bg-cyan-400 inline-block align-middle"></span></p>
                  </div>
                </div>
              </div>
              <div className="mt-8 text-xs text-slate-500 text-center border-t border-white/5 pt-4">Prefer email first contact. Full CV available on request.</div>
            </CardContent>
          </Card>
        </Section>

        {/* Footer */}
        <footer className="border-t border-white/5 py-8 bg-[#020617]">
          <Container>
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-slate-500">
              <div>
                © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
              </div>
              <div className="flex items-center gap-3">
                <a
                    href={PROFILE.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Github className="h-4 w-4"/>
                  GitHub
                </a>
                <a
                    href={PROFILE.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 hover:text-white transition-colors"
                >
                  <Linkedin className="h-4 w-4"/>
                  LinkedIn
                </a>
                <a href="#projects" className="inline-flex items-center gap-1 hover:text-white transition-colors">
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
          body { background: white !important; color: black !important; }
        }
      `}</style>
      </div>
  );
}