"use client";

import { useState } from "react";

interface QueryOption {
  id: string;
  title: string;
  description: string;
  sql: string;
  columns: string[];
  rows: Record<string, string | number>[];
  chartType: "bar" | "percentage" | "leakage";
}

const QUERIES: QueryOption[] = [
  {
    id: "customer_churn",
    title: "Customer Segment Performance & Churn",
    description: "Evaluates revenue share, average transaction size, and customer churn rate across demographic segments to isolate high-risk groups.",
    sql: `SELECT \n  c.segment,\n  SUM(t.amount) AS total_revenue,\n  ROUND(AVG(t.amount), 2) AS avg_transaction,\n  ROUND(COUNT(DISTINCT CASE WHEN c.status = 'churned' THEN c.id END) * 100.0 / COUNT(DISTINCT c.id), 1) AS churn_rate_pct\nFROM customers c\nJOIN transactions t ON c.id = t.customer_id\nGROUP BY c.segment\nORDER BY total_revenue DESC;`,
    columns: ["Segment", "Total Revenue", "Avg Transaction", "Churn Rate (%)"],
    rows: [
      { "Segment": "Enterprise Corporate", "Total Revenue": "$580,430", "Avg Transaction": "$1,450.00", "Churn Rate (%)": 4.2 },
      { "Segment": "Mid-Market SMB", "Total Revenue": "$340,120", "Avg Transaction": "$420.50", "Churn Rate (%)": 9.8 },
      { "Segment": "Retail Consumer", "Total Revenue": "$190,850", "Avg Transaction": "$85.20", "Churn Rate (%)": 16.5 },
      { "Segment": "Public Sector / Gov", "Total Revenue": "$125,000", "Avg Transaction": "$2,500.00", "Churn Rate (%)": 2.1 }
    ],
    chartType: "bar"
  },
  {
    id: "claims_denials",
    title: "Monthly Claims Leakage & Denials",
    description: "Pinpoints root causes of rejected medical claims by category, diagnosing operational leaks and claim reprocessing costs.",
    sql: `SELECT \n  c.denial_reason,\n  COUNT(c.claim_id) AS claim_count,\n  SUM(c.claim_value) AS denied_value,\n  ROUND(SUM(c.claim_value) * 100.0 / SUM(SUM(c.claim_value)) OVER(), 1) AS leakage_share_pct\nFROM claims c\nWHERE c.status = 'denied'\n  AND c.denied_date >= DATEADD(month, -6, GETDATE())\nGROUP BY c.denial_reason\nORDER BY denied_value DESC;`,
    columns: ["Denial Reason", "Claim Count", "Denied Value", "Leakage Share (%)"],
    rows: [
      { "Denial Reason": "Missing Info / Transcription Error", "Claim Count": 843, "Denied Value": "$185,460", "Leakage Share (%)": 42.0 },
      { "Reason Code": "Prior Authorization Required", "Claim Count": 412, "Denied Value": "$132,180", "Leakage Share (%)": 29.9 },
      { "Reason Code": "Out of Network Provider", "Claim Count": 198, "Denied Value": "$88,230", "Leakage Share (%)": 20.0 },
      { "Reason Code": "Coordination of Benefits (COB)", "Claim Count": 87, "Denied Value": "$35,900", "Leakage Share (%)": 8.1 }
    ],
    chartType: "leakage"
  },
  {
    id: "safety_stock",
    title: "Supplier Stockout & Lead Time Volatility",
    description: "Calculates lead-time variances from suppliers to identify products running below their optimal dynamic safety stock limit.",
    sql: `SELECT \n  p.supplier_name,\n  COUNT(p.sku) AS monitored_skus,\n  AVG(p.lead_time_days) AS avg_lead_time,\n  SUM(CASE WHEN p.stock_level < p.calculated_safety_stock THEN 1 ELSE 0 END) AS risk_skus_count\nFROM product_inventory p\nGROUP BY p.supplier_name\nHAVING SUM(CASE WHEN p.stock_level < p.calculated_safety_stock THEN 1 ELSE 0 END) > 0\nORDER BY risk_skus_count DESC;`,
    columns: ["Supplier Name", "Monitored SKUs", "Avg Lead Time", "Risk SKUs Count"],
    rows: [
      { "Supplier Name": "Apex Logistical Corp", "Monitored SKUs": 320, "Avg Lead Time": "8.4 Days", "Risk SKUs Count": 42 },
      { "Supplier Name": "Pacific Import Wholesalers", "Monitored SKUs": 180, "Avg Lead Time": "14.2 Days", "Risk SKUs Count": 28 },
      { "Supplier Name": "Vanguard Parts Ltd", "Monitored SKUs": 450, "Avg Lead Time": "4.1 Days", "Risk SKUs Count": 14 },
      { "Supplier Name": "Zenith Medical Supply", "Monitored SKUs": 95, "Avg Lead Time": "6.8 Days", "Risk SKUs Count": 8 }
    ],
    chartType: "percentage"
  }
];

export default function InteractiveSqlSandbox() {
  const [selectedQuery, setSelectedQuery] = useState<QueryOption>(QUERIES[0]);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleRunQuery = () => {
    setIsRunning(true);
    setShowResults(false);
    setTimeout(() => {
      setIsRunning(false);
      setShowResults(true);
    }, 900);
  };

  const getChartDataPoints = () => {
    if (selectedQuery.id === "customer_churn") {
      return selectedQuery.rows.map((row) => ({
        label: String(row["Segment"]),
        value: Number(row["Churn Rate (%)"]),
        formattedValue: `${row["Churn Rate (%)"]}% Churn`
      }));
    } else if (selectedQuery.id === "claims_denials") {
      return selectedQuery.rows.map((row) => ({
        label: String(row["Denial Reason"] || row["Reason Code"]),
        value: Number(row["Leakage Share (%)"]),
        formattedValue: `${row["Leakage Share (%)"]}% Leakage`
      }));
    } else {
      return selectedQuery.rows.map((row) => ({
        label: String(row["Supplier Name"]),
        value: Number(row["Risk SKUs Count"]),
        formattedValue: `${row["Risk SKUs Count"]} SKUs at Risk`
      }));
    }
  };

  const chartData = getChartDataPoints();
  const maxVal = Math.max(...chartData.map((d) => d.value), 1);

  return (
    <div className="w-full bg-card-bg border border-card-border rounded-2xl overflow-hidden glow-indigo transition-all duration-300">
      {/* Selector Area */}
      <div className="p-5 border-b border-card-border bg-sidebar-bg/40 flex flex-col md:flex-row gap-5 justify-between items-start md:items-center transition-colors duration-300">
        <div className="space-y-1">
          <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest">Data Analyst Sandbox</span>
          <h4 className="text-lg font-bold text-foreground">Interactive SQL Analytics Playground</h4>
          <p className="text-xs text-text-muted max-w-xl">
            Choose a business logic scenario below. Read the SQL queries written to audit systems, and execute them to see live data telemetry.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-1.5 w-full md:flex md:flex-wrap md:gap-2 md:w-auto">
          {QUERIES.map((q) => (
            <button
              key={q.id}
              onClick={() => {
                setSelectedQuery(q);
                setShowResults(false);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                selectedQuery.id === q.id
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-bg-hover text-text-muted hover:text-foreground"
              }`}
            >
              {q.id === "customer_churn" && "📈 Segment Churn"}
              {q.id === "claims_denials" && "💸 Claims Denial"}
              {q.id === "safety_stock" && "📦 Inventory Risk"}
            </button>
          ))}
        </div>
      </div>

      {/* SQL Editor Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-12">
        {/* Editor Screen (Left) - Kept dark styled for code editor feel */}
        <div className="xl:col-span-7 xl:border-r border-b xl:border-b-0 border-card-border bg-slate-950 flex flex-col justify-between transition-colors duration-300">
          <div className="p-4 border-b border-slate-900 flex justify-between items-center text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="ml-2 text-slate-400 font-bold">query_analysis.sql</span>
            </span>
            <span>PostgreSQL 15</span>
          </div>

          {/* Code Window */}
          <div className="p-5 font-mono text-[11px] md:text-xs text-slate-300 overflow-x-auto whitespace-pre leading-relaxed min-h-[220px] bg-slate-950">
            {selectedQuery.sql.split("\n").map((line, idx) => {
              const tokenRegex = /('[^']*')|(\b(?:SELECT|FROM|JOIN|ON|GROUP\s+BY|ORDER\s+BY|WHERE|AND|HAVING|OVER)\b)|(\b(?:SUM|AVG|COUNT|ROUND|DATEADD|CASE|WHEN|THEN|END|DISTINCT|AS|DESC)\b)|(\b\d+(?:\.\d+)?\b)/gi;
              let highlighted = line.replace(tokenRegex, (match, stringLiteral, keyword, func, num) => {
                if (stringLiteral) return `<span class="text-emerald-400">${match}</span>`;
                if (keyword) return `<span class="text-indigo-400 font-bold">${match}</span>`;
                if (func) return `<span class="text-sky-400">${match}</span>`;
                if (num) return `<span class="text-amber-400">${match}</span>`;
                return match;
              });

              return (
                <div key={idx} className="table-row">
                  <span className="table-cell text-slate-600 text-right pr-4 select-none w-6">{idx + 1}</span>
                  <span className="table-cell" dangerouslySetInnerHTML={{ __html: highlighted }} />
                </div>
              );
            })}
          </div>

          {/* Footer Trigger */}
          <div className="p-4 border-t border-slate-900 bg-slate-950/80 flex justify-between items-center">
            <div className="text-[10px] text-slate-500 italic max-w-[70%]">
              {selectedQuery.description}
            </div>
            <button
              onClick={handleRunQuery}
              disabled={isRunning}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-2 disabled:opacity-50 shrink-0 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Running...</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  <span>Execute SQL</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Screen (Right) */}
        <div className="xl:col-span-5 bg-card-bg/25 flex flex-col justify-center min-h-[300px] p-6 transition-colors duration-300">
          {isRunning && (
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-12">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              <div>
                <h5 className="text-xs font-bold text-foreground">Compiling Query Plan...</h5>
                <p className="text-[10px] text-text-muted">Querying database indexes (cached)</p>
              </div>
            </div>
          )}

          {!isRunning && !showResults && (
            <div className="flex flex-col items-center justify-center text-center space-y-3 py-12">
              <div className="w-10 h-10 rounded-xl bg-background border border-card-border flex items-center justify-center text-text-muted transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
              <div>
                <h5 className="text-xs font-bold text-foreground">Database Console Output</h5>
                <p className="text-[10px] text-text-muted max-w-xs mt-1">
                  Click the green 'Execute SQL' button to compile the queries and output database analytics.
                </p>
              </div>
            </div>
          )}

          {showResults && (
            <div className="space-y-6 animate-fadeIn">
              {/* Tabular Output */}
              <div>
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest mb-2">Result Set (Top Rows)</div>
                <div className="overflow-x-auto border border-card-border rounded-xl bg-background/60 transition-colors duration-300">
                  <table className="w-full text-left text-[10px] border-collapse font-mono">
                    <thead>
                      <tr className="border-b border-card-border bg-sidebar-bg/60">
                        {selectedQuery.columns.map((col, idx) => (
                          <th key={idx} className="py-2 px-3 text-text-muted font-bold">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-card-border">
                      {selectedQuery.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="hover:bg-bg-hover">
                          {Object.values(row).map((val, cellIdx) => (
                            <td key={cellIdx} className="py-2 px-3 text-foreground font-semibold">{val}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Graphical Visualization */}
              <div className="border-t border-card-border pt-4">
                <div className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-widest mb-3">Auto-Generated Visualization</div>
                <div className="space-y-3.5">
                  {chartData.map((d, idx) => {
                    const widthPercent = Math.max((d.value / maxVal) * 100, 4);
                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-[9px] font-bold">
                          <span className="text-text-muted truncate max-w-[70%]">{d.label}</span>
                          <span className="text-indigo-600 dark:text-indigo-400">{d.formattedValue}</span>
                        </div>
                        <div className="h-2 w-full bg-bg-hover rounded-full overflow-hidden border border-card-border/60">
                          <div
                            className={`h-full rounded-full transition-all duration-1000 bg-gradient-to-r ${
                              selectedQuery.id === "customer_churn"
                                ? "from-indigo-600 to-indigo-400"
                                : selectedQuery.id === "claims_denials"
                                ? "from-rose-600 to-rose-400"
                                : "from-sky-600 to-sky-400"
                            }`}
                            style={{ width: `${widthPercent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
