"use client";

import { useState, useEffect, useRef } from "react";

const BRIEFING_SECTIONS = [
  {
    time: "0:00 - 0:30",
    title: "Executive Summary & Core Stack",
    text: "Hello! I am Indhu's AI Recruiter Assistant. Indhu S is a dedicated Python and SQL Specialist with a Bachelor of Computer Applications degree from AM Jain College, graduating with an impressive 7.79 CGPA. She specializes in building clean Python scripts, Django REST backends, relational PostgreSQL databases, and automated data processing workflows."
  },
  {
    time: "0:30 - 1:00",
    title: "Professional Work Experience",
    text: "Indhu brings valuable industry experience from her roles at HTC Global Services as a Quality Analyst in Document Record Management, and at S10 Healthcare as a Financial Transaction Analyst Intern. In these roles, she maintained 100% HIPAA compliance, audited complex transaction logs, and eliminated data discrepancies."
  },
  {
    time: "1:00 - 1:30",
    title: "Data Engineering & Power BI Analytics",
    text: "Her technical expertise includes designing Extract-Load-Transform (ELT) pipelines, wrangling datasets with Pandas and NumPy, writing advanced SQL queries using CTEs and Window Functions, and constructing interactive executive Power BI dashboards with real-time KPI telemetry."
  },
  {
    time: "1:30 - 2:00",
    title: "Certifications & Candidate Fit",
    text: "Indhu holds verified certifications from HackerRank in SQL, CSS, and HTML, along with a comprehensive Python Training Certification from Besant Technologies covering Data Warehousing, Databricks, and Linux. She is a fast, detail-oriented learner ready to deliver high-quality code and analytical insights across Python and Data roles."
  }
];

export default function AiAssistantBriefing() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [speechRate, setSpeechRate] = useState<number>(1);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const TOTAL_DURATION = 120;

  // Handle Speech Synthesis
  const startSpeech = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    
    window.speechSynthesis.cancel();
    if (isMuted) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.includes("en") && (v.name.includes("Female") || v.name.includes("Google") || v.name.includes("Natural") || v.name.includes("Samantha") || v.name.includes("Zira"))
    ) || voices.find((v) => v.lang.includes("en"));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onend = () => {
      setActiveSectionIdx((prev) => {
        if (prev < BRIEFING_SECTIONS.length - 1) {
          const nextIdx = prev + 1;
          setTimeout(() => startSpeech(BRIEFING_SECTIONS[nextIdx].text), 400);
          return nextIdx;
        } else {
          setIsPlaying(false);
          return prev;
        }
      });
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeech = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      stopSpeech();
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      setIsPlaying(true);
      startSpeech(BRIEFING_SECTIONS[activeSectionIdx].text);

      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          if (prev >= TOTAL_DURATION) {
            setIsPlaying(false);
            stopSpeech();
            if (timerRef.current) clearInterval(timerRef.current);
            return TOTAL_DURATION;
          }
          return prev + 1;
        });
      }, 1000 / speechRate);
    }
  };

  const selectSection = (idx: number) => {
    setActiveSectionIdx(idx);
    const approxProgress = (idx / BRIEFING_SECTIONS.length) * TOTAL_DURATION;
    setProgress(approxProgress);
    if (isPlaying) {
      startSpeech(BRIEFING_SECTIONS[idx].text);
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopSpeech();
    };
  }, []);

  const [liftForFooter, setLiftForFooter] = useState(false);

  // Dynamic scroll listener to lift button above footer when reaching bottom of page
  useEffect(() => {
    const handleScroll = () => {
      const scrollBottom = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;
      // If within 220px of page bottom (footer area), lift button above footer
      if (scrollBottom >= totalHeight - 220) {
        setLiftForFooter(true);
      } else {
        setLiftForFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <>
      {/* Soft Pastel Purple AI Recruiter Assistant Floating Bot Button (Lifts above footer) */}
      <div className={`fixed right-4 sm:right-6 z-40 transition-all duration-300 ${liftForFooter ? "bottom-24 sm:bottom-20" : "bottom-6"}`}>
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#c8b6e2] dark:bg-[#7e57c2] text-black dark:text-white font-black text-xs shadow-xl hover:bg-[#b8a2d6] dark:hover:bg-[#6c46b3] hover:scale-105 transition-all duration-300 border border-purple-300 dark:border-purple-600 cursor-pointer"
          title="Listen to 2-Min AI Voice Briefing about Indhu S"
        >
          {/* Soft Pulsing Theme Ring */}
          <span className="absolute -inset-1 rounded-2xl bg-purple-400/30 dark:bg-purple-600/30 animate-ping pointer-events-none" />
          
          <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/80 flex items-center justify-center border border-purple-300 dark:border-purple-500 shrink-0 shadow-xs">
            <svg className="w-4 h-4 text-purple-900 dark:text-purple-200 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </div>

          <div className="flex flex-col text-left">
            <span className="text-[9px] uppercase font-mono tracking-widest text-purple-900 dark:text-purple-200 leading-none">AI Bot</span>
            <span className="text-xs font-black tracking-tight text-black dark:text-white">2-Min Voice Briefing</span>
          </div>
        </button>
      </div>

      {/* Interactive AI Briefing Modal (Matching Portfolio Theme) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-white dark:bg-[#181326] border border-purple-300 dark:border-purple-800 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header (Matching Certificate Modal Styling) */}
            <div className="flex items-center justify-between border-b border-purple-100 dark:border-purple-900/50 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-[#c8b6e2] dark:bg-[#7e57c2] flex items-center justify-center text-black dark:text-white font-black text-xl shadow-xs shrink-0">
                  <svg className="w-6 h-6 text-purple-950 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-black text-black dark:text-white flex items-center gap-2">
                    AI Recruiter Assistant
                    <span className="text-[10px] font-mono font-bold bg-purple-100 dark:bg-purple-900/60 text-purple-950 dark:text-purple-200 border border-purple-300 dark:border-purple-700 px-2.5 py-0.5 rounded-full">
                      2:00 MIN BRIEFING
                    </span>
                  </h3>
                  <p className="text-xs font-extrabold text-purple-900 dark:text-purple-300">Interactive Voice & Transcript Overview of Indhu S</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsPlaying(false);
                  stopSpeech();
                }}
                className="w-10 h-10 rounded-2xl bg-purple-100 dark:bg-purple-900/50 text-black dark:text-white font-black hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors flex items-center justify-center text-lg cursor-pointer"
                title="Close AI Assistant"
              >
                ✕
              </button>
            </div>

            {/* Audio Wave Visualizer & Control Bar */}
            <div className="bg-purple-50/60 dark:bg-[#120e1c] border border-purple-200/80 dark:border-purple-800/60 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-black dark:text-slate-200">
                <div className="flex items-center gap-2">
                  {isPlaying ? (
                    <div className="flex items-center gap-1">
                      <span className="w-1 h-4 bg-purple-600 dark:bg-purple-400 animate-pulse" />
                      <span className="w-1 h-6 bg-indigo-600 dark:bg-indigo-400 animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <span className="w-1 h-3 bg-emerald-600 dark:bg-emerald-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                      <span className="w-1 h-5 bg-purple-600 dark:bg-purple-400 animate-pulse" style={{ animationDelay: '0.1s' }} />
                      <span className="text-purple-900 dark:text-purple-300 font-extrabold ml-1">AI SPEAKING...</span>
                    </div>
                  ) : (
                    <span className="text-black dark:text-slate-300 font-extrabold">Click Play to listen to 2-Min Voice Briefing</span>
                  )}
                </div>
                <span className="font-bold text-purple-900 dark:text-purple-300">{formatTime(progress)} / 2:00</span>
              </div>

              {/* Progress Bar */}
              <div className="h-2 w-full bg-purple-200/60 dark:bg-purple-950/60 rounded-full overflow-hidden border border-purple-300 dark:border-purple-800/60">
                <div
                  className="h-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-800 dark:from-purple-400 dark:via-indigo-400 dark:to-purple-300 transition-all duration-500"
                  style={{ width: `${(progress / TOTAL_DURATION) * 100}%` }}
                />
              </div>

              {/* Player Buttons & Voice Rate Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="px-5 py-2.5 rounded-xl bg-[#c8b6e2] dark:bg-[#7e57c2] text-black dark:text-white hover:bg-[#b8a2d6] dark:hover:bg-[#6c46b3] font-black text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    {isPlaying ? (
                      <>
                        <svg className="w-4 h-4 text-purple-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                        <span>Pause Briefing</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-purple-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <span>Play 2-Min Voice</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setIsMuted(!isMuted);
                      if (isPlaying) {
                        if (!isMuted) stopSpeech();
                        else startSpeech(BRIEFING_SECTIONS[activeSectionIdx].text);
                      }
                    }}
                    className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-black dark:text-white hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors cursor-pointer"
                    title={isMuted ? "Unmute Voice" : "Mute Voice"}
                  >
                    {isMuted ? (
                      <svg className="w-4 h-4 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.41 0-.75-.34-.75-.75V9.75c0-.41.34-.75.75-.75h4.24z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-purple-900 dark:text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.287a5.25 5.25 0 010 7.426M11.25 4.5l-4.72 4.72H4.51c-.41 0-.75.34-.75.75v4.5c0 .41.34.75.75.75h2.02l4.72 4.72a.75.75 0 001.28-.53V5.03a.75.75 0 00-1.28-.53z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-1 bg-white dark:bg-[#181326] p-1 rounded-xl border border-purple-200 dark:border-purple-800">
                  <span className="text-[10px] text-black dark:text-slate-300 font-extrabold px-2">Speed:</span>
                  {[1, 1.25, 1.5].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => {
                        setSpeechRate(rate);
                        if (isPlaying) {
                          startSpeech(BRIEFING_SECTIONS[activeSectionIdx].text);
                        }
                      }}
                      className={`px-2.5 py-0.5 rounded-lg text-[10px] font-black transition-all ${
                        speechRate === rate
                          ? "bg-purple-700 dark:bg-purple-600 text-white"
                          : "text-black dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-300"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Transcript Sections Selector */}
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase tracking-wider text-purple-900 dark:text-purple-300 flex items-center justify-between">
                <span>Interactive Transcript Chapters</span>
                <span className="text-[10px] text-black dark:text-slate-300 font-bold">Click topic to jump</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BRIEFING_SECTIONS.map((sec, idx) => {
                  const isActive = activeSectionIdx === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => selectSection(idx)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? "bg-purple-100 dark:bg-purple-900/60 border-purple-400 dark:border-purple-600 shadow-xs"
                          : "bg-purple-50/40 dark:bg-[#120e1c] border-purple-200/80 dark:border-purple-800/40 hover:border-purple-300"
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono font-black mb-1">
                        <span className={isActive ? "text-purple-950 dark:text-purple-200" : "text-black dark:text-slate-300"}>{sec.title}</span>
                        <span className="text-purple-800 dark:text-purple-300 font-extrabold">{sec.time}</span>
                      </div>
                      <p className="text-[11px] text-black dark:text-slate-200 leading-snug line-clamp-2 font-bold">
                        {sec.text}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Active Transcript Detail Highlight Box */}
              <div className="p-4 rounded-2xl bg-purple-100/90 dark:bg-purple-900/50 border border-purple-300 dark:border-purple-700 text-xs text-black dark:text-white leading-relaxed font-bold">
                <span className="text-[10px] uppercase font-black text-purple-900 dark:text-purple-300 block mb-1">
                  Active Chapter ({BRIEFING_SECTIONS[activeSectionIdx].time}):
                </span>
                {BRIEFING_SECTIONS[activeSectionIdx].text}
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
