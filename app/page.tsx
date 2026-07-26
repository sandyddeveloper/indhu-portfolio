"use client";

import { useState, useEffect } from "react";
import HeaderNav from "./components/HeaderNav";
import BrandLogo from "./components/BrandLogo";
import HeroIllustration from "./components/HeroIllustration";
import ToolLogos from "./components/ToolLogos";
import BpmnViewer from "./components/BpmnViewer";
import InteractiveSqlSandbox from "./components/InteractiveSqlSandbox";
import DashboardSimulator from "./components/DashboardSimulator";
import TestimonialsCarousel from "./components/TestimonialsCarousel";
import ContactForm from "./components/ContactForm";
import SplashScreen from "./components/SplashScreen";
import AiAssistantBriefing from "./components/AiAssistantBriefing";

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
  const [selectedCertificateModal, setSelectedCertificateModal] = useState<string | null>(null);

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

  const [showTopBtn, setShowTopBtn] = useState(false);
  const [liftTopBtnForFooter, setLiftTopBtnForFooter] = useState(false);

  // Track active section, top button visibility, and footer offset on scroll
  useEffect(() => {
    const sectionIds = ["home", "about", "projects", "certifications", "contact"];
    const handleScroll = () => {
      // Toggle top button visibility (hidden at top: 0, visible when scrolled down)
      if (window.scrollY > 300) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }

      // Check distance to bottom to lift floating controls above footer
      const scrollBottom = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      if (scrollBottom >= totalHeight - 220) {
        setLiftTopBtnForFooter(true);
      } else {
        setLiftTopBtnForFooter(false);
      }

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

        <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24 py-6 sm:py-8 overflow-x-hidden transition-all duration-500 ${loading ? "opacity-0" : "opacity-100 animate-fade-in"}`}>

          {/* ================= HERO SECTION ================= */}
          <section id="home" className="pt-2 sm:pt-4 pb-8 border-b border-card-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">

              {/* Left Column: Bio, Social Buttons, Resume Pill Button */}
              <div className="lg:col-span-7 space-y-6 sm:space-y-8">
                <div className="space-y-3 sm:space-y-4">
                  <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black text-black dark:text-white tracking-tight font-sans">
                    Indhu S
                  </h1>

                  <p className="text-sm sm:text-lg lg:text-xl text-[#1e293b] dark:text-[#f8fafc] leading-relaxed font-bold max-w-2xl">
                    A <strong className="font-black text-purple-900 dark:text-purple-300">Python & SQL Specialist</strong> proficient in Python, SQL, Django, PostgreSQL, ELT, Pandas & NumPy.
                    <br className="hidden sm:inline" />
                    Focused on building data pipelines, database queries, and analytical solutions suitable for requirements.
                  </p>
                </div>

                {/* Social Icon Pills (LinkedIn, Email, Document) */}
                <div className="flex flex-wrap items-center gap-3">
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
                    href="/indhuS.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    download="Indhu-Resume.pdf"
                    className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 border border-purple-300 dark:border-purple-700 flex items-center justify-center text-purple-900 dark:text-purple-200 font-extrabold hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors shadow-xs"
                    title="View Resume PDF"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </a>
                </div>

                {/* Soft Pastel Purple Download Resume Button */}
                <div>
                  <a
                    href="/indhuS.pdf"
                    download="Indhu-Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#c8b6e2] dark:bg-[#7e57c2] text-black dark:text-white font-black text-sm hover:bg-[#b8a2d6] dark:hover:bg-[#6c46b3] transition-all shadow-sm hover:shadow-md cursor-pointer group"
                  >
                    <svg className="w-5 h-5 text-purple-900 dark:text-white group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Download Resume (PDF)</span>
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
                Motivated and detail-oriented professional with strong skills in Python, SQL, Excel, and Power BI. Possesses a solid understanding of data processing, data cleaning, transformation, and analysis, with the ability to work efficiently with structured data and relational databases. Quick learner with strong analytical, problem-solving, and communication skills, committed to delivering accurate, high-quality solutions while continuously expanding technical expertise
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
                  Code & Query Accuracy
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:border-purple-400 transition-all">
                <div className="text-3xl font-black text-purple-800 dark:text-purple-300">
                  <AnimatedCounter value={100} decimals={0} suffix="%" active={!loading && statsVisible} />
                </div>
                <div className="text-[11px] text-black dark:text-slate-200 font-extrabold uppercase tracking-wider mt-1.5">
                  HIPAA & Compliance
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:border-purple-400 transition-all">
                <div className="text-3xl font-black text-purple-800 dark:text-purple-300">
                  <AnimatedCounter value={5000} decimals={0} suffix="+" active={!loading && statsVisible} />
                </div>
                <div className="text-[11px] text-black dark:text-slate-200 font-extrabold uppercase tracking-wider mt-1.5">
                  Records & Audits Processed
                </div>
              </div>
            </div>

            {/* Core Competencies Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-900 dark:text-purple-200 mb-4 font-bold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                <h4 className="text-base font-black text-black dark:text-white mb-2">Python & Django</h4>
                <p className="text-xs text-black dark:text-slate-200 font-bold leading-relaxed mb-4">
                  Building clean Python automation scripts, Django web applications, REST APIs, and object-oriented backend logic.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Python 3", "Django", "REST APIs", "Scripting", "OOP"].map((tag) => (
                    <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-900 dark:text-purple-200 mb-4 font-bold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <h4 className="text-base font-black text-black dark:text-white mb-2">SQL & PostgreSQL (PSQL)</h4>
                <p className="text-xs text-black dark:text-slate-200 font-bold leading-relaxed mb-4">
                  Writing optimized SQL queries, complex JOINs, window functions, and designing schemas in PostgreSQL & MySQL.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["PostgreSQL", "MySQL", "Complex JOINs", "Subqueries", "Optimization"].map((tag) => (
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
                <h4 className="text-base font-black text-black dark:text-white mb-2">Pandas, NumPy & Power BI</h4>
                <p className="text-xs text-black dark:text-slate-200 font-bold leading-relaxed mb-4">
                  Data wrangling, matrix manipulations with NumPy, DataFrame processing with Pandas, and Power BI dashboard creation.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["Pandas", "NumPy", "Data Wrangling", "Power BI", "Excel"].map((tag) => (
                    <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2 py-0.5 rounded border border-purple-300 dark:border-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-card-bg p-6 rounded-2xl border border-card-border shadow-xs hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-900 dark:text-purple-200 mb-4 font-bold">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h4 className="text-base font-black text-black dark:text-white mb-2">ELT Pipelines & Git</h4>
                <p className="text-xs text-black dark:text-slate-200 font-bold leading-relaxed mb-4">
                  Designing Extract, Load, Transform data pipelines, tracking code with Git/GitHub, and maintaining QA data standards.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["ELT", "Pipelines", "Git", "GitHub Flow", "Data Audit"].map((tag) => (
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
                    <h4 className="text-base font-black text-black dark:text-white">Quality Analyst – Data Conversion Specialist</h4>
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

            {/* Project 1: BPMN Process Flow Viewer */}
            <div className="bg-card-bg border border-card-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 dark:border-purple-900/40 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0">
                    01
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
                      ETL Pipeline & Job Market BPMN Flow Analysis
                    </h3>
                    <p className="text-xs font-bold text-purple-800 dark:text-purple-300 mt-0.5">
                      Process Re-engineering & Data Pipeline Architecture
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["ETL Pipelines", "BPMN 2.0", "Data Wrangling", "Process Mapping"].map((tag) => (
                    <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2.5 py-1 rounded-lg border border-purple-300 dark:border-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3 Feature Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-black dark:text-white mb-1">End-to-End ETL Pipeline</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      Architected an automated Extract, Load, Transform (ETL) data pipeline tailored for large-scale job market analytics.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    📊
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-black dark:text-white mb-1">BPMN 2.0 Flow Models</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      Mapped operational data transformation workflows using BPMN 2.0 process models for AS-IS and TO-BE architecture.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    🚀
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-black dark:text-white mb-1">Automated Extractions</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      Automates web job posting extractions, skill frequency aggregation, and database loading with structured error handling.
                    </p>
                  </div>
                </div>
              </div>

              <BpmnViewer />
            </div>

            {/* Project 2: Power BI Dashboard Simulator */}
            <div className="bg-card-bg border border-card-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 dark:border-purple-900/40 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0">
                    02
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
                      Power BI Executive Dashboard Simulator
                    </h3>
                    <p className="text-xs font-bold text-purple-800 dark:text-purple-300 mt-0.5">
                      Business Intelligence & Telemetry Analytics
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["Power BI", "DAX Measures", "KPI Visuals", "Data Modeling"].map((tag) => (
                    <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2.5 py-1 rounded-lg border border-purple-300 dark:border-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3 Feature Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-black dark:text-white mb-1">Executive Dashboards</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      Developed interactive Power BI executive dashboards for real-time tracking of revenue KPIs, sales, and patient metrics.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    📊
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-black dark:text-white mb-1">Dynamic Slicers</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      Features interactive time-period filters, regional segmentation, and category drill-downs for deep operational visibility.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    🚀
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-black dark:text-white mb-1">Data-Driven Strategy</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      Translates complex raw relational datasets into clear executive visual insights for strategic business decisions.
                    </p>
                  </div>
                </div>
              </div>

              <DashboardSimulator />
            </div>

            {/* Project 3: Interactive SQL Sandbox */}
            <div className="bg-card-bg border border-card-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-6 transition-all duration-300 hover:border-purple-300 dark:hover:border-purple-700">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-100 dark:border-purple-900/40 pb-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 text-white font-black text-lg flex items-center justify-center shadow-xs shrink-0">
                    03
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-black dark:text-white tracking-tight">
                      Interactive SQL Querying & Database Sandbox
                    </h3>
                    <p className="text-xs font-bold text-purple-800 dark:text-purple-300 mt-0.5">
                      Relational Database Engine & Query Optimization
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {["PostgreSQL", "SQL JOINs", "Window Functions", "Query Tuning"].map((tag) => (
                    <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2.5 py-1 rounded-lg border border-purple-300 dark:border-purple-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 3 Feature Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    ⚡
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-black dark:text-white mb-1">Complex SQL Architecture</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      Designed PostgreSQL queries using multi-table JOINs, subqueries, and window aggregations for real-time data processing.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    📊
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-black dark:text-white mb-1">Business Metrics & Audits</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      Demonstrates demographic churn analysis, medical claim leakage diagnosis, and dynamic safety stock monitoring.
                    </p>
                  </div>
                </div>

                <div className="bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/40 p-4 rounded-2xl flex items-start gap-3">
                  <div className="w-7 h-7 rounded-xl bg-purple-200 dark:bg-purple-800 text-purple-900 dark:text-purple-100 flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                    🚀
                  </div>
                  <div>
                    <h5 className="text-xs font-black text-black dark:text-white mb-1">Interactive Execution</h5>
                    <p className="text-xs text-slate-700 dark:text-slate-300 font-bold leading-relaxed">
                      Allows live query switching and execution with instant tabular results and dynamic visual metrics charts.
                    </p>
                  </div>
                </div>
              </div>

              <InteractiveSqlSandbox />
            </div>
          </section>


          {/* ================= SECTION 4: CERTIFICATIONS & EDUCATION ================= */}
          <section id="certifications" className="space-y-10">
            <div className="space-y-2">
              <span className="text-xs font-black text-purple-800 dark:text-purple-300 uppercase tracking-widest">
                Academic & Verified Credentials
              </span>
              <h2 className="text-3xl font-black text-black dark:text-white">
                Certifications & Education
              </h2>
            </div>

            {/* Professional Certifications Sub-section */}
            <div className="space-y-4">
              <h3 className="text-xl font-black text-black dark:text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-700 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Professional Certifications
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card-bg p-6 rounded-3xl border border-card-border shadow-xs hover:border-purple-400 transition-all space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                        <svg className="w-7 h-7 text-purple-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-black dark:text-white">Python Training Certification</h4>
                        <p className="text-xs font-extrabold text-purple-900 dark:text-purple-300">Besant Technologies</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCertificateModal("besant_python")}
                      className="inline-flex items-center gap-1.5 text-[11px] font-black bg-purple-700 hover:bg-purple-800 text-white px-3.5 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Verify Certificate</span>
                    </button>
                  </div>

                  <div className="bg-purple-50/60 dark:bg-purple-950/30 p-3.5 rounded-xl border border-purple-200/80 dark:border-purple-800/40 space-y-1 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <p className="flex items-center justify-between">
                      <span>Credential ID:</span>
                      <span className="font-mono text-purple-900 dark:text-purple-300 font-extrabold">BFT2443B119</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                        Verified Certificate Preview
                      </span>
                      <button
                        onClick={() => setSelectedCertificateModal("besant_python")}
                        className="text-purple-800 dark:text-purple-300 hover:underline cursor-pointer"
                      >
                        Expand ↗
                      </button>
                    </div>
                    <div
                      onClick={() => setSelectedCertificateModal("besant_python")}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-purple-200 dark:border-purple-800 bg-slate-950 group cursor-pointer shadow-inner"
                    >
                      <img
                        src="/python.png"
                        alt="Besant Technologies Python Training Certificate"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black gap-2">
                        <span>Click to View Fullscreen ↗</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {[
                      "ETL", "Data Cleaning", "Data Warehousing", "Power BI", "Excel",
                      "Linux", "Data Analysis", "Data Pipelines", "Data Validation",
                      "Databricks (learning)", "CTEs", "Window Functions"
                    ].map((tag) => (
                      <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2.5 py-0.5 rounded-md border border-purple-300 dark:border-purple-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* 1. HackerRank SQL Certificate */}
                <div className="bg-card-bg p-6 rounded-3xl border border-card-border shadow-xs hover:border-purple-400 transition-all space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#00EA64] flex items-center justify-center text-black font-black text-2xl shadow-xs shrink-0">
                        H
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-black dark:text-white">SQL Certificate</h4>
                        <p className="text-xs font-extrabold text-purple-900 dark:text-purple-300">HackerRank</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCertificateModal("hackerrank_sql")}
                      className="inline-flex items-center gap-1.5 text-[11px] font-black bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Verify Certificate</span>
                    </button>
                  </div>

                  <div className="bg-purple-50/60 dark:bg-purple-950/30 p-3.5 rounded-xl border border-purple-200/80 dark:border-purple-800/40 space-y-1 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <p className="flex items-center justify-between">
                      <span>Credential ID:</span>
                      <span className="font-mono text-purple-900 dark:text-purple-300 font-extrabold">74D738FEA4BE</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Issued:</span>
                      <span className="text-slate-800 dark:text-slate-200 font-extrabold">Jun 2026</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Verified Certificate Preview
                      </span>
                      <button
                        onClick={() => setSelectedCertificateModal("hackerrank_sql")}
                        className="text-purple-800 dark:text-purple-300 hover:underline cursor-pointer"
                      >
                        Expand ↗
                      </button>
                    </div>
                    <div
                      onClick={() => setSelectedCertificateModal("hackerrank_sql")}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-purple-200 dark:border-purple-800 bg-slate-950 group cursor-pointer shadow-inner"
                    >
                      <img
                        src="/sql.png"
                        alt="HackerRank SQL Certificate"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black gap-2">
                        <span>Click to View Fullscreen ↗</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["SQL", "Complex Queries", "Subqueries", "JOINs", "Aggregations"].map((tag) => (
                      <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2.5 py-0.5 rounded-md border border-purple-300 dark:border-purple-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2. HackerRank CSS Certificate */}
                <div className="bg-card-bg p-6 rounded-3xl border border-card-border shadow-xs hover:border-purple-400 transition-all space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#00EA64] flex items-center justify-center text-black font-black text-2xl shadow-xs shrink-0">
                        H
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-black dark:text-white">CSS Certificate</h4>
                        <p className="text-xs font-extrabold text-purple-900 dark:text-purple-300">HackerRank</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCertificateModal("hackerrank_css")}
                      className="inline-flex items-center gap-1.5 text-[11px] font-black bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Verify Certificate</span>
                    </button>
                  </div>

                  <div className="bg-purple-50/60 dark:bg-purple-950/30 p-3.5 rounded-xl border border-purple-200/80 dark:border-purple-800/40 space-y-1 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <p className="flex items-center justify-between">
                      <span>Certification Domain:</span>
                      <span className="text-purple-900 dark:text-purple-300 font-extrabold">Frontend Styling & Layouts</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Verification Status:</span>
                      <span className="text-emerald-700 dark:text-emerald-300 font-extrabold">Verified Badge</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Verified Certificate Preview
                      </span>
                      <button
                        onClick={() => setSelectedCertificateModal("hackerrank_css")}
                        className="text-purple-800 dark:text-purple-300 hover:underline cursor-pointer"
                      >
                        Expand ↗
                      </button>
                    </div>
                    <div
                      onClick={() => setSelectedCertificateModal("hackerrank_css")}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-purple-200 dark:border-purple-800 bg-slate-950 group cursor-pointer shadow-inner"
                    >
                      <img
                        src="/css.jpg"
                        alt="HackerRank CSS Certificate"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black gap-2">
                        <span>Click to View Fullscreen ↗</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["CSS3", "Flexbox", "Grid Layout", "Responsive UI", "Animations"].map((tag) => (
                      <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2.5 py-0.5 rounded-md border border-purple-300 dark:border-purple-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. HackerRank HTML Certificate */}
                <div className="bg-card-bg p-6 rounded-3xl border border-card-border shadow-xs hover:border-purple-400 transition-all space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#00EA64] flex items-center justify-center text-black font-black text-2xl shadow-xs shrink-0">
                        H
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-black dark:text-white">HTML Certificate</h4>
                        <p className="text-xs font-extrabold text-purple-900 dark:text-purple-300">HackerRank</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedCertificateModal("hackerrank_html")}
                      className="inline-flex items-center gap-1.5 text-[11px] font-black bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-1.5 rounded-full shadow-xs transition-all cursor-pointer"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span>Verify Certificate</span>
                    </button>
                  </div>

                  <div className="bg-purple-50/60 dark:bg-purple-950/30 p-3.5 rounded-xl border border-purple-200/80 dark:border-purple-800/40 space-y-1 text-xs font-bold text-slate-700 dark:text-slate-200">
                    <p className="flex items-center justify-between">
                      <span>Certification Domain:</span>
                      <span className="text-purple-900 dark:text-purple-300 font-extrabold">Semantic Web & Form Architecture</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Verification Status:</span>
                      <span className="text-emerald-700 dark:text-emerald-300 font-extrabold">Verified Badge</span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-[11px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Verified Certificate Preview
                      </span>
                      <button
                        onClick={() => setSelectedCertificateModal("hackerrank_html")}
                        className="text-purple-800 dark:text-purple-300 hover:underline cursor-pointer"
                      >
                        Expand ↗
                      </button>
                    </div>
                    <div
                      onClick={() => setSelectedCertificateModal("hackerrank_html")}
                      className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-purple-200 dark:border-purple-800 bg-slate-950 group cursor-pointer shadow-inner"
                    >
                      <img
                        src="/htmljpg.jpg"
                        alt="HackerRank HTML Certificate"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-black gap-2">
                        <span>Click to View Fullscreen ↗</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["HTML5", "Semantic Web", "Form Architecture", "DOM Structure", "Accessibility"].map((tag) => (
                      <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2.5 py-0.5 rounded-md border border-purple-300 dark:border-purple-700">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Besant Technologies Python Training */}

              </div>
            </div>

            {/* Academic Education Sub-section */}
            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-black text-black dark:text-white flex items-center gap-2">
                <svg className="w-6 h-6 text-purple-700 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Academic Education
              </h3>

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

            {/* <div className="pt-6">
              <TestimonialsCarousel />
            </div> */}
          </section>

        </main>

        {/* Full Width Footer */}
        <footer className="w-full bg-[#f3edfc] dark:bg-[#14111d] border-t border-purple-200/80 dark:border-purple-900/40 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <BrandLogo size="md" />
              <p className="text-xs text-black dark:text-slate-200 leading-relaxed max-w-sm font-bold pt-1">
                Python & SQL Specialist skilled in Python, Django, PostgreSQL (PSQL), Pandas, NumPy, ELT/ETL pipelines, Power BI, and Excel — adaptable across all Python & Data requirements.
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

          <div className="max-w-7xl mx-auto border-t border-purple-200/80 dark:border-purple-900/40 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black dark:text-slate-300 font-extrabold">
            <div>© 2026 Indhu S. All rights reserved.</div>

            {/* Smooth Scroll to Top Button (Hidden at top: 0, visible when scrolled down) */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#c8b6e2] dark:bg-[#7e57c2] text-black dark:text-white font-black text-xs hover:bg-[#b8a2d6] dark:hover:bg-[#6c46b3] transition-all cursor-pointer shadow-xs hover:shadow-md group ${showTopBtn ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
                }`}
              title="Smooth Scroll to Top"
            >
              <span>Back to Top</span>
              <svg className="w-4 h-4 text-purple-900 dark:text-white group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
          </div>
        </footer>
      </div>

      {/* Floating Bottom-Left Back-to-Top Button (Hides automatically at top: 0, lifts above footer at bottom) */}
      <div className={`fixed left-4 sm:left-6 z-40 transition-all duration-300 ${showTopBtn ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"} ${liftTopBtnForFooter ? "bottom-24 sm:bottom-20" : "bottom-6"}`}>
        {/* <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="p-3.5 rounded-2xl bg-[#c8b6e2] dark:bg-[#7e57c2] text-black dark:text-white hover:bg-[#b8a2d6] dark:hover:bg-[#6c46b3] transition-all shadow-xl hover:scale-105 border border-purple-300 dark:border-purple-600 flex items-center justify-center cursor-pointer group"
          title="Smooth Scroll to Top"
        >
          <svg className="w-5 h-5 text-purple-900 dark:text-white group-hover:-translate-y-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button> */}
      </div>

      {/* AI Recruiter Voice Assistant Widget */}
      <AiAssistantBriefing />

      {/* Certificate Fullscreen Modal Overlay */}
      {selectedCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-[#181326] border border-purple-300 dark:border-purple-800 rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-4">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${selectedCertificateModal === "besant_python" ? "bg-purple-900 text-white" : "bg-[#00EA64] text-black"} flex items-center justify-center font-black text-2xl shadow-xs shrink-0`}>
                  {selectedCertificateModal === "besant_python" ? "P" : "H"}
                </div>
                <div>
                  <h3 className="text-xl font-black text-black dark:text-white">
                    {selectedCertificateModal === "hackerrank_sql"
                      ? "HackerRank SQL Certificate"
                      : selectedCertificateModal === "hackerrank_css"
                        ? "HackerRank CSS Certificate"
                        : selectedCertificateModal === "hackerrank_html"
                          ? "HackerRank HTML Certificate"
                          : "Python Training Certification"}
                  </h3>
                  <p className="text-xs font-extrabold text-purple-900 dark:text-purple-300">
                    {selectedCertificateModal === "hackerrank_sql"
                      ? "Credential ID: 74D738FEA4BE • Issued Jun 2026"
                      : selectedCertificateModal === "besant_python"
                        ? "Besant Technologies • Credential ID: BFT2443B119"
                        : "HackerRank Verified Skills Certification"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCertificateModal(null)}
                className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-black dark:text-white font-black hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center justify-center text-lg cursor-pointer"
                title="Close modal"
              >
                ✕
              </button>
            </div>

            {/* Certificate High-Res Image View */}
            <div className="space-y-2">
              <div className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Verified Certificate Document
              </div>
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden border border-purple-200 dark:border-purple-800 bg-slate-950 shadow-inner">
                <img
                  src={
                    selectedCertificateModal === "hackerrank_sql"
                      ? "/sql.png"
                      : selectedCertificateModal === "hackerrank_css"
                        ? "/css.jpg"
                        : selectedCertificateModal === "hackerrank_html"
                          ? "/htmljpg.jpg"
                          : "/python.png"
                  }
                  alt="Certificate Full View"
                  className="w-full h-full object-contain bg-slate-900/90"
                />
              </div>
            </div>

            {/* Footer Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-purple-100 dark:border-purple-900/40">
              <div className="flex flex-wrap gap-1.5">
                {(selectedCertificateModal === "hackerrank_sql"
                  ? ["SQL", "Complex Queries", "Subqueries", "JOINs", "Aggregations"]
                  : selectedCertificateModal === "hackerrank_css"
                    ? ["CSS3", "Flexbox", "Grid Layout", "Responsive UI", "Animations"]
                    : selectedCertificateModal === "hackerrank_html"
                      ? ["HTML5", "Semantic Web", "Forms & Validation", "Document Structure", "Accessibility"]
                      : [
                        "ETL", "Data Cleaning", "Data Warehousing", "Power BI", "Excel",
                        "Linux", "Data Analysis", "Data Pipelines", "Data Validation",
                        "Databricks (learning)", "CTEs", "Window Functions"
                      ]
                ).map((tag) => (
                  <span key={tag} className="text-[10px] font-black bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 px-2.5 py-1 rounded-md border border-purple-300 dark:border-purple-700">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                {selectedCertificateModal === "hackerrank_sql" && (
                  <a
                    href="https://www.hackerrank.com/certificates/74d738fea4be"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black transition-all shadow-xs flex items-center gap-1.5"
                  >
                    <span>Open on HackerRank ↗</span>
                  </a>
                )}
                <button
                  onClick={() => setSelectedCertificateModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-black hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
