"use client";

import { useState } from "react";

interface CaseStudyStep {
  title: string;
  subtitle: string;
  content: string[];
  metrics?: { label: string; value: string }[];
}

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  duration: string;
  impactMetric: string;
  steps: {
    discovery: CaseStudyStep;
    analysis: CaseStudyStep;
    documentation: CaseStudyStep;
    solution: CaseStudyStep;
    impact: CaseStudyStep;
  };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "healthcare",
    title: "Healthcare Patient Intake & Scheduling Automation",
    category: "Healthcare / Digital Transformation",
    summary: "Redesigned the patient registration lifecycle for a regional clinic network, reducing patient drop-off rates and streamlining operational efficiency.",
    role: "Lead Business Analyst",
    duration: "6 Months",
    impactMetric: "85% intake wait reduction",
    steps: {
      discovery: {
        title: "Phase 1: Discovery & Research",
        subtitle: "Uncovering the scheduling bottlenecks",
        content: [
          "Conducted 12 contextual inquiries and shadowing sessions with clinic reception staff to map out the manual scheduling workflow.",
          "Discovered that front-desk staff spent an average of 12 minutes per patient verifying insurance eligibility over the phone.",
          "Identified a major paint point: 18% of patients abandoned booking due to lengthy telephone hold times."
        ],
        metrics: [
          { label: "Shadowing Sessions", value: "12 Staff" },
          { label: "Verification Time", value: "12 min" },
          { label: "Booking Churn", value: "18%" }
        ]
      },
      analysis: {
        title: "Phase 2: Gap & Process Analysis",
        subtitle: "Analyzing AS-IS vs TO-BE states",
        content: [
          "Developed detailed AS-IS process maps in BPMN 2.0 highlighting handoffs, delays, and redundant validation checks.",
          "Conducted a Root Cause Analysis (Fishbone diagram) pointing to the lack of API integrations with top insurance clearinghouses.",
          "Formulated the TO-BE process map, proposing automated, real-time insurance verification at the point of booking."
        ],
        metrics: [
          { label: "BPMN Process Steps", value: "24 down to 9" },
          { label: "Clearinghouse APIs", value: "3 Integrated" }
        ]
      },
      documentation: {
        title: "Phase 3: Requirements & User Stories",
        subtitle: "Translating business needs into technical specs",
        content: [
          "Authored a comprehensive Business Requirements Document (BRD) and obtained sign-off from Chief Medical Officer and IT Director.",
          "Drafted 45+ Jira User Stories with clear Acceptance Criteria using the Gherkin format (Given-When-Then).",
          "Created interactive low-fidelity wireframes in Balsamiq for the patient-facing intake portal and shared with stakeholder focus groups."
        ],
        metrics: [
          { label: "Jira User Stories", value: "45+" },
          { label: "BRD Sign-off", value: "100% Approved" }
        ]
      },
      solution: {
        title: "Phase 4: Scrum Delivery & Solutioning",
        subtitle: "Collaborating with developers to build the solution",
        content: [
          "Partnered closely with the engineering lead in daily stand-ups and backlog grooming to resolve requirement ambiguities.",
          "Facilitated User Acceptance Testing (UAT) sessions, creating UAT test cases and tracking defect triage in Jira.",
          "Managed change readiness training sessions for 35+ clinic managers and receptionists prior to roll-out."
        ],
        metrics: [
          { label: "Sprints Managed", value: "12 Sprints" },
          { label: "Defects Resolved", value: "98% (Critical)" }
        ]
      },
      impact: {
        title: "Phase 5: Measurable Outcomes & Value",
        subtitle: "The quantitative and qualitative results",
        content: [
          "Patient intake wait time plummeted from 14 minutes to 2 minutes, yielding an 85% drop in intake duration.",
          "Eliminated manual insurance entry errors by 92%, resulting in faster billing cycles and fewer denied claims.",
          "Secured operational cost savings of $120,000 annually by freeing clinic staff for high-value patient care."
        ],
        metrics: [
          { label: "Wait Time Saved", value: "-85%" },
          { label: "Errors Reduced", value: "-92%" },
          { label: "Annual Savings", value: "$120k" }
        ]
      }
    }
  },
  {
    id: "supply-chain",
    title: "E-Commerce Supply Chain & Inventory Optimization",
    category: "Retail / Data Analytics",
    summary: "Built a predictive inventory modeling strategy and enterprise BI dashboard to optimize safety stock and lower inventory carrying costs.",
    role: "Senior Business / Data Analyst",
    duration: "5 Months",
    impactMetric: "$430k capital unlocked",
    steps: {
      discovery: {
        title: "Phase 1: Discovery & Research",
        subtitle: "Identifying inventory leaks",
        content: [
          "Interviewed Supply Chain VP, warehouse supervisors, and purchasing managers to isolate ordering challenges.",
          "Discovered that inventory levels were managed using static Excel sheets that failed to factor in supplier lead time variations.",
          "Extracted and audited 2 years of sales and inventory transaction logs from the Oracle ERP system."
        ],
        metrics: [
          { label: "Data Audited", value: "24 Months" },
          { label: "ERP Transactions", value: "500k+" }
        ]
      },
      analysis: {
        title: "Phase 2: Data Analysis & Modeling",
        subtitle: "Calculating optimal safety stock levels",
        content: [
          "Wrote SQL queries to calculate stockout rates, lead-time variance, and safety stock requirements for 1,200 SKUs.",
          "Conducted ABC/XYZ classification analysis to identify high-value/highly-volatile products.",
          "Designed a dynamic safety stock formula that updates automatically based on a 30-day rolling demand average."
        ],
        metrics: [
          { label: "SKUs Classified", value: "1,200 SKUs" },
          { label: "Calculated Stockouts", value: "14% baseline" }
        ]
      },
      documentation: {
        title: "Phase 3: Dashboard Wireframing & Specs",
        subtitle: "Designing visual telemetry for inventory",
        content: [
          "Created mockups of an interactive inventory telemetry dashboard, incorporating key user journeys.",
          "Documented data mapping specifications mapping physical Oracle database tables to target dashboard fields.",
          "Defined Service Level Agreements (SLAs) for stock level alerts (Red/Yellow/Green thresholds)."
        ],
        metrics: [
          { label: "Alert Rules", value: "3 Thresholds" },
          { label: "Data Fields Mapped", value: "48 Elements" }
        ]
      },
      solution: {
        title: "Phase 4: Power BI Dashboard Engineering",
        subtitle: "Developing and launching the telemetry system",
        content: [
          "Developed and launched the interactive inventory analytics dashboard in Power BI, connecting to the SQL server.",
          "Created DAX (Data Analysis Expressions) measures for rolling sales, stock turn rate, and days of inventory coverage.",
          "Conducted beta testing with 5 buyers, refining dashboard filtering based on feedback."
        ],
        metrics: [
          { label: "DAX Measures", value: "22 Measures" },
          { label: "Dashboard Users", value: "18 Buyers" }
        ]
      },
      impact: {
        title: "Phase 5: Financial & Operations Value",
        subtitle: "Unlocking millions in stuck capital",
        content: [
          "Reduced stockout occurrences on high-demand items by 40%, recovering lost e-commerce revenue.",
          "Decreased inventory carrying costs by 18% through reduction of slow-moving safety stock.",
          "Freed up $430,000 in working capital within 6 months, exceeding the project's initial business case target by 22%."
        ],
        metrics: [
          { label: "Stockouts", value: "-40%" },
          { label: "Carrying Cost", value: "-18%" },
          { label: "Capital Freed", value: "$430k" }
        ]
      }
    }
  }
];

export default function CaseStudyExplorer() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(CASE_STUDIES[0]);
  const [activeTab, setActiveTab] = useState<keyof CaseStudy["steps"]>("discovery");

  const stepsList: { key: keyof CaseStudy["steps"]; label: string; number: string }[] = [
    { key: "discovery", label: "Discovery", number: "01" },
    { key: "analysis", label: "Analysis", number: "02" },
    { key: "documentation", label: "Specs", number: "03" },
    { key: "solution", label: "Solution", number: "04" },
    { key: "impact", label: "Impact", number: "05" }
  ];

  const currentStep = selectedCase.steps[activeTab];

  return (
    <div className="w-full bg-card-bg border border-card-border rounded-2xl overflow-hidden glow-indigo transition-all duration-300">
      {/* Selector Header */}
      <div className="flex flex-col md:flex-row border-b border-card-border bg-sidebar-bg/60 p-4 gap-4 items-center justify-between transition-colors duration-300">
        <div className="flex flex-wrap gap-2">
          {CASE_STUDIES.map((cs) => (
            <button
              key={cs.id}
              onClick={() => {
                setSelectedCase(cs);
                setActiveTab("discovery");
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                selectedCase.id === cs.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "bg-bg-hover text-text-muted hover:text-foreground"
              }`}
            >
              {cs.id === "healthcare" ? "🏥 Healthcare Automation" : "📦 Supply Chain Analytics"}
            </button>
          ))}
        </div>
        <div className="flex gap-4 text-xs text-text-muted">
          <div>
            <span className="text-text-muted/70 font-medium">Role:</span>{" "}
            <span className="text-foreground font-semibold">{selectedCase.role}</span>
          </div>
          <div className="hidden sm:block border-l border-card-border h-4"></div>
          <div>
            <span className="text-text-muted/70 font-medium">Duration:</span>{" "}
            <span className="text-foreground font-semibold">{selectedCase.duration}</span>
          </div>
        </div>
      </div>

      {/* Case Summary Panel */}
      <div className="p-6 bg-card-bg/25 border-b border-card-border transition-colors duration-300">
        <span className="text-xs text-indigo-500 dark:text-indigo-400 font-bold uppercase tracking-widest">{selectedCase.category}</span>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mt-1 mb-2">{selectedCase.title}</h3>
        <p className="text-sm text-text-muted leading-relaxed max-w-4xl">{selectedCase.summary}</p>
      </div>

      {/* Stepper Navigation */}
      <div className="bg-sidebar-bg/40 border-b border-card-border px-4 py-3 transition-colors duration-300">
        <div className="flex justify-between items-center max-w-3xl mx-auto overflow-x-auto gap-4 no-scrollbar">
          {stepsList.map((step, idx) => {
            const isActive = activeTab === step.key;
            return (
              <button
                key={step.key}
                onClick={() => setActiveTab(step.key)}
                className="flex items-center gap-2 py-2 px-1 focus:outline-none group relative whitespace-nowrap"
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all ${
                    isActive
                      ? "bg-indigo-600 border-indigo-500 text-white"
                      : "bg-background border-card-border text-text-muted group-hover:border-slate-400 dark:group-hover:border-slate-600 group-hover:text-foreground"
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-xs font-semibold transition-colors ${
                    isActive ? "text-indigo-600 dark:text-indigo-400" : "text-text-muted group-hover:text-foreground"
                  }`}
                >
                  {step.label}
                </span>

                {/* Progress bar line connecting buttons */}
                {idx < stepsList.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 left-[calc(100%+8px)] w-[calc((100vw-600px)/5)] h-[1px] bg-card-border pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="p-6 md:p-8 min-h-[320px] flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs text-text-muted/70 font-semibold">{currentStep.subtitle}</span>
              <h4 className="text-lg font-bold text-foreground mt-0.5">{currentStep.title}</h4>
            </div>
            <div className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/20 shrink-0">
              {selectedCase.impactMetric}
            </div>
          </div>

          <ul className="space-y-3.5 mb-8">
            {currentStep.content.map((bullet, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-text-muted leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0 animate-pulse" />
                <span className="text-foreground/90">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics Highlight Row */}
        {currentStep.metrics && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-card-border pt-6 bg-card-bg/10 -mx-6 md:-mx-8 px-6 md:px-8">
            {currentStep.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-background/60 p-4 rounded-xl border border-card-border hover:border-indigo-500/20 transition-all shadow-xs"
              >
                <div className="text-2xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">{metric.value}</div>
                <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider mt-1">{metric.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
