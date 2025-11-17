"use client";

import { FloatingSocialBar } from '../components/contact/social-links';
import HeroSection from "@/components/home/hero-section";
import TechStackSection from "@/components/home/tech-stack-section";
import AboutPage from './about/page';
import ProjectsPage from './projects/page';
import ContactPage from './contact/page';
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { RadialGradientBg } from "@/components/ui/radial-gradient-bg";

export default function Home() {
  const scrollProgress = useScrollProgress();

  return (
    <>
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-background z-[60]">
        <div
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Radial Gradient Background */}
      <RadialGradientBg
        className="z-10"
      />

      <div className="relative z-10">
        <FloatingSocialBar />
        <HeroSection />
        <TechStackSection />
        <AboutPage />
        <ProjectsPage />
        <ContactPage />
      </div>
    </>
  );
}