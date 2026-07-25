"use client";

export default function ToolLogos() {
  return (
    <div className="w-full pt-8 pb-4">
      <h3 className="text-xs md:text-sm font-bold text-text-muted mb-6 tracking-wide uppercase">
        Data Analytics Tools Known
      </h3>

      <div className="flex flex-wrap items-center justify-between gap-6 md:gap-8 lg:gap-12 py-4 px-2">
        {/* Python Logo */}
        <div className="flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer">
          <svg className="w-9 h-9" viewBox="0 0 128 128">
            <path
              fill="#3776AB"
              d="M62.6 0c-30.8 0-29 13.4-29 13.4l.1 13.8h29.5v4.2H21.7S0 29 0 60.5c0 31.6 18.9 30.5 18.9 30.5h11.3v-16s-.6-18.9 18.3-18.9h29.4s17.7.3 17.7-17.2V17.2S98.2 0 62.6 0zm-15.6 9.4c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"
            />
            <path
              fill="#FFD43B"
              d="M65.4 128c30.8 0 29-13.4 29-13.4l-.1-13.8H64.8v-4.2h41.5s21.7 2.4 21.7-29.1c0-31.6-18.9-30.5-18.9-30.5h-11.3v16s.6 18.9-18.3 18.9H50.1s-17.7-.3-17.7 17.2v21.6S30 128 65.4 128zm15.6-9.4c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
            />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-foreground font-sans">
            python<span className="text-xs align-top opacity-70">™</span>
          </span>
        </div>

        {/* MySQL Logo */}
        <div className="flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer">
          <svg className="w-10 h-10" viewBox="0 0 128 128">
            <path
              fill="#00758F"
              d="M117.8 70.8c-1.6-1.1-3.6-1.5-5.5-1.5-3.3 0-6.6 1.4-8.8 3.8-3.4 3.7-4.4 9-2.5 13.5 1.5 3.6 4.6 6.3 8.4 7.2 2.6.6 5.4.3 7.8-.8 1.9-.9 3.6-2.3 4.8-4 1.2-1.8 1.9-3.9 1.9-6.1.1-4.7-2.4-9.1-6.1-12.1zM65.6 17.8c-18.5 0-35.4 9.1-45.7 24.5C9.6 57.7 7 76.4 12.9 93.3c3.6 10.3 10.2 19.3 19 25.7 3.5 2.5 7.4 4.5 11.5 5.9 4.3 1.5 8.8 2.3 13.4 2.3 18.5 0 35.4-9.1 45.7-24.5 10.3-15.4 12.9-34.1 7-51C105.9 41.4 99.3 32.4 90.5 26c-7.2-5.3-16-8.2-24.9-8.2z"
              opacity="0.15"
            />
            <path
              fill="#00758F"
              d="M58.7 28.5C40.2 31.8 25 45.8 19.8 64c-3.2 11.2-1.7 23.3 4.2 33.3 3.6 6.1 8.8 11.1 15 14.6 6.8 3.9 14.6 5.9 22.4 5.9 14.2 0 27.8-6.5 36.6-17.6 8.8-11.1 12.1-25.7 9-39.6-2.5-11.2-9.4-20.9-19-27-8.3-5.2-18.3-7.2-28.3-5.1z"
            />
            <path
              d="M72.5 45.2c-5.2-2.8-11.2-4.1-17.1-3.6 4.8 3.2 8.4 8 10.2 13.6 1.8 5.6 1.4 11.6-.9 16.9-2.3 5.3-6.6 9.5-11.9 11.8-5.3 2.3-11.4 2.3-16.7 0-4.8-2.1-8.7-5.8-11.1-10.4-2.4-4.6-3.1-9.9-2.1-15.1"
              stroke="#F29111"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
          <span className="text-2xl font-extrabold tracking-tight text-[#00758F] font-sans">
            MySQL
          </span>
        </div>

        {/* Power BI Logo */}
        <div className="flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer">
          <svg className="w-9 h-9" viewBox="0 0 100 100" fill="none">
            <rect x="10" y="55" width="20" height="35" rx="3" fill="#F2C811" />
            <rect x="40" y="35" width="20" height="55" rx="3" fill="#E6AD10" />
            <rect x="70" y="15" width="20" height="75" rx="3" fill="#D29200" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-foreground font-sans">
            Power BI
          </span>
        </div>

        {/* Excel Logo */}
        <div className="flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="w-10 h-10 bg-[#107C41] rounded-lg flex items-center justify-center text-white font-black text-xl shadow-md">
            X
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#107C41] font-sans">
            Excel
          </span>
        </div>

        {/* Statistics Doodle Graphic */}
        <div className="flex items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer">
          <svg className="w-12 h-10" viewBox="0 0 120 90" fill="none" stroke="currentColor">
            <path d="M15,10 L15,75 L110,75" strokeWidth="3" strokeLinecap="round" />
            <path d="M20,65 L45,45 L70,55 L105,18" stroke="#8A57D3" strokeWidth="4" strokeLinecap="round" />
            <path d="M92,18 L105,18 L105,30" stroke="#8A57D3" strokeWidth="4" strokeLinecap="round" />
            <rect x="25" y="50" width="10" height="24" fill="#E6DCF7" stroke="currentColor" strokeWidth="1.5" />
            <rect x="50" y="35" width="10" height="39" fill="#C8B6E2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="75" y="25" width="10" height="49" fill="#8A57D3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <span className="text-xs font-black uppercase tracking-widest text-foreground font-sans border-b-2 border-purple-300 pb-0.5">
            STATISTICS
          </span>
        </div>
      </div>
    </div>
  );
}
