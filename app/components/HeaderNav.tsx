"use client";

import { useState } from "react";

interface HeaderNavProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  activeSection: string;
}

export default function HeaderNav({ theme, onToggleTheme, activeSection }: HeaderNavProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About Me", id: "about" },
    { href: "#contact", label: "Contact Me", id: "contact" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#certifications", label: "Certification", id: "certifications" },
  ];

  const searchableItems = [
    { title: "Power BI Dashboards & Visualizations", section: "projects", desc: "Interactive BI analytics and KPI reports" },
    { title: "SQL Playground & Database Queries", section: "projects", desc: "Complex JOINs, aggregations, and data transformation" },
    { title: "BPMN Process Flow Analysis", section: "projects", desc: "Operational ETL workflow & AS-IS / TO-BE re-engineering" },
    { title: "HTC Global Services Experience", section: "about", desc: "Quality Analyst – Document Record Management" },
    { title: "S10 Healthcare Experience", section: "about", desc: "Financial Transaction Analyst Intern (HIPAA Compliance)" },
    { title: "BCA Computer Applications Degree", section: "certifications", desc: "AM Jain College | CGPA 7.79" },
    { title: "Contact & Recruitment Proposals", section: "contact", desc: "Direct email and message form" },
  ];

  const filteredResults = searchQuery.trim()
    ? searchableItems.filter(
      (item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : [];

  return (
    <>
      {/* Fixed Top Header Navbar */}
      <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-[#120e1c]/95 backdrop-blur-md border-b border-purple-200/80 dark:border-purple-900/40 shadow-xs transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

          {/* Left: Round Logo */}
          <a href="#home" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-100 to-purple-200 dark:from-purple-900/50 dark:to-purple-800/40 border border-purple-300/80 dark:border-purple-500/40 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <svg className="w-6 h-6 text-purple-700 dark:text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="13" x2="8" y2="10" strokeWidth="2.5" />
                <line x1="11" y1="13" x2="11" y2="8" strokeWidth="2.5" />
                <line x1="14" y1="13" x2="14" y2="11" strokeWidth="2.5" />
              </svg>
            </div>
            <span className="hidden sm:inline-block font-black text-black dark:text-white text-sm tracking-tight">
              Indhumathi M
            </span>
          </a>

          {/* Center: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`text-sm transition-all duration-200 ${isActive
                      ? "text-purple-800 dark:text-purple-300 font-black border-b-2 border-purple-600 dark:border-purple-400 pb-1"
                      : "text-black dark:text-slate-200 hover:text-purple-700 dark:hover:text-purple-300 font-extrabold"
                    }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right: Search Icon + Theme Toggle + Soft Lilac Contact Me Button */}
          <div className="flex items-center gap-4">

            {/* Search Trigger Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-full text-black dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors cursor-pointer"
              aria-label="Search portfolio"
              title="Search topics..."
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-full text-black dark:text-white hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-purple-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              )}
            </button>

            {/* Soft Lilac Pastel Contact Me Pill Button */}
            <a
              href="#contact"
              className="px-6 py-2.5 rounded-xl bg-[#c8b6e2] dark:bg-[#7e57c2] text-black dark:text-white font-black text-sm hover:bg-[#b8a2d6] dark:hover:bg-[#6c46b3] transition-all shadow-xs hover:shadow-md cursor-pointer flex items-center justify-center"
            >
              Contact Me
            </a>
          </div>
        </div>
      </header>

      {/* Interactive Search Modal Dialog */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-slate-900/50 backdrop-blur-xs px-4">
          <div className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-purple-200 dark:border-purple-900 p-6 space-y-4 animate-slide-up">
            <div className="flex justify-between items-center pb-2 border-b border-purple-100 dark:border-purple-900/50">
              <h3 className="text-sm font-black text-black dark:text-white">Search Portfolio</h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-black dark:text-white hover:opacity-70 p-1 transition-opacity cursor-pointer"
                aria-label="Close search"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Search Power BI, SQL, Experience, Certifications..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-purple-200 dark:border-purple-900 bg-purple-50/40 dark:bg-slate-800 text-black dark:text-white text-sm font-semibold focus:outline-hidden focus:ring-2 focus:ring-purple-400"
              />
              <svg className="w-5 h-5 absolute left-3 top-3.5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="11" cy="11" r="8" strokeWidth="2.5" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2.5" />
              </svg>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-2 pt-2">
              {searchQuery.trim() === "" ? (
                <p className="text-xs text-slate-700 dark:text-slate-300 text-center py-6 font-bold">Type to search skills, experience, or project modules...</p>
              ) : filteredResults.length > 0 ? (
                filteredResults.map((item, idx) => (
                  <a
                    key={idx}
                    href={`#${item.section}`}
                    onClick={() => setSearchOpen(false)}
                    className="block p-3 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-950/40 border border-transparent hover:border-purple-200 dark:hover:border-purple-900 transition-colors"
                  >
                    <div className="text-xs font-black text-purple-900 dark:text-purple-300">{item.title}</div>
                    <div className="text-[11px] text-black dark:text-slate-200 font-semibold mt-0.5">{item.desc}</div>
                  </a>
                ))
              ) : (
                <p className="text-xs text-slate-500 dark:text-slate-400 text-center py-6 font-bold">No matching portfolio content found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
