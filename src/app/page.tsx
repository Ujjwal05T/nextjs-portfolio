"use client";

import { SparklesCore } from "@/components/ui/sparkles";
import { FloatingSocialBar } from '../components/contact/social-links';
import HeroSection from "@/components/home/hero-section";
import TechStackSection from "@/components/home/tech-stack-section";
import AboutPage from './about/page';
import ProjectsPage from './projects/page';
import ContactPage from './contact/page';

export default function Home() {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="homesparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
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