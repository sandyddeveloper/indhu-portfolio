"use client";

export default function ToolLogos() {
  return (
    <div className="w-full pt-8 pb-4">
      <h3 className="text-xs md:text-sm font-bold text-text-muted mb-6 tracking-wide uppercase">
        Data Analytics Tools Known
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8 lg:gap-10 py-4 px-1 items-center">
        {/* Python Logo */}
        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
          <svg className="w-7 h-7 sm:w-9 sm:h-9 shrink-0" viewBox="0 0 128 128">
            <path
              fill="#3776AB"
              d="M62.6 0c-30.8 0-29 13.4-29 13.4l.1 13.8h29.5v4.2H21.7S0 29 0 60.5c0 31.6 18.9 30.5 18.9 30.5h11.3v-16s-.6-18.9 18.3-18.9h29.4s17.7.3 17.7-17.2V17.2S98.2 0 62.6 0zm-15.6 9.4c2.8 0 5 2.2 5 5s-2.2 5-5 5-5-2.2-5-5 2.2-5 5-5z"
            />
            <path
              fill="#FFD43B"
              d="M65.4 128c30.8 0 29-13.4 29-13.4l-.1-13.8H64.8v-4.2h41.5s21.7 2.4 21.7-29.1c0-31.6-18.9-30.5-18.9-30.5h-11.3v16s.6 18.9-18.3 18.9H50.1s-17.7-.3-17.7 17.2v21.6S30 128 65.4 128zm15.6-9.4c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
            />
          </svg>
          <span className="text-base sm:text-xl font-extrabold tracking-tight text-foreground font-sans">
            python<span className="text-xs align-top opacity-70">™</span>
          </span>
        </div>

        {/* Django Logo */}
        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#092E20] flex items-center justify-center text-[#44B78B] font-black text-base sm:text-xl shadow-xs shrink-0">
            d
          </div>
          <span className="text-lg sm:text-2xl font-extrabold tracking-tight text-[#092E20] dark:text-[#44B78B] font-sans">
            django
          </span>
        </div>

        {/* PostgreSQL Logo */}
        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
          <svg className="w-7 h-7 sm:w-9 sm:h-9 shrink-0" viewBox="0 0 128 128" fill="none">
            <rect width="128" height="128" rx="24" fill="#336791" />
            <path
              fill="#FFFFFF"
              d="M64 20C42 20 28 34 28 56c0 16 8 28 20 34v18l16-10 16 10V90c12-6 20-18 20-34 0-22-14-36-36-36zm-12 28c3 0 6 3 6 6s-3 6-6 6-6-3-6-6 3-6 6-6zm24 0c3 0 6 3 6 6s-3 6-6 6-6-3-6-6 3-6 6-6zm-12 32c-10 0-16-6-16-6s6 10 16 10 16-10 16-10-6 6-16 6z"
            />
          </svg>
          <span className="text-sm sm:text-xl font-extrabold tracking-tight text-[#336791] dark:text-[#65b3e6] font-sans">
            PostgreSQL
          </span>
        </div>

        {/* ELT Logo */}
        <div className="flex items-center gap-2 transition-all duration-300 hover:scale-105 cursor-pointer">
          <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#2E1065] flex items-center justify-center text-purple-300 font-black text-xs sm:text-sm shadow-xs shrink-0">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 12h16M14 6l6 6-6 6" />
            </svg>
          </div>
          <span className="text-base sm:text-xl font-extrabold tracking-tight text-purple-900 dark:text-purple-300 font-sans">
            ELT
          </span>
        </div>

        {/* Pandas Logo */}
        <div className="flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer">
          <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
            <rect width="128" height="128" rx="24" fill="#150E28" />
            <rect x="36" y="28" width="12" height="72" rx="4" fill="#130754" />
            <rect x="58" y="44" width="12" height="56" rx="4" fill="#3867D6" />
            <rect x="80" y="28" width="12" height="72" rx="4" fill="#FFC048" />
            <circle cx="42" cy="34" r="4" fill="#FF5252" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-[#130754] dark:text-[#a5b4fc] font-sans">
            pandas
          </span>
        </div>

        {/* NumPy Logo */}
        <div className="flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer">
          <svg className="w-9 h-9" viewBox="0 0 128 128" fill="none">
            <rect width="128" height="128" rx="24" fill="#013243" />
            <path d="M34 44L64 26L94 44V84L64 102L34 84V44Z" stroke="#4DABCF" strokeWidth="6" fill="none" />
            <path d="M34 44L64 63L94 44" stroke="#4DABCF" strokeWidth="6" />
            <path d="M64 63V102" stroke="#4DABCF" strokeWidth="6" />
            <circle cx="64" cy="63" r="6" fill="#4DABCF" />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-[#013243] dark:text-[#4DABCF] font-sans">
            NumPy
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

        {/* Git Logo */}
        <div className="flex items-center gap-2.5 transition-all duration-300 hover:scale-105 cursor-pointer">
          <svg className="w-9 h-9" viewBox="0 0 128 128">
            <path
              fill="#F05032"
              d="M124.7 57.5L70.5 3.3c-4.4-4.4-11.5-4.4-15.8 0L3.3 54.7c-4.4 4.4-4.4 11.5 0 15.8l54.2 54.2c4.4 4.4 11.5 4.4 15.8 0l51.4-51.4c4.4-4.4 4.4-11.5 0-15.8z"
            />
            <path
              fill="#FFFFFF"
              d="M93.3 64.9L64.2 35.8c-1.7-1.7-4.4-1.7-6.1 0L46.4 47.5c-1.3 1.3-1.6 3.1-1 4.7l13.6 13.6c-1.3 2.1-1.1 4.9.7 6.8 1.9 1.9 4.8 2.2 7 .9l9.7 9.7c-1.3 2.1-1.1 4.9.7 6.8 2.3 2.3 6.1 2.3 8.4 0 2.3-2.3 2.3-6.1 0-8.4-1.9-1.9-4.8-2.2-6.9-1L70 71.9c.7-1.3.6-2.9-.3-3.9-1.1-1.1-2.7-1.4-4.1-.9L52.8 54.3l9.4-9.4 25 25c1.7 1.7 4.4 1.7 6.1 0 1.7-1.7 1.7-4.4 0-6.1z"
            />
          </svg>
          <span className="text-xl font-extrabold tracking-tight text-[#F05032] font-sans">
            Git
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
      </div>
    </div>
  );
}


