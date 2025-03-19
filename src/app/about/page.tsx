"use client";

import { motion } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { FaGraduationCap } from "react-icons/fa";

export default function AboutPage() {
  const education = [
    {
      degree: "Master of Computer Application",
      institution: "SOC, IPS Academy",
      year: "2023-Present",
    },
    {
      degree: "Bachelor of Computer Science",
      institution: "RDVV University",
      year: "2020-2023",
    },
  ];

  return (
    <div className="min-h-screen w-full relative overflow-hidden py-14 sm:py-16 px-4 sm:px-6 lg:px-8">
      {/* Background sparkles */}
      <div className="absolute inset-0 z-0">
        <SparklesCore
          id="aboutsparkles"
          background="transparent"
          minSize={0.4}
          maxSize={1.0}
          particleDensity={40}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-200 to-neutral-500">
            About Me
          </h1>
          <div className="h-1 w-20 bg-zinc-700 mx-auto mt-4" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8">
          {/* Brief Bio */}
          <div className="text-zinc-300 border border-zinc-800 space-y-4 p-6 rounded-lg">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay:  0.3 }}>
              Hey there! I&apos;m Ujjwal Tamrakar, a passionate Full Stack Developer
              who loves creating digital experiences that are both functional
              and beautifully designed.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay:  0.6 }}>
              I specialize in modern web technologies like React, Next.js, and
              various backend frameworks. What drives me is the perfect balance
              between clean code and exceptional user experience - I believe
              great software should work flawlessly while looking amazing.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay:  0.9 }}>
              Throughout my journey, I&apos;ve focused on building solutions that
              solve real problems while paying attention to the details that
              make applications stand out. I&apos;m constantly learning and exploring
              new technologies to expand what I can create.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay:  1.2 }}>
              When I&apos;m not coding, you&apos;ll find me exploring design trends,
              contributing to open-source projects, and looking for ways to make
              technology more accessible and enjoyable for everyone.
            </motion.p>
          </div>

          {/* Education */}
          <div className="border border-zinc-800 rounded-lg p-6">
            <div className="flex items-center mb-6">
              <FaGraduationCap className="text-2xl mr-3 text-zinc-400" />
              <h2 className="text-xl font-bold">Education</h2>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-zinc-600 via-zinc-700 to-transparent"></div>

              <div className="space-y-8 relative">
                {education.map((edu, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    key={index}
                    className="relative pl-12">
                    {/* Timeline dot */}
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.1, type: "spring" }}
                      className="absolute left-0 top-1.5 w-7 h-7 rounded-full bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-400"></div>
                    </motion.div>

                    <motion.div
                      whileHover={{ x: 5 }}
                      className="bg-zinc-800/30 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-4 hover:border-zinc-600 transition-all duration-300">
                      <h3 className="text-lg font-semibold text-white">
                        {edu.degree}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm mt-1">
                        <span className="text-zinc-300">{edu.institution}</span>
                        <span className="text-zinc-400 font-mono mt-1 sm:mt-0">
                          {edu.year}
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
