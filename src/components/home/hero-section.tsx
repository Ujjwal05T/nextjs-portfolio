"use client";

import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Link from "next/link";
import { GalaxyModel } from "../ui/code-block-model";
import { GridBackground } from "@/components/ui/grid-background";

function FullModel() {
  return (
    <group>
      <GalaxyModel />
    </group>
  );
}

export default function HeroSection() {
  return (
    <section className="min-h-[80vh] w-full flex flex-col justify-center relative overflow-hidden pb-0 pt-20 px-4 sm:px-6 lg:px-8">
      <GridBackground />
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-[60%_40%] gap-8 items-center">
        {/* Left column - Text content (60%) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-10"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.06 }}
            className="text-muted-foreground mb-3 font-mono text-sm sm:text-base tracking-wide"
          >
            Hello, my name is
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-3"
          >
            Ujjwal Tamrakar
          </motion.h1>

          {/* Subheadline */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl md:text-3xl font-medium mb-4 text-gradient"
          >
            Full-Stack Developer
          </motion.h2>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-4 sm:mt-6 max-w-xl"
          >
            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
              I build innovative full stack web solutions using modern frameworks and cloud technologies.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <a href="#projects" className="btn-primary group relative overflow-hidden">
              <span className="relative z-10">View Projects</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-primary via-secondary to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </a>
            <Link href="/contact" className="btn-ghost group relative overflow-hidden">
              <span className="relative z-10">Contact Me</span>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-secondary via-primary to-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></span>
            </Link>
          </motion.div>

          {/* Hire Metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-12 grid grid-cols-3 gap-4 sm:gap-6 max-w-xl"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center md:text-left p-4 rounded-xl backdrop-blur-sm border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">1+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Years Experience</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center md:text-left p-4 rounded-xl backdrop-blur-sm border border-white/5 bg-white/[0.02] hover:border-secondary/30 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">10+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Projects Completed</div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              className="text-center md:text-left p-4 rounded-xl backdrop-blur-sm border border-white/5 bg-white/[0.02] hover:border-primary/30 transition-all duration-300"
            >
              <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">24-48h</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Response Time</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right column - 3D viewport (40%) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[350px] sm:h-[400px] md:h-[500px]"
        >
          {/* 3D Canvas */}
          <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }}>
              {/* Ambient light for base illumination */}
              <ambientLight intensity={0.3} />

              {/* Main key light */}
              <directionalLight
                position={[5, 5, 5]}
                intensity={1.2}
                color="#ffffff"
              />

              {/* Rim lights for depth - purple accent */}
              <directionalLight
                position={[-5, 3, -5]}
                intensity={0.8}
                color="#a855f7"
              />

              {/* Fill light from below - soft cyan */}
              <directionalLight
                position={[0, -3, 3]}
                intensity={0.5}
                color="#06b6d4"
              />

              {/* Spotlight for dramatic effect */}
              <spotLight
                position={[0, 8, 0]}
                angle={0.6}
                penumbra={0.5}
                intensity={0.8}
                color="#a855f7"
                castShadow={false}
              />

              <Suspense fallback={null}>
                <FullModel />
              </Suspense>
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={true}
                autoRotateSpeed={0.5}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 2}
                enableDamping={true}
                dampingFactor={0.05}
              />
            </Canvas>
          </div>

          {/* Floating Resume Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-8 card-professional p-4 max-w-[200px] animate-float hidden md:block"
          >
            <p className="text-sm font-semibold text-white mb-2">Resume</p>
            <a
              href="/Resume.pdf"
              download="Ujjwal_Tamrakar_Resume.pdf"
              className="text-xs text-primary hover:text-secondary transition-colors flex items-center gap-1"
            >
              Download PDF
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 cursor-pointer group"
          onClick={() => {
            const lenis = window.lenis;
            if (lenis) {
              lenis.scrollTo(window.innerHeight, { duration: 1.5, easing: (t: number) => t });
            } else {
              window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }
          }}
        >
          <span className="text-muted-foreground group-hover:text-primary text-xs font-medium tracking-wider transition-colors">SCROLL</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}