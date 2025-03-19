"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
}: {
  text: string;
  revealText: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "p-8 relative overflow-hidden flex flex-col items-center justify-center",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative z-10 text-center">
        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white"
          animate={{
            opacity: isHovered ? 0 : 1,
            transition: { duration: 0.3 },
          }}
        >
          {text}
        </motion.div>

        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-violet-500 absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            transition: { duration: 0.3 },
          }}
        >
          {revealText}
        </motion.div>
        
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0.8,
            transition: { duration: 0.3 },
          }}
        >
          {children}
        </motion.div>
      </div>

      <div
        className="absolute inset-0 z-0"
        style={{
          background: isHovered
            ? `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 100, 255, 0.2) 0%, transparent 60%)`
            : "none",
        }}
      />
    </motion.div>
  );
};