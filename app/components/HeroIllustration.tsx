"use client";

export default function HeroIllustration() {
  return (
    <div className="relative w-full max-w-[540px] aspect-[1.15/1] mx-auto flex items-center justify-center select-none">
      {/* Background Soft Pastel Organic Blob */}
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <svg
          viewBox="0 0 500 450"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full opacity-90 transition-all duration-700 hover:scale-[1.02]"
        >
          {/* Blob background shape */}
          <path
            d="M440,240 Q460,360 340,410 Q220,460 120,400 Q20,340 40,220 Q60,100 180,60 Q300,20 400,100 Q420,160 440,240 Z"
            fill="url(#blob-gradient)"
          />
          <defs>
            <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5EDFF" />
              <stop offset="50%" stopColor="#EDE2FD" />
              <stop offset="100%" stopColor="#F9F5FF" />
            </linearGradient>
          </defs>

          {/* Dotted rain texture in backdrop blob */}
          <g opacity="0.4" stroke="#B894E6" strokeWidth="2" strokeLinecap="round">
            <line x1="330" y1="90" x2="330" y2="110" strokeDasharray="1 6" />
            <line x1="340" y1="85" x2="340" y2="120" strokeDasharray="1 6" />
            <line x1="350" y1="95" x2="350" y2="115" strokeDasharray="1 6" />
            <line x1="360" y1="80" x2="360" y2="125" strokeDasharray="1 6" />
          </g>

          {/* Top Left Arc Doodles */}
          <path d="M70,80 Q80,65 95,60" stroke="#9A6BD2" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M60,95 Q72,80 90,75" stroke="#9A6BD2" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M50,110 Q65,95 85,90" stroke="#9A6BD2" strokeWidth="2.5" strokeLinecap="round" fill="none" />

          {/* Floating Spiral Swirl above Table */}
          <path
            d="M375,120 C375,70 340,70 340,110 C340,150 380,150 380,180 C380,210 345,210 345,185"
            stroke="#1D1D2C"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Window / Chart frame background line */}
          <rect x="390" y="70" width="48" height="75" rx="3" stroke="#B894E6" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
          <path d="M400,90 Q415,80 430,95" stroke="#B894E6" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <circle cx="425" cy="80" r="4" stroke="#B894E6" strokeWidth="1.5" fill="none" />
        </svg>
      </div>

      {/* Main Vector Art Illustration (Line-art Analysts at Table) */}
      <svg
        viewBox="0 0 600 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full h-full drop-shadow-sm"
      >
        {/* Table Base Shadow */}
        <ellipse cx="300" cy="420" rx="200" ry="12" fill="#E8DBFA" opacity="0.6" />

        {/* --- LEFT ANALYST (FEMALE) --- */}
        {/* Chair */}
        <path d="M120,290 L105,430 M150,290 L165,430" stroke="#1C1C28" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M100,240 Q95,290 120,295 L160,295 Q175,290 170,240 Z" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3.5" />

        {/* Person Body & Arms */}
        <path d="M110,230 Q135,170 160,230" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3.5" />
        {/* Sweater texture lines */}
        <path d="M125,200 L145,200 M120,215 L150,215" stroke="#1C1C28" strokeWidth="1.5" strokeDasharray="2 4" />
        {/* Clasped Hands */}
        <path d="M140,220 Q160,235 150,250 Q135,245 130,230" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3" />

        {/* Head & Hair (Ponytail) */}
        <circle cx="135" cy="145" r="20" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3.5" />
        {/* Ponytail */}
        <path d="M120,135 Q100,120 105,160 Q120,155 125,145 Z" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3" />
        {/* Eyes & Smile */}
        <circle cx="140" cy="142" r="2" fill="#1C1C28" />
        <circle cx="147" cy="142" r="2" fill="#1C1C28" />
        <path d="M139,150 Q144,155 149,150" stroke="#1C1C28" strokeWidth="2" strokeLinecap="round" />

        {/* --- RIGHT ANALYST (MALE) --- */}
        {/* Chair */}
        <path d="M470,290 L455,430 M500,290 L515,430" stroke="#1C1C28" strokeWidth="3.5" strokeLinecap="round" />
        <path d="M450,240 Q445,290 470,295 L510,295 Q525,290 520,240 Z" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3.5" />

        {/* Person Body & Sweater */}
        <path d="M460,230 Q485,170 510,230" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3.5" />
        {/* Hands with coffee */}
        <path d="M470,225 Q460,240 475,250" stroke="#1C1C28" strokeWidth="3" fill="none" />
        <rect x="452" y="240" width="12" height="15" rx="3" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="2.5" />

        {/* Head & Short Hair */}
        <circle cx="485" cy="145" r="20" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3.5" />
        <path d="M470,140 Q480,120 500,132 Q495,145 470,140 Z" fill="#1C1C28" stroke="#1C1C28" strokeWidth="2" />
        {/* Face features */}
        <circle cx="478" cy="145" r="2" fill="#1C1C28" />
        <path d="M475,152 Q480,157 485,152" stroke="#1C1C28" strokeWidth="2" strokeLinecap="round" />

        {/* --- CENTER ROUND TABLE --- */}
        {/* Legs */}
        <path d="M260,330 L220,430 M340,330 L380,430 M300,330 L300,430" stroke="#1C1C28" strokeWidth="4" strokeLinecap="round" />
        {/* Table Top Surface */}
        <ellipse cx="300" cy="330" rx="140" ry="35" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="4" />
        <ellipse cx="300" cy="335" rx="138" ry="32" fill="#F8F4FF" opacity="0.8" />

        {/* --- TABLETOP ITEMS --- */}
        {/* Open Laptop */}
        <rect x="250" y="270" width="70" height="48" rx="4" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3" />
        <path d="M240,318 L330,318 L320,325 L250,325 Z" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="3" />
        {/* Laptop Screen Charts */}
        <path d="M260,305 L275,290 L290,300 L305,282" stroke="#8A57D3" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <rect x="260" y="307" width="8" height="6" fill="#C8B6E2" />
        <rect x="272" y="302" width="8" height="11" fill="#8A57D3" />
        <rect x="284" y="295" width="8" height="18" fill="#C8B6E2" />

        {/* Notebook & Pen */}
        <rect x="180" y="325" width="30" height="20" rx="2" transform="rotate(-15 180 325)" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="2.5" />
        <line x1="183" y1="322" x2="205" y2="316" stroke="#1C1C28" strokeWidth="1.5" />

        {/* Coffee Cup / Mug */}
        <circle cx="365" cy="335" r="8" fill="#FFFFFF" stroke="#1C1C28" strokeWidth="2.5" />
        <path d="M373,332 Q378,335 373,338" stroke="#1C1C28" strokeWidth="2" fill="none" />

        {/* Floating Sparkles around Table */}
        <path d="M220,160 L223,168 L231,171 L223,174 L220,182 L217,174 L209,171 L217,168 Z" fill="#C8B6E2" />
        <path d="M390,200 L392,205 L397,207 L392,209 L390,214 L388,209 L383,207 L388,205 Z" fill="#9A6BD2" />
        <circle cx="160" cy="100" r="3" fill="#B894E6" />
        <circle cx="450" cy="110" r="4" fill="#C8B6E2" />
      </svg>
    </div>
  );
}
