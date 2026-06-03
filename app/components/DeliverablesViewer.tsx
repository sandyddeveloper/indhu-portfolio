"use client";

import { useState } from "react";

type DeliverableType = "BRD" | "KANBAN" | "WIREFRAME";

export default function DeliverablesViewer() {
  const [activeTab, setActiveTab] = useState<DeliverableType>("WIREFRAME");

  // Wireframe states
  const [patientName, setPatientName] = useState("");
  const [insuranceId, setInsuranceId] = useState("");
  const [isScanned, setIsScanned] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);
  const [checkinStep, setCheckinStep] = useState<"form" | "success">("form");

  const handleSimulateScan = () => {
    setScanLoading(true);
    setTimeout(() => {
      setPatientName("John Doe");
      setInsuranceId("BCBS-8930219-X");
      setIsScanned(true);
      setScanLoading(false);
    }, 1200);
  };

  const handleResetWireframe = () => {
    setPatientName("");
    setInsuranceId("");
    setIsScanned(false);
    setCheckinStep("form");
  };

  return (
    <div className="w-full bg-card-bg border border-card-border rounded-2xl overflow-hidden glow-indigo transition-all duration-300">
      {/* Tabs Header */}
      <div className="flex border-b border-card-border bg-sidebar-bg/60 p-2 md:p-4 gap-2 transition-colors duration-300">
        <button
          onClick={() => setActiveTab("WIREFRAME")}
          className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "WIREFRAME"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-text-muted hover:text-foreground hover:bg-bg-hover"
          }`}
        >
          📱 Portal Wireframe Mockup
        </button>
        <button
          onClick={() => setActiveTab("BRD")}
          className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "BRD"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-text-muted hover:text-foreground hover:bg-bg-hover"
          }`}
        >
          📄 BRD / FRD Document
        </button>
        <button
          onClick={() => setActiveTab("KANBAN")}
          className={`flex-1 md:flex-none px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "KANBAN"
              ? "bg-indigo-600 text-white shadow-md"
              : "text-text-muted hover:text-foreground hover:bg-bg-hover"
          }`}
        >
          📋 User Stories Board
        </button>
      </div>

      {/* Content Area */}
      <div className="p-6 bg-card-bg/25 transition-colors duration-300">
        {/* Tab 1: Wireframe Simulator */}
        {activeTab === "WIREFRAME" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2">
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">Interactive Spec</span>
              <h4 className="text-lg font-bold text-foreground mt-1 mb-3">UI Wireframe Simulator</h4>
              <p className="text-xs text-text-muted leading-relaxed mb-4">
                This simulator showcases a low-fidelity wireframe designed for the <strong>Patient Intake Kiosk / Mobile App</strong>. 
                It validates requirements for instant OCR scanning and API validation before check-in is complete.
              </p>
              <div className="bg-background border border-card-border rounded-xl p-4 space-y-3 transition-colors duration-300">
                <h5 className="text-xs font-bold text-foreground">BA Specifications Demonstrated:</h5>
                <ul className="space-y-2 text-[11px] text-text-muted">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">REQ-01:</span>
                    <span>OCR autofill capabilities for Insurance Card scanning.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">REQ-02:</span>
                    <span>Real-time validation against insurance providers database.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">REQ-03:</span>
                    <span>Offline eligibility exceptions routed immediately to receptionist dashboard.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Simulated UI Screen */}
            <div className="lg:col-span-3 flex justify-center">
              <div className="w-full max-w-[340px] bg-background border-[6px] border-slate-350 dark:border-slate-800 rounded-[36px] overflow-hidden shadow-2xl relative transition-colors duration-300">
                {/* Mobile Status Bar */}
                <div className="bg-sidebar-bg px-6 py-2.5 flex justify-between items-center text-[10px] text-text-muted font-bold border-b border-card-border transition-colors duration-300">
                  <span>9:41 AM</span>
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2.5 h-1.5 bg-text-muted/60 rounded-xs"></div>
                    <div className="w-1.5 h-1.5 bg-text-muted/60 rounded-full"></div>
                  </div>
                </div>

                {/* Wireframe Canvas */}
                <div className="p-5 min-h-[420px] flex flex-col justify-between bg-background transition-colors duration-300">
                  {checkinStep === "form" ? (
                    <>
                      {/* Header */}
                      <div className="text-center mb-6">
                        <div className="w-10 h-10 bg-indigo-500/10 rounded-full flex items-center justify-center mx-auto mb-2 border border-indigo-500/20">
                          <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h5 className="text-sm font-bold text-foreground">Clinic Check-in</h5>
                        <p className="text-[10px] text-text-muted">Please scan card or enter details</p>
                      </div>

                      {/* Form Body */}
                      <div className="space-y-4 flex-1">
                        {/* Scan Trigger */}
                        <button
                          onClick={handleSimulateScan}
                          disabled={scanLoading}
                          className="w-full border border-dashed border-indigo-500/30 bg-indigo-500/5 hover:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold py-4 rounded-xl flex flex-col items-center gap-1.5 transition-colors disabled:opacity-50"
                        >
                          {scanLoading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-indigo-500 dark:border-indigo-400 border-t-transparent rounded-full animate-spin"></div>
                              <span className="text-[10px]">Scanning & parsing via OCR...</span>
                            </>
                          ) : (
                            <>
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              </svg>
                              <span>Scan Insurance Card</span>
                            </>
                          )}
                        </button>

                        <div className="relative flex py-1 items-center">
                          <div className="flex-grow border-t border-card-border"></div>
                          <span className="flex-shrink mx-2 text-[8px] text-text-muted font-bold uppercase">or edit manually</span>
                          <div className="flex-grow border-t border-card-border"></div>
                        </div>

                        {/* Input 1 */}
                        <div className="space-y-1">
                          <label className="text-[9px] text-text-muted font-bold uppercase">Patient Full Name</label>
                          <input
                            type="text"
                            value={patientName}
                            onChange={(e) => setPatientName(e.target.value)}
                            placeholder="John Doe"
                            className="w-full bg-card-bg border border-card-border text-xs rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-indigo-500/60"
                          />
                        </div>

                        {/* Input 2 */}
                        <div className="space-y-1">
                          <label className="text-[9px] text-text-muted font-bold uppercase">Insurance ID Number</label>
                          <input
                            type="text"
                            value={insuranceId}
                            onChange={(e) => setInsuranceId(e.target.value)}
                            placeholder="XYZ-12345678-A"
                            className="w-full bg-card-bg border border-card-border text-xs rounded-lg px-3 py-2 text-foreground focus:outline-none focus:border-indigo-500/60"
                          />
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="mt-6">
                        <button
                          onClick={() => {
                            if (patientName && insuranceId) setCheckinStep("success");
                          }}
                          disabled={!patientName || !insuranceId}
                          className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white text-xs font-bold py-2.5 rounded-xl transition-colors"
                        >
                          Submit Check-in
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col h-full justify-between items-center text-center py-6">
                      <div className="my-auto space-y-4">
                        <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <h6 className="text-sm font-bold text-foreground">Check-In Successful</h6>
                          <p className="text-[10px] text-text-muted max-w-[220px] mx-auto mt-1">
                            Eligibility confirmed. Please take a seat, the doctor will call you shortly.
                          </p>
                        </div>

                        {/* OCR Data Debug Box */}
                        {isScanned && (
                          <div className="bg-card-bg border border-card-border rounded-xl p-3 text-left">
                            <div className="text-[8px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider mb-1">OCR Autofilled Data</div>
                            <div className="text-[10px] text-text-muted font-semibold">Name: <span className="text-foreground font-bold">{patientName}</span></div>
                            <div className="text-[10px] text-text-muted font-semibold">Card ID: <span className="text-foreground font-bold">{insuranceId}</span></div>
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleResetWireframe}
                        className="text-[10px] text-indigo-600 dark:text-indigo-400 hover:underline font-bold"
                      >
                        Reset Wireframe Simulator
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: BRD Snippet */}
        {activeTab === "BRD" && (
          <div className="border border-card-border bg-card-bg/30 rounded-xl p-6 font-mono text-xs text-text-muted max-w-4xl mx-auto space-y-6 max-h-[500px] overflow-y-auto">
            {/* Header block */}
            <div className="border-b border-card-border pb-4 space-y-1 bg-sidebar-bg/60 p-4 rounded-lg">
              <div className="text-indigo-600 dark:text-indigo-400 font-bold">DOCUMENT REFERENCE: CLIN-BRD-2025-V2.1</div>
              <div className="text-foreground font-bold text-sm">BUSINESS REQUIREMENTS DOCUMENT (BRD)</div>
              <div className="text-text-muted">Project: Clinic Registration & Insurance Eligibility Automation</div>
              <div className="text-text-muted">Author: Indhu (Lead Business Analyst)</div>
            </div>

            {/* Section 1 */}
            <div className="space-y-2">
              <div className="text-foreground font-bold text-[13px]">1.0 Executive Summary & Objective</div>
              <p className="text-[11px] text-text-muted leading-relaxed pl-4">
                The objective of the Clinic Registration and Insurance Eligibility Automation project is to overhaul the outpatient intake workflow. By integrating real-time Insurance Clearinghouse APIs at booking, we aim to reduce front-desk telephone eligibility calls by 85%, lower booking abandonment by 15%, and mitigate retrospective claims denials.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2">
              <div className="text-foreground font-bold text-[13px]">2.0 System Actors</div>
              <ul className="list-disc pl-8 space-y-1.5 text-text-muted text-[11px]">
                <li><strong className="text-foreground">Patient:</strong> Submits demographic data and uploads insurance card images via the patient portal.</li>
                <li><strong className="text-foreground">Clearinghouse API Router:</strong> Middleware system that converts card OCR outputs to HIPAA-compliant EDI 270 transactions.</li>
                <li><strong className="text-foreground">Clinic Receptionist:</strong> Triages eligibility anomalies and manually manages non-electronic check-ins.</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-2">
              <div className="text-foreground font-bold text-[13px]">3.0 Functional Requirements (FR)</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] border-collapse">
                  <thead>
                    <tr className="border-b border-card-border bg-sidebar-bg/60">
                      <th className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-bold">Req ID</th>
                      <th className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-bold">Requirement Description</th>
                      <th className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-bold">Priority</th>
                      <th className="py-2 px-3 text-indigo-600 dark:text-indigo-400 font-bold">Source</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-card-border">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-foreground">FR-1.1</td>
                      <td className="py-2.5 px-3 text-text-muted">The portal MUST extract full name, subscriber ID, and group number from uploaded JPEG/PNG insurance card images using OCR in under 5.0 seconds.</td>
                      <td className="py-2.5 px-3"><span className="text-rose-600 dark:text-rose-400 font-bold bg-rose-500/5 px-1.5 py-0.5 rounded border border-rose-500/10">Must</span></td>
                      <td className="py-2.5 px-3 text-text-muted">Claims Lead</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-foreground">FR-1.2</td>
                      <td className="py-2.5 px-3 text-text-muted">The API router MUST generate a HIPAA-compliant EDI 270 request schema and dispatch to selected clearinghouse gateways.</td>
                      <td className="py-2.5 px-3"><span className="text-rose-600 dark:text-rose-400 font-bold bg-rose-500/5 px-1.5 py-0.5 rounded border border-rose-500/10">Must</span></td>
                      <td className="py-2.5 px-3 text-text-muted">IT Architect</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-foreground">FR-1.3</td>
                      <td className="py-2.5 px-3 text-text-muted">If the clearinghouse returns an 'Inactive Policy' response (EDI 271), the portal MUST trigger a warning prompt requesting card updates.</td>
                      <td className="py-2.5 px-3"><span className="text-indigo-600 dark:text-indigo-400 font-bold bg-indigo-500/5 px-1.5 py-0.5 rounded border border-indigo-500/10">Should</span></td>
                      <td className="py-2.5 px-3 text-text-muted">Ops Lead</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Kanban Board with User Stories */}
        {activeTab === "KANBAN" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Column 1 */}
            <div className="bg-sidebar-bg/40 border border-card-border rounded-xl p-4 space-y-4 transition-colors duration-300">
              <div className="flex justify-between items-center border-b border-card-border pb-2">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">To Do</span>
                <span className="bg-bg-hover text-[10px] text-text-muted px-2 py-0.5 rounded-full font-bold">2</span>
              </div>

              {/* Story 1 */}
              <div className="bg-card-bg border border-card-border rounded-xl p-3.5 space-y-2 hover:border-slate-350 dark:hover:border-slate-700 transition-colors cursor-grab shadow-xs">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">HLTH-203</span>
                  <span className="bg-bg-hover text-text-muted px-1.5 py-0.5 rounded font-medium">Story</span>
                </div>
                <h6 className="text-xs font-bold text-foreground leading-snug">As a patient, I want to edit OCR-extracted fields so that I can correct errors.</h6>
                <div className="text-[10px] text-text-muted font-medium">Acceptance Criteria:</div>
                <p className="text-[9px] text-text-muted/80 leading-relaxed italic">
                  Given the OCR parser fills fields, When I view the form, Then I should be allowed to manually overwrite any text box.
                </p>
              </div>

              {/* Story 2 */}
              <div className="bg-card-bg border border-card-border rounded-xl p-3.5 space-y-2 hover:border-slate-350 dark:hover:border-slate-700 transition-colors cursor-grab shadow-xs">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">HLTH-204</span>
                  <span className="bg-bg-hover text-text-muted px-1.5 py-0.5 rounded font-medium">Story</span>
                </div>
                <h6 className="text-xs font-bold text-foreground leading-snug">As an IT Auditor, I want encryption at rest for insurance uploads to ensure HIPAA audit compliance.</h6>
                <div className="text-[10px] text-text-muted font-medium">Acceptance Criteria:</div>
                <p className="text-[9px] text-text-muted/80 leading-relaxed italic">
                  Given a patient uploads a card, When the file is saved in DB, Then it must be encrypted using AES-256 keys.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="bg-sidebar-bg/40 border border-card-border rounded-xl p-4 space-y-4 transition-colors duration-300">
              <div className="flex justify-between items-center border-b border-card-border pb-2">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">In Progress</span>
                <span className="bg-bg-hover text-[10px] text-text-muted px-2 py-0.5 rounded-full font-bold">1</span>
              </div>

              {/* Story 3 */}
              <div className="bg-card-bg border-indigo-500/35 border bg-indigo-500/5 rounded-xl p-3.5 space-y-2 hover:border-indigo-500/50 transition-colors cursor-grab shadow-xs">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-indigo-600 dark:text-indigo-400 font-bold">HLTH-201</span>
                  <span className="bg-indigo-950/20 text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded font-medium">Story</span>
                </div>
                <h6 className="text-xs font-bold text-foreground leading-snug">As a patient, I want to scan my insurance card via camera so that I don't type subscriber IDs.</h6>
                <div className="text-[10px] text-text-muted font-medium">Acceptance Criteria:</div>
                <p className="text-[9px] text-text-muted/80 leading-relaxed italic">
                  Given the mobile check-in open, When I tap 'Scan Card', Then the system opens camera, performs OCR, and pre-populates fields.
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="bg-sidebar-bg/40 border border-card-border rounded-xl p-4 space-y-4 transition-colors duration-300">
              <div className="flex justify-between items-center border-b border-card-border pb-2">
                <span className="text-xs font-bold text-text-muted uppercase tracking-wider">Completed / Done</span>
                <span className="bg-bg-hover text-[10px] text-text-muted px-2 py-0.5 rounded-full font-bold">1</span>
              </div>

              {/* Story 4 */}
              <div className="bg-card-bg border-emerald-500/35 border bg-emerald-500/5 rounded-xl p-3.5 space-y-2 hover:border-emerald-500/50 transition-colors cursor-grab shadow-xs">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">HLTH-200</span>
                  <span className="bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded font-medium">Story</span>
                </div>
                <h6 className="text-xs font-bold text-foreground leading-snug line-through opacity-60">As a receptionist, I want to view check-in status on a dashboard so I know who is waiting.</h6>
                <div className="text-[10px] text-text-muted font-medium">Acceptance Criteria:</div>
                <p className="text-[9px] text-text-muted/80 leading-relaxed italic opacity-60">
                  Given the receptionist dashboard, When a patient successfully checks in via kiosk, Then the dashboard automatically adds them.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
