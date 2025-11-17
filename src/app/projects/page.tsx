"use client";

import { motion } from "framer-motion";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { GridBackground } from "@/components/ui/grid-background";

// Define project types
type Technology = {
  name: string;
  color: string;
};

type Project = {
  title: string;
  description: string;
  image: string;
  technologies: Technology[];
  outcome?: string;
  githubUrl?: string;
  demoUrl?: string;
};

export default function ProjectsPage() {
  // Sample project data - replace with your actual projects
  const projects: Project[] = [
    {
      title: "Learnext — Intelligent Learning Platform",
      description: "Recommendation engine, progress tracking, and modular courses. Reduced friction for learners with integrated analytics.",
      image: "/images/Screenshot 2025-05-30 181446.png",
      technologies: [
        { name: "Next.js", color: "#6EE7B7" },
        { name: "Node.js", color: "#8CC84B" },
        { name: "MongoDB", color: "#47A248" },
        { name: "Azure", color: "#60A5FA" },
      ],
      outcome: "Improved course completion by 18%",
      githubUrl: "https://github.com/Ujjwal05T/learnext",
      demoUrl: "https://www.learnext.live",
    },
    {
      title: "Portfolio Website",
      description: "A responsive personal portfolio showcasing projects and skills with 3D animations, interactive UI components, and modern design patterns.",
      image: "/images/Screenshot 2025-03-19 111916.png",
      technologies: [
        { name: "Next.js", color: "#6EE7B7" },
        { name: "React", color: "#61DAFB" },
        { name: "Three.js", color: "#60A5FA" },
      ],
      outcome: "Professional showcase with 3D effects",
      githubUrl: "https://github.com/Ujjwal05T/nextjs-portfolio",
      demoUrl: "https://www.devujjwal.tech",
    },
    {
      title: "SOC Placement Portal",
      description: "A comprehensive placement management system with student profiles, job applications, and role-based authentication for streamlined recruitment.",
      image: "/images/Screenshot 2024-11-26 210347.png",
      technologies: [
        { name: "React", color: "#61DAFB" },
        { name: "Spring Boot", color: "#539E43" },
        { name: "PostgreSQL", color: "#60A5FA" },
      ],
      outcome: "Streamlined campus recruitment process",
      githubUrl: "https://github.com/Ujjwal05T/Minor-Project/tree/main/placementPortal",
      demoUrl: "https://my-placement-portal.vercel.app/",
    },
    {
      title: "Task Manager",
      description: "A feature-rich task management application with local storage persistence and intuitive UI.",
      image: "/images/Screenshot 2025-03-19 132542.png",
      technologies: [
        { name: "React", color: "#61DAFB" },
        { name: "TailwindCSS", color: "#6EE7B7" },
        { name: "Context API", color: "#60A5FA" }
      ],
      outcome: "Clean, persistent task management",
      githubUrl: "https://github.com/Ujjwal05T/Todolist",
      demoUrl: "https://todolist-hazel-eight.vercel.app/",
    }
  ];

  return (
    <div id="projects" className="min-h-screen w-full relative overflow-hidden py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <GridBackground />
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Selected Projects
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my work and see what I&apos;ve built across various technologies
          </p>
          <div className="h-1 w-20 bg-primary mx-auto mt-4" />
        </motion.div>
        
        {/* Project grid with better responsive handling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-4 md:gap-5 lg:gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 * (index % 3) }}
              className="h-full"
              whileHover={{ y: -8 }}
            >
              {/* Small screens: simplified card without 3D effect */}
              <div className="sm:hidden bg-zinc-900/90 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden flex flex-col shadow-lg shadow-zinc-900/50 hover:shadow-xl hover:shadow-zinc-700/30 hover:border-zinc-600 transition-all duration-300">
                {/* Project image - Fixed height to ensure consistency */}
                <div className="w-full aspect-[16/9] overflow-hidden">
                  <Image 
                    src={project.image} 
                    alt={project.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover object-center"
                    priority={index < 3}
                  />
                </div>
                
                {/* Project content - Fixed layout with grid to ensure consistent sizing */}
                <div className="grid grid-rows-[auto_1fr_auto] mx-2 py-3 h-[160px]">
                  {/* Title and description with fixed height */}
                  <div>
                    <h3 className="text-base font-bold mb-1 line-clamp-1">{project.title}</h3>
                    <p className="text-muted-foreground text-xs mb-2 line-clamp-2">{project.description}</p>
                    {project.outcome && (
                      <div className="flex items-center gap-1 mb-2">
                        <span className="text-[9px] text-primary font-semibold">Impact:</span>
                        <span className="text-[9px] text-muted-foreground">{project.outcome}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1 items-center">
                    {project.technologies.map((tech) => (
                      <Badge
                        key={`${project.title}-${tech.name}-mobile`}
                        className="px-1 py-0.5 bg-zinc-800/80 border border-zinc-700/50 text-[9px] font-medium"
                        style={{ color: tech.color }}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Links */}
                  <div className="flex gap-2 pt-1.5 mt-1.5 border-t border-white/5">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-muted-foreground hover:text-primary transition-colors text-xs px-2 py-1 rounded-md hover:bg-primary/10"
                        aria-label="View source code on GitHub"
                      >
                        <FaGithub className="mr-1.5" size={12} />
                        Source
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-muted-foreground hover:text-secondary transition-colors text-xs px-2 py-1 rounded-md hover:bg-secondary/10"
                        aria-label="View live demo"
                      >
                        <FaExternalLinkAlt className="mr-1.5" size={10} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Medium and larger screens: 3D card effect */}
              <CardContainer className="h-full hidden sm:block">
                <CardBody className="card-professional group h-full flex flex-col relative">
                  {/* Project image */}
                  <CardItem
                    translateZ={50}
                    className="w-full aspect-[16/9] overflow-hidden relative"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
    height={338}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </CardItem>
                  
                  {/* Project content with improved responsiveness */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <CardItem translateZ={60} className="mb-1 sm:mb-2">
                      <h3 className="text-base sm:text-lg font-bold text-white">{project.title}</h3>
                    </CardItem>

                    <CardItem translateZ={40} className="text-muted-foreground text-xs sm:text-sm mb-2 flex-grow">
                      <p>{project.description}</p>
                    </CardItem>

                    {project.outcome && (
                      <CardItem translateZ={45} className="mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-primary font-semibold">Impact:</span>
                          <span className="text-xs text-muted-foreground">{project.outcome}</span>
                        </div>
                      </CardItem>
                    )}
                    
                    {/* Tech stack badges with responsive size */}
                    <CardItem translateZ={50} className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {project.technologies.map((tech) => (
                        <Badge
                          key={`${project.title}-${tech.name}`}
                          className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-zinc-800/80 border border-zinc-700/50 text-[10px] sm:text-xs font-medium"
                          style={{ color: tech.color }}
                        >
                          {tech.name}
                        </Badge>
                      ))}
                    </CardItem>
                    
                    {/* Links with touch-friendly sizing */}
                    <CardItem translateZ={70} className="flex gap-3 mt-auto pt-2 sm:pt-3 border-t border-white/5">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-muted-foreground hover:text-primary transition-colors text-xs sm:text-sm px-2 py-1 rounded-md hover:bg-primary/10"
                          aria-label="View source code on GitHub"
                        >
                          <FaGithub className="mr-1.5" size={12} />
                          Source
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-muted-foreground hover:text-secondary transition-colors text-xs sm:text-sm px-2 py-1 rounded-md hover:bg-secondary/10"
                          aria-label="View live demo"
                        >
                          <FaExternalLinkAlt className="mr-1.5" size={10} />
                          Live Demo
                        </a>
                      )}
                    </CardItem>
                  </div>
                </CardBody>
              </CardContainer>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}