"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const { left, top } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative", className)}
    >
      {isClient && (
        <>
          {/* Beam tracking mouse */}
          <motion.div
            className="hidden lg:block absolute h-[400px] w-[2px] bg-gradient-to-b from-transparent via-zinc-500 to-transparent pointer-events-none z-0"
            animate={{
              left: mousePosition.x,
              top: mousePosition.y - 200,
              opacity: 0.4,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.5,
              },
            }}
          />
          
          {/* Horizontal beam */}
          <motion.div
            className="hidden lg:block absolute h-[2px] w-[400px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent pointer-events-none z-0"
            animate={{
              left: mousePosition.x - 200,
              top: mousePosition.y,
              opacity: 0.4,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 30,
                mass: 0.5,
              },
            }}
          />
        </>
      )}
      {children}
    </div>
  );
};