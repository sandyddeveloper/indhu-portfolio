"use client";

import { useState } from "react";

interface ProcessStep {
  id: string;
  label: string;
  type: "start" | "task" | "gateway" | "end" | "subprocess";
  x: number;
  y: number;
  width: number;
  height: number;
  details: string;
  role: string;
  status?: "bottleneck" | "standard" | "automated" | "success";
  substeps?: { id: string; title: string; details: string; status?: string }[];
}

const AS_IS_STEPS: ProcessStep[] = [
  {
    id: "start",
    label: "Dataset Received",
    type: "start",
    x: 40,
    y: 95,
    width: 30,
    height: 30,
    details: "A new batch of retail job listings and compensation telemetry datasets (CSVs) is delivered to the staging directory by external web scrapers/crawlers.",
    role: "External"
  },
  {
    id: "manual-download",
    label: "Manual Download & Unzip",
    type: "task",
    x: 110,
    y: 75,
    width: 100,
    height: 70,
    details: "The engineer manually downloads large zip archives from remote cloud storage or shared folders, unzips them locally, and stages raw files in local directories. Average duration: 10 minutes.",
    role: "Data Engineer",
    status: "bottleneck"
  },
  {
    id: "manual-clean",
    label: "Manual Excel Cleaning",
    type: "task",
    x: 250,
    y: 75,
    width: 110,
    height: 70,
    details: "The engineer inspects raw data inside Excel, manually deletes irrelevant columns, replaces blank rows with NULL placeholders, and fixes date casting structures. Average duration: 25 minutes.",
    role: "Data Engineer",
    status: "bottleneck"
  },
  {
    id: "manual-sql",
    label: "Write & Run SQL Inserts",
    type: "task",
    x: 400,
    y: 75,
    width: 110,
    height: 70,
    details: "Writes ad-hoc INSERT statements using script templates. Prone to script syntax failures, primary key violations, and database column mismatch crashes. Average duration: 15 minutes.",
    role: "Data Engineer",
    status: "bottleneck"
  },
  {
    id: "gateway-errors",
    label: "SQL Clashes?",
    type: "gateway",
    x: 550,
    y: 90,
    width: 40,
    height: 40,
    details: "Conditional check: Did any raw row trigger primary key conflicts, duplicate records, or foreign key database constraint failures?",
    role: "Database"
  },
  {
    id: "manual-debug",
    label: "Debug DB Constraints",
    type: "task",
    x: 630,
    y: 170,
    width: 110,
    height: 70,
    details: "Engineer scans server log traces to spot offending rows, manually updates the CSV file structure, cleans partially loaded tables, and re-executes. Average duration: 30 minutes.",
    role: "Data Engineer",
    status: "standard"
  },
  {
    id: "manual-bench",
    label: "Run Aggregations",
    type: "task",
    x: 630,
    y: 75,
    width: 110,
    height: 70,
    details: "Executes calculation scripts manually to build salary histograms, rank top paying employers, and update static data tables. Average duration: 15 minutes.",
    role: "Data Engineer",
    status: "standard"
  },
  {
    id: "end",
    label: "Ingestion Done",
    type: "end",
    x: 780,
    y: 95,
    width: 30,
    height: 30,
    details: "Data loading process complete. Telemetry metrics are loaded and Power BI dashboard is refreshed manually after ~1.5 hours of manual work.",
    role: "System"
  }
];

const TO_BE_STEPS: ProcessStep[] = [
  {
    id: "start",
    label: "ETL Triggered",
    type: "start",
    x: 40,
    y: 95,
    width: 30,
    height: 30,
    details: "Celery beats or an administrator manual trigger starts the CSVETLPipeline job to process the raw dataset telemetry.",
    role: "Celery"
  },
  {
    id: "download",
    label: "Download & Extract Data",
    type: "task",
    x: 100,
    y: 75,
    width: 100,
    height: 70,
    details: "Downloads the raw zip file or folder from Google Drive (defined in RAW_DATA_ZIP_URL env var). It handles Drive virus scanner warning pages, scrapes folder files, and extracts them into the core/data/raw staging directory.",
    role: "System",
    status: "automated",
    substeps: [
      { id: 's1', title: 'Verify Config', details: 'Reads RAW_DATA_ZIP_URL env variable and local storage paths.' },
      { id: 's2', title: 'Google Drive Scrape', details: 'Scrapes folder page HTML to locate ZIP or CSV files to bypass limits.' },
      { id: 's3', title: 'Bypass GDrive warning', details: 'Extracts token and confirmation keys for large file warning pages.' },
      { id: 's4', title: 'Extraction', details: 'Unzips source archive into core/data/raw/ directory structure.' }
    ]
  },
  {
    id: "ingest-refs",
    label: "Ingest Reference Data",
    type: "task",
    x: 230,
    y: 75,
    width: 100,
    height: 70,
    details: "Loads raw reference metadata from industries.csv and skills.csv. It cleans strings, removes duplicates, validates PKs, and performs chunked bulk inserts (ignore_conflicts=True) to avoid constraint failures.",
    role: "System",
    status: "automated",
    substeps: [
      { id: 's1', title: 'Parse CSV in chunks', details: 'Reads industries.csv and skills.csv in chunks of 2,000 using pandas.' },
      { id: 's2', title: 'Type casting', details: 'Parses integer IDs and casts skill codes to short strings.' },
      { id: 's3', title: 'Conflict check', details: 'Filters out IDs that are already present in the database.' },
      { id: 's4', title: 'Bulk Insert', details: 'Calls bulk_create to batch insert records and save database roundtrips.' }
    ]
  },
  {
    id: "ingest-companies",
    label: "Ingest Company Profiles",
    type: "task",
    x: 360,
    y: 75,
    width: 100,
    height: 70,
    details: "Reads companies.csv, company_industries.csv, company_specialities.csv, and employee_counts.csv. Resolves company IDs deterministically via generate_deterministic_id(name) to prevent duplicate profiles.",
    role: "System",
    status: "automated",
    substeps: [
      { id: 's1', title: 'Resolve IDs', details: 'Generates deterministic IDs based on company names to avoid clashes.' },
      { id: 's2', title: 'Process profiles', details: 'Batch cleans and parses company metadata in chunks.' },
      { id: 's3', title: 'Company Relations', details: 'Populates CompanyIndustry and CompanySpecialty lookup tables.' },
      { id: 's4', title: 'Auditing History', details: 'Saves employee history counts for company scale analysis.' }
    ]
  },
  {
    id: "ingest-jobs",
    label: "Ingest Job Postings",
    type: "task",
    x: 490,
    y: 75,
    width: 100,
    height: 70,
    details: "Parses postings.csv, job_skills.csv, job_industries.csv, benefits.csv, and salaries.csv. Cleans descriptions from raw HTML, infers experience levels, and normalizes compensation details.",
    role: "System",
    status: "automated",
    substeps: [
      { id: 's1', title: 'HTML Sanitization', details: 'Cleans postings descriptions of raw HTML script tags.' },
      { id: 's2', title: 'Experience Inference', details: 'Infers experience level (Junior, Mid, Senior) from description texts.' },
      { id: 's3', title: 'Salaries Normalization', details: 'Normalizes hourly vs yearly compensation values to average salaries.' },
      { id: 's4', title: 'Lookup Relations', details: 'Maps skills, benefits, and target industries to job postings.' }
    ]
  },
  {
    id: "benchmarks",
    label: "Compute Benchmarks",
    type: "task",
    x: 620,
    y: 75,
    width: 100,
    height: 70,
    details: "Computes and loads DataAnalystBenchmark and DataScienceSalaryBenchmark. Aggregates salary histories, compiles histograms, ranks top paying companies, and trains predictions.",
    role: "System",
    status: "success",
    substeps: [
      { id: 's1', title: 'Aggregate History', details: 'Calculates average salary trends across years.' },
      { id: 's2', title: 'Build Histograms', details: 'Generates salary frequency bins for salary distribution maps.' },
      { id: 's3', title: 'Company Ranking', details: 'Identifies top 10 companies by average compensation.' },
      { id: 's4', title: 'Prediction Models', details: 'Computes future salary predictions using linear regressions.' }
    ]
  },
  {
    id: "end",
    label: "Load Complete",
    type: "end",
    x: 750,
    y: 95,
    width: 30,
    height: 30,
    details: "All CSV source files processed, cleaned, and loaded into the database. Staging logs are closed, and the Celery task reports success.",
    role: "System"
  }
];

export default function BpmnViewer() {
  const [viewMode, setViewMode] = useState<"AS_IS" | "TO_BE">("TO_BE");
  const [activeStep, setActiveStep] = useState<ProcessStep | null>(null);

  const steps = viewMode === "AS_IS" ? AS_IS_STEPS : TO_BE_STEPS;

  // Connection arrows configuration helper
  const renderConnections = () => {
    if (viewMode === "AS_IS") {
      return (
        <>
          {/* Start -> Download */}
          <path d="M 70 110 L 110 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Download -> Clean */}
          <path d="M 210 110 L 250 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Clean -> SQL Load */}
          <path d="M 361 110 L 400 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* SQL Load -> Gateway */}
          <path d="M 511 110 L 550 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Gateway -> Run Bench (No clashes) */}
          <path d="M 590 110 L 630 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <text x="593" y="102" fill="#10b981" className="text-[8px] font-bold">No Clashes</text>
          {/* Gateway -> Debug Clashes (Yes) */}
          <path d="M 570 130 L 570 205 L 630 205" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <text x="578" y="152" fill="#ef4444" className="text-[8px] font-bold">Clashes</text>
          {/* Debug -> Run Bench */}
          <path d="M 740 205 L 760 205 L 760 130 L 740 130" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Run Bench -> End */}
          <path d="M 740 110 L 780 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        </>
      );
    } else {
      return (
        <>
          {/* Start -> Download */}
          <path d="M 70 110 L 100 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Download -> Ingest Refs */}
          <path d="M 200 110 L 230 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Ingest Refs -> Ingest Companies */}
          <path d="M 330 110 L 360 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Ingest Companies -> Ingest Jobs */}
          <path d="M 460 110 L 490 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Ingest Jobs -> Compute Benchmarks */}
          <path d="M 590 110 L 620 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Compute Benchmarks -> End */}
          <path d="M 720 110 L 750 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        </>
      );
    }
  };

  const getBorderColor = (step: ProcessStep) => {
    if (activeStep?.id === step.id) return "stroke-indigo-600 dark:stroke-indigo-400 stroke-[3px]";
    if (step.status === "bottleneck") return "stroke-rose-500/80 stroke-[2px]";
    if (step.status === "automated") return "stroke-sky-500/80 stroke-[2px]";
    if (step.status === "success") return "stroke-emerald-500/80 stroke-[2px]";
    return "stroke-slate-300 dark:stroke-slate-700 stroke-[1.5px]";
  };

  const getFillColor = (step: ProcessStep) => {
    if (activeStep?.id === step.id) return "fill-indigo-50 dark:fill-indigo-950/80";
    if (step.status === "bottleneck") return "fill-rose-50 dark:fill-rose-950/15";
    if (step.status === "automated") return "fill-sky-50 dark:fill-sky-950/15";
    if (step.status === "success") return "fill-emerald-50 dark:fill-emerald-950/15";
    return "fill-background";
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Controls & Badges */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-sidebar-bg/40 p-4 rounded-xl border border-card-border transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-ping"></div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Process Flow Gap Analysis</h4>
            <p className="text-xs text-text-muted">Comparing manual bottlenecks with optimized TO-BE architecture</p>
          </div>
        </div>

        <div className="flex bg-background/80 p-1 rounded-xl border border-card-border shrink-0">
          <button
            onClick={() => {
              setViewMode("AS_IS");
              setActiveStep(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              viewMode === "AS_IS"
                ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                : "text-text-muted hover:text-foreground"
            }`}
          >
            🔴 AS-IS (Manual & Slow)
          </button>
          <button
            onClick={() => {
              setViewMode("TO_BE");
              setActiveStep(null);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              viewMode === "TO_BE"
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                : "text-text-muted hover:text-foreground"
            }`}
          >
            🟢 TO-BE (Automated & API)
          </button>
        </div>
      </div>

      {/* BPMN Interactive Map */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Container */}
        <div className="lg:col-span-2 bg-sidebar-bg/60 border border-card-border rounded-xl p-4 overflow-x-auto relative flex items-center justify-center min-h-[300px] transition-colors duration-300">
          <svg
            className="min-w-[700px] h-[270px] select-none"
            viewBox="0 0 850 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Arrow Marker */}
              <marker
                id="arrow"
                viewBox="0 0 10 10"
                refX="10"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#475569" />
              </marker>
            </defs>

            {/* Swimlane background dividers */}
            <line x1="10" y1="40" x2="840" y2="40" className="stroke-card-border" strokeDasharray="3 3" />
            <text x="15" y="25" className="fill-text-muted text-[10px] font-bold uppercase tracking-widest">Process Flow Mapping</text>

            {/* Render Arrow Paths */}
            {renderConnections()}

            {/* Render BPMN Nodes */}
            {steps.map((step) => {
              if (step.type === "start") {
                return (
                  <g
                    key={step.id}
                    className="cursor-pointer group"
                    onClick={() => setActiveStep(step)}
                    onMouseEnter={() => setActiveStep(step)}
                  >
                    <circle
                      cx={step.x + 15}
                      cy={step.y + 15}
                      r="15"
                      className={`fill-background transition-colors duration-200 ${
                        activeStep?.id === step.id ? "stroke-indigo-500 stroke-2" : "stroke-slate-400 dark:stroke-slate-500"
                      }`}
                    />
                    <circle cx={step.x + 15} cy={step.y + 15} r="11" fill="none" className="stroke-slate-200 dark:stroke-slate-800" />
                    <text
                      x={step.x + 15}
                      y={step.y + 40}
                      textAnchor="middle"
                      className="fill-text-muted text-[9px] font-semibold pointer-events-none"
                    >
                      {step.label}
                    </text>
                  </g>
                );
              }

              if (step.type === "end") {
                return (
                  <g
                    key={step.id}
                    className="cursor-pointer group"
                    onClick={() => setActiveStep(step)}
                    onMouseEnter={() => setActiveStep(step)}
                  >
                    <circle
                      cx={step.x + 15}
                      cy={step.y + 15}
                      r="15"
                      className={`fill-background transition-colors duration-200 ${
                        activeStep?.id === step.id ? "stroke-indigo-500 stroke-2" : "stroke-slate-400 dark:stroke-slate-500"
                      }`}
                      strokeWidth="3"
                    />
                    <text
                      x={step.x + 15}
                      y={step.y + 40}
                      textAnchor="middle"
                      className="fill-text-muted text-[9px] font-semibold pointer-events-none"
                    >
                      {step.label}
                    </text>
                  </g>
                );
              }

              if (step.type === "gateway") {
                // Diamond shape
                const d = `M ${step.x + 20} ${step.y} L ${step.x + 40} ${step.y + 20} L ${step.x + 20} ${step.y + 40} L ${step.x} ${step.y + 20} Z`;
                return (
                  <g
                    key={step.id}
                    className="cursor-pointer group"
                    onClick={() => setActiveStep(step)}
                    onMouseEnter={() => setActiveStep(step)}
                  >
                    <path
                      d={d}
                      className={`fill-background transition-colors duration-200 ${
                        activeStep?.id === step.id ? "stroke-indigo-500 stroke-2" : "stroke-slate-400 dark:stroke-slate-500"
                      }`}
                      strokeWidth="1.5"
                    />
                    <text
                      x={step.x + 20}
                      y={step.y + 24}
                      textAnchor="middle"
                      className="fill-foreground text-[12px] font-black pointer-events-none"
                    >
                      X
                    </text>
                    <text
                      x={step.x + 20}
                      y={step.y - 8}
                      textAnchor="middle"
                      className="fill-text-muted text-[9px] font-bold pointer-events-none"
                    >
                      {step.label}
                    </text>
                  </g>
                );
              }

              // Standard Process Task Box
              return (
                <g
                  key={step.id}
                  className="cursor-pointer group transition-transform duration-200"
                  onClick={() => setActiveStep(step)}
                  onMouseEnter={() => setActiveStep(step)}
                >
                  {/* Task Box */}
                  <rect
                    x={step.x}
                    y={step.y}
                    width={step.width}
                    height={step.height}
                    rx="8"
                    className={`${getFillColor(step)} ${getBorderColor(step)} transition-all duration-200`}
                  />
                  {/* Text Container */}
                  <foreignObject
                    x={step.x + 6}
                    y={step.y + 6}
                    width={step.width - 12}
                    height={step.height - 12}
                    className="pointer-events-none"
                  >
                    <div className="w-full h-full flex flex-col justify-between">
                      <div className="text-[9px] text-text-muted font-bold uppercase tracking-wider">
                        {step.role}
                      </div>
                      <div className="text-[10px] text-foreground font-semibold leading-tight line-clamp-2">
                        {step.label}
                      </div>
                      {step.status === "bottleneck" && (
                        <div className="text-[8px] text-rose-600 dark:text-rose-400 font-bold tracking-tight">⚠️ BOTTLENECK</div>
                      )}
                      {step.status === "automated" && (
                        <div className="text-[8px] text-sky-600 dark:text-sky-400 font-bold tracking-tight">⚡ API AUTOMATED</div>
                      )}
                      {step.status === "success" && (
                        <div className="text-[8px] text-emerald-600 dark:text-emerald-400 font-bold tracking-tight">✨ SUCCESS</div>
                      )}
                    </div>
                  </foreignObject>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Info Panel / Details */}
        <div className="bg-card-bg border border-card-border rounded-xl p-5 flex flex-col justify-between transition-colors duration-300">
          {activeStep ? (
            <div className="flex flex-col h-full justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-card-border pb-3 mb-3">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">
                    {activeStep.type} details
                  </span>
                  <span className="bg-bg-hover text-text-muted text-[10px] font-semibold px-2 py-0.5 rounded">
                    Actor: {activeStep.role}
                  </span>
                </div>
                <h5 className="text-base font-bold text-foreground mb-2">{activeStep.label}</h5>
                <p className="text-xs text-text-muted leading-relaxed">{activeStep.details}</p>
                {/* Task step-by-step checklist panel */}
                {activeStep.substeps && (
                  <div className="mt-3 border-t border-card-border/60 pt-3">
                    <h6 className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mb-2 uppercase tracking-wide">Tasks Checklist / Steps</h6>
                    <ol className="text-[11px] text-text-muted list-decimal list-inside space-y-1.5">
                      {activeStep.substeps.map((s) => (
                        <li key={s.id} className="pl-1">
                          <span className="font-bold text-[10.5px] text-foreground">{s.title}: </span>
                          <span className="text-[10.5px] text-text-muted">{s.details}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>

              {activeStep.status === "bottleneck" && (
                <div className="bg-rose-500/5 border border-rose-500/25 rounded-lg p-3 mt-4">
                  <div className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                    <span>⚠️ Bottleneck Diagnosis</span>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1">
                    Adds severe latency, increases manual engineering work, and is highly prone to database schema clashes or duplicate records.
                  </p>
                </div>
              )}
              {activeStep.status === "automated" && (
                <div className="bg-sky-500/5 border border-sky-500/25 rounded-lg p-3 mt-4">
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <span>⚡ Process Automation</span>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1">
                    Executed asynchronously in the background by Celery workers in chunks of 2,000 records. Zero manual overhead, automated cleaning, and self-correcting duplication.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-10 h-full">
              <svg
                className="w-8 h-8 text-text-muted opacity-40 mb-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                />
              </svg>
              <h5 className="text-sm font-bold text-text-muted">Interactive Map Sandbox</h5>
              <p className="text-xs text-text-muted/70 max-w-xs mt-1.5">
                Hover over or click any task box or event circle in the flow diagram to inspect operational telemetry and business analysis annotations.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
