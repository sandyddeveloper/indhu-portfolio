"use client";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export default function BrandLogo({ size = "md", showText = true }: BrandLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10 sm:w-11 sm:h-11",
    lg: "w-14 h-14",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base sm:text-lg",
    lg: "text-xl sm:text-2xl",
  };

  const subTextSizes = {
    sm: "text-[8px]",
    md: "text-[9px] sm:text-[10px]",
    lg: "text-[11px]",
  };

  return (
    <div className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer select-none">
      {/* Sleek SVG Monogram & Data Node Logo Badge */}
      <div className={`relative ${iconSizes[size]} rounded-2xl bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 p-0.5 shadow-md shadow-purple-500/20 group-hover:scale-105 group-hover:shadow-purple-500/40 transition-all duration-300`}>
        <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-indigo-500/10 opacity-70 group-hover:opacity-100 transition-opacity" />
          
          {/* Custom SVG Monogram Logo: 'I' + 'S' + Node & Code Brackets */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-3/5 h-3/5 relative z-10 text-white drop-shadow-xs"
          >
            {/* Background Data Node Connectors */}
            <path d="M8 20 L16 12 L24 20 L32 12" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            <path d="M8 28 L16 20 L24 28 L32 20" stroke="#818CF8" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
            
            {/* Letter 'I' Pillar */}
            <path d="M12 10 H18 M15 10 V30 M12 30 H18" stroke="url(#logo-grad-1)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Letter 'S' Curve with Node Glow */}
            <path d="M28 13 C28 10, 21 10, 21 15 C21 21, 28 20, 28 26 C28 30, 21 30, 21 27" stroke="url(#logo-grad-2)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            
            {/* Glowing Accent Node */}
            <circle cx="28" cy="12" r="2.5" fill="#38BDF8" className="animate-pulse" />

            <defs>
              <linearGradient id="logo-grad-1" x1="12" y1="10" x2="18" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#E9D5FF" />
                <stop offset="1" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id="logo-grad-2" x1="21" y1="10" x2="28" y2="30" gradientUnits="userSpaceOnUse">
                <stop stopColor="#A855F7" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <span className={`font-black ${textSizes[size]} text-black dark:text-white tracking-tight leading-none group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors`}>
            Indhu S<span className="text-purple-600 dark:text-purple-400">.</span>
          </span>
          <span className={`font-mono font-extrabold ${subTextSizes[size]} text-purple-900 dark:text-purple-300 uppercase tracking-wider mt-0.5 hidden sm:inline-block`}>
            Python & Data Specialist
          </span>
        </div>
      )}
    </div>
  );
}
