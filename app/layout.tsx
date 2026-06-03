import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Indhu | Senior Business Analyst & Data Analytics Portfolio",
  description: "Senior Business Analyst portfolio demonstrating expertise in requirements gathering, Agile SDLC, data analysis (SQL, Power BI), BPMN process mapping, and stakeholder management.",
  keywords: ["Business Analyst", "Data Analyst", "Agile", "Scrum", "SQL", "BPMN", "Power BI", "BRD", "User Stories", "Case Studies", "Requirements Gathering"],
  authors: [{ name: "Indhu" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col selection:bg-indigo-500 selection:text-white transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
