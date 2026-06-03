"use client";

import { useState, FormEvent } from "react";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }

    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start max-w-4xl mx-auto">
      {/* Contact Cards (Left 2 Columns) */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <span className="text-[10px] text-indigo-605 dark:text-indigo-400 font-bold uppercase tracking-widest">Connect</span>
          <h4 className="text-xl font-bold text-foreground mt-1">Get in Touch</h4>
          <p className="text-xs text-text-muted leading-relaxed mt-2">
            Looking to recruit a Senior Business Analyst or consult on operational optimization, process automation, or dashboard designs? Drop a line here!
          </p>
        </div>

        <div className="space-y-4">
          {/* Email Card */}
          <a
            href="mailto:indhu.ba.analyst@example.com"
            className="flex items-center gap-4 bg-card-bg hover:bg-bg-hover border border-card-border p-4 rounded-xl transition-all group shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-650 dark:text-indigo-400 group-hover:bg-indigo-650 group-hover:text-white dark:group-hover:bg-indigo-600 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 00-2 2z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Email Address</div>
              <div className="text-xs font-semibold text-foreground mt-0.5">indhu.ba.analyst@example.com</div>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href="https://linkedin.com/in/indhuba"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-card-bg hover:bg-bg-hover border border-card-border p-4 rounded-xl transition-all group shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-650 dark:text-indigo-400 group-hover:bg-indigo-650 group-hover:text-white dark:group-hover:bg-indigo-600 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">LinkedIn Connect</div>
              <div className="text-xs font-semibold text-foreground mt-0.5">linkedin.com/in/indhuba</div>
            </div>
          </a>

          {/* GitHub Card */}
          <a
            href="https://github.com/indhu-analyst"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-card-bg hover:bg-bg-hover border border-card-border p-4 rounded-xl transition-all group shadow-xs"
          >
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-650 dark:text-indigo-400 group-hover:bg-indigo-650 group-hover:text-white dark:group-hover:bg-indigo-600 transition-colors shrink-0">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </div>
            <div>
              <div className="text-[10px] text-text-muted font-bold uppercase tracking-wider">GitHub (SQL/Python)</div>
              <div className="text-xs font-semibold text-foreground mt-0.5">github.com/indhu-analyst</div>
            </div>
          </a>
        </div>
      </div>

      {/* Form Card (Right 3 Columns) */}
      <div className="lg:col-span-3 bg-card-bg border border-card-border rounded-2xl p-6 glow-indigo relative shadow-xs transition-colors duration-300">
        {status === "success" ? (
          <div className="flex flex-col items-center justify-center text-center py-14 space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h5 className="text-base font-bold text-foreground">Message Transmitted Successfully</h5>
              <p className="text-xs text-text-muted max-w-xs mt-1">
                Your message has been processed. I will review and reply within 1 business day.
              </p>
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold mt-4"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] text-text-muted font-bold uppercase">Your Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full bg-background border border-card-border text-xs rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-[10px] text-text-muted font-bold uppercase">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@carefirst.com"
                  className="w-full bg-background border border-card-border text-xs rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Subject */}
            <div className="space-y-1">
              <label className="text-[10px] text-text-muted font-bold uppercase">Subject (Optional)</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Consulting on Process Improvement"
                className="w-full bg-background border border-card-border text-xs rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Message */}
            <div className="space-y-1">
              <label className="text-[10px] text-text-muted font-bold uppercase">Your Message *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your project details or recruitment inquiry here..."
                className="w-full bg-background border border-card-border text-xs rounded-xl px-4 py-2.5 text-foreground focus:outline-none focus:border-indigo-500 resize-none transition-colors"
              />
            </div>

            {status === "error" && (
              <div className="text-xs text-rose-600 dark:text-rose-400 font-semibold">
                Please complete all required fields.
              </div>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {status === "sending" ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Send Inquiries</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
