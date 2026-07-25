"use client";

import { useState, useEffect } from "react";
import HeaderNav from "./components/HeaderNav";
import HeroIllustration from "./components/HeroIllustration";
import ToolLogos from "./components/ToolLogos";
import BpmnViewer from "./components/BpmnViewer";
import InteractiveSqlSandbox from "./components/InteractiveSqlSandbox";
import DashboardSimulator from "./components/DashboardSimulator";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import ContactForm from "./components/ContactForm";
import SplashScreen from "./components/SplashScreen";

interface AnimatedCounterProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  active?: boolean;
}

function AnimatedCounter({
  value,
  duration = 1500,
  decimals = 0,
  prefix = "",
  suffix = "",
  active = true
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setCount(0);
      return;
    }

    const steps = 60;
    const stepTime = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentCount = easeProgress * value;

      setCount(currentCount);

      if (currentStep >= steps) {
        clearInterval(timer);
        setCount(value);
      }
    }, stepTime);

    return () => {
      clearInterval(timer);
    };
  }, [value, duration, active]);

  return (
    <span>
      {prefix}
      {count.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [loading, setLoading] = useState(true);
  const [statsVisible, setStatsVisible] = useState(false);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light";
    if (savedTheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
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

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "certifications", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Trigger stats counter animation when scrolled into view
  useEffect(() => {
    if (loading) return;
    const el = document.getElementById("stats-grid");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      {loading && <SplashScreen theme={theme} onComplete={() => setLoading(false)} />}

      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Sticky Top Header Navigation */}
        <HeaderNav theme={theme} onToggleTheme={toggleTheme} activeSection={activeSection} />

        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-8 transition-all duration-500 ${loading ? "opacity-0" : "opacity-100 animate-fade-in"}`}>

          {/* ================= HERO SECTION (MATCHING SCREENSHOT) ================= */}
          <section id="home" className="pt-4 pb-8 border-b border-card-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Column: Bio, Social Buttons, Resume Pill Button */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-black dark:text-white tracking-tight font-sans">
                    Indhumathi M
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl text-[#1e293b] dark:text-[#f8fafc] leading-relaxed font-bold max-w-2xl">
                    A <strong className="font-black text-purple-900 dark:text-purple-300">Data Analyst</strong> skilled in <strong className="font-black text-purple-900 dark:text-purple-300">Power BI, SQL, and Excel</strong>, focused on creating interactive dashboards and insights that drive data-based decisions.
                  </p>
                </div>

                {/* Social Icon Pills (LinkedIn, Email, Document) */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://linkedin.com/in/indhu16"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 border border-purple-300 dark:border-purple-700 flex items-center justify-center text-purple-900 dark:text-purple-200 font-extrabold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors shadow-xs"
                    title="LinkedIn Profile"
                  >
                    in
                  </a>
                  <a
                    href="mailto:indhusekar1609@gmail.com"
                    className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 border border-purple-300 dark:border-purple-700 flex items-center justify-center text-purple-900 dark:text-purple-200 font-extrabold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors shadow-xs"
                    title="Email Contact"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/indhusekar1609"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 border border-purple-300 dark:border-purple-700 flex items-center justify-center text-purple-900 dark:text-purple-200 font-extrabold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors shadow-xs"
                    title="GitHub Projects"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>

                {/* Soft Pastel Purple Download Resume Button */}
                <div>
                  <a
                    href="mailto:indhusekar1609@gmail.com?subject=Request%20Resume%20-%20Indhumathi%20M"
                    className="inline-flex items-center gap-3 px-6 py-3.5 rounded-xl bg-[#c8b6e2] dark:bg-[#7e57c2] text-black dark:text-white font-black text-sm hover:bg-[#b8a2d6] dark:hover:bg-[#6c46b3] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                  >
                    <svg className="w-5 h-5 text-purple-900 dark:text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Indhumathi M Resume.pdf</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Hero Illustration Artwork */}
              <div className="lg:col-span-5 flex justify-center">
                <HeroIllustration />
              </div>
            </div>

            {/* "Data Analytics Tools Known" Strip */}
            <ToolLogos />
          </section>


          {/* ================= SECTION 2: ABOUT ME & EXPERIENCE ================= */}
          <section id="about" className="space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase tracking-widest">
                Professional Overview
              </span>
              <h2 className="text-3xl font-black text-black dark:text-white">
                About Me
              </h2>
            </div>

            {/* Executive Bio Card */}
            <div className="bg-card-bg p-8 rounded-2xl border border-card-border shadow-xs space-y-4">
              <p className="text-base text-black dark:text-white leading-relaxed font-bold">
                Motivated and detail-oriented professional with strong skills in Python, SQL, Excel, and Power BI. Possesses a solid understanding of data processing, data cleaning, transformation, and analysis, with the ability to work efficiently with structured data and relational databases. Quick learner with strong analytical, problem-solving, and communication skills, committed to delivering accurate, high-quality solutions while continuously expanding technical expertise.
              </p>
            </div>

            {/* Quick Metrics Grid */}
            <div id="stats-grid" className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:border-purple-400 transition-all">
                <div className="text-3xl font-black text-purple-800 dark:text-purple-300">
                  <AnimatedCounter value={1.0} decimals={1} suffix="+ Yrs" active={!loading && statsVisible} />
                </div>
                <div className="text-[11px] text-black dark:text-slate-200 font-extrabold uppercase tracking-wider mt-1.5">
                  Combined Experience
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:border-purple-400 transition-all">
                <div className="text-3xl font-black text-purple-800 dark:text-purple-300">
                  <AnimatedCounter value={99.8} decimals={1} suffix="%" active={!loading && statsVisible} />
                </div>
                <div className="text-[11px] text-black dark:text-slate-200 font-extrabold uppercase tracking-wider mt-1.5">
                  Document Accuracy
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:border-purple-400 transition-all">
                <div className="text-3xl font-black text-purple-800 dark:text-purple-300">
                  <AnimatedCounter value={100} decimals={0} suffix="%" active={!loading && statsVisible} />
                </div>
                <div className="text-[11px] text-black dark:text-slate-200 font-extrabold uppercase tracking-wider mt-1.5">
                  HIPAA Compliance
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:border-purple-400 transition-all">
                <div className="text-3xl font-black text-purple-800 dark:text-purple-300">
                  <AnimatedCounter value={5000} decimals={0} suffix="+" active={!loading && statsVisible} />
                </div>
                <div className="text-[11px] text-black dark:text-slate-200 font-extrabold uppercase tracking-wider mt-1.5">
                  Audits Completed
                </div>
              </div>
            </div>

            {/* Core Competencies Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-900 dark:text-purple-200 mb-4 font-bold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="text-base font-black text-black dark:text-white mb-2">Requirements & Docs</h4>
                <p className="text-xs text-black dark:text-slate-200 font-bold leading-relaxed mb-4">
                  Capturing business needs, mapping operational flows (AS-IS/TO-BE), and producing BRD/FRD functional specs.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Requirements", "AS-IS / TO-BE", "BRD / FRD", "BPMN 2.0", "Jira"].map((tag) => (
                    <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-900 dark:text-purple-200 mb-4 font-bold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h4 className="text-base font-black text-black dark:text-white mb-2">Analytics & Tools</h4>
                <p className="text-xs text-black dark:text-slate-200 font-bold leading-relaxed mb-4">
                  Writing Python scripts & SQL queries for data processing, building Power BI dashboards, and versioning on GitHub.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Python", "SQL Querying", "Power BI", "Excel", "GitHub"].map((tag) => (
                    <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-900 dark:text-purple-200 mb-4 font-bold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-base font-black text-black dark:text-white mb-2">Quality & Compliance</h4>
                <p className="text-xs text-black dark:text-slate-200 font-bold leading-relaxed mb-4">
                  QA document audit, HIPAA standard compliance, and database transaction tracking for high-quality records.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Doc Audit", "Process Quality", "HIPAA", "Claim Validation"].map((tag) => (
                    <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-900 dark:text-purple-200 mb-4 font-bold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="text-base font-black text-black dark:text-white mb-2">Version Control</h4>
                <p className="text-xs text-black dark:text-slate-200 font-bold leading-relaxed mb-4">
                  Managing source code updates, committing modifications, branching & merging, and organizing code in GitHub.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Git", "GitHub Flow", "Pull Requests", "Branching"].map((tag) => (
                    <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="space-y-6 pt-4">
              <h3 className="text-xl font-black text-black dark:text-white">Work Experience Timeline</h3>
              <div className="relative border-l-2 border-purple-300 dark:border-purple-700 pl-6 space-y-8">
                {/* Item 1 */}
                <div className="relative space-y-2">
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-4 border-background" />
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h4 className="text-base font-black text-black dark:text-white">Quality Analyst – Document Record Management</h4>
                    <span className="text-xs font-black text-purple-900 dark:text-purple-200 px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-800">
                      April 2025 – November 2025
                    </span>
                  </div>
                  <p className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase tracking-wider">HTC Global Services | Full-time</p>
                  <ul className="list-disc pl-4 text-xs text-black dark:text-slate-200 font-bold space-y-1">
                    <li>Verified production documents for accuracy, completeness, and full compliance with client specifications.</li>
                    <li>Performed comprehensive quality assurance checks on business and operational documents before final delivery.</li>
                    <li>Managed high-volume document validation workloads, consistently ensuring timely submission to clients.</li>
                  </ul>
                </div>

                {/* Item 2 */}
                <div className="relative space-y-2">
                  <span className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-purple-400 border-4 border-background" />
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1">
                    <h4 className="text-base font-black text-black dark:text-white">Financial Transaction Analyst Intern</h4>
                    <span className="text-xs font-black text-black dark:text-slate-200 px-3 py-1 rounded-full bg-purple-100/70 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800">
                      July 2024 – December 2024
                    </span>
                  </div>
                  <p className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase tracking-wider">S10 Healthcare Solutions Pvt. Ltd | Internship</p>
                  <ul className="list-disc pl-4 text-xs text-black dark:text-slate-200 font-bold space-y-1">
                    <li>Reviewed and authorized patient demographic and insurance information for US healthcare clients with 100% HIPAA compliance.</li>
                    <li>Processed prior authorizations and verified insurance eligibility, improving transactional accuracy.</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>


          {/* ================= SECTION 3: PROJECTS & SHOWCASE ================= */}
          <section id="projects" className="space-y-12">
            <div className="space-y-2">
              <span className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase tracking-widest">
                Interactive Showcase
              </span>
              <h2 className="text-3xl font-black text-black dark:text-white">
                Projects & Data Analytics
              </h2>
              <p className="text-xs text-black dark:text-slate-200 font-bold">
                Explore interactive SQL queries, Power BI dashboards, and BPMN process flow models.
              </p>
            </div>

            {/* Interactive SQL Sandbox */}
            <InteractiveSqlSandbox />

            {/* Power BI Dashboard Simulator */}
            <DashboardSimulator />

            {/* BPMN Process Flow Viewer */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-black dark:text-white">BPMN Process Flow Gap Analysis</h3>
              <BpmnViewer />
            </div>
          </section>


          {/* ================= SECTION 4: CERTIFICATIONS & EDUCATION ================= */}
          <section id="certifications" className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase tracking-widest">
                Academic & Badges
              </span>
              <h2 className="text-3xl font-black text-black dark:text-white">
                Certifications & Education
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200 font-black text-sm flex items-center justify-center shrink-0 border border-purple-300 dark:border-purple-700">
                  BCA
                </div>
                <div>
                  <h4 className="text-sm font-black text-black dark:text-white">Bachelor of Computer Application</h4>
                  <p className="text-xs text-black dark:text-slate-200 font-bold">AM Jain College | 2021 - 2024</p>
                  <p className="text-xs font-black text-purple-800 dark:text-purple-300 mt-1">CGPA: 7.79</p>
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200 font-black text-sm flex items-center justify-center shrink-0 border border-purple-300 dark:border-purple-700">
                  HSE
                </div>
                <div>
                  <h4 className="text-sm font-black text-black dark:text-white">Higher Secondary Education</h4>
                  <p className="text-xs text-black dark:text-slate-200 font-bold">Jaigopal Garodia HSS | 2020 - 2021</p>
                  <p className="text-xs font-black text-purple-800 dark:text-purple-300 mt-1">Score: 86%</p>
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-900 dark:text-purple-200 font-black text-sm flex items-center justify-center shrink-0 border border-purple-300 dark:border-purple-700">
                  SSLC
                </div>
                <div>
                  <h4 className="text-sm font-black text-black dark:text-white">Secondary School Certificate</h4>
                  <p className="text-xs text-black dark:text-slate-200 font-bold">Shakespeare Matriculation | 2019</p>
                  <p className="text-xs font-black text-purple-800 dark:text-purple-300 mt-1">Score: 75%</p>
                </div>
              </div>
            </div>
          </section>


          {/* ================= SECTION 5: CONTACT ME ================= */}
          <section id="contact" className="space-y-8 pb-12">
            <div className="space-y-2">
              <span className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase tracking-widest">
                Get In Touch
              </span>
              <h2 className="text-3xl font-black text-black dark:text-white">
                Contact Me
              </h2>
              <p className="text-xs text-black dark:text-slate-200 font-bold">
                Reach out for recruitment proposals, operational data audits, or analytics opportunities.
              </p>
            </div>

            <ContactForm />

            <div className="pt-6">
              <TestimonialsCarousel />
            </div>
          </section>

        </main>

        {/* Full Width Footer */}
        <footer className="w-full bg-[#f3edfc] dark:bg-[#14111d] border-t border-purple-200/80 dark:border-purple-900/40 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="text-lg font-black text-black dark:text-white">Indhumathi M</h4>
              <p className="text-xs text-black dark:text-slate-200 leading-relaxed max-w-sm font-bold">
                Data Analyst specialized in Power BI dashboards, SQL query optimization, Excel telemetry analysis, and quality compliance.
              </p>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-black uppercase tracking-wider text-purple-800 dark:text-purple-300">Navigation</h5>
              <div className="grid grid-cols-2 gap-2 text-xs font-extrabold">
                <a href="#home" className="text-black dark:text-slate-200 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">Home</a>
                <a href="#about" className="text-black dark:text-slate-200 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">About Me</a>
                <a href="#projects" className="text-black dark:text-slate-200 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">Projects</a>
                <a href="#certifications" className="text-black dark:text-slate-200 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">Certification</a>
                <a href="#contact" className="text-black dark:text-slate-200 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">Contact Me</a>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-xs font-black uppercase tracking-wider text-purple-800 dark:text-purple-300">Connect</h5>
              <ul className="space-y-2 text-xs font-extrabold">
                <li>
                  <a href="mailto:indhusekar1609@gmail.com" className="text-black dark:text-slate-200 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                    indhusekar1609@gmail.com
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/indhu16" target="_blank" rel="noopener noreferrer" className="text-black dark:text-slate-200 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                    linkedin.com/in/indhu16
                  </a>
                </li>
                <li>
                  <a href="https://github.com/indhusekar1609" target="_blank" rel="noopener noreferrer" className="text-black dark:text-slate-200 hover:text-purple-800 dark:hover:text-purple-300 transition-colors">
                    github.com/indhusekar1609
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-7xl mx-auto border-t border-purple-200/80 dark:border-purple-900/40 mt-8 pt-6 text-center text-xs text-black dark:text-slate-300 font-extrabold">
            © 2026 Indhumathi M. All rights reserved.
          </div>
        </footer>
      </div>
    </>
  );
}
