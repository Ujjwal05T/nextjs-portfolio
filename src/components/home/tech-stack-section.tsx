"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaDocker, FaAws } from "react-icons/fa";
import { SiNextdotjs, SiExpress, SiSpringboot, SiTailwindcss, SiTypescript, SiJavascript, SiMongodb, SiPostgresql } from "react-icons/si";
import { cn } from "@/lib/utils";

const technologies = [
  { name: "React", icon: <FaReact />, color: "#61DAFB", category: "frontend" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#FFFFFF", category: "frontend" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#539E43", category: "backend" },
  { name: "Express", icon: <SiExpress />, color: "#FFFFFF", category: "backend" },
  { name: "Spring Boot", icon: <SiSpringboot />, color: "#6DB33F", category: "backend" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6", category: "frontend" },
  { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E", category: "frontend" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38B2AC", category: "frontend" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248", category: "database" },
  { name: "PostgreSQL", icon: <SiPostgresql />, color: "#336791", category: "database" },
  { name: "Git", icon: <FaGitAlt />, color: "#F05032", category: "devops" },
  { name: "Docker", icon: <FaDocker />, color: "#2496ED", category: "devops" },
  { name: "AWS", icon: <FaAws />, color: "#FF9900", category: "devops" }
];

export default function TechStackSection() {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <section className="w-full py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-blue-950/20"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.1),transparent_60%)]"></div>
      
      {/* Animated mesh grid */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(to right, #3b82f610 1px, transparent 1px), linear-gradient(to bottom, #3b82f610 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          {/* Glowing title effect */}
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="bg-clip-text  bg-gray-400">
              Tech Stack
            </span>
          </motion.h2>
          
          <motion.div 
            className="h-1 w-0 bg-zinc-700  mx-auto mt-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: "5rem" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
          
          <motion.p 
            className="mt-6 text-zinc-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Technologies and tools I work with to bring ideas to life
          </motion.p>
        </motion.div>

        {/* Tech cards with staggered animation */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ staggerChildren: 0.05, delayChildren: 0.1 }}
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 20,
                delay: index * 0.04 
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8, scale: 1.05 }}
              onMouseEnter={() => setHoveredTech(tech.name)}
              onMouseLeave={() => setHoveredTech(null)}
              className="group relative"
            >
              <div className={cn(
                "p-5 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800/80 rounded-xl flex flex-col items-center justify-center transition-all duration-500 h-full z-10 relative overflow-hidden",
                hoveredTech === tech.name ? "border-blue-500/50" : "hover:border-zinc-700"
              )}>
                {/* Animated glow effect */}
                <div 
                  className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-20 transition-opacity duration-700" 
                  style={{ 
                    background: `radial-gradient(circle at center, ${tech.color}40 0%, transparent 70%)` 
                  }}
                />
                
                {/* Animated icon */}
                <motion.div 
                  className="text-4xl sm:text-5xl mb-3 relative"
                  style={{ color: tech.color }}
                  animate={
                    hoveredTech === tech.name 
                      ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }
                      : {}
                  }
                  transition={{ duration: 0.6 }}
                >
                  {tech.icon}
                  <div 
                    className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" 
                    style={{ background: `radial-gradient(circle at center, ${tech.color} 0%, transparent 70%)` }}
                  />
                </motion.div>
                
                {/* Name with reveal animation */}
                <div className="overflow-hidden">
                  <motion.h3 
                    className="text-sm sm:text-base font-medium text-center" 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.04 + 0.2 }}
                  >
                    {tech.name}
                  </motion.h3>
                </div>
              </div>
              
              {/* Shadow effect */}
              <div 
                className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-40 blur-xl transition-all duration-700 rounded-xl"
                style={{
                  background: `radial-gradient(circle at center, ${tech.color}70 0%, transparent 70%)`
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}