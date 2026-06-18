"use client";

import { useState, useEffect } from "react";
import CaseStudyExplorer from "./components/CaseStudyExplorer";
import BpmnViewer from "./components/BpmnViewer";
import DeliverablesViewer from "./components/DeliverablesViewer";
import InteractiveSqlSandbox from "./components/InteractiveSqlSandbox";
import DashboardSimulator from "./components/DashboardSimulator";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import ContactForm from "./components/ContactForm";

const navItems = [
  { id: "summary", label: "Professional Summary" },
  { id: "competencies", label: "Core Competencies" },
  { id: "experience", label: "Work Experience" },
  // { id: "case-studies", label: "Case Studies" },
  { id: "bpmn-analysis", label: "Process Flow (BPMN)" },
  // { id: "deliverables", label: "Sample Deliverables" },
  { id: "data-showcase", label: "Data & BI Showcase" },
  { id: "certifications", label: "Certifications" },
  // { id: "testimonials", label: "Testimonials" },
  { id: "contact", label: "Contact Inquiries" }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("summary");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load theme from localStorage or system preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  // Sync theme class to documentElement
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Highlight active section on scroll using IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -55% 0px", // triggers when section occupies the active scroll window
      threshold: 0
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div className="min-h-screen grid-bg relative flex flex-col xl:flex-row bg-background text-foreground transition-colors duration-300">

      {/* Sticky Left Sidebar Navigation (Desktop) */}
      <aside className="xl:w-80 w-full xl:h-screen xl:sticky xl:top-0 bg-sidebar-bg/90 xl:border-r border-b xl:border-b-0 border-sidebar-border p-6 flex flex-col justify-between shrink-0 z-50 backdrop-blur-md transition-all duration-300">
        <div className="space-y-8">
          {/* Logo / Profile Brief */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white text-lg shadow-lg shadow-indigo-500/20">
                  I
                </div>
                <div>
                  <h1 className="text-base font-bold text-foreground tracking-tight">Indhu S</h1>
                  <p className="text-[10px] text-accent-primary font-bold uppercase tracking-widest">Aspiring Business Analyst</p>
                </div>
              </div>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl bg-bg-hover text-text-muted hover:text-foreground transition-colors border border-sidebar-border cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? (
                  // Lucide Sun Icon
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="M4.93 4.93l1.41 1.41" />
                    <path d="M17.66 17.66l1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="M6.34 17.66l-1.41 1.41" />
                    <path d="M19.07 4.93l-1.41 1.41" />
                  </svg>
                ) : (
                  // Lucide Moon Icon
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </button>
            </div>

            <p className="text-[11px] text-text-muted leading-relaxed">
              Aspiring Data Engineer with expertise in SQL, ETL pipeline development, data modeling, and Power BI dashboards, focused on transforming raw data into reliable, scalable, and actionable insights.
            </p>
          </div>

          {/* Navigation Items */}
          <nav className="hidden xl:flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setActiveSection(item.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 ${activeSection === item.id
                  ? "bg-indigo-600/10 text-accent-primary border-l-2 border-accent-primary"
                  : "text-text-muted hover:text-foreground hover:bg-bg-hover"
                  }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${activeSection === item.id ? "bg-accent-primary" : "bg-slate-400 dark:bg-slate-600"}`} />
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="hidden xl:flex flex-col gap-4 border-t border-sidebar-border pt-6">
          <div className="flex gap-3">
            <a
              href="https://linkedin.com/in/indhu16"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted hover:text-accent-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="mailto:indhusekar1609@gmail.com"
              className="text-text-muted hover:text-accent-primary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" />
              </svg>
            </a>
          </div>
          <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">
            © 2026 Indhu S Portfolio
          </div>
        </div>
      </aside>

      {/* Main Scrollable Canvas */}
      <main className="flex-grow p-6 md:p-12 xl:p-16 max-w-[1400px] 2xl:max-w-[1800px] 3xl:max-w-[2200px] w-full mx-auto space-y-24 overflow-y-auto pb-32 xl:pb-16">

        {/* SECTION 1: HERO & SUMMARY */}
        <section id="summary" className="space-y-8 pt-4">
          <div className="space-y-4">
            <div className="inline-block bg-indigo-500/10 text-accent-primary text-xs font-bold px-3 py-1.5 rounded-full border border-indigo-500/20 uppercase tracking-widest">
              Open to Explore Opportunities
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-foreground tracking-tight leading-tight max-w-4xl">
              Driving efficiency through <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-indigo-400 dark:to-indigo-200">strategic analysis</span> and structured data.
            </h2>
          </div>

          {/* Professional Summary */}
          <div className="border-l-4 border-indigo-600 pl-6 max-w-3xl space-y-2">
            <p className="text-base md:text-lg text-foreground font-medium leading-relaxed italic">
              Detail-oriented Computer Applications graduate (BCA) and aspiring Data Engineer with hands-on experience in document verification, financial transaction auditing, and US healthcare prior authorization. Strong foundation in SQL querying, ETL processes, data modeling, and Power BI dashboard development, with a focus on building scalable data pipelines and ensuring data quality, integrity, and compliance. Eager to leverage analytical and problem-solving skills to contribute to efficient and data-driven engineering solutions.
            </p>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 max-w-5xl">
            <div className="bg-card-bg border border-card-border p-5 rounded-2xl hover:border-indigo-500/20 transition-all shadow-xs">
              <div className="text-3xl font-black text-accent-primary">1.0+ Yrs</div>
              <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1.5">Combined Experience</div>
            </div>
            <div className="bg-card-bg border border-card-border p-5 rounded-2xl hover:border-indigo-500/20 transition-all shadow-xs">
              <div className="text-3xl font-black text-accent-primary">99.8%</div>
              <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1.5">Document Accuracy</div>
            </div>
            <div className="bg-card-bg border border-card-border p-5 rounded-2xl hover:border-indigo-500/20 transition-all shadow-xs">
              <div className="text-3xl font-black text-accent-primary">100%</div>
              <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1.5">HIPAA Compliance</div>
            </div>
            <div className="bg-card-bg border border-card-border p-5 rounded-2xl hover:border-indigo-500/20 transition-all shadow-xs">
              <div className="text-3xl font-black text-accent-primary">5,000+</div>
              <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1.5">Audits Completed</div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CORE COMPETENCIES */}
        <section id="competencies" className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Skill Set</span>
            <h3 className="text-2xl font-bold text-foreground">Core Competencies</h3>
            <p className="text-xs text-text-muted">The tooling, methodologies, and framework capabilities I apply to deliver business value.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl">
            {/* Box 1 */}
            <div className="bg-card-bg border border-card-border p-6 rounded-2xl hover:border-indigo-500/20 transition-all glow-indigo">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-accent-primary mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-foreground mb-2">Requirements & Documentation</h4>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                Skilled in capturing business needs, mapping operational flows (AS-IS/TO-BE), and producing BRD/FRD functional documents.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Requirements Gathering", "AS-IS / TO-BE", "Functional Specs", "BRD / FRD", "BPMN 2.0 Flow", "Jira User Stories"].map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold bg-bg-hover text-text-muted px-2 py-0.5 rounded border border-card-border">{tag}</span>
                ))}
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-card-bg border border-card-border p-6 rounded-2xl hover:border-indigo-500/20 transition-all glow-indigo">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-accent-primary mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-foreground mb-2">Data & Power BI Analytics</h4>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                Writing SQL database queries to inspect transaction feeds, building Power BI KPI screens, and validating Excel spreadsheets.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["SQL Querying", "Power BI", "MS Excel Tools", "Data Dashboards", "Relational Databases", "Data Verification"].map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold bg-bg-hover text-text-muted px-2 py-0.5 rounded border border-card-border">{tag}</span>
                ))}
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-card-bg border border-card-border p-6 rounded-2xl hover:border-indigo-500/20 transition-all glow-indigo">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-accent-primary mb-4">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="text-sm font-bold text-foreground mb-2">Quality & Process Compliance</h4>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                Leveraging QA document audit, HIPAA standard requirements, and database transaction tracking to enforce high-quality business records.
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["Document Audit", "Process Quality", "HIPAA Standards", "Claim Verification", "BCA IT Foundation", "Scrum Basics"].map((tag) => (
                  <span key={tag} className="text-[10px] font-semibold bg-bg-hover text-text-muted px-2 py-0.5 rounded border border-card-border">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: WORK EXPERIENCE */}
        <section id="experience" className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Chronology</span>
            <h3 className="text-2xl font-bold text-foreground">Work Experience</h3>
            <p className="text-xs text-text-muted">Chronological summary of my roles delivering solutions across domains.</p>
          </div>

          <div className="relative border-l border-card-border pl-6 space-y-10 max-w-4xl">
            {/* Experience Item 1 */}
            <div className="relative space-y-2">
              <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-indigo-600 border-2 border-background flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
              </span>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h4 className="text-base font-bold text-foreground">Quality Analyst – Document Record Management</h4>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">HTC Global Services | Full-time</p>
                </div>
                <span className="text-xs text-accent-primary font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  April 2025 – November 2025
                </span>
              </div>
              <div className="text-xs text-foreground leading-relaxed space-y-2 mt-2">
                <p>
                  <strong>Role Objective:</strong> Manage high-volume business and operational documents, conducting rigorous validation and quality audits prior to client delivery.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-text-muted">
                  <li>Verified production documents for accuracy, completeness, and full compliance with client specifications.</li>
                  <li>Performed comprehensive quality assurance checks on business and operational documents before final delivery.</li>
                  <li>Managed high-volume document validation workloads, consistently ensuring timely submission to clients.</li>
                  <li>Maintained strict document quality standards, reducing production error rates through detailed verification processes.</li>
                </ul>
              </div>
            </div>

            {/* Experience Item 2 */}
            <div className="relative space-y-2">
              <span className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-200 dark:bg-slate-800 border-2 border-background flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
              </span>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h4 className="text-base font-bold text-foreground">Financial Transaction Analyst Intern</h4>
                  <p className="text-xs text-text-muted font-bold uppercase tracking-wider">S10 Healthcare Solutions Pvt. Ltd | Internship</p>
                </div>
                <span className="text-xs text-text-muted font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-bg-hover border border-card-border">
                  July 2024 – December 2024
                </span>
              </div>
              <div className="text-xs text-foreground leading-relaxed space-y-2 mt-2">
                <p>
                  <strong>Role Objective:</strong> Audit US healthcare patient accounts and verify insurance eligibility to minimize claims denial rates.
                </p>
                <ul className="list-disc pl-4 space-y-1 text-text-muted">
                  <li>Reviewed and authorized patient demographic and insurance information for US healthcare clients, ensuring 100% compliance with HIPAA guidelines.</li>
                  <li>Processed prior authorizations and verified insurance eligibility, improving transactional accuracy and reducing claim rejections.</li>
                  <li>Maintained and updated patient records/documentation, ensuring timely retrieval for internal/external audits and operational reporting.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: CASE STUDIES */}
        {/* <section id="case-studies" className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Deep Dives</span>
            <h3 className="text-2xl font-bold text-foreground">Case Studies</h3>
            <p className="text-xs text-text-muted">Comprehensive walk-through of the end-to-end BA lifecycle for major corporate projects.</p>
          </div>
          <CaseStudyExplorer />
        </section> */}

        {/* SECTION 5: BPMN PROCESS MAPPING */}
        <section id="bpmn-analysis" className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Modeling</span>
            <h3 className="text-2xl font-bold text-foreground">Process Flow Gap Analysis</h3>
            <p className="text-xs text-text-muted">Interactive workflow diagram showcasing operational re-engineering of clinical intake pipelines.</p>
          </div>
          <BpmnViewer />
        </section>

        {/* SECTION 6: SAMPLE DELIVERABLES */}
        {/* <section id="deliverables" className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Artifacts</span>
            <h3 className="text-2xl font-bold text-foreground">Sample Deliverables Showcase</h3>
            <p className="text-xs text-text-muted">High-fidelity mocks of functional requirements, scrum backlogs, and portal wireframes.</p>
          </div>
          <DeliverablesViewer />
        </section> */}

        {/* SECTION 7: DATA & BI SHOWCASE */}
        <section id="data-showcase" className="space-y-10">
          <div className="space-y-1.5">
            <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Data Analysis</span>
            <h3 className="text-2xl font-bold text-foreground">SQL Playground & BI Dashboard</h3>
            <p className="text-xs text-text-muted">Demonstrating data elicitation, database querying, and dashboard design skills.</p>
          </div>

          <div className="space-y-8">
            <InteractiveSqlSandbox />
            <DashboardSimulator />
          </div>
        </section>

        {/* SECTION 8: CERTIFICATIONS & EDUCATION */}
        <section id="certifications" className="space-y-6">
          <div className="space-y-1.5">
            <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Credentials</span>
            <h3 className="text-2xl font-bold text-foreground">Certifications & Education</h3>
            <p className="text-xs text-text-muted">Professional credentials confirming expertise in BA methodologies and data analytics.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
            {/* Education 1 */}
            <div className="flex gap-4 items-center bg-card-bg border border-card-border p-4 rounded-xl hover:border-indigo-500/20 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-accent-primary font-black text-sm shrink-0">
                BCA
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Bachelor of Computer Application (BCA)</h4>
                <p className="text-[10px] text-text-muted font-semibold mt-0.5">AM Jain College | 2021 - 2024 | CGPA: 7.79</p>
              </div>
            </div>

            {/* Education 2 */}
            <div className="flex gap-4 items-center bg-card-bg border border-card-border p-4 rounded-xl hover:border-indigo-500/20 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-accent-primary font-black text-xs shrink-0">
                HSE
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Higher Secondary Education (HSE)</h4>
                <p className="text-[10px] text-text-muted font-semibold mt-0.5">Jaigopal Garodia Higher Secondary | 2020 - 2021 | Percentage: 86%</p>
              </div>
            </div>

            {/* Education 3 */}
            <div className="flex gap-4 items-center bg-card-bg border border-card-border p-4 rounded-xl hover:border-indigo-500/20 transition-all shadow-xs">
              <div className="w-12 h-12 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-accent-primary font-black text-xs shrink-0">
                SSLC
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">Secondary School Leaving Certificate (SSLC)</h4>
                <p className="text-[10px] text-text-muted font-semibold mt-0.5">Shakespeare Matriculation School | 2019 | Percentage: 75%</p>
              </div>
            </div>
          </div>
        </section>



        {/* SECTION 10: CONTACT */}
        <section id="contact" className="space-y-6 pb-20">
          <div className="space-y-1.5">
            <span className="text-[10px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">Send mail</span>
            <h3 className="text-2xl font-bold text-foreground">Get in Touch</h3>
            <p className="text-xs text-text-muted">Reach out for recruitment proposals, operational audits, or consulting opportunities.</p>
          </div>
          <ContactForm />
        </section>

        {/* Main Footer Section */}
        <footer className="border-t border-card-border pt-12 mt-20 pb-8 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Column 1: Info */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white text-base shadow-md">
                  I
                </div>
                <h4 className="text-sm font-bold text-foreground">Indhu S | Aspiring Business Analyst</h4>
              </div>
              <p className="text-xs text-text-muted leading-relaxed max-w-sm">
                Gathering requirements, auditing operational records, and engineering SQL databases and Power BI systems for operational clarity.
              </p>
            </div>

            {/* Column 2: Navigation Quick Links */}
            <div className="space-y-3">
              <h5 className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">Navigation</h5>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
                <a href="#summary" className="text-text-muted hover:text-foreground transition-colors">Summary</a>
                <a href="#competencies" className="text-text-muted hover:text-foreground transition-colors">Skills</a>
                <a href="#experience" className="text-text-muted hover:text-foreground transition-colors">Experience</a>
                <a href="#case-studies" className="text-text-muted hover:text-foreground transition-colors">Case Studies</a>
                <a href="#bpmn-analysis" className="text-text-muted hover:text-foreground transition-colors">BPMN Flow</a>
                <a href="#deliverables" className="text-text-muted hover:text-foreground transition-colors">Deliverables</a>
                <a href="#data-showcase" className="text-text-muted hover:text-foreground transition-colors">Analytics</a>
                <a href="#contact" className="text-text-muted hover:text-foreground transition-colors">Contact</a>
              </div>
            </div>

            {/* Column 3: Social/Contact Info */}
            <div className="space-y-3">
              <h5 className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">Connect</h5>
              <ul className="text-xs text-text-muted space-y-2 font-semibold">
                <li>
                  <a href="mailto:indhusekar1609@gmail.com" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                    indhusekar1609@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/indhu16" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                    linkedin.com/in/indhu16
                  </a>
                </li>
                <li>
                  <a href="https://github.com/indhusekar1609" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors flex items-center gap-1.5">
                    github.com/indhusekar1609
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-card-border mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-text-muted font-bold uppercase tracking-wider">
            <div>
              © 2026 Indhu S Portfolio. All rights reserved.
            </div>
            <div>
              Designed with Next.js & Tailwind CSS
            </div>
          </div>
        </footer>

        {/* Floating Mobile Bottom Navigation Dock */}
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-[480px] bg-sidebar-bg/90 border border-sidebar-border rounded-full p-2.5 flex justify-around items-center shadow-2xl backdrop-blur-md z-50 xl:hidden transition-colors duration-300">
          <a href="#summary" className="flex flex-col items-center gap-1 text-[10px] font-bold text-text-muted hover:text-accent-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Home</span>
          </a>
          <a href="#experience" className="flex flex-col items-center gap-1 text-[10px] font-bold text-text-muted hover:text-accent-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span>Work</span>
          </a>
          <a href="#case-studies" className="flex flex-col items-center gap-1 text-[10px] font-bold text-text-muted hover:text-accent-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span>Cases</span>
          </a>
          <a href="#data-showcase" className="flex flex-col items-center gap-1 text-[10px] font-bold text-text-muted hover:text-accent-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.003 9.003 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
            <span>Data</span>
          </a>
          <a href="#contact" className="flex flex-col items-center gap-1 text-[10px] font-bold text-text-muted hover:text-accent-primary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" />
            </svg>
            <span>Contact</span>
          </a>
        </div>

      </main>
    </div>
  );
}
