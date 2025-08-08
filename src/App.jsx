import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, Download, Moon, Sun, ExternalLink, ArrowRight, Code, Shield, Cloud, TerminalSquare } from "lucide-react";
import { Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts";
import { Button } from "./components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/Card";
import { Badge } from "./components/ui/Badge";

const Container = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-7xl px-4 md:px-6 ${className}`}>{children}</div>
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="scroll-mt-24 py-10 md:py-16">
    <Container>
      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && <p className="mt-2 text-muted-foreground max-w-2xl">{subtitle}</p>}
        <div className="mt-6">{children}</div>
      </motion.div>
    </Container>
  </section>
);

const PROFILE = {
  name: "Vedant Vinayak Bodhe",
  role: "Security Engineer • DevSecOps • Software Engineer",
  summary: "Security-minded engineer focusing on Policy-as-Code, SSDLC, and cloud-native automation. I build reliable pipelines, harden containers, and turn compliance into code.",
  location: "Fulda, Germany",
  email: "vedant@example.com",
  phone: "+49 000 0000000",
  links: {
    github: "https://github.com/your-handle",
    linkedin: "https://www.linkedin.com/in/vedant-bodhe/",
    portfolio: "#projects",
  },
};

const SKILLS_RADAR = [
  { subject: "Python", A: 86 },
  { subject: "Java", A: 78 },
  { subject: "Rego/OPA", A: 84 },
  { subject: "AWS", A: 72 },
  { subject: "Kubernetes", A: 76 },
  { subject: "CI/CD", A: 88 },
];

const EXPERIENCE = [
  {
    role: "Security & Quality Engineering – Praktikum",
    company: "DB InfraGO",
    period: "Apr 2025 – Sep 2025",
    bullets: [
      "Built Policy-as-Code engine for SSDLC checks (OPA/Rego).",
      "Automated SCA/secret scans in GitLab CI; integrated DefectDojo.",
      "Hardened containers aligned to CIS Docker Benchmarks (Trivy/Grype).",
    ],
    tags: ["OPA/Rego", "GitLab CI", "Trivy", "Grype", "Python"],
  },
  {
    role: "Werkstudent IT – SAP S/4HANA Migration",
    company: "Deutsche Bahn InfraGO",
    period: "Mar 2024 – Mar 2025",
    bullets: [
      "Supported data migration and integrity checks using Python/R.",
      "Helped with access roles and data access management.",
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
    title: "Policy-as-Code Playground",
    description: "Evaluate Rego policies live, with GitLab/GitHub inputs and result diffs.",
    link: "https://example.com/pac-playground",
    tags: ["Go", "OPA", "React", "Vite"],
  },
  {
    title: "Container Compliance Scanner",
    description: "Docker image scanner with SBOM, Trivy/Grype, and dashboard UI.",
    link: "https://example.com/compliance-scanner",
    tags: ["Python", "FastAPI", "React"],
  },
  {
    title: "Damage Reporter AI",
    description: "FastAPI + Vision AI prototype to triage and email incident reports.",
    link: "https://example.com/damage-reporter",
    tags: ["FastAPI", "OpenAI", "Email"],
  },
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
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-2xl bg-primary/15 grid place-items-center">
              <Shield className="h-5 w-5" />
            </div>
            <span className="font-semibold">{PROFILE.name.split(" ")[0]}</span>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {[
              ["About", "about"],
              ["Skills", "skills"],
              ["Experience", "experience"],
              ["Projects", "projects"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <Button key={id} variant="ghost" className="px-3" onClick={() => scrollToId(id)}>
                {label}
              </Button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => setDark((d) => !d)} aria-label="Toggle theme">
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button onClick={() => window.print()}>
              <Download className="mr-2 h-4 w-4" /> Export PDF
            </Button>
          </div>
        </Container>
      </header>

      <section className="relative overflow-hidden border-b">
        <Container>
          <div className="grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-500" /> Open to work from Nov 2025
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
                  <Button variant="outline"><Github className="mr-2 h-4 w-4"/>GitHub</Button>
                </a>
                <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                  <Button variant="outline"><Linkedin className="mr-2 h-4 w-4"/>LinkedIn</Button>
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

            <motion.div className="relative" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">What I do</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {heroIcons.map(({ Icon, label }, idx) => (
                      <motion.div key={label} className="rounded-2xl border p-4 grid place-items-center text-center" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
                        <Icon className="h-6 w-6 mb-2" />
                        <div className="text-sm font-medium">{label}</div>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {[
                      { k: "Experience", v: "DevSecOps, AppSec, Cloud" },
                      { k: "Strength", v: "Policy-as-Code & CI/CD" },
                      { k: "Currently", v: "Open from Nov ’25" },
                    ].map((item) => (
                      <div key={item.k} className="rounded-xl border px-3 py-2 text-sm">
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
                <li>Designed a Policy-as-Code engine for SSDLC in GitLab.</li>
                <li>Hardened Docker images with CIS-aligned checks.</li>
                <li>Built dashboards for SBOM and vuln triage.</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Stack</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {["Python", "Java", "Go", "React", "FastAPI", "OPA/Rego", "AWS", "Kubernetes", "GitLab CI"].map((t) => (
                <Badge key={t} variant="secondary" className="px-2 py-1 text-xs">{t}</Badge>
              ))}
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="skills" title="Skills" subtitle="A visual snapshot of my current strengths.">
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Core Competencies</CardTitle>
            </CardHeader>
            <CardContent className="h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={SKILLS_RADAR} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={6} />
                  <Radar dataKey="A" stroke="currentColor" fill="currentColor" fillOpacity={0.2} />
                  <Tooltip contentStyle={{ borderRadius: 12 }} />
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
                {["Policy-as-Code", "SSDLC", "SBOM", "Trivy", "Grype", "Syft", "DefectDojo", "Terraform", "Helm", "Prometheus", "Grafana", "Git", "Linux"].map((t) => (
                  <Badge key={t} className="px-2 py-1 text-xs">{t}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      <Section id="experience" title="Experience" subtitle="Roles, responsibilities, and impact.">
        <div className="space-y-6">
          {EXPERIENCE.map((exp, i) => (
            <motion.div key={exp.company + i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Card>
                <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">{exp.role} · {exp.company}</CardTitle>
                    <p className="text-sm text-muted-foreground">{exp.period}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
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

      <Section id="projects" title="Projects" subtitle="Selected things I built or contributed to.">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Card key={p.title} className="group overflow-hidden transition hover:shadow-lg hover:-translate-y-0.5">
              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground min-h-[54px]">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
                <a href={p.link} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center text-sm">
                  Visit <ExternalLink className="ml-1 h-4 w-4"/>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <Section id="contact" title="Get in touch" subtitle="Happy to connect about security engineering, DevSecOps, or interesting software.">
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-3">
              <a className="rounded-2xl border p-4 hover:bg-muted" href={`mailto:${PROFILE.email}`}>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5"/>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">{PROFILE.email}</div>
                  </div>
                </div>
              </a>
              <a className="rounded-2xl border p-4 hover:bg-muted" href={PROFILE.links.linkedin} target="_blank" rel="noreferrer">
                <div className="flex items-center gap-3">
                  <Linkedin className="h-5 w-5"/>
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm text-muted-foreground">/vedant-bodhe</div>
                  </div>
                </div>
              </a>
              <div className="rounded-2xl border p-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5"/>
                  <div>
                    <div className="font-medium">Phone</div>
                    <div className="text-sm text-muted-foreground">{PROFILE.phone}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-xs text-muted-foreground">Prefer email first contact. Full CV available on request.</div>
          </CardContent>
        </Card>
      </Section>

      <footer className="border-t py-8">
        <Container>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
            <div>© {new Date().getFullYear()} {PROFILE.name}. All rights reserved.</div>
            <div className="flex items-center gap-3">
              <a href={PROFILE.links.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1"><Github className="h-4 w-4"/>GitHub</a>
              <a href={PROFILE.links.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1"><Linkedin className="h-4 w-4"/>LinkedIn</a>
              <a href="#projects" className="inline-flex items-center gap-1">Projects</a>
            </div>
          </div>
        </Container>
      </footer>

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
