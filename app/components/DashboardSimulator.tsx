"use client";

import { useState, useMemo } from "react";

// Types
type PeriodFilter = "30D" | "90D" | "YTD";
type DeptFilter = "ALL" | "ELEC" | "APPS" | "HLIV";

interface KPI {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  prefix?: string;
}

export default function DashboardSimulator() {
  const [period, setPeriod] = useState<PeriodFilter>("90D");
  const [dept, setDept] = useState<DeptFilter>("ALL");

  // Dynamic calculations based on filter options
  const dashboardStats = useMemo(() => {
    let multiplier = 1;
    if (period === "30D") multiplier = 0.35;
    if (period === "YTD") multiplier = 2.4;

    let deptMult = 1;
    if (dept === "ELEC") deptMult = 0.55;
    if (dept === "APPS") deptMult = 0.25;
    if (dept === "HLIV") deptMult = 0.20;

    const baseRevenue = 1240500 * multiplier * deptMult;
    const leakageValue = 68450 * multiplier * (dept === "ALL" ? 1 : 0.8) * deptMult;
    
    // Safety Stock levels
    let safetyStockPct = 94.2;
    if (dept === "ELEC") safetyStockPct = 91.8;
    if (dept === "APPS") safetyStockPct = 95.5;
    if (dept === "HLIV") safetyStockPct = 96.1;

    // Claims denial/errors rate
    let claimErrorPct = 2.4;
    if (dept === "ELEC") claimErrorPct = 3.1;
    if (dept === "APPS") claimErrorPct = 1.8;

    return {
      revenue: baseRevenue,
      leakage: leakageValue,
      safetyStock: safetyStockPct,
      errorRate: claimErrorPct,
      kpis: [
        {
          title: "Total Tracked Revenue",
          value: `$${Math.round(baseRevenue).toLocaleString("en-US")}`,
          change: period === "30D" ? "+4.2%" : period === "90D" ? "+12.8%" : "+24.5%",
          isPositive: true
        },
        {
          title: "Operations Leakage (Value)",
          value: `$${Math.round(leakageValue).toLocaleString("en-US")}`,
          change: period === "30D" ? "-1.5%" : period === "90D" ? "-8.4%" : "-15.2%",
          isPositive: true // Leakage reduction is positive
        },
        {
          title: "Safety Stock Compliance",
          value: `${safetyStockPct.toFixed(1)}%`,
          change: "+1.9%",
          isPositive: true
        },
        {
          title: "Process Error Rate",
          value: `${claimErrorPct.toFixed(1)}%`,
          change: "-0.4%",
          isPositive: true
        }
      ]
    };
  }, [period, dept]);

  // Render SVG charts
  const revenuePoints = useMemo(() => {
    // Generate SVG path coordinates based on filters
    const maxVal = Math.max(dashboardStats.revenue * 0.4, 1);
    const step = 60;
    
    // Vary coordinates slightly based on dept to animate path transitions
    let values = [40, 55, 45, 68, 62, 85, 75, 95];
    if (dept === "ELEC") values = [30, 48, 38, 55, 50, 72, 60, 85];
    if (dept === "APPS") values = [25, 35, 42, 38, 55, 48, 65, 70];
    if (dept === "HLIV") values = [20, 28, 24, 38, 32, 45, 42, 50];

    return values.map((val, idx) => ({
      x: idx * step + 40,
      y: 160 - (val / 100) * 120
    }));
  }, [dept, dashboardStats.revenue]);

  const pathD = useMemo(() => {
    return revenuePoints.reduce((acc, p, idx) => {
      return idx === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
    }, "");
  }, [revenuePoints]);

  const areaD = useMemo(() => {
    if (revenuePoints.length === 0) return "";
    const first = revenuePoints[0];
    const last = revenuePoints[revenuePoints.length - 1];
    return `${pathD} L ${last.x} 160 L ${first.x} 160 Z`;
  }, [pathD, revenuePoints]);

  return (
    <div className="w-full bg-card-bg border border-card-border rounded-2xl overflow-hidden glow-indigo transition-all duration-300">
      {/* Dashboard Top Nav Controls */}
      <div className="p-4 md:p-6 bg-sidebar-bg/60 border-b border-card-border flex flex-col xl:flex-row gap-4 justify-between items-start xl:items-center transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-650 dark:text-indigo-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Power BI Dashboard Mockup</h4>
            <p className="text-xs text-text-muted">Retail Sales & Dynamic Safety Stock Telemetry</p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full sm:w-auto items-start sm:items-center">
          {/* Download Practice Dataset (Excel) */}
          <a
            href="/retail_sales_telemetry.xlsx"
            download
            className="flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-650 dark:text-indigo-400 border border-indigo-500/20 rounded-xl text-[10px] font-bold transition-all w-full sm:w-auto cursor-pointer"
            title="Download full practice dataset with sales transactions and inventory snapshots"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Practice Dataset (Excel)
          </a>

          {/* Department Filter */}
          <div className="flex items-center justify-between sm:justify-start bg-background rounded-xl border border-card-border p-0.5 w-full sm:w-auto transition-colors duration-300">
            <span className="text-[10px] text-text-muted font-bold px-2 uppercase shrink-0 hidden sm:inline">Category:</span>
            <button
              onClick={() => setDept("ALL")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                dept === "ALL" ? "bg-indigo-600 text-white" : "text-text-muted hover:text-foreground"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setDept("ELEC")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                dept === "ELEC" ? "bg-indigo-600 text-white" : "text-text-muted hover:text-foreground"
              }`}
            >
              Electronics
            </button>
            <button
              onClick={() => setDept("APPS")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                dept === "APPS" ? "bg-indigo-600 text-white" : "text-text-muted hover:text-foreground"
              }`}
            >
              Apparel
            </button>
            <button
              onClick={() => setDept("HLIV")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                dept === "HLIV" ? "bg-indigo-600 text-white" : "text-text-muted hover:text-foreground"
              }`}
            >
              Home
            </button>
          </div>

          {/* Timeframe Filter */}
          <div className="flex items-center justify-between sm:justify-start bg-background rounded-xl border border-card-border p-0.5 w-full sm:w-auto transition-colors duration-300">
            <button
              onClick={() => setPeriod("30D")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                period === "30D" ? "bg-indigo-600 text-white" : "text-text-muted hover:text-foreground"
              }`}
            >
              30D
            </button>
            <button
              onClick={() => setPeriod("90D")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                period === "90D" ? "bg-indigo-600 text-white" : "text-text-muted hover:text-foreground"
              }`}
            >
              90D
            </button>
            <button
              onClick={() => setPeriod("YTD")}
              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                period === "YTD" ? "bg-indigo-600 text-white" : "text-text-muted hover:text-foreground"
              }`}
            >
              YTD
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="p-6 grid grid-cols-2 lg:grid-cols-4 gap-4 bg-card-bg/25 border-b border-card-border transition-colors duration-300">
        {dashboardStats.kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-background border border-card-border p-4 rounded-xl hover:border-indigo-500/20 transition-all group shadow-xs"
          >
            <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{kpi.title}</div>
            <div className="text-xl md:text-2xl font-black text-foreground mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {kpi.value}
            </div>
            <div className="flex items-center gap-1 mt-1 text-[10px] font-bold">
              <span className={kpi.isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                {kpi.change}
              </span>
              <span className="text-text-muted/60 font-medium">vs prev period</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Panels */}
      <div className="p-6 bg-card-bg/10 grid grid-cols-1 lg:grid-cols-12 gap-6 transition-colors duration-300">
        {/* Revenue Area Chart */}
        <div className="lg:col-span-8 bg-background border border-card-border rounded-xl p-5 shadow-xs transition-colors duration-300">
          <div className="flex justify-between items-center mb-4">
            <h5 className="text-xs font-bold text-foreground uppercase tracking-wider">Revenue Trendline (YTD Intervals)</h5>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
              Live Feed
            </span>
          </div>

          <div className="relative h-[180px] w-full flex items-center justify-center">
            {/* SVG Chart */}
            <svg className="w-full h-full" viewBox="0 0 500 180" preserveAspectRatio="none">
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6366f1" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="40" x2="460" y2="40" className="stroke-card-border" strokeWidth="1" strokeDasharray="2 4" />
              <line x1="40" y1="100" x2="460" y2="100" className="stroke-card-border" strokeWidth="1" strokeDasharray="2 4" />
              <line x1="40" y1="160" x2="460" y2="160" className="stroke-text-muted/30" strokeWidth="1" />

              {/* Fill Area */}
              <path d={areaD} fill="url(#chartGradient)" className="transition-all duration-700 ease-in-out" />

              {/* Line path */}
              <path d={pathD} fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" className="transition-all duration-700 ease-in-out" />

              {/* Interactive Dots */}
              {revenuePoints.map((p, idx) => (
                <circle
                  key={idx}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  className="fill-background stroke-indigo-600 dark:stroke-indigo-400 stroke-2 hover:r-6 hover:fill-indigo-500 transition-all duration-200 cursor-pointer"
                />
              ))}
            </svg>
          </div>
          <div className="flex justify-between text-[9px] text-text-muted font-bold uppercase tracking-wider px-6 mt-2">
            <span>Jan</span>
            <span className="hidden sm:inline">Feb</span>
            <span>Mar</span>
            <span className="hidden sm:inline">Apr</span>
            <span>May</span>
            <span className="hidden sm:inline">Jun</span>
            <span>Jul</span>
            <span>Aug</span>
          </div>
        </div>

        {/* Safety Stock Breakdown (Bar-like representation) */}
        <div className="lg:col-span-4 bg-background border border-card-border rounded-xl p-5 flex flex-col justify-between shadow-xs transition-colors duration-300">
          <div>
            <h5 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4">Stockouts & Lead Times</h5>
            <div className="space-y-4">
              {/* Item 1 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-text-muted">Denver Warehouse (Safety stock)</span>
                  <span className="text-emerald-600 dark:text-emerald-400">98% Normal</span>
                </div>
                <div className="h-1.5 w-full bg-bg-hover rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "98%" }} />
                </div>
              </div>

              {/* Item 2 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-text-muted">Seattle Import Hub (Lead delays)</span>
                  <span className="text-amber-600 dark:text-amber-400">76% Warning</span>
                </div>
                <div className="h-1.5 w-full bg-bg-hover rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "76%" }} />
                </div>
              </div>

              {/* Item 3 */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-text-muted">Chicago Depot (Critical low)</span>
                  <span className="text-rose-600 dark:text-rose-400">42% Low stock</span>
                </div>
                <div className="h-1.5 w-full bg-bg-hover rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: "42%" }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-sidebar-bg/60 rounded-xl p-3 border border-card-border mt-4 text-[10px] text-text-muted leading-relaxed transition-colors duration-300">
            <span className="text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider block mb-1">BA Commentary:</span>
            Refactoring Chicago reorder quantities based on supplier lead volatility is projected to recover <strong>$15,000/mo</strong> in lost sales.
          </div>
        </div>
      </div>
    </div>
  );
}
