"use client";

import { useState, useEffect, useRef } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarLetter: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Indhu's ability to map our convoluted scheduling workflows and propose clean, automated API solutions completely transformed our clinic operations. Her BRDs were flawless, and she was a stellar bridge between our clinical staff and engineering. The 85% wait-time reduction speaks for itself.",
    author: "Keerthana",
    role: "VP of Patient Experience",
    company: "CareFirst Health Network",
    avatarLetter: "S",
    rating: 5
  },
  {
    quote: "Indhu is one of the rare analysts who can look at raw database transaction logs, write clean SQL to diagnose stockout anomalies, and present the solutions in clear, actionable BI dashboards. Her safety-stock reordering formulas unlocked $430k of trapped capital.",
    author: "Abinaya",
    role: "Product Owner",
    company: "Apex Logistics Solutions",
    avatarLetter: "D",
    rating: 5
  },
  {
    quote: "We loved working with Indhu on the Scrum team. Her Jira user stories were exceptionally detailed, with clear Gherkin acceptance criteria that left zero room for developer ambiguity. She facilitated active backlog grooming and made our release cycles incredibly smooth.",
    author: "Santhosh Raj",
    role: "Lead Software Engineer",
    company: "MedTech Integrations Group",
    avatarLetter: "M",
    rating: 5
  }
];

export default function TestimonialsCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const current = TESTIMONIALS[activeIndex];

  return (
    <div
      className="w-full max-w-4xl mx-auto bg-card-bg border border-card-border rounded-2xl p-6 md:p-10 relative overflow-hidden glow-indigo transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Decorative quote mark */}
      <div className="absolute top-4 right-8 text-8xl font-serif text-indigo-500/10 pointer-events-none select-none">
        “
      </div>

      <div className="flex flex-col items-center text-center space-y-6 min-h-[220px] justify-between">
        {/* Five Star rating */}
        <div className="flex gap-1 text-amber-400">
          {[...Array(current.rating)].map((_, i) => (
            <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Quote body */}
        <p className="text-base md:text-lg text-foreground font-medium italic leading-relaxed max-w-2xl">
          "{current.quote}"
        </p>

        {/* Author details */}
        <div className="flex items-center gap-3.5 mt-2">
          {/* Avatar Icon */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center text-white font-black text-sm shadow-md">
            {current.avatarLetter}
          </div>
          <div className="text-left">
            <div className="text-sm font-bold text-foreground">{current.author}</div>
            <div className="text-xs text-text-muted font-semibold mt-0.5">
              {current.role} at <span className="text-indigo-650 dark:text-indigo-400 font-bold">{current.company}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual buttons */}
      <div className="flex justify-between items-center mt-8 border-t border-card-border pt-6">
        <div className="flex gap-1.5">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIndex === idx ? "w-6 bg-indigo-650 dark:bg-indigo-500" : "w-1.5 bg-bg-hover hover:bg-text-muted/40"
                }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-8 h-8 rounded-lg bg-background border border-card-border text-text-muted hover:text-foreground hover:border-indigo-500/25 flex items-center justify-center transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="w-8 h-8 rounded-lg bg-background border border-card-border text-text-muted hover:text-foreground hover:border-indigo-500/25 flex items-center justify-center transition-all cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
