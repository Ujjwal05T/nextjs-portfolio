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
            {/* Use a single TypewriterEffect with full text - it will naturally wrap on smaller screens */}
            <TypewriterEffect 
              words="I build responsive and scalable web applications with cutting-edge technologies. Specializing in modern JavaScript frameworks and cloud solutions." 
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3 }}
            className="mt-6 sm:mt-10 flex flex-wrap gap-3 sm:gap-4"
          >
            <Link 
              href="/projects"
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-md bg-zinc-800 border border-zinc-700 text-white hover:bg-zinc-700 transition-colors"
            >
              View My Work
            </Link>
            
            <Link 
              href="/contact"
              className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base rounded-md border border-zinc-700 text-white hover:bg-zinc-800/50 transition-colors"
            >
              Contact Me
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