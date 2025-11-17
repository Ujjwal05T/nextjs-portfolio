"use client";

import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { GridBackground } from "@/components/ui/grid-background";

export default function AboutPage() {
  const education = [
    {
      degree: "Master of Computer Application",
      institution: "SOC, IPS Academy",
      year: "2023-2025",
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "RDVV University",
      year: "2020-2023",
    },
  ];

  const experience = [
    {
      title: "Software Engineer",
      company: "Indas Analytics",
      location: "Indore",
      period: "May 2025 - Present",
      current: true,
    }
  ];

  return (
    <div id="about" className="min-h-screen w-full relative overflow-hidden py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <GridBackground />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">About Me</h2>
          <div className="h-1 w-20 bg-primary mx-auto mt-4" />
        </motion.div>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left column - Bio Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <p className="text-muted-foreground text-lg leading-relaxed">
                I&apos;m a <span className="text-primary font-semibold">Full-Stack Developer</span> specializing
                in building modern web applications with React, Next.js, and cloud technologies.
                I focus on creating impactful digital experiences in edtech and dashboard applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Currently working as a Software Engineer at Indas Analytics, where I develop
                data-driven applications and contribute to scalable cloud-based solutions.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                With a strong foundation in both frontend and backend development, I bring ideas to life
                through clean code, thoughtful design, and a deep understanding of user needs. I&apos;m passionate
                about creating seamless digital experiences that make a real difference.
              </p>
            </div>
          </motion.div>

          {/* Right column - Education & Experience */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Education Section */}
            <div>
              <div className="flex items-center mb-4">
                <FaGraduationCap className="text-xl mr-2 text-primary" />
                <h3 className="text-xl font-semibold text-white">Education</h3>
              </div>
              <div className="space-y-3">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-primary/30 pl-4 py-2"
                  >
                    <div className="text-sm text-primary font-mono mb-1">{edu.year}</div>
                    <h4 className="text-white font-semibold">{edu.degree}</h4>
                    <p className="text-muted-foreground text-sm">{edu.institution}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div>
              <div className="flex items-center mb-4">
                <FaBriefcase className="text-xl mr-2 text-primary" />
                <h3 className="text-xl font-semibold text-white">Experience</h3>
              </div>
              <div className="space-y-3">
                {experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-l-2 border-secondary/30 pl-4 py-2"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-sm text-secondary font-mono">{exp.period}</div>
                      {exp.current && (
                        <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                          Current
                        </span>
                      )}
                    </div>
                    <h4 className="text-white font-semibold">{exp.title}</h4>
                    <p className="text-muted-foreground text-sm">{exp.company} • {exp.location}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
