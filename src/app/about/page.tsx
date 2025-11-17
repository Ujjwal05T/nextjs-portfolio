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

  const skills = [
    { name: "React", level: "Advanced", years: 2 },
    { name: "Next.js", level: "Advanced", years: 2 },
    { name: "TypeScript", level: "Intermediate", years: 1.5 },
    { name: "Node.js", level: "Intermediate", years: 2 },
    { name: "Three.js", level: "Intermediate", years: 1 },
    { name: "Tailwind CSS", level: "Advanced", years: 2 },
    { name: "MongoDB", level: "Intermediate", years: 1.5 },
    { name: "PostgreSQL", level: "Intermediate", years: 1 },
    { name: "Git", level: "Advanced", years: 2 },
  ];

  return (
    <section id="about" className="min-h-screen w-full relative overflow-hidden py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
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
          {/* Left column - Bio and Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Brief Bio */}
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
            </div>

            {/* Timeline - Education & Experience */}
            <div className="space-y-6">
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
            </div>
          </motion.div>

          {/* Right column - Skills Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold text-white mb-6">Tech Stack</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className="card-professional p-4 text-center"
                >
                  <div className="text-lg font-semibold text-white mb-1">{skill.name}</div>
                  <div className="text-xs text-primary font-medium mb-2">{skill.level}</div>
                  <div className="text-xs text-muted-foreground">{skill.years} year{skill.years > 1 ? 's' : ''}</div>

                  {/* Progress bar */}
                  <div className="mt-3 w-full bg-muted/20 rounded-full h-1.5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{
                        width: skill.level === "Advanced" ? "90%" : skill.level === "Intermediate" ? "70%" : "50%"
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.05 }}
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
