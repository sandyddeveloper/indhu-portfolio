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
    label: "Patient Arrives",
    type: "start",
    x: 40,
    y: 95,
    width: 30,
    height: 30,
    details: "Patient enters the clinic, triggering the physical check-in workflow.",
    role: "Patient"
  },
  {
    id: "form-fill",
    label: "Fill Paper Form",
    type: "task",
    x: 110,
    y: 75,
    width: 100,
    height: 70,
    details: "Patient manually fills out a multi-page clipboard form. Common source of legibility issues and transcription errors.",
    role: "Patient",
    status: "bottleneck"
  },
  {
    id: "transcribe",
    label: "Transcribe Data to EHR",
    type: "task",
    x: 250,
    y: 75,
    width: 110,
    height: 70,
    details: "Receptionist manually types patient data from the paper form into the Electronic Health Record system. Average duration: 4 minutes.",
    role: "Receptionist",
    status: "bottleneck"
  },
  {
    id: "phone-verify",
    label: "Verify Insurance via Phone",
    type: "task",
    x: 400,
    y: 75,
    width: 110,
    height: 70,
    details: "Receptionist calls insurance provider clearinghouse to verify eligibility. Average duration: 12 minutes. Major delay source.",
    role: "Receptionist",
    status: "bottleneck"
  },
  {
    id: "gateway-eligible",
    label: "Eligible?",
    type: "gateway",
    x: 550,
    y: 90,
    width: 40,
    height: 40,
    details: "Conditional check: Does the patient have active coverage matching the scheduled provider?",
    role: "Receptionist"
  },
  {
    id: "billing-reconcile",
    label: "Reconcile Churn & Billing",
    type: "task",
    x: 630,
    y: 170,
    width: 110,
    height: 70,
    details: "If ineligible, receptionist must manually coordinate with patient to retrieve alternative cards, causing delays or booking cancellation.",
    role: "Receptionist",
    status: "standard"
  },
  {
    id: "checkin-complete",
    label: "Complete Check-in",
    type: "task",
    x: 630,
    y: 75,
    width: 110,
    height: 70,
    details: "Patient check-in is complete, patient takes a seat in the waiting area.",
    role: "Receptionist",
    status: "standard"
  },
  {
    id: "end",
    label: "Intake Done",
    type: "end",
    x: 780,
    y: 95,
    width: 30,
    height: 30,
    details: "Patient is queued in the waiting room to see the doctor.",
    role: "System"
  }
];

const TO_BE_STEPS: ProcessStep[] = [
  {
    id: "etl-pipeline",
    label: "Automated ETL Pipeline",
    type: "task",
    x: 320,
    y: 95,
    width: 240,
    height: 110,
    details: "Background Celery ETL pipeline downloads and ingests raw CSV datasets (see rask.py) — automated data enrichment and normalization.",
    role: "System",
    status: "automated",
    substeps: [
      { id: 's1', title: 'Check config', details: 'Read RAW_DATA_ZIP_URL environment variable and local data paths.' },
      { id: 's2', title: 'Resolve source', details: 'Detect URL type (direct ZIP, Google Drive folder, or individual CSVs).' },
      { id: 's3', title: 'Download files', details: 'Download ZIP or CSVs; handle Google Drive confirmation pages and large-file flows.' },
      { id: 's4', title: 'Extract & stage', details: 'Extract ZIP to raw data directory and stage CSVs for parsing.' },
      { id: 's5', title: 'Parse & clean', details: 'Parse CSVs with pandas, normalize types, and run clean_records for NaN handling.' },
      { id: 's6', title: 'Enrich & normalize', details: 'Run normalization utilities (resolve_company_ids, normalize_api_salary, generate_deterministic_id).' },
      { id: 's7', title: 'Chunked DB load', details: 'Insert/update rows in chunks to avoid DB constraints; track loaded IDs to prevent duplicates.' },
      { id: 's8', title: 'Post-processing', details: 'Run benchmark imports, salary aggregations, and any API prediction jobs.' },
      { id: 's9', title: 'Logging & fallback', details: 'Log progress, handle errors, and apply fallback direct-download attempts when needed.' },
      { id: 's10', title: 'Cleanup', details: 'Remove temp zip files and mark pipeline run complete.' }
    ]
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
          {/* Start -> Form Fill */}
          <path d="M 70 110 L 110 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Form Fill -> Transcribe */}
          <path d="M 210 110 L 250 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Transcribe -> Phone Verify */}
          <path d="M 360 110 L 400 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Phone Verify -> Gateway */}
          <path d="M 510 110 L 550 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Gateway -> Checkin (Yes) */}
          <path d="M 590 110 L 630 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <text x="598" y="102" fill="#10b981" className="text-[10px] font-bold">Yes</text>
          {/* Gateway -> Reconcile (No) */}
          <path d="M 570 130 L 570 205 L 630 205" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <text x="578" y="152" fill="#ef4444" className="text-[10px] font-bold">No</text>
          {/* Reconcile -> Checkin */}
          <path d="M 740 205 L 760 205 L 760 130 L 740 130" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Checkin -> End */}
          <path d="M 740 110 L 780 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
        </>
      );
    } else {
      return (
        <>
          {/* Start -> Submit Digital Form */}
          <path d="M 70 110 L 110 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Submit -> API Verification */}
          <path d="M 225 110 L 260 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* no connections in simplified TO-BE (only automated ETL node) */}
          {/* Gateway -> Auto Checkin (Yes) */}
          <path d="M 460 110 L 500 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <text x="468" y="102" fill="#10b981" className="text-[10px] font-bold">Yes</text>
          {/* Gateway -> Reception Triage (No) */}
          <path d="M 440 130 L 440 205 L 500 205" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          <text x="448" y="152" fill="#ef4444" className="text-[10px] font-bold">No</text>
          {/* Reception Triage -> Auto Checkin */}
          <path d="M 610 205 L 630 205 L 630 130 L 610 130" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
          {/* Auto Checkin -> End */}
          <path d="M 610 110 L 650 110" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="2" fill="none" markerEnd="url(#arrow)" />
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
                {/* ETL step-by-step panel */}
                {activeStep.id === 'etl-pipeline' && activeStep.substeps && (
                  <div className="mt-3">
                    <h6 className="text-[11px] font-bold text-text-muted mb-2">Automated ETL Pipeline — Step-by-step</h6>
                    <ol className="text-[12px] text-text-muted list-decimal list-inside space-y-2">
                      {activeStep.substeps.map((s) => (
                        <li key={s.id} className="">
                          <div className="font-semibold text-[11px] text-foreground">{s.title}</div>
                          <div className="text-[11px] text-text-muted">{s.details}</div>
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
                    Adds severe lag time to patient throughput and increases reception workload. Targets of TO-BE refactoring.
                  </p>
                </div>
              )}
              {activeStep.status === "automated" && (
                <div className="bg-sky-500/5 border border-sky-500/25 rounded-lg p-3 mt-4">
                  <div className="text-xs font-bold text-sky-600 dark:text-sky-400 flex items-center gap-1.5">
                    <span>⚡ Process Optimization</span>
                  </div>
                  <p className="text-[11px] text-text-muted mt-1">
                    Replaced physical queues with asynchronous digital handshakes, reducing waiting queue overhead to nearly zero.
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
