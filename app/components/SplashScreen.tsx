"use client";

import { useState, useEffect, useRef } from "react";

interface SplashScreenProps {
  theme: "dark" | "light";
  onComplete: () => void;
}

interface LogEntry {
  timestamp: string;
  type: "INFO" | "SUCCESS" | "WARN" | "SYSTEM";
  message: string;
}

const DETAILED_LOGS = [
  { p: 2, type: "SYSTEM", msg: "Celery Worker Node #1 spawned successfully (pid: 14092)." },
  { p: 5, type: "INFO", msg: "Establishing secure SSL connection to target PostgreSQL server." },
  { p: 8, type: "INFO", msg: "CSVETLPipeline initial state configured: schema_version=1.4.2" },
  { p: 12, type: "INFO", msg: "Reading RAW_DATA_ZIP_URL configuration: found index metadata." },
  { p: 15, type: "SUCCESS", msg: "Connected to file repository storage. Buffer size: 4096 bytes." },
  { p: 19, type: "INFO", msg: "Extract stage triggered: downloading industries.csv (14.2 KB)..." },
  { p: 24, type: "INFO", msg: "Extract stage triggered: downloading skills.csv (8.7 KB)..." },
  { p: 29, type: "INFO", msg: "Extract stage triggered: downloading companies.csv (145.1 KB)..." },
  { p: 33, type: "SUCCESS", msg: "Flat files extracted. MD5 checksum verification passed." },
  { p: 37, type: "INFO", msg: "Transform stage initiated: casting strict relational types." },
  { p: 42, type: "WARN", msg: "Detected 4 rows in postings.csv with missing timestamps. Coercing to default." },
  { p: 46, type: "INFO", msg: "Resolving company names to unique ID references using in-memory hash index." },
  { p: 51, type: "INFO", msg: "Deduplicating skills list: removed 14 redundant entries." },
  { p: 56, type: "INFO", msg: "Sanitizing HTML markup tags from job_description text blocks." },
  { p: 61, type: "SUCCESS", msg: "Regex cleansing of postings.csv text attributes completed (2,450 records processed)." },
  { p: 66, type: "INFO", msg: "Normalizing salary currencies to USD base using daily API reference tables." },
  { p: 72, type: "INFO", msg: "Calculating metric quantiles and salary benchmarks for Analyst positions." },
  { p: 77, type: "SUCCESS", msg: "Transformations successfully committed. Intermediate DataFrames validated." },
  { p: 81, type: "INFO", msg: "Load stage triggered: Preparing batch INSERT operations." },
  { p: 86, type: "INFO", msg: "Writing reference data: skills (21 rows), industries (15 rows)." },
  { p: 90, type: "INFO", msg: "Inserting companies (120 rows) and job postings (540 rows) into primary tables." },
  { p: 94, type: "WARN", msg: "Database warnings: 12 duplicate keys encountered on seed insertion (skipped)." },
  { p: 97, type: "SUCCESS", msg: "Indexes created on company_id and skills_id. DB optimization complete." },
  { p: 100, type: "SYSTEM", msg: "Ingestion pipeline terminated. Next.js dashboard UI render complete." }
];

export default function SplashScreen({ theme, onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isFading, setIsFading] = useState(false);
  
  // Real-time telemetry emulation
  const [cpu, setCpu] = useState(42);
  const [ram, setRam] = useState(2.3);
  const [network, setNetwork] = useState(145.2);

  const [mounted, setMounted] = useState(false);
  const logsEndRef = useRef<HTMLDivElement>(null);
  const isDark = theme === "dark";

  // Check mounting state to prevent Next.js hydration mismatches for dynamic values
  useEffect(() => {
    setMounted(true);
  }, []);

  // Main ETL pipeline simulation (lasts exactly 3 seconds)
  useEffect(() => {
    document.body.style.overflow = "hidden";

    // 1% progress every 30ms = 3000ms (3 seconds)
    const intervalTime = 30; 
    let currentProgress = 0;
    let logIndex = 0;

    const timer = setInterval(() => {
      if (currentProgress < 100) {
        currentProgress += 1;
        setProgress(currentProgress);

        // Fluctuate telemetry values to look active
        setCpu((prev) => {
          const delta = Math.floor(Math.random() * 15) - 7;
          return Math.max(30, Math.min(95, prev + delta));
        });
        setRam((prev) => {
          const delta = (Math.random() * 0.08) - 0.04;
          return parseFloat(Math.max(2.1, Math.min(2.9, prev + delta)).toFixed(2));
        });
        setNetwork((prev) => {
          const delta = (Math.random() * 20) - 10;
          return parseFloat(Math.max(90, Math.min(280, prev + delta)).toFixed(1));
        });

        // Add logs based on current progress percentage
        while (logIndex < DETAILED_LOGS.length && DETAILED_LOGS[logIndex].p <= currentProgress) {
          const currentLog = DETAILED_LOGS[logIndex];
          const time = new Date().toISOString().split("T")[1].substring(0, 8);
          setLogs((prev) => [
            ...prev,
            {
              timestamp: time,
              type: currentLog.type as LogEntry["type"],
              message: currentLog.msg
            }
          ]);
          logIndex++;
        }
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setIsFading(true);
          setTimeout(() => {
            document.body.style.overflow = "";
            onComplete();
          }, 800); // fade out duration transition
        }, 600);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  // Autoscroll terminal logs
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Skip helper
  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      document.body.style.overflow = "";
      onComplete();
    }, 400);
  };

  // Phase computation
  const getPhaseStatus = (phase: "extract" | "transform" | "load") => {
    if (phase === "extract") {
      if (progress >= 35) return { status: "COMPLETED", progress: 100, color: "text-emerald-500 bg-emerald-500/10" };
      if (progress > 0) return { status: "RUNNING", progress: Math.min(100, Math.round((progress / 35) * 100)), color: "text-indigo-500 bg-indigo-500/10 animate-pulse" };
      return { status: "PENDING", progress: 0, color: "text-slate-400 bg-slate-500/5" };
    }
    if (phase === "transform") {
      if (progress >= 75) return { status: "COMPLETED", progress: 100, color: "text-emerald-500 bg-emerald-500/10" };
      if (progress >= 35) return { status: "RUNNING", progress: Math.min(100, Math.round(((progress - 35) / 40) * 100)), color: "text-indigo-500 bg-indigo-500/10 animate-pulse" };
      return { status: "PENDING", progress: 0, color: "text-slate-400 bg-slate-500/5" };
    }
    // load phase
    if (progress >= 100) return { status: "COMPLETED", progress: 100, color: "text-emerald-500 bg-emerald-500/10" };
    if (progress >= 75) return { status: "RUNNING", progress: Math.min(100, Math.round(((progress - 75) / 25) * 100)), color: "text-indigo-500 bg-indigo-500/10 animate-pulse" };
    return { status: "PENDING", progress: 0, color: "text-slate-400 bg-slate-500/5" };
  };

  const extract = getPhaseStatus("extract");
  const transform = getPhaseStatus("transform");
  const load = getPhaseStatus("load");

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden select-none transition-all duration-700 ease-in-out ${
        isDark ? "bg-[#020617] text-slate-100" : "bg-[#f8fafc] text-slate-900"
      } ${
        isFading ? "opacity-0 scale-98 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      <div className="w-full max-w-5xl flex flex-col justify-between flex-grow min-h-[90vh] md:min-h-0 md:h-[90vh] max-h-[850px] gap-6 z-10 py-2">
      {/* Dynamic Ambient Background Blur */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[150px] transition-colors duration-500 ${
          isDark ? "bg-indigo-500/8" : "bg-indigo-500/4"
        } animate-[pulse_6s_infinite]`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full blur-[100px] sm:blur-[130px] transition-colors duration-500 ${
          isDark ? "bg-emerald-500/5" : "bg-emerald-500/2"
        } animate-[pulse_8s_infinite]`} />
      </div>

      {/* 1. Header Banner & Global Telemetry */}
      <header className="relative w-full max-w-5xl z-10 flex flex-col md:flex-row justify-between items-center border-b pb-4 sm:pb-5 gap-4 border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center font-black text-white text-base shadow-md shrink-0">
            I
          </div>
          <div className="text-left">
            <h1 className="text-xs sm:text-sm font-black tracking-widest uppercase">
              ORCHESTRATOR PIPELINE
            </h1>
            <p className="text-[9px] text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-wider">
              AS-IS vs TO-BE ETL Process Control Center
            </p>
          </div>
        </div>

        {/* Global Telemetry Chips */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 text-[9px] font-mono">
          <div className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 ${
            isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xs"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-text-muted">CPU:</span>
            <span className="font-bold">{cpu}%</span>
          </div>
          <div className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 ${
            isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xs"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
            <span className="text-text-muted">RAM:</span>
            <span className="font-bold">{ram} GB</span>
          </div>
          <div className={`px-2.5 py-1.5 rounded-lg border flex items-center gap-1.5 ${
            isDark ? "bg-slate-900/60 border-slate-800" : "bg-white border-slate-200 shadow-xs"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-text-muted">NET:</span>
            <span className="font-bold">{network} MB/s</span>
          </div>
        </div>
      </header>

      {/* Sleek experience loading notice */}
      <div className="relative w-full max-w-5xl z-10 mt-4 -mb-2">
        <div className={`w-full py-2 px-3 rounded-xl border flex items-center justify-center gap-2 text-[10px] sm:text-xs font-bold tracking-wide transition-all ${
          isDark 
            ? "bg-indigo-950/20 border-indigo-500/20 text-indigo-300 shadow-md shadow-indigo-950/10" 
            : "bg-indigo-50/50 border-indigo-100 text-indigo-700 shadow-xs"
        }`}>
          <svg className="w-4.5 h-4.5 text-indigo-500 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
          </svg>
          <span>Please wait for 3 seconds for loading the experience</span>
        </div>
      </div>

      {/* 2. Main Dashboard Layout */}
      <main className="relative w-full max-w-5xl z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-stretch">
        
        {/* LEFT COLUMN: Three Ingestion Phases (5 Cols) */}
        <section className="lg:col-span-5 flex flex-col gap-2.5 justify-center">
          <h3 className={`text-[10px] font-bold uppercase tracking-wider text-left mb-0.5 ${
            isDark ? "text-indigo-400" : "text-indigo-650"
          }`}>
            ACTIVE INGESTION STREAM
          </h3>

          {/* Phase 1: EXTRACT */}
          <div className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 ${
            isDark ? "bg-[#0b1329]/50 border-slate-800" : "bg-white border-slate-200 shadow-xs"
          } ${progress < 35 ? "ring-1 ring-indigo-500/30" : ""}`}>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${extract.color}`}>
                  PHASE 01
                </span>
                <span className="text-[11px] font-bold">EXTRACT DATA</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-text-muted">{extract.status}</span>
            </div>
            <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-900" : "bg-slate-100"}`}>
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-300 ease-out"
                style={{ width: `${extract.progress}%` }}
              />
            </div>
          </div>

          {/* Phase 2: TRANSFORM */}
          <div className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 ${
            isDark ? "bg-[#0b1329]/50 border-slate-800" : "bg-white border-slate-200 shadow-xs"
          } ${progress >= 35 && progress < 75 ? "ring-1 ring-indigo-500/30" : ""}`}>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${transform.color}`}>
                  PHASE 02
                </span>
                <span className="text-[11px] font-bold">TRANSFORM METRICS</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-text-muted">{transform.status}</span>
            </div>
            <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-900" : "bg-slate-100"}`}>
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300 ease-out"
                style={{ width: `${transform.progress}%` }}
              />
            </div>
          </div>

          {/* Phase 3: LOAD */}
          <div className={`p-2.5 sm:p-3 rounded-xl border transition-all duration-300 ${
            isDark ? "bg-[#0b1329]/50 border-slate-800" : "bg-white border-slate-200 shadow-xs"
          } ${progress >= 75 ? "ring-1 ring-indigo-500/30" : ""}`}>
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${load.color}`}>
                  PHASE 03
                </span>
                <span className="text-[11px] font-bold">LOAD RELATIONAL DATA</span>
              </div>
              <span className="text-[9px] font-mono font-bold text-text-muted">{load.status}</span>
            </div>
            <div className={`h-1.5 rounded-full overflow-hidden ${isDark ? "bg-slate-900" : "bg-slate-100"}`}>
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 ease-out"
                style={{ width: `${load.progress}%` }}
              />
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: Interactive SVG Flow Ingestion Diagram (7 Cols) */}
        <section className={`hidden lg:flex lg:col-span-7 flex-col justify-center border p-4 sm:p-5 rounded-2xl relative overflow-hidden transition-all duration-300 ${
          isDark ? "bg-[#080d1a]/85 border-slate-800" : "bg-white border-slate-200 shadow-xs"
        }`}>
          {/* Overlay Status info */}
          <div className="absolute top-4 right-4 flex items-center gap-2 text-[9px] font-mono">
            <span className="text-text-muted">STAGE:</span>
            <span className="font-bold text-indigo-500 dark:text-indigo-400 uppercase">
              {progress < 35 ? "Extracting Raw Files" : progress < 75 ? "Transforming Schema" : "Database Ingestion"}
            </span>
          </div>

          <h3 className={`text-[10px] font-bold uppercase tracking-wider text-left mb-3 ${
            isDark ? "text-indigo-400" : "text-indigo-650"
          }`}>
            PIPELINE FLOW GRAPH ARCHITECTURE
          </h3>

          {/* SVG Pipeline Animation */}
          <div className="w-full flex items-center justify-center py-2">
            <svg viewBox="0 0 520 180" className="w-full max-w-[480px] h-auto overflow-visible">
              {/* Definitions for gradients & glowing filters */}
              <defs>
                <linearGradient id="edgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <stop offset="0%" stopColor="#4f46e5" />
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Connecting Edges/Paths */}
              {/* Path 1: File Storage -> Celery Worker */}
              <path
                d="M 100 90 L 190 90"
                fill="none"
                stroke={isDark ? "#1e293b" : "#e2e8f0"}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 100 90 L 190 90"
                fill="none"
                stroke="url(#edgeGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                className={`transition-all duration-500 ${progress >= 10 ? "opacity-100" : "opacity-20"}`}
              />

              {/* Path 2: Celery Worker -> Database */}
              <path
                d="M 270 90 L 360 90"
                fill="none"
                stroke={isDark ? "#1e293b" : "#e2e8f0"}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 270 90 L 360 90"
                fill="none"
                stroke="url(#edgeGrad)"
                strokeWidth="2"
                strokeLinecap="round"
                className={`transition-all duration-500 ${progress >= 50 ? "opacity-100" : "opacity-20"}`}
              />

              {/* Path 3: Database -> UI Dashboard */}
              <path
                d="M 420 90 L 450 90"
                fill="none"
                stroke={isDark ? "#1e293b" : "#e2e8f0"}
                strokeWidth="4"
                strokeLinecap="round"
              />
              <path
                d="M 420 90 L 450 90"
                fill="none"
                stroke="#10b981"
                strokeWidth="2"
                strokeLinecap="round"
                className={`transition-all duration-500 ${progress >= 80 ? "opacity-100" : "opacity-20"}`}
              />

              {/* Ingestion Data Packets (Pulsating circles moving along the paths) */}
              {progress > 5 && progress < 38 && (
                <circle r="4" fill="#4f46e5" filter="url(#glow)">
                  <animateMotion dur="1.8s" repeatCount="indefinite" path="M 100 90 L 190 90" />
                </circle>
              )}
              {progress >= 38 && progress < 78 && (
                <circle r="4" fill="#6366f1" filter="url(#glow)">
                  <animateMotion dur="1.5s" repeatCount="indefinite" path="M 190 90 L 270 90" />
                </circle>
              )}
              {progress >= 78 && progress < 100 && (
                <circle r="4" fill="#10b981" filter="url(#glow)">
                  <animateMotion dur="1.2s" repeatCount="indefinite" path="M 270 90 L 360 90" />
                </circle>
              )}

              {/* Node 1: Flat File Storage */}
              <g transform="translate(60, 90)">
                <circle
                  r="32"
                  fill={isDark ? "#0f172a" : "#ffffff"}
                  stroke={progress >= 20 ? "#4f46e5" : isDark ? "#1e293b" : "#cbd5e1"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                {/* Document/File Icon */}
                <rect x="-10" y="-12" width="20" height="24" rx="2" fill="none" stroke={progress >= 20 ? "#4f46e5" : "#64748b"} strokeWidth="2" />
                <line x1="-5" y1="-4" x2="5" y2="-4" stroke={progress >= 20 ? "#818cf8" : "#64748b"} strokeWidth="1.5" />
                <line x1="-5" y1="1" x2="5" y2="1" stroke={progress >= 20 ? "#818cf8" : "#64748b"} strokeWidth="1.5" />
                <line x1="-5" y1="6" x2="2" y2="6" stroke={progress >= 20 ? "#818cf8" : "#64748b"} strokeWidth="1.5" />
                <text x="0" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? "#94a3b8" : "#475569"}>Raw CSV Files</text>
              </g>

              {/* Node 2: ETL Engine (Celery/Python Process) */}
              <g transform="translate(230, 90)">
                <circle
                  r="38"
                  fill={isDark ? "#0f172a" : "#ffffff"}
                  stroke={progress >= 35 && progress < 75 ? "#6366f1" : progress >= 75 ? "#10b981" : isDark ? "#1e293b" : "#cbd5e1"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                {/* Outer spin rings for gears */}
                <g className={progress >= 10 && progress < 100 ? "animate-spin origin-center" : ""} style={{ transformOrigin: "0px 0px" }}>
                  <path d="M-12,-4 L-12,4 L-4,12 L4,12 L12,4 L12,-4 L4,-12 L-4,-12 Z" fill="none" stroke={progress >= 35 ? "#6366f1" : "#64748b"} strokeWidth="2" />
                  <circle r="6" fill="none" stroke={progress >= 35 ? "#6366f1" : "#64748b"} strokeWidth="2" />
                </g>
                <text x="0" y="50" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? "#94a3b8" : "#475569"}>Celery ETL Worker</text>
              </g>

              {/* Node 3: PostgreSQL Database */}
              <g transform="translate(390, 90)">
                <circle
                  r="32"
                  fill={isDark ? "#0f172a" : "#ffffff"}
                  stroke={progress >= 75 ? "#10b981" : isDark ? "#1e293b" : "#cbd5e1"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                {/* DB cylinder icon */}
                <path d="M-12,-10 C-12,-14 12,-14 12,-10 L12,10 C12,14 -12,14 -12,10 Z" fill="none" stroke={progress >= 75 ? "#10b981" : "#64748b"} strokeWidth="2" />
                <path d="M-12,-4 C-12,-8 12,-8 12,-4" fill="none" stroke={progress >= 75 ? "#10b981" : "#64748b"} strokeWidth="2" />
                <path d="M-12,3 C-12,-1 12,-1 12,3" fill="none" stroke={progress >= 75 ? "#10b981" : "#64748b"} strokeWidth="2" />
                <text x="0" y="44" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? "#94a3b8" : "#475569"}>Postgres DB</text>
              </g>

              {/* Node 4: Web UI Dashboard */}
              <g transform="translate(485, 90)">
                <circle
                  r="20"
                  fill={isDark ? "#0f172a" : "#ffffff"}
                  stroke={progress >= 95 ? "#10b981" : isDark ? "#1e293b" : "#cbd5e1"}
                  strokeWidth="2"
                  className="transition-all duration-300"
                />
                {/* Visualizer screen icon */}
                <rect x="-8" y="-7" width="16" height="11" rx="1.5" fill="none" stroke={progress >= 95 ? "#10b981" : "#64748b"} strokeWidth="1.5" />
                <line x1="-3" y1="4" x2="3" y2="4" stroke={progress >= 95 ? "#10b981" : "#64748b"} strokeWidth="1.5" />
                <line x1="-5" y1="7" x2="5" y2="7" stroke={progress >= 95 ? "#10b981" : "#64748b"} strokeWidth="1.5" />
                <text x="0" y="32" textAnchor="middle" fontSize="9" fontWeight="bold" fill={isDark ? "#94a3b8" : "#475569"}>Live UI</text>
              </g>
            </svg>
          </div>
        </section>
      </main>

      {/* 3. Terminal Log Console (Bottom Section) */}
      <footer className="relative w-full max-w-5xl z-10 space-y-4">
        {/* Terminal Header */}
        <div className="flex justify-between items-center text-[10px] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className={`font-bold ml-2 ${isDark ? "text-slate-400" : "text-slate-650"}`}>
              console@celery-etl-worker-1:~
            </span>
          </div>
          <div className="text-text-muted">
            Progress: <span className="font-bold font-mono text-indigo-500 dark:text-indigo-400">{progress}%</span>
          </div>
        </div>

        {/* Console Box */}
        <div className={`w-full h-24 sm:h-28 rounded-xl p-4 font-mono text-[9px] sm:text-[10px] overflow-y-auto text-left flex flex-col gap-1.5 shadow-xl border select-text ${
          isDark
            ? "bg-[#030712]/95 border-slate-800 text-emerald-400/90 shadow-black/60"
            : "bg-slate-950 border-slate-800 text-emerald-400 shadow-slate-300/40"
        }`}>
          {logs.map((log, index) => {
            let typeColor = "text-indigo-400";
            if (log.type === "SUCCESS") typeColor = "text-emerald-400 font-bold";
            if (log.type === "WARN") typeColor = "text-amber-400 font-bold";
            if (log.type === "SYSTEM") typeColor = "text-cyan-400 font-bold";

            return (
              <div key={index} className="leading-relaxed flex gap-2 items-start hover:bg-slate-900/30 px-1 rounded transition-all">
                <span className="text-slate-500 select-none shrink-0">{log.timestamp}</span>
                <span className={`select-none shrink-0 ${typeColor}`}>[{log.type}]</span>
                <span className="text-slate-300 select-all">{log.message}</span>
              </div>
            );
          })}
          <div ref={logsEndRef} />

          {/* Active blinking prompt row */}
          {progress < 100 && (
            <div className="flex gap-2 items-center text-slate-500 mt-1">
              <span>{mounted ? new Date().toISOString().split("T")[1].substring(0, 8) : "--:--:--"}</span>
              <span className="text-indigo-400 font-bold">[WAIT]</span>
              <span className="text-emerald-400 flex items-center gap-1">
                Awaiting telemetry feeds
                <span className="w-1.5 h-3.5 bg-emerald-400 animate-pulse" />
              </span>
            </div>
          )}
        </div>

        {/* Loader Bottom Nav Row */}
        <div className="flex justify-between items-center pt-2 gap-4">
          <div className="text-[9px] text-text-muted italic">
            * This simulation mimics the exact ETL load orchestration script executed in Celery.
          </div>

          <button
            onClick={handleSkip}
            className={`px-4 py-2 text-[10px] font-bold rounded-full border transition-all cursor-pointer flex items-center gap-1.5 hover:scale-105 active:scale-95 ${
              isDark
                ? "bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-850"
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 shadow-xs hover:bg-slate-50"
            }`}
          >
            Skip Ingestion Pipeline
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </footer>
      </div>
    </div>
  );
}
