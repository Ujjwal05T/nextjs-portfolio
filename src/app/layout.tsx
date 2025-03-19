import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
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
  title: {
    default: "Ujjwal Tamrakar | Full Stack Developer",
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
    title: "Ujjwal Tamrakar",
    description: "Portfolio of Ujjwal Tamrakar - Full Stack Developer specializing in React, Next.js, Node.js, and Java. Creating exceptional web experiences with modern technologies.",
    siteName: "Ujjwal Tamrakar Portfolio",
    images: [
      {
        url: "https://your-domain.com/og-image.jpg", // Create and upload this image
        width: 1200,
        height: 630,
        alt: "Ujjwal Tamrakar - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ujjwal Tamrakar",
    description: "Portfolio of Ujjwal Tamrakar - Full Stack Developer specializing in React, Next.js, Node.js, and Java.",
    images: ["https://your-domain.com/twitter-image.jpg"], // Create and upload this image
    creator: "@TamrkarUjjwal", // If you have one
  },
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