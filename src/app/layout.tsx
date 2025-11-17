import type { Metadata } from "next";
// Temporarily disabled Google Fonts due to network restrictions
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import SmoothScrollProvider from "@/components/layout/smooth-scroll-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import SplashCursor from '@/components/SplashCursor'
import { FloatingCode } from '@/components/ui/floating-code'

// Using system fonts as fallback
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: {
    default: "Ujjwal Tamrakar | Portfolio",
    template: "%s | Ujjwal Tamrakar"
  },
  description: "Portfolio of Ujjwal Tamrakar - Full Stack Developer specializing in React, Next.js, Node.js, and Java. Creating exceptional web experiences with modern technologies.",
  keywords: [
    "Ujjwal Tamrakar", 
    "full stack developer", 
    "web developer", 
    "React developer", 
    "Next.js developer", 
    "JavaScript developer",
    "TypeScript developer",
    "Node.js developer",
    "Spring Boot developer",
    "MongoDB",
    "PostgreSQL",
    "frontend development",
    "backend development",
    "responsive web design"
  ],
  authors: [{ name: "Ujjwal Tamrakar" }],
  creator: "Ujjwal Tamrakar",
  publisher: "Ujjwal Tamrakar",
  metadataBase: new URL("https://www.devujjwal.tech"), // Replace with your actual domain
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.devujjwal.tech",
    title: "Ujjwal Tamrakar | Portfolio",
    description: "Portfolio of Ujjwal Tamrakar - Full Stack Developer specializing in React, Next.js, Node.js, and Java. Creating exceptional web experiences with modern technologies.",
    siteName: "Ujjwal Tamrakar Portfolio",
    // images: [
    //   {
    //     url: "https://your-domain.com/og-image.jpg", // Create and upload this image
    //     width: 1200,
    //     height: 630,
    //     alt: "Ujjwal Tamrakar - Full Stack Developer",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjwal Tamrakar | Portfolio",
    description: "Portfolio of Ujjwal Tamrakar - Full Stack Developer specializing in React, Next.js, Node.js, and Java.",
    creator: "@TamrkarUjjwal", // If you have one
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-black text-white overflow-x-hidden"
        style={{ fontFamily: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' }}
      >
        <SplashCursor />
        <FloatingCode />
        <SmoothScrollProvider>
          <div className="relative min-h-screen">
            <div className="fixed top-0 left-0 right-0 z-50">
              <Header />
            </div>

            <main className="pt-4">{children}</main>
            <footer className="relative py-8 px-4 text-center text-sm border-t border-cyan-800/30 overflow-hidden">
              {/* Grid background */}
              <div className="absolute inset-0 opacity-35">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #06b6d425 1px, transparent 1px), linear-gradient(to bottom, #06b6d425 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}
                />
              </div>

              {/* Gradient effects */}
              <div className="absolute z-40 inset-0 bg-gradient-to-t from-cyan-950/20 to-transparent" />
              <div className="absolute z-30 inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),transparent_50%)]" />

              {/* Decorative gradient line */}
              <div className="absolute z-30 top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

              {/* Footer content */}
              <div className="relative z-10 max-w-7xl mx-auto">
                <p className="text-zinc-400 mb-2">
                  &copy; 2025 <span className="text-cyan-400 font-medium">Ujjwal Tamrakar</span>. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </SmoothScrollProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}