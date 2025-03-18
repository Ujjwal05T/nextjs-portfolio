import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import MobileNav from "@/components/layout/mobile-nav";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ujjwal Tamrakar | Full Stack Developer",
  description: "Portfolio of Ujjwal Tamrakar - Full Stack Web Developer specializing in Next.js, Express, Spring Boot, and more.",
  keywords: ["web developer", "full stack developer", "nextjs", "react", "spring boot"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white overflow-x-hidden`}
      >
        <div className="relative min-h-screen">
          <div className="fixed top-0 left-0 right-0 z-50">
            <Header />
          </div>
          
          <main className="pt-4">{children}</main>
          <footer className="py-6 px-4 text-center text-zinc-500 text-sm">
            <p>&copy; 2025 Ujjwal Tamrakar. All rights reserved.</p>
          </footer>
        </div>
        <Analytics />
      </body>
    </html>
  );
}