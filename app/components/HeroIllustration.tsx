"use client";

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto flex flex-col items-center justify-center select-none group px-1 sm:px-4 py-2">
      {/* Background Soft Pastel Glowing Aura */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-purple-200/70 via-indigo-100/50 to-purple-300/40 dark:from-purple-900/30 dark:via-purple-800/20 dark:to-indigo-900/20 blur-3xl transition-transform duration-700 group-hover:scale-110" />
      </div>

      {/* Main Container Frame */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        
        {/* Decorative Automation Pipeline Flow Line */}
        <div className="hidden sm:block absolute inset-0 w-full h-full pointer-events-none">
          <svg viewBox="0 0 540 460" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M 80 140 Q 140 80 260 90 T 440 120"
              stroke="currentColor"
              className="text-purple-300 dark:text-purple-800/60"
              strokeWidth="2"
              strokeDasharray="4 4"
              fill="none"
            />
            <circle cx="80" cy="140" r="4" className="fill-purple-500 animate-ping" opacity="0.6" />
            <circle cx="80" cy="140" r="4" className="fill-purple-600" />
          </svg>
        </div>

        {/* Top KPI Badge (Mobile-Safe Floating Pill) */}
        <div className="sm:absolute -top-3 right-0 sm:right-2 z-20 mb-3 sm:mb-0 bg-white/95 dark:bg-[#19122c]/95 border border-purple-300/80 dark:border-purple-700/80 p-2.5 sm:p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 flex items-center gap-2.5 self-end sm:self-auto">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-purple-100 dark:bg-purple-900/60 border border-purple-300 dark:border-purple-700 flex items-center justify-center text-purple-800 dark:text-purple-200 shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
            </svg>
          </div>
          <div>
            <div className="text-[9px] sm:text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide">Data Analysis</div>
            <div className="text-[11px] sm:text-xs font-black text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
              <span>99.8% Accuracy</span>
              <span className="text-[9px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-1 py-0.2 rounded-md font-extrabold border border-emerald-300 dark:border-emerald-700">↑ KPI</span>
            </div>
          </div>
        </div>

        {/* --- MAIN CENTRAL CODING IDE TERMINAL --- */}
        <div className="w-full bg-slate-900/95 dark:bg-[#0f0a1c]/95 border border-purple-400/40 dark:border-purple-700/60 rounded-2xl shadow-2xl backdrop-blur-md overflow-hidden transition-all duration-500 hover:shadow-purple-500/20 hover:border-purple-400/80">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-3.5 py-2.5 bg-slate-950/90 border-b border-purple-900/40">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-1.5 text-[10px] sm:text-xs font-mono font-extrabold text-purple-300/90 flex items-center gap-1 truncate max-w-[140px] sm:max-w-none">
                <svg className="w-3 h-3 text-emerald-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
                python_etl_automation.py
              </span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono font-bold bg-purple-950 text-purple-300 border border-purple-700/50 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AUTO-PIPELINE: ACTIVE
            </span>
          </div>

          {/* Editor Body (Python & SQL Code Snippet) */}
          <div className="p-3.5 sm:p-5 font-mono text-[10px] sm:text-xs leading-relaxed space-y-1 text-slate-200 overflow-x-auto">
            <div className="text-purple-400 font-bold"># Python Data Automation & SQL Pipeline</div>
            <div>
              <span className="text-pink-400 font-bold">import</span> <span className="text-cyan-300">pandas</span> <span className="text-pink-400 font-bold">as</span> <span className="text-yellow-300">pd</span>
              <span className="text-slate-400">, </span>
              <span className="text-cyan-300">psycopg2</span>
            </div>
            <div className="pt-0.5">
              <span className="text-pink-400 font-bold">def</span> <span className="text-purple-300 font-extrabold">execute_pipeline</span><span className="text-amber-300">(db_conn)</span>:
            </div>
            <div className="pl-3 sm:pl-4 text-slate-300">
              <span className="text-slate-500"># 1. Extract raw database records</span>
            </div>
            <div className="pl-3 sm:pl-4">
              query = <span className="text-emerald-300">&quot;SELECT * FROM sales_logs WHERE status = &apos;NEW&apos;&quot;</span>
            </div>
            <div className="pl-3 sm:pl-4">
              df = pd.<span className="text-cyan-300">read_sql</span>(query, db_conn)
            </div>
            <div className="pl-3 sm:pl-4 text-slate-300 pt-0.5">
              <span className="text-slate-500"># 2. Transform & Data Wrangling</span>
            </div>
            <div className="pl-3 sm:pl-4">
              df_clean = df.<span className="text-yellow-300">dropna</span>().<span className="text-yellow-300">drop_duplicates</span>()
            </div>
            <div className="pl-3 sm:pl-4 text-slate-300 pt-0.5">
              <span className="text-slate-500"># 3. Load into Data Warehouse</span>
            </div>
            <div className="pl-3 sm:pl-4">
              df_clean.<span className="text-cyan-300">to_sql</span>(<span className="text-emerald-300">&quot;analytics_dw&quot;</span>, db_conn, if_exists=<span className="text-emerald-300">&quot;append&quot;</span>)
            </div>
            <div className="pl-3 sm:pl-4 font-bold text-purple-300">
              <span className="text-pink-400">return</span> <span className="text-emerald-400">&quot;SUCCESS: 100K+ RECORDS PROCESSED&quot;</span>
            </div>
          </div>

          {/* Terminal Console Output Bar */}
          <div className="px-3.5 py-2 bg-slate-950 border-t border-purple-900/40 text-[9px] sm:text-[10px] font-mono flex items-center justify-between text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="text-emerald-400 font-bold">&gt;&gt;&gt;</span>
              <span className="text-slate-300">Job executed in 0.38s</span>
            </div>
            <div className="text-emerald-400 font-bold flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Verified
            </div>
          </div>
        </div>

        {/* Bottom ELT Pipeline Card (Mobile-Safe Floating Pill) */}
        <div className="sm:absolute -bottom-3 left-0 sm:left-2 z-20 mt-3 sm:mt-0 bg-white/95 dark:bg-[#19122c]/95 border border-purple-300/80 dark:border-purple-700/80 p-2.5 sm:p-3 rounded-2xl shadow-xl backdrop-blur-md transition-all duration-300 self-start sm:self-auto max-w-full">
          <div className="text-[9px] sm:text-[10px] font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide mb-1 flex items-center gap-1.5">
            <svg className="w-3 h-3 text-purple-600 dark:text-purple-300 animate-spin" style={{ animationDuration: '8s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Automated ELT Pipeline
          </div>
          <div className="flex flex-wrap items-center gap-1 text-[9px] sm:text-[10px] font-mono font-bold">
            <span className="px-1.5 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/60 text-purple-900 dark:text-purple-200 border border-purple-300 dark:border-purple-700">Extract</span>
            <span className="text-purple-400">→</span>
            <span className="px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-900/60 text-indigo-900 dark:text-indigo-200 border border-indigo-300 dark:border-indigo-700">Transform</span>
            <span className="text-purple-400">→</span>
            <span className="px-1.5 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-700">Load</span>
          </div>
        </div>

        {/* Floating SQL Badge (Visible on sm+) */}
        <div className="hidden md:flex absolute top-1/2 -right-4 z-20 bg-slate-900/90 text-purple-200 border border-purple-500/60 px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md text-[10px] font-mono font-black items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>SELECT * FROM DW;</span>
        </div>

      </div>
    </div>
  );
}
