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
  title: "Indhu S | Quality & Transaction Analyst Portfolio",
  description: "Quality Analyst and Financial Transaction Specialist portfolio demonstrating expertise in document validation, compliance audit, US healthcare transactions, and HIPAA standards.",
  keywords: ["Quality Analyst", "Financial Transaction Analyst", "US Healthcare", "HIPAA Compliance", "Prior Authorization", "Eligibility Verification", "BCA", "SQL", "Document Record Management"],
  authors: [{ name: "Indhu S" }],
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
