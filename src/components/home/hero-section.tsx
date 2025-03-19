"use client";

import { motion } from "framer-motion";
import { TypewriterEffect } from "@/components/ui/text-generate-effect";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import Link from "next/link";
import { GalaxyModel } from "../ui/code-block-model";

function FullModel() {
  return (
    <group>
      <GalaxyModel />
    </group>
  );
}

export default function HeroSection() {
  return (
    <section className="min-h-[100vh] w-full flex flex-col justify-center relative overflow-hidden pb-0 pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between">
        {/* Text content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="z-10 w-full md:w-1/2 md:pr-8"
        >
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-zinc-400 mb-3 font-mono text-sm sm:text-base"
          >
            Hello, my name is
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500"
          >
            Ujjwal Tamrakar
          </motion.h1>
          
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mt-2 mb-4 text-zinc-300"
          >
            Full-Stack Developer
          </motion.h2>
          
            <div className="mt-4 sm:mt-6 max-w-2xl">
            <TypewriterEffect 
              words="I build innovative full stack web solutions using modern frameworks and cloud technologies." 
            />
            </div>
          
            <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 3 }}
  className="mt-6 sm:mt-10 flex flex-wrap gap-4"
>
  {/* Primary Button - View My Work */}
  <Link 
    href="/projects"
   className="group relative px-5 py-3 sm:px-6 sm:py-3.5 overflow-hidden rounded-lg bg-transparent border border-zinc-700 text-sm sm:text-base font-medium text-white transition-all duration-300 hover:border-blue-400/60 hover:text-blue-100 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:scale-[1.02] active:scale-[0.98]"
  >
    <span className="relative z-10 flex items-center">
      View My Work
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
  </Link>
  
  {/* Secondary Button - Contact Me */}
  <Link 
    href="/contact"
    className="group relative px-5 py-3 sm:px-6 sm:py-3.5 overflow-hidden rounded-lg bg-transparent border border-zinc-700 text-sm sm:text-base font-medium text-white transition-all duration-300 hover:border-blue-400/60 hover:text-blue-100 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] hover:scale-[1.02] active:scale-[0.98]"
  >
    <span className="relative z-10 flex items-center">
      Contact Me
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 opacity-70 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
  </Link>
</motion.div>
        </motion.div>
        
        {/* 3D object - use CSS-based responsive approach */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-full md:w-1/2 h-[300px] sm:h-[350px] md:h-[400px] mt-8 md:mt-0"
        >
          {/* Use fixed camera parameters that work well at all sizes */}
          <Canvas camera={{ position: [0, 0, 5.5], fov: 55 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
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
            />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
}